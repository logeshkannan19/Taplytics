/**
 * Lightweight sound feedback via Web Audio API.
 * All functions are no-ops when sound is disabled or API is unavailable.
 */

let audioCtx = null;

function getCtx() {
  if (!audioCtx) {
    const Ctor = window.AudioContext ?? window.webkitAudioContext;
    if (Ctor) audioCtx = new Ctor();
  }
  return audioCtx;
}

/**
 * Play a short tick sound.
 * @param {boolean} correct – true = high pitch, false = low pitch
 */
export function playTick(correct) {
  const ctx = getCtx();
  if (!ctx) return;

  try {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = correct ? 880 : 220;
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Silently ignore errors (e.g. context suspended)
  }
}

/**
 * Resume audio context if it was suspended by browser autoplay policy.
 * Call this once on user gesture (e.g. first keypress).
 */
export function resumeAudio() {
  const ctx = getCtx();
  if (ctx && ctx.state === 'suspended') ctx.resume();
}
