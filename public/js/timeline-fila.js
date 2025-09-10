// ARRAY DE UFS POR REGIONAL
const ufList = [
    { regional: 'RCO', uf: ['', 'AC', 'DF', 'GO', 'MS', 'MT', 'RO', 'TO'] },
    { regional: 'RMG', uf: ['', 'MG', 'ES'] },
    { regional: 'RSUL', uf: ['', 'RS'] },
    { regional: 'RSP', uf: ['', 'SP'] }
];

// ALTERAR O LAYOUT DO CONTAINER (GRID/FLEX)
const btnImglineGrapsh = document.querySelectorAll('.rw-img img')[2];
btnImglineGrapsh.addEventListener('click', function() {
    const chartContainer = document.getElementById('chartContainer');
    if (chartContainer.style.display === 'grid') {
        chartContainer.style.display = 'flex';
        chartContainer.style.flexDirection = 'column';
    } else {
        chartContainer.style.display = 'grid';
    }
  
});

// RENDERIZAÇÃO GRÁFICOS
const btnImgGraphs = document.querySelectorAll('.rw-img img')[0];
btnImgGraphs.addEventListener('click', function() {
    renderCharts(rawDataCache);
});

// RENDERIZAÇÃO DA TABELA
const btnImgTable = document.querySelectorAll('.rw-img img')[1];
btnImgTable.addEventListener('click', function() {
    renderTable(rawDataCache);
});

// PREENCHER AS UFS DE ACORDO COM O FILTRO DA REGIONAL
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

// PREENCHER OS INPUTS DE DATA
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

// RECARREGAR A PÁGINA NO CASO DO USO (LIMPAR FILTROS)
const btnClearFilter = document.getElementById('btnClearFilter');
btnClearFilter.addEventListener('click', function() {
    window.location.reload();
});

// PEGAR OS VALORES DO FILTRO E CHAMAR A FUNÇÃO (apiCall) ASYNC
const form = document.getElementById('formFilter');
form.addEventListener('submit', function(e) {
    e.preventDefault(); 

    if (!document.getElementById('slt_regional').value) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor preencher os filtros para a consulta.",
            // footer: 'Telemont',
            customClass: {
                popup: 'swal-small-text'
            }
        });
        return;
    }

    const dataForm = {
        regional: document.getElementById('slt_regional').value,
        uf: document.getElementById('slt_uf').value,
        dtBegin: document.getElementById('iptDtBegin').value,
        dtEnd: document.getElementById('iptDtEnd').value,
        macro_atividade: document.getElementById('slt_macro_atividade').value
    };

    apiCall(dataForm);
});

// VALIDAÇÃO PARA ABRIR OS SELECTS DE UF E MACRO ATIVIDADE
function validarRegionalAntesDeAbrir(selectId) {
    const regional = document.getElementById('slt_regional').value;
    if (!regional) {
        Swal.fire({
            text: "Por favor, selecione uma Regional primeiro.",
            customClass: {
                popup: 'swal-small-text'
            }
        });
        return false; // bloqueia
    }
    return true;
}
['slt_uf', 'slt_macro_atividade'].forEach(id => {
    document.getElementById(id).addEventListener('click', function(e) {
        if (!validarRegionalAntesDeAbrir(id)) {
            e.preventDefault(); // impede abrir o dropdown
        }
    });
});

// CHAMADA DA API E RENDERIZAÇÃO DOS GRÁFICOS E TABELA
let rawDataCache = null; // variável global para armazenar o resultado
async function apiCall(dataForm) {
    try {
        const response = await fetch('public/api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataForm)
        });

        if (!response.ok) throw new Error('Network response was not ok');

        rawDataCache = await response.json();
        // console.log(rawDataCache);

        renderCharts(rawDataCache);

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
preencherDatas();
