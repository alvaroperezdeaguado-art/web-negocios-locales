/* ==========================================================================
   CONFIGURACIÓN DE LA WEB
   ==========================================================================
   Este es el ÚNICO archivo que tienes que editar para adaptar la web a un
   negocio nuevo. Todo lo que aparece en la web sale de aquí.

   REGLAS DE ORO (léelas antes de tocar nada):
   1. Cambia solo el texto que está entre comillas "así".
   2. No borres las comas del final de las líneas, ni las llaves { } ni los
      corchetes [ ].
   3. Si un texto necesita comillas dentro, usa las españolas: «así».
   4. Para ocultar algo, deja sus comillas vacías ""  o pon  mostrar: false
   5. Los precios van entre comillas y con coma: "12,50"
   6. Las líneas que empiezan por // son notas para ti. No salen en la web.
   ========================================================================== */

window.CONFIG = {

  /* ───────────────────────────────────────────────────────────────────────
     1. DATOS DEL NEGOCIO
     ─────────────────────────────────────────────────────────────────────── */
  negocio: {
    nombre: "Brasa & Olivo",
    // Frase corta que acompaña al nombre (sale en Google y al compartir).
    eslogan: "Cocina mediterránea a la brasa y horno de leña",
    // Escribe: Restaurante, Bar, Cafetería, Taberna, Pizzería...
    tipo: "Restaurante",
    tipoCocina: "Mediterránea",
    // Nivel de precios para Google: €, €€, €€€ o €€€€
    rangoPrecios: "€€",
    // Logo (opcional). Sube la imagen a la carpeta "fotos" y escribe aquí
    // "fotos/logo.png". Si lo dejas vacío, se muestra el nombre con la tipografía.
    logo: "",
  },

  /* ───────────────────────────────────────────────────────────────────────
     2. CONTACTO
     ─────────────────────────────────────────────────────────────────────── */
  contacto: {
    // Teléfono tal y como quieres que se vea en la web.
    telefono: "+34 600 000 000",
    // Número de WhatsApp: prefijo del país + número, todo junto,
    // sin "+", sin espacios. España = 34. Ejemplo: "34612345678"
    whatsapp: "34600000000",
    // Mensaje que aparece ya escrito cuando el cliente abre WhatsApp.
    mensajeWhatsApp: "¡Hola! Me gustaría reservar una mesa.",
    email: "hola@brasayolivo.es",
  },

  /* ───────────────────────────────────────────────────────────────────────
     3. UBICACIÓN Y MAPA
     ─────────────────────────────────────────────────────────────────────── */
  ubicacion: {
    mostrar: true,
    antetitulo: "Dónde estamos",
    titulo: "Ven a vernos",
    direccion: "Calle de las Huertas, 21",
    codigoPostal: "28014",
    ciudad: "Madrid",
    provincia: "Madrid",
    // Código del país en 2 letras: ES (España), MX (México), AR (Argentina)...
    pais: "ES",
    // Indicaciones extra (opcional): metro, aparcamiento, terraza...
    comoLlegarTexto: "A 3 minutos del metro Antón Martín. Parking público en Plaza de Santa Ana.",
    // Lo que se busca en Google Maps para colocar el mapa. Lo más fiable es
    // el nombre del negocio + la dirección completa.
    busquedaMapa: "Calle de las Huertas 21, 28014 Madrid",
    // OPCIONAL, para que el punto del mapa sea exacto: en Google Maps busca
    // tu negocio > Compartir > Insertar un mapa > Copiar HTML, y pégalo aquí
    // entre las comillas simples. Si lo dejas vacío se usa "busquedaMapa".
    mapaPersonalizado: '',
  },

  /* ───────────────────────────────────────────────────────────────────────
     4. ENLACES
     ─────────────────────────────────────────────────────────────────────── */
  enlaces: {
    // Enlace para dejar reseñas en Google. Lo encuentras en tu Perfil de
    // Empresa de Google > "Pedir reseñas". Se parece a:
    // https://g.page/r/XXXXXXXXXXXX/review
    resenasGoogle: "https://www.google.com/maps/search/?api=1&query=Calle+de+las+Huertas+21+Madrid",
    // Si reservas con otra web (TheFork, CoverManager...), pega aquí el enlace.
    // Si lo dejas vacío, el botón «Reservar» abre WhatsApp.
    reservas: "",
    // Carta en PDF (opcional): sube el PDF a la carpeta "fotos" y escribe
    // "fotos/carta.pdf", o pega un enlace.
    cartaPdf: "",
    // Redes sociales (deja vacías las que no uses y no saldrán).
    instagram: "",
    facebook: "",
    tiktok: "",
    tripadvisor: "",
  },

  /* ───────────────────────────────────────────────────────────────────────
     5. GOOGLE Y REDES SOCIALES (SEO)
     ─────────────────────────────────────────────────────────────────────── */
  web: {
    // Dirección final de la web. Si la publicas con GitHub Pages puedes dejarla
    // vacía: se calcula sola. Rellénala solo si usas un dominio propio,
    // por ejemplo "https://www.brasayolivo.es/"
    url: "",
    // Título que sale en la pestaña del navegador y en Google (máx. 60 letras).
    tituloSEO: "Brasa & Olivo · Restaurante mediterráneo en el centro de Madrid",
    // Descripción que sale en Google y al compartir el enlace (máx. 155 letras).
    descripcionSEO: "Cocina mediterránea a la brasa y pizzas al horno de leña en el Barrio de las Letras. Menú del día, terraza y reservas por WhatsApp.",
    // Imagen que se ve al compartir el enlace por WhatsApp o redes.
    // Si la dejas vacía se usa la foto de portada.
    imagenCompartir: "",
    idioma: "es",
    // Zona horaria del negocio (para calcular «Abierto ahora»).
    // España peninsular: "Europe/Madrid" · Canarias: "Atlantic/Canary"
    zonaHoraria: "Europe/Madrid",
  },

  /* ───────────────────────────────────────────────────────────────────────
     6. COLORES Y TIPOGRAFÍAS
     Los colores se escriben en formato #RRGGBB. Puedes elegirlos en
     https://htmlcolorcodes.com/es/
     ─────────────────────────────────────────────────────────────────────── */
  apariencia: {
    colores: {
      principal: "#A8432A",         // botones, detalles y precios
      textoSobrePrincipal: "#FFFFFF", // texto dentro de los botones
      secundario: "#5B6B3A",        // etiquetas y acentos
      fondo: "#FBF6EF",             // fondo general
      fondoAlterno: "#F3EADF",      // fondo de las secciones alternas
      texto: "#2A211C",             // color del texto
      oscuro: "#1F1915",            // pie de página y bloques oscuros
    },
    // Nombres exactos de tipografías de https://fonts.google.com
    tipografias: {
      titulos: "Fraunces",
      texto: "DM Sans",
    },
    // Animaciones (títulos que aparecen, parallax, cinta de platos, tarjetas
    // en 3D…). Pon false para una web más sobria.
    animaciones: true,
    // Chispas de brasa flotando sobre la foto de portada. Pon false para quitarlas.
    chispas: true,
  },

  /* ───────────────────────────────────────────────────────────────────────
     7. PORTADA (lo primero que se ve)
     Las fotos pueden ser un enlace (https://...) o una foto subida a la
     carpeta "fotos" (por ejemplo "fotos/portada.jpg").
     ─────────────────────────────────────────────────────────────────────── */
  portada: {
    imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    textoAlternativo: "Comedor de Brasa & Olivo con luz cálida y mesas de madera",
    antetitulo: "Barrio de las Letras · Madrid",
    titulo: "Fuego lento y producto de temporada",
    subtitulo: "Cocina mediterránea a la brasa y pizzas al horno de leña, en el corazón del Madrid de siempre.",
    botonPrincipal: "Reservar mesa",
    botonSecundario: "Ver la carta",
  },

  /* ───────────────────────────────────────────────────────────────────────
     8. SOBRE NOSOTROS
     Iconos disponibles: fuego, hoja, copa, corazon, chef, cafe, cerveza,
     pescado, pizza, cubiertos, grupo, sol, estrella, reloj
     ─────────────────────────────────────────────────────────────────────── */
  sobreNosotros: {
    mostrar: true,
    antetitulo: "Nuestra casa",
    titulo: "Una taberna de barrio con alma de brasa",
    // Cada texto entre comillas es un párrafo.
    parrafos: [
      "Abrimos en 2015 con una idea sencilla: cocinar como en casa, pero con fuego de verdad. Encendemos la brasa cada mañana con carbón de encina y el horno de leña no se apaga hasta el cierre.",
      "Trabajamos con pequeños productores de la Comunidad de Madrid y cambiamos parte de la carta cada temporada. Lo que no está en su mejor momento, no está en la mesa.",
    ],
    imagen: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    textoAlternativo: "Plato emplatado en la cocina de Brasa & Olivo",
    puntosFuertes: [
      { icono: "fuego", titulo: "Brasa de encina", texto: "Un sabor ahumado que solo da el carbón de verdad." },
      { icono: "hoja", titulo: "De temporada", texto: "Verdura de la huerta de Aranjuez y carne de productores locales." },
      { icono: "copa", titulo: "Bodega cuidada", texto: "Más de 60 vinos, con cariño especial por los de Madrid." },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────────
     9. PLATOS DESTACADOS (tarjetas con foto)
     ─────────────────────────────────────────────────────────────────────── */
  destacados: {
    mostrar: true,
    antetitulo: "Los favoritos de la casa",
    titulo: "Lo que todo el mundo pide",
    platos: [
      {
        nombre: "Secreto ibérico a la brasa",
        descripcion: "Con chimichurri casero y patatas asadas en el rescoldo.",
        precio: "19,50",
        imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        textoAlternativo: "Carne a la brasa con guarnición de verduras",
      },
      {
        nombre: "Bowl mediterráneo",
        descripcion: "Quinoa, hummus, verduras asadas, aguacate y semillas tostadas.",
        precio: "13,50",
        imagen: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        textoAlternativo: "Bol de ensalada colorida con verduras frescas",
      },
      {
        nombre: "Pizza margarita de leña",
        descripcion: "Tomate San Marzano, mozzarella fior di latte y albahaca fresca.",
        precio: "12,50",
        imagen: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
        textoAlternativo: "Pizza recién salida del horno de leña",
      },
    ],
  },

  /* ───────────────────────────────────────────────────────────────────────
     10. LA CARTA
     Etiquetas disponibles: recomendado, nuevo, vegetariano, vegano,
     sin gluten, picante. (Si escribes otra, sale tal cual.)
     ─────────────────────────────────────────────────────────────────────── */
  carta: {
    mostrar: true,
    antetitulo: "Nuestra carta",
    titulo: "Para compartir (o no)",
    introduccion: "Platos pensados para el centro de la mesa. Pregúntanos por las sugerencias del día.",

    // Menú del día (pon mostrar: false si no tienes).
    menuDelDia: {
      mostrar: true,
      titulo: "Menú del día",
      precio: "15,90",
      detalle: "Primero, segundo, postre, pan y bebida.",
      disponibilidad: "De martes a viernes al mediodía (excepto festivos).",
    },

    categorias: [
      {
        nombre: "Para compartir",
        platos: [
          { nombre: "Croquetas de jamón ibérico (6 uds.)", descripcion: "Bechamel de leche fresca y jamón de bellota.", precio: "9,50", etiquetas: ["recomendado"] },
          { nombre: "Burrata con tomate rosa", descripcion: "Albahaca, aceite de oliva virgen extra y pan de masa madre.", precio: "12,00", etiquetas: ["vegetariano"] },
          { nombre: "Pulpo a la brasa", descripcion: "Sobre parmentier de patata ahumada y pimentón de la Vera.", precio: "18,50", etiquetas: ["sin gluten"] },
          { nombre: "Hummus de garbanzo y sésamo tostado", descripcion: "Con crudités y pan de pita del horno.", precio: "8,50", etiquetas: ["vegano"] },
          { nombre: "Pimientos de Padrón", descripcion: "Con escamas de sal. Unos pican y otros no.", precio: "7,50", etiquetas: ["vegano", "sin gluten"] },
        ],
      },
      {
        nombre: "De la brasa",
        platos: [
          { nombre: "Chuletón de vaca madurada (1 kg)", descripcion: "45 días de maduración. Ideal para dos personas.", precio: "58,00", etiquetas: ["recomendado", "sin gluten"] },
          { nombre: "Secreto ibérico", descripcion: "Con chimichurri casero y patatas asadas.", precio: "19,50", etiquetas: ["sin gluten"] },
          { nombre: "Lubina salvaje", descripcion: "Con verduras de temporada asadas al carbón.", precio: "22,00", etiquetas: ["sin gluten"] },
          { nombre: "Brocheta de verduras y halloumi", descripcion: "Con salsa de yogur, menta y limón.", precio: "14,00", etiquetas: ["vegetariano"] },
          { nombre: "Hamburguesa de la casa", descripcion: "Vaca madurada, queso Idiazábal, cebolla caramelizada y pan brioche.", precio: "15,50" },
        ],
      },
      {
        nombre: "Horno de leña",
        platos: [
          { nombre: "Pizza margarita", descripcion: "Tomate San Marzano, mozzarella fior di latte y albahaca.", precio: "12,50", etiquetas: ["vegetariano"] },
          { nombre: "Pizza de la huerta", descripcion: "Calabacín, berenjena, pimiento asado y pesto.", precio: "13,50", etiquetas: ["vegetariano", "nuevo"] },
          { nombre: "Pizza diávola", descripcion: "Sobrasada, miel de romero y guindilla.", precio: "14,50", etiquetas: ["picante"] },
          { nombre: "Bowl mediterráneo", descripcion: "Quinoa, hummus, verduras asadas, aguacate y semillas.", precio: "13,50", etiquetas: ["vegano"] },
        ],
      },
      {
        nombre: "Postres",
        platos: [
          { nombre: "Tarta de queso al horno de leña", descripcion: "Cremosa por dentro, tostada por fuera.", precio: "6,50", etiquetas: ["recomendado"] },
          { nombre: "Torrija caramelizada", descripcion: "Con helado de vainilla de Madagascar.", precio: "6,00" },
          { nombre: "Coulant de chocolate", descripcion: "Chocolate negro al 70 % y frutos rojos.", precio: "6,50" },
          { nombre: "Fruta de temporada", descripcion: "", precio: "4,50", etiquetas: ["vegano", "sin gluten"] },
        ],
      },
      {
        nombre: "Bebidas",
        platos: [
          { nombre: "Caña de cerveza", descripcion: "", precio: "2,80" },
          { nombre: "Vermut de grifo", descripcion: "Con su piel de naranja y aceituna.", precio: "3,50" },
          { nombre: "Copa de vino de Madrid", descripcion: "Tinto, blanco o rosado. Pregunta por la selección.", precio: "4,50" },
          { nombre: "Refresco o agua con gas", descripcion: "", precio: "2,80" },
          { nombre: "Café o infusión", descripcion: "", precio: "1,80" },
        ],
      },
    ],
    notaAlergenos: "Precios con IVA incluido. Si tienes alguna alergia o intolerancia, pide información a nuestro equipo.",
  },

  /* ───────────────────────────────────────────────────────────────────────
     11. HORARIO
     Escribe los turnos como "13:00-16:00". Si cierra después de medianoche,
     escribe por ejemplo "20:00-01:30". Un día sin turnos [] sale como cerrado.
     ─────────────────────────────────────────────────────────────────────── */
  horario: {
    mostrar: true,
    antetitulo: "Horario",
    titulo: "Cuándo encontrarnos",
    dias: [
      { dia: "Lunes",     turnos: [] },
      { dia: "Martes",    turnos: ["13:00-16:00", "20:00-23:30"] },
      { dia: "Miércoles", turnos: ["13:00-16:00", "20:00-23:30"] },
      { dia: "Jueves",    turnos: ["13:00-16:00", "20:00-23:30"] },
      { dia: "Viernes",   turnos: ["13:00-16:00", "20:00-00:30"] },
      { dia: "Sábado",    turnos: ["13:00-16:30", "20:00-00:30"] },
      { dia: "Domingo",   turnos: ["13:00-17:00"] },
    ],
    nota: "La cocina cierra 30 minutos antes. Festivos: consulta por WhatsApp.",
  },

  /* ───────────────────────────────────────────────────────────────────────
     12. RESEÑAS
     ─────────────────────────────────────────────────────────────────────── */
  resenas: {
    mostrar: true,
    antetitulo: "Tu opinión cuenta",
    titulo: "Déjanos tu reseña",
    texto: "Si has disfrutado de la visita, una reseña en Google nos ayuda muchísimo a que más gente nos descubra. Solo te llevará un minuto.",
    boton: "Escribir una reseña en Google",
    // Opcional: tu nota real en Google, por ejemplo "4,8" y "320".
    // Si las dejas vacías, no se muestran.
    notaMedia: "",
    numeroResenas: "",
    // Foto de fondo del bloque (opcional, se ve oscurecida).
    imagenFondo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
  },

  /* ───────────────────────────────────────────────────────────────────────
     13. TEXTOS GENERALES DE LA WEB
     Normalmente no hace falta tocarlos (salvo para traducir la web).
     ─────────────────────────────────────────────────────────────────────── */
  textos: {
    menu: {
      navegacion: "Navegación principal",
      nosotros: "Nosotros",
      carta: "Carta",
      horario: "Horario",
      ubicacion: "Ubicación",
      resenas: "Reseñas",
      abrirMenu: "Abrir menú",
      cerrarMenu: "Cerrar menú",
    },
    reservar: "Reservar",
    saltarAlContenido: "Saltar al contenido",
    // {precio} se sustituye por el número. Ejemplos: "{precio} €" o "${precio}"
    formatoPrecio: "{precio} €",
    abiertoAhora: "Abierto ahora",
    cerradoAhora: "Cerrado ahora",
    cierraA: "cierra a las {hora}",
    abreHoy: "abre hoy a las {hora}",
    abreManana: "abre mañana a las {hora}",
    abreDia: "abre el {dia} a las {hora}",
    hoy: "Hoy",
    cerrado: "Cerrado",
    llamar: "Llamar",
    comoLlegar: "Cómo llegar",
    escribirWhatsApp: "Escríbenos por WhatsApp",
    whatsappFlotante: "¿Reservamos?",
    verCartaPdf: "Descargar la carta en PDF",
    mapaTitulo: "Mapa con la ubicación",
    resenasEnGoogle: "reseñas en Google",
    siguenos: "Síguenos",
    contacto: "Contacto",
    derechos: "Todos los derechos reservados.",
    etiquetas: {
      recomendado: "Recomendado",
      nuevo: "Nuevo",
      vegetariano: "Vegetariano",
      vegano: "Vegano",
      singluten: "Sin gluten",
      picante: "Picante",
    },
  },
};
