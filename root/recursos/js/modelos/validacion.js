function validarNombre(nombre, errores) {

    if(nombre === "") {
        errores.push("El nombre no puede estar vacío.")
    }
    if (nombre.length < 2) {
        errores.push("El nombre es demasiado corto.");
    }
    if (nombre.length > 50) {
        errores.push("El nombre es demasiado largo.");
    }

    const nombreRegex = /^(?=.*[a-zA-ZÁÉÍÓÚáéíóúñÑüÜ])[a-zA-ZÁÉÍÓÚáéíóúñÑüÜ0-9\s'-]+$/

    if(nombreRegex.test(nombre) === false) {
        errores.push("El nombre no es válido.");
    }
}

function validarEmail(email, errores) {
 
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    
    if(emailRegex.test(email) === false) {
        errores.push("El email no es válido.")
    }
}

function validarTelefono(telefono, errores) {
    const telefonoRegex = /^\+?\d[\d\s\-()]{8,14}\d$/

    if(telefonoRegex.test(telefono) === false) {
        errores.push("El teléfono no es válido.")
    }
}

function validarComentario(comentario, errores) {
    if(comentario === "") {
        errores.push("El comentario no puede estar vacío.")
    }

    if (comentario.length < 10) {
        errores.push("El comentario es demasiado corto.");
    }

    const comentarioRegex = /^(?=.*[a-zA-ZÁÉÍÓÚáéíóúñÑüÜ]).+$/

    if(comentarioRegex.test(comentario) === false) {
        errores.push("El comentario no es válido.")
    }
}

function validarCampos(nombre, email, telefono, comentario) {
    const errores = []
    validarNombre(nombre, errores)
    validarEmail(email, errores)
    validarTelefono(telefono, errores)
    validarComentario(comentario, errores)

    return errores
}

function crearMensajeWhatsapp(mensaje, numeroWhatsApp) {

    // 3. Construye el mensaje con los datos (usando \n para saltos de línea)
    // Se usa encodeURIComponent para manejar espacios y caracteres especiales de la URL.
    const mensajeCodificado = encodeURIComponent(mensaje);

    // 4. Crea la URL completa de WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

    // 5. Redirige al usuario a la URL de WhatsApp
    // Usa window.location.href para la misma pestaña, o window.open(urlWhatsApp, '_blank') para una nueva pestaña.
    window.open(urlWhatsApp, '_blank');
    
}


export {mostrarMensajeError, crearMensajeWhatsapp}