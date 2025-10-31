## 🔧 Troubleshooting "Failed to generate MCQs from AI"

### Issue Identified
Your Gemini API key is not working. This typically means:

1. **Invalid or Expired API Key** ❌
2. **API Key Restrictions**
3. **Generative AI API not enabled**

---

## ✅ SOLUTION: Get a New Gemini API Key

### Step 1: Get Your API Key

1. Visit: **https://aistudio.google.com/app/apikey**
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Copy the new API key

### Step 2: Update Your .env File

Open `d:\MCQ-GENERATOR\backend\.env` and replace with your new key:

```
PORT=5000
GEMINI_API_KEY=YOUR_NEW_API_KEY_HERE
```

### Step 3: Test the Connection

Run this test:
```powershell
cd d:\MCQ-GENERATOR\backend
node test-gemini.js
```

You should see: ✅ API Connection Successful!

---

## 🔍 Alternative: Using a Different API Version

If you continue to have issues, the problem might be with the API package version.

### Try downgrading:

```powershell
cd d:\MCQ-GENERATOR\backend
npm install @google/generative-ai@0.1.3
```

Then restart your server.

---

## ⚠️ Common Issues

### Issue: 404 Not Found
**Cause**: Invalid API key or model not available
**Fix**: Get a new API key from Google AI Studio

### Issue: 429 Too Many Requests
**Cause**: Rate limit exceeded
**Fix**: Wait a few minutes before trying again

### Issue: 403 Forbidden
**Cause**: API key restrictions or billing not enabled
**Fix**: 
1. Check API key has no restrictions
2. Enable Generative AI API in Google Cloud Console

---

## 📞 Still Not Working?

### Verify Your Setup:

1. **Check your API key is valid:**
   - Visit https://aistudio.google.com/app/apikey
   - Make sure it's not expired or deleted

2. **Enable the API:**
   - Go to https://console.cloud.google.com/
   - Enable "Generative Language API"

3. **Check for typos:**
   - No extra spaces in .env file
   - Key starts with "AIza"

4. **Restart everything:**
   ```powershell
   # Stop your server (Ctrl+C)
   cd d:\MCQ-GENERATOR\backend
   node test-gemini.js
   npm start
   ```

---

## 🎯 Quick Fix Commands

```powershell
# 1. Navigate to backend
cd d:\MCQ-GENERATOR\backend

# 2. Test API connection
node test-gemini.js

# 3. If test passes, restart server
npm start
```

---

## 📝 Need Help?

Your current API key appears invalid: `AIzaSyCPfXuDOnSB5OMBxTvq5_IjMNgEknFXom8`

**Action Required**: Get a fresh API key from https://aistudio.google.com/app/apikey
