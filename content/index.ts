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
    h1 {
      font-size: 26px;
      font-weight: 700;
      color: #f0c040;
      margin-bottom: 6px;
    }
    .subtitle {
      font-size: 14px;
      color: #c9a0dc;
      margin-bottom: 28px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .card {
      background: rgba(123, 47, 190, 0.2);
      border: 1px solid rgba(123, 47, 190, 0.4);
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 18px;
    }
    .card h2 {
      font-size: 17px;
      font-weight: 600;
      color: #c9a0dc;
      margin-bottom: 10px;
    }
    .card p {
      font-size: 15px;
      color: #e8d5ff;
    }
    .card p + p {
      margin-top: 10px;
    }
    ul {
      padding-left: 20px;
      margin-top: 8px;
    }
    ul li {
      font-size: 15px;
      color: #e8d5ff;
      margin-bottom: 6px;
    }
    .highlight {
      color: #f0c040;
      font-weight: 600;
    }
    .quote {
      font-style: italic;
      border-left: 3px solid #f0c040;
      padding-left: 14px;
      color: #f0e6ff;
    }
    .link {
      color: #f0c040;
      font-weight: 600;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <h1>NatyamAI</h1>
  <div class="subtitle">AI-Powered Bharatanatyam Posture Analysis</div>

  <div class="card">
    <h2>What is NatyamAI?</h2>
    <p>
      NatyamAI is a mobile app that gives <span class="highlight">Bharatanatyam</span>
      students instant, AI-powered feedback on their dance posture — built by a
      dancer, for dancers. Upload a video of your practice or performance and get
      a detailed posture analysis in moments, entirely on your own phone.
    </p>
  </div>

  <div class="card">
    <h2>How It Works</h2>
    <p>Select a video of your Bharatanatyam performance from your library. The app will:</p>
    <ul>
      <li>Extract key frames from your video</li>
      <li>Analyse your posture using Claude AI</li>
      <li>Score your performance out of 100</li>
      <li>Identify posture issues and strengths</li>
      <li>Give you your top 3 improvement tips</li>
    </ul>
  </div>

  <div class="card">
    <h2>Why It Matters</h2>
    <p class="quote">
      "Bharatanatyam is rooted in timeless tradition — but technology can make
      learning it more accessible, engaging and effective for the next generation."
    </p>
    <p>
      Whether you're just learning your first <span class="highlight">Adavus</span>
      or refining your <span class="highlight">Abhinaya</span> ahead of an
      Arangetram, NatyamAI offers guidance at every level — without needing a
      teacher in the room.
    </p>
  </div>

  <div class="card">
    <h2>Everything Stays on Your Phone</h2>
    <p>
      No login, no account, no cloud storage of your videos. Every analysis is
      saved privately on your own device, so it's safe and simple enough for
      young dancers to use on their own.
    </p>
  </div>

  <div class="card">
    <h2>From the Same Team Behind natyam.dance</h2>
    <p>
      NatyamAI is built by Ananya Sharma, a Bharatanatyam dancer herself.
      See her Arangetram, dance journey and more at
      <span class="link">natyam.dance</span>.
    </p>
  </div>

</body>
</html>
`;

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
    .avatar {
      width: 90px;
      height: 90px;
      border-radius: 45px;
      background: linear-gradient(135deg, #7b2fbe, #f0c040);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      margin: 0 auto 16px;
      text-align: center;
      line-height: 90px;
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
      color: #f0c040;
      text-align: center;
      margin-bottom: 4px;
    }
    .role {
      font-size: 14px;
      color: #c9a0dc;
      text-align: center;
      margin-bottom: 28px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .card {
      background: rgba(123, 47, 190, 0.2);
      border: 1px solid rgba(123, 47, 190, 0.4);
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 18px;
    }
    .card h2 {
      font-size: 17px;
      font-weight: 600;
      color: #c9a0dc;
      margin-bottom: 10px;
    }
    .card p {
      font-size: 15px;
      color: #e8d5ff;
    }
    .card p + p {
      margin-top: 10px;
    }
    .highlight {
      color: #f0c040;
      font-weight: 600;
    }
    .tag-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }
    .tag {
      background: rgba(240, 192, 64, 0.15);
      border: 1px solid rgba(240, 192, 64, 0.4);
      color: #f0c040;
      font-size: 13px;
      padding: 4px 12px;
      border-radius: 20px;
    }
    .link {
      color: #f0c040;
      font-weight: 600;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <div class="avatar">🪷</div>
  <h1>Ananya Sharma</h1>
  <div class="role">Bharatanatyam Dancer &amp; Student Developer</div>

  <div class="card">
    <h2>About the Builder</h2>
    <p>
      Ananya Sharma began her Bharatanatyam journey at the age of 7. She has
      trained for ten years under Guru Smt. Abhinayaa Natarajan at
      Natarajarangam School of Dance, Bengaluru.
    </p>
    <p>
      On 18 July 2026, she completed her <span class="highlight">Arangetram</span> —
      her formal solo debut — performing a full Margam of seven dances for more
      than 400 guests at New Horizon College of Engineering, Bengaluru.
    </p>
  </div>

  <div class="card">
    <h2>Dance Background</h2>
    <p>
      Ananya has performed at several prestigious venues across Bengaluru,
      including multiple appearances at Ravindra Kalakshetra, and has presented
      Bharatanatyam in temples during Maha Shivaratri and Ganesh Chaturthi
      festivities. She has completed the Karnataka Junior Examination for
      Bharatanatyam, conducted by Dr. Gangubai Hangal Music and Performing Arts
      University.
    </p>
  </div>

  <div class="card">
    <h2>Why She Built This</h2>
    <p>
      An enthusiastic reader with a keen interest in Computer Science and
      technology, Ananya is currently in Grade XII at GEAR Innovative
      International School, Bengaluru. She built NatyamAI to bring her two
      passions together — believing technology can make learning Bharatanatyam
      more accessible for the next generation of dancers, without losing what
      makes the art form special.
    </p>
  </div>

  <div class="card">
    <h2>Skills &amp; Expertise</h2>
    <div class="tag-row">
      <span class="tag">Bharatanatyam</span>
      <span class="tag">React Native</span>
      <span class="tag">AI / ML</span>
      <span class="tag">Mobile Development</span>
    </div>
  </div>

  <div class="card">
    <h2>More From Ananya</h2>
    <p>
      Read her full story, watch videos from her Arangetram, and see her
      dance portfolio at <span class="link">natyam.dance</span>.
    </p>
  </div>

</body>
</html>
`;

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
    .version-badge {
      text-align: center;
      margin-bottom: 28px;
    }
    .version-number {
      font-size: 48px;
      font-weight: 700;
      color: #f0c040;
      line-height: 1.1;
    }
    .version-label {
      font-size: 13px;
      color: #c9a0dc;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 4px;
    }
    .card {
      background: rgba(123, 47, 190, 0.2);
      border: 1px solid rgba(123, 47, 190, 0.4);
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 18px;
    }
    .card h2 {
      font-size: 17px;
      font-weight: 600;
      color: #c9a0dc;
      margin-bottom: 12px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid rgba(201, 160, 220, 0.15);
      font-size: 14px;
    }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #c9a0dc; }
    .info-value { color: #f0e6ff; font-weight: 500; }
    .changelog-item {
      padding: 10px 0;
      border-bottom: 1px solid rgba(201, 160, 220, 0.15);
    }
    .changelog-item:last-child { border-bottom: none; }
    .changelog-version {
      font-size: 13px;
      font-weight: 600;
      color: #f0c040;
      margin-bottom: 4px;
    }
    .changelog-item p {
      font-size: 14px;
      color: #e8d5ff;
    }
    .legal {
      font-size: 12px;
      color: #8a6a9a;
      text-align: center;
      margin-top: 8px;
    }
    .link {
      color: #f0c040;
      font-weight: 600;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <div class="version-badge">
    <div class="version-number">1.0</div>
    <div class="version-label">Current Version</div>
  </div>

  <div class="card">
    <h2>App Information</h2>
    <div class="info-row">
      <span class="info-label">Version</span>
      <span class="info-value">1.0.0</span>
    </div>
    <div class="info-row">
      <span class="info-label">Platform</span>
      <span class="info-value">iOS &amp; Android</span>
    </div>
    <div class="info-row">
      <span class="info-label">AI Model</span>
      <span class="info-value">Claude Opus (Anthropic)</span>
    </div>
    <div class="info-row">
      <span class="info-label">Status</span>
      <span class="info-value">In Development</span>
    </div>
    <div class="info-row">
      <span class="info-label">Built With</span>
      <span class="info-value">React Native &amp; Expo</span>
    </div>
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
    <p class="legal">
      Made for young Bharatanatyam students — no login or account required.
      Videos are processed via the Anthropic Claude API and are not stored on
      any server. All analysis history is saved locally on your device only.
      By using this app you agree to Anthropic's usage policies.
    </p>
  </div>

  <div class="card">
    <h2>Learn More</h2>
    <p class="legal">
      Visit <span class="link">natyam.dance</span> for Ananya's dance
      portfolio, Arangetram videos, and more about NatyamAI.
    </p>
  </div>

</body>
</html>
`;
