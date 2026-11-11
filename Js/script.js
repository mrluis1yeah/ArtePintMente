// ========================================
// CONTACTO DE ARTEPINTMENTE (index y galería)
// Cualquier <form class="formulario"> con campos nombre, correo y mensaje
// y dos botones [data-canal="whatsapp"] / [data-canal="correo"] funciona solo.
// ========================================

// Número de WhatsApp de la emprendedora (con indicativo del país, solo números).
const numeroWhatsApp = "573227919305";

document.querySelectorAll("form.formulario").forEach((formulario) => {
    const estado = formulario.querySelector(".estado");

    const mostrar = (texto, tipo = "") => {
        estado.textContent = texto;
        estado.className = "estado " + tipo;
    };

    // e.submitter es el botón que se pulsó: así sabemos el canal elegido.
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();
        const boton = e.submitter;
        const { nombre, correo, mensaje } = Object.fromEntries(new FormData(formulario));

        // WhatsApp: abre el chat con el mensaje ya escrito.
        if (boton.dataset.canal === "whatsapp") {
            const texto = `¡Hola! Buen día${nombre ? `, soy ${nombre}` : ""}.\n\n${mensaje}${correo ? `\n\nMi correo: ${correo}` : ""}`;
            window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`, "_blank");
            return;
        }

        // Correo: lo envía la función del servidor /api/enviar.
        boton.disabled = true;
        mostrar("Enviando tu mensaje...", "info");

        const respuesta = await fetch("/api/enviar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, correo, mensaje })
        }).then((r) => r.json()).catch(() => null);

        const enviado = respuesta?.success;
        mostrar(
            enviado ? "¡Listo! Recibimos tu mensaje y te responderemos pronto."
                    : respuesta?.message || "No pudimos enviarlo. Inténtalo de nuevo o escríbenos por WhatsApp.",
            enviado ? "exito" : "error"
        );
        if (enviado) formulario.reset();
        boton.disabled = false;
    });
});
