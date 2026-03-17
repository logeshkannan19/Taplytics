import React, { useState, useRef } from 'react';
import Header    from '../components/Header';
import StatsBar  from '../components/StatsBar';
import Timer     from '../components/Timer';
import TypingBox from '../components/TypingBox';
import SpeedGraph from '../components/SpeedGraph';
import ResultCard from '../components/ResultCard';
import { useTypingTest } from '../hooks/useTypingTest';
import styles from './TypingPage.module.css';

export default function TypingPage() {
  const [difficulty, setDifficulty] = useState('easy');
  const [soundOn,    setSoundOn]    = useState(false);
  const typingBoxRef = useRef(null);

  const {
    chars, currentIndex, inputValue,
    timeLeft, started, finished,
    wpm, accuracy, totalTyped, errors,
    wpmHistory, peakWpm, lastResult,
    handleInput, restart,
  } = useTypingTest(difficulty, soundOn);

  function handleDifficultyChange(d) {
    setDifficulty(d);
    // useTypingTest resets automatically via useEffect on difficulty change
  }

  function handleRestart() {
    restart();
    // Re-focus the input after a short tick
    setTimeout(() => {
      document.querySelector('textarea')?.focus();
    }, 80);
  }

  return (
    <div className={styles.page} ref={typingBoxRef}>
      <Header
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
      />

      <StatsBar
        wpm={wpm}
        accuracy={accuracy}
        timeLeft={timeLeft}
        totalTyped={totalTyped}
      />

      <Timer timeLeft={timeLeft} />

      <TypingBox
        chars={chars}
        currentIndex={currentIndex}
        inputValue={inputValue}
        finished={finished}
        onInput={handleInput}
      />

      <SpeedGraph wpmHistory={wpmHistory} peakWpm={peakWpm} />

      {/* ── Bottom controls ── */}
      <div className={styles.controls}>
        <button
          className={`${styles.soundBtn} ${soundOn ? styles.soundOn : ''}`}
          onClick={() => setSoundOn(s => !s)}
          aria-pressed={soundOn}
        >
          {soundOn ? '🔊' : '🔇'} Sound
        </button>

        <button className={styles.restartBtn} onClick={handleRestart}>
          ↺ New Test
        </button>
      </div>

      <p className={styles.hint}>Press <kbd className={styles.kbd}>Tab</kbd> to restart at any time</p>

      {/* ── Result overlay ── */}
      <ResultCard
        result={lastResult}
        visible={finished && !!lastResult}
        onRestart={handleRestart}
      />
    </div>
  );
}
