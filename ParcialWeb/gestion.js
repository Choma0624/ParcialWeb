document.getElementById('cargo').addEventListener('change', function() {
    const cargo = document.getElementById('cargo').value;
    const adminAccess = document.getElementById('admin-access');
    
    // Mostrar campo de clave solo si el cargo es "Administrador"
    if (cargo === 'administrador') {
        adminAccess.style.display = 'block';
    } else {
        adminAccess.style.display = 'none';
    }
});

document.getElementById('gestion-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const cedula = document.getElementById('cedula').value;
    const cargo = document.getElementById('cargo').value;
    const claveAdmin = document.getElementById('admin-clave').value;

    // Verificación si es administrador
    if (cargo === 'administrador' && claveAdmin !== '12345') {
        alert('Clave de administrador incorrecta.');
        return;
    }

    // Definir el rol y el horario de trabajo
    let rol = '';
    let horario = '';

    switch (cargo) {
        case 'piloto':
            rol = 'Piloto - Acceso a cabina y operaciones aéreas';
            horario = '06:00 AM - 02:00 PM';
            break;
        case 'personal-de-tierra':
            rol = 'Personal de Tierra - Manejo de equipaje y asistencia en plataforma';
            horario = '07:00 AM - 03:00 PM';
            break;
        case 'seguridad':
            rol = 'Seguridad - Control y vigilancia del aeropuerto';
            horario = '08:00 AM - 04:00 PM';
            break;
        case 'mantenimiento':
            rol = 'Mantenimiento - Inspección y reparación de aeronaves';
            horario = '09:00 AM - 05:00 PM';
            break;
        case 'administrador':
            rol = 'Administrador - Gestión de recursos y personal';
            horario = '08:00 AM - 04:00 PM';
            break;
    }

    // Mostrar mensaje de rol
    document.getElementById('mensaje-rol').innerText = `${nombre} ${apellido} ha iniciado sesión como ${rol}. Horario laboral: ${horario}`;
    document.getElementById('mensaje-rol').style.display = 'block';

    // Guardar en localStorage
    const inicioSesion = { nombre, apellido, cargo, rol, horario };
    let registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push(inicioSesion);
    localStorage.setItem('registros', JSON.stringify(registros));

    // Actualizar la tabla
    mostrarRegistros();

    // Limpiar formulario
    document.getElementById('gestion-form').reset();
    document.getElementById('admin-access').style.display = 'none';
});

function mostrarRegistros() {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    const tabla = document.getElementById('tabla-inicios-sesion').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';

    registros.forEach((registro, index) => {
        const fila = tabla.insertRow();

        fila.insertCell(0).textContent = registro.nombre;
        fila.insertCell(1).textContent = registro.apellido;
        fila.insertCell(2).textContent = registro.cargo;
        fila.insertCell(3).textContent = registro.rol;
        fila.insertCell(4).textContent = registro.horario;

        const accionesCelda = fila.insertCell(5);

        // Si es administrador, agregar botón de eliminar
        if (registro.cargo === 'administrador') {
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.onclick = function() {
                eliminarRegistro(index);
            };
            accionesCelda.appendChild(btnEliminar);
        }
    });
}

function eliminarRegistro(index) {
    let registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.splice(index, 1);
    localStorage.setItem('registros', JSON.stringify(registros));
    mostrarRegistros();
}

// Mostrar los registros guardados al cargar la página
window.onload = mostrarRegistros;
