# Taplytics Architecture

Taplytics is designed for low-latency feedback and precise WPM calculation. It leverages the Web Audio API for auditory feedback and a custom internal state engine for tracking keystrokes.

## 🧱 Core Components

- **Typed Logic (`useTypingTest.js`)**: A custom hook that handles the core timer, word validation, and WPM calculation.
- **Visual Feedback (`SpeedGraph.jsx`)**: A canvas-based rendering system for real-time WPM plotting without the overhead of heavy chart libraries.
- **Sound Engine (`audio.js`)**: Low-latency audio feedback for each keystroke to improve the tactile experience.

## 🛠 Tech Stack

- **Frontend**: React (Functional Components + Hooks)
- **Styling**: CSS Modules for scoped, maintainable styles.
- **Storage**: LocalStorage for persisting personal bests and history.

## 📊 Performance Optimization

- **Zero Chart Libs**: The WPM graph is rendered manually on Canvas to ensure 120fps smooth updates during high-speed typing.
- **Minimal Rerenders**: State is carefully partitioned to ensure only necessary parts of the UI update during a test.
