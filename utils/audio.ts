// Simple synth for UI sounds using Web Audio API
// No external files needed!

let audioCtx: AudioContext | null = null;

const getCtx = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtx;
}

export const playPop = (pitch = 1) => {
    try {
        const ctx = getCtx();
        if(ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        // Randomize pitch slightly for organic feel
        const frequency = 800 * pitch + (Math.random() * 200 - 100); 
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(frequency * 0.1, ctx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
        // Audio not supported or blocked
    }
};

export const playBoing = () => {
    try {
        const ctx = getCtx();
        if(ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(300, ctx.currentTime + 0.1);
        osc.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.3);

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);

        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
        console.error(e);
    }
}
