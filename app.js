/**
 * Main Application
 * Initializes the application and handles user interactions
 */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the visualizer
  Visualizer.init('visualizer');
  
  // DOM Elements
  const playButton = document.getElementById('play-button');
  const stopButton = document.getElementById('stop-button');
  const trackRadios = document.querySelectorAll('input[name="track"]');
  
  // Track the currently selected track
  let selectedTrackId = 'track1'; // Default selection
  
  // Update selected track when radio buttons change
  trackRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.checked) {
        selectedTrackId = this.value;
        // Update the visualizer title based on selected track
        updateVisualizer();
      }
    });
  });
  
  // Update visualizer appearance based on selected track
  function updateVisualizer() {
    Visualizer.clear();
    const visualizerEl = document.getElementById('visualizer');
    
    // Add a class to the visualizer based on the selected track
    visualizerEl.className = 'visualizer ' + selectedTrackId;
  }
  
  // Play button event listener
  playButton.addEventListener('click', async function() {
    // Clear previous visualization
    Visualizer.clear();
    
    // Start the audio context (required by browsers)
    await Tone.start();
    
    // Set the BPM
    Tone.Transport.bpm.value = 120;
    
    // Start only the selected track
    TrackManager.startTrack(selectedTrackId);
    
    // Start the transport
    Tone.Transport.start();
    
    // Stop after 10 seconds
    Tone.Transport.schedule(() => {
      Tone.Transport.stop();
    }, 10);
  });
  
  // Stop button event listener
  stopButton.addEventListener('click', function() {
    Tone.Transport.stop();
    TrackManager.stopAllTracks();
  });
  
  // Initialize the track manager
  TrackManager.init();
  
  // Initial update to visualizer
  updateVisualizer();
});