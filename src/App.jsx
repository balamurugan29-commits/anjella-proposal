import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingHeartsBackground from './components/FloatingHeartsBackground';
import HeartQRCodeCard from './components/HeartQRCodeCard';
import WelcomeScreen from './components/WelcomeScreen';
import PhotoGalleryScreen from './components/PhotoGalleryScreen';
import ProposalPopup from './components/ProposalPopup';
import CelebrationScreen from './components/CelebrationScreen';
import PhotoManagerModal from './components/PhotoManagerModal';
import AudioPlayer from './components/AudioPlayer';
import { getStoredPhotos, DEFAULT_PHOTOS } from './utils/photoStorage';
import { QrCode, Heart, Camera, Sparkles } from 'lucide-react';
import { sound } from './assets/sound';

export default function App() {
  // Current screen state: 'qr' | 'welcome' | 'gallery' | 'proposal' | 'celebration'
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [photos, setPhotos] = useState(DEFAULT_PHOTOS);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  // Load safely stored photos on startup
  useEffect(() => {
    async function load() {
      const stored = await getStoredPhotos();
      if (stored && stored.length > 0) {
        setPhotos(stored);
      }
    }
    load();
  }, []);

  const handleOpenSurprise = () => {
    setCurrentScreen('gallery');
  };

  const handleProceedToProposal = () => {
    setCurrentScreen('proposal');
  };

  const handleProposalAccepted = () => {
    setCurrentScreen('celebration');
  };

  const handleReplay = () => {
    sound.playPop();
    setCurrentScreen('welcome');
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* Dreamy Floating Hearts and Bokeh Particles Background */}
      <FloatingHeartsBackground />

      {/* Background Audio Player and Sound Toggle */}
      <AudioPlayer />

      {/* Top Floating Navigation Bar */}
      <header className="relative z-30 pt-4 px-4 max-w-4xl mx-auto w-full flex items-center justify-between">
        {/* Step 1 QR Card vs Live Surprise Mode Switch */}
        <div className="flex items-center gap-1.5 p-1 bg-white/80 backdrop-blur-md rounded-full border border-pink-200/80 shadow-sm text-xs font-semibold">
          <button
            onClick={() => {
              sound.playPop();
              setCurrentScreen('qr');
            }}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              currentScreen === 'qr'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-pink-600'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Step 1: QR Card</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              if (currentScreen === 'qr') setCurrentScreen('welcome');
            }}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              currentScreen !== 'qr'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-pink-600'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Proposal Experience</span>
          </button>
        </div>

        {/* Quick Photo Manager Trigger */}
        <button
          onClick={() => {
            sound.playPop();
            setIsPhotoModalOpen(true);
          }}
          className="p-2 rounded-full bg-white/85 hover:bg-white border border-pink-200 text-pink-600 hover:text-pink-700 shadow-sm transition-transform active:scale-95 flex items-center gap-1.5 text-xs font-bold"
          title="Upload real photos of you and Anjella"
        >
          <Camera className="w-4 h-4 text-pink-500" />
          <span className="hidden md:inline">Our Photos</span>
        </button>
      </header>

      {/* Main Content View with Smooth Page Transitions */}
      <main className="relative z-10 flex-1 flex flex-col justify-center py-4">
        <AnimatePresence mode="wait">
          {currentScreen === 'qr' && (
            <motion.div
              key="screen-qr"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <HeartQRCodeCard onEnterExperience={() => setCurrentScreen('welcome')} />
            </motion.div>
          )}

          {currentScreen === 'welcome' && (
            <motion.div
              key="screen-welcome"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4 }}
            >
              <WelcomeScreen onOpenSurprise={handleOpenSurprise} />
            </motion.div>
          )}

          {currentScreen === 'gallery' && (
            <motion.div
              key="screen-gallery"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <PhotoGalleryScreen
                photos={photos}
                onOpenPhotoManager={() => setIsPhotoModalOpen(true)}
                onProceedToProposal={handleProceedToProposal}
              />
            </motion.div>
          )}

          {currentScreen === 'proposal' && (
            <motion.div
              key="screen-proposal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.45 }}
            >
              <ProposalPopup onAccept={handleProposalAccepted} />
            </motion.div>
          )}

          {currentScreen === 'celebration' && (
            <motion.div
              key="screen-celebration"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <CelebrationScreen
                photos={photos}
                onReplay={handleReplay}
                onOpenPhotoManager={() => setIsPhotoModalOpen(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Bottom Step Indicators (visible in proposal flow) */}
      {currentScreen !== 'qr' && (
        <footer className="relative z-20 pb-5 pt-2 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-pink-200/60 shadow-sm text-[11px] text-slate-500 font-semibold">
            <span
              onClick={() => setCurrentScreen('welcome')}
              className={`cursor-pointer transition-colors ${
                currentScreen === 'welcome' ? 'text-pink-600 font-bold' : 'hover:text-pink-500'
              }`}
            >
              Surprise 💌
            </span>
            <span className="text-pink-300">•</span>
            <span
              onClick={() => setCurrentScreen('gallery')}
              className={`cursor-pointer transition-colors ${
                currentScreen === 'gallery' ? 'text-pink-600 font-bold' : 'hover:text-pink-500'
              }`}
            >
              Memories 📸
            </span>
            <span className="text-pink-300">•</span>
            <span
              onClick={() => setCurrentScreen('proposal')}
              className={`cursor-pointer transition-colors ${
                currentScreen === 'proposal' ? 'text-pink-600 font-bold' : 'hover:text-pink-500'
              }`}
            >
              The Proposal 💍
            </span>
            {currentScreen === 'celebration' && (
              <>
                <span className="text-pink-300">•</span>
                <span className="text-pink-600 font-bold">Celebration 🎉</span>
              </>
            )}
          </div>
        </footer>
      )}

      {/* Real Photo Uploader / Manager Modal */}
      <PhotoManagerModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        photos={photos}
        onPhotosUpdated={(updated) => setPhotos(updated)}
      />
    </div>
  );
}
