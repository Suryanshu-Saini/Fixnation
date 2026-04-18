document.addEventListener('DOMContentLoaded', () => {
    
    // Check if Chart is loaded
    if (typeof Chart === 'undefined') {
        console.error("Chart.js failed to load.");
        return;
    }

    // Initialize Chart.js
    const ctx = document.getElementById('lossGraph');
    if (!ctx) return;

    // FixNation color palette for the chart
    const brandOrange = '#FF8C00';
    const brandNavy = '#001F3F';
    const gridColor = '#e2e8f0';

    const data = {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
            label: 'Power Losses Prevented',
            data: [12.5, 14.2, 18.1, 22.4, 25.0, 31.8], // Simulated ₹ Crores
            borderColor: brandOrange,
            backgroundColor: 'rgba(255, 140, 0, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4, // smooth curves
            pointBackgroundColor: brandWhite = '#ffffff',
            pointBorderColor: brandOrange,
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // hidden for cleaner look, title serves purpose
                },
                tooltip: {
                    backgroundColor: brandNavy,
                    titleFont: { family: 'Inter', size: 13 },
                    bodyFont: { family: 'Inter', size: 14, weight: 'bold' },
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return '₹ ' + context.parsed.y + ' Crores';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: { family: 'Inter', size: 12 },
                        color: '#64748b'
                    }
                },
                y: {
                    border: { display: false },
                    grid: {
                        color: gridColor,
                        drawTicks: false
                    },
                    ticks: {
                        font: { family: 'Inter', size: 12 },
                        color: '#64748b',
                        callback: function(value) {
                            return '₹' + value + 'Cr';
                        },
                        padding: 10
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
        }
    };

    new Chart(ctx, config);
    
    // Add interactivity to tables for demo purposes
    const approveBtns = document.querySelectorAll('.btn-approve');
    const rejectBtns = document.querySelectorAll('.btn-reject');
    
    approveBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            row.style.opacity = '0.5';
            setTimeout(() => row.remove(), 300);
        });
    });
    
    rejectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            row.style.opacity = '0.5';
            setTimeout(() => row.remove(), 300);
        });
    });

});
