/**
 * WPM & accuracy calculation utilities.
 *
 * Standard WPM formula:
 *   WPM = (characters typed / 5) / elapsed_minutes
 *
 * The "/ 5" treats every 5 characters as one "word",
 * making the metric comparable across different texts.
 */

/**
 * Calculate Words Per Minute.
 * @param {number} correctChars  – number of correctly typed characters
 * @param {number} startTime     – Date.now() timestamp when typing started
 * @returns {number} rounded WPM (0 if not started)
 */
export function calculateWPM(correctChars, startTime) {
  if (!startTime || correctChars === 0) return 0;
  const elapsedMinutes = (Date.now() - startTime) / 60_000;
  if (elapsedMinutes === 0) return 0;
  return Math.round((correctChars / 5) / elapsedMinutes);
}

/**
 * Calculate accuracy as a percentage.
 * @param {number} correctChars  – number of correctly typed characters
 * @param {number} totalChars    – total keystrokes made
 * @returns {number|null} rounded percentage, or null if nothing typed yet
 */
export function calculateAccuracy(correctChars, totalChars) {
  if (totalChars === 0) return null;
  return Math.round((correctChars / totalChars) * 100);
}

/**
 * Build the per-character state array from a paragraph string.
 * @param {string} text
 * @returns {{ char: string, status: 'pending'|'correct'|'wrong' }[]}
 */
export function buildCharArray(text) {
  return text.split('').map(char => ({ char, status: 'pending' }));
}

/**
 * Evaluate typed input against the target char array.
 * Returns an updated copy — does not mutate the original.
 * @param {{ char: string, status: string }[]} charArray
 * @param {string} typedValue
 * @returns {{ chars: typeof charArray, correctCount: number, errorCount: number }}
 */
export function evaluateInput(charArray, typedValue) {
  let correctCount = 0;
  let errorCount = 0;

  const chars = charArray.map((c, i) => {
    if (i >= typedValue.length) return { ...c, status: 'pending' };
    const correct = typedValue[i] === c.char;
    if (correct) correctCount++;
    else errorCount++;
    return { ...c, status: correct ? 'correct' : 'wrong' };
  });

  return { chars, correctCount, errorCount };
}
