import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Bunny from '../assets/bunny';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
import { sound } from '../assets/sound';

export default function ProposalPopup({ onAccept }) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [dodgeText, setDodgeText] = useState('💙 NO');
  const containerRef = useRef(null);

  const playfulMessages = [
    'Are you sure? 🥺',
    'Wait, think again! 🙈',
    'Look to the left! 👉❤️',
    'Bunny will cry! 🐰💔',
    'Nice try! Hehe 😜',
    'Wrong button! 💖',
    'There is only one answer! 🥰',
  ];

  // Evasive dodging mechanics for the NO button
  const handleNoDodge = () => {
    sound.playDodge();
    const nextCount = dodgeCount + 1;
    setDodgeCount(nextCount);

    // Pick playful teasing text
    const randomMsg = playfulMessages[(nextCount - 1) % playfulMessages.length];
    setDodgeText(randomMsg);

    // Gradually grow the YES button so she can easily tap YES!
    setYesScale((prev) => Math.min(prev + 0.12, 1.6));

    // Calculate a safe random jump within a bounding radius
    const maxX = 120;
    const maxY = 70;
    const randomX = (Math.random() - 0.5) * 2 * maxX;
    const randomY = (Math.random() - 0.5) * 2 * maxY;

    setNoPosition({ x: randomX, y: randomY });
  };

  const handleYesClick = () => {
    sound.playYesCelebration();
    setShowHeartBurst(true);

    // Massive colorful romantic confetti explosion
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#FF4D79', '#FF8DA1', '#FFD1DC', '#B794F4', '#FFD700', '#FFFFFF'];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors: colors,
        shapes: ['circle'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors: colors,
        shapes: ['circle'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Additional big center heart confetti burst
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FF2E63', '#FF8DA1', '#FFE4E9', '#A875F0'],
    });

    setTimeout(() => {
      onAccept();
    }, 1400);
  };

  return (
    <div className="relative z-10 max-w-xl mx-auto px-4 py-4 flex flex-col items-center">
      {/* Big Beating Heart Explosion Overlay when YES is clicked */}
      <AnimatePresence>
        {showHeartBurst && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.4, 25], opacity: [0, 1, 0.95] }}
            transition={{ duration: 1.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <Heart className="w-64 h-64 fill-pink-500 text-pink-500 drop-shadow-[0_0_50px_rgba(255,46,99,0.8)]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bunny Peeking with Love Letter */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative -mb-6 z-20 cursor-pointer"
        whileHover={{ scale: 1.04 }}
      >
        <Bunny state="letter" size={230} />
      </motion.div>

      {/* The Animated Proposal Popup Card with Dashed Pink and Blue Border */}
      <motion.div
        ref={containerRef}
        initial={{ scale: 0.88, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 18, delay: 0.2 }}
        className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 text-center relative z-10 shadow-[0_20px_50px_rgba(255,141,161,0.35)] dashed-border-proposal"
      >
        {/* Cute Wax Seal Stamp at top */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center shadow-md border-2 border-white">
          <Heart className="w-5 h-5 fill-white text-white" />
        </div>

        {/* Proposal Letter Header */}
        <div className="mt-2 mb-4">
          <span className="inline-block px-3 py-1 rounded-full bg-pink-50 text-[11px] font-bold text-pink-500 border border-pink-200 uppercase tracking-widest">
            A Message From My Heart
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#3E2540] font-sans mt-3 flex items-center justify-center gap-2">
            Dear Anjella <span className="text-pink-500 animate-heartbeat">❤️</span>
          </h3>
        </div>

        {/* Proposal Body Text */}
        <div className="space-y-3.5 text-slate-600 text-sm sm:text-base leading-relaxed px-2 font-medium">
          <p>
            You make my world more beautiful.
          </p>
          <p>
            Every little moment with you means so much to me.
          </p>
          <p className="text-pink-600 font-semibold italic text-base sm:text-lg pt-1">
            I have a little question for you…
          </p>
        </div>

        {/* The Big Question */}
        <div className="my-6 py-4 px-3 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 border border-pink-200/80 shadow-inner">
          <p className="font-handwritten text-3xl sm:text-4xl font-black text-pink-600 tracking-wide">
            Will you be mine? 🥺💗
          </p>
        </div>

        {/* Action Buttons: YES and NO */}
        <div className="relative min-h-[90px] flex items-center justify-center gap-4 mt-2">
          {/* YES BUTTON */}
          <motion.button
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.08 }}
            whileTap={{ scale: yesScale * 0.95 }}
            onClick={handleYesClick}
            className="z-20 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-extrabold text-base sm:text-lg shadow-[0_8px_25px_rgba(255,77,121,0.5)] hover:shadow-[0_12px_32px_rgba(255,77,121,0.7)] transition-all flex items-center gap-2 border-2 border-pink-300"
          >
            <Heart className="w-5 h-5 fill-white text-white animate-heartbeat" />
            <span>YES ❤️</span>
          </motion.button>

          {/* NO BUTTON (Evasive / Dodging Interaction) */}
          <motion.button
            animate={{ x: noPosition.x, y: noPosition.y }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            onMouseEnter={handleNoDodge}
            onTouchStart={handleNoDodge}
            onClick={handleNoDodge}
            className="z-10 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs sm:text-sm border border-slate-300 shadow-sm transition-colors cursor-pointer select-none whitespace-nowrap"
          >
            {dodgeText}
          </motion.button>
        </div>

        {/* Teasing Subtitle when dodging happens */}
        {dodgeCount > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[12px] text-pink-500 font-bold mt-2"
          >
            {dodgeCount >= 3 ? "Hehe, you know you want to click YES! 🥰" : "The button is playing hard to get! 🙈"}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
