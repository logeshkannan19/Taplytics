import React, { useState } from 'react';
import styles from './ResultCard.module.css';
import { loadHistory } from '../utils/storage';
import { LEADERBOARD } from '../utils/leaderboard';

/**
 * Full-screen result overlay shown when a test ends.
 */
export default function ResultCard({ result, onRestart, visible }) {
  const [tab, setTab] = useState('history');
  const history = loadHistory();

  if (!result) return null;

  return (
    <div className={`${styles.overlay} ${visible ? styles.visible : ''}`} aria-modal="true" role="dialog">
      <div className={styles.card}>
        <div className={styles.testComplete}>Test Complete</div>

        {/* ── Hero WPM ── */}
        <div className={styles.heroWpm}>{result.wpm}</div>
        <div className={styles.heroLabel}>Words Per Minute</div>

        {/* ── Stats grid ── */}
        <div className={styles.grid}>
          <StatBox value={`${result.accuracy}%`} label="Accuracy" />
          <StatBox value={result.chars}           label="Characters" />
          <StatBox value={result.errors}          label="Errors" />
        </div>

        {/* ── History / Leaderboard tabs ── */}
        <div className={styles.section}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${tab === 'history' ? styles.tabActive : ''}`}
              onClick={() => setTab('history')}
            >
              History
            </button>
            <button
              className={`${styles.tab} ${tab === 'leaderboard' ? styles.tabActive : ''}`}
              onClick={() => setTab('leaderboard')}
            >
              Leaderboard
            </button>
          </div>

          {tab === 'history' && <HistoryPanel history={history} />}
          {tab === 'leaderboard' && <LeaderboardPanel entries={LEADERBOARD} userWpm={result.wpm} />}
        </div>

        <button className={styles.restartBtn} onClick={onRestart}>
          ↺ Try Again
        </button>
      </div>
    </div>
  );
}

function StatBox({ value, label }) {
  return (
    <div className={styles.statBox}>
      <div className={styles.statVal}>{value}</div>
      <div className={styles.statLbl}>{label}</div>
    </div>
  );
}

function HistoryPanel({ history }) {
  if (!history.length) {
    return <p className={styles.empty}>No runs yet.</p>;
  }
  return (
    <div className={styles.historyList}>
      {history.map((h, i) => (
        <div key={i} className={styles.historyItem}>
          <span className={styles.historyTime}>{h.timestamp}</span>
          <span className={styles.historyDiff}>{h.difficulty}</span>
          <span>{h.accuracy}%</span>
          <span className={styles.historyWpm}>{h.wpm} wpm</span>
        </div>
      ))}
    </div>
  );
}

function LeaderboardPanel({ entries, userWpm }) {
  return (
    <div className={styles.lbList}>
      {entries.map(e => (
        <div key={e.rank} className={`${styles.lbItem} ${e.rank === 1 ? styles.lbTop : ''}`}>
          <span className={styles.lbRank}>{e.rank}</span>
          <span className={styles.lbName}>{e.name}</span>
          <span className={styles.lbAcc}>{e.accuracy}%</span>
          <span className={styles.lbWpm}>{e.wpm}</span>
        </div>
      ))}
      {/* Show user's score in context */}
      <div className={`${styles.lbItem} ${styles.lbUser}`}>
        <span className={styles.lbRank}>—</span>
        <span className={styles.lbName}>you</span>
        <span className={styles.lbAcc}></span>
        <span className={styles.lbWpm}>{userWpm}</span>
      </div>
    </div>
  );
}
