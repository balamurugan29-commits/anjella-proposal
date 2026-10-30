import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Bunny from '../assets/bunny';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RefreshCw, Camera, PartyPopper } from 'lucide-react';
import { sound } from '../assets/sound';

export default function CelebrationScreen({ photos, onReplay, onOpenPhotoManager }) {
  const [photoIndex, setPhotoIndex] = useState(0);

  const activePhotos = photos && photos.length > 0 ? photos : [];

  // Launch initial confetti bursts on mount
  useEffect(() => {
    sound.playYesCelebration();

    const burst = () => {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#FF2E63', '#FF8DA1', '#FFD1DC', '#B794F4', '#FFD700'],
      });
    };

    burst();
    const timer1 = setTimeout(burst, 1200);
    const timer2 = setTimeout(burst, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Romantic gentle slideshow loop
  useEffect(() => {
    if (activePhotos.length <= 1) return;
    const interval = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % activePhotos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [activePhotos.length]);

  const handleExtraConfetti = () => {
    sound.playPop();
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FF2E63', '#FF6B8B', '#FFD1DC', '#C49BFF', '#FFB800'],
    });
  };

  const currentPhoto = activePhotos[photoIndex] || activePhotos[0];

  return (
    <div className="relative z-10 max-w-xl mx-auto px-4 py-8 flex flex-col items-center text-center">
      {/* Top Celebration Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-100 border border-pink-300 text-pink-700 font-extrabold text-xs uppercase tracking-widest shadow-md mb-4"
      >
        <PartyPopper className="w-4 h-4 text-pink-600 animate-bounce" />
        <span>She Said YES! 💍✨</span>
        <PartyPopper className="w-4 h-4 text-pink-600 animate-bounce" />
      </motion.div>

      {/* Main Celebration Heading */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl font-black text-[#3E2442] font-sans tracking-tight">
          Anjella Said YES! <span className="text-pink-500 animate-heartbeat inline-block">❤️</span>
        </h1>
        <p className="font-handwritten text-4xl sm:text-5xl font-black text-pink-600 mt-2">
          Yayyyyy! 🥹🫂❤️
        </p>
        <p className="text-slate-600 font-medium text-base sm:text-lg mt-3 max-w-md mx-auto">
          “You’re my favourite person, and I’m so lucky to have you.”
        </p>
      </motion.div>

      {/* Extremely Happy Bunny Jumping in Celebration */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 14, delay: 0.2 }}
        className="my-3 relative cursor-pointer"
        onClick={handleExtraConfetti}
        whileHover={{ scale: 1.05 }}
      >
        <Bunny state="celebrate" size={250} />
      </motion.div>

      {/* Romantic Photo Slideshow Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="w-full max-w-sm bg-white rounded-3xl p-4 sm:p-5 pb-6 polaroid-card border border-pink-100 relative mt-2 mb-6"
      >
        {/* Tape sticker on top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-pink-200/90 rounded-sm rotate-[-2deg] border-t border-b border-pink-300 shadow-sm" />

        <div className="relative aspect-[4/4] rounded-2xl overflow-hidden bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 flex items-center justify-center shadow-inner">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhoto?.id || photoIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full"
            >
              {currentPhoto?.url ? (
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.caption}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  onClick={onOpenPhotoManager}
                  className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer text-pink-500 hover:bg-pink-100/40 transition-colors"
                >
                  <Camera className="w-10 h-10 mb-2 opacity-80" />
                  <span className="font-bold text-sm">Add Our Memories Together</span>
                  <span className="text-xs text-pink-400 mt-1">Tap to upload real photos ❤️</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Little Floating Heart Badge */}
          <div className="absolute bottom-3 right-3 bg-white/95 px-3 py-1 rounded-full shadow-md text-xs font-bold text-pink-600 flex items-center gap-1 border border-pink-100">
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
            <span>Forever</span>
          </div>
        </div>

        {/* Caption */}
        <div className="mt-3.5 text-center">
          <p className="font-handwritten text-2xl sm:text-3xl font-bold text-pink-600">
            {currentPhoto?.caption || 'You and me 🫂'}
          </p>
        </div>
      </motion.div>

      {/* Romantic Conclusion Quote */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-md py-4 px-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-pink-200/80 shadow-sm mb-6"
      >
        <p className="font-handwritten text-3xl sm:text-4xl font-extrabold text-pink-500 tracking-wide">
          “Forever starts with a little YES. 💗”
        </p>
        <p className="text-xs text-slate-500 mt-2 font-medium">
          I promise to love, protect, and make you smile every day of our lives. ✨
        </p>
      </motion.div>

      {/* Celebration Actions Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-sm">
        <button
          onClick={handleExtraConfetti}
          className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          <span>More Confetti! 🎉</span>
        </button>

        <button
          onClick={onReplay}
          className="py-3 px-4 rounded-2xl bg-white border border-pink-200 text-slate-600 font-bold text-xs shadow-sm hover:bg-pink-50 transition-all flex items-center justify-center gap-1.5 active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5 text-pink-500" />
          <span>Replay 🔄</span>
        </button>
      </div>
    </div>
  );
}
