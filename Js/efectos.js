// =====================================================
// EFECTOS · tema día/noche, preloader, Scroll Reveal, luces y progreso
// Todo respeta prefers-reduced-motion. window.ArteFx.revelar(ctx) sirve
// para contenido que se pinta después (galería, consejos).
// =====================================================
(() => {
    const raiz = document.documentElement;
    const reducir = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. TEMA ------------------------------------------------
    const poner = (t) => {
        raiz.dataset.tema = t;
        document.querySelectorAll(".tema-boton").forEach((b) => {
            b.setAttribute("aria-pressed", String(t === "dia"));
            b.setAttribute("aria-label", t === "dia" ? "Activar modo noche" : "Activar modo día");
        });
    };
    poner(raiz.dataset.tema === "dia" ? "dia" : "noche");
    document.querySelectorAll(".tema-boton").forEach((boton) => boton.addEventListener("click", () => {
        const t = raiz.dataset.tema === "dia" ? "noche" : "dia";
        try { localStorage.setItem("tema", t); } catch {}
        if (!document.startViewTransition || reducir) return poner(t);
        const r = boton.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
        const radio = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        document.startViewTransition(() => poner(t)).ready.then(() => raiz.animate(
            { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radio}px at ${x}px ${y}px)`] },
            { duration: 700, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
        )).catch(() => {});
    }));

    // 2. SCROLL REVEAL ---------------------------------------
    const objetivos = ".portada-contenido,.principio,.paso,.tarjeta-servicio,.testimonio,.consejo,.titulo-con-enlace,.introduccion,.consejos-intro,.contacto-intro,.datos-contacto,.contacto .formulario,.rejilla-galeria a,.galeria-portada .contenedor,.consejos-portada .contenedor,.tarjeta-consejo,.barra-filtros";
    const hechos = new WeakSet(), pendientes = [];
    let listo = false;
    const io = "IntersectionObserver" in window && !reducir ? new IntersectionObserver((entradas, obs) => entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target; obs.unobserve(el); el.classList.add("revelado");
        // al terminar, se quita el atributo para que el hover propio de cada tarjeta vuelva a funcionar
        el.addEventListener("transitionend", (ev) => {
            if (ev.target !== el || ev.propertyName !== "transform") return;
            el.removeAttribute("data-revelar"); el.classList.remove("revelado"); el.style.removeProperty("--d");
        });
    }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }) : null;
    const revelar = (ctx = document) => {
        if (!listo) return pendientes.push(ctx);
        ctx.querySelectorAll(objetivos).forEach((el, i) => {
            if (hechos.has(el) || el.closest("dialog")) return;
            hechos.add(el);
            if (!io) return;
            el.dataset.revelar = ""; el.style.setProperty("--d", `${(i % 6) * 70}ms`); io.observe(el);
        });
    };
    window.ArteFx = { revelar };

    // 3. PRELOADER -------------------------------------------
    const cargador = document.getElementById("cargador");
    const abrir = () => { listo = true; raiz.classList.add("cargado"); pendientes.splice(0).forEach(revelar); revelar(); };
    if (!cargador) abrir();
    else {
        const lemas = ["Cada trazo dice lo que las palabras no alcanzan.", "Pintar es darle color a lo que sientes.", "Un lienzo en blanco es una puerta abierta.", "El arte convierte un instante en algo que se queda."];
        cargador.querySelector(".cargador__lema").textContent = lemas[Math.floor(Math.random() * lemas.length)];
        let visto = false; try { visto = sessionStorage.getItem("visto") === "1"; sessionStorage.setItem("visto", "1"); } catch {}
        const inicio = performance.now(), minimo = visto ? 350 : 1600;
        let terminado = false;
        const fin = () => {
            if (terminado) return; terminado = true;
            setTimeout(() => { cargador.classList.add("listo"); abrir(); setTimeout(() => cargador.remove(), 1000); }, Math.max(0, minimo - (performance.now() - inicio)));
        };
        document.readyState === "complete" ? fin() : addEventListener("load", fin, { once: true });
        setTimeout(fin, 5000);
    }

    // 4. LUCES QUE SIGUEN AL CURSOR + PROGRESO ----------------
    addEventListener("pointermove", (e) => {
        const c = e.target.closest?.(".tarjeta-servicio,.principio,.testimonio,.tarjeta-consejo,.portada");
        if (!c) return;
        const r = c.getBoundingClientRect();
        c.style.setProperty("--mx", `${e.clientX - r.left}px`); c.style.setProperty("--my", `${e.clientY - r.top}px`);
    }, { passive: true });
    document.body.insertAdjacentHTML("beforeend", '<div class="progreso" aria-hidden="true"></div>');
})();
