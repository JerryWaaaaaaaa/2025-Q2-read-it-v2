# ReadIt Web Clipper - Chrome Extension

A Chrome extension that allows you to clip highlighted text from web pages and send it to your ReadIt database.

## Features

- **Right-click Context Menu**: Highlight text on any webpage, right-click, and select "Send to ReadIt"
- **Extension Popup**: Click the extension icon and use the "Clip Current Selection" button
- **Toast Notifications**: Get visual feedback when clips are sent successfully or fail
- **Automatic Metadata**: Captures page URL, title, and timestamp along with selected text

## Installation

### Development Mode

1. **Clone or download this repository**
   ```bash
   git clone <repository-url>
   cd readit-web-clipper
   ```

2. **Open Chrome and navigate to Extensions**
   - Go to `chrome://extensions/`
   - Enable "Developer mode" in the top right corner

3. **Load the extension**
   - Click "Load unpacked"
   - Select the folder containing the extension files
   - The ReadIt Web Clipper should now appear in your extensions list

4. **Pin the extension** (optional)
   - Click the puzzle piece icon in Chrome's toolbar
   - Find "ReadIt Web Clipper" and click the pin icon

## Usage

### Method 1: Right-click Context Menu
1. Navigate to any webpage
2. Highlight the text you want to clip
3. Right-click on the selected text
4. Select "Send to ReadIt" from the context menu
5. A toast notification will appear confirming the action

### Method 2: Extension Popup
1. Click the ReadIt extension icon in your Chrome toolbar
2. Make sure you have text selected on the current page
3. Click "Clip Current Selection" button
4. A toast notification will appear confirming the action

## Configuration

### API Endpoint Setup

Before using the extension, you need to configure the NeonDB API endpoint:

1. **Open `content.js`**
2. **Find the fetch request** (around line 45):
   ```javascript
   const response = await fetch('https://your-neondb-api-endpoint.com/clips', {
   ```
3. **Replace with your actual API endpoint**:
   ```javascript
   const response = await fetch('https://your-api-domain.com/api/clips', {
   ```
4. **Update the API key** (currently set to placeholder):
   ```javascript
   'Authorization': 'Bearer YOUR_ACTUAL_API_KEY'
   ```

### Data Format

The extension sends the following data to your API:

```json
{
  "text": "The highlighted text content",
  "url": "https://example.com/page",
  "title": "Page Title",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## File Structure

```
readit-web-clipper/
├── manifest.json          # Extension configuration
├── background.js          # Service worker for context menu
├── content.js            # Content script for webpage interaction
├── content.css           # Toast notification styles
├── popup.html           # Extension popup interface
├── popup.css            # Popup styles
├── popup.js             # Popup functionality
├── icons/               # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # This file
```

## Development

### Making Changes

1. **Edit the files** as needed
2. **Reload the extension** in Chrome:
   - Go to `chrome://extensions/`
   - Find "ReadIt Web Clipper"
   - Click the refresh icon

### Testing

1. **Load the extension** in development mode
2. **Navigate to any webpage**
3. **Test both clipping methods**:
   - Right-click on selected text
   - Use the extension popup
4. **Check browser console** for any errors
5. **Verify toast notifications** appear correctly

## Troubleshooting

### Common Issues

1. **Extension not loading**
   - Check that all files are present
   - Verify `manifest.json` syntax is correct
   - Check Chrome's extension error console

2. **Context menu not appearing**
   - Ensure text is actually selected
   - Check that the extension has the correct permissions
   - Reload the extension

3. **API calls failing**
   - Verify your API endpoint is correct
   - Check that your API key is valid
   - Ensure CORS is properly configured on your API

4. **Toast notifications not showing**
   - Check that `content.css` is being loaded
   - Verify the content script is running on the page

### Debug Mode

To enable debug logging, add this to `content.js`:

```javascript
const DEBUG = true;

function debugLog(message) {
  if (DEBUG) {
    console.log('[ReadIt Debug]:', message);
  }
}
```

## Security Notes

- The extension requires permissions to read page content and make network requests
- API keys are currently stored in the code (not recommended for production)
- Consider implementing proper authentication for production use

## License

This project is open source and available under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues or questions, please open an issue in the repository or contact the development team. 