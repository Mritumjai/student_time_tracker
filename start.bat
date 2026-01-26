@echo off
echo Starting Focus Study Timer...
echo.

REM Check if virtual environment exists
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies if needed
if not exist "venv\installed" (
    echo Installing dependencies...
    pip install -r requirements.txt
    type nul > venv\installed
)

REM Run the app
echo Launching application...
echo.
echo Open your browser to: http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

python app.py
