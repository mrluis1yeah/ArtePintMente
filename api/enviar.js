// Función del servidor (Vercel): recibe el mensaje del formulario y lo envía por correo con Resend.
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const escaparHTML = (valor = "") =>
  String(valor).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const responder = (res, estado, success, message) => res.status(estado).json({ success, message });

export default async function handler(req, res) {
  if (req.method !== "POST") return responder(res, 405, false, "Método no permitido.");

  const { nombre, correo, mensaje } = req.body || {};
  const { DESTINO_EMAIL, REMITENTE_EMAIL, RESEND_API_KEY } = process.env;

  if (![nombre, correo, mensaje].every((c) => typeof c === "string" && c.trim())) {
    return responder(res, 400, false, "Completa los campos obligatorios.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) || nombre.length > 100 || correo.length > 150 || mensaje.length > 3000) {
    return responder(res, 400, false, "Revisa tus datos: el correo o el largo del texto no es válido.");
  }

  if (!RESEND_API_KEY || !DESTINO_EMAIL || !REMITENTE_EMAIL) {
    console.error("Falta configurar las variables de correo.");
    return responder(res, 500, false, "El correo aún no está configurado. Escríbenos por WhatsApp.");
  }

  try {
    const { error } = await resend.emails.send({
      from: REMITENTE_EMAIL,
      to: [DESTINO_EMAIL],
      replyTo: correo,
      subject: `Nuevo mensaje de ${nombre} · ArtePintMente`,
      html: `
        <h2>Nuevo mensaje desde la web de ArtePintMente</h2>
        <p><strong>Nombre:</strong> ${escaparHTML(nombre)}</p>
        <p><strong>Correo:</strong> ${escaparHTML(correo)}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escaparHTML(mensaje).replace(/\n/g, "<br>")}</p>
      `
    });

    if (error) throw error;
    return responder(res, 200, true, "Mensaje enviado correctamente.");
  } catch (error) {
    console.error("Error de Resend:", error);
    return responder(res, 500, false, "No se pudo enviar el correo. Inténtalo de nuevo o escríbenos por WhatsApp.");
  }
}
