# 🔒 Security & GitHub Setup Guide

## ⚠️ CRITICAL: Before Pushing to GitHub

### 🚨 **IMPORTANT - Your API Key May Be Exposed!**

If you've already pushed your `.env` file with your actual API key to GitHub, follow these steps immediately:

---

## 🔥 If You Already Pushed .env (URGENT)

### Step 1: Revoke Your Current API Key
1. Go to https://aistudio.google.com/app/apikey
2. **Delete your current API key** (the one in your .env)
3. **Create a new API key**
4. Save the new key securely

### Step 2: Remove .env from Git History
```powershell
# Stop tracking .env file
git rm --cached backend/.env

# Remove from history (if already committed)
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch backend/.env" --prune-empty --tag-name-filter cat -- --all
```

### Step 3: Update Your Local .env
```powershell
# Navigate to backend
cd backend

# Update .env with your NEW API key
notepad .env
```

---

## ✅ Proper Setup (Do This Now)

### 1. **Verify .gitignore Files**

Check that these files exist and contain `.env`:
- ✅ `backend/.gitignore` - Contains `.env`
- ✅ `frontend/.gitignore` - Contains `.env.local`
- ✅ `.gitignore` (root) - Contains `.env`

### 2. **Use .env.example Instead**

✅ `.env.example` - Safe to commit (no real keys)  
❌ `.env` - NEVER commit (contains real keys)

### 3. **Check What Will Be Committed**

```powershell
# See what files will be committed
git status

# If you see .env in the list, STOP!
# Run: git rm --cached backend/.env
```

### 4. **Safe Commit Process**

```powershell
# Add all files (respects .gitignore)
git add .

# Verify .env is NOT in the list
git status

# If safe, commit
git commit -m "Add MCQ Generator application"

# Push to GitHub
git push origin main
```

---

## 🔐 Files Protected by .gitignore

### Backend:
- ✅ `.env` (your API key)
- ✅ `node_modules/`
- ✅ `uploads/`
- ✅ `*.log` files

### Frontend:
- ✅ `.env.local`
- ✅ `node_modules/`
- ✅ `build/`

---

## 📋 Setup Instructions for Others

When someone clones your repository:

### Backend Setup:
```powershell
cd backend

# Copy example to actual .env
copy .env.example .env

# Edit .env and add their own API key
notepad .env

# Install dependencies
npm install

# Start server
npm start
```

### Frontend Setup:
```powershell
cd frontend

# Install dependencies
npm install

# Start app
npm start
```

---

## ✅ Security Checklist

Before pushing to GitHub, verify:

- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` exists (without real keys)
- [ ] `git status` does NOT show `.env`
- [ ] API key is not in any committed code
- [ ] `node_modules/` is in `.gitignore`
- [ ] README has setup instructions

---

## 🚫 Never Commit These:

❌ `.env` files with real API keys  
❌ `node_modules/` folders  
❌ Build artifacts (`build/`, `dist/`)  
❌ Log files (`*.log`)  
❌ Personal IDE settings (`.vscode/`, `.idea/`)  

---

## ✅ Safe to Commit:

✅ `.env.example` (template only)  
✅ Source code (`.js`, `.jsx`, `.css`)  
✅ `package.json`  
✅ Documentation (`.md` files)  
✅ `.gitignore` files  

---

## 🔍 Verify Your Git Status

Run this before every commit:

```powershell
# Check what will be committed
git status

# Check if .env is tracked
git ls-files | findstr .env

# If it shows "backend/.env", run:
git rm --cached backend/.env
```

---

## 🆘 Emergency: API Key Leaked

If you accidentally committed your API key:

1. **Revoke the key immediately** at https://aistudio.google.com/app/apikey
2. **Create a new key**
3. **Update your local .env**
4. **Remove from Git history** (see steps above)
5. **Force push** (if repository is private): `git push --force`

---

## 📞 Need Help?

Common commands:

```powershell
# Remove file from Git but keep locally
git rm --cached backend/.env

# See what's being tracked
git ls-files

# Check Git ignore is working
git check-ignore -v backend/.env
# Should show: .gitignore:2:.env    backend/.env
```

---

## 🎯 Best Practices

1. **Always use .env.example** for templates
2. **Never hardcode** API keys in source code
3. **Double-check** `git status` before committing
4. **Rotate API keys** regularly
5. **Use different keys** for development and production

---

## ✅ You're Protected If:

- `.env` is in `.gitignore`
- `git status` doesn't show `.env`
- `.env.example` exists with placeholder values
- GitHub repository doesn't contain your real API key

**Status: Your project is now properly configured for GitHub! 🎉**
