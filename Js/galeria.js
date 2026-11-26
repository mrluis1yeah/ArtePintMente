// =====================================================
// GALERÍA Y VISOR DE OBRAS
// · galeria.html: pinta las tarjetas.
// · index.html y galeria.html: el clic en una obra abre un visor
//   (con anterior/siguiente, flechas del teclado y deslizar) en vez de
//   llevar a la imagen completa. Los datos viven en Js/obras.js.
// =====================================================
(() => {
    const porId = (id) => document.getElementById(id);
    const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const dinero = (o) => `$${o.precio.toLocaleString("es-CO")} COP`;

    // 1. Tarjetas (solo en galeria.html)
    const contenedor = porId("contenedorObras");
    if (contenedor) {
        porId("cantidadObras").textContent = `${obras.length} obras disponibles`;
        contenedor.innerHTML = obras.map((o, i) => `
            <article class="tarjeta-servicio tarjeta-obra">
                <img src="Imagenes/Obras/${o.imagen}" alt="" loading="lazy" decoding="async">
                <div>
                    <h3><button type="button" class="tarjeta-obra__abrir" data-i="${i}">${esc(o.nombre)}</button></h3>
                    <p class="descripcion">${esc(o.descripcion)}</p>
                    <p class="precio">${dinero(o)}</p>
                </div>
            </article>`).join("");
        window.ArteFx?.revelar(contenedor);
    }

    // 2. Visor (se inyecta una sola vez, antes de que script.js enlace los formularios)
    document.body.insertAdjacentHTML("beforeend", `
    <dialog class="ventana-obra" id="overlayObra" aria-labelledby="nombreDetalle">
        <button class="cerrar-overlay" id="cerrarOverlay" type="button" aria-label="Cerrar ventana"><span aria-hidden="true">&times;</span></button>
        <div class="ventana-obra__cuerpo">
            <div class="imagen-detalle" id="zonaImagen">
                <img src="" alt="" id="imagenDetalle">
                <div class="visor-nav">
                    <button type="button" id="obraAnterior" aria-label="Obra anterior"><span aria-hidden="true">‹</span></button>
                    <output id="contadorObra" aria-live="polite"></output>
                    <button type="button" id="obraSiguiente" aria-label="Obra siguiente"><span aria-hidden="true">›</span></button>
                </div>
            </div>
            <div class="informacion-obra">
                <p class="sobretitulo">DETALLES DE LA OBRA</p>
                <h2 id="nombreDetalle"></h2>
                <p id="descripcionDetalle"></p>
                <p class="precio" id="precioDetalle"></p>
                <form class="formulario" id="formularioObra">
                    <input type="hidden" name="mensaje">
                    <label for="obraNombre">Nombre</label>
                    <input type="text" id="obraNombre" name="nombre" maxlength="100" placeholder="Escribe tu nombre" autocomplete="name" required>
                    <label for="obraCorreo">Correo electrónico</label>
                    <input type="email" id="obraCorreo" name="correo" maxlength="150" placeholder="Escribe tu correo" autocomplete="email" required>
                    <small>Para el correo necesitamos tus datos; por WhatsApp puedes escribir directo.</small>
                    <div class="acciones">
                        <button type="submit" class="boton boton-dorado" data-canal="whatsapp" formnovalidate><img src="Imagenes/iconos/icon_whatsapp.svg" alt="" class="icono-boton"> WhatsApp</button>
                        <button type="submit" class="boton boton-borde" data-canal="correo"><img src="Imagenes/iconos/icon_correo.svg" alt="" class="icono-boton"> Correo</button>
                    </div>
                    <p class="estado" role="status" aria-live="polite"></p>
                </form>
            </div>
        </div>
    </dialog>`);

    const dialogo = porId("overlayObra"), formulario = porId("formularioObra"), img = porId("imagenDetalle");
    let actual = 0;

    const mostrar = (indice, dir = 0) => {
        actual = (indice + obras.length) % obras.length;
        const o = obras[actual], ruta = `Imagenes/Obras/${o.imagen}`;
        img.style.setProperty("--dir", dir);
        img.style.animation = "none"; void img.offsetWidth; img.style.animation = "";
        img.src = ruta; img.alt = o.nombre;
        porId("zonaImagen").style.setProperty("--fondo-img", `url("${ruta}")`);
        porId("nombreDetalle").textContent = o.nombre;
        porId("descripcionDetalle").textContent = o.descripcion;
        porId("precioDetalle").textContent = dinero(o);
        porId("contadorObra").textContent = `${actual + 1} / ${obras.length}`;
        formulario.reset();
        formulario.querySelector(".estado").textContent = "";
        formulario.elements.namedItem("mensaje").value = `Hola, ArtePintMente. Me interesa la obra "${o.nombre}". ¿Podrían contarme si está disponible y darme más información sobre sus dimensiones, técnica y precio?`;
        [1, -1].forEach((d) => { new Image().src = `Imagenes/Obras/${obras[(actual + d + obras.length) % obras.length].imagen}`; }); // precarga vecinas
        dialogo.querySelector(".ventana-obra__cuerpo").scrollTop = 0;
    };

    document.addEventListener("click", (e) => {
        const disparador = e.target.closest("[data-i]");
        if (!disparador || !(disparador.matches(".tarjeta-obra__abrir") || disparador.closest(".rejilla-galeria"))) return;
        e.preventDefault();
        mostrar(Number(disparador.dataset.i));
        dialogo.showModal(); // foco atrapado, Esc y retorno de foco nativos
    });
    porId("obraAnterior").addEventListener("click", () => mostrar(actual - 1, -1));
    porId("obraSiguiente").addEventListener("click", () => mostrar(actual + 1, 1));
    porId("cerrarOverlay").addEventListener("click", () => dialogo.close());
    dialogo.addEventListener("click", (e) => { if (e.target === dialogo) dialogo.close(); });
    dialogo.addEventListener("keydown", (e) => {
        if (e.target.closest("input,textarea")) return;
        if (e.key === "ArrowLeft") mostrar(actual - 1, -1);
        if (e.key === "ArrowRight") mostrar(actual + 1, 1);
    });
    let x0 = null; // deslizar en el móvil
    const zona = porId("zonaImagen");
    zona.addEventListener("pointerdown", (e) => { x0 = e.clientX; });
    zona.addEventListener("pointerup", (e) => {
        if (x0 !== null && Math.abs(e.clientX - x0) > 50) mostrar(actual + (e.clientX < x0 ? 1 : -1), e.clientX < x0 ? 1 : -1);
        x0 = null;
    });
})();
