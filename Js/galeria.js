// ===============================================
// GALERÍA DINÁMICA DE ARTEPINTMENTE
// El contacto (WhatsApp / Correo) lo resuelve Js/script.js
// ===============================================

// 1. LISTA DE OBRAS. Para añadir una, copia una línea y cambia sus datos.
//    La imagen debe estar en Imagenes/Obras/.
const obras = [
    { imagen: "Obra1.jpg", nombre: "Atardecer de sueños", descripcion: "Una obra llena de colores cálidos que representa la tranquilidad y la belleza de un atardecer.", precio: 150000 },
    { imagen: "Obra2.jpg", nombre: "Bosque encantado", descripcion: "Una composición inspirada en la naturaleza, los bosques y sus misterios.", precio: 180000 },
    { imagen: "Obra3.jpg", nombre: "Universo creativo", descripcion: "Una representación artística de la imaginación y los mundos desconocidos.", precio: 200000 },
    { imagen: "Obra4.jpg", nombre: "Naturaleza viva", descripcion: "Una pintura que transmite serenidad mediante sus colores y paisajes.", precio: 160000 },
    { imagen: "Obra5.jpg", nombre: "Expresión animal", descripcion: "Una ilustración llena de personalidad y expresión.", precio: 120000 },
    { imagen: "Obra6.jpg", nombre: "El árbol de la vida", descripcion: "Una representación de la naturaleza y su conexión con la vida.", precio: 175000 },
    { imagen: "Obra7.jpg", nombre: "Sueños abstractos", descripcion: "Una obra abstracta que combina formas, colores y movimiento.", precio: 130000 },
    { imagen: "Obra8.jpg", nombre: "Arquitectura geométrica", descripcion: "Una composición artística inspirada en las figuras geométricas.", precio: 190000 },
    { imagen: "Obra9.jpg", nombre: "Paisaje dorado", descripcion: "Una pintura que representa la belleza de los paisajes naturales.", precio: 210000 },
    { imagen: "Obra10.jpg", nombre: "Contrastes de la vida", descripcion: "Una obra en blanco y negro que explora los contrastes visuales.", precio: 140000 },
    { imagen: "Obra11.jpg", nombre: "Retrato de libertad", descripcion: "Un dibujo artístico realizado con atención a los detalles.", precio: 170000 },
    { imagen: "Obra12.jpg", nombre: "Colores de mi ciudad", descripcion: "Una composición llena de color que representa la vida urbana.", precio: 155000 },
    { imagen: "Obra13.jpg", nombre: "Horizonte azul", descripcion: "Una ilustración inspirada en los paisajes y el cielo.", precio: 185000 },
    { imagen: "Obra14.jpg", nombre: "Momentos especiales", descripcion: "Una obra artística que representa momentos para recordar.", precio: 220000 },
    { imagen: "Obra15.jpg", nombre: "Esencia artística", descripcion: "Una composición que refleja la creatividad y el trabajo artesanal.", precio: 195000 }
];

// 2. ELEMENTOS DEL HTML
const $ = (id) => document.getElementById(id);
const overlay = $("overlayObra");
const formularioObra = $("formularioObra");
const precio = (obra) => `$${obra.precio.toLocaleString("es-CO")} COP`;

// 3. TARJETAS: reutilizan la clase .tarjeta-servicio del diseño principal
$("cantidadObras").textContent = `${obras.length} obras disponibles`;
$("contenedorObras").innerHTML = obras.map((obra, i) => `
    <article class="tarjeta-servicio tarjeta-obra" data-i="${i}">
        <img src="Imagenes/Obras/${obra.imagen}" alt="${obra.nombre}">
        <div><h3>${obra.nombre}</h3><p>${obra.descripcion}</p><p class="precio">${precio(obra)}</p></div>
    </article>`).join("");

// 4. ABRIR LOS DETALLES al pulsar una tarjeta
$("contenedorObras").addEventListener("click", (e) => {
    const tarjeta = e.target.closest(".tarjeta-obra");
    if (!tarjeta) return;

    const obra = obras[tarjeta.dataset.i];
    $("imagenDetalle").src = "Imagenes/Obras/" + obra.imagen;
    $("imagenDetalle").alt = obra.nombre;
    $("nombreDetalle").textContent = obra.nombre;
    $("descripcionDetalle").textContent = obra.descripcion;
    $("precioDetalle").textContent = precio(obra);

    // Mensaje prefabricado: script.js lo envía por WhatsApp o por correo.
    formularioObra.mensaje.value = `Me interesa la obra que se llama “${obra.nombre}”, ¿podríamos ponernos en contacto por favor?`;
    formularioObra.querySelector(".estado").textContent = "";
    overlay.classList.add("activo");
});

// 5. CERRAR: botón ×, clic fuera de la ventana o tecla Escape
const cerrar = () => overlay.classList.remove("activo");
overlay.addEventListener("click", (e) => (e.target === overlay || e.target.id === "cerrarOverlay") && cerrar());
document.addEventListener("keydown", (e) => e.key === "Escape" && cerrar());
