import { useState, useEffect, useRef, useCallback } from 'react';
import { getRandomParagraph } from '../utils/paragraphs';
import { calculateWPM, calculateAccuracy, buildCharArray, evaluateInput } from '../utils/wpm';
import { saveResult } from '../utils/storage';
import { playTick, resumeAudio } from '../utils/audio';

const TIMER_DURATION = 60; // seconds

/**
 * Core typing test state machine.
 * Encapsulates all test logic — components only consume state + actions.
 */
export function useTypingTest(difficulty = 'easy', soundOn = false) {
  const [chars,        setChars]        = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue,   setInputValue]   = useState('');
  const [timeLeft,     setTimeLeft]     = useState(TIMER_DURATION);
  const [started,      setStarted]      = useState(false);
  const [finished,     setFinished]     = useState(false);
  const [wpm,          setWpm]          = useState(0);
  const [accuracy,     setAccuracy]     = useState(null);
  const [totalTyped,   setTotalTyped]   = useState(0);
  const [correctTyped, setCorrectTyped] = useState(0);
  const [errors,       setErrors]       = useState(0);
  const [wpmHistory,   setWpmHistory]   = useState([]);
  const [peakWpm,      setPeakWpm]      = useState(0);
  const [lastResult,   setLastResult]   = useState(null);

  const startTimeRef   = useRef(null);
  const timerRef       = useRef(null);
  const graphTimerRef  = useRef(null);
  const soundOnRef     = useRef(soundOn);
  soundOnRef.current   = soundOn;

  // ── Helpers ────────────────────────────────────────────────
  const stopTimers = useCallback(() => {
    clearInterval(timerRef.current);
    clearInterval(graphTimerRef.current);
  }, []);

  const endTest = useCallback((finalChars, finalCorrect, finalTotal, finalErrors) => {
    stopTimers();
    const finalWpm = calculateWPM(finalCorrect, startTimeRef.current);
    const finalAcc = calculateAccuracy(finalCorrect, finalTotal) ?? 0;

    setFinished(true);

    const result = {
      wpm: finalWpm,
      accuracy: finalAcc,
      chars: finalTotal,
      errors: finalErrors,
      difficulty,
      timestamp: new Date().toLocaleString(),
    };
    setLastResult(result);
    saveResult(result);
  }, [difficulty, stopTimers]);

  // ── Init / restart ─────────────────────────────────────────
  const initTest = useCallback(() => {
    stopTimers();
    const paragraph = getRandomParagraph(difficulty);
    setChars(buildCharArray(paragraph));
    setCurrentIndex(0);
    setInputValue('');
    setTimeLeft(TIMER_DURATION);
    setStarted(false);
    setFinished(false);
    setWpm(0);
    setAccuracy(null);
    setTotalTyped(0);
    setCorrectTyped(0);
    setErrors(0);
    setWpmHistory([]);
    setPeakWpm(0);
    setLastResult(null);
    startTimeRef.current = null;
  }, [difficulty, stopTimers]);

  // Re-init when difficulty changes
  useEffect(() => { initTest(); }, [initTest]);

  // ── Timer loop ─────────────────────────────────────────────
  const startTimers = useCallback(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Trigger end via a ref snapshot — avoids stale closure
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    graphTimerRef.current = setInterval(() => {
      const currentWpm = calculateWPM(
        // We read correctTyped via a ref to avoid stale closure
        correctTypedRef.current,
        startTimeRef.current
      );
      setWpmHistory(prev => [...prev, currentWpm]);
      setPeakWpm(prev => Math.max(prev, currentWpm));
    }, 1000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // correctTyped ref for the graph timer
  const correctTypedRef = useRef(0);

  // Watch timeLeft → end test at 0
  useEffect(() => {
    if (timeLeft === 0 && started && !finished) {
      setFinished(true);
      stopTimers();
      const finalWpm = calculateWPM(correctTypedRef.current, startTimeRef.current);
      const finalAcc = calculateAccuracy(correctTypedRef.current, totalTyped) ?? 0;
      const result = {
        wpm: finalWpm,
        accuracy: finalAcc,
        chars: totalTyped,
        errors,
        difficulty,
        timestamp: new Date().toLocaleString(),
      };
      setLastResult(result);
      saveResult(result);
    }
  }, [timeLeft, started, finished, totalTyped, errors, difficulty, stopTimers]);

  // ── Keystroke handler ──────────────────────────────────────
  const handleInput = useCallback((value) => {
    if (finished) return;

    // Start timer on first character
    if (!started && value.length > 0) {
      setStarted(true);
      startTimeRef.current = Date.now();
      resumeAudio();
      startTimers();
    }

    setInputValue(value);

    const { chars: updatedChars, correctCount, errorCount } = evaluateInput(chars, value);
    setChars(updatedChars);
    setCurrentIndex(value.length);

    const newTotal   = value.length;
    const newCorrect = correctCount;
    const newErrors  = errorCount;

    setTotalTyped(newTotal);
    setCorrectTyped(newCorrect);
    correctTypedRef.current = newCorrect;
    setErrors(newErrors);

    const currentWpm = calculateWPM(newCorrect, startTimeRef.current);
    setWpm(currentWpm);
    setAccuracy(calculateAccuracy(newCorrect, newTotal));

    // Sound feedback for the most recent character
    if (value.length > 0 && soundOnRef.current) {
      const lastIdx = value.length - 1;
      const isCorrect = updatedChars[lastIdx]?.status === 'correct';
      playTick(isCorrect);
    }

    // Finished the paragraph
    if (value.length >= chars.length) {
      endTest(updatedChars, newCorrect, newTotal, newErrors);
    }
  }, [finished, started, chars, startTimers, endTest]);

  return {
    chars,
    currentIndex,
    inputValue,
    timeLeft,
    started,
    finished,
    wpm,
    accuracy,
    totalTyped,
    correctTyped,
    errors,
    wpmHistory,
    peakWpm,
    lastResult,
    handleInput,
    restart: initTest,
  };
}
