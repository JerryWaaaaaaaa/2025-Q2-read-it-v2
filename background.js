// Background service worker for ReadIt Web Clipper
chrome.runtime.onInstalled.addListener(() => {
  // Create context menu item
  chrome.contextMenus.create({
    id: "sendToReadIt",
    title: "Send to ReadIt",
    contexts: ["selection"]
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sendToReadIt") {
    // Send message to content script to handle the clipping
    chrome.tabs.sendMessage(tab.id, {
      action: "clipSelection",
      selectedText: info.selectionText
    });
  }
});

// Handle messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "clipCurrentPage") {
    // Send message to content script to clip current page
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "clipCurrentPage"
      });
    });
  }
}); 