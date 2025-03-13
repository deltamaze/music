/**
 * Track 1: Piano and Synthetic Vocals
 * Coordinates the piano and vocoder instruments for Track 1
 */
const Track1 = (function() {
  // Parts for piano and vocals
  let pianoPart;
  let vocalPart;
  
  // Piano notes data
  const pianoNotes = [
    { time: 0, note: "C4", duration: "4n" },
    { time: "0:1", note: "E4", duration: "4n" },
    { time: "0:2", note: "G4", duration: "4n" },
    { time: "0:3", note: "B4", duration: "4n" },
    { time: "1:0", note: "A3", duration: "4n" },
    { time: "1:1", note: "C4", duration: "4n" },
    { time: "1:2", note: "E4", duration: "4n" },
    { time: "1:3", note: "G4", duration: "4n" },
    { time: "2:0", note: "F3", duration: "4n" },
    { time: "2:1", note: "A3", duration: "4n" },
    { time: "2:2", note: "C4", duration: "4n" },
    { time: "2:3", note: "E4", duration: "4n" },
    { time: "3:0", note: "G3", duration: "4n" },
    { time: "3:1", note: "B3", duration: "4n" },
    { time: "3:2", note: "D4", duration: "4n" },
    { time: "3:3", note: "F4", duration: "4n" },
    // Repeat with some variations
    { time: "4:0", note: "C4", duration: "4n" },
    { time: "4:1", note: "E4", duration: "4n" },
    { time: "4:2", note: "G4", duration: "4n" },
    { time: "4:3", note: "C5", duration: "4n" },
    { time: "5:0", note: "A3", duration: "4n" },
    { time: "5:1", note: "C4", duration: "4n" },
    { time: "5:2", note: "F4", duration: "4n" },
    { time: "5:3", note: "A4", duration: "4n" },
    { time: "6:0", note: "F3", duration: "4n" },
    { time: "6:1", note: "A3", duration: "4n" },
    { time: "6:2", note: "C4", duration: "4n" },
    { time: "6:3", note: "F4", duration: "4n" },
    { time: "7:0", note: ["G3", "B3", "D4", "G4"], duration: "2n" },
    { time: "7:2", note: ["C4", "E4", "G4", "C5"], duration: "2n" }
  ];
  
  // Vocal notes data
  const vocalNotes = [
    { time: "0:0", note: "C5", duration: "2n" },
    { time: "1:0", note: "A4", duration: "2n" },
    { time: "2:0", note: "F4", duration: "2n" },
    { time: "3:0", note: "G4", duration: "2n" },
    { time: "4:0", note: "C5", duration: "4n" },
    { time: "4:2", note: "E5", duration: "4n" },
    { time: "5:0", note: "A4", duration: "2n" },
    { time: "6:0", note: "F4", duration: "4n" },
    { time: "6:2", note: "A4", duration: "4n" },
    { time: "7:0", note: "G4", duration: "2n" },
    { time: "7:2", note: "C5", duration: "2n" }
  ];
  
  /**
   * Initialize track instruments and parts
   */
  function init() {
    // Load the instruments
    loadScript('tracks/track1/piano.js')
      .then(() => loadScript('tracks/track1/vocoder.js'))
      .then(() => {
        // Initialize the instruments
        Track1Piano.init();
        Track1Vocoder.init();
        
        // Set up the piano part
        pianoPart = new Tone.Part((time, note) => {
          Track1Piano.play(note.note, note.duration, time);
          Visualizer.createNoteVisual(note, 'note-bar');
        }, pianoNotes);
        
        // Set up the vocal part
        vocalPart = new Tone.Part((time, note) => {
          // Add formant frequency based on note
          const formantFreq = getFormantFrequency(note.note);
          Track1Vocoder.setFormantFrequency(formantFreq);
          Track1Vocoder.play(note.note, note.duration, time);
          Visualizer.createNoteVisual(note, 'vocal-bar');
        }, vocalNotes);
        
        // Set loop settings
        pianoPart.loop = false;
        vocalPart.loop = false;
        
        // Register this track with the TrackManager
        TrackManager.registerTrack('track1', {
          start: start,
          stop: stop
        });
      });
  }
  
  /**
   * Calculate formant frequency based on note
   * @param {string} note - The note name (e.g., "C5")
   * @return {number} - The formant frequency in Hz
   */
  function getFormantFrequency(note) {
    return note === "C5" ? 800 : 
            note === "A4" ? 730 : 
            note === "F4" ? 650 : 
            note === "G4" ? 700 : 
            note === "E5" ? 850 : 800;
  }
  
  /**
   * Start the track playback
   * @param {number} startTime - Start time offset
   */
  function start(startTime = 0) {
    pianoPart.start(startTime);
    vocalPart.start(startTime);
  }
  
  /**
   * Stop the track playback
   */
  function stop() {
    if (pianoPart) pianoPart.stop();
    if (vocalPart) vocalPart.stop();
  }
  
  /**
   * Helper function to dynamically load scripts
   * @param {string} src - Path to the script
   * @return {Promise} - Resolves when script is loaded
   */
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(script);
      script.onerror = () => reject(new Error(`Script load error for ${src}`));
      document.head.appendChild(script);
    });
  }
  
  // Initialize the track
  init();
  
  // Public API
  return {
    start: start,
    stop: stop
  };
})();