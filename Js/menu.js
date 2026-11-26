// =====================================================
// MENÚ HAMBURGUESA (barra-caballete) · JavaScript mínimo
// El CSS decide cuándo se ve el botón (≤40em). Este script solo
// sincroniza el estado: aria-expanded, Escape, clic fuera y retorno de foco.
// Sin JavaScript la navegación sigue visible (mejora progresiva).
// =====================================================
(() => {
    const barra = document.querySelector(".caballete");
    const boton = barra?.querySelector(".caballete__boton");
    if (!barra || !boton) return;

    const estrecho = window.matchMedia("(max-width: 40em)");
    const abierto = () => barra.hasAttribute("data-abierto");

    const poner = (valor, devolverFoco = false) => {
        barra.toggleAttribute("data-abierto", valor);
        boton.setAttribute("aria-expanded", String(valor));
        if (!valor && devolverFoco) boton.focus();
    };

    boton.addEventListener("click", () => poner(!abierto()));

    // Escape cierra y devuelve el foco al botón
    barra.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && abierto()) { e.stopPropagation(); poner(false, true); }
    });

    // Elegir un enlace o tocar fuera cierra el panel
    barra.addEventListener("click", (e) => { if (e.target.closest("a")) poner(false); });
    document.addEventListener("click", (e) => { if (abierto() && !barra.contains(e.target)) poner(false); });

    // Si la pantalla se ensancha (girar el móvil), restablece el estado
    estrecho.addEventListener("change", () => poner(false));
})();
