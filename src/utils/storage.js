/**
 * LocalStorage helpers for persisting run history.
 */

const STORAGE_KEY = 'kf_history';
const MAX_HISTORY = 10;

/**
 * @typedef {Object} RunResult
 * @property {number} wpm
 * @property {number} accuracy
 * @property {number} chars
 * @property {number} errors
 * @property {'easy'|'medium'|'hard'} difficulty
 * @property {string} timestamp  – toLocaleString()
 */

/**
 * Load stored history array (newest first).
 * @returns {RunResult[]}
 */
export function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

/**
 * Prepend a new result and persist (capped at MAX_HISTORY).
 * @param {RunResult} result
 * @returns {RunResult[]} updated history
 */
export function saveResult(result) {
  const history = [result, ...loadHistory()].slice(0, MAX_HISTORY);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Storage unavailable — silently ignore
  }
  return history;
}

/**
 * Clear all stored history.
 */
export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
