#!/bin/bash

echo "========================================="
echo "  📦 Git Setup & Push to GitHub"
echo "========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Get repository URL
echo "Please create a repository on GitHub first if you haven't already:"
echo "https://github.com/new"
echo ""
read -p "Enter your GitHub repository URL: " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ No repository URL provided. Exiting."
    exit 1
fi

echo ""
echo "🔧 Setting up Git repository..."

# Initialize git if not already initialized
if [ ! -d .git ]; then
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Configure git if needed
if [ -z "$(git config user.name)" ]; then
    read -p "Enter your Git username: " GIT_NAME
    git config user.name "$GIT_NAME"
fi

if [ -z "$(git config user.email)" ]; then
    read -p "Enter your Git email: " GIT_EMAIL
    git config user.email "$GIT_EMAIL"
fi

# Add all files
echo ""
echo "📝 Staging files..."
git add .
echo "✅ Files staged"

# Create commit
echo ""
echo "💾 Creating commit..."
git commit -m "Initial commit: Focus Study Timer app with analytics

Features:
- Complete timer functionality with start/stop
- Subject selection and tracking
- SQLite database for persistent storage
- Beautiful analytics dashboard with Chart.js
- Responsive design with brutalist-elegant aesthetic
- Last 7 days activity tracking
- Time breakdown by subject"

echo "✅ Commit created"

# Add remote
echo ""
echo "🔗 Adding remote repository..."
if git remote | grep -q "origin"; then
    git remote remove origin
fi
git remote add origin "$REPO_URL"
echo "✅ Remote added"

# Push to GitHub
echo ""
echo "🚀 Pushing to GitHub..."
git branch -M main

if git push -u origin main; then
    echo ""
    echo "========================================="
    echo "  ✅ SUCCESS!"
    echo "========================================="
    echo ""
    echo "🎉 Your code is now on GitHub!"
    echo "📍 Repository: $REPO_URL"
    echo ""
    echo "Next steps:"
    echo "  1. Visit your repository on GitHub"
    echo "  2. Add a description and topics"
    echo "  3. Share your project!"
    echo ""
else
    echo ""
    echo "========================================="
    echo "  ⚠️  PUSH FAILED"
    echo "========================================="
    echo ""
    echo "This might be because:"
    echo "  1. The repository URL is incorrect"
    echo "  2. You don't have push permissions"
    echo "  3. You need to authenticate with GitHub"
    echo ""
    echo "Try these solutions:"
    echo "  - Check the repository URL"
    echo "  - Make sure you're logged into GitHub"
    echo "  - Use 'git push -u origin main --force' if you need to force push"
    echo ""
fi
