const ufList = [
    { regional: 'RCO', uf: ['', 'AC', 'DF', 'GO', 'MS', 'MT', 'RO', 'TO'] },
    { regional: 'RMG', uf: ['', 'MG', 'ES'] },
    { regional: 'RSUL', uf: ['', 'RS'] },
    { regional: 'RSP', uf: ['', 'SP'] }
];

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

// function validateFormUf(dataForm) {
//     regional = document.getElementById('slt_regional').value,
//     uf = document.getElementById('slt_uf').value,
// }

// FUNÇÃO REQUEST PARA (api.php) PARA PERSISTENCIA DE DADOS
async function apiCall(dataForm) {
   try {
       const response = await fetch('public/api.php', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(dataForm)
       });

       if (!response.ok) {
           throw new Error('Network response was not ok');
       }

       const data = await response.json();
       console.log(data);
   } catch (error) {
       console.error('There was a problem with the fetch operation:', error);
   }
}

preencherDatas();

// function createGraphs()
// {
//     const options = {
//         maintainAspectRatio: false,
//         responsive: true,
//         plugins: {legend: {display: false}},
//         layout: {padding: {right: 17, left: 15, top: 15}},
//         scales: {
//             x: {display: true, grid: { display: false }},
//             y: {display: false, grid: { display: false }}
//         },
//     };

//     const data = {
//         labels: dados.legends_graf,
//         datasets: [{
//                 type: 'line',
//                 backgroundColor: ['rgba(216, 17, 89, .6)'],
//                 pointBackgroundColor: '#000',
//                 fill: true,
//                 data: dados.performace,
//                 tension: 0.3,
//                 datalabels: {
//                     align: 'start',
//                     anchor: 'end',
//                     align: 'end',
//                     color: '#000',
//                     font: {
//                         size: 11
//                     },
//                     formatter: (value, context) => {
//                         const valor = context.chart.data.datasets[0].data;
//                         const percentageValue = [`${value}%`];
//                         return percentageValue;
//                     }
//                 },
//                 order: 1
//             }
//         ]
//     };

//     new Chart("myChart2", {
//         data: data,
//         options: options,
//         plugins: [ChartDataLabels]
//     })

    
// }