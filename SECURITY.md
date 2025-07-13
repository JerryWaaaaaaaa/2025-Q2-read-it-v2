# Security Guide for ReadIt Web Clipper

## 🔐 **Critical Security Information**

### **NEVER Put These in Client-Side Code:**
- ❌ `STACK_SECRET_SERVER_KEY` (ssk_...)
- ❌ `DATABASE_URL` with passwords
- ❌ Any database connection strings
- ❌ API keys that have write permissions

### **Safe for Client-Side Code:**
- ✅ `STACK_PUBLISHABLE_CLIENT_KEY` (pck_...)
- ✅ Public API endpoints
- ✅ Read-only API keys

## 🏗️ **Recommended Architecture**

### **Option 1: Backend API (SECURE)**
```
Chrome Extension → Your Backend API → NeonDB
```

**Benefits:**
- Credentials stay on server
- Better security control
- Can add authentication
- Can validate data

**Setup:**
1. Deploy `backend-example.js` to a server
2. Update extension's `API_ENDPOINT` to point to your server
3. Remove all sensitive keys from extension

### **Option 2: Direct Connection (LESS SECURE)**
```
Chrome Extension → NeonDB (using publishable key only)
```

**Only use for:**
- Development/testing
- Read-only operations
- When you control the extension distribution

## 🚨 **What You Need to Do**

### **Immediate Actions:**
1. **Remove sensitive credentials** from `config.js`
2. **Deploy a backend API** (use `backend-example.js`)
3. **Update the extension** to use your backend API

### **For Production:**
1. **Create environment variables** on your server
2. **Use HTTPS** for all API calls
3. **Add authentication** to your backend API
4. **Validate all input data**

## 📝 **Example Secure Setup**

### **Backend API (server-side)**
```javascript
// Environment variables (NOT in code)
DATABASE_URL=postgresql://user:pass@host/db
STACK_SECRET_SERVER_KEY=ssk_...

// Safe to use server-side
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
```

### **Chrome Extension (client-side)**
```javascript
// Only public/read-only keys
const CONFIG = {
  API_ENDPOINT: 'https://your-api.com/clips',
  API_KEY: 'public-api-key-only'
};
```

## 🔍 **Checking Your Setup**

### **Safe:**
- ✅ Backend API handles database connections
- ✅ Only publishable keys in extension
- ✅ HTTPS endpoints
- ✅ Input validation on server

### **Unsafe:**
- ❌ Database credentials in extension
- ❌ Secret keys in client-side code
- ❌ Direct database connections from browser
- ❌ No input validation

## 🛠️ **Quick Fix Steps**

1. **Create backend API:**
   ```bash
   npm install express pg cors
   node backend-example.js
   ```

2. **Update extension config:**
   ```javascript
   API_ENDPOINT: 'https://your-server.com/api/clips'
   ```

3. **Remove sensitive data** from extension files

4. **Test the connection** with your backend API

## 📞 **Need Help?**

- Check the `backend-example.js` file for a working API
- Use environment variables for sensitive data
- Deploy to services like Heroku, Vercel, or Railway
- Test thoroughly before distributing the extension 