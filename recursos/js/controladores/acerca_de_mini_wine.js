import { obtenerDatos } from "../modelos/datos.js";
import { renderizarTextosAcercaDe } from "../vistas/renderizado.js";

// Traemos los datos y los inyectamos
const textosAcercaDe = await obtenerDatos("./datos/contenido_web/textos_acerca_de.json");
renderizarTextosAcercaDe(textosAcercaDe);