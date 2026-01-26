// Chart instances
let subjectChart = null;
let dailyChart = null;

// Chart colors (matching the theme)
const chartColors = [
    '#ff6b35',
    '#ffa600',
    '#00a896',
    '#4ecdc4',
    '#ff6b6b',
    '#95e1d3',
    '#f38181',
    '#aa96da',
];

// Toggle stats visibility
const toggleStatsBtn = document.getElementById('toggleStats');
const statsContent = document.getElementById('statsContent');

toggleStatsBtn.addEventListener('click', async () => {
    if (statsContent.style.display === 'none') {
        statsContent.style.display = 'grid';
        toggleStatsBtn.classList.add('active');
        toggleStatsBtn.querySelector('span').textContent = 'Hide Analytics';
        
        // Load and display charts
        const response = await fetch('/get-stats');
        const data = await response.json();
        updateCharts(data);
    } else {
        statsContent.style.display = 'none';
        toggleStatsBtn.classList.remove('active');
        toggleStatsBtn.querySelector('span').textContent = 'Show Analytics';
    }
});

// Update all charts
function updateCharts(data) {
    updateSubjectChart(data.subject_stats);
    updateDailyChart(data.daily_stats);
    updateSubjectList(data.subject_stats);
}

// Subject pie chart
function updateSubjectChart(subjectStats) {
    const ctx = document.getElementById('subjectChart').getContext('2d');
    
    if (subjectChart) {
        subjectChart.destroy();
    }
    
    if (subjectStats.length === 0) {
        ctx.fillStyle = '#7a766f';
        ctx.font = '14px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.fillText('No data yet. Start studying!', ctx.canvas.width / 2, ctx.canvas.height / 2);
        return;
    }
    
    const labels = subjectStats.map(s => s.subject);
    const durations = subjectStats.map(s => s.duration);
    const colors = labels.map((_, i) => chartColors[i % chartColors.length]);
    
    subjectChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: durations,
                backgroundColor: colors,
                borderColor: '#1a1918',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#242220',
                    titleColor: '#f5f3ef',
                    bodyColor: '#b8b4ad',
                    borderColor: '#2d2b28',
                    borderWidth: 1,
                    padding: 12,
                    titleFont: {
                        family: 'JetBrains Mono',
                        size: 14,
                        weight: '600'
                    },
                    bodyFont: {
                        family: 'JetBrains Mono',
                        size: 12
                    },
                    callbacks: {
                        label: function(context) {
                            const minutes = context.parsed;
                            const hours = Math.floor(minutes / 60);
                            const mins = minutes % 60;
                            return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
                        }
                    }
                }
            },
            cutout: '65%'
        }
    });
}

// Daily bar chart
function updateDailyChart(dailyStats) {
    const ctx = document.getElementById('dailyChart').getContext('2d');
    
    if (dailyChart) {
        dailyChart.destroy();
    }
    
    if (dailyStats.length === 0) {
        ctx.fillStyle = '#7a766f';
        ctx.font = '14px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.fillText('No data yet. Start studying!', ctx.canvas.width / 2, ctx.canvas.height / 2);
        return;
    }
    
    // Fill in missing days
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const existing = dailyStats.find(s => s.date === dateStr);
        last7Days.push({
            date: dateStr,
            duration: existing ? existing.duration : 0
        });
    }
    
    const labels = last7Days.map(s => {
        const date = new Date(s.date);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    });
    
    const durations = last7Days.map(s => s.duration);
    
    dailyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: durations,
                backgroundColor: '#ff6b35',
                borderColor: '#ff6b35',
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#242220',
                    titleColor: '#f5f3ef',
                    bodyColor: '#b8b4ad',
                    borderColor: '#2d2b28',
                    borderWidth: 1,
                    padding: 12,
                    titleFont: {
                        family: 'JetBrains Mono',
                        size: 14,
                        weight: '600'
                    },
                    bodyFont: {
                        family: 'JetBrains Mono',
                        size: 12
                    },
                    callbacks: {
                        label: function(context) {
                            const minutes = context.parsed.y;
                            const hours = Math.floor(minutes / 60);
                            const mins = minutes % 60;
                            return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#7a766f',
                        font: {
                            family: 'JetBrains Mono',
                            size: 11
                        },
                        callback: function(value) {
                            return Math.floor(value / 60) + 'h';
                        }
                    },
                    grid: {
                        color: '#2d2b28',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: '#b8b4ad',
                        font: {
                            family: 'JetBrains Mono',
                            size: 11,
                            weight: '600'
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Subject list below pie chart
function updateSubjectList(subjectStats) {
    const subjectList = document.getElementById('subjectList');
    subjectList.innerHTML = '';
    
    if (subjectStats.length === 0) {
        subjectList.innerHTML = '<div style="text-align: center; color: #7a766f; padding: 20px;">No subjects yet</div>';
        return;
    }
    
    // Sort by duration descending
    const sorted = [...subjectStats].sort((a, b) => b.duration - a.duration);
    
    sorted.forEach((stat, index) => {
        const item = document.createElement('div');
        item.className = 'subject-item';
        item.style.borderLeftColor = chartColors[index % chartColors.length];
        
        const hours = Math.floor(stat.duration / 60);
        const minutes = stat.duration % 60;
        const timeStr = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
        
        item.innerHTML = `
            <span class="subject-name">${stat.subject}</span>
            <span class="subject-time">${timeStr}</span>
        `;
        
        subjectList.appendChild(item);
    });
}
