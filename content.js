// Content script for ReadIt Web Clipper
let selectedText = '';

// Load configuration
let CONFIG = {
  // Development: Point to local Next.js web app
  API_ENDPOINT: 'https://read-it-web-app.vercel.app/api/clips.js',
  // Production: Update this to your deployed web app URL
  // API_ENDPOINT: 'https://your-app.vercel.app/api/clips',
  
  TOAST_DURATION: 3000,
  DEBUG: false,
  // Set to true if your server requires CORS headers
  ENABLE_CORS: false,
  // Additional fields to send with each clip
  ADDITIONAL_FIELDS: {
    source: 'chrome-extension',
    version: '1.0.0'
  }
};

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "clipSelection") {
    selectedText = request.selectedText;
    sendToReadIt(selectedText);
  } else if (request.action === "clipCurrentPage") {
    // Get selected text from current page
    selectedText = window.getSelection().toString();
    if (selectedText.trim()) {
      sendToReadIt(selectedText);
    } else {
      showToast("No text selected. Please highlight some text first.", "error");
    }
  }
});

// Function to send data to NeonDB
async function sendToReadIt(text) {
  if (!text || !text.trim()) {
    showToast("No text selected", "error");
    return;
  }

  const url = window.location.href;
  const title = document.title;
  
  const data = {
    text: text.trim(),
    url: url,
    title: title,
    timestamp: new Date().toISOString(),
    ...CONFIG.ADDITIONAL_FIELDS
  };

  if (CONFIG.DEBUG) {
    console.log('[ReadIt Debug]: Sending data:', data);
  }

  try {
    showToast("Sending to ReadIt...", "info");
    
    const headers = {
      'Content-Type': 'application/json'
    };

    // Add CORS headers if needed
    if (CONFIG.ENABLE_CORS) {
      headers['Access-Control-Allow-Origin'] = '*';
      headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS';
      headers['Access-Control-Allow-Headers'] = 'Content-Type';
    }
    
    const response = await fetch(CONFIG.API_ENDPOINT, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const responseData = await response.json();
      showToast("Successfully sent to ReadIt!", "success");
      if (CONFIG.DEBUG) {
        console.log('[ReadIt Debug]: Success response:', responseData);
      }
    } else {
      const errorText = await response.text();
      console.error('Server error:', response.status, errorText);
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }
  } catch (error) {
    console.error('Error sending to ReadIt:', error);
    
    // More specific error messages
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      showToast("Cannot connect to server. Check if your server is running.", "error");
    } else if (error.message.includes('CORS')) {
      showToast("CORS error. Check server configuration.", "error");
    } else {
      showToast("Failed to send to ReadIt. Please try again.", "error");
    }
  }
}

// Function to show toast notifications
function showToast(message, type = "info") {
  // Remove existing toast if any
  const existingToast = document.getElementById('readit-toast');
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.id = 'readit-toast';
  toast.className = `readit-toast readit-toast-${type}`;
  toast.textContent = message;

  // Add toast to page
  document.body.appendChild(toast);

  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  // Hide and remove toast after configured duration
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 300);
  }, CONFIG.TOAST_DURATION);
}

// Listen for selection changes to store selected text
document.addEventListener('selectionchange', () => {
  selectedText = window.getSelection().toString();
}); 