// ===============================================
// GALERÍA DINÁMICA DE ARTEPINTMENTE
// ===============================================


// 1. NÚMERO DE WHATSAPP

// Cambia este número por el número real de la emprendedora.

const numeroWhatsApp = "573001234567";


// ===============================================
// 2. LISTA DE OBRAS
// ===============================================


let obras = [

    {
        id: 1,
        imagen: "Obra1.jpg",
        nombre: "Atardecer de sueños",
        descripcion: "Una obra llena de colores cálidos que representa la tranquilidad y la belleza de un atardecer.",
        precio: 150000
    },

    {
        id: 2,
        imagen: "Obra2.jpg",
        nombre: "Bosque encantado",
        descripcion: "Una composición inspirada en la naturaleza, los bosques y sus misterios.",
        precio: 180000
    },

    {
        id: 3,
        imagen: "Obra3.jpg",
        nombre: "Universo creativo",
        descripcion: "Una representación artística de la imaginación y los mundos desconocidos.",
        precio: 200000
    },

    {
        id: 4,
        imagen: "Obra4.jpg",
        nombre: "Naturaleza viva",
        descripcion: "Una pintura que transmite serenidad mediante sus colores y paisajes.",
        precio: 160000
    },

    {
        id: 5,
        imagen: "Obra5.jpg",
        nombre: "Expresión animal",
        descripcion: "Una ilustración llena de personalidad y expresión.",
        precio: 120000
    },

    {
        id: 6,
        imagen: "Obra6.jpg",
        nombre: "El árbol de la vida",
        descripcion: "Una representación de la naturaleza y su conexión con la vida.",
        precio: 175000
    },

    {
        id: 7,
        imagen: "Obra7.jpg",
        nombre: "Sueños abstractos",
        descripcion: "Una obra abstracta que combina formas, colores y movimiento.",
        precio: 130000
    },

    {
        id: 8,
        imagen: "Obra8.jpg",
        nombre: "Arquitectura geométrica",
        descripcion: "Una composición artística inspirada en las figuras geométricas.",
        precio: 190000
    },

    {
        id: 9,
        imagen: "Obra9.jpg",
        nombre: "Paisaje dorado",
        descripcion: "Una pintura que representa la belleza de los paisajes naturales.",
        precio: 210000
    },

    {
        id: 10,
        imagen: "Obra10.jpg",
        nombre: "Contrastes de la vida",
        descripcion: "Una obra en blanco y negro que explora los contrastes visuales.",
        precio: 140000
    },

    {
        id: 11,
        imagen: "Obra11.jpg",
        nombre: "Retrato de libertad",
        descripcion: "Un dibujo artístico realizado con atención a los detalles.",
        precio: 170000
    },

    {
        id: 12,
        imagen: "Obra12.jpg",
        nombre: "Colores de mi ciudad",
        descripcion: "Una composición llena de color que representa la vida urbana.",
        precio: 155000
    },

    {
        id: 13,
        imagen: "Obra13.jpg",
        nombre: "Horizonte azul",
        descripcion: "Una ilustración inspirada en los paisajes y el cielo.",
        precio: 185000
    },

    {
        id: 14,
        imagen: "Obra14.jpg",
        nombre: "Momentos especiales",
        descripcion: "Una obra artística que representa momentos para recordar.",
        precio: 220000
    },

    {
        id: 15,
        imagen: "Obra15.jpg",
        nombre: "Esencia artística",
        descripcion: "Una composición que refleja la creatividad y el trabajo artesanal.",
        precio: 195000
    }

];


// ===============================================
// 3. OBTENER LOS ELEMENTOS DEL HTML
// ===============================================

// Lugar donde aparecerán las tarjetas.

const contenedorObras = document.getElementById("contenedorObras");


// Texto que muestra la cantidad de obras.

const cantidadObras = document.getElementById("cantidadObras");


// Elementos de la ventana emergente.

const overlay = document.getElementById("overlayObra");

const cerrarOverlay = document.getElementById("cerrarOverlay");


// Elementos donde aparecerán los detalles.

const imagenDetalle = document.getElementById("imagenDetalle");

const nombreDetalle = document.getElementById("nombreDetalle");

const descripcionDetalle = document.getElementById("descripcionDetalle");

const precioDetalle = document.getElementById("precioDetalle");


