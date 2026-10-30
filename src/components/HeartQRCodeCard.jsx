import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { generateRomanticQR } from '../utils/qrCodeGenerator';
import { Download, Printer, Heart, ExternalLink, Sparkles, Copy, Check } from 'lucide-react';
import { sound } from '../assets/sound';

export default function HeartQRCodeCard({ onEnterExperience }) {
  const [targetUrl, setTargetUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Default to the current window location (or placeholder if localhost)
    if (typeof window !== 'undefined') {
      const current = window.location.href;
      setTargetUrl(current);
    }
  }, []);

  useEffect(() => {
    if (targetUrl && canvasRef.current) {
      generateRomanticQR(targetUrl, canvasRef.current, {
        size: 260,
        colorDark: '#FF2E63',
        colorLight: '#FFFFFF',
        addHeartCenter: true,
      });
    }
  }, [targetUrl]);

  const handleCopyLink = () => {
    sound.playPop();
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCard = () => {
    sound.playPop();
    if (!canvasRef.current) return;

    // Create a composite high-res card on a temporary canvas
    const width = 600;
    const height = 800;
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = width;
    exportCanvas.height = height;
    const ctx = exportCanvas.getContext('2d');

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#FFF5F8');
    bgGrad.addColorStop(1, '#FFE9F0');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // White Card with rounded corners
    const cardX = 40;
    const cardY = 50;
    const cardW = 520;
    const cardH = 700;
    const radius = 24;

    ctx.save();
    ctx.shadowColor = 'rgba(255, 141, 161, 0.35)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 15;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, radius);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.restore();

    // Border
    ctx.strokeStyle = '#FFE0E8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, radius);
    ctx.stroke();

    // Text: "Hey Anjella ❤️"
    ctx.fillStyle = '#FF2E63';
    ctx.font = 'bold 38px "Quicksand", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Hey Anjella ❤️', width / 2, cardY + 80);

    // Text: "Scan this little surprise…"
    ctx.fillStyle = '#6B5870';
    ctx.font = '22px "Quicksand", sans-serif';
    ctx.fillText('Scan this little surprise…', width / 2, cardY + 125);

    // Draw QR Code
    const qrSize = 340;
    const qrX = (width - qrSize) / 2;
    const qrY = cardY + 160;

    // Decorative pink heart frame behind QR
    ctx.save();
    ctx.fillStyle = '#FFF0F5';
    ctx.beginPath();
    ctx.roundRect(qrX - 14, qrY - 14, qrSize + 28, qrSize + 28, 20);
    ctx.fill();
    ctx.strokeStyle = '#FFB6C8';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 6]);
    ctx.stroke();
    ctx.restore();

    ctx.drawImage(canvasRef.current, qrX, qrY, qrSize, qrSize);

    // Text: "Open when you are alone 💗"
    ctx.fillStyle = '#FF4D79';
    ctx.font = 'italic 600 24px "Caveat", cursive, sans-serif';
    ctx.fillText('Open when you are alone 💗', width / 2, cardY + qrSize + 225);

    ctx.fillStyle = '#9C88A0';
    ctx.font = '14px "Quicksand", sans-serif';
    ctx.fillText('Made with all my love ✨', width / 2, cardY + qrSize + 265);

    // Download
    const link = document.createElement('a');
    link.download = 'Anjella-Proposal-Surprise-Card.png';
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  };

  const handlePrint = () => {
    sound.playPop();
    window.print();
  };

  return (
    <div className="relative z-10 max-w-xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold tracking-wide shadow-sm border border-pink-200">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          STEP 1: THE SECRET INVITATION CARD
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#3E2B42] mt-3 font-sans">
          A Heart For Anjella
        </h1>
        <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
          Print this printable card or share the QR code with Anjella. Scanning it opens her personal surprise!
        </p>
      </motion.div>

      {/* The Printable Romantic White Card */}
      <motion.div
        ref={cardRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20 }}
        className="w-full max-w-sm bg-white rounded-3xl p-7 text-center relative border-2 border-pink-100 shadow-[0_20px_50px_rgba(255,141,161,0.3)] backdrop-blur-sm"
      >
        {/* Cute tape decoration at top */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-pink-200/70 backdrop-blur-sm rounded-sm rotate-[-1.5deg] border-t border-b border-pink-300/40 shadow-sm" />

        {/* Card Header Message */}
        <div className="mt-2 mb-4">
          <h2 className="text-2xl font-bold text-pink-600 flex items-center justify-center gap-1.5">
            Hey Anjella <Heart className="w-6 h-6 fill-pink-500 text-pink-500 animate-heartbeat inline" />
          </h2>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Scan this little surprise…
          </p>
        </div>

        {/* Heart QR Code Frame */}
        <div className="relative mx-auto my-4 p-4 rounded-2xl bg-gradient-to-b from-pink-50 to-pink-100/50 border-2 border-dashed border-pink-300 flex items-center justify-center shadow-inner">
          {/* Subtle Heart Background glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
            <Heart className="w-48 h-48 fill-pink-400 text-pink-400" />
          </div>

          {/* Real Canvas QR Code */}
          <canvas
            ref={canvasRef}
            className="rounded-xl shadow-md z-10 max-w-full h-auto"
            style={{ width: '220px', height: '220px' }}
          />
        </div>

        {/* Card Footer Message */}
        <div className="mt-4 pt-2 border-t border-pink-100">
          <p className="font-handwritten text-2xl font-bold text-pink-500 tracking-wide">
            “Open when you are alone 💗”
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Keep your sound on for the best surprise 🎧
          </p>
        </div>
      </motion.div>

      {/* Target URL Configuration (Real QR Destination) */}
      <div className="w-full max-w-sm mt-6 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-pink-200/80 shadow-sm">
        <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center justify-between">
          <span>Website URL for QR Code:</span>
          <span className="text-[10px] text-pink-500 font-normal">Real live link</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="https://your-domain.vercel.app"
            className="flex-1 text-xs px-3 py-2 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/30 text-slate-700"
          />
          <button
            onClick={handleCopyLink}
            className="px-3 py-2 rounded-xl bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors text-xs font-semibold flex items-center gap-1"
            title="Copy URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
        <p className="text-[11px] text-slate-400 mt-1.5 leading-snug">
          Tip: Once deployed to Vercel/Netlify, paste your final domain here to print the official code!
        </p>
      </div>

      {/* Card Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-5 w-full max-w-sm">
        <button
          onClick={handleDownloadCard}
          className="flex-1 py-3 px-4 rounded-2xl bg-white border border-pink-200 text-pink-600 font-bold text-xs shadow-sm hover:shadow hover:bg-pink-50 transition-all flex items-center justify-center gap-1.5"
        >
          <Download className="w-4 h-4 text-pink-500" />
          Download Card
        </button>
        <button
          onClick={handlePrint}
          className="flex-1 py-3 px-4 rounded-2xl bg-white border border-pink-200 text-purple-600 font-bold text-xs shadow-sm hover:shadow hover:bg-purple-50 transition-all flex items-center justify-center gap-1.5"
        >
          <Printer className="w-4 h-4 text-purple-500" />
          Print Card
        </button>
      </div>

      {/* Primary CTA: Experience the Proposal */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          sound.playPop();
          onEnterExperience();
        }}
        className="mt-6 w-full max-w-sm py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-extrabold text-sm shadow-[0_10px_25px_rgba(255,77,121,0.45)] hover:shadow-[0_14px_30px_rgba(255,77,121,0.6)] transition-all flex items-center justify-center gap-2 group"
      >
        <span>Open Proposal Experience as Anjella</span>
        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  );
}
