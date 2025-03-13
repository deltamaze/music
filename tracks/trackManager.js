/**
 * Track Manager
 * Manages the loading, initialization, and playback of all audio tracks
 */
const TrackManager = (function() {
  // Collection of loaded tracks
  const tracks = {};
  
  // Map of track IDs to their objects
  const trackMap = {};
  
  /**
   * Initialize the track manager and load all tracks
   */
  function init() {
    // Here we would dynamically load track modules
    
    // Load track scripts
    Promise.all([
      loadScript('tracks/track1/index.js'),
      loadScript('tracks/track2/index.js')
    ]).then(() => {
      console.log('All tracks loaded successfully');
    }).catch(error => {
      console.error('Error loading tracks:', error);
    });
  }
  
  /**
   * Register a track with the manager
   * @param {string} trackId - Unique identifier for the track
   * @param {Object} track - Track object with start and stop methods
   */
  function registerTrack(trackId, track) {
    trackMap[trackId] = track;
  }
  
  /**
   * Start all registered tracks
   */
  function startAllTracks() {
    Object.values(trackMap).forEach(track => {
      if (typeof track.start === 'function') {
        track.start(0); // Start at position 0
      }
    });
  }
  
  /**
   * Start a specific track by ID
   * @param {string} trackId - ID of the track to start
   */
  function startTrack(trackId) {
    const track = trackMap[trackId];
    if (track && typeof track.start === 'function') {
      track.start(0); // Start at position 0
      return true;
    }
    return false;
  }
  
  /**
   * Stop all registered tracks
   */
  function stopAllTracks() {
    Object.values(trackMap).forEach(track => {
      if (typeof track.stop === 'function') {
        track.stop();
      }
    });
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
  
  // Public API
  return {
    init: init,
    registerTrack: registerTrack,
    startAllTracks: startAllTracks,
    startTrack: startTrack,
    stopAllTracks: stopAllTracks
  };
})();