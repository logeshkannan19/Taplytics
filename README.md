<div align="center">

# Taplytics ⌨️

**Performance-focused typing speed test built with React.**
Real-time WPM · Live speed graph · Local run history

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://taplytics-gi87flja6-logeshkannan19s-projects.vercel.app)

<br />

[Features](#-features) · [Getting Started](#-getting-started) · [Architecture](#-architecture) · [Contributing](#-contributing)

</div>

---

## 🎯 Overview

Taplytics is a dark-themed, performance-focused typing speed test built entirely with React and CSS Modules — no UI libraries, no unnecessary dependencies. It measures your Words Per Minute (WPM) and accuracy in real time, plots your speed as a live canvas graph, and persists your run history locally.

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

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 16.x
- **npm** ≥ 8.x

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/logeshkannan19/Taplytics.git
cd Taplytics

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) — hot reloads on every save.

### Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start dev server on port 3000 |
| `npm run build` | Production build into `/build` |
| `npm test` | Run test suite |
| `npm run lint` | Lint with ESLint |

---

## 🌐 Deployment

### Vercel (recommended)
```bash
npx vercel
```

### Netlify
Drag the `/build` folder to [app.netlify.com/drop](https://app.netlify.com/drop).

### GitHub Pages
```bash
# Add to package.json: "homepage": "https://logeshkannan19.github.io/Taplytics"
npm run build
npx gh-pages -d build
```

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
