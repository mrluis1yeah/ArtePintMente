// =====================================================
// CONTACTO DE ARTEPINTMENTE
// Los formularios permiten elegir WhatsApp o correo.
// WhatsApp abre el chat con el mensaje redactado.
// El correo usa /api/enviar cuando el proyecto está desplegado
// en un servidor que tenga esa ruta configurada.
// =====================================================

const numeroWhatsApp = "573227919305";
const correoDestino = "artepintmente@gmail.com";

document.querySelectorAll("form.formulario").forEach((formulario) => {
    const estado = formulario.querySelector(".estado");
    if (!estado) return;

    const mostrarEstado = (texto, tipo = "") => {
        estado.textContent = texto;
        estado.className = `estado ${tipo}`.trim();
    };

    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        const boton = evento.submitter;
        if (!boton || !boton.dataset.canal) return;

        const datos = new FormData(formulario);
        const nombre = String(datos.get("nombre") || "").trim();
        const correo = String(datos.get("correo") || "").trim();
        const mensaje = String(datos.get("mensaje") || "").trim();

        if (!mensaje) {
            mostrarEstado("Escribe un mensaje antes de continuar.", "error");
            return;
        }

        if (boton.dataset.canal === "whatsapp") {
            const texto = [
                `Hola, ArtePintMente. Soy ${nombre || "una persona interesada"}.`,
                mensaje,
                correo ? `Mi correo de contacto es: ${correo}` : ""
            ].filter(Boolean).join("\n\n");

            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
            window.open(url, "_blank", "noopener,noreferrer");
            mostrarEstado("Se abrió WhatsApp con tu mensaje preparado. Revísalo y pulsa enviar allí.", "exito");
            return;
        }

        if (boton.dataset.canal === "correo") {
            if (!nombre || !correo) {
                mostrarEstado("Completa tu nombre y correo para continuar por este medio.", "error");
                return;
            }

            boton.disabled = true;
            mostrarEstado("Enviando tu mensaje...", "");

            try {
                // Si el servidor no responde (red caída, 15 s sin respuesta) fetch lanza error: lo tratamos como "sin servidor".
                const respuesta = await fetch("/api/enviar", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre, correo, mensaje }),
                    signal: AbortSignal.timeout(15000)
                }).catch(() => null);

                let resultado = null;
                if (respuesta) {
                    try { resultado = await respuesta.json(); } catch { resultado = null; }
                }

                // Caso 1: NO existe la función de correo (archivo abierto directamente, hosting estático:
                // 404/405 o sin respuesta). Solo aquí se ofrece el correo del visitante como alternativa.
                const sinServidor = !respuesta || respuesta.status === 404 || respuesta.status === 405;
                if (sinServidor) {
                    const asunto = encodeURIComponent("Consulta desde ArtePintMente");
                    const cuerpo = encodeURIComponent(`Nombre: ${nombre}\nCorreo: ${correo}\n\n${mensaje}`);
                    window.location.href = `mailto:${correoDestino}?subject=${asunto}&body=${cuerpo}`;
                    mostrarEstado("Esta página no tiene envío automático activo aquí. Se abrió tu aplicación de correo con el mensaje preparado.", "exito");
                    return;
                }

                // Caso 2: el servidor respondió con un error. Se muestra su mensaje real (ya no se oculta con un mailto).
                if (!respuesta.ok || !resultado?.success) {
                    mostrarEstado(resultado?.message || "El servicio de correo no respondió bien. Inténtalo de nuevo o escríbenos por WhatsApp.", "error");
                    return;
                }

                // Caso 3: enviado.
                mostrarEstado("¡Mensaje enviado! Gracias por contactar a ArtePintMente.", "exito");
                formulario.reset();
            } finally {
                boton.disabled = false;
            }
        }
    });
});
