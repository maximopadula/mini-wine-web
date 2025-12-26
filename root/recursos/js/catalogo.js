import { obtenerDatos } from "./datos.js";
import { renderizarCatalogo } from "./renderizado.js";

const datos = await obtenerDatos("./datos/catalogo.json");
const $contenedor = document.getElementById("seccion-productos")
const $filtroPresentacion = document.getElementById("id-presentacion")
const $filtroTipoVino = document.getElementById("id-tipo-vino") 

$filtroPresentacion.addEventListener("change", () => {
    controlSelect();
    filtrarProductos();
})
$filtroTipoVino.addEventListener("change", filtrarProductos)

function filtrarProductos() {

    const presentacionElegida = Number($filtroPresentacion.value)
    const tipoVinoElegido = $filtroTipoVino.value

    let datosFiltrados = [...datos]

    if(presentacionElegida !== 0) {
        datosFiltrados = datosFiltrados.filter(
            producto => producto.presentacion === presentacionElegida
        )
    }

    if(tipoVinoElegido !== "todos") {
        datosFiltrados = datosFiltrados.filter(
            producto => producto.tipo === tipoVinoElegido
        )
    }

    renderizarCatalogo(datosFiltrados, $contenedor)
}

function controlSelect() {
    if($filtroPresentacion.value === "2" || $filtroPresentacion.value === "4") {
        $filtroTipoVino.value = "todos"
        $filtroTipoVino.disabled = true
    } else {
        $filtroTipoVino.disabled = false
    }
}

filtrarProductos();
