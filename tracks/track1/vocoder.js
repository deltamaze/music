/**
 * Track 1 Vocoder Instrument
 * Handles the vocal-like synthesis for Track 1
 */
const Track1Vocoder = (function() {
  // Instrument components
  let vocoder;
  let vocoderChain;
  let formantFilter;
  let chorus;
  let reverb;
  
  /**
   * Initialize the vocoder instrument and effects chain
   */
  function init() {
    // Create the main synth
    vocoder = new Tone.Synth({
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 0.05,
        decay: 0.2,
        sustain: 0.8,
        release: 1.5
      }
    });
    
    // Create the effects chain
    vocoderChain = new Tone.FeedbackDelay(0.25, 0.3);
    formantFilter = new Tone.Filter({
      type: "bandpass",
      frequency: 800, // Default formant frequency
      Q: 2
    });
    
    chorus = new Tone.Chorus(4, 2.5, 0.5).start();
    reverb = new Tone.Reverb(1.5);
    
    // Connect the vocal synth through the effects chain
    vocoder.connect(formantFilter);
    formantFilter.connect(chorus);
    chorus.connect(vocoderChain);
    vocoderChain.connect(reverb);
    reverb.toDestination();
  }
  
  /**
   * Play a note on the vocoder
   * @param {string} note - Note to play
   * @param {string} duration - Note duration (e.g., "4n", "2n")
   * @param {number} time - Start time
   */
  function play(note, duration, time) {
    vocoder.triggerAttackRelease(note, duration, time);
  }
  
  /**
   * Set the formant filter frequency
   * @param {number} frequency - Frequency in Hz
   */
  function setFormantFrequency(frequency) {
    if (formantFilter) {
      formantFilter.frequency.value = frequency;
    }
  }
  
  // Public API
  return {
    init: init,
    play: play,
    setFormantFrequency: setFormantFrequency
  };
})();