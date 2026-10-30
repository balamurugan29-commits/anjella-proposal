import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Camera, Grid, Eye } from 'lucide-react';
import { sound } from '../assets/sound';

export default function PhotoGalleryScreen({ photos, onOpenPhotoManager, onProceedToProposal }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [viewMode, setViewMode] = useState('slideshow'); // 'slideshow' | 'grid'

  const activePhotos = photos && photos.length > 0 ? photos : [];

  // Auto-play slideshow every 4.5 seconds
  useEffect(() => {
    if (!isAutoPlay || viewMode !== 'slideshow' || activePhotos.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activePhotos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlay, activePhotos.length, viewMode]);

  const handleNext = () => {
    sound.playPop();
    setCurrentIndex((prev) => (prev + 1) % activePhotos.length);
  };

  const handlePrev = () => {
    sound.playPop();
    setCurrentIndex((prev) => (prev - 1 + activePhotos.length) % activePhotos.length);
  };

  const currentPhoto = activePhotos[currentIndex] || activePhotos[0];
  const isTallStrip = currentPhoto?.isStrip || currentPhoto?.url?.includes('photo1');

  return (
    <div className="relative z-10 max-w-2xl mx-auto px-4 py-6 flex flex-col items-center">
      {/* Header Pill */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 border border-pink-200 text-pink-600 font-semibold text-xs tracking-wide shadow-sm mb-3"
      >
        <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
        <span>STEP 3: OUR MEMORIES</span>
      </motion.div>

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-3xl sm:text-4xl font-extrabold text-[#3E2844] text-center font-sans"
      >
        My Favourite Memories <span className="text-pink-500">❤️</span>
      </motion.h2>

      <p className="text-slate-500 text-xs sm:text-sm text-center mt-1.5 max-w-md">
        Every snapshot with you, Anjella, is a chapter in the happiest story of my life.
      </p>

      {/* Controls Bar: View Toggle & Photo Uploader */}
      <div className="flex items-center justify-between w-full max-w-sm mt-4 px-2">
        <button
          onClick={() => {
            sound.playPop();
            setViewMode(viewMode === 'slideshow' ? 'grid' : 'slideshow');
          }}
          className="px-3 py-1.5 rounded-xl bg-white/80 border border-pink-200 text-pink-700 hover:bg-pink-50 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
        >
          {viewMode === 'slideshow' ? (
            <>
              <Grid className="w-3.5 h-3.5" />
              <span>View All Grid</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>Slideshow</span>
            </>
          )}
        </button>

        <button
          onClick={() => {
            sound.playPop();
            onOpenPhotoManager();
          }}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Manage Photos</span>
        </button>
      </div>

      {/* Main Presentation Area */}
      {viewMode === 'slideshow' ? (
        /* Slideshow View */
        <div className="relative w-full max-w-sm mt-5 mb-2 flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhoto?.id || currentIndex}
              initial={{ opacity: 0, rotate: currentPhoto?.rotation || -2, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, rotate: currentPhoto?.rotation || -2, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -15 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="w-full bg-white rounded-3xl p-4 sm:p-5 pb-6 polaroid-card border border-pink-100 relative"
            >
              {/* Cute Washi Tape on top */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-200/80 backdrop-blur-sm rounded-sm rotate-1 border-t border-b border-pink-300/50 shadow-sm" />

              {/* Photo Image Area */}
              <div className="relative w-full aspect-[3/3.8] rounded-2xl overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50/40 to-purple-50 flex items-center justify-center border border-pink-100 shadow-inner">
                {currentPhoto?.url ? (
                  <img
                    src={currentPhoto.url}
                    alt={currentPhoto.caption}
                    className={`w-full h-full transition-transform duration-700 hover:scale-105 ${
                      isTallStrip ? 'object-contain p-1.5 bg-pink-50/50' : 'object-cover object-top'
                    }`}
                  />
                ) : (
                  <div
                    onClick={onOpenPhotoManager}
                    className="p-6 text-center flex flex-col items-center justify-center cursor-pointer group"
                  >
                    <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform shadow-inner mb-3">
                      <Camera className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-bold text-pink-600">
                      Add Our Photo Here ❤️
                    </p>
                  </div>
                )}

                {/* Romantic Heart badge */}
                <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm text-[11px] font-semibold text-pink-600 flex items-center gap-1 border border-pink-100">
                  <Heart className="w-3 h-3 fill-pink-500 text-pink-500 animate-pulse" />
                  <span>{currentPhoto?.date || 'Us'}</span>
                </div>
              </div>

              {/* Caption (Handwritten style) */}
              <div className="mt-4 text-center px-2">
                <p className="font-handwritten text-2xl sm:text-3xl font-bold text-pink-600 leading-snug">
                  {currentPhoto?.caption || 'My favourite memories ❤️'}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slideshow Arrows */}
          {activePhotos.length > 1 && (
            <div className="flex items-center justify-between w-full max-w-xs mt-4">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white shadow-md border border-pink-200 text-pink-600 flex items-center justify-center hover:bg-pink-50 hover:scale-105 active:scale-95 transition-all"
                title="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5">
                {activePhotos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      sound.playPop();
                      setCurrentIndex(idx);
                    }}
                    className={`h-2.5 rounded-full transition-all ${
                      idx === currentIndex ? 'w-6 bg-pink-500' : 'w-2.5 bg-pink-200 hover:bg-pink-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white shadow-md border border-pink-200 text-pink-600 flex items-center justify-center hover:bg-pink-50 hover:scale-105 active:scale-95 transition-all"
                title="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Grid / Gallery View */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mt-5 mb-3">
          {activePhotos.map((photo, idx) => (
            <motion.div
              key={photo.id || idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-3 polaroid-card border border-pink-100 text-center"
            >
              <div className="aspect-[3/3.8] rounded-xl overflow-hidden bg-pink-50 flex items-center justify-center border border-pink-100">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className={`w-full h-full ${
                    photo.isStrip || photo.url?.includes('photo1')
                      ? 'object-contain p-1 bg-pink-50/50'
                      : 'object-cover object-top'
                  }`}
                />
              </div>
              <p className="font-handwritten text-xl font-bold text-pink-600 mt-2.5">
                {photo.caption}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Primary CTA: Move to Proposal */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          sound.playLetterOpen();
          onProceedToProposal();
        }}
        className="mt-6 w-full max-w-sm py-4 px-8 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-extrabold text-base shadow-[0_10px_28px_rgba(255,77,121,0.45)] hover:shadow-[0_14px_35px_rgba(255,77,121,0.6)] transition-all flex items-center justify-center gap-2 border border-pink-300"
      >
        <span>I have a question for you…</span>
        <span className="text-lg">💌</span>
      </motion.button>
    </div>
  );
}
