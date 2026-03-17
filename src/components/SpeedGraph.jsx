import React, { useRef, useEffect } from 'react';
import styles from './SpeedGraph.module.css';

/**
 * Canvas-based live WPM speed graph.
 * Redraws whenever wpmHistory changes.
 */
export default function SpeedGraph({ wpmHistory, peakWpm }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    draw(canvas, wpmHistory);
  }, [wpmHistory]);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.title}>Live Speed</span>
        {peakWpm > 0 && (
          <span className={styles.peak}>peak: {peakWpm} wpm</span>
        )}
      </div>
      <canvas ref={canvasRef} className={styles.canvas} width={800} height={80} />
    </div>
  );
}

// ── Drawing logic ──────────────────────────────────────────────────────────────

function draw(canvas, data) {
  const ctx  = canvas.getContext('2d');
  const W    = canvas.width;
  const H    = canvas.height;

  ctx.clearRect(0, 0, W, H);

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth   = 1;
  for (let i = 0; i <= 4; i++) {
    const y = (H * i) / 4;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  if (data.length < 2) {
    // Baseline
    ctx.strokeStyle = 'rgba(239,159,39,0.15)';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.moveTo(0, H);
    ctx.lineTo(W, H);
    ctx.stroke();
    return;
  }

  const max  = Math.max(...data, 20);
  const step = W / (data.length - 1);

  const points = data.map((v, i) => ({
    x: i * step,
    y: H - (v / max) * (H - 6),
  }));

  // Fill gradient
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, 'rgba(239,159,39,0.22)');
  grad.addColorStop(1, 'rgba(239,159,39,0)');

  ctx.beginPath();
  points.forEach(({ x, y }, i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.lineTo(points[points.length - 1].x, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  points.forEach(({ x, y }, i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.strokeStyle = '#EF9F27';
  ctx.lineWidth   = 2;
  ctx.lineJoin    = 'round';
  ctx.stroke();

  // Dot at latest point
  const last = points[points.length - 1];
  ctx.beginPath();
  ctx.arc(last.x, last.y, 3, 0, Math.PI * 2);
  ctx.fillStyle = '#EF9F27';
  ctx.fill();
}
