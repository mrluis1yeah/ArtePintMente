// =====================================================
// FUNCIÓN DEL SERVIDOR (Vercel): envía el formulario por correo con Resend.
//
//  POST /api/enviar  -> envía el correo.   Responde SIEMPRE JSON { success, message }.
//  GET  /api/enviar  -> diagnóstico: abre https://TU-SITIO/api/enviar en el navegador
//                       y te dice qué variable de entorno falta (nunca muestra valores).
//
// Variables de entorno (Vercel > Settings > Environment Variables):
//   RESEND_API_KEY   clave de Resend (empieza por re_)
//   DESTINO_EMAIL    correo donde quieres recibir los mensajes
//   REMITENTE_EMAIL  remitente, p. ej.  ArtePintMente <web@tudominio.com>
//                    (en pruebas: onboarding@resend.dev, que SOLO entrega al correo de tu cuenta Resend)
// =====================================================
import { Resend } from "resend";

const VARIABLES = ["RESEND_API_KEY", "DESTINO_EMAIL", "REMITENTE_EMAIL"];

// Lee una variable limpiando espacios, saltos de línea y comillas pegadas por error.
const leerVariable = (nombre) =>
    String(process.env[nombre] ?? "").trim().replace(/^["']|["']$/g, "").trim();

const faltantes = () => VARIABLES.filter((nombre) => !leerVariable(nombre));

const escaparHTML = (valor = "") =>
    String(valor).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const responder = (res, estado, success, message, extra = {}) =>
    res.status(estado).json({ success, message, ...extra });

// Vercel entrega el cuerpo ya convertido a objeto; por si llegara como texto, se intenta leer.
const leerCuerpo = (cuerpo) => {
    if (cuerpo && typeof cuerpo === "object") return cuerpo;
    try { return JSON.parse(cuerpo); } catch { return {}; }
};

export default async function handler(req, res) {
    try {
        // --- Diagnóstico ---
        if (req.method === "GET") {
            const faltan = faltantes();
            return responder(res, 200, faltan.length === 0,
                faltan.length ? `Faltan variables de entorno: ${faltan.join(", ")}.` : "El envío de correo está configurado.",
                { faltan });
        }

        if (req.method !== "POST") {
            res.setHeader("Allow", "GET, POST");
            return responder(res, 405, false, "Método no permitido.");
        }

        // --- Validación de los datos del visitante ---
        const { nombre, correo, mensaje } = leerCuerpo(req.body);

        if (![nombre, correo, mensaje].every((c) => typeof c === "string" && c.trim())) {
            return responder(res, 400, false, "Completa los campos obligatorios.");
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim()) || nombre.length > 100 || correo.length > 150 || mensaje.length > 3000) {
            return responder(res, 400, false, "Revisa tus datos: el correo o el largo del texto no es válido.");
        }

        // --- Configuración: se comprueba ANTES de crear el cliente (el SDK lanza error si falta la clave) ---
        const faltan = faltantes();
        if (faltan.length) {
            console.error(`[enviar] Faltan variables de entorno: ${faltan.join(", ")}`);
            return responder(res, 500, false, "El correo aún no está configurado. Escríbenos por WhatsApp.");
        }

        const resend = new Resend(leerVariable("RESEND_API_KEY"));
        const nombreLimpio = nombre.replace(/[\r\n]+/g, " ").trim(); // evita inyección de cabeceras en el asunto

        const { data, error } = await resend.emails.send({
            from: leerVariable("REMITENTE_EMAIL"),
            to: [leerVariable("DESTINO_EMAIL")],
            replyTo: correo.trim(),
            subject: `Nuevo mensaje de ${nombreLimpio} · ArtePintMente`,
            html: `
                <h2>Nuevo mensaje desde la web de ArtePintMente</h2>
                <p><strong>Nombre:</strong> ${escaparHTML(nombreLimpio)}</p>
                <p><strong>Correo:</strong> ${escaparHTML(correo.trim())}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${escaparHTML(mensaje).replace(/\n/g, "<br>")}</p>
            `
        });

        // Resend responde { data, error } sin lanzar excepción: el error HAY que mirarlo.
        if (error) {
            // El detalle real (dominio sin verificar, remitente de pruebas, clave inválida…) queda en los logs de Vercel.
            console.error("[enviar] Resend rechazó el envío:", error);
            return responder(res, 502, false, "El servicio de correo rechazó el envío. Inténtalo de nuevo o escríbenos por WhatsApp.");
        }

        console.log("[enviar] Correo enviado:", data?.id);
        return responder(res, 200, true, "Mensaje enviado correctamente.");
    } catch (error) {
        console.error("[enviar] Error inesperado:", error);
        return responder(res, 500, false, "No se pudo enviar el correo. Inténtalo de nuevo o escríbenos por WhatsApp.");
    }
}
