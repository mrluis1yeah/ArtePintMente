// ========================================
// FORMULARIO DE CONTACTO DE ARTEPINTMENTE
// ========================================


// 1. Número de WhatsApp de la emprendedora.

const numeroWhatsApp = "573001234567";


// 2. Buscamos el formulario en nuestro HTML.

const formulario = document.getElementById("formularioContacto");


// 3. Detectamos cuando el usuario pulsa el botón Enviar.

formulario.addEventListener("submit", function(event) {

    // Evitamos que la página se recargue.
    event.preventDefault();


    // 4. Obtenemos la información escrita por el usuario.

    const nombre = document.getElementById("nombre").value;

    const correo = document.getElementById("correo").value;

    const mensaje = document.getElementById("mensaje").value;


    // 5. Construimos el mensaje que llegará a WhatsApp.

    const mensajeWhatsApp =
        "¡Hola! Buen día. Me gustaría ponerme en contacto con ArtePintMente.\n\n" +

        "Mi nombre es: " + nombre + "\n" +

        "Mi correo electrónico es: " + correo + "\n\n" +

        "Mi mensaje:\n" + mensaje;


    // 6. Convertimos el mensaje para que pueda viajar por una URL.

    const mensajeCodificado = encodeURIComponent(mensajeWhatsApp);


    // 7. Creamos el enlace de WhatsApp.

    const enlaceWhatsApp =
        "https://wa.me/" + numeroWhatsApp +
        "?text=" + mensajeCodificado;


    // 8. Abrimos WhatsApp con el mensaje preparado.

    window.open(enlaceWhatsApp, "_blank");

});