import { mostrarMensajeError, renderizarTextosContacto } from "../vistas/renderizado.js";
import { validarCamposFormularioContacto } from "../modelos/validacion.js";
import { crearPlantillaMensajeContacto, crearLinkMensajeWhatsapp } from "../modelos/mensaje.js";
import { obtenerDatos } from "../modelos/datos.js";

// 1. Cargamos los textos desde el JSON y los mandamos a la vista
const textosContacto = await obtenerDatos("./datos/contenido_web/textos_contacto.json");
renderizarTextosContacto(textosContacto);

// 2. Lógica del select automático mediante URL
// Como el script es type="module", se ejecuta de forma diferida automáticamente
const parametrosURL = new URLSearchParams(window.location.search);
const motivo = parametrosURL.get("motivo");
const $selectMotivo = document.getElementById("id-motivo");

// Validamos el parámetro y seleccionamos la opción correspondiente
if ($selectMotivo && motivo) {    
    if (motivo === "bodega") {    
        $selectMotivo.value = "bodega"; 
    } else if (motivo === "mayorista") {
        $selectMotivo.value = "mayorista";
    }
}

// 3. Variables para el formulario de WhatsApp
const $contenedorErrores = document.getElementById("errores");
const $formularioContacto = document.getElementById("formulario-contacto");
const numeroWhatsApp = "5493518519953"; 

// 4. Evento principal de envío del formulario
if ($formularioContacto) {
    $formularioContacto.addEventListener("submit", (evento) => {
        evento.preventDefault();

        // Capturamos los valores
        const nombre = document.getElementById("id-nombre").value.trim();
        const email = document.getElementById("id-email").value.trim();
        const motivoContacto = document.getElementById("id-motivo").value.trim();
        const comentario = document.getElementById("id-comentario").value.trim();

        const datos = { nombre, email, motivoContacto, comentario };

        // Validamos
        const errores = validarCamposFormularioContacto(datos);

        // Mostramos errores si los hay
        mostrarMensajeError($contenedorErrores, errores);

        // Si todo está perfecto, armamos el mensaje y disparamos WhatsApp
        if (errores.length === 0) {
            const textoMensaje = crearPlantillaMensajeContacto(datos);
            const urlWhatsApp = crearLinkMensajeWhatsapp(textoMensaje, numeroWhatsApp);
            window.open(urlWhatsApp, "_blank");
        }
    });
}