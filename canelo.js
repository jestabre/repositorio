/*Bienvenida al portal */
function nombreCliente() {
  let nombre = prompt("Bienvenido a Alimentos Canelo. Para una mejor organización de la venta de nuestros productos, indiquenos su nombre y apellido por favor");
  alert("Le damos la bienvenida a nuestro portal, " + nombre);
  console.log("Le damos la bienvenida a nuestro portal, " + nombre)
}
for (let i = 0; i < 1; i++) {
  nombreCliente();
}

/* Luego de aplicar el nombre del usuario, el simulador continuará con la siguiente pregunta */
let producto = prompt("¿Desea comprar alimento para perro o para gato?");

/* declaración de las variables*/
const NO_PRODUCTO = "";
const PRODUCTO_P = "PERRO";
const PRODUCTO_G = "GATO";

/* Si el usuario pulsa "aceptar" sin colocar ningun dato, se aplicará este metodo" */
while (producto == NO_PRODUCTO) {
  alert("Debe ingresar un producto");
  console.log("El usuario debe ingresar perro o gato");
  producto = prompt("¿Desea comprar alimento para perro o para gato?");
}
/* A partir de aquí, comienza a aplicarse el proceso de compra por el usuario" */
if (producto.toUpperCase() == PRODUCTO_P) {
  alert("Usted desea comprar alimento para perro");
  console.log("El usuario desea comprar alimento para " + producto);
}
else if (producto.toUpperCase() == PRODUCTO_G) {
  alert("Usted desea comprar alimento para gato");
  console.log("El usuario desea comprar alimento para " + producto);
}
/* Si el usuario aplica otro animal que no sea el consultado, se aplicará este metodo */
else {
  alert("debe ingresar perro o gato");

}
/* Establecemos una clase para identificar nuestros productos */
class Marca {
  constructor(nombre, precio) {
    this.nombre = nombre.toUpperCase();
    this.precio = precio;
  }
  toString = function () {
    return this.nombre + " por 10 kg al precio de $" + this.precio.toFixed(1);
  };
}
/* Se definen la cantidad de productos que tendrá nuestro simulador */
const misMarcas = [
  new Marca("Purina", 4000),
  new Marca("Royal Canin", 4750),
  new Marca("Old Prince", 3450),
  new Marca("Optimum", 5200),
  new Marca("Infinity", 4500)
];

let respuestaUsuario = "";
let suma = 0;
let subtotal = 0;
/* El usuario debe colocar el producto por el cual está interesado */
do {
  let productoAlimento = prompt(
    "En Alimentos Canelo ofrecemos marcas tales como Purina, Royal Canin, Old Price, Optimum y Infinity, ¿en cual se encuentra interesado/a?"
  );
  let productoABuscar = misMarcas.find(
    (marcasUno) => marcasUno.nombre === productoAlimento.toUpperCase()
  );

  if (productoABuscar !== undefined) {
    /* Si el resultado es correcto, a traves de un alert se indicará el producto seleccionado y su precio */
    alert("Ofrecemos el bolson de " + productoABuscar.toString());
    console.log("los datos del producto seleccionado por el usuario son", productoABuscar);
    /* Se crea la variable "subtotal", la cual nos permitirá sumar los productos que el usuario decida seleccionar para su compra */
    subtotal += productoABuscar.precio;
  } else {
    /* Caso que sea incorrecto, se le indicará al usuario que coloque un producto valido */
    alert(
      "No encontramos ningun bolson en nuestro catalogo con el siguiente nombre: " +
      productoAlimento +
      ". Ingrese otro por favor"
    ); 
    console.log("El usuario ingresó un nombre erroneo");
  }
  /* Una vez que el producto se seleccione como correcto, el simulador nos indicará si queremos sumar otro producto. Si se confirma, volverá a consultar que producto está interesado */
  respuestaUsuario = prompt(
    "¿Desea agregar otro producto a su compra? Escriba Si o No"
  );
  /* Si se niega, nos dará el resultado final de los productos que seleccionó el cliente */
} while (respuestaUsuario.toUpperCase() !== "NO");

/* Se aplica la suma y el subtotal. Una vez sumado, el resultado será visualizado en la consola */
suma += subtotal;

console.log("La suma de los productos seleccionados por el usuario da un total de ", subtotal);