document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/data');
    const data = await response.json();

    const labels = data.map(item => new Date(item.observationtimeutc).toLocaleString());
    const values = data.map(item => item.value);

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Observation Values',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
