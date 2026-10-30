/**
 * photoStorage.js
 * High-reliability IndexedDB photo store with localStorage fallback
 * Safely persists full-resolution user uploaded photos across sessions & reloads.
 */

const DB_NAME = 'anjella_proposal_db_v2';
const DB_VERSION = 2;
const STORE_NAME = 'photos';

// Open or create IndexedDB
const openDB = () => {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      resolve(null);
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => {
      console.warn('IndexedDB failed to open, falling back to default photos', e);
      resolve(null);
    };
  });
};

// 4 Real Photos of Balamurugan & Anjella in exact requested order
export const DEFAULT_PHOTOS = [
  {
    id: 'photo-1',
    url: './photos/photo1.jpg',
    caption: 'My favourite memories ❤️',
    date: 'Photo Booth Fun ✨',
    rotation: -2,
    isStrip: true,
  },
  {
    id: 'photo-2',
    url: './photos/photo2.jpg',
    caption: 'You and me 🫂',
    date: 'Sweet Smiles 🌸',
    rotation: 2,
    isStrip: false,
  },
  {
    id: 'photo-3',
    url: './photos/photo3.jpg',
    caption: 'My favourite person 💖',
    date: 'My Queen in Maroon 👑',
    rotation: -1.5,
    isStrip: false,
  },
  {
    id: 'photo-4',
    url: './photos/photo4.jpg',
    caption: 'With you, everything is sweeter 🌸',
    date: 'Forever & Always ✨',
    rotation: 1.8,
    isStrip: false,
  }
];

export async function getStoredPhotos() {
  try {
    const db = await openDB();
    if (db) {
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get('gallery');
        req.onsuccess = () => {
          if (req.result && req.result.photos && req.result.photos.length > 0) {
            // Check if stored photos have real URLs; if empty strings, use DEFAULT_PHOTOS
            const hasValid = req.result.photos.some(p => p.url && p.url.trim().length > 0);
            if (hasValid) {
              resolve(req.result.photos);
              return;
            }
          }
          resolve(DEFAULT_PHOTOS);
        };
        req.onerror = () => resolve(DEFAULT_PHOTOS);
      });
    } else {
      const local = localStorage.getItem('anjella_photos_v2');
      if (local) {
        try {
          const parsed = JSON.parse(local);
          if (parsed && parsed.length > 0 && parsed.some(p => p.url)) {
            return parsed;
          }
        } catch (_) {}
      }
      return DEFAULT_PHOTOS;
    }
  } catch (err) {
    console.error('Error getting stored photos:', err);
    return DEFAULT_PHOTOS;
  }
}

export async function saveStoredPhotos(photos) {
  try {
    const db = await openDB();
    if (db) {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put({ id: 'gallery', photos, updatedAt: Date.now() });
    }
    try {
      localStorage.setItem('anjella_photos_v2', JSON.stringify(photos));
    } catch (_) {}
    return true;
  } catch (err) {
    console.error('Error saving photos:', err);
    return false;
  }
}
