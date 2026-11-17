// =====================================================
// GALERÍA DINÁMICA DE ARTEPINTMENTE
// Las obras corresponden a los archivos reales de Imagenes/Obras.
// Para añadir una obra, agrega un objeto y coloca su imagen en esa carpeta.
// =====================================================

const obras = [
    { imagen: "Obra1.jpg", nombre: "Pueblo entre montañas", descripcion: "Paisaje de arquitectura rural trabajado en escala de grises, con atención a las texturas y la profundidad.", precio: 150000 },
    { imagen: "Obra2.jpg", nombre: "Búho entre montañas", descripcion: "Ilustración de un búho en un paisaje natural, realizada con una paleta de verdes y azules.", precio: 180000 },
    { imagen: "Obra3.jpg", nombre: "Sendero de verano", descripcion: "Paisaje luminoso de vegetación y montañas, con colores vivos y una atmósfera tranquila.", precio: 200000 },
    { imagen: "Obra4.jpg", nombre: "Reflejos azules", descripcion: "Paisaje de agua y montañas en tonos azules y verdes que transmite calma.", precio: 160000 },
    { imagen: "Obra5.jpg", nombre: "Llanura al atardecer", descripcion: "Composición de paisaje en tonos cálidos y rojizos, con un horizonte amplio.", precio: 120000 },
    { imagen: "Obra6.jpg", nombre: "Árbol de luz", descripcion: "Árbol de gran formato visual, con pinceladas expresivas y una paleta de verdes y azules.", precio: 175000 },
    { imagen: "Obra7.jpg", nombre: "Mirada en estudio", descripcion: "Estudio de un rostro realizado a lápiz, centrado en la expresión y los detalles de la mirada.", precio: 130000 },
    { imagen: "Obra8.jpg", nombre: "Geometría urbana", descripcion: "Composición de formas arquitectónicas y geométricas en tonos neutros.", precio: 190000 },
    { imagen: "Obra9.jpg", nombre: "Bodegón en sanguina", descripcion: "Estudio de objetos cotidianos mediante líneas y sombras en tonos tierra.", precio: 210000 },
    { imagen: "Obra10.jpg", nombre: "Pequeña ardilla", descripcion: "Dibujo de una ardilla con trazos delicados y una técnica monocromática.", precio: 140000 },
    { imagen: "Obra11.jpg", nombre: "Cordillera en grafito", descripcion: "Paisaje montañoso dibujado en grafito, con contrastes y texturas de alto detalle.", precio: 170000 },
    { imagen: "Obra12.jpg", nombre: "Gato entre colores", descripcion: "Retrato de un gato rodeado de una composición intensa de colores cálidos.", precio: 155000 },
    { imagen: "Obra13.jpg", nombre: "Naturaleza sobre la mesa", descripcion: "Bodegón de alimentos trabajado con una técnica de dibujo en tonos cálidos.", precio: 185000 },
    { imagen: "Obra14.jpg", nombre: "Barca en el agua", descripcion: "Ilustración de una barca y su reflejo, resuelta con trazos expresivos en tonos rojizos.", precio: 220000 },
    { imagen: "Obra15.jpg", nombre: "Puente de la ciudad", descripcion: "Paisaje urbano en blanco y negro que destaca la arquitectura y la perspectiva.", precio: 195000 }
];

const porId = (id) => document.getElementById(id);
const contenedor = porId("contenedorObras");
const overlay = porId("overlayObra");
const formularioObra = porId("formularioObra");
const precio = (obra) => `$${obra.precio.toLocaleString("es-CO")} COP`;

if (contenedor && overlay && formularioObra) {
    porId("cantidadObras").textContent = `${obras.length} obras disponibles`;

    contenedor.innerHTML = obras.map((obra, indice) => `
        <article class="tarjeta-servicio tarjeta-obra" data-i="${indice}" tabindex="0" role="button" aria-label="Ver detalles de ${obra.nombre}">
            <img src="Imagenes/Obras/${obra.imagen}" alt="${obra.nombre}" loading="lazy">
            <div>
                <h3>${obra.nombre}</h3>
                <p>${obra.descripcion}</p>
                <p class="precio">${precio(obra)}</p>
            </div>
        </article>
    `).join("");

    const abrirObra = (tarjeta) => {
        const obra = obras[Number(tarjeta.dataset.i)];
        if (!obra) return;

        porId("imagenDetalle").src = `Imagenes/Obras/${obra.imagen}`;
        porId("imagenDetalle").alt = obra.nombre;
        porId("nombreDetalle").textContent = obra.nombre;
        porId("descripcionDetalle").textContent = obra.descripcion;
        porId("precioDetalle").textContent = precio(obra);

        const mensaje = `Hola, ArtePintMente. Me interesa la obra "${obra.nombre}". ¿Podrían contarme si está disponible y darme más información sobre sus dimensiones, técnica y precio?`;
        formularioObra.elements.namedItem("mensaje").value = mensaje;
        formularioObra.dataset.obra = obra.nombre;
        formularioObra.querySelector(".estado").textContent = "";
        formularioObra.reset();
        // reset limpia campos, pero el mensaje oculto se vuelve a establecer después.
        formularioObra.elements.namedItem("mensaje").value = mensaje;
        overlay.classList.add("activo");
        porId("nombre").focus();
    };

    contenedor.addEventListener("click", (evento) => {
        const tarjeta = evento.target.closest(".tarjeta-obra");
        if (tarjeta) abrirObra(tarjeta);
    });

    contenedor.addEventListener("keydown", (evento) => {
        if (evento.key !== "Enter" && evento.key !== " ") return;
        const tarjeta = evento.target.closest(".tarjeta-obra");
        if (tarjeta) {
            evento.preventDefault();
            abrirObra(tarjeta);
        }
    });

    const cerrar = () => overlay.classList.remove("activo");
    porId("cerrarOverlay").addEventListener("click", cerrar);
    overlay.addEventListener("click", (evento) => {
        if (evento.target === overlay) cerrar();
    });
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") cerrar();
    });
}
