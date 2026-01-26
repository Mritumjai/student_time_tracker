# Focus — Study Timer App

A beautiful, minimal study timer with analytics. Track your study sessions, analyze your progress, and stay focused.

## Features

### ✅ Phase 1 — Basic Timer (MVP)
- ⏱️ Start/Stop timer with live display
- 💾 Automatic session saving to database
- 📊 Display total study time for today
- 🎨 Beautiful brutalist-meets-elegant design

### ✅ Phase 2 — Subjects
- 📚 Select/enter study subjects
- 💡 Autocomplete from previous subjects
- 📈 Track time per subject
- 🎯 Subject-specific analytics

### ✅ Phase 3 — Dashboard
- 🥧 Pie chart showing time distribution by subject
- 📊 Bar graph showing last 7 days of activity
- 🎨 Interactive charts using Chart.js
- 📱 Responsive design for all devices

## Tech Stack

- **Backend**: Flask (Python)
- **Database**: SQLite
- **Frontend**: HTML, CSS, JavaScript
- **Charts**: Chart.js
- **Fonts**: Instrument Serif, JetBrains Mono

## Installation & Setup

### 1. Navigate to the project folder
```bash
cd study-timer
```

### 2. Create a virtual environment
```bash
python -m venv venv
```

### 3. Activate the virtual environment

**On Windows:**
```bash
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
source venv/bin/activate
```

### 4. Install dependencies
```bash
pip install -r requirements.txt
```

### 5. Run the application
```bash
python app.py
```

### 6. Open in browser
Navigate to: `http://localhost:5000`

## How to Use

1. **Enter what you're studying** in the text field
2. **Click "Start Session"** to begin tracking time
3. **Click "End Session"** when you're done
4. **View analytics** by clicking "Show Analytics"

## Database Schema

The app uses SQLite with a single table:

```sql
CREATE TABLE study_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subject TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    duration INTEGER NOT NULL  -- stored in minutes
)
```

## Project Structure

```
study-timer/
├── app.py                 # Flask backend with all routes
├── requirements.txt       # Python dependencies
├── study_sessions.db      # SQLite database (auto-created)
├── static/
│   ├── css/
│   │   └── style.css     # All styling with animations
│   └── js/
│       ├── timer.js      # Timer logic and controls
│       └── stats.js      # Charts and analytics
└── templates/
    └── index.html        # Main HTML template
```

## API Endpoints

- `GET /` - Main application page
- `POST /save-session` - Save a completed study session
- `GET /get-stats` - Get statistics (today's total, subject breakdown, daily data)
- `GET /get-subjects` - Get list of all subjects for autocomplete

## Future Enhancement Ideas

- 🔐 User authentication and accounts
- 🔥 Study streak counter
- 🎯 Weekly goals (e.g., 20 hours/week)
- 📥 Export data to CSV
- 🌙 Dark/Light mode toggle
- ⏲️ Pomodoro timer mode
- 🤖 AI-powered study insights
- 📱 Mobile app version
- 🔔 Break reminders
- 📊 Monthly/yearly reports

## Design Philosophy

This app embraces a **brutalist-meets-elegant** aesthetic:
- Distinctive typography (Instrument Serif + JetBrains Mono)
- Dark color palette with vibrant accent colors
- Grain texture overlay for depth
- Smooth animations and transitions
- Clean, functional interface
- No unnecessary decoration

## Browser Compatibility

Works best on modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - Feel free to use and modify!

## Credits

Built with ❤️ for focused learners everywhere.
