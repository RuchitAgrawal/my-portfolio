// Web Audio API Synthesizer & Music Volume Ducking Utility

let audioCtx = null;
let audioActive = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setAudioActive(active) {
  audioActive = active;
  window.__audioActive = active;
}

export function isAudioActive() {
  return audioActive || !!window.__audioActive;
}

// Micro click tone
export function playClickSound() {
  if (!isAudioActive()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch (e) {
    // silent fallback
  }
}

// Spaceman jetpack sound
export function playJetpackSound() {
  if (!isAudioActive()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.28);
  } catch (e) {
    // silent fallback
  }
}

// Background Music Volume Ducking Helper
export function duckBackgroundAudio(duck = true) {
  const bg = window.__bgAudio;
  if (!bg) return;
  const target = duck ? 0.08 : 0.28;
  const step = duck ? -0.02 : 0.02;
  const interval = setInterval(() => {
    if ((duck && bg.volume <= target) || (!duck && bg.volume >= target)) {
      bg.volume = target;
      clearInterval(interval);
    } else {
      bg.volume = Math.max(0, Math.min(1, bg.volume + step));
    }
  }, 40);
}



// Terminal keystroke chirp
export function playTerminalSound() {
  if (!isAudioActive()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {
    // silent fallback
  }
}
