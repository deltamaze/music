/**
 * Time Converter Utility
 * Provides functions for converting between different time formats
 */
const TimeConverter = (function() {
  /**
   * Convert Tone.js time notation to seconds
   * @param {string|number} timeStr - Time in Tone.js format (e.g., "1:2") or seconds
   * @param {number} bpm - Beats per minute (default: 120)
   * @return {number} Time in seconds
   */
  function timeToSeconds(timeStr, bpm = 120) {
    if (typeof timeStr === 'number') return timeStr;
    
    const parts = timeStr.split(':');
    const bars = parseInt(parts[0]);
    const beats = parts.length > 1 ? parseInt(parts[1]) : 0;
    
    // Calculate seconds based on BPM
    // At 120 BPM, one beat = 0.5 seconds
    const secondsPerBeat = 60 / bpm;
    return (bars * 4 + beats) * secondsPerBeat;
  }
  
  /**
   * Convert note duration to seconds
   * @param {string} duration - Note duration (e.g., "4n", "2n")
   * @param {number} bpm - Beats per minute (default: 120)
   * @return {number} Duration in seconds
   */
  function durationToSeconds(duration, bpm = 120) {
    const secondsPerBeat = 60 / bpm;
    
    switch (duration) {
      case "1n": // Whole note
        return 4 * secondsPerBeat;
      case "2n": // Half note
        return 2 * secondsPerBeat;
      case "4n": // Quarter note
        return secondsPerBeat;
      case "8n": // Eighth note
        return secondsPerBeat / 2;
      case "16n": // Sixteenth note
        return secondsPerBeat / 4;
      default:
        return secondsPerBeat; // Default to quarter note
    }
  }
  
  // Public API
  return {
    timeToSeconds: timeToSeconds,
    durationToSeconds: durationToSeconds
  };
})();