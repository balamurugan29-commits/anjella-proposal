import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Kawaii White-and-Pink Bunny with Purple Bow
 * States:
 * - 'idle': holds a beating pink heart, blinks eyes, breathes gently, ear twitch
 * - 'letter': holds an envelope with a heart wax seal
 * - 'celebrate': arms raised in victory/cheer, heart eyes, big blushing smile, jumping
 * - 'shy': hands together, blushing cheeks
 */
export default function Bunny({ state = 'idle', size = 260, className = '' }) {
  const [isBlinking, setIsBlinking] = useState(false);

  // Automatic blinking every 3.5 - 5 seconds
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size * 1.15 }}
    >
      <motion.svg
        viewBox="0 0 200 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
        animate={
          state === 'celebrate'
            ? { y: [0, -18, 0], rotate: [-2, 2, -2] }
            : { y: [0, -6, 0] }
        }
        transition={{
          repeat: Infinity,
          duration: state === 'celebrate' ? 0.6 : 3,
          ease: 'easeInOut',
        }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="bunnyFur" x1="100" y1="50" x2="100" y2="210" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.75" stopColor="#FFF2F5" />
            <stop offset="1" stopColor="#FFE0E8" />
          </linearGradient>

          <linearGradient id="innerEarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFAEC0" />
            <stop offset="100%" stopColor="#FF7A9A" />
          </linearGradient>

          <linearGradient id="bowGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C49BFF" />
            <stop offset="50%" stopColor="#A875F0" />
            <stop offset="100%" stopColor="#8A4FE8" />
          </linearGradient>

          <linearGradient id="heartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6B8B" />
            <stop offset="100%" stopColor="#FF2E63" />
          </linearGradient>

          {/* Soft Shadow */}
          <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 141, 161, 0.35)" />
            <stop offset="100%" stopColor="rgba(255, 141, 161, 0)" />
          </radialGradient>
        </defs>

        {/* Soft shadow under bunny */}
        <ellipse cx="100" cy="220" rx="55" ry="9" fill="url(#groundShadow)" />

        {/* Left Ear */}
        <motion.g
          animate={
            state === 'celebrate'
              ? { rotate: [-10, 5, -10], originX: '70px', originY: '70px' }
              : { rotate: [-2, 3, -2], originX: '70px', originY: '70px' }
          }
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        >
          {/* Ear outline */}
          <ellipse cx="72" cy="52" rx="16" ry="46" fill="url(#bunnyFur)" stroke="#FFB6C8" strokeWidth="2.5" transform="rotate(-14 72 52)" />
          {/* Inner Ear Pink */}
          <ellipse cx="72" cy="53" rx="9" ry="34" fill="url(#innerEarGrad)" opacity="0.85" transform="rotate(-14 72 53)" />
        </motion.g>

        {/* Right Ear (has purple bow) */}
        <motion.g
          animate={
            state === 'celebrate'
              ? { rotate: [5, -10, 5], originX: '130px', originY: '70px' }
              : { rotate: [2, -3, 2], originX: '130px', originY: '70px' }
          }
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut', delay: 0.2 }}
        >
          {/* Ear outline */}
          <ellipse cx="128" cy="52" rx="16" ry="46" fill="url(#bunnyFur)" stroke="#FFB6C8" strokeWidth="2.5" transform="rotate(14 128 52)" />
          {/* Inner Ear Pink */}
          <ellipse cx="128" cy="53" rx="9" ry="34" fill="url(#innerEarGrad)" opacity="0.85" transform="rotate(14 128 53)" />
        </motion.g>

        {/* Little Purple Bow on Right Ear */}
        <g id="purpleBow" transform="translate(138, 70)">
          {/* Left loop */}
          <path d="M-6 0 C-14 -10 -22 -4 -16 6 C-12 12 -4 4 0 0" fill="url(#bowGrad)" stroke="#7435D8" strokeWidth="1" />
          {/* Right loop */}
          <path d="M6 0 C14 -10 22 -4 16 6 C12 12 4 4 0 0" fill="url(#bowGrad)" stroke="#7435D8" strokeWidth="1" />
          {/* Ribbons hanging down */}
          <path d="M-2 4 L-8 16 L-2 14 L0 4" fill="#9960E6" />
          <path d="M2 4 L8 16 L2 14 L0 4" fill="#8A4FE8" />
          {/* Center Knot */}
          <circle cx="0" cy="0" r="4.5" fill="#E6D4FF" stroke="#7435D8" strokeWidth="1" />
          <circle cx="-1" cy="-1" r="1.5" fill="#FFFFFF" />
        </g>

        {/* Bunny Body */}
        <path
          d="M58 140 C58 120 72 105 100 105 C128 105 142 120 142 140 C145 165 148 195 100 195 C52 195 55 165 58 140 Z"
          fill="url(#bunnyFur)"
          stroke="#FFB6C8"
          strokeWidth="2.5"
        />

        {/* Bunny Head */}
        <ellipse cx="100" cy="115" rx="46" ry="39" fill="url(#bunnyFur)" stroke="#FFB6C8" strokeWidth="2.5" />

        {/* Rosy Pink Cheeks */}
        <ellipse cx="70" cy="126" rx="9" ry="6" fill="#FF8DA1" opacity="0.65" />
        <ellipse cx="130" cy="126" rx="9" ry="6" fill="#FF8DA1" opacity="0.65" />

        {/* Eyes State */}
        {state === 'celebrate' ? (
          /* Joyful / Heart Eyes in Celebration */
          <g>
            {/* Left heart eye */}
            <path
              d="M74 116 C74 110 67 106 63 111 C59 106 52 110 52 116 C52 124 63 129 63 129 C63 129 74 124 74 116 Z"
              fill="#FF2E63"
              transform="scale(0.85) translate(8, 5)"
            />
            {/* Right heart eye */}
            <path
              d="M74 116 C74 110 67 106 63 111 C59 106 52 110 52 116 C52 124 63 129 63 129 C63 129 74 124 74 116 Z"
              fill="#FF2E63"
              transform="scale(0.85) translate(88, 5)"
            />
          </g>
        ) : isBlinking ? (
          /* Blinking closed eyes */
          <g stroke="#3D293E" strokeWidth="2.5" strokeLinecap="round">
            <path d="M68 116 Q75 120 82 116" />
            <path d="M118 116 Q125 120 132 116" />
          </g>
        ) : (
          /* Normal Kawaii sparkling eyes */
          <g>
            {/* Left Eye */}
            <circle cx="75" cy="114" r="6" fill="#3D293E" />
            <circle cx="73" cy="112" r="2.2" fill="#FFFFFF" />
            <circle cx="77.5" cy="116.5" r="1.1" fill="#FFFFFF" />

            {/* Right Eye */}
            <circle cx="125" cy="114" r="6" fill="#3D293E" />
            <circle cx="123" cy="112" r="2.2" fill="#FFFFFF" />
            <circle cx="127.5" cy="116.5" r="1.1" fill="#FFFFFF" />
          </g>
        )}

        {/* Cute Bunny Nose */}
        <polygon points="100,121 97,125 103,125" fill="#FF7A9A" />

        {/* Bunny Mouth */}
        {state === 'celebrate' ? (
          /* Open happy mouth */
          <path d="M94 127 Q100 138 106 127" fill="#FF5E85" stroke="#3D293E" strokeWidth="1.8" strokeLinecap="round" />
        ) : (
          /* Cute w-mouth */
          <path d="M95 125 Q97.5 129 100 126 Q102.5 129 105 125" stroke="#3D293E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        )}

        {/* Little Bunny Feet */}
        <ellipse cx="78" cy="198" rx="13" ry="8" fill="url(#bunnyFur)" stroke="#FFB6C8" strokeWidth="2" />
        <ellipse cx="78" cy="198" rx="6" ry="3.5" fill="#FFBCCB" />

        <ellipse cx="122" cy="198" rx="13" ry="8" fill="url(#bunnyFur)" stroke="#FFB6C8" strokeWidth="2" />
        <ellipse cx="122" cy="198" rx="6" ry="3.5" fill="#FFBCCB" />

        {/* HANDS & ITEMS (Depends on State) */}
        {state === 'celebrate' ? (
          /* Raised happy arms in victory */
          <g>
            {/* Left arm raised */}
            <path d="M60 145 Q40 120 48 108 Q56 102 68 135" fill="url(#bunnyFur)" stroke="#FFB6C8" strokeWidth="2" />
            {/* Right arm raised */}
            <path d="M140 145 Q160 120 152 108 Q144 102 132 135" fill="url(#bunnyFur)" stroke="#FFB6C8" strokeWidth="2" />
            {/* Little flowers / sparkles from hands */}
            <circle cx="44" cy="98" r="4" fill="#FF4D79" />
            <circle cx="156" cy="98" r="4" fill="#FF4D79" />
          </g>
        ) : state === 'letter' ? (
          /* Holding a sealed love letter */
          <g>
            {/* Envelope */}
            <g transform="translate(72, 140)">
              <rect x="0" y="0" width="56" height="38" rx="4" fill="#FFF8F0" stroke="#FF8DA1" strokeWidth="2" />
              {/* Envelope flap lines */}
              <path d="M0 0 L28 20 L56 0" stroke="#FF8DA1" strokeWidth="1.5" fill="none" />
              <path d="M0 38 L22 16" stroke="#FFD1DC" strokeWidth="1.5" />
              <path d="M56 38 L34 16" stroke="#FFD1DC" strokeWidth="1.5" />
              {/* Heart Wax Seal */}
              <circle cx="28" cy="19" r="6" fill="#FF2E63" />
              <path
                d="M28 22.5 L26.8 21.4 C23 18.2 21 16.5 21 14.5 C21 12.8 22.3 11.5 24 11.5 C25 11.5 26 12 26.5 12.8 C27 12 28 11.5 29 11.5 C30.7 11.5 32 12.8 32 14.5 C32 16.5 30 18.2 26.2 21.4 L28 22.5 Z"
                fill="#FFFFFF"
                transform="scale(0.5) translate(28, 12)"
              />
            </g>
            {/* Paws holding envelope */}
            <ellipse cx="70" cy="158" rx="9" ry="7" fill="url(#bunnyFur)" stroke="#FFB6C8" strokeWidth="2" transform="rotate(25 70 158)" />
            <ellipse cx="130" cy="158" rx="9" ry="7" fill="url(#bunnyFur)" stroke="#FFB6C8" strokeWidth="2" transform="rotate(-25 130 158)" />
          </g>
        ) : (
          /* Default: Holding a beating pink heart */
          <g>
            {/* Beating Heart */}
            <motion.g
              animate={{ scale: [1, 1.14, 1] }}
              transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
              style={{ originX: '100px', originY: '155px' }}
            >
              <path
                d="M100 174 L97 171 C85 160 77 153 77 144 C77 137 83 131 90 131 C94 131 98 133 100 136 C102 133 106 131 110 131 C117 131 123 137 123 144 C123 153 115 160 103 171 L100 174 Z"
                fill="url(#heartGrad)"
                stroke="#FF1B55"
                strokeWidth="1.5"
                filter="drop-shadow(0 4px 8px rgba(255, 46, 99, 0.4))"
              />
              {/* Heart shine */}
              <ellipse cx="88" cy="138" rx="3.5" ry="2" fill="#FFFFFF" opacity="0.6" transform="rotate(-30 88 138)" />
            </motion.g>

            {/* Paws holding heart */}
            <ellipse cx="82" cy="156" rx="9" ry="7" fill="url(#bunnyFur)" stroke="#FFB6C8" strokeWidth="2" transform="rotate(30 82 156)" />
            <ellipse cx="118" cy="156" rx="9" ry="7" fill="url(#bunnyFur)" stroke="#FFB6C8" strokeWidth="2" transform="rotate(-30 118 156)" />
          </g>
        )}
      </motion.svg>
    </div>
  );
}
