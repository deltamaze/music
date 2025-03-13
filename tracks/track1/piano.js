/**
 * Track 1 Piano Instrument
 * Handles the piano sounds for Track 1
 */
const Track1Piano = (function() {
  // Piano instrument
  let piano;
  
  /**
   * Initialize the piano instrument
   */
  function init() {
    // Create the piano sampler
    piano = new Tone.Sampler({
      urls: {
        A1: "A1.mp3",
        A2: "A2.mp3",
        A3: "A3.mp3",
        A4: "A4.mp3",
        A5: "A5.mp3",
        A6: "A6.mp3",
        A7: "A7.mp3",
      },
      baseUrl: "https://tonejs.github.io/audio/salamander/",
      onload: () => {
        console.log("Piano samples loaded");
      }
    }).toDestination();
  }
  
  /**
   * Play a note or chord on the piano
   * @param {string|string[]} note - Note or array of notes to play
   * @param {string} duration - Note duration (e.g., "4n", "2n")
   * @param {number} time - Start time
   */
  function play(note, duration, time) {
    piano.triggerAttackRelease(note, duration, time);
  }
  
  // Public API
  return {
    init: init,
    play: play
  };
})();