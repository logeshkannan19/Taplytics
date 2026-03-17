import React, { useRef, useEffect } from 'react';
import styles from './TypingBox.module.css';

/**
 * Renders the target paragraph with per-character highlighting
 * and the textarea input below it.
 */
export default function TypingBox({ chars, currentIndex, inputValue, finished, onInput }) {
  const inputRef = useRef(null);

  // Auto-focus input on mount and after restart
  useEffect(() => {
    inputRef.current?.focus();
  }, [chars]);

  function handleChange(e) {
    onInput(e.target.value);
  }

  function handleKeyDown(e) {
    // Tab = restart (handled by parent via onInput returning special value,
    // but we can also emit an event via a custom attribute)
    if (e.key === 'Tab') {
      e.preventDefault();
      inputRef.current?.dispatchEvent(new CustomEvent('restart', { bubbles: true }));
    }
  }

  return (
    <div className={`${styles.wrap} ${!finished ? styles.focusable : ''}`}>
      {/* ── Paragraph display ── */}
      <div className={styles.paragraph} aria-label="Target text">
        {chars.map((c, i) => {
          let cls = styles.charPending;
          if (i < currentIndex) {
            cls = c.status === 'correct' ? styles.charCorrect : styles.charWrong;
          } else if (i === currentIndex) {
            cls = styles.charCurrent;
          }
          return (
            <span key={i} className={`${styles.char} ${cls}`}>
              {c.char === ' ' ? '\u00A0' : c.char}
            </span>
          );
        })}
      </div>

      {/* ── Input ── */}
      <textarea
        ref={inputRef}
        className={styles.input}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={finished}
        rows={2}
        placeholder="Start typing to begin…"
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        aria-label="Typing input"
      />
    </div>
  );
}
