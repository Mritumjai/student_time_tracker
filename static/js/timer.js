// Timer state
let timerInterval = null;
let startTime = null;
let elapsedSeconds = 0;
let isRunning = false;

// DOM elements
const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const subjectInput = document.getElementById('subjectInput');
const sessionInfo = document.getElementById('sessionInfo');
const currentSubject = document.getElementById('currentSubject');
const todayTotal = document.getElementById('todayTotal');
const subjectsDatalist = document.getElementById('subjects');

// Format time as HH:MM:SS
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Format duration for display (e.g., "2h 30m")
function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
        return `${mins}m`;
    }
    return `${hours}h ${mins}m`;
}

// Update timer display
function updateDisplay() {
    const now = new Date();
    elapsedSeconds = Math.floor((now - startTime) / 1000);
    timerDisplay.textContent = formatTime(elapsedSeconds);
}

// Start timer
function startTimer() {
    const subject = subjectInput.value.trim();
    
    if (!subject) {
        alert('Please enter what you\'re studying!');
        return;
    }
    
    // Start the timer
    startTime = new Date();
    elapsedSeconds = 0;
    isRunning = true;
    
    // Update UI
    startBtn.disabled = true;
    stopBtn.disabled = false;
    subjectInput.disabled = true;
    sessionInfo.style.display = 'block';
    currentSubject.textContent = `Studying: ${subject}`;
    
    // Start interval
    timerInterval = setInterval(updateDisplay, 1000);
    
    console.log('Timer started:', subject);
}

// Stop timer
async function stopTimer() {
    if (!isRunning) return;
    
    // Stop the interval
    clearInterval(timerInterval);
    isRunning = false;
    
    const endTime = new Date();
    const durationMinutes = Math.floor(elapsedSeconds / 60);
    
    // Prepare session data
    const sessionData = {
        subject: subjectInput.value.trim(),
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        duration: durationMinutes
    };
    
    // Save to database
    try {
        const response = await fetch('/save-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sessionData)
        });
        
        if (response.ok) {
            console.log('Session saved successfully');
            
            // Refresh stats
            await loadStats();
            await loadSubjects();
            
            // Show success message
            sessionInfo.textContent = `Session saved: ${formatDuration(durationMinutes)}`;
            setTimeout(() => {
                sessionInfo.style.display = 'none';
            }, 3000);
        }
    } catch (error) {
        console.error('Error saving session:', error);
        alert('Failed to save session. Please try again.');
    }
    
    // Reset UI
    startBtn.disabled = false;
    stopBtn.disabled = true;
    subjectInput.disabled = false;
    elapsedSeconds = 0;
    timerDisplay.textContent = '00:00:00';
}

// Load today's total
async function loadStats() {
    try {
        const response = await fetch('/get-stats');
        const data = await response.json();
        
        todayTotal.textContent = formatDuration(data.total_today);
        
        // Update charts if stats are visible
        if (document.getElementById('statsContent').style.display !== 'none') {
            updateCharts(data);
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Load previous subjects for autocomplete
async function loadSubjects() {
    try {
        const response = await fetch('/get-subjects');
        const data = await response.json();
        
        subjectsDatalist.innerHTML = '';
        data.subjects.forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            subjectsDatalist.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading subjects:', error);
    }
}

// Event listeners
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);

// Keyboard shortcuts
subjectInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !isRunning) {
        startTimer();
    }
});

// Initialize
loadStats();
loadSubjects();

// Refresh stats every minute
setInterval(loadStats, 60000);
