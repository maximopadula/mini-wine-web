import {mostrarMensajeError, crearMensajeWhatsapp} from "./validacion.js";

const $contenedorErrores = document.getElementById("formulario__errores")
const $formularioSumaTuBodega = document.getElementById("formulario-suma-tu-bodega")
const numeroWhatsApp = '5493518519953'; 

$formularioSumaTuBodega.addEventListener("submit", (evento) => {
    const $nombre = document.getElementById('id-nombre').value.trim();
    const $email = document.getElementById('id-email').value.trim();
    const $telefono = document.getElementById('id-telefono').value.trim();
    const $comentario = document.getElementById('id-comentario').value.trim();

    const mensajeSumaTuBodega = `Mensaje proveniente de *Sumá tu bodega*:

    *•Nombre de la bodega*: ${$nombre}

    *•Email*: ${$email}

    *•Teléfono*: ${$telefono}

    *•Comentario*: 
    ${$comentario}
    `
    evento.preventDefault()

    const errores = mostrarMensajeError($contenedorErrores, $nombre, $email, $telefono, $comentario)

    if(errores === 0) {
        crearMensajeWhatsapp(mensajeSumaTuBodega, numeroWhatsApp)
    }
})