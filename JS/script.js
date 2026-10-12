/* =========================================================
   Artepintmente — funciones de la página
   Para añadir obras, edita el listado "obras" más abajo.
   ========================================================= */

// 1. DATOS DE LAS OBRAS
// Guarda las fotos dentro de la carpeta "imagenes" y escribe aquí su ruta.
// Puedes copiar un objeto completo y cambiar sus datos para añadir otra obra.
// Si todavía no tienes fotos, se mostrarán imágenes de ejemplo de respaldo.
const obras = [
  {
    id: 1,
    titulo: "Mirada en grafito",
    imagen: "imagenes/obra1.jpg",
    tecnica: "Grafito",
    categoria: "Grafito",
    descripcion: "Retrato elaborado con grafito, prestando atención a las sombras, las proporciones y los pequeños detalles.",
    precio: null
  },
  {
    id: 2,
    titulo: "Retrato en carboncillo",
    imagen: "imagenes/obra2.jpg",
    tecnica: "Carboncillo",
    categoria: "Grafito",
    descripcion: "Una composición de alto contraste donde la luz y la sombra dan fuerza a la expresión.",
    precio: null
  },
  {
    id: 3,
    titulo: "Paisaje de memoria",
    imagen: "imagenes/obra3.jpg",
    tecnica: "Acuarela / color",
    categoria: "Pintura",
    descripcion: "Paisaje inspirado en los colores de la naturaleza y en los lugares que dejan huella.",
    precio: null
  },
  {
    id: 4,
    titulo: "Sueño en terracota",
    imagen: "imagenes/obra4.jpg",
    tecnica: "Lápiz de color",
    categoria: "Color",
    descripcion: "Estudio de color cálido que explora la expresión y la atmósfera de una escena.",
    precio: null
  },
  {
    id: 5,
    titulo: "Ventana al color",
    imagen: "imagenes/obra5.jpg",
    tecnica: "Técnica mixta",
    categoria: "Color",
    descripcion: "Una pieza de color intenso creada para destacar como punto focal de un espacio.",
    precio: null
  },
  {
    id: 6,
    titulo: "Retrato por encargo",
    imagen: "imagenes/obra-personalizada.jpg",
    tecnica: "Personalizada",
    categoria: "Personalizadas",
    descripcion: "Un ejemplo de cómo una fotografía o una idea puede convertirse en una obra personal.",
    precio: null
  }
];

// Sustituye este número de ejemplo por el número real de WhatsApp, con indicativo de país
// y solo dígitos. Ejemplo Colombia: 573001234567.
const NUMERO_WHATSAPP = "57300579359";

// Imágenes alternativas para que el diseño no se rompa si aún no has agregado tus fotos.
const imagenesRespaldo = [
  "https://placehold.co/700x800/E9DDCA/3B2922?text=Obra+de+arte",
  "https://placehold.co/700x800/D6BFA8/3B2922?text=Retrato",
  "https://placehold.co/700x800/F0E5D8/3B2922?text=Pintura"
];

const rejillaObras = document.querySelector("#rejilla-obras");
const campoBusqueda = document.querySelector("#busqueda-obras");
const filtros = document.querySelector("#filtros-categorias");
const sinResultados = document.querySelector("#sin-resultados");
const modal = document.querySelector("#modal-obra");
const modalContenido = document.querySelector("#modal-contenido");
const cerrarModal = document.querySelector("#cerrar-modal");
let categoriaActual = "Todas";

// Escapa texto antes de insertarlo en HTML para evitar que el contenido se interprete como etiquetas.
function escaparHTML(texto) {
  return String(texto ?? "").replace(/[&<>"']/g, caracter => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[caracter]);
}

function rutaImagen(obra) {
  return escaparHTML(obra.imagen);
}

function formatoPrecio(precio) {
  if (precio === null || precio === undefined || precio === "") return "Consultar precio";
  return new Intl.NumberFormat("es-CO", {
    style: "currency", currency: "COP", maximumFractionDigits: 0
  }).format(precio);
}

// Crea una tarjeta con los mismos estilos para cada obra del listado.
function crearTarjetaObra(obra, indice) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta-obra";
  tarjeta.innerHTML = `
    <button class="imagen-obra" type="button" data-abrir-obra="${obra.id}"
      aria-label="Ver detalles de ${escaparHTML(obra.titulo)}">
      <img src="${rutaImagen(obra)}"
        alt="${escaparHTML(obra.titulo)}"
        loading="lazy"
        onerror="this.onerror=null;this.src='${imagenesRespaldo[indice % imagenesRespaldo.length]}';">
    </button>
    <div class="obra-info">
      <div class="obra-meta"><span>${escaparHTML(obra.tecnica)}</span><span>${escaparHTML(obra.categoria)}</span></div>
      <h3>${escaparHTML(obra.titulo)}</h3>
      <p>${escaparHTML(obra.descripcion)}</p>
      <button class="boton-detalle" type="button" data-abrir-obra="${obra.id}">Ver detalles →</button>
    </div>`;
  return tarjeta;
}

function mostrarObras() {
  const busqueda = (campoBusqueda?.value || "").trim().toLocaleLowerCase("es");
  const obrasFiltradas = obras.filter(obra => {
    const coincideCategoria = categoriaActual === "Todas" || obra.categoria === categoriaActual;
    const texto = `${obra.titulo} ${obra.tecnica} ${obra.categoria} ${obra.descripcion}`.toLocaleLowerCase("es");
    return coincideCategoria && texto.includes(busqueda);
  });

  rejillaObras.replaceChildren();
  obrasFiltradas.forEach((obra, indice) => rejillaObras.appendChild(crearTarjetaObra(obra, indice)));
  sinResultados.hidden = obrasFiltradas.length > 0;
}

function abrirDetalles(id) {
  const obra = obras.find(elemento => elemento.id === Number(id));
  if (!obra) return;

  modalContenido.innerHTML = `
    <img src="${rutaImagen(obra)}" alt="${escaparHTML(obra.titulo)}"
      onerror="this.onerror=null;this.src='${imagenesRespaldo[0]}';">
    <div>
      <p class="sobrelinea">${escaparHTML(obra.tecnica)}</p>
      <h2 id="modal-titulo">${escaparHTML(obra.titulo)}</h2>
      <p>${escaparHTML(obra.descripcion)}</p>
      <p class="modal-precio">${escaparHTML(formatoPrecio(obra.precio))}</p>
      <a class="boton boton-principal" href="${crearEnlaceWhatsApp(`Hola, quisiera consultar por la obra '${obra.titulo}' (${obra.tecnica}).`)}" target="_blank" rel="noopener noreferrer">Consultar por WhatsApp →</a>
    </div>`;
  if (typeof modal.showModal === "function") modal.showModal();
  else modal.setAttribute("open", "");
}

function crearEnlaceWhatsApp(mensaje) {
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

// Filtros: al pulsar una categoría, actualiza el estado visual y la galería.
filtros.addEventListener("click", evento => {
  const boton = evento.target.closest("button[data-categoria]");
  if (!boton) return;
  categoriaActual = boton.dataset.categoria;
  filtros.querySelectorAll(".filtro").forEach(filtro => {
    const seleccionado = filtro === boton;
    filtro.classList.toggle("activo", seleccionado);
    filtro.setAttribute("aria-pressed", String(seleccionado));
  });
  mostrarObras();
});

campoBusqueda.addEventListener("input", mostrarObras);

rejillaObras.addEventListener("click", evento => {
  const boton = evento.target.closest("[data-abrir-obra]");
  if (boton) abrirDetalles(boton.dataset.abrirObra);
});

cerrarModal.addEventListener("click", () => modal.close());
modal.addEventListener("click", evento => {
  // Cierra si se hace clic en el fondo exterior del cuadro.
  if (evento.target === modal) modal.close();
});

// El formulario valida los campos en el navegador y prepara un mensaje de WhatsApp.
// No guarda datos en una base de datos ni envía correos por sí mismo.
document.querySelector("#formulario-contacto").addEventListener("submit", evento => {
  evento.preventDefault();
  const formulario = evento.currentTarget;
  if (!formulario.reportValidity()) return;

  const datos = new FormData(formulario);
  const nombre = String(datos.get("nombre")).trim();
  const correo = String(datos.get("correo")).trim();
  const asunto = String(datos.get("asunto")).trim();
  const mensaje = String(datos.get("mensaje")).trim();
  const texto = `Hola, soy ${nombre} (${correo}).\nAsunto: ${asunto}\nMensaje: ${mensaje}`;
  const enlace = crearEnlaceWhatsApp(texto);

  document.querySelector("#mensaje-formulario").textContent =
    "Se abrirá WhatsApp con tu mensaje preparado. Revísalo y pulsa Enviar allí.";
  window.open(enlace, "_blank", "noopener,noreferrer");
});

// Actualiza el año automáticamente.
document.querySelector("#anio-actual").textContent = new Date().getFullYear();

// Actualiza el enlace directo de WhatsApp con el número configurado arriba.
document.querySelector("#boton-whatsapp").href = crearEnlaceWhatsApp(
  "Hola, quisiera información sobre una obra personalizada."
);

// Marca la sección visible en la navegación inferior, cuando el navegador lo permite.
const enlacesNav = document.querySelectorAll(".enlace-nav");
const seccionesNav = [...enlacesNav]
  .map(enlace => document.querySelector(enlace.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
      if (!entrada.isIntersecting) return;
      enlacesNav.forEach(enlace => {
        const activo = enlace.getAttribute("href") === `#${entrada.target.id}`;
        enlace.classList.toggle("activo", activo);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  seccionesNav.forEach(seccion => observador.observe(seccion));
}

mostrarObras();
