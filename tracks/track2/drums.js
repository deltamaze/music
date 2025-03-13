/**
 * Track 2 Drums Instrument
 * Handles the drum sounds for Track 2
 */
const Track2Drums = (function() {
  // Drum instruments
  let kick;
  let snare;
  let hihat;
  
  /**
   * Initialize the drum instruments
   */
  function init() {
    // Create drum instruments
    
    // Kick drum - deep, punchy sound
    kick = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 5,
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 0.001,
        decay: 0.4,
        sustain: 0.01,
        release: 1.4,
        attackCurve: "exponential"
      }
    }).toDestination();
    kick.volume.value = -6;
    
    // Snare drum - sharp, snappy sound
    snare = new Tone.NoiseSynth({
      noise: {
        type: "white"
      },
      envelope: {
        attack: 0.001,
        decay: 0.2,
        sustain: 0.02,
        release: 0.2
      }
    }).toDestination();
    snare.volume.value = -10;
    
    // Hi-hat - metallic, bright sound
    hihat = new Tone.MetalSynth({
      frequency: 200,
      envelope: {
        attack: 0.001,
        decay: 0.1,
        release: 0.1
      },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5
    }).toDestination();
    hihat.volume.value = -24;
  }
  
  /**
   * Play a drum sound
   * @param {string} type - Type of drum ('kick', 'snare', or 'hihat')
   * @param {number} time - Start time
   */
  function play(type, time) {
    switch(type) {
      case 'kick':
        kick.triggerAttackRelease("C1", "8n", time);
        break;
      case 'snare':
        snare.triggerAttackRelease("8n", time);
        break;
      case 'hihat':
        hihat.triggerAttackRelease("32n", time);
        break;
      default:
        console.warn('Unknown drum type:', type);
    }
  }
  
  // Public API
  return {
    init: init,
    play: play
  };
})();