import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Disc3, Upload } from 'lucide-react';
import { sound } from '../assets/sound';
import { motion } from 'framer-motion';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [songName, setSongName] = useState('Romantic Ambient Lullaby');

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    setIsPlaying(!muted);
  };

  const handleUploadCustomSong = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sound.playPop();
    const objectUrl = URL.createObjectURL(file);
    sound.setCustomMusic(objectUrl);
    setSongName(file.name.replace(/\.[^/.]+$/, ''));
    setIsPlaying(true);
    setIsMuted(false);
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
      {/* Floating Audio Controller */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-200/80 shadow-md text-xs"
      >
        <button
          onClick={handleToggleSound}
          className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
          title={isMuted ? 'Unmute music' : 'Mute music'}
        >
          <motion.div
            animate={isPlaying && !isMuted ? { rotate: 360 } : { rotate: 0 }}
            transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          >
            <Disc3 className="w-4 h-4 text-pink-500" />
          </motion.div>

          <span className="hidden sm:inline-block max-w-[120px] truncate font-medium text-slate-700 text-[11px]">
            {isMuted ? 'Muted' : songName}
          </span>

          {isMuted ? (
            <VolumeX className="w-4 h-4 text-slate-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-pink-500 animate-pulse" />
          )}
        </button>

        {/* Upload custom song trigger */}
        <label
          className="cursor-pointer p-1 rounded-full hover:bg-pink-100 text-pink-400 hover:text-pink-600 transition-colors ml-0.5"
          title="Upload your favourite romantic song (MP3)"
        >
          <input
            type="file"
            accept="audio/*"
            onChange={handleUploadCustomSong}
            className="hidden"
          />
          <Upload className="w-3.5 h-3.5" />
        </label>
      </motion.div>
    </div>
  );
}
