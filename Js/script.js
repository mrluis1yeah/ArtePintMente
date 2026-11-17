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
            mostrarEstado("Preparando el correo...", "");

            // Se intenta el endpoint del proyecto. Si no está disponible (por ejemplo,
            // al abrir el HTML directamente), se ofrece el correo mediante mailto.
            try {
                const respuesta = await fetch("/api/enviar", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre, correo, mensaje })
                });

                const resultado = await respuesta.json();
                if (!respuesta.ok || !resultado.success) {
                    throw new Error(resultado.message || "No fue posible enviar desde el servidor.");
                }

                mostrarEstado("¡Mensaje enviado! Gracias por contactar a ArtePintMente.", "exito");
                formulario.reset();
            } catch (error) {
                const asunto = encodeURIComponent("Consulta desde ArtePintMente");
                const cuerpo = encodeURIComponent(`Nombre: ${nombre}\nCorreo: ${correo}\n\n${mensaje}`);
                window.location.href = `mailto:${correoDestino}?subject=${asunto}&body=${cuerpo}`;
                mostrarEstado("Se abrió tu aplicación de correo con el mensaje preparado. Solo falta enviarlo.", "exito");
            } finally {
                boton.disabled = false;
            }
        }
    });
});
