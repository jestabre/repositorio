/*Bienvenida al portal */
function nombreCliente() {
    let nombre = prompt("Bienvenido a Alimentos Canelo. Para una mejor organización de la venta de nuestros productos, indiquenos su nombre y apellido por favor");
    alert("Le damos la bienvenida a nuestro portal, " + nombre);
    console.log ("Le damos la bienvenida a nuestro portal, " + nombre)
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