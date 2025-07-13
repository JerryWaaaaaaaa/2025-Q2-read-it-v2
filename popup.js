// Popup script for ReadIt Web Clipper
document.addEventListener('DOMContentLoaded', () => {
  const clipButton = document.getElementById('clipButton');
  const statusIndicator = document.getElementById('statusIndicator');
  const statusText = document.getElementById('statusText');

  // Handle clip button click
  clipButton.addEventListener('click', async () => {
    try {
      // Update status to loading
      setStatus('loading', 'Clipping...');
      clipButton.disabled = true;

      // Send message to background script to clip current page
      chrome.runtime.sendMessage({ action: 'clipCurrentPage' });

      // Wait a bit then reset status
      setTimeout(() => {
        setStatus('ready', 'Ready to clip');
        clipButton.disabled = false;
      }, 2000);

    } catch (error) {
      console.error('Error in popup:', error);
      setStatus('error', 'Error occurred');
      clipButton.disabled = false;
    }
  });

  // Function to update status
  function setStatus(type, message) {
    statusIndicator.className = `status-indicator ${type}`;
    statusText.textContent = message;
  }

  // Listen for messages from content script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'clipSuccess') {
      setStatus('ready', 'Successfully clipped!');
    } else if (request.action === 'clipError') {
      setStatus('error', 'Failed to clip');
    }
  });

  // Initialize status
  setStatus('ready', 'Ready to clip');
}); 