import React from 'react';
import styles from './Timer.module.css';

const TOTAL = 60;

/**
 * Progress bar that depletes as time runs out.
 */
export default function Timer({ timeLeft }) {
  const pct = ((TOTAL - timeLeft) / TOTAL) * 100;

  return (
    <div className={styles.wrap} role="progressbar" aria-valuenow={timeLeft} aria-valuemin={0} aria-valuemax={TOTAL}>
      <div className={styles.bar} style={{ width: `${pct}%` }} />
    </div>
  );
}
