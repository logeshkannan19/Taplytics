import React from 'react';
import styles from './Header.module.css';

const DIFFICULTIES = ['easy', 'medium', 'hard'];

export default function Header({ difficulty, onDifficultyChange }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        key<span className={styles.logoMuted}>forge</span>
      </div>

      <div className={styles.diffTabs} role="tablist" aria-label="Difficulty">
        {DIFFICULTIES.map(d => (
          <button
            key={d}
            role="tab"
            aria-selected={difficulty === d}
            className={`${styles.diffBtn} ${difficulty === d ? styles.active : ''}`}
            onClick={() => onDifficultyChange(d)}
          >
            {d === 'medium' ? 'Med' : d.charAt(0).toUpperCase() + d.slice(1)}
          </button>
        ))}
      </div>
    </header>
  );
}
