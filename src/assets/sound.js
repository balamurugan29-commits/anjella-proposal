/**
 * sound.js
 * Synthesizes romantic sounds and cute sound effects using the Web Audio API.
 * Zero external audio network dependencies!
 */

class SoundController {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicInterval = null;
    this.isMuted = false;
    this.customAudio = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if (this.customAudio) this.customAudio.pause();
      this.stopRomanticMusic();
    } else {
      if (this.customAudio && this.customAudio.src) {
        this.customAudio.play().catch(() => {});
      } else {
        this.startRomanticMusic();
      }
    }
    return this.isMuted;
  }

  playTone(freq, duration = 0.3, type = 'sine', gainVal = 0.15) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  // Cute bubble pop for button clicks
  playPop() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Playful boing sound when NO button dodges
  playDodge() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.15);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Letter opening swoosh sound
  playLetterOpen() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 chime
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.4, 'sine', 0.1);
      }, idx * 70);
    });
  }

  // Grand celebratory chime & bells when Anjella clicks YES!
  playYesCelebration() {
    if (this.isMuted) return;
    this.init();
    const melody = [
      { f: 523.25, d: 0.2 }, // C5
      { f: 659.25, d: 0.2 }, // E5
      { f: 783.99, d: 0.2 }, // G5
      { f: 987.77, d: 0.2 }, // B5
      { f: 1046.50, d: 0.5 }, // C6
      { f: 1318.51, d: 0.6 }, // E6
      { f: 1567.98, d: 0.8 }, // G6
    ];

    melody.forEach((item, index) => {
      setTimeout(() => {
        this.playTone(item.f, item.d, 'triangle', 0.2);
        this.playTone(item.f * 1.5, item.d * 0.8, 'sine', 0.08); // overtone sparkle
      }, index * 120);
    });
  }

  // Romantic music box ambient melody (dreamy lullaby style)
  startRomanticMusic() {
    if (this.isPlayingMusic || this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    this.isPlayingMusic = true;

    // Sweet romantic melody chords: Fmaj7 -> G -> Em7 -> Am
    const pattern = [
      // Fmaj7
      349.23, 440.00, 523.25, 659.25,
      // G
      392.00, 493.88, 587.33, 783.99,
      // Em7
      329.63, 392.00, 493.88, 587.33,
      // Am7
      440.00, 523.25, 659.25, 880.00
    ];

    let step = 0;
    this.musicInterval = setInterval(() => {
      if (!this.isPlayingMusic || this.isMuted) return;
      const note = pattern[step % pattern.length];
      // Random gentle variation in timing and harmony
      this.playTone(note, 0.6, 'sine', 0.04);
      if (step % 4 === 0) {
        // Soft bass foundation
        this.playTone(note / 2, 0.9, 'sine', 0.03);
      }
      step++;
    }, 450);
  }

  stopRomanticMusic() {
    this.isPlayingMusic = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  setCustomMusic(audioUrl) {
    this.stopRomanticMusic();
    if (!this.customAudio) {
      this.customAudio = new Audio();
      this.customAudio.loop = true;
    }
    this.customAudio.src = audioUrl;
    if (!this.isMuted) {
      this.customAudio.play().catch(e => console.log('Autoplay policy caught', e));
    }
  }
}

export const sound = new SoundController();
