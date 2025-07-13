// Content script for ReadIt Web Clipper
let selectedText = '';

// Load configuration
let CONFIG = {
  // For backend API approach (RECOMMENDED)
  API_ENDPOINT: 'https://your-backend-api.com/api/clips',
  API_KEY: 'your-backend-api-key',
  
  // For direct Neon connection (LESS SECURE - development only)
  // NEON_PUBLISHABLE_KEY: 'pck_2y5n09w6hs86bmkf78mzq2m7f1yj9rk5fb83d1p1wct2g',
  // NEON_PROJECT_ID: '2243d638-0bd4-4bef-80f6-da408674fe0e',
  
  TOAST_DURATION: 3000,
  DEBUG: false
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
    timestamp: new Date().toISOString()
  };

  if (CONFIG.DEBUG) {
    console.log('[ReadIt Debug]: Sending data:', data);
  }

  try {
    showToast("Sending to ReadIt...", "info");
    
    const response = await fetch(CONFIG.API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONFIG.API_KEY}`
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      showToast("Successfully sent to ReadIt!", "success");
      if (CONFIG.DEBUG) {
        console.log('[ReadIt Debug]: Success response:', await response.json());
      }
    } else {
      throw new Error(`HTTP ${response.status}`);
    }
  } catch (error) {
    console.error('Error sending to ReadIt:', error);
    showToast("Failed to send to ReadIt. Please try again.", "error");
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