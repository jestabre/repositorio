const formulario = document.getElementById('formulario');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const emailInput = document.getElementById('email');
const telefonoInput = document.getElementById('telefono');
const transferenciaCheckbox = document.getElementById('transferencia');
const terminosCheckbox = document.getElementById('terminos');

let transferenciaSeleccionada = false;
let terminosSeleccionados = false;

formulario.addEventListener('submit', function (event) {
  event.preventDefault();

  const nombre = nombreInput.value;
  const apellido = apellidoInput.value;
  const email = emailInput.value;
  const telefono = telefonoInput.value;

  if (transferenciaCheckbox.checked) {
    transferenciaSeleccionada = true;
  }

  if (terminosCheckbox.checked) {
    terminosSeleccionados = true;
  }

  const datos = {
    nombre,
    apellido,
    email,
    telefono,
    transferencia: transferenciaSeleccionada,
    terminos: terminosSeleccionados,
  };
  localStorage.setItem('datos', JSON.stringify(datos));

  nombreInput.value = '';
  apellidoInput.value = '';
  emailInput.value = '';
  telefonoInput.value = '';

  if (transferenciaSeleccionada) {
    transferenciaCheckbox.checked = false;
    transferenciaSeleccionada = false;
  }

  if (terminosSeleccionados) {
    terminosCheckbox.checked = false;
    terminosSeleccionados = false;
  }

  Swal.fire({
    icon: 'success',
    title: '¡Compra finalizada!',
    text: 'Su pedido ha sido cargado correctamente',
  });
});

window.addEventListener('DOMContentLoaded', function () {
  const datosString = localStorage.getItem('datos');

  if (datosString) {
    const datos = JSON.parse(datosString);
    nombreInput.value = datos.nombre;
    apellidoInput.value = datos.apellido;
    emailInput.value = datos.email;
    telefonoInput.value = datos.telefono;
    transferenciaSeleccionada = datos.transferencia;
    terminosSeleccionados = datos.terminos;

    if (transferenciaSeleccionada) {
      transferenciaCheckbox.checked = true;
    }

    if (terminosSeleccionados) {
      terminosCheckbox.checked = true;
    }
  }
});

window.onload = function () {
  localStorage.removeItem('datos');
  formulario.reset();
  transferenciaSeleccionada = false;
  terminosSeleccionados = false;
  transferenciaCheckbox.checked = false;
  terminosCheckbox.checked = false;
};