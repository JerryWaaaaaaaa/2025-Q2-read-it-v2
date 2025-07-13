# Quick Installation Guide

## Step 1: Prepare the Extension

1. **Download or clone** this repository to your computer
2. **Open the folder** in your file explorer

## Step 2: Configure API Settings (Optional)

Before installing, you can update the API settings:

1. **Open `content.js`** in a text editor
2. **Find the CONFIG object** (around line 4-8)
3. **Update these values**:
   ```javascript
   let CONFIG = {
     API_ENDPOINT: 'https://your-actual-api-endpoint.com/clips',
     API_KEY: 'your-actual-api-key',
     TOAST_DURATION: 3000,
     DEBUG: false
   };
   ```

## Step 3: Install in Chrome

1. **Open Chrome** and go to `chrome://extensions/`
2. **Enable "Developer mode"** (toggle in top right)
3. **Click "Load unpacked"**
4. **Select the folder** containing the extension files
5. **The extension should appear** in your extensions list

## Step 4: Test the Extension

1. **Pin the extension** to your toolbar (optional)
2. **Go to any webpage**
3. **Highlight some text**
4. **Right-click** and select "Send to ReadIt"
5. **Or click the extension icon** and use the popup

## Troubleshooting

- **Extension not loading?** Check that all files are present
- **Context menu missing?** Make sure text is selected
- **API errors?** Verify your endpoint and API key are correct
- **Toast not showing?** Check browser console for errors

## Next Steps

- Replace placeholder API endpoint with your actual NeonDB API
- Update the API key with your real credentials
- Customize the toast duration and styling if needed
- Test thoroughly on different websites 