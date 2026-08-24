import * as SQLite from 'expo-sqlite';
import * as VideoThumbnails from 'expo-video-thumbnails';

const CLAUDE_API_KEY = process.env.EXPO_PUBLIC_CLAUDE_API_KEY ?? '';

// ─── Palette (shared across screens) — matches natyam.dance's Chettinad theme ─
export const C = {
  bg:          '#faf6ee',   // cream
  card:        '#ffffff',
  card2:       '#f3ead9',   // alt section tint
  border:      '#eadfc9',
  maroon:      '#5e1a24',
  maroonDeep:  '#41111a',
  maroonFaint: 'rgba(94,26,36,0.08)',
  gold:        '#c9962e',
  goldSoft:    '#e3c27a',
  goldFaint:   'rgba(201,150,46,0.12)',
  goldText:    '#8a6415',   // darker, readable-as-text variant of gold (on cream/white)
  text:        '#33222a',   // ink
  textSub:     '#6b574f',
  muted:       '#8a756d',
  green:       '#2f7d4f',
  red:         '#a13a3a',
};

// ─── Type (Cormorant Garamond, same as the website) ──────────────────────────
export const F = {
  serif:     'CormorantGaramond_600SemiBold',
  serifBold: 'CormorantGaramond_700Bold',
  serifItal: 'CormorantGaramond_500Medium_Italic',
};

// ─── SQLite ───────────────────────────────────────────────────────────────────
let _db: SQLite.SQLiteDatabase | null = null;

function getDb(): SQLite.SQLiteDatabase {
  if (!_db) _db = SQLite.openDatabaseSync('natyam.db');
  return _db;
}

export function setupDatabase() {
  getDb().execSync(`CREATE TABLE IF NOT EXISTS analyses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    score INTEGER, thumbnail TEXT, result TEXT, created_at TEXT
  );`);
}

export function saveLocal(score: number, thumbnail: string, result: string) {
  getDb().runSync(
    'INSERT INTO analyses (score, thumbnail, result, created_at) VALUES (?,?,?,?);',
    [score, thumbnail, result, new Date().toISOString()]
  );
}

export function loadLocal(): any[] {
  return getDb().getAllSync('SELECT * FROM analyses ORDER BY created_at DESC;') as any[];
}

// ─── Display helpers ──────────────────────────────────────────────────────────
export function extractScore(text: string): number {
  const m = text.match(/SCORE:\s*(\d{1,3})\s*\/\s*100/i) ?? text.match(/\b(\d{1,3})\s*\/\s*100\b/);
  return m ? Math.min(100, parseInt(m[1])) : 0;
}

export function scoreColor(s: number): string {
  if (s === 0)  return C.red;
  if (s >= 80)  return C.green;
  if (s >= 60)  return C.goldText;
  return C.red;
}

export function scoreLabel(s: number): string {
  if (s === 0)  return 'Not a dance video';
  if (s >= 90)  return 'Excellent';
  if (s >= 80)  return 'Very Good';
  if (s >= 70)  return 'Good';
  if (s >= 60)  return 'Fair';
  return 'Needs Work';
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

// ─── Parsers ──────────────────────────────────────────────────────────────────
export function parseSection(text: string, heading: string): string[] {
  const m = text.match(new RegExp(`${heading}[:\\s]*\\n([\\s\\S]*?)(?=\\n[A-Z ]{3,}:|$)`, 'i'));
  if (!m) return [];
  return m[1].split('\n').map(l => l.replace(/^[-•*\d.]\s*/, '').trim()).filter(Boolean);
}

export function parseSummary(text: string): string {
  const m = text.match(/SUMMARY[:\s]*\n([\s\S]*?)$/i);
  return m ? m[1].trim() : '';
}

// ─── Frame extraction ─────────────────────────────────────────────────────────
export async function extractFrames(videoUri: string): Promise<string[]> {
  const frames: string[] = [];
  for (const time of [1000, 3000, 5000, 8000, 11000, 14000]) {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, { time, quality: 0.7 });
      const blob = await (await fetch(uri)).blob();
      const b64 = await new Promise<string>(res => {
        const r = new FileReader();
        r.onloadend = () => res((r.result as string).split(',')[1]);
        r.readAsDataURL(blob);
      });
      frames.push(b64);
    } catch { /* skip frame */ }
  }
  return frames;
}

// ─── Claude API ───────────────────────────────────────────────────────────────
export async function analyzeWithClaude(frames: string[]): Promise<string> {
  const content: any[] = [{
    type: 'text',
    text: `You are an expert Bharatnatyam dance teacher with 20 years of experience.
I am sending you ${frames.length} frames from a video.

CRITICAL RULE: If the video does NOT show a person performing Bharatnatyam or any classical Indian dance, respond ONLY with:

SCORE: 0/100

POSTURE ISSUES:
- This does not appear to be a Bharatnatyam dance video

DOING WELL:
- N/A

TOP 3 IMPROVEMENTS:
1. Upload a video of Bharatnatyam dance performance
2. Ensure the dancer's full body is clearly visible
3. Record in good lighting for best analysis

SUMMARY:
No Bharatnatyam dance was detected in this video. Please upload a video showing Bharatnatyam postures for an accurate analysis.

If it IS a Bharatnatyam performance, analyze posture and respond in EXACTLY this format:

SCORE: [number]/100

POSTURE ISSUES:
- [issue]

DOING WELL:
- [strength]

TOP 3 IMPROVEMENTS:
1. [improvement]

SUMMARY:
[2-3 encouraging sentences]`,
  }];

  for (const frame of frames) {
    content.push({ type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: frame } });
  }

  const body = JSON.stringify({
    model: 'claude-opus-4-6', max_tokens: 1024,
    messages: [{ role: 'user', content }],
  });

  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body,
    });
    const data = await res.json();
    if (res.status === 529 || data.error?.type === 'overloaded_error') {
      if (attempt < 3) { await new Promise(r => setTimeout(r, attempt * 3000)); continue; }
      throw new Error('Claude API is overloaded. Please try again in a moment.');
    }
    if (!res.ok || !data.content) throw new Error(data.error?.message ?? `API error ${res.status}`);
    return data.content[0].text;
  }
  throw new Error('Claude API is overloaded. Please try again in a moment.');
}
