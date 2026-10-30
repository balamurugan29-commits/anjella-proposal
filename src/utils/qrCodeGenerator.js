import QRCode from 'qrcode';

/**
 * Generates a real working romantic QR code on a Canvas
 * With pink modules, high error correction, and a cute heart icon in the center.
 */
export async function generateRomanticQR(text, canvas, options = {}) {
  const {
    size = 280,
    colorDark = '#FF3366',
    colorLight = '#FFFFFF',
    addHeartCenter = true,
  } = options;

  if (!canvas) return;

  // Level 'H' provides up to 30% error correction, allowing center artwork
  await QRCode.toCanvas(canvas, text, {
    width: size,
    margin: 2,
    errorCorrectionLevel: 'H',
    color: {
      dark: colorDark,
      light: colorLight,
    },
  });

  const ctx = canvas.getContext('2d');
  if (!ctx || !addHeartCenter) return;

  // Draw cute heart badge in the center
  const center = size / 2;
  const heartSize = size * 0.18;

  // White circular backdrop for heart
  ctx.save();
  ctx.beginPath();
  ctx.arc(center, center, heartSize * 0.9, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(255, 77, 121, 0.4)';
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#FF8DA1';
  ctx.stroke();
  ctx.restore();

  // Draw pink heart in center
  ctx.save();
  ctx.translate(center, center - 2);
  const hScale = heartSize * 0.05;
  ctx.scale(hScale, hScale);
  ctx.beginPath();
  // Standard SVG heart path centered at 0,0
  ctx.moveTo(0, 3);
  ctx.bezierCurveTo(-5, -6, -14, -6, -14, 2);
  ctx.bezierCurveTo(-14, 8, -5, 14, 0, 18);
  ctx.bezierCurveTo(5, 14, 14, 8, 14, 2);
  ctx.bezierCurveTo(14, -6, 5, -6, 0, 3);
  ctx.fillStyle = '#FF2E63';
  ctx.fill();
  ctx.restore();
}
