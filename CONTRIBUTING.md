# Contributing to Taplytics

Thank you for your interest in contributing! This document explains how to get involved.

---

## Code of Conduct

Be respectful and constructive. Harassment of any kind will not be tolerated.

---

## How to Contribute

### Reporting Bugs

1. Search existing [issues](https://github.com/logeshkannan19/Taplytics/issues) first — it may already be reported.
2. If not, open a new issue using the **Bug Report** template.
3. Include clear steps to reproduce, your OS, and browser.

### Suggesting Features

Open an issue using the **Feature Request** template. Describe the problem you're solving and your proposed solution.

### Submitting Code

1. **Fork** the repository.
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Taplytics.git
   cd Taplytics
   ```
3. **Create a branch** from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```
4. **Make your changes** following the guidelines below.
5. **Test** locally with `npm start`.
6. **Commit** with a clear, conventional message:
   ```bash
   git commit -m "feat: add custom time duration option"
   git commit -m "fix: correct WPM calculation on paragraph completion"
   git commit -m "docs: update architecture section in README"
   ```
7. **Push** and open a Pull Request against `main`.

---

## Code Style Guidelines

- **React components** — functional only, hooks for state.
- **CSS** — use CSS Modules (`.module.css`). No inline styles unless dynamically computed.
- **Variables** — use `const` by default, `let` only when reassignment is needed.
- **Naming** — `camelCase` for variables/functions, `PascalCase` for components, `UPPER_SNAKE_CASE` for constants.
- **Utils** — pure functions in `/utils`. No side effects, no DOM access.
- **Comments** — comment *why*, not *what*.

---

## Project Structure

See the [Architecture section](README.md#-architecture) in the README.

---

## Development Setup

```bash
npm install   # Install dependencies
npm start     # Dev server at http://localhost:3000
npm run build # Production build
npm run lint  # Lint check
```

---

## Questions?

Open a [Discussion](https://github.com/logeshkannan19/Taplytics/discussions) or drop a comment on the relevant issue.
