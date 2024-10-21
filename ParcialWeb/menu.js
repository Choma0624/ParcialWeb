document.getElementById('flight-search-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const origen = document.getElementById('origen').value;
    const destino = document.getElementById('destino').value;
    const fecha = document.getElementById('fecha').value;
    const estado = document.getElementById('estado').value;

    // Aquí iría la lógica para integrar un API externo de vuelos
    // Por ahora simulamos con datos de ejemplo

    const resultadosVuelos = [
        { vuelo: 'AV123', origen: 'Bogotá', destino: 'Miami', fecha: '23/10/2024', estado: 'En vuelo' },
        { vuelo: 'AV456', origen: 'Bogotá', destino: 'Madrid', fecha: '23/10/2024', estado: 'Aterrizado' }
    ];

    let resultadosHTML = '<h3>Resultados de búsqueda:</h3>';
    resultadosVuelos.forEach(vuelo => {
        resultadosHTML += `
            <div class="vuelo">
                <p><strong>Vuelo:</strong> ${vuelo.vuelo}</p>
                <p><strong>Origen:</strong> ${vuelo.origen}</p>
                <p><strong>Destino:</strong> ${vuelo.destino}</p>
                <p><strong>Fecha:</strong> ${vuelo.fecha}</p>
                <p><strong>Estado:</strong> ${vuelo.estado}</p>
            </div>
        `;
    });

    document.getElementById('resultados-vuelos').innerHTML = resultadosHTML;
});
