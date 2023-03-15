/* inventario de almacen el cual pide nombre, precio, año, cantidad y estado del producto a ingresar, este
se pueden aumentar, disminuir y calcular el precio total ademas de mostrarlo por consola
tambien al presionar esc se puede ver en la pagina pero no se puede ver ya que se autorefresa y no pude
poner la funcion default para evitar que la pagina se autorefresque */ 
let inventario;

class Producto {
  constructor(nombre, precioProducto, anio, cantidad, estado) {
    this.nombre = nombre;
    this.precioProducto = precioProducto;
    this.anio = anio;
    this.cantidad = cantidad;
    this.estado = estado;
  }

  aumentarCantidad = (cantidad) => (this.cantidad += cantidad);
  disminuirCantidad = (cantidad) => (this.cantidad -= cantidad);
  precioTotal = (precioProducto, cantidad) => this.precioProducto * cantidad;
}

// obtener datos del objeto
function obtenerDatos() {
  let nombre = prompt("Ingresa el nombre del producto");
  let precioProducto = parseFloat(prompt("Ingresa el precio de los productos"));
  let cantidad = parseInt(prompt("Ingresa la cantidad de los productos"));
  let anio = parseInt(prompt("Ingresa el año del producto"));
  let estado = prompt("Ingresa el estado, si es nuevo o usado").toLowerCase();
  nuevoUsado(estado);
  const objetoProducto = new Producto(
    nombre,
    precioProducto,
    anio,
    cantidad,
    estado
  );

  return objetoProducto;
}
// asigna el valor de true o false a el estado del producto
function nuevoUsado(estado) {
  if (estado == "nuevo") {
    estado = true;
  } else if (estado == "usado") {
    estado = false;
  } else {
    alert("Recuerde escribir nuevo o usado en el estad del producto");
  }
}

function convertirObjetoEnTexto(objeto) {
  let texto = "";
  for (const clave in objeto) {
    if (typeof objeto[clave] != "function") {
      texto += clave + " : " + objeto[clave] + "\n";
    }
  }
  return texto;
}
// agrega al html el producto y sus caracteristicas, para poderlo observar se debe de presionar esc
class Interfaz {
  agregarProducto(inventario) {
    const listadoDeProductos = document.getElementById("listaProductos");
    const elementos = document.createElement("div");
    elementos.innerHTML = `
    <div class="card text-center mb-4">
        <div class="card-body">
            <b> Nombre Producto </b>: ${inventario.nombre}
            <b> Precio </b>: ${inventario.precioProducto}
            <b> Cantidad </b>: ${inventario.cantidad}
            <b> Año </b>: ${inventario.anio}
            <b> Estado </b>: ${inventario.estado}
        </div>
     </div>
    
    `;
    listadoDeProductos.appendChild(elementos);
    

  }
}
function mostrarMenu() {
  const opcion = prompt(
    "Seleccione una opción del 1 al 5 (esc para salir y ver el registro)\n1. Agregar datos del producto \n2. Aumentar cantidad\n3. Disminuir cantidad \n4. Mostrar información del producto \n5 valor de todos los productos"
  );
  return opcion;
}
// del menu anterior se asigna la accion dependiendo de los casos
function seleccionarOpcion() {
  let menu = mostrarMenu();
  while (menu.toLowerCase() !== "esc") {
    if (menu != "") {
      menu = parseInt(menu);

      switch (menu) {
        case 1:
          inventario = obtenerDatos();
          break;
        case 2:
          const productoAumentar = parseInt(
            prompt("Indique cuantas unidaes va a agregar")
          );
          inventario.aumentarCantidad(productoAumentar);
          break;

        case 3:
          const productoDisminuir = parseInt(
            prompt("Indique cuantas unidaes va a quitar")
          );
          if (productoDisminuir >= inventario.cantidad) {
            alert(
              "la cantidad a disminuir supera el stock del producto por favor verificar"
            );
          } else if (productoDisminuir <= inventario.cantidad) {
            inventario.disminuirCantidad(productoDisminuir);
          }
          break;
        case 4:
          const objeto_texto = convertirObjetoEnTexto(inventario);
          alert(objeto_texto);

          // esto agrega el objeto a HTML se debe presionar esc para que se vea
          const interfaz = new Interfaz();
          interfaz.agregarProducto(inventario);

          break;
        default:
          alert("escoge una opción valida");
          break;
        case 5:
          let precioDeProductos = inventario.precioTotal(
            inventario.precioDeProductos,
            inventario.cantidad
          );
          alert("El precio de todo este strock es de: " + precioDeProductos);
          break;
      }
    } else {
      alert("ingreso una opción incorrecta");
    }
    menu = mostrarMenu();
  }
}
function event(){
    preventDefault()
  }
  
function main() {

  inventario = obtenerDatos();
  seleccionarOpcion();
  
}
main();
