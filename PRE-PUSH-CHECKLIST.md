# ✅ GitHub Push Checklist

## 🔒 Security Check (CRITICAL!)

Run these commands before pushing:

### 1. Verify .env is NOT tracked
```powershell
git ls-files | findstr .env
```
**Expected:** No output or only `.env.example` files  
**If you see `backend/.env`:** Run `git rm --cached backend/.env`

### 2. Check Git status
```powershell
git status
```
**Verify .env is NOT in the list**

### 3. Test .gitignore
```powershell
git check-ignore -v backend/.env
```
**Expected:** Should show that `.env` is being ignored

---

## ✅ Pre-Commit Checklist

Before committing:

- [ ] `.env` files are NOT in `git status`
- [ ] `.env.example` files exist in both backend and frontend
- [ ] `node_modules/` is not being tracked
- [ ] `package-lock.json` is gitignored (optional)
- [ ] No API keys in source code
- [ ] All sensitive data is in `.env` only

---

## 📋 Files Status

### ✅ Safe to Commit:
```
✅ .gitignore (root, backend, frontend)
✅ .env.example (backend, frontend)
✅ SECURITY.md
✅ README.md
✅ All source code (.js, .jsx, .css)
✅ package.json files
✅ Documentation (.md files)
```

### ❌ NEVER Commit:
```
❌ backend/.env (contains real API key)
❌ frontend/.env.local
❌ node_modules/
❌ build/
❌ dist/
❌ *.log files
```

---

## 🚀 Safe Push Process

### Step 1: Add files
```powershell
cd d:\MCQ-GENERATOR
git add .
```

### Step 2: Verify what's being committed
```powershell
git status
```
**STOP if you see:**
- `backend/.env`
- `frontend/.env.local`
- `node_modules/`

### Step 3: Commit
```powershell
git commit -m "Update MCQ Generator with security improvements"
```

### Step 4: Push
```powershell
git push origin main
```

---

## 🆘 Emergency: If You Already Pushed .env

### Immediate Action Required:

1. **Revoke API Key NOW**
   ```
   Visit: https://aistudio.google.com/app/apikey
   Delete the exposed key
   Create a new key
   ```

2. **Remove from Git**
   ```powershell
   git rm --cached backend/.env
   git commit -m "Remove .env file"
   git push origin main --force
   ```

3. **Update Local .env**
   ```powershell
   cd backend
   notepad .env
   # Add your NEW API key
   ```

---

## ✅ Current Status Check

Run this complete verification:

```powershell
# 1. Check if .env is tracked
git ls-files | findstr .env

# 2. Verify .gitignore is working
git check-ignore -v backend/.env

# 3. See current status
git status

# 4. List what will be committed
git diff --cached --name-only
```

---

## 📊 Expected Git Status

Your `git status` should look like this:

```
Changes not staged for commit:
  modified:   backend/.gitignore
  modified:   frontend/.gitignore

Untracked files:
  .gitignore
  SECURITY.md
  backend/.env.example
  frontend/.env.example
```

**Notice:** `backend/.env` should NOT appear anywhere!

---

## 🎯 Quick Commands

### Add security files and commit:
```powershell
git add .gitignore backend/.gitignore frontend/.gitignore
git add backend/.env.example frontend/.env.example
git add SECURITY.md
git commit -m "Add security configurations"
git push origin main
```

### Verify protection:
```powershell
# This should show NO output
git ls-files | findstr "backend\\.env$"
```

---

## ✅ You're Ready to Push If:

1. ✅ `git ls-files | findstr .env` shows only `.env.example` files
2. ✅ `git status` does NOT show `backend/.env`
3. ✅ `.env.example` files exist
4. ✅ `.gitignore` files are updated
5. ✅ `SECURITY.md` is created

**All checks passed? You're safe to push! 🚀**
