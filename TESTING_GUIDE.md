# 🧪 Testing Different AI Services

This guide shows you how to test each AI service independently by commenting/uncommenting in `.env`

---

## ✅ Test 1: Ollama Only (PRIMARY)

**Setup `.env`:**
```properties
# Ollama ENABLED
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral:7b

# Gemini DISABLED
# GEMINI_API_KEY=your_key
```

**Start Ollama:**
```powershell
ollama serve
```

**Expected Result:**
```
🔍 Detecting available AI services...
✅ PRIMARY: Using Ollama (Local Model - Private & Free)
==================================================
🎯 Using AI Service: OLLAMA
==================================================
```

**Characteristics:**
- ⚡ Slower (10-30 seconds)
- 🔒 100% Private
- 💰 Free forever
- 🌐 Works offline

---

## ✅ Test 2: Gemini Only (FALLBACK)

**Setup `.env`:**
```properties
# Ollama DISABLED
# OLLAMA_BASE_URL=http://localhost:11434
# OLLAMA_MODEL=mistral:7b

# Gemini ENABLED
GEMINI_API_KEY=AIzaSyCKIv-w021tqvnmYUstwB6SqLP9x4VhL2U
```

**Stop Ollama:**
```powershell
Stop-Process -Name ollama -Force
```

**Expected Result:**
```
🔍 Detecting available AI services...
❌ Ollama not configured in .env
⚠️  Ollama not available, checking Gemini as fallback...
✅ FALLBACK: Using Gemini API (Cloud)
==================================================
🎯 Using AI Service: GEMINI
==================================================
```

**Characteristics:**
- ⚡ Fast (3-5 seconds)
- ☁️ Cloud-based
- 🔑 Requires API key
- 🌐 Needs internet

---

## ✅ Test 3: Both Available (Auto-Prioritizes Ollama)

**Setup `.env`:**
```properties
# Both ENABLED
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral:7b
GEMINI_API_KEY=AIzaSyCKIv-w021tqvnmYUstwB6SqLP9x4VhL2U
```

**Start Ollama:**
```powershell
ollama serve
```

**Expected Result:**
```
🔍 Detecting available AI services...
✅ PRIMARY: Using Ollama (Local Model - Private & Free)
==================================================
🎯 Using AI Service: OLLAMA
==================================================
```

**Note:** Even though Gemini is available, **Ollama takes priority!**

---

## ✅ Test 4: Automatic Fallback (Ollama Fails → Gemini)

**Scenario:** Ollama configured but service crashes during generation

**Setup `.env`:**
```properties
# Both ENABLED
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral:7b
GEMINI_API_KEY=AIzaSyCKIv-w021tqvnmYUstwB6SqLP9x4VhL2U
```

**During PDF Generation:**
1. Start with Ollama
2. Stop Ollama mid-generation: `Stop-Process -Name ollama`
3. Watch automatic fallback

**Expected Result:**
```
🎯 Using AI Service: OLLAMA
❌ Error in primary AI service: ECONNREFUSED
⚠️  Ollama failed! Attempting Gemini fallback...
🔄 Switching to Gemini API (Cloud fallback)
✅ MCQs generated successfully with Gemini
```

---

## ❌ Test 5: Neither Available (Error)

**Setup `.env`:**
```properties
# Both DISABLED
# OLLAMA_BASE_URL=http://localhost:11434
# OLLAMA_MODEL=mistral:7b
# GEMINI_API_KEY=your_key
```

**Expected Result:**
```
🔍 Detecting available AI services...
❌ Ollama not configured in .env
❌ No AI service available!
Error: ❌ No AI service available! Please configure in .env:
  PRIMARY: Set OLLAMA_BASE_URL and OLLAMA_MODEL
  FALLBACK: Set GEMINI_API_KEY
```

---

## 📊 Quick Test Commands

### Check Current Configuration:
```powershell
# See what's in .env
cat backend\.env

# Check if Ollama running
Get-Process -Name ollama -ErrorAction SilentlyContinue

# Test Ollama endpoint
curl http://localhost:11434
```

### Restart Backend (Required After Changing .env):
```powershell
# Stop all node processes
Stop-Process -Name node -Force

# Start backend
cd backend
npm start
```

### Test AI Service Status:
```powershell
cd backend
node test-ai-service.js
```

---

## 🎯 Testing Workflow

```
┌─────────────────────────────────────┐
│ 1. Edit .env (comment/uncomment)   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 2. Restart Backend                  │
│    (Stop-Process + npm start)       │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 3. Watch Console Output             │
│    (See which service is selected)  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 4. Upload PDF & Generate MCQs       │
│    (Test the selected service)      │
└─────────────────────────────────────┘
```

---

## 🔥 Priority Rules

**The system checks in this order:**

1. **Ollama configured in .env?**
   - YES → Check if service running → Use Ollama ✅
   - NO → Go to step 2

2. **Gemini key in .env?**
   - YES → Use Gemini ✅
   - NO → Error ❌

3. **If Ollama fails during generation:**
   - Try Gemini as fallback (if configured)
   - Success → Continue with Gemini ✅
   - Fail → Error ❌

---

## 💡 Pro Tips

1. **Test Ollama First:** Always keep Ollama as primary for privacy
2. **Keep Gemini as Backup:** Uncomment Gemini key for reliability
3. **Watch Console Logs:** Backend shows which service is active
4. **Restart After .env Changes:** Environment variables load once at startup
5. **Check Ollama Status:** Run `curl http://localhost:11434` to verify

---

## 🎉 Current Configuration

Based on your updated `.env`:
```
✅ Ollama: ENABLED (PRIMARY)
❌ Gemini: DISABLED (uncomment to enable fallback)
```

**To test Gemini:**
1. Comment out Ollama lines
2. Uncomment Gemini key
3. Restart backend
4. Test generation

**To test fallback:**
1. Enable both
2. Start generation with Ollama
3. Stop Ollama during generation
4. Watch automatic switch to Gemini
