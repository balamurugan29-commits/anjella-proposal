import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Romantic ambient background with floating hearts, sparkles and stars
 */
export default function FloatingHeartsBackground() {
  // Generate random particles once
  const particles = useMemo(() => {
    const items = [];
    const symbols = ['❤️', '💖', '💗', '✨', '🌸', '⭐', '🤍'];
    for (let i = 0; i < 28; i++) {
      items.push({
        id: i,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        left: `${Math.random() * 96}%`,
        size: Math.random() * 16 + 12,
        duration: Math.random() * 8 + 8,
        delay: Math.random() * 7,
        opacity: Math.random() * 0.4 + 0.35,
        sway: Math.random() * 30 - 15,
      });
    }
    return items;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft gradient aura orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl animate-pulse-slow" />
      <div className="absolute top-1/2 -right-32 w-[30rem] h-[30rem] rounded-full bg-purple-200/30 blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-rose-200/35 blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }} />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none"
          style={{
            left: p.left,
            bottom: '-40px',
            fontSize: `${p.size}px`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -1100],
            x: [0, p.sway, -p.sway, 0],
            rotate: [0, p.sway * 2, -p.sway * 2, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
}
