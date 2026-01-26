from flask import Flask, render_template, request, jsonify
import sqlite3
from datetime import datetime, timedelta
import os

app = Flask(__name__)

# Database setup
def init_db():
    conn = sqlite3.connect('study_sessions.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS study_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject TEXT NOT NULL,
            start_time TEXT NOT NULL,
            end_time TEXT NOT NULL,
            duration INTEGER NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save-session', methods=['POST'])
def save_session():
    data = request.json
    
    conn = sqlite3.connect('study_sessions.db')
    c = conn.cursor()
    
    c.execute('''
        INSERT INTO study_sessions (subject, start_time, end_time, duration)
        VALUES (?, ?, ?, ?)
    ''', (
        data['subject'],
        data['start_time'],
        data['end_time'],
        data['duration']
    ))
    
    conn.commit()
    conn.close()
    
    return jsonify({'status': 'success'})

@app.route('/get-stats', methods=['GET'])
def get_stats():
    conn = sqlite3.connect('study_sessions.db')
    c = conn.cursor()
    
    # Total time today
    today = datetime.now().strftime('%Y-%m-%d')
    c.execute('''
        SELECT SUM(duration) FROM study_sessions
        WHERE date(start_time) = ?
    ''', (today,))
    total_today = c.fetchone()[0] or 0
    
    # Time per subject (all time)
    c.execute('''
        SELECT subject, SUM(duration) FROM study_sessions
        GROUP BY subject
    ''')
    subject_stats = [{'subject': row[0], 'duration': row[1]} for row in c.fetchall()]
    
    # Daily stats for last 7 days
    c.execute('''
        SELECT date(start_time) as day, SUM(duration) FROM study_sessions
        WHERE date(start_time) >= date('now', '-7 days')
        GROUP BY day
        ORDER BY day
    ''')
    daily_stats = [{'date': row[0], 'duration': row[1]} for row in c.fetchall()]
    
    conn.close()
    
    return jsonify({
        'total_today': total_today,
        'subject_stats': subject_stats,
        'daily_stats': daily_stats
    })

@app.route('/get-subjects', methods=['GET'])
def get_subjects():
    conn = sqlite3.connect('study_sessions.db')
    c = conn.cursor()
    
    c.execute('SELECT DISTINCT subject FROM study_sessions ORDER BY subject')
    subjects = [row[0] for row in c.fetchall()]
    
    conn.close()
    
    return jsonify({'subjects': subjects})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
