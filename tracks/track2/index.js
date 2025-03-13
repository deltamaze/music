/**
 * Track 2: Drum Beat
 * Coordinates the drum instruments for Track 2
 */
const Track2 = (function() {
  // Drum part
  let drumPart;
  
  // Drum sequence data
  const drumNotes = [
    // Kick drum pattern
    { time: "0:0", note: "kick", duration: "8n" },
    { time: "0:2", note: "kick", duration: "8n" },
    { time: "1:0", note: "kick", duration: "8n" },
    { time: "1:2", note: "kick", duration: "8n" },
    { time: "2:0", note: "kick", duration: "8n" },
    { time: "2:2", note: "kick", duration: "8n" },
    { time: "3:0", note: "kick", duration: "8n" },
    { time: "3:1", note: "kick", duration: "8n" },
    { time: "3:2", note: "kick", duration: "8n" },
    { time: "3:3", note: "kick", duration: "8n" },
    
    // Snare drum pattern
    { time: "0:1", note: "snare", duration: "8n" },
    { time: "0:3", note: "snare", duration: "8n" },
    { time: "1:1", note: "snare", duration: "8n" },
    { time: "1:3", note: "snare", duration: "8n" },
    { time: "2:1", note: "snare", duration: "8n" },
    { time: "2:3", note: "snare", duration: "8n" },
    { time: "3:1", note: "snare", duration: "8n" },
    { time: "3:3", note: "snare", duration: "8n" },
    
    // Hi-hat pattern
    { time: "0:0", note: "hihat", duration: "8n" },
    { time: "0:0.5", note: "hihat", duration: "8n" },
    { time: "0:1", note: "hihat", duration: "8n" },
    { time: "0:1.5", note: "hihat", duration: "8n" },
    { time: "0:2", note: "hihat", duration: "8n" },
    { time: "0:2.5", note: "hihat", duration: "8n" },
    { time: "0:3", note: "hihat", duration: "8n" },
    { time: "0:3.5", note: "hihat", duration: "8n" },
    { time: "1:0", note: "hihat", duration: "8n" },
    { time: "1:0.5", note: "hihat", duration: "8n" },
    { time: "1:1", note: "hihat", duration: "8n" },
    { time: "1:1.5", note: "hihat", duration: "8n" },
    { time: "1:2", note: "hihat", duration: "8n" },
    { time: "1:2.5", note: "hihat", duration: "8n" },
    { time: "1:3", note: "hihat", duration: "8n" },
    { time: "1:3.5", note: "hihat", duration: "8n" },
    
    // Second half with variations
    { time: "4:0", note: "kick", duration: "8n" },
    { time: "4:1", note: "snare", duration: "8n" },
    { time: "4:2", note: "kick", duration: "8n" },
    { time: "4:3", note: "snare", duration: "8n" },
    { time: "5:0", note: "kick", duration: "8n" },
    { time: "5:1", note: "snare", duration: "8n" },
    { time: "5:2", note: "kick", duration: "8n" },
    { time: "5:3", note: "snare", duration: "8n" },
    { time: "6:0", note: "kick", duration: "8n" },
    { time: "6:1", note: "snare", duration: "8n" },
    { time: "6:2", note: "kick", duration: "8n" },
    { time: "6:3", note: "snare", duration: "8n" },
    { time: "7:0", note: "kick", duration: "8n" },
    { time: "7:0.5", note: "kick", duration: "8n" },
    { time: "7:1", note: "snare", duration: "8n" },
    { time: "7:2", note: "kick", duration: "8n" },
    { time: "7:2.5", note: "kick", duration: "8n" },
    { time: "7:3", note: "snare", duration: "8n" },
    { time: "7:3.5", note: "snare", duration: "8n" },
    
    // Continuing hi-hat for second half
    { time: "4:0", note: "hihat", duration: "8n" },
    { time: "4:0.5", note: "hihat", duration: "8n" },
    { time: "4:1", note: "hihat", duration: "8n" },
    { time: "4:1.5", note: "hihat", duration: "8n" },
    { time: "4:2", note: "hihat", duration: "8n" },
    { time: "4:2.5", note: "hihat", duration: "8n" },
    { time: "4:3", note: "hihat", duration: "8n" },
    { time: "4:3.5", note: "hihat", duration: "8n" },
    { time: "5:0", note: "hihat", duration: "8n" },
    { time: "5:0.5", note: "hihat", duration: "8n" },
    { time: "5:1", note: "hihat", duration: "8n" },
    { time: "5:1.5", note: "hihat", duration: "8n" },
    { time: "5:2", note: "hihat", duration: "8n" },
    { time: "5:2.5", note: "hihat", duration: "8n" },
    { time: "5:3", note: "hihat", duration: "8n" },
    { time: "5:3.5", note: "hihat", duration: "8n" }
  ];
  
  /**
   * Initialize track instruments and parts
   */
  function init() {
    // Load the drum instrument
    loadScript('tracks/track2/drums.js')
      .then(() => {
        // Initialize the drums
        Track2Drums.init();
        
        // Set up the drum part
        drumPart = new Tone.Part((time, note) => {
          Track2Drums.play(note.note, time);
          
          // Create a visual representation - different color based on drum type
          const barClass = note.note === 'kick' ? 'kick-bar' : 
                         note.note === 'snare' ? 'snare-bar' : 'hihat-bar';
          
          // Create a custom note object for visualization
          const visualNote = {
            time: note.time,
            duration: note.duration,
            // Map different drums to different "note heights" for visualization
            note: note.note === 'kick' ? 'C2' : 
                  note.note === 'snare' ? 'E3' : 'A4'
          };
          
          Visualizer.createNoteVisual(visualNote, barClass);
        }, drumNotes);
        
        // Set loop settings
        drumPart.loop = false;
        
        // Register this track with the TrackManager
        TrackManager.registerTrack('track2', {
          start: start,
          stop: stop
        });
      });
  }
  
  /**
   * Start the track playback
   * @param {number} startTime - Start time offset
   */
  function start(startTime = 0) {
    if (drumPart) drumPart.start(startTime);
  }
  
  /**
   * Stop the track playback
   */
  function stop() {
    if (drumPart) drumPart.stop();
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