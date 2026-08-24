# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm start            # Start Expo dev server (interactive)
npm run ios          # Run on iOS simulator
npm run android      # Run on Android emulator
npm run web          # Run web version
npm run lint         # Lint with Expo ESLint config
```

## Architecture

**NatyamAnalyzer** is an Expo/React Native app that analyzes Bharatnatyam (Indian classical dance) postures from video using Claude's vision API.

### Key Files

- `app/(tabs)/index.tsx` — The entire core app: video picking, frame extraction, Claude API call, SQLite persistence, and all UI states (home/result/detail).
- `app/_layout.tsx` — Root navigation stack with dark/light theme.
- `app/(tabs)/_layout.tsx` — Bottom tab navigator (Home + Explore tabs).
- `constants/theme.ts` — Color palette and font definitions (dark purple/gold scheme: `#1a0533`, `#7b2fbe`, `#f0c040`).

### Data Flow

1. User selects a video via `expo-image-picker`
2. `expo-video-thumbnails` extracts frames at timestamps `[1, 3, 5, 8, 11, 14]` seconds
3. Frames are base64-encoded and sent to the Claude API (`claude-opus-4-6`) as vision inputs
4. Claude returns a structured analysis (score, posture issues, strengths, top 3 improvements, summary)
5. Score is extracted via regex; result is saved to SQLite (`natyam.db`, `analyses` table)
6. UI renders the result with color-coded scoring (green ≥80, yellow 60–79, red <60)

### State Management

All state lives in `index.tsx` via React hooks — no external state library. Three UI views are toggled via a `currentView` state: `'home'`, `'result'`, `'detail'`.

### Storage

SQLite via `expo-sqlite`. The `analyses` table stores: `id`, `score`, `thumbnail` (base64), `result` (full text), `created_at`.

### API Key

The Claude API key must be kept out of source control. An `app/imp.env` file exists (untracked) — move the hardcoded key in `index.tsx` to an environment variable loaded from there.

### Routing

Uses Expo Router (file-based). Path alias `@/*` maps to the repo root. Typed routes are enabled via `experiments.typedRoutes` in `app.json`.
