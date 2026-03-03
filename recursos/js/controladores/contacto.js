// 1. Importaciones (Ajustá las rutas según la ubicación de tus carpetas)
import { crearPlantillaMensajeContacto, crearLinkMensajeWhatsapp } from "../modelos/mensaje.js";
import { validarCamposFormularioContacto } from "../modelos/validacion.js"; 
// Importá también las funciones que me pasaste antes para mostrar/ocultar errores visuales
import { mostrarMensajeError, ocultarMensajeError } from "../vistas/renderizado.js";
// ... (Acá va tu código del DOMContentLoaded para el autocompletado del select) ...

const $formularioContacto = document.getElementById("formulario-contacto");
const $contenedorErrores = document.getElementById("errores"); // Capturamos el <p id="errores"> de tu HTML

if ($formularioContacto && $contenedorErrores) {
    
    $formularioContacto.addEventListener("submit", (evento) => {
        evento.preventDefault(); 

        const datosFormulario = new FormData($formularioContacto);

        // Armamos el objeto de datos
        const datosParaPlantilla = {
            nombre: datosFormulario.get("nombre"),
            email: datosFormulario.get("email"),
            motivoContacto: datosFormulario.get("motivo"),
            comentario: datosFormulario.get("comentario")
        };

        // 2. EL SEMÁFORO: Ejecutamos TU validación antes de hacer cualquier otra cosa
        const errores = validarCamposFormularioContacto(datosParaPlantilla);

        // 3. Verificamos la longitud del arreglo
        if (errores.length > 0) {
            // LUZ ROJA: Hay errores. Usamos tu función para inyectarlos en el HTML
            mostrarMensajeError($contenedorErrores, errores);
            
            // Este 'return' es vital. Corta la función acá mismo e impide que el código siga bajando.
            return; 
        }

        // LUZ VERDE: Si llegamos a esta línea, errores.length es 0. 
        // Ocultamos el mensaje de error por si había quedado alguno en pantalla de un intento anterior
        ocultarMensajeError($contenedorErrores);

        // Flujo normal de envío
        const mensajeTexto = crearPlantillaMensajeContacto(datosParaPlantilla);
        const numeroWhatsApp = "5493518519953"; // El número real
        const urlFinal = crearLinkMensajeWhatsapp(mensajeTexto, numeroWhatsApp);

        window.open(urlFinal, "_blank");
    });
}