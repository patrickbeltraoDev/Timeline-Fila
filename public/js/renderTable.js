function renderTable(rawData) {
    const container = document.getElementById('chartContainer');
    container.innerHTML = '';

    for (const uf in rawData) {
        const ufData = rawData[uf];

        const wrapper = document.createElement('div');
        wrapper.className = 'table-wrapper';

        const title = document.createElement('h4');
        title.textContent = `${uf}`;
        wrapper.appendChild(title);

        const table = document.createElement('table');
        table.className = 'data-table';

        // Cabeçalho
        const labels = [...new Set(ufData.map(item => item.dia))];
        let thead = '<tr><th>Atividade</th>';
        labels.forEach(dia => { thead += `<th>Dia ${dia}</th>`; });
        thead += '</tr>';
        table.innerHTML = `<thead>${thead}</thead>`;

        // Agrupa dados por atividade
        const atividades = {};
        ufData.forEach(item => {
            if (!atividades[item.macro_atividade]) atividades[item.macro_atividade] = {};
            atividades[item.macro_atividade][item.dia] = item.fila;
        });

        // Linhas
        let tbody = '';
        Object.keys(atividades).forEach(atividade => {
            tbody += `<tr><td>${atividade}</td>`;
            labels.forEach(dia => {
                tbody += `<td>${atividades[atividade][dia] || 0}</td>`;
            });
            tbody += '</tr>';
        });

        table.innerHTML += `<tbody>${tbody}</tbody>`;
        wrapper.appendChild(table);
        container.appendChild(wrapper);
    }
}