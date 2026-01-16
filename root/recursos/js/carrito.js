// ==================================================================
// 1. ESTADO Y ALMACENAMIENTO
// ==================================================================

// Intentamos cargar desde localStorage, si no hay nada, iniciamos con un array vacío.
let carrito = JSON.parse(localStorage.getItem('carritoCompras')) || [];

// Función para guardar el estado actual en localStorage
function guardarCarrito() {
    localStorage.setItem('carritoCompras', JSON.stringify(carrito));
}


// ==================================================================
// 2. SELECCIÓN DE ELEMENTOS DEL DOM
// ==================================================================
// Seleccionamos los elementos una sola vez al cargar el script

// Elementos generales del carrito
const dialogCarrito = document.querySelector('.carrito');
const btnAbrirCarrito = document.querySelector('.btn-flotante-carrito');
// NOTA: Asegúrate que en tu HTML el botón del header tenga esta clase:
const btnCerrarCarrito = document.querySelector('.carrito__boton-cerrar');

// Elementos internos del carrito para renderizar
const contenedorProductos = document.querySelector('.carrito__productos');
const spanCantidadTotal = document.querySelector('.carrito__titulo span');
const spanPrecioTotal = document.querySelector('.carrito__total span');
const contadorFlotante = document.querySelector('.carrito-contador');


// ==================================================================
// 3. FUNCIONES LÓGICAS DEL CARRITO
// ==================================================================

// Función principal para agregar un producto
function agregarAlCarrito(productoNuevo) {
    // Comprobar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === productoNuevo.id);

    if (productoExistente) {
        // Si ya existe, aumentamos su cantidad
        productoExistente.cantidad++;
    } else {
        // Si no existe, lo añadimos con cantidad 1
        // Asegúrate de que productoNuevo tenga propiedades como id, nombre, precio, imagen.
        carrito.push({ ...productoNuevo, cantidad: 1 });
    }

    // Después de modificar el estado, actualizamos la vista y guardamos
    renderizarCarrito();
    guardarCarrito();
}

// Función para dibujar el carrito en el HTML
function renderizarCarrito() {
    // 1. Limpiar el contenedor previo
    contenedorProductos.innerHTML = '';

    // 2. Variables para totales
    let cantidadTotal = 0;
    let precioTotal = 0;

    // 3. Recorrer el carrito y crear los elementos HTML
    carrito.forEach(producto => {
        cantidadTotal += producto.cantidad;
        precioTotal += producto.precio * producto.cantidad;

        // Crear la estructura de la tarjeta
        const article = document.createElement('article');
        article.classList.add('carrito-tarjeta');

        // Usar template literals para el contenido HTML
        // NOTA: Asegúrate que tus objetos producto tengan .imagen, .nombre y .precio
        article.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-tarjeta__imagen">
            <div class="carrito-tarjeta__info">
                <h3 class="carrito-tarjeta__titulo">${producto.nombre}</h3>
                <p class="carrito-tarjeta__precio">$${producto.precio}</p>
            </div>
            <div class="carrito-tarjeta__cantidad">
                <button class="carrito-tarjeta__boton-cantidad" data-accion="restar" data-id="${producto.id}">-</button>
                <span class="carrito-tarjeta__cantidad-valor">${producto.cantidad}</span>
                <button class="carrito-tarjeta__boton-cantidad" data-accion="sumar" data-id="${producto.id}">+</button>
            </div>
            <button class="carrito-tarjeta__boton-eliminar" data-id="${producto.id}">Eliminar</button>
        `;

        contenedorProductos.appendChild(article);
    });

    // 4. Actualizar los totales en el DOM (Header y Footer del carrito)
    // Usamos '0' si no hay cantidad, para que no quede vacío
    spanCantidadTotal.textContent = cantidadTotal || '0';
    spanPrecioTotal.textContent = `$${precioTotal.toFixed(2)}`;

    // 5. Actualizar el contador del botón flotante también
    if (contadorFlotante) {
        contadorFlotante.textContent = cantidadTotal || '0';
    }

    // 6. Añadir event listeners a los nuevos botones dinámicos
    agregarListenersProductos();
}

// --- PLACEHOLDER ---
// Esta función es necesaria porque la llamas en renderizarCarrito.
// Aquí deberás programar la lógica para que los botones de "+", "-" y "Eliminar" funcionen.
function agregarListenersProductos() {
    // TODO: Implementar la lógica para los botones dentro de las tarjetas.
    // Por ahora la dejamos vacía para que el código no falle.
    // console.log("Botones renderizados. Falta implementar sus listeners.");
}


// ==================================================================
// 4. FUNCIONES DEL POPUP (DIALOG)
// ==================================================================

function abrirCarrito() {
    if (dialogCarrito) {
        dialogCarrito.showModal();
    }
}

function cerrarCarrito() {
    if (dialogCarrito) {
        dialogCarrito.close();
    }
}


// ==================================================================
// 5. EVENT LISTENERS PRINCIPALES
// ==================================================================

if (btnAbrirCarrito) {
    btnAbrirCarrito.addEventListener('click', abrirCarrito);
}

if (btnCerrarCarrito) {
    btnCerrarCarrito.addEventListener('click', cerrarCarrito);
}

// Opcional: Cerrar al hacer clic fuera del contenido del diálogo (en el backdrop)
if (dialogCarrito) {
    dialogCarrito.addEventListener('click', (event) => {
        // Comprueba si el clic fue en el elemento <dialog> directamente (el fondo)
        if (event.target === dialogCarrito) {
            cerrarCarrito();
        }
    });
}


// ==================================================================
// 6. INICIALIZACIÓN
// ==================================================================
// Renderizamos el carrito al cargar la página por si había datos en localStorage
renderizarCarrito();

// Si usas módulos (type="module"), necesitas exportar la función para que la use catalogo.js
export { agregarAlCarrito };