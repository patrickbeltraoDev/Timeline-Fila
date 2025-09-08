function renderCharts(rawData) {
    const container = document.getElementById('chartContainer');
    container.innerHTML = '';

    for (const uf in rawData) {
        const ufData = rawData[uf];

        const chartWrapper = document.createElement('div');
        chartWrapper.className = 'chart-wrapper';

        const title = document.createElement('h4');
        title.textContent = `${uf}`;
        chartWrapper.appendChild(title);

        const canvas = document.createElement('canvas');
        chartWrapper.appendChild(canvas);
        container.appendChild(chartWrapper);

        const labels = [...new Set(ufData.map(item => item.dia))];
        const atividades = {};

        ufData.forEach(item => {
            if (!atividades[item.macro_atividade]) atividades[item.macro_atividade] = {};
            atividades[item.macro_atividade][item.dia] = item.fila;
        });

        const datasets = Object.keys(atividades).map((atividade, index) => {
            return {
                label: atividade,
                data: labels.map(dia => atividades[atividade][dia] || 0),
                fill: true,
                tension: 0.3,
                borderColor: index === 0 ? '#FF0000' : '#0000FF',
                pointBackgroundColor: '#000'
            };
        });

        new Chart(canvas, {
            type: 'line',
            data: { labels, datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true },
                    datalabels: {
                        align: 'end',
                        anchor: 'end',
                        color: '#000',
                        font: { size: 11 }
                    }
                },
                layout: { padding: { left: 35, right: 35, top: 25, bottom: 0 } },
                scales: {
                    x: { display: true, grid: { display: false } },
                    y: { display: false, grid: { display: false } }
                }
            },
            plugins: [ChartDataLabels]
        });
    }
}