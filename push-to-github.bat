@echo off
echo =========================================
echo   Git Setup and Push to GitHub
echo =========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo Git is not installed. Please install Git first.
    echo Download from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Please create a repository on GitHub first if you haven't already:
echo https://github.com/new
echo.
set /p REPO_URL="Enter your GitHub repository URL: "

if "%REPO_URL%"=="" (
    echo No repository URL provided. Exiting.
    pause
    exit /b 1
)

echo.
echo Setting up Git repository...

REM Initialize git if not already initialized
if not exist .git (
    git init
    echo Git repository initialized
) else (
    echo Git repository already exists
)

REM Configure git if needed
git config user.name >nul 2>&1
if errorlevel 1 (
    set /p GIT_NAME="Enter your Git username: "
    git config user.name "%GIT_NAME%"
)

git config user.email >nul 2>&1
if errorlevel 1 (
    set /p GIT_EMAIL="Enter your Git email: "
    git config user.email "%GIT_EMAIL%"
)

REM Add all files
echo.
echo Staging files...
git add .
echo Files staged

REM Create commit
echo.
echo Creating commit...
git commit -m "Initial commit: Focus Study Timer app with analytics"
echo Commit created

REM Add remote
echo.
echo Adding remote repository...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
echo Remote added

REM Push to GitHub
echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

if errorlevel 0 (
    echo.
    echo =========================================
    echo   SUCCESS!
    echo =========================================
    echo.
    echo Your code is now on GitHub!
    echo Repository: %REPO_URL%
    echo.
    echo Next steps:
    echo   1. Visit your repository on GitHub
    echo   2. Add a description and topics
    echo   3. Share your project!
    echo.
) else (
    echo.
    echo =========================================
    echo   PUSH FAILED
    echo =========================================
    echo.
    echo This might be because:
    echo   1. The repository URL is incorrect
    echo   2. You don't have push permissions
    echo   3. You need to authenticate with GitHub
    echo.
)

pause
