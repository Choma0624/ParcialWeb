document.getElementById('reserva-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener los datos del formulario
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let vehiculo = document.getElementById('vehiculo').value;
    let placa = document.getElementById('placa').value;
    let fechaEntrada = document.getElementById('fecha-entrada').value;
    let horaEntrada = document.getElementById('hora-entrada').value;
    let fechaSalida = document.getElementById('fecha-salida').value;
    let horaSalida = document.getElementById('hora-salida').value;

    // Crear un objeto con los datos
    let reserva = {
        nombre,
        apellido,
        vehiculo,
        placa,
        fechaEntrada,
        horaEntrada,
        fechaSalida,
        horaSalida
    };

    // Guardar la reserva en el local storage
    localStorage.setItem('reserva', JSON.stringify(reserva));

    // Mostrar mensaje de reserva exitosa
    document.getElementById('reserva-mensaje').style.display = 'block';

    // Actualizar la tabla con la reserva
    mostrarReserva();
});

// Función para verificar disponibilidad (API ficticia)
function verificarDisponibilidad(fechaEntrada, fechaSalida) {
    // Aquí deberías realizar una solicitud a la API para verificar la disponibilidad en tiempo real
    return true;
}

// Función para mostrar la reserva almacenada en el local storage
function mostrarReserva() {
    let reserva = JSON.parse(localStorage.getItem('reserva'));

    if (reserva) {
        let tabla = document.getElementById('tabla-reservas').getElementsByTagName('tbody')[0];

        // Limpiar cualquier fila existente
        tabla.innerHTML = '';

        // Insertar nueva fila con los datos de la reserva
        let fila = tabla.insertRow();
        fila.insertCell(0).textContent = reserva.nombre;
        fila.insertCell(1).textContent = reserva.apellido;
        fila.insertCell(2).textContent = reserva.vehiculo;
        fila.insertCell(3).textContent = reserva.placa;
        fila.insertCell(4).textContent = reserva.fechaEntrada;
        fila.insertCell(5).textContent = reserva.horaEntrada;
        fila.insertCell(6).textContent = reserva.fechaSalida;
        fila.insertCell(7).textContent = reserva.horaSalida;
    }
}

// Mostrar los datos de la reserva al cargar la página
window.onload = function() {
    mostrarReserva();
};
