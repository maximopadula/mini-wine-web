import { obtenerDatos } from "../modelos/datos.js";
import { renderizarCatalogo, renderizarCarrito, llenarSelectMetodoPago, cargarFiltroCatalogo, mostrarCarrito, ocultarCarrito, mostrarMensajeError } from "../vistas/renderizado.js";
import { agregarAlCarrito, eliminarDelCarrito, actualizarCantidad } from "../modelos/carrito.js";

const datos = await obtenerDatos("../../../datos/catalogo.json");
const datosMetodosPago = await obtenerDatos("../../../datos/metodos-pago.json")
const $contenedor = document.getElementById("seccion-productos")
const $filtroPresentacion = document.getElementById("id-presentacion")
const $filtroTipoVino = document.getElementById("id-tipo-vino") 
const $filtroBodega= document.getElementById("id-bodega")

//Carrito
const dialogCarrito = document.querySelector('.carrito');
const btnAbrirCarrito = document.querySelector('.btn-flotante-carrito');
const btnCerrarCarrito = document.querySelector('.carrito__boton-cerrar');
const contenedorProductos = document.querySelector('.carrito__productos');
const spanCantidadTotal = document.querySelector('.carrito__titulo span');
const spanPrecioTotal = document.querySelector('.carrito__total span');
const contadorFlotante = document.querySelector('.carrito-contador');
const $selectMetodoPago = document.getElementById("metodo-pago")

$filtroPresentacion.addEventListener("change", () => {
    controlSelect();
    filtrarProductos();
})

$filtroTipoVino.addEventListener("change", filtrarProductos)
$filtroBodega.addEventListener("change", filtrarProductos)

if (btnAbrirCarrito) {
    btnAbrirCarrito.addEventListener('click', abrirCarrito)
}

if (btnCerrarCarrito) {
    btnCerrarCarrito.addEventListener('click', cerrarCarrito)
}

if (dialogCarrito) {
    dialogCarrito.addEventListener('click', (event) => {
        if (event.target === dialogCarrito) {
            cerrarCarrito()
        }
    })
}

function agregarListenersBotonesCarrito() {
    // 1. Seleccionar todos los botones con la clase específica que pusimos en renderizado.js
    const botonesAgregar = document.querySelectorAll('.boton--agregar-al-carrito');

    botonesAgregar.forEach(boton => {
        // 2. Añadir un listener para el evento 'click' a cada botón
        boton.addEventListener('click', (e) => {
            // 3. Obtener el ID del producto desde el atributo data-id del botón
            const idProducto = e.currentTarget.dataset.id;

            // 4. Buscar el objeto producto completo en nuestro array 'datos'
            // Usamos '==' para comparar por si el ID es número y el dataset es string
            const productoSeleccionado = datos.find(producto => producto.id == idProducto);

            // 5. Si encontramos el producto, llamamos a la función del carrito
            if (productoSeleccionado) {
                agregarAlCarrito(productoSeleccionado);
                console.log(`Producto agregado: ${productoSeleccionado.nombre}`);
                // Opcional: Podrías abrir el carrito aquí si lo deseas
                // import { abrirCarrito } from "./carrito.js";
                // abrirCarrito();
            }
        });
    });
}

// Función para escuchar los botones dentro del carrito
function agregarListenersProductos() {
    // 1. Listeners para CANTIDAD (+ y -)
    const botonesCantidad = document.querySelectorAll('.carrito-tarjeta__boton-cantidad')

    botonesCantidad.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const id = e.target.dataset.id
            const accion = e.target.dataset.accion
            actualizarCantidad(id, accion)
        })
    })

    // 2. Listeners para ELIMINAR
    const botonesEliminar = document.querySelectorAll('.carrito-tarjeta__boton-eliminar')

    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            // Usamos currentTarget por seguridad (igual que en el catálogo)
            const id = e.currentTarget.dataset.id
            eliminarDelCarrito(id)
        })
    })
}

function filtrarProductos() {

    const presentacionElegida = Number($filtroPresentacion.value)
    const tipoVinoElegido = $filtroTipoVino.value
    const bodegaElegida = $filtroBodega.value

    let datosFiltrados = [...datos]

    //packs = -1, individual= 1, todos= 0 
    if(presentacionElegida !== 0) {

        if(presentacionElegida===-1){
            datosFiltrados= datosFiltrados.filter(producto=>producto.presentacion>1
            )
        }
        else{datosFiltrados = datosFiltrados.filter(
            producto => producto.presentacion === presentacionElegida
        )}
    }

    if(tipoVinoElegido !== "todos") {
        datosFiltrados = datosFiltrados.filter(
            producto => producto.tipo === tipoVinoElegido
        )
    }

    if(bodegaElegida!=="todas"){
        datosFiltrados= datosFiltrados.filter(producto=>producto.bodega== bodegaElegida)
    }

    renderizarCatalogo(datosFiltrados, $contenedor)

    agregarListenersBotonesCarrito()
}

function controlSelect() {
    if($filtroPresentacion.value === "-1"){
        $filtroTipoVino.value = "todos"
        $filtroTipoVino.disabled = true

        $filtroBodega.value="todas"
        $filtroBodega.disabled=true
    } else {
        $filtroTipoVino.disabled = false
        $filtroBodega.disabled= false
    }
}

cargarSelectTipoVinos(datos)
cargarSelectBodegas(datos)
filtrarProductos();
llenarSelectMetodoPago(datosMetodosPago)
