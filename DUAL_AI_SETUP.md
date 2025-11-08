# 🤖 Smart Dual AI System

Your MCQ Generator now supports **TWO AI backends** with automatic fallback!

## 🎯 How It Works

The system automatically chooses the best available AI service:

```
1. Check for Gemini API Key → Use Gemini ✅
2. If no key, check Ollama → Use Ollama ✅
3. If neither available → Show error ❌
```

## 🔑 Option 1: Google Gemini API (Cloud)

**Pros:**
- ⚡ Fast (3-5 seconds)
- ☁️ No local installation needed
- 🌐 Works anywhere with internet

**Cons:**
- 🔑 Requires API key
- 📤 Data sent to Google
- 💰 Rate limits on free tier

**Setup:**
1. Get free API key: https://makersuite.google.com/app/apikey
2. Add to `.env`:
```properties
GEMINI_API_KEY=your_api_key_here
```
3. Restart backend → Uses Gemini automatically!

---

## 🏠 Option 2: Ollama (Local GPU)

**Pros:**
- 🔒 100% Private & Offline
- 💰 Completely free forever
- 🎮 Uses your RTX 3050 GPU

**Cons:**
- ⏱️ Slower (10-30 seconds)
- 💾 Requires 4.4GB model download
- 🔧 One-time setup needed

**Setup:**
1. You already have Ollama installed! ✅
2. You already have Mistral 7B downloaded! ✅
3. Just start Ollama service:
```powershell
ollama serve
```
4. Remove/comment Gemini key in `.env`
5. Restart backend → Uses Ollama automatically!

---

## 🚀 Quick Start

### To Use Gemini (Current Setup):
Your `.env` already has the API key, so it's using Gemini now!

```bash
# Backend already running with Gemini
# Just upload a PDF and generate!
```

### To Switch to Ollama:
```powershell
# 1. Start Ollama in a new terminal
ollama serve

# 2. Remove Gemini key from .env (or comment it out)
# GEMINI_API_KEY=

# 3. Restart backend
cd backend
npm start

# Backend will auto-detect and use Ollama!
```

---

## 📊 Check Current AI Service

Visit: http://localhost:5000/api/status

You'll see:
```json
{
  "success": true,
  "gemini": {
    "available": true,
    "status": "✅ API Key configured"
  },
  "ollama": {
    "available": false,
    "status": "❌ Service not running"
  },
  "current": "gemini"
}
```

---

## 🔄 Automatic Fallback

If Gemini fails (quota exceeded, network error, etc.), the system automatically tries Ollama as backup!

**Example flow:**
```
Upload PDF → Try Gemini → Error (quota exceeded)
            ↓
    Auto-retry with Ollama → Success! ✅
```

---

## ⚙️ Configuration (.env)

```properties
PORT=5000

# Option 1: Gemini (remove this to use Ollama)
GEMINI_API_KEY=your_key_here

# Option 2: Ollama (used if no Gemini key)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral:7b
```

---

## 🎮 Best Practice

**For Development/Testing:**
- Use Gemini (faster iterations)

**For Production/Privacy:**
- Use Ollama (no costs, private)

**For Reliability:**
- Keep both configured (automatic fallback!)

---

## 🐛 Troubleshooting

### "No AI service available!"
**Solution:** Either:
- Add `GEMINI_API_KEY` to `.env`, OR
- Start Ollama: `ollama serve`

### Ollama not detected
**Check if running:**
```powershell
curl http://localhost:11434
```
**If error, start it:**
```powershell
ollama serve
```

### Gemini quota exceeded
**Solution:** Automatic fallback to Ollama if running!

---

## 📈 Performance Comparison

| Service | Speed | Privacy | Cost | Internet |
|---------|-------|---------|------|----------|
| **Gemini** | ⚡ 3-5s | ⚠️ Cloud | 💰 Free tier | ✅ Required |
| **Ollama** | 🐢 10-30s | 🔒 100% | 💚 Free | ❌ Offline |

---

## 🎉 You're All Set!

Your backend now intelligently chooses the best AI service available. No manual switching needed!

**Current Status:** Using Gemini API
**To switch:** Remove API key or start Ollama
**To use both:** Keep both running for automatic fallback!
