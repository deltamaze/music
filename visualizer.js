/**
 * Visualizer Module
 * Handles the visual representation of notes played in the composition
 */
const Visualizer = (function() {
  // DOM element reference
  let visualizerElement;
  
  /**
   * Initialize the visualizer
   * @param {string} elementId - The ID of the DOM element for visualization
   */
  function init(elementId) {
    visualizerElement = document.getElementById(elementId);
  }
  
  /**
   * Convert time notation to seconds
   * Uses the TimeConverter utility
   * @param {string|number} timeStr - Time in Tone.js format (e.g., "1:2") or seconds
   * @return {number} Time in seconds
   */
  function timeToSeconds(timeStr) {
    return TimeConverter.timeToSeconds(timeStr);
  }
  
  /**
   * Create a visual representation of a note
   * @param {Object} note - Note object with time, note, and duration properties
   * @param {string} className - CSS class for styling the note bar
   */
  function createNoteVisual(note, className) {
    const startTime = timeToSeconds(note.time);
    let duration;
    
    if (note.duration === "4n") {
      duration = 0.5; // Quarter note = 0.5 seconds at 120 BPM
    } else if (note.duration === "2n") {
      duration = 1.0; // Half note = 1 second at 120 BPM
    } else {
      duration = 0.5; // Default
    }
    
    const bar = document.createElement('div');
    bar.className = className;
    
    // Position and size
    const startPosition = (startTime / 10) * 100; // As percentage of 10 seconds
    const widthPercentage = (duration / 10) * 100; // As percentage of 10 seconds
    
    // Calculate vertical position based on note pitch
    let noteHeight;
    if (typeof note.note === 'string') {
      // Extract just the note name and octave
      const noteName = note.note.replace(/[0-9]/g, '');
      const octave = parseInt(note.note.match(/[0-9]/)[0]);
      
      // Map note to position (higher notes = higher position)
      const noteMap = {
        'C': 0, 'C#': 1, 'Db': 1, 
        'D': 2, 'D#': 3, 'Eb': 3, 
        'E': 4, 
        'F': 5, 'F#': 6, 'Gb': 6, 
        'G': 7, 'G#': 8, 'Ab': 8, 
        'A': 9, 'A#': 10, 'Bb': 10, 
        'B': 11
      };
      
      // Get note value and adjust by octave
      const noteValue = noteMap[noteName] + (octave * 12);
      // Map to percentage (higher = lower position)
      noteHeight = 100 - ((noteValue - 48) / 36 * 100);
      noteHeight = Math.max(10, Math.min(90, noteHeight)); // Keep within bounds
    } else {
      // For chords (arrays of notes), just use a default height
      noteHeight = 50;
    }
    
    bar.style.left = startPosition + '%';
    bar.style.width = widthPercentage + '%';
    bar.style.top = noteHeight + '%';
    bar.style.height = '10px';
    
    visualizerElement.appendChild(bar);
  }
  
  /**
   * Clear all visualizations
   */
  function clear() {
    while (visualizerElement.firstChild) {
      visualizerElement.removeChild(visualizerElement.firstChild);
    }
  }
  
  // Public API
  return {
    init: init,
    createNoteVisual: createNoteVisual,
    clear: clear
  };
})();