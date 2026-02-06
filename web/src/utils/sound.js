// Mock Audio for "Bleep"
// In production, replace with real .mp3
const playBleep = () => {
    // Simple oscillator beep if possible, or silence for MVP
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 800;
        gain.gain.value = 0.05;
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
        // Ignore auto-play blocks
    }
};

export default playBleep;
