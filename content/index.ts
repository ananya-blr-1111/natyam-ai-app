// To update content: edit the matching .html file in this folder,
// then paste the HTML here as a template literal string.

export const aboutHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0a0a0a;
      color: #f0e6ff;
      padding: 24px 20px 40px;
      line-height: 1.7;
    }
    h1 { font-size: 26px; font-weight: 700; color: #f0c040; margin-bottom: 6px; }
    .subtitle { font-size: 14px; color: #c9a0dc; margin-bottom: 28px; letter-spacing: 0.5px; text-transform: uppercase; }
    .card { background: rgba(123,47,190,0.2); border: 1px solid rgba(123,47,190,0.4); border-radius: 14px; padding: 20px; margin-bottom: 18px; }
    .card h2 { font-size: 17px; font-weight: 600; color: #c9a0dc; margin-bottom: 10px; }
    .card p { font-size: 15px; color: #e8d5ff; }
    ul { padding-left: 20px; margin-top: 8px; }
    ul li { font-size: 15px; color: #e8d5ff; margin-bottom: 6px; }
    .highlight { color: #f0c040; font-weight: 600; }
  </style>
</head>
<body>
  <h1>NatyamAnalyzer</h1>
  <div class="subtitle">AI-Powered Bharatnatyam Posture Analysis</div>
  <div class="card">
    <h2>What is NatyamAnalyzer?</h2>
    <p>NatyamAnalyzer is an intelligent mobile application designed to help <span class="highlight">Bharatnatyam</span> students and practitioners receive instant, detailed feedback on their dance posture — powered by advanced AI vision technology.</p>
  </div>
  <div class="card">
    <h2>How It Works</h2>
    <p>Simply record or select a video of your performance. The app will:</p>
    <ul>
      <li>Extract key frames from your video</li>
      <li>Analyze your posture using Claude AI</li>
      <li>Score your performance out of 100</li>
      <li>Identify posture issues and strengths</li>
      <li>Provide top improvement recommendations</li>
    </ul>
  </div>
  <div class="card">
    <h2>Who Is It For?</h2>
    <p>Whether you are a beginner learning the basics of <span class="highlight">Adavus</span> or an advanced dancer refining your <span class="highlight">Abhinaya</span>, NatyamAnalyzer offers personalized guidance at every level.</p>
  </div>
  <div class="card">
    <h2>Why NatyamAnalyzer?</h2>
    <p>Access to qualified Bharatnatyam teachers is limited outside India. NatyamAnalyzer bridges that gap by bringing expert-level posture feedback to your fingertips, anytime, anywhere.</p>
  </div>
</body>
</html>`;

export const builderHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0a0a0a;
      color: #f0e6ff;
      padding: 24px 20px 40px;
      line-height: 1.7;
    }
    .avatar { width: 90px; height: 90px; border-radius: 45px; background: linear-gradient(135deg,#7b2fbe,#f0c040); margin: 0 auto 16px; text-align: center; line-height: 90px; font-size: 36px; }
    h1 { font-size: 24px; font-weight: 700; color: #f0c040; text-align: center; margin-bottom: 4px; }
    .role { font-size: 14px; color: #c9a0dc; text-align: center; margin-bottom: 28px; text-transform: uppercase; letter-spacing: 0.5px; }
    .card { background: rgba(123,47,190,0.2); border: 1px solid rgba(123,47,190,0.4); border-radius: 14px; padding: 20px; margin-bottom: 18px; }
    .card h2 { font-size: 17px; font-weight: 600; color: #c9a0dc; margin-bottom: 10px; }
    .card p { font-size: 15px; color: #e8d5ff; }
    .tag-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
    .tag { background: rgba(240,192,64,0.15); border: 1px solid rgba(240,192,64,0.4); color: #f0c040; font-size: 13px; padding: 4px 12px; border-radius: 20px; }
  </style>
</head>
<body>
  <div class="avatar">🎭</div>
  <h1>Your Name Here</h1>
  <div class="role">Creator &amp; Developer</div>
  <div class="card">
    <h2>About the Builder</h2>
    <p>Replace this section with your bio. Describe your background, your connection to Bharatnatyam, and what inspired you to build NatyamAnalyzer.</p>
  </div>
  <div class="card">
    <h2>Background</h2>
    <p>Share your professional or creative background here — your experience with dance, technology, or both.</p>
  </div>
  <div class="card">
    <h2>Skills &amp; Expertise</h2>
    <div class="tag-row">
      <span class="tag">Bharatnatyam</span>
      <span class="tag">React Native</span>
      <span class="tag">AI / ML</span>
      <span class="tag">Mobile Development</span>
    </div>
  </div>
  <div class="card">
    <h2>Vision</h2>
    <p>Describe what you hope NatyamAnalyzer will achieve — how it will help the dance community and what features you plan to add in the future.</p>
  </div>
</body>
</html>`;

export const versionHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0a0a0a;
      color: #f0e6ff;
      padding: 24px 20px 40px;
      line-height: 1.7;
    }
    .version-badge { text-align: center; margin-bottom: 28px; }
    .version-number { font-size: 48px; font-weight: 700; color: #f0c040; line-height: 1.1; }
    .version-label { font-size: 13px; color: #c9a0dc; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
    .card { background: rgba(123,47,190,0.2); border: 1px solid rgba(123,47,190,0.4); border-radius: 14px; padding: 20px; margin-bottom: 18px; }
    .card h2 { font-size: 17px; font-weight: 600; color: #c9a0dc; margin-bottom: 12px; }
    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(201,160,220,0.15); font-size: 14px; }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #c9a0dc; }
    .info-value { color: #f0e6ff; font-weight: 500; }
    .changelog-item { padding: 10px 0; border-bottom: 1px solid rgba(201,160,220,0.15); }
    .changelog-item:last-child { border-bottom: none; }
    .changelog-version { font-size: 13px; font-weight: 600; color: #f0c040; margin-bottom: 4px; }
    .changelog-item p { font-size: 14px; color: #e8d5ff; }
    .legal { font-size: 12px; color: #8a6a9a; text-align: center; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="version-badge">
    <div class="version-number">1.0</div>
    <div class="version-label">Current Version</div>
  </div>
  <div class="card">
    <h2>App Information</h2>
    <div class="info-row"><span class="info-label">Version</span><span class="info-value">1.0.0</span></div>
    <div class="info-row"><span class="info-label">Platform</span><span class="info-value">iOS &amp; Android</span></div>
    <div class="info-row"><span class="info-label">AI Model</span><span class="info-value">Claude Opus (Anthropic)</span></div>
    <div class="info-row"><span class="info-label">Release Date</span><span class="info-value">March 2026</span></div>
    <div class="info-row"><span class="info-label">Built With</span><span class="info-value">React Native &amp; Expo</span></div>
  </div>
  <div class="card">
    <h2>What's New</h2>
    <div class="changelog-item">
      <div class="changelog-version">v1.0.0 — Initial Release</div>
      <p>AI-powered posture analysis, video frame extraction, score history, and sharing.</p>
    </div>
  </div>
  <div class="card">
    <h2>Upcoming Features</h2>
    <div class="changelog-item"><p>🎯 Pose-by-pose breakdown with frame markers</p></div>
    <div class="changelog-item"><p>🎵 Rhythm and timing analysis</p></div>
    <div class="changelog-item"><p>📈 Progress tracking over time</p></div>
    <div class="changelog-item"><p>🌐 Multi-language support</p></div>
  </div>
  <div class="card">
    <h2>Legal &amp; Privacy</h2>
    <p class="legal">Videos are processed via the Anthropic Claude API and are not stored on any server. All analysis history is saved locally on your device only. By using this app you agree to Anthropic's usage policies.</p>
  </div>
</body>
</html>`;
