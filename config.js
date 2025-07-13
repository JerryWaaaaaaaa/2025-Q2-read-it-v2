// Configuration file for ReadIt Web Clipper
// Modify these settings to point to your server

const CONFIG = {
  // Server Configuration
  // Development: Point to local server
  API_ENDPOINT: 'http://localhost:3000/api/clips',
  
  // Production: Update this to your deployed server URL
  // API_ENDPOINT: 'https://your-server.com/api/clips',
  
  // Alternative endpoints you might use:
  // API_ENDPOINT: 'http://localhost:8000/api/clips',  // Django/FastAPI
  // API_ENDPOINT: 'http://localhost:4000/api/clips',  // Express.js
  // API_ENDPOINT: 'http://localhost:8080/api/clips',  // Spring Boot
  
  // UI Configuration
  TOAST_DURATION: 3000,
  DEBUG: false,
  
  // CORS Configuration
  // Set to true if your server requires CORS headers
  ENABLE_CORS: false,
  
  // Data Configuration
  // Additional fields to send with each clip
  ADDITIONAL_FIELDS: {
    source: 'chrome-extension',
    version: '1.0.0'
  }
};

// Export for use in content script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} 