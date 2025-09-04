const ufList = [
    { regional: 'RCO', uf: ['', 'AC', 'DF', 'GO', 'MS', 'MT', 'RO', 'TO'] },
    { regional: 'RMG', uf: ['', 'MG', 'ES'] },
    { regional: 'RSUL', uf: ['', 'RS'] },
    { regional: 'RSP', uf: ['', 'SP'] }
];

const btnImglineGrapsh = document.querySelector('.rw-img img');
btnImglineGrapsh.addEventListener('click', function() {
    const chartContainer = document.getElementById('chartContainer');
    if (chartContainer.style.display === 'grid') {
        chartContainer.style.display = 'flex';
        chartContainer.style.flexDirection = 'column';
    } else {
        chartContainer.style.display = 'grid';
    }
  
});

// SCRIPT RESPONSÁVEL POR PREENCHER AS UFS DE ACORDO COM O FILTRO DA REGIONAL
const selectRegional = document.getElementById('slt_regional');
selectRegional.addEventListener('change', function() {
    
    const selectedRegional = ufList.find(item => item.regional === selectRegional.value);
    const ufSelect = document.getElementById('slt_uf');
    ufSelect.innerHTML = '';

    if (selectedRegional) {
        selectedRegional.uf.forEach(uf => {
            const option = document.createElement('option');
            option.value = uf;
            option.textContent = uf;
            ufSelect.appendChild(option);
        });
    }
});

// SCRIPT REPONSÁVEL POR PREENCHER OS INPUTS DE DATA
function preencherDatas() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth(); // 0 = janeiro

    // Primeiro dia do mês atual
    const primeiroDia = new Date(ano, mes, 1);

    // Último dia do mês atual → truque: dia 0 do próximo mês
    const ultimoDia = new Date(ano, mes + 1, 0);

    // Função para formatar em yyyy-mm-dd
    function formatar(data) {
        const y = data.getFullYear();
        const m = String(data.getMonth() + 1).padStart(2, '0');
        const d = String(data.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }

    document.getElementById('iptDtBegin').value = formatar(primeiroDia);
    document.getElementById('iptDtEnd').value = formatar(ultimoDia);
}

// SCRIPT REPONSÁVEL POR RECARREGAR A PÁGINA NO CASO DO USO (LIMPAR FILTROS)
const btnClearFilter = document.getElementById('btnClearFilter');
btnClearFilter.addEventListener('click', function() {
    window.location.reload();
});

// SCRIPT PARA PEGAR OS VALORES DO FILTRO E CHAMAR A FUNÇÃO (apiCall) ASYNC
const form = document.getElementById('formFilter');
form.addEventListener('submit', function(e) {
    e.preventDefault(); // evita reload da página

    // Pega os valores do formulário
    const dataForm = {
        regional: document.getElementById('slt_regional').value,
        uf: document.getElementById('slt_uf').value,
        dtBegin: document.getElementById('iptDtBegin').value,
        dtEnd: document.getElementById('iptDtEnd').value,
        macro_atividade: document.getElementById('slt_macro_atividade').value
    };

    apiCall(dataForm);
});

// FUNÇÃO REQUEST PARA (api.php) PARA PERSISTENCIA DE DADOS
async function apiCall(dataForm) {
    try {
        const response = await fetch('public/api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataForm)
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const rawData = await response.json();
        const container = document.getElementById('chartContainer');

        console.log(rawData);

        // Limpa gráficos antigos
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

            // Pega todos os dias únicos para o eixo X
            const labels = [...new Set(ufData.map(item => item.dia))];

            // Agrupa os dados por macro_atividade
            const atividades = {};
            ufData.forEach(item => {
                if (!atividades[item.macro_atividade]) atividades[item.macro_atividade] = {};
                atividades[item.macro_atividade][item.dia] = item.fila;
            });

            // Cria datasets para cada macro_atividade
            const datasets = Object.keys(atividades).map((atividade, index) => {
                return {
                    label: atividade,
                    data: labels.map(dia => atividades[atividade][dia] || 0), // preenche com 0 se não tiver dado
                    fill: true,
                    tension: 0.3,
                    borderColor: index === 0 ? '#FF0000' : '#0000FF', // cores diferentes
                    pointBackgroundColor: '#000'
                };
            });

            new Chart(canvas, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
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
                    layout: {
                        padding: { left: 35, right: 35, top: 25, bottom: 0 }
                    },
                    scales: {
                        x: { display: true, grid: { display: false } },
                        y: { display: false, grid: { display: false } }
                    }
                },
                plugins: [ChartDataLabels]
            });
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

preencherDatas();