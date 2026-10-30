/**
 * photoStorage.js
 * High-reliability IndexedDB photo store with localStorage fallback
 * Safely persists full-resolution user uploaded photos across sessions & reloads.
 */

const DB_NAME = 'anjella_proposal_db';
const DB_VERSION = 1;
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
      console.warn('IndexedDB failed to open, falling back to localStorage', e);
      resolve(null);
    };
  });
};

// Default starter photos / placeholders
export const DEFAULT_PHOTOS = [
  {
    id: 'photo-1',
    url: '',
    caption: 'My favourite memories ❤️',
    date: 'Forever & Always',
    rotation: -2,
  },
  {
    id: 'photo-2',
    url: '',
    caption: 'You and me 🫂',
    date: 'Every Sweet Moment',
    rotation: 2.5,
  },
  {
    id: 'photo-3',
    url: '',
    caption: 'My favourite person 💖',
    date: 'My Whole World',
    rotation: -1.5,
  },
  {
    id: 'photo-4',
    url: '',
    caption: 'With you, everything is sweeter 🌸',
    date: 'Endless Smiles',
    rotation: 1.8,
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
            resolve(req.result.photos);
          } else {
            // Check localStorage
            const local = localStorage.getItem('anjella_photos');
            if (local) {
              try {
                resolve(JSON.parse(local));
                return;
              } catch (_) {}
            }
            resolve(DEFAULT_PHOTOS);
          }
        };
        req.onerror = () => resolve(DEFAULT_PHOTOS);
      });
    } else {
      const local = localStorage.getItem('anjella_photos');
      if (local) {
        return JSON.parse(local);
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
    // Save to IndexedDB
    const db = await openDB();
    if (db) {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put({ id: 'gallery', photos, updatedAt: Date.now() });
    }
    // Also save lightweight metadata to localStorage
    try {
      localStorage.setItem('anjella_photos_meta', JSON.stringify({ count: photos.length, updatedAt: Date.now() }));
      // Save small preview if within quota
      const lightweight = photos.map(p => ({
        id: p.id,
        caption: p.caption,
        date: p.date,
        rotation: p.rotation,
        url: p.url.length < 500000 ? p.url : '' // don't overwhelm localStorage if huge
      }));
      localStorage.setItem('anjella_photos', JSON.stringify(lightweight));
    } catch (_) {}
    return true;
  } catch (err) {
    console.error('Error saving photos:', err);
    return false;
  }
}
