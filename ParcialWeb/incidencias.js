// Clave de administrador
document.getElementById('acceso-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const clave = document.getElementById('clave').value;

    if (clave === '12345') {
        document.querySelector('.reporte-incidencias').style.display = 'block';
        document.querySelector('.acceso-reporte').style.display = 'none';
    } else {
        alert('Clave incorrecta. Solo los administradores pueden acceder.');
    }
});

// Mostrar opciones según tipo de reporte
document.getElementById('tipo-reporte').addEventListener('change', function() {
    const tipoReporte = this.value;

    document.getElementById('mantenimiento-opciones').style.display = (tipoReporte === 'mantenimiento') ? 'block' : 'none';
    document.getElementById('retrasos-opciones').style.display = (tipoReporte === 'retrasos') ? 'block' : 'none';
    document.getElementById('seguridad-opciones').style.display = (tipoReporte === 'seguridad') ? 'block' : 'none';
});

// Guardar reporte
document.getElementById('reporte-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const tipoReporte = document.getElementById('tipo-reporte').value;
    let detalles = '';

    if (tipoReporte === 'mantenimiento') {
        const tipoMantenimiento = document.getElementById('tipo-mantenimiento').value;
        const idVuelo = document.getElementById('id-vuelo-mantenimiento').value;
        const comentario = document.getElementById('comentario-mantenimiento').value;
        detalles = `Tipo de Mantenimiento: ${tipoMantenimiento}, ID Vuelo: ${idVuelo}, Comentario: ${comentario}`;
    } else if (tipoReporte === 'retrasos') {
        const idVuelo = document.getElementById('id-vuelo-retraso').value;
        const origen = document.getElementById('origen').value;
        const destino = document.getElementById('destino').value;
        const tiempoRetraso = document.getElementById('tiempo-retraso').value;
        const comentario = document.getElementById('comentario-retraso').value;
        detalles = `ID Vuelo: ${idVuelo}, Origen: ${origen}, Destino: ${destino}, Tiempo de Retraso: ${tiempoRetraso}, Comentario: ${comentario}`;
    } else if (tipoReporte === 'seguridad') {
        const tipoSeguridad = document.getElementById('tipo-seguridad').value;
        const comentario = document.getElementById('comentario-seguridad').value;
        detalles = `Tipo de Incidencia: ${tipoSeguridad}, Comentario: ${comentario}`;
    }

    // Guardar reporte en localStorage
    const reportes = JSON.parse(localStorage.getItem('reportes')) || [];
    reportes.push({ tipoReporte, detalles });
    localStorage.setItem('reportes', JSON.stringify(reportes));

    document.getElementById('mensaje-envio').style.display = 'block';
    setTimeout(() => { document.getElementById('mensaje-envio').style.display = 'none'; }, 3000);

    // Limpiar formulario
    document.getElementById('reporte-form').reset();
});

// Mostrar reportes guardados
document.getElementById('consultar-btn').addEventListener('click', function() {
    const reportes = JSON.parse(localStorage.getItem('reportes')) || [];
    const tbody = document.querySelector('#tabla-reportes tbody');
    tbody.innerHTML = '';

    reportes.forEach((reporte, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reporte.tipoReporte}</td>
            <td>${reporte.detalles}</td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('tabla-reportes').style.display = 'table';
});

// Datos de reportes predefinidos
window.onload = function() {
    const reportesPredefinidos = [
        { tipoReporte: 'mantenimiento', detalles: 'Tipo de Mantenimiento: Revisión de Motor, ID Vuelo: AA1234, Comentario: Necesita cambio de aceite' },
        { tipoReporte: 'retrasos', detalles: 'ID Vuelo: BB5678, Origen: Madrid, Destino: Barcelona, Tiempo de Retraso: 30, Comentario: Retraso por mal clima' },
        { tipoReporte: 'seguridad', detalles: 'Tipo de Incidencia: Objetos Peligrosos, Comentario: Se detectaron objetos no permitidos en el equipaje' }
    ];

    localStorage.setItem('reportes', JSON.stringify(reportesPredefinidos));
};
