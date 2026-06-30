// Web Audio API ambient spatial drone synthesizer
class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscs: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private isSynthRunning: boolean = false;

  public init() {
    if (this.ctx) return;
    
    // Create AudioContext with fallback
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    this.ctx = new AudioContextClass();
  }

  public async start() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isSynthRunning) return;

    try {
      const now = this.ctx.currentTime;

      // Master Gain for smooth volume transitions
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, now);
      // Smooth fade-in over 2.5 seconds to avoid sudden loud bursts
      this.masterGain.gain.linearRampToValueAtTime(0.08, now + 2.5);

      // Deep, immersive stereo/multi-oscillator drone
      // Base root note: D2 (73.42 Hz) and A2 (110.00 Hz) for a perfect fifth
      const frequencies = [73.42, 110.00, 146.83, 220.00];
      const detunes = [-6, 4, -3, 5];
      const waveTypes: OscillatorType[] = ['triangle', 'sawtooth', 'triangle', 'sine'];
      const gains = [0.4, 0.2, 0.25, 0.15];

      // Create a master resonant lowpass filter for the "breathing" space sweep
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(250, now);
      this.filter.Q.setValueAtTime(3.5, now);

      // Create LFO to modulate the filter frequency for a organic movement
      this.lfo = this.ctx.createOscillator();
      this.lfo.type = 'sine';
      this.lfo.frequency.setValueAtTime(0.06, now); // Very slow swell: ~16 seconds cycle

      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.setValueAtTime(120, now); // Sweeps filter frequency +/- 120Hz

      // Connect LFO modulation to filter frequency
      this.lfo.connect(this.lfoGain);
      this.lfoGain.connect(this.filter.frequency);

      // Initialize the individual oscillators
      this.oscs = [];
      frequencies.forEach((freq, index) => {
        if (!this.ctx || !this.filter) return;

        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        osc.type = waveTypes[index];
        osc.frequency.setValueAtTime(freq, now);
        osc.detune.setValueAtTime(detunes[index], now);

        oscGain.gain.setValueAtTime(gains[index], now);

        osc.connect(oscGain);
        oscGain.connect(this.filter);
        
        osc.start(now);
        this.oscs.push(osc);
      });

      // Connect filter to Master Gain, and Master Gain to speakers
      this.filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      // Start LFO
      this.lfo.start(now);

      this.isSynthRunning = true;
    } catch (e) {
      console.error('Failed to start spatial synth engine:', e);
    }
  }

  public stop() {
    if (!this.isSynthRunning || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      // Smooth fade-out over 1.5 seconds to prevent sudden clicks
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0, now + 1.5);

      const oscsToStop = [...this.oscs];
      const lfoToStop = this.lfo;
      const ctxToClose = this.ctx;

      // Reset local references immediately so UI reflects state
      this.oscs = [];
      this.lfo = null;
      this.lfoGain = null;
      this.filter = null;
      this.masterGain = null;
      this.isSynthRunning = false;

      // Stop the hardware nodes after the audio has fully faded out
      setTimeout(() => {
        try {
          oscsToStop.forEach(osc => {
            try { osc.stop(); } catch {}
          });
          if (lfoToStop) {
            try { lfoToStop.stop(); } catch {}
          }
        } catch (err) {
          console.warn('Error clearing audio nodes:', err);
        }
      }, 1600);

    } catch (e) {
      console.error('Failed to stop spatial synth engine:', e);
    }
  }

  public isPlaying(): boolean {
    return this.isSynthRunning;
  }
}

export const audioEngine = new AudioEngine();
