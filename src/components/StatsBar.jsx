import React from 'react';
import styles from './StatsBar.module.css';

export default function StatsBar({ wpm, accuracy, timeLeft, totalTyped }) {
  const timerWarning = timeLeft <= 10;

  return (
    <div className={styles.statsRow}>
      <StatCard label="WPM"      value={wpm}                        highlight accent />
      <StatCard label="Accuracy" value={accuracy !== null ? `${accuracy}%` : '—'} />
      <StatCard label="Time"     value={timeLeft} unit="s" warning={timerWarning} />
      <StatCard label="Chars"    value={totalTyped} />
    </div>
  );
}

function StatCard({ label, value, unit, highlight, accent, warning }) {
  return (
    <div className={`${styles.card} ${highlight ? styles.highlight : ''}`}>
      <div className={styles.label}>{label}</div>
      <div className={`${styles.value} ${accent ? styles.accent : ''} ${warning ? styles.warning : ''}`}>
        {value}
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>
    </div>
  );
}
