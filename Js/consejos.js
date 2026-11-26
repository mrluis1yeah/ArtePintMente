// =====================================================
// CONSEJOS DE ARTE Y DIBUJO · 50 consejos con filtro por categoría
// Para añadir uno: agrega [categoría, "Título", "Texto"] a la lista.
// =====================================================
(() => {
    const categorias = {
        fundamentos: ["Fundamentos", "#ffc16a"], luz: ["Luz y sombra", "#b79bff"], color: ["Color", "#ff7eb6"],
        composicion: ["Composición", "#5ee7e7"], retrato: ["Retrato y figura", "#ff9b6b"], paisaje: ["Paisaje y perspectiva", "#7fe08f"],
        materiales: ["Materiales y técnicas", "#6fb7ff"], habitos: ["Hábitos y creatividad", "#f6e05e"], cuidado: ["Cuidado de la obra", "#e39ad0"]
    };
    const consejos = [
        ["fundamentos", "Empieza con formas simples", "Reduce todo a círculos, cuadrados y triángulos antes de añadir detalle: la estructura manda sobre la textura."],
        ["fundamentos", "Dibuja desde el hombro", "Para trazos largos y seguros mueve el brazo entero, no solo la muñeca. Tus líneas se vuelven más fluidas."],
        ["fundamentos", "Mide con el lápiz", "Sostén el lápiz a brazo extendido para comparar alturas y anchos, y corrige las proporciones antes de sombrear."],
        ["fundamentos", "Boceta con trazo ligero", "Usa líneas suaves al comienzo. Las definitivas llegan cuando la forma ya funciona."],
        ["fundamentos", "Mira más al modelo que al papel", "Observar el doble de lo que trazas mejora la precisión de forma notable."],
        ["fundamentos", "Dibuja el espacio negativo", "Dibujar el hueco entre los objetos corrige formas que no lograbas ver."],
        ["luz", "Define tu fuente de luz", "Decide de dónde viene la luz antes de sombrear y mantenla igual en toda la obra."],
        ["luz", "Conoce las zonas de sombra", "Luz, medio tono, sombra propia, sombra proyectada y luz reflejada dan volumen a cualquier forma."],
        ["luz", "Entrecierra los ojos", "Al achicar la mirada se pierden los detalles y aparecen las grandes masas de luz y sombra."],
        ["luz", "Protege tus blancos", "En acuarela y grafito reserva el blanco del papel desde el principio: recuperarlo después es muy difícil."],
        ["luz", "Crea una escala de valores", "Practica una escala del blanco al negro en nueve pasos; te enseña cuánta presión usar en cada tono."],
        ["luz", "Sombrea siguiendo la forma", "Dirige el sombreado según la curvatura del objeto, no en una sola dirección, y la superficie se vuelve creíble."],
        ["color", "Limita tu paleta", "Trabaja con tres o cuatro colores más blanco: la obra gana coherencia y tu ojo aprende a mezclar."],
        ["color", "Mezcla antes de pintar", "Prepara el tono en la paleta y pruébalo en un papel aparte antes de llevarlo a la obra."],
        ["color", "Usa colores complementarios", "Un toque del color opuesto (azul y naranja, rojo y verde) hace vibrar al color dominante."],
        ["color", "Cuidado con el negro puro", "Mezcla azul oscuro con marrón para lograr sombras más ricas que las de un negro de tubo."],
        ["color", "Cálidos avanzan, fríos retroceden", "Pon tonos cálidos en primer plano y fríos al fondo para crear profundidad."],
        ["color", "Apaga los colores intensos", "Añade una pizca de su complementario a un color saturado para que luzca más natural."],
        ["composicion", "Usa la regla de los tercios", "Coloca el punto de interés en una intersección de una cuadrícula de 3×3, no en el centro."],
        ["composicion", "Guía la mirada", "Caminos, ríos o líneas de un brazo llevan el ojo del espectador hasta el foco de la obra."],
        ["composicion", "Alterna detalle y descanso", "Combina zonas muy trabajadas con zonas tranquilas: todo igual de detallado cansa la vista."],
        ["composicion", "Haz miniaturas previas", "Prueba tres o cuatro encuadres de cinco centímetros antes de empezar el dibujo definitivo."],
        ["composicion", "Recorta con valentía", "Acercarte al sujeto y cortar el borde genera más impacto que mostrarlo completo."],
        ["retrato", "Ojos a media altura", "En un rostro de frente los ojos están en la línea media de la cabeza, más abajo de lo que se suele pensar."],
        ["retrato", "Cinco ojos de ancho", "El ancho de la cara equivale a unos cinco ojos, y el espacio entre ellos mide uno."],
        ["retrato", "Dibuja primero el gesto", "En figura humana empieza con una línea de acción que capture el movimiento de la pose."],
        ["retrato", "Construye las manos en bloques", "Divide la mano en palma y dedos como cajas simples antes de afinar los nudillos."],
        ["retrato", "Da vida a la mirada", "Deja un pequeño brillo en la pupila y respeta la sombra del párpado: ahí aparece la expresión."],
        ["retrato", "Practica poses de 30 segundos", "Los gestos rápidos entrenan la observación y sueltan la mano."],
        ["paisaje", "Ubica la línea del horizonte", "Define el nivel de los ojos: todas las líneas de fuga convergen en esa altura."],
        ["paisaje", "Usa la perspectiva atmosférica", "Lo lejano es más claro, más azulado y de menor contraste. Aprovéchalo para dar distancia."],
        ["paisaje", "Piensa en tres planos", "Divide el paisaje en primer plano, plano medio y fondo, cada uno con su propio nivel de detalle."],
        ["paisaje", "Varía los árboles", "Evita repetir copas idénticas: cambia tamaño, inclinación y densidad."],
        ["paisaje", "Dibuja del natural", "Salir a dibujar, aunque sean quince minutos, enseña lo que ninguna fotografía puede mostrar."],
        ["materiales", "Combina durezas de lápiz", "Usa un HB para la estructura, un 2B para los medios tonos y un 6B para las sombras profundas."],
        ["materiales", "Elige bien el papel", "Escoge el gramaje según la técnica: unos 90 g para bocetos y 300 g para acuarela."],
        ["materiales", "Difumina con criterio", "Suaviza las zonas tranquilas, pero deja bordes nítidos donde haya contraste."],
        ["materiales", "Acuarela: de claro a oscuro", "Aplica primero lavados claros y deja secar cada capa antes de añadir detalles."],
        ["materiales", "Acrílico: capas finas", "Pinta por capas delgadas y usa retardante si necesitas más tiempo para mezclar."],
        ["materiales", "Borra para dibujar", "Usa la goma moldeable para levantar luces, no solo para corregir errores."],
        ["habitos", "Dibuja un poco cada día", "Diez minutos diarios valen más que tres horas una vez al mes."],
        ["habitos", "Lleva un cuaderno de bocetos", "Un cuaderno pequeño captura ideas sin la presión de hacer una obra final."],
        ["habitos", "Copia a los maestros", "Reproducir obras que admiras te enseña decisiones de composición y de trazo."],
        ["habitos", "Termina lo que empiezas", "Acabar piezas, aunque sean imperfectas, enseña más que acumular bocetos a medias."],
        ["habitos", "Pide opiniones concretas", "Pregunta qué funciona en tu proporción o tu color, en lugar de solo «¿te gusta?»."],
        ["cuidado", "Evita el sol directo", "La luz solar desvanece los pigmentos y amarillea el papel: cuelga la obra donde reciba luz suave."],
        ["cuidado", "Fija el grafito", "Aplica fijativo en capas finas y a distancia, o protege el dibujo con vidrio para evitar manchas."],
        ["cuidado", "Enmarca con paspartú", "Un paspartú separa el dibujo del vidrio e impide que se pegue por la humedad."],
        ["cuidado", "Limpia con suavidad", "Quita el polvo con una brocha suave o un paño seco; nunca uses agua sobre el papel."],
        ["cuidado", "Controla la humedad", "Evita baños y paredes húmedas: el moho y el abombado dañan el papel y el lienzo."]
    ];

    const porId = (id) => document.getElementById(id);
    const filtros = porId("filtros"), rejilla = porId("rejillaConsejos"), cuenta = porId("cuentaConsejos");
    if (!filtros || !rejilla) return;
    const reducir = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let activa = "todos";

    const conteo = (k) => consejos.filter((c) => k === "todos" || c[0] === k).length;
    filtros.innerHTML = [["todos", ["Todos", "#e9a24b"]], ...Object.entries(categorias)].map(([k, [nombre, color]]) =>
        `<button type="button" class="filtro" data-k="${k}" style="--c:${color}" aria-pressed="${k === "todos"}">${nombre} <small>${conteo(k)}</small></button>`).join("");

    const pintar = () => {
        const lista = consejos.filter((c) => activa === "todos" || c[0] === activa);
        rejilla.innerHTML = lista.map(([k, titulo, texto]) => `
            <article class="tarjeta-consejo" style="--c:${categorias[k][1]}" data-k="${k}">
                <span class="etiqueta">${categorias[k][0]}</span><h3>${titulo}</h3><p>${texto}</p>
            </article>`).join("");
        cuenta.textContent = `${lista.length} ${lista.length === 1 ? "consejo" : "consejos"}${activa === "todos" ? "" : ` en ${categorias[activa][0]}`}`;
        window.ArteFx?.revelar(rejilla);
    };
    const elegir = (k) => {
        activa = k;
        filtros.querySelectorAll(".filtro").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.k === k)));
        pintar();
    };
    filtros.addEventListener("click", (e) => { const b = e.target.closest(".filtro"); if (b) elegir(b.dataset.k); });

    porId("consejoAzar").addEventListener("click", () => {
        elegir("todos");
        const tarjetas = [...rejilla.children];
        const t = tarjetas[Math.floor(Math.random() * tarjetas.length)];
        t.dataset.revelar !== undefined && t.classList.add("revelado");
        t.scrollIntoView({ block: "center", behavior: reducir ? "auto" : "smooth" });
        t.classList.remove("destacado"); void t.offsetWidth; t.classList.add("destacado");
    });
    pintar();
})();
