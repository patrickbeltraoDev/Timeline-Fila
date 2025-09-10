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
        let thead = '<tr><th>Atividade</th><th>Tipo</th>';
        labels.forEach(dia => {
            thead += `<th>Dia ${dia}</th>`;
        });
        thead += '</tr>';
        table.innerHTML = `<thead>${thead}</thead>`;

        // Agrupar dados
        const atividades = {};
        ufData.forEach(item => {
            if (!atividades[item.macro_atividade]) atividades[item.macro_atividade] = {};
            atividades[item.macro_atividade][item.dia] = {
                fila: item.fila,
                caixa_total: item.caixa_total
            };
        });

        // Linhas do corpo
        let tbody = '';
        Object.keys(atividades).forEach(atividade => {
            // Linha Fila
            tbody += `<tr class="col-fila"><td rowspan="2">${atividade}</td><td>Fila</td>`;
            labels.forEach(dia => {
                const dados = atividades[atividade][dia] || { fila: 0, caixa_total: 0 };
                tbody += `<td>${dados.fila}</td>`;
            });
            tbody += '</tr>';

            // Linha Caixa Total
            tbody += `<tr><td>Caixa Total</td>`;
            labels.forEach(dia => {
                const dados = atividades[atividade][dia] || { fila: 0, caixa_total: 0 };
                tbody += `<td>${dados.caixa_total}</td>`;
            });
            tbody += '</tr>';
        });

        table.innerHTML += `<tbody>${tbody}</tbody>`;
        wrapper.appendChild(table);
        container.appendChild(wrapper);
    }
}

