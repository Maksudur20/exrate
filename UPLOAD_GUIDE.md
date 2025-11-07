# 📤 GitHub Upload Guide for ExRate

Complete step-by-step instructions to upload your ExRate project to GitHub using account: **20maksudur00@gmail.com**

---

## 🎯 Method 1: Using GitHub Desktop (Easiest)

### Step 1: Install GitHub Desktop
1. Download from: https://desktop.github.com/
2. Install and open GitHub Desktop
3. Sign in with your GitHub account (20maksudur00@gmail.com)

### Step 2: Create Repository
1. Click **"File"** → **"New Repository"**
2. Fill in details:
   - **Name**: `exrate`
   - **Description**: `Modern currency exchange rate converter with 180+ currencies`
   - **Local Path**: `e:\exrate`
   - ✅ Check "Initialize with README" (already exists)
   - **License**: MIT License
3. Click **"Create Repository"**

### Step 3: Publish to GitHub
1. Click **"Publish repository"** button
2. Uncheck "Keep this code private" (if you want it public)
3. Click **"Publish Repository"**
4. Done! Your project is now on GitHub

---

## 🎯 Method 2: Using Git Command Line

### Step 1: Install Git (if not installed)
1. Download from: https://git-scm.com/download/win
2. Install with default settings
3. Open PowerShell in your project folder

### Step 2: Configure Git (First time only)
```powershell
git config --global user.name "Maksudur Sium"
git config --global user.email "20maksudur00@gmail.com"
```

### Step 3: Initialize Repository
```powershell
cd e:\exrate
git init
git add .
git commit -m "Initial commit: ExRate currency converter"
```

### Step 4: Create GitHub Repository
1. Go to: https://github.com/new
2. Sign in with 20maksudur00@gmail.com
3. Repository name: `exrate`
4. Description: `Modern currency exchange rate converter with 180+ currencies`
5. Choose **Public** (or Private)
6. ❌ **DO NOT** initialize with README (you already have one)
7. Click **"Create repository"**

### Step 5: Push to GitHub
```powershell
git remote add origin https://github.com/20maksudur00/exrate.git
git branch -M main
git push -u origin main
```

### Step 6: Enter Credentials
- Username: `20maksudur00` (or your GitHub username)
- Password: Use **Personal Access Token** (not your password)
  - Get token from: https://github.com/settings/tokens
  - Click "Generate new token (classic)"
  - Select: `repo` scope
  - Copy the token and use it as password

---

## 🎯 Method 3: Using VS Code

### Step 1: Open in VS Code
1. Open VS Code
2. **File** → **Open Folder** → Select `e:\exrate`

### Step 2: Initialize Git
1. Click **Source Control** icon (left sidebar)
2. Click **"Initialize Repository"**
3. Stage all files (click **+** next to "Changes")
4. Enter commit message: `Initial commit: ExRate currency converter`
5. Click **✓ Commit**

### Step 3: Publish to GitHub
1. Click **"Publish to GitHub"** button
2. Sign in with GitHub (20maksudur00@gmail.com)
3. Choose repository name: `exrate`
4. Select **Public** or **Private**
5. Click **"Publish"**

---

## 🌐 Enable GitHub Pages (Make it Live!)

### After uploading to GitHub:

1. Go to your repository: `https://github.com/20maksudur00/exrate`
2. Click **"Settings"** tab
3. Click **"Pages"** in left sidebar
4. Under **"Source"**:
   - Select branch: **main**
   - Select folder: **/ (root)**
5. Click **"Save"**
6. Wait 2-3 minutes
7. Your site will be live at: `https://20maksudur00.github.io/exrate/`

### Update README with Live URL
After GitHub Pages is active, update your README.md:
- Replace `[View Live Demo](#)` with your actual URL
- Example: `[View Live Demo](https://20maksudur00.github.io/exrate/)`

---

## ✅ Verify Upload

After uploading, check:
- ✅ All files visible on GitHub
- ✅ README displays correctly
- ✅ License shows MIT
- ✅ Repository description is set
- ✅ GitHub Pages is deployed (if enabled)

### Your Repository URL:
```
https://github.com/20maksudur00/exrate
```

### Your Live Site URL (after Pages setup):
```
https://20maksudur00.github.io/exrate/
```

---

## 🔄 Making Updates Later

### Using Git Command Line:
```powershell
cd e:\exrate
git add .
git commit -m "Description of changes"
git push
```

### Using GitHub Desktop:
1. Make changes to your files
2. Open GitHub Desktop
3. Review changes in left panel
4. Enter commit message
5. Click **"Commit to main"**
6. Click **"Push origin"**

### Using VS Code:
1. Make changes to your files
2. Go to Source Control panel
3. Stage changes (click **+**)
4. Enter commit message
5. Click **✓ Commit**
6. Click **"Sync Changes"**

---

## 🆘 Troubleshooting

### Problem: "Git is not recognized"
**Solution**: Install Git from https://git-scm.com/download/win

### Problem: Authentication failed
**Solution**: Use Personal Access Token instead of password
1. Go to: https://github.com/settings/tokens
2. Generate new token with `repo` scope
3. Use token as password when pushing

### Problem: Repository already exists
**Solution**: 
```powershell
git remote set-url origin https://github.com/20maksudur00/exrate.git
git push -u origin main --force
```

### Problem: GitHub Pages not working
**Solution**: 
- Check Settings → Pages is enabled
- Ensure branch is set to `main` and folder to `/ (root)`
- Wait 5-10 minutes for deployment
- Clear browser cache

---

## 📋 Checklist Before Upload

- ✅ All files saved
- ✅ API key is included (it's a free tier, safe to share)
- ✅ README.md is complete
- ✅ LICENSE file is added
- ✅ .gitignore is created
- ✅ Project works locally
- ✅ No sensitive information in code

---

## 🎉 Success!

Once uploaded, you can:
- Share your repository link with anyone
- Add it to your portfolio
- Enable GitHub Pages for live demo
- Track issues and improvements
- Receive contributions from others

### Share Your Project:
```
🌟 Check out my ExRate currency converter!
📦 GitHub: https://github.com/20maksudur00/exrate
🌐 Live Demo: https://20maksudur00.github.io/exrate/
```

---

**Need Help?** 
- GitHub Docs: https://docs.github.com/
- Git Documentation: https://git-scm.com/doc
- GitHub Desktop Guide: https://docs.github.com/en/desktop

**Made by Maksudur Sium** 
Email: 20maksudur00@gmail.com
