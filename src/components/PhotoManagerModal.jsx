import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Trash2, Plus, Heart, Image as ImageIcon, Check, Sparkles, MoveUp, MoveDown } from 'lucide-react';
import { sound } from '../assets/sound';
import { saveStoredPhotos } from '../utils/photoStorage';

export default function PhotoManagerModal({ isOpen, onClose, photos, onPhotosUpdated }) {
  const [localPhotos, setLocalPhotos] = useState(photos || []);
  const [isSaving, setIsSaving] = useState(false);

  // Sync when opened
  React.useEffect(() => {
    if (isOpen) {
      setLocalPhotos(photos || []);
    }
  }, [isOpen, photos]);

  if (!isOpen) return null;

  // Process and optimize uploaded image to data URL
  const handleFileUpload = (e, targetIndex = null) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    sound.playPop();

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const rawUrl = event.target.result;

        // Resize image to max 1200px to maintain crisp quality while keeping storage light
        const img = new Image();
        img.onload = () => {
          const maxDim = 1200;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = (h * maxDim) / w;
              w = maxDim;
            } else {
              w = (w * maxDim) / h;
              h = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const optimizedUrl = canvas.toDataURL('image/jpeg', 0.88);

          setLocalPhotos((prev) => {
            if (targetIndex !== null && targetIndex < prev.length) {
              // Replace specific slot
              const updated = [...prev];
              updated[targetIndex] = {
                ...updated[targetIndex],
                url: optimizedUrl,
              };
              return updated;
            } else {
              // Append new photo
              const newPhoto = {
                id: `photo-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                url: optimizedUrl,
                caption: 'My favourite person 💖',
                date: 'Always & Forever',
                rotation: (Math.random() * 4 - 2).toFixed(1),
              };
              return [...prev, newPhoto];
            }
          });
        };
        img.src = rawUrl;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpdateCaption = (index, newCaption) => {
    setLocalPhotos((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], caption: newCaption };
      return updated;
    });
  };

  const handleDeletePhoto = (index) => {
    sound.playPop();
    setLocalPhotos((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleMove = (index, direction) => {
    sound.playPop();
    setLocalPhotos((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[target];
      copy[target] = temp;
      return copy;
    });
  };

  const handleSaveAll = async () => {
    sound.playPop();
    setIsSaving(true);
    await saveStoredPhotos(localPhotos);
    onPhotosUpdated(localPhotos);
    setIsSaving(false);
    onClose();
  };

  const presetCaptions = [
    'My favourite memories ❤️',
    'You and me 🫂',
    'My favourite person 💖',
    'Every moment with you is magic ✨',
    'With you, everything is sweeter 🌸',
    'The day I fell for you 🥺',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-pink-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-pink-100 flex items-center justify-between bg-gradient-to-r from-pink-50 to-rose-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-800">
                Manage Real Photos of Us ❤️
              </h3>
              <p className="text-xs text-slate-500">
                Upload real photos of you and Anjella to display in Polaroid frames
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Multi-photo upload dropzone */}
          <label className="border-2 border-dashed border-pink-300 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer bg-pink-50/40 hover:bg-pink-100/50 hover:border-pink-400 transition-all group">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e)}
              className="hidden"
            />
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform mb-2">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-700">
              Click or drag to upload our photos
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Select one or multiple real photos from your phone or laptop
            </p>
          </label>

          {/* List of Photo Slots */}
          <div className="space-y-3">
            {localPhotos.map((photo, idx) => (
              <div
                key={photo.id || idx}
                className="p-3 rounded-2xl border border-pink-100 bg-slate-50/60 flex flex-col sm:flex-row gap-3 items-center"
              >
                {/* Photo Thumbnail / Slot */}
                <div className="relative w-24 h-24 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white border border-pink-200 shrink-0 flex items-center justify-center group">
                  {photo.url ? (
                    <img src={photo.url} alt="Memory" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-pink-300">
                      <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-60" />
                      <span className="text-[9px] font-semibold">Empty</span>
                    </div>
                  )}

                  {/* Change photo overlay button */}
                  <label className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-white text-[10px] font-bold">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, idx)}
                      className="hidden"
                    />
                    Change
                  </label>
                </div>

                {/* Caption input & controls */}
                <div className="flex-1 w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-pink-600">
                      Memory #{idx + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMove(idx, -1)}
                        disabled={idx === 0}
                        className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                        title="Move Up"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMove(idx, 1)}
                        disabled={idx === localPhotos.length - 1}
                        className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                        title="Move Down"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeletePhoto(idx)}
                        className="p-1 text-rose-400 hover:text-rose-600 transition-colors ml-1"
                        title="Delete this photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={photo.caption}
                    onChange={(e) => handleUpdateCaption(idx, e.target.value)}
                    placeholder="Enter cute romantic caption..."
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                  />

                  {/* Preset caption chips */}
                  <div className="flex flex-wrap gap-1">
                    {presetCaptions.slice(0, 3).map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => handleUpdateCaption(idx, chip)}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-pink-100/70 text-pink-700 hover:bg-pink-200 transition-colors"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add extra slot button */}
          <button
            onClick={() => {
              sound.playPop();
              setLocalPhotos((prev) => [
                ...prev,
                {
                  id: `photo-${Date.now()}`,
                  url: '',
                  caption: 'My favourite person 💖',
                  date: 'Always',
                  rotation: (Math.random() * 4 - 2).toFixed(1),
                },
              ]);
            }}
            className="w-full py-2.5 rounded-xl border border-dashed border-pink-300 text-pink-600 hover:bg-pink-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Memory Slot</span>
          </button>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-pink-100 flex items-center justify-between bg-slate-50/70">
          <p className="text-[11px] text-slate-400">
            🔒 Saved safely in your browser storage
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
            >
              {isSaving ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
