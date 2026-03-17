<div align="center">

<img src="https://img.shields.io/badge/KeyForge-Typing%20Speed%20Test-EF9F27?style=for-the-badge&logo=keyboard&logoColor=white" alt="KeyForge" />

<br /><br />

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![CSS Modules](https://img.shields.io/badge/CSS-Modules-blue?style=flat-square&logo=css3)](https://github.com/css-modules/css-modules)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![CI](https://img.shields.io/github/actions/workflow/status/logeshkannan19/Taplytics/ci.yml?style=flat-square&label=CI)](https://github.com/logeshkannan19/Taplytics/actions)

<br />

**A professional, portfolio-ready typing speed test.**
Real-time WPM · Live speed graph · Difficulty levels · Run history

<br />

[Features](#-features) · [Getting Started](#-getting-started) · [Architecture](#-architecture) · [Contributing](#-contributing)

</div>

---

## 🎯 Overview

KeyForge is a dark-themed, performance-focused typing speed test built entirely with React and CSS Modules — no UI libraries, no unnecessary dependencies. It measures your Words Per Minute (WPM) and accuracy in real time, plots your speed as a live canvas graph, and persists your run history locally.

---

## ✨ Features

| Feature | Description |
|---|---|
| ⚡ **Live WPM** | Updates every keystroke: `(chars / 5) ÷ minutes` |
| 🎯 **Per-char accuracy** | Green / red highlight on every character as you type |
| ⏱️ **60-second timer** | Starts on first keystroke, auto-ends at zero |
| 📈 **Speed graph** | Canvas chart plotting WPM over time with peak marker |
| 🎚️ **Difficulty levels** | Easy / Medium / Hard paragraph banks (7 paragraphs each) |
| 🔊 **Sound feedback** | Optional tick via Web Audio API — zero dependencies |
| 💾 **Run history** | Last 10 results persisted in `localStorage` |
| 🏆 **Leaderboard** | Contextual score comparison |
| ⌨️ **Tab to restart** | Instant restart without touching the mouse |
| 📱 **Responsive** | Mobile and desktop friendly |

---

## 🏗️ Architecture

```
Taplytics/
├── .github/
│   ├── workflows/
│   │   └── ci.yml                  # CI: lint + build on every push/PR
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── feature_request.md
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/                 # Purely presentational — no business logic
│   │   ├── Header.jsx              # Logo + difficulty tabs
│   │   ├── StatsBar.jsx            # WPM / Accuracy / Timer / Chars cards
│   │   ├── Timer.jsx               # Animated progress bar (60 → 0)
│   │   ├── TypingBox.jsx           # Paragraph display + textarea input
│   │   ├── SpeedGraph.jsx          # Canvas-based live WPM chart
│   │   └── ResultCard.jsx          # End-of-test modal with history/leaderboard
│   │
│   ├── hooks/
│   │   └── useTypingTest.js        # ← All game logic lives here
│   │
│   ├── pages/
│   │   └── TypingPage.jsx          # Root page — composes all components
│   │
│   ├── utils/
│   │   ├── wpm.js                  # WPM & accuracy calculations (pure functions)
│   │   ├── paragraphs.js           # Paragraph bank — easy / medium / hard
│   │   ├── audio.js                # Web Audio API helpers
│   │   ├── storage.js              # localStorage run history
│   │   └── leaderboard.js          # Mock leaderboard data
│   │
│   ├── App.js
│   ├── index.js
│   └── index.css                   # CSS variables & global reset
│
├── .eslintrc.json
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
├── package.json
└── README.md
```

### Key Design Decisions

- **`useTypingTest` custom hook** — all state machine logic (timer, WPM, accuracy, char evaluation) is isolated here. Components are purely presentational.
- **CSS Modules** — scoped styles per component; no class name collisions, each component is self-contained.
- **Canvas for the graph** — no chart library needed. ~50 lines gives full control and renders faster than any React chart lib.
- **Web Audio API** — sound feedback with zero external dependencies.

---

## 🧮 WPM Formula

```
WPM = (correct characters typed ÷ 5) ÷ elapsed minutes
```

Dividing by 5 normalises character count to "words" — the industry-standard used by Monkeytype, TypeRacer, and keybr.

```
Accuracy % = (correct characters ÷ total keystrokes) × 100
```

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit: `git commit -m "feat: add custom time modes"`
4. Push and open a Pull Request against `main`

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">
Made with ⌨️ by <a href="https://github.com/logeshkannan19">logeshkannan19</a>
</div>
