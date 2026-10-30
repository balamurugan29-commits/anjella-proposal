import React from 'react';
import { motion } from 'framer-motion';
import Bunny from '../assets/bunny';
import { Sparkles, Heart } from 'lucide-react';
import { sound } from '../assets/sound';

export default function WelcomeScreen({ onOpenSurprise }) {
  const handleClick = () => {
    sound.playLetterOpen();
    sound.startRomanticMusic();
    onOpenSurprise();
  };

  return (
    <div className="relative z-10 min-h-[82vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Little floating greeting pill */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-pink-200/80 shadow-[0_6px_20px_rgba(255,141,161,0.25)] text-pink-600 font-semibold text-xs tracking-wider uppercase mb-5"
      >
        <Sparkles className="w-4 h-4 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
        <span>A Little World Just For You</span>
        <Sparkles className="w-4 h-4 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
      </motion.div>

      {/* Main Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#3D2540] tracking-tight font-sans">
          Hey, <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">Anjella</span>
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="inline-block ml-2 align-middle"
          >
            ❤️
          </motion.span>
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base font-medium max-w-xs sm:max-w-md mx-auto">
          Someone has crafted something very special and sweet, just for your eyes only…
        </p>
      </motion.div>

      {/* Bunny Character */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, delay: 0.3 }}
        className="my-4 sm:my-6 relative cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => sound.playPop()}
      >
        <Bunny state="idle" size={260} />
        {/* Floating tiny heart bubble above bunny */}
        <motion.div
          animate={{ y: [-4, 6, -4], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="absolute -top-1 -right-2 bg-white/95 px-3 py-1 rounded-full shadow-md border border-pink-200 text-pink-500 text-xs font-bold flex items-center gap-1"
        >
          <span>for u</span>
          <Heart className="w-3 h-3 fill-pink-500 text-pink-500 animate-pulse" />
        </motion.div>
      </motion.div>

      {/* Surprise CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="relative group px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-extrabold text-base sm:text-lg shadow-[0_12px_32px_rgba(255,77,121,0.5)] hover:shadow-[0_16px_40px_rgba(255,77,121,0.65)] transition-all flex items-center gap-3 overflow-hidden border border-pink-300"
        >
          {/* Shimmer sweep */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
          
          <span className="tracking-wide">Open your surprise</span>
          <span className="text-xl group-hover:rotate-12 transition-transform">💌</span>
        </motion.button>

        <p className="text-[12px] text-pink-400 font-medium mt-3.5 tracking-wide">
          Tap anywhere to unfold our memories ✨
        </p>
      </motion.div>
    </div>
  );
}