// Botón de consulta.

const botonConsultar = document.getElementById("botonConsultar");


// Guardamos la obra que el usuario haya seleccionado.

let obraSeleccionada = null;


// ===============================================
// 4. MOSTRAR TODAS LAS OBRAS
// ===============================================

function mostrarObras() {

    // Limpiamos el contenedor antes de generar las tarjetas.

    contenedorObras.innerHTML = "";


    // Actualizamos el número de obras disponibles.

    cantidadObras.textContent = obras.length + " obras disponibles";


    // Recorremos la lista de obras.

    obras.forEach(function(obra) {


        // Creamos una tarjeta.

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("tarjeta-obra");


        // Creamos la imagen.

        const imagen = document.createElement("img");

        imagen.src = "Imagenes/Obras/" + obra.imagen;

        imagen.alt = obra.nombre;


        // Creamos el espacio de información.

        const datos = document.createElement("div");

        datos.classList.add("datos-tarjeta");


        // Nombre de la obra.

        const nombre = document.createElement("h3");

        nombre.textContent = obra.nombre;


        // Descripción breve.

        const descripcion = document.createElement("p");

        descripcion.textContent = obra.descripcion;


        // Precio.

        const precio = document.createElement("p");

        precio.classList.add("precio-tarjeta");

        precio.textContent = "$" + obra.precio.toLocaleString("es-CO") + " COP";


        // Agregamos todo a la tarjeta.

        datos.appendChild(nombre);

        datos.appendChild(descripcion);

        datos.appendChild(precio);


        tarjeta.appendChild(imagen);

        tarjeta.appendChild(datos);


        // Cuando se pulsa la tarjeta, abrimos sus detalles.

        tarjeta.addEventListener("click", function() {

            abrirDetalles(obra);

        });


        // Finalmente agregamos la tarjeta a la galería.

        contenedorObras.appendChild(tarjeta);

    });

}


// ===============================================
// 5. ABRIR LOS DETALLES DE UNA OBRA
// ===============================================

function abrirDetalles(obra) {


    // Guardamos la obra seleccionada.

    obraSeleccionada = obra;


    // Colocamos sus datos en la ventana emergente.

    imagenDetalle.src = "Imagenes/Obras/" + obra.imagen;

    imagenDetalle.alt = obra.nombre;

    nombreDetalle.textContent = obra.nombre;

    descripcionDetalle.textContent = obra.descripcion;


    // Mostramos el precio con separadores de miles.

    precioDetalle.textContent =
        "$" + obra.precio.toLocaleString("es-CO") + " COP";


    // Mostramos el overlay.

    overlay.classList.add("activo");

}


// ===============================================
// 6. CERRAR LOS DETALLES
// ===============================================

function cerrarDetalles() {

    overlay.classList.remove("activo");

    obraSeleccionada = null;

}


// Cerramos cuando se pulsa la X.

cerrarOverlay.addEventListener("click", function() {

    cerrarDetalles();

});


// También cerramos si se pulsa fuera de la ventana.

overlay.addEventListener("click", function(event) {

    if (event.target === overlay) {

        cerrarDetalles();

    }

});


// Cerramos también con la tecla Escape.

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        cerrarDetalles();

    }

});


// ===============================================
// 7. CONSULTAR UNA OBRA POR WHATSAPP
// ===============================================

botonConsultar.addEventListener("click", function() {


    // Comprobamos que exista una obra seleccionada.

    if (obraSeleccionada === null) {

        return;

    }


    // Construimos el mensaje personalizado.

    const mensaje =
        "Hola, buen día, me interesa la obra que se llama \"" +

        obraSeleccionada.nombre +

        "\", ¿podríamos ponernos en contacto por favor?";


    // Convertimos el mensaje para utilizarlo en el enlace.

    const mensajeCodificado = encodeURIComponent(mensaje);


    // Creamos el enlace de WhatsApp.

    const enlaceWhatsApp =
        "https://wa.me/" +

        numeroWhatsApp +

        "?text=" +

        mensajeCodificado;


    // Abrimos WhatsApp con el mensaje preparado.

    window.open(enlaceWhatsApp, "_blank");


});


// ===============================================
// 8. INICIAR LA GALERÍA
// ===============================================

// Al cargar el archivo, mostramos las obras.

mostrarObras();