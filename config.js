// Configuration file for ReadIt Web Clipper
const CONFIG = {
  // API Configuration
  // SECURITY WARNING: Only use publishable keys in client-side code
  // For production, create a backend API that handles the database connection
  
  // Option 1: Use your own backend API (RECOMMENDED)
  API_ENDPOINT: 'https://your-backend-api.com/api/clips',
  API_KEY: 'your-backend-api-key',
  
  // Option 2: Direct Neon connection (LESS SECURE - only for development)
  // Only use the publishable client key, never the secret server key
  NEON_PUBLISHABLE_KEY: 'pck_2y5n09w6hs86bmkf78mzq2m7f1yj9rk5fb83d1p1wct2g',
  NEON_PROJECT_ID: '2243d638-0bd4-4bef-80f6-da408674fe0e',
  
  // Toast Configuration
  TOAST_DURATION: 3000, // milliseconds
  TOAST_POSITION: 'top-right', // 'top-right', 'top-left', 'bottom-right', 'bottom-left'
  
  // Extension Configuration
  EXTENSION_NAME: 'ReadIt Web Clipper',
  VERSION: '1.0.0',
  
  // Debug Mode
  DEBUG: false
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} else {
  // For browser environment
  window.READIT_CONFIG = CONFIG;
} 