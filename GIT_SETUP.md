# Git Setup & Push to GitHub

## Option 1: Push to an EXISTING GitHub Repository

If you already have a repository created on GitHub:

```bash
cd study-timer

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Focus Study Timer app with analytics"

# Add your GitHub repository as remote (replace with your repo URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Option 2: Create a NEW GitHub Repository

### Step 1: Create repository on GitHub
1. Go to https://github.com/new
2. Repository name: `focus-study-timer` (or your preferred name)
3. Description: "Beautiful study timer with analytics - Flask web app"
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 2: Push your code
After creating the repo, GitHub will show you commands. Use these:

```bash
cd study-timer

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Focus Study Timer app with analytics"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/focus-study-timer.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Quick Setup Script

Run this script (after creating the GitHub repo):

```bash
#!/bin/bash

echo "🚀 Setting up Git and pushing to GitHub..."
echo ""

# Get repository URL from user
read -p "Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): " REPO_URL

cd study-timer

# Initialize git
git init
echo "✅ Git initialized"

# Add all files
git add .
echo "✅ Files staged"

# Commit
git commit -m "Initial commit: Focus Study Timer app with analytics"
echo "✅ Initial commit created"

# Add remote
git remote add origin "$REPO_URL"
echo "✅ Remote added"

# Push to GitHub
git branch -M main
git push -u origin main
echo "✅ Pushed to GitHub!"

echo ""
echo "🎉 Done! Your code is now on GitHub at: $REPO_URL"
```

---

## What to Add to .gitignore

Create a `.gitignore` file to exclude unnecessary files:

```
# Python
venv/
__pycache__/
*.py[cod]
*$py.class
*.so
.Python

# Flask
instance/
.env
.venv

# Database
*.db
*.sqlite
*.sqlite3

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
```

---

## Troubleshooting

### If you get "remote origin already exists":
```bash
git remote remove origin
git remote add origin YOUR-REPO-URL
```

### If you need to configure git:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### If you want to use SSH instead of HTTPS:
```bash
git remote set-url origin git@github.com:YOUR-USERNAME/YOUR-REPO-NAME.git
```

---

## Next Steps After Pushing

1. Add a nice README badge
2. Enable GitHub Pages for the preview
3. Add issues/features you want to implement
4. Share your project! 🚀
