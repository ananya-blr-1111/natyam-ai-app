// To update content: edit the matching .html file in this folder,
// then paste the HTML here as a template literal string.

export const aboutHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #faf6ee;
      color: #33222a;
      padding: 24px 20px 40px;
      line-height: 1.7;
    }
    h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 30px;
      font-weight: 700;
      color: #5e1a24;
      margin-bottom: 6px;
    }
    .subtitle {
      font-size: 13px;
      color: #c9962e;
      margin-bottom: 28px;
      letter-spacing: 1px;
      text-transform: uppercase;
      font-weight: 700;
    }
    .card {
      background: #ffffff;
      border: 1px solid #eadfc9;
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 18px;
      box-shadow: 0 4px 14px rgba(65,17,26,0.06);
    }
    .card h2 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 20px;
      font-weight: 600;
      color: #5e1a24;
      margin-bottom: 10px;
    }
    .card p {
      font-size: 15px;
      color: #33222a;
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
      color: #33222a;
      margin-bottom: 6px;
    }
    .highlight {
      color: #8a6415;
      font-weight: 600;
    }
    .quote {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-style: italic;
      font-size: 17px;
      border-left: 3px solid #c9962e;
      padding-left: 14px;
      color: #5e1a24;
    }
    .link {
      color: #8a6415;
      font-weight: 700;
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
    <p>Select a video of your Bharatanatyam performance from your library. NatyamAI will:</p>
    <ul>
      <li><span class="highlight">Record</span> — start with any practice clip of an adavu, jathi or full item</li>
      <li><span class="highlight">Analyse</span> — Claude AI reviews posture, mudra accuracy, facial expression and rhythmic timing frame by frame</li>
      <li><span class="highlight">Feedback</span> — clear, encouraging notes highlight what's working and what to adjust, in plain language</li>
      <li><span class="highlight">Improve</span> — personalised recommendations guide your next practice session, building steady, measurable progress</li>
    </ul>
  </div>

  <div class="card">
    <h2>What NatyamAI Looks At</h2>
    <p><span class="highlight">Posture &amp; Mudra</span> — body alignment, stance and hand gestures against correct form, so you can self-correct between classes.</p>
    <p><span class="highlight">Abhinaya</span> — facial expression and emotional storytelling, with feedback on how clearly your bhava comes across.</p>
    <p><span class="highlight">Laya</span> — rhythmic precision and timing against the taalam, highlighting where footwork drifts ahead of or behind the beat.</p>
    <p><span class="highlight">Personalised Feedback</span> — all three come together into tailored, encouraging notes, so you know exactly what to practise next.</p>
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
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #faf6ee;
      color: #33222a;
      padding: 24px 20px 40px;
      line-height: 1.7;
    }
    .avatar {
      width: 90px;
      height: 90px;
      border-radius: 45px;
      background: linear-gradient(135deg, #5e1a24, #c9962e);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      margin: 0 auto 16px;
      text-align: center;
      line-height: 90px;
      border: 2px solid #e3c27a;
    }
    h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 28px;
      font-weight: 700;
      color: #5e1a24;
      text-align: center;
      margin-bottom: 4px;
    }
    .role {
      font-size: 13px;
      color: #c9962e;
      text-align: center;
      margin-bottom: 28px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 700;
    }
    .card {
      background: #ffffff;
      border: 1px solid #eadfc9;
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 18px;
      box-shadow: 0 4px 14px rgba(65,17,26,0.06);
    }
    .card h2 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 20px;
      font-weight: 600;
      color: #5e1a24;
      margin-bottom: 10px;
    }
    .card p {
      font-size: 15px;
      color: #33222a;
    }
    .card p + p {
      margin-top: 10px;
    }
    .highlight {
      color: #8a6415;
      font-weight: 600;
    }
    .tag-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }
    .tag {
      background: rgba(201, 150, 46, 0.12);
      border: 1px solid #c9962e;
      color: #8a6415;
      font-size: 13px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 20px;
    }
    .link {
      color: #8a6415;
      font-weight: 700;
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
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #faf6ee;
      color: #33222a;
      padding: 24px 20px 40px;
      line-height: 1.7;
    }
    .version-badge {
      text-align: center;
      margin-bottom: 28px;
    }
    .version-number {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 52px;
      font-weight: 700;
      color: #5e1a24;
      line-height: 1.1;
    }
    .version-label {
      font-size: 12px;
      color: #c9962e;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 700;
      margin-top: 4px;
    }
    .card {
      background: #ffffff;
      border: 1px solid #eadfc9;
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 18px;
      box-shadow: 0 4px 14px rgba(65,17,26,0.06);
    }
    .card h2 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 20px;
      font-weight: 600;
      color: #5e1a24;
      margin-bottom: 12px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #eadfc9;
      font-size: 14px;
    }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #6b574f; }
    .info-value { color: #33222a; font-weight: 600; }
    .changelog-item {
      padding: 10px 0;
      border-bottom: 1px solid #eadfc9;
    }
    .changelog-item:last-child { border-bottom: none; }
    .changelog-version {
      font-size: 13px;
      font-weight: 700;
      color: #8a6415;
      margin-bottom: 4px;
    }
    .changelog-item p {
      font-size: 14px;
      color: #33222a;
    }
    .legal {
      font-size: 12px;
      color: #6b574f;
      text-align: center;
      margin-top: 8px;
    }
    .link {
      color: #8a6415;
      font-weight: 700;
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
