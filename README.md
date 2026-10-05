# Web para restaurantes y bares · Plantilla lista en 10 minutos

Plantilla de web de **una sola página** para restaurantes, bares y cafeterías.
Se adapta a un negocio nuevo **editando un único archivo** (`config.js`) y se
publica **gratis** con GitHub Pages.

👉 **Ejemplo funcionando (restaurante ficticio «Brasa & Olivo»):**
https://alvaroperezdeaguado-art.github.io/web-negocios-locales/

**Qué incluye la web:**

- Portada a pantalla completa con foto, botón de reservar y aviso de **«Abierto ahora / Cerrado ahora»** calculado con el horario.
- Sección «Sobre nosotros» con puntos fuertes.
- Platos destacados con foto.
- **Carta** con categorías en pestañas, precios, etiquetas (vegano, sin gluten, picante…) y menú del día.
- **Horario** (marca el día de hoy) y **mapa** de Google con botones de «Cómo llegar» y «Llamar».
- **Botón de WhatsApp** flotante con un mensaje ya escrito.
- Bloque **«Déjanos tu reseña»** con botón directo a las reseñas de Google.
- Preparada para **Google** (título, descripción y ficha de restaurante con dirección y horario) y para que al **compartir el enlace por WhatsApp o redes** salga con foto, título y descripción.
- Pensada primero para móvil, muy ligera y sin nada que instalar.

---

## Índice

1. [Lo único que tienes que tocar: `config.js`](#1-lo-único-que-tienes-que-tocar-configjs)
2. [Crear la web de un cliente nuevo, paso a paso](#2-crear-la-web-de-un-cliente-nuevo-paso-a-paso)
3. [Cómo conseguir cada dato](#3-cómo-conseguir-cada-dato)
4. [Cambiar algo más adelante](#4-cambiar-algo-más-adelante)
5. [Si algo sale mal](#5-si-algo-sale-mal)
6. [Extras opcionales](#6-extras-opcionales)
7. [Para curiosos: cómo está hecha](#7-para-curiosos-cómo-está-hecha)

---

## 1. Lo único que tienes que tocar: `config.js`

Todo lo que se ve en la web (nombre, textos, carta, precios, horario, colores,
teléfono, enlaces…) está en el archivo **`config.js`**. No hace falta tocar
ningún otro archivo.

El archivo está ordenado igual que la web, de arriba abajo, y tiene notas
explicando cada cosa. Antes de empezar, quédate con estas **reglas de oro**:

| ✅ Haz esto | ❌ Evita esto |
|---|---|
| Cambia solo lo que está **entre comillas** `"así"` | Borrar las comas `,` del final de las líneas |
| Escribe los precios entre comillas y con coma: `"12,50"` | Borrar llaves `{ }` o corchetes `[ ]` |
| Para ocultar algo, deja las comillas vacías `""` o pon `mostrar: false` | Usar comillas dobles `"` dentro de un texto (usa «estas») |

Ejemplo: para cambiar el nombre, buscas esta línea…

```js
nombre: "Brasa & Olivo",
```

…y la dejas así:

```js
nombre: "Bar Casa Paco",
```

> **Tranquilidad:** si te equivocas al escribir, la web **no se rompe**. GitHub
> revisa `config.js` antes de publicar; si encuentra un fallo, no publica nada
> nuevo y te dice en qué línea está el problema (ver [Si algo sale mal](#5-si-algo-sale-mal)).

---

## 2. Crear la web de un cliente nuevo, paso a paso

Necesitas una cuenta gratuita de GitHub (https://github.com/signup).
Todo se hace desde el navegador.

### Paso 0 · Solo la primera vez: convertir este repositorio en plantilla

Así podrás crear copias con un clic.

1. En esta página del repositorio, pulsa **Settings** (⚙️, arriba a la derecha).
2. En la sección **General**, marca la casilla **Template repository**.

### Paso 1 · Hacer una copia para el cliente

1. Vuelve a la página principal del repositorio y pulsa el botón verde
   **Use this template** → **Create a new repository**.
2. En **Repository name** escribe un nombre corto, sin espacios ni tildes.
   Ese nombre formará parte de la dirección de la web. Por ejemplo,
   `bar-casa-paco` → `https://TU-USUARIO.github.io/bar-casa-paco/`
3. Deja marcada la opción **Public** (GitHub Pages gratis necesita que sea pública).
4. Pulsa **Create repository**.

### Paso 2 · Editar `config.js` con los datos del cliente

1. En el repositorio nuevo, pulsa sobre el archivo **`config.js`**.
2. Pulsa el **lápiz ✏️** (arriba a la derecha del archivo) para editarlo.
3. Cambia los datos. Para que te dé tiempo en 10 minutos, este es el orden
   recomendado:

   | Apartado en `config.js` | Qué cambiar | ¿Obligatorio? |
   |---|---|---|
   | `negocio` | Nombre, eslogan, tipo (Restaurante, Bar…) | Sí |
   | `contacto` | Teléfono, WhatsApp, email | Sí |
   | `ubicacion` | Dirección, código postal, ciudad, `busquedaMapa` | Sí |
   | `enlaces` | Enlace de reseñas de Google; redes sociales | Sí (reseñas) |
   | `web` | `tituloSEO` y `descripcionSEO` (lo que sale en Google) | Sí |
   | `horario` | Turnos de cada día | Sí |
   | `carta` | Categorías, platos y precios; menú del día | Sí |
   | `portada` | Foto, título y subtítulo | Recomendado |
   | `apariencia` | Colores y tipografías | Opcional |
   | `sobreNosotros`, `destacados`, `resenas` | Textos y fotos | Opcional |

4. Cuando termines, pulsa el botón verde **Commit changes…** (arriba a la
   derecha) y otra vez **Commit changes** en la ventana que aparece.

**Trucos para la carta:**

- Para **añadir un plato**, copia una línea entera de plato (de `{` a `},`) y
  pégala justo debajo; luego cambia el nombre, la descripción y el precio.
- Para **borrar un plato**, borra su línea entera.
- Para **añadir una categoría** (por ejemplo «Tapas»), copia un bloque de
  categoría completo, desde `{ nombre: "...",` hasta su `},` final.
- Etiquetas disponibles: `"recomendado"`, `"nuevo"`, `"vegetariano"`,
  `"vegano"`, `"sin gluten"`, `"picante"`. Si escribes otra, sale tal cual.

**Trucos para el horario:**

- Escribe cada turno como `"13:00-16:00"`. Si hay dos turnos: `["13:00-16:00", "20:00-23:30"]`.
- Si cierra después de medianoche, escríbelo tal cual: `"20:00-02:00"`.
- Día cerrado: deja los corchetes vacíos `[]`.
- No cambies el orden de los días (siempre de lunes a domingo).

### Paso 3 · (Opcional) Poner las fotos del cliente

Puedes usar fotos de dos formas:

- **Subirlas al repositorio (recomendado):** entra en la carpeta **`fotos`**,
  pulsa **Add file → Upload files**, arrastra las fotos y pulsa
  **Commit changes**. Luego, en `config.js`, escribe la ruta, por ejemplo
  `imagen: "fotos/portada.jpg",`
- **Pegar un enlace** a una foto de internet (que empiece por `https://`).
  Las fotos de ejemplo vienen de [Unsplash](https://unsplash.com), un banco de
  fotos gratuito: si eliges otra allí, haz clic derecho sobre ella →
  «Copiar dirección de imagen» y pégala.

Consejos: nombres sin espacios ni tildes (`plato-1.jpg`), las mayúsculas
cuentan, y mejor fotos de menos de 400 KB (puedes reducirlas gratis en
https://squoosh.app). La foto de la portada debe ser **horizontal**.

### Paso 4 · Activar GitHub Pages (solo la primera vez)

Cada vez que guardas un cambio, GitHub prepara la web automáticamente (tarda
1 o 2 minutos). La primera vez, además, hay que decirle dónde publicarla:

1. Pulsa la pestaña **Actions** del repositorio y espera a que aparezca un
   **✓ verde** junto a «Publicar la web». (Si ves un círculo amarillo, aún
   está trabajando. Si ves una ✗ roja, mira [Si algo sale mal](#5-si-algo-sale-mal).)
2. Ve a **Settings → Pages** (en el menú de la izquierda).
3. En **Build and deployment → Source** elige **Deploy from a branch**.
4. En **Branch** elige **`gh-pages`** y la carpeta **`/ (root)`**. Pulsa **Save**.
5. Espera 1 o 2 minutos y recarga la página: arriba aparecerá
   **«Your site is live at…»** con la dirección de la web. ¡Listo! 🎉

La dirección será: `https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/`

### Paso 5 · Comprobar que todo funciona

Abre la web en el móvil y revisa:

- [ ] El botón de **WhatsApp** abre una conversación con el número correcto.
- [ ] El botón **Llamar** marca el teléfono correcto.
- [ ] El **mapa** señala el sitio correcto y «Cómo llegar» funciona.
- [ ] El botón de **reseñas** abre la ventana para escribir una reseña del negocio.
- [ ] El **horario** y el aviso «Abierto ahora / Cerrado ahora» cuadran.
- [ ] Al pegar el enlace en un chat de WhatsApp sale la foto y el título
      (la primera vez puede tardar unos minutos).

---

## 3. Cómo conseguir cada dato

### Enlace para dejar reseñas en Google

El negocio necesita tener su **Perfil de Empresa de Google** (la ficha que
sale en Google Maps).

1. Entra con la cuenta de Google que gestiona el negocio y busca en Google el
   nombre del negocio. Aparecerá el panel de gestión del perfil.
2. Pulsa **«Pedir reseñas»** (o «Conseguir más reseñas»).
3. Copia el enlace que aparece (es parecido a `https://g.page/r/XXXXXXXX/review`).
4. Pégalo en `config.js`, en `enlaces` → `resenasGoogle`.

Si no tienes acceso al perfil: busca el negocio en Google Maps, pulsa
**Compartir → Copiar enlace** y pégalo. Funciona igual, aunque el cliente
tendrá que pulsar un paso más para escribir la reseña.

### Número de WhatsApp

Prefijo del país + número, todo junto, **sin `+`, sin espacios y sin guiones**.

| Número | Cómo se escribe en `config.js` |
|---|---|
| +34 612 34 56 78 (España) | `"34612345678"` |
| +52 55 1234 5678 (México) | `"525512345678"` |
| +54 9 11 1234-5678 (Argentina) | `"5491112345678"` |

En `mensajeWhatsApp` puedes poner el mensaje que aparecerá ya escrito.

### Que el mapa marque el sitio exacto

Normalmente basta con escribir bien `busquedaMapa` (nombre del negocio +
dirección completa). Si el punto no sale exacto:

1. Busca el negocio en https://www.google.com/maps
2. Pulsa **Compartir → Insertar un mapa → Copiar HTML**.
3. Pégalo en `config.js` → `ubicacion` → `mapaPersonalizado`, **entre las
   comillas simples** `'…'` que ya hay.

### Colores

En `apariencia` → `colores`. Se escriben en formato `#RRGGBB`.
Puedes elegirlos en https://htmlcolorcodes.com/es/ (copia el código que empieza
por `#`). Truco: coge el color principal del logo o del toldo del local.

Asegúrate de que el texto se lee bien: `texto` debe ser oscuro si `fondo` es
claro, y `textoSobrePrincipal` debe contrastar con `principal`.

### Tipografías

En `apariencia` → `tipografias`. Elige cualquier fuente de
https://fonts.google.com y escribe su nombre exacto. Algunas combinaciones
que quedan bien:

| Estilo | `titulos` | `texto` |
|---|---|---|
| Elegante (el del ejemplo) | `"Fraunces"` | `"DM Sans"` |
| Clásico | `"Playfair Display"` | `"Lato"` |
| Moderno | `"Outfit"` | `"Inter"` |
| Bar desenfadado | `"Bricolage Grotesque"` | `"Manrope"` |
| Cafetería | `"Lora"` | `"Nunito Sans"` |

### Iconos de «Sobre nosotros»

Disponibles: `fuego`, `hoja`, `copa`, `corazon`, `chef`, `cafe`, `cerveza`,
`pescado`, `pizza`, `cubiertos`, `grupo`, `sol`, `estrella`, `reloj`.
También puedes poner un emoji, por ejemplo `icono: "🍷"`.

---

## 4. Cambiar algo más adelante

Edita `config.js` en GitHub (lápiz ✏️ → cambios → **Commit changes**) y espera
1 o 2 minutos. La web se actualiza sola. Si no ves el cambio, recarga la página
del navegador forzándolo (en el móvil, cierra la pestaña y vuelve a abrirla).

### Ver los cambios en tu ordenador antes de publicarlos (opcional)

1. En la página del repositorio pulsa **Code → Download ZIP** y descomprímelo.
2. Abre `config.js` con un editor de texto (por ejemplo el Bloc de notas o,
   mejor, [Visual Studio Code](https://code.visualstudio.com/), que es gratis
   y colorea el archivo para que se vea más claro).
3. Haz doble clic en `index.html`: se abre la web en el navegador.
   Cada vez que guardes `config.js`, recarga la página para ver el cambio.

---

## 5. Si algo sale mal

**Guardé un cambio y la web no cambia / aparece una ✗ roja en Actions.**
Casi siempre es un error de escritura en `config.js`. La web anterior sigue
funcionando mientras tanto.

1. Pulsa la pestaña **Actions** y luego en la ejecución con la ✗ roja.
2. Verás el mensaje en español con la **línea** donde está el problema, por
   ejemplo: *«Hay un error de escritura en config.js cerca de la línea 30»*.
3. Abre `config.js`, ve a esa línea (o a la de justo encima) y revisa:
   - ¿Falta una **coma** al final de la línea anterior?
   - ¿Hay unas **comillas** sin cerrar?
   - ¿Se ha borrado una **llave** `{ }` o un **corchete** `[ ]`?
4. Corrígelo y guarda (**Commit changes**). Se vuelve a intentar sola.

Otros mensajes que pueden salir:

- *«No encuentro el archivo fotos/…»*: la foto no está subida o el nombre no
  coincide exactamente (mayúsculas, tildes, `.jpg` / `.jpeg` / `.png`).
- *«No entiendo el horario…»*: escribe el turno así: `"13:00-16:00"`.
- Los **avisos amarillos** (⚠) no impiden publicar; son solo sugerencias.

**En la pestaña Settings → Pages no aparece la rama `gh-pages`.**
Todavía no se ha publicado ninguna vez. Haz cualquier cambio en `config.js`,
guárdalo, espera al ✓ verde en **Actions** y vuelve a mirar.

**La pestaña Actions dice que los «workflows» están desactivados.**
Pulsa el botón verde **I understand my workflows, go ahead and enable them**.

**Al compartir el enlace por WhatsApp no sale la foto.**
WhatsApp guarda la vista previa un tiempo. Prueba a compartirlo pasados unos
minutos o añadiendo `?v=2` al final del enlace.

**Una foto no se ve (sale un fondo de color en su lugar).**
El enlace de la foto ya no funciona. Sube la foto a la carpeta `fotos` y usa
la ruta `fotos/nombre.jpg`.

---

## 6. Extras opcionales

### Usar un dominio propio (por ejemplo `www.barcasapaco.es`)

1. Compra el dominio en cualquier proveedor (Dinahosting, IONOS, GoDaddy…).
2. En el repositorio, pulsa **Add file → Create new file**, llama al archivo
   **`CNAME`** (en mayúsculas, sin extensión) y escribe dentro solo el dominio:
   `www.barcasapaco.es`. Guarda con **Commit changes**.
3. En el panel de tu proveedor de dominio crea un registro **CNAME** para
   `www` que apunte a `TU-USUARIO.github.io`.
4. En **Settings → Pages**, escribe el dominio en **Custom domain**, guarda y,
   cuando lo permita, marca **Enforce HTTPS**.
5. En `config.js` → `web` → `url`, escribe `"https://www.barcasapaco.es/"`.

Guía oficial: https://docs.github.com/es/pages/configuring-a-custom-domain-for-your-github-pages-site

### Que Google encuentre la web antes

Da de alta la web en [Google Search Console](https://search.google.com/search-console)
y envía el mapa del sitio: `https://TU-WEB/sitemap.xml` (se crea solo).
Y, sobre todo, pon el enlace de la web en el **Perfil de Empresa de Google**
del negocio: es lo que más ayuda en búsquedas locales.

### Carta en PDF

Sube el PDF a la carpeta `fotos` y escribe en `config.js` → `enlaces` →
`cartaPdf`: `"fotos/carta.pdf"`. Aparecerá un botón debajo de la carta.

### Reservas con otra plataforma

Si el negocio usa TheFork, CoverManager, etc., pega su enlace en `enlaces` →
`reservas`. Los botones de «Reservar» irán allí en vez de a WhatsApp (el botón
flotante de WhatsApp se mantiene).

---

## 7. Para curiosos: cómo está hecha

HTML, CSS y JavaScript sencillos, sin frameworks ni dependencias.

```
config.js                    ← ÚNICO archivo a editar
index.html                   ← estructura base (no tocar)
fotos/                       ← fotos, logo y PDF del negocio
assets/css/estilos.css       ← diseño (mobile-first)
assets/js/plantilla.js       ← convierte config.js en HTML
assets/js/app.js             ← menú móvil, pestañas, «abierto ahora», animaciones
scripts/construir.js         ← valida config.js y genera la versión publicada
.github/workflows/publicar.yml ← publica en la rama gh-pages en cada cambio
```

- **En tu ordenador** (doble clic en `index.html`), la página se dibuja en el
  navegador leyendo `config.js`.
- **Al publicar**, GitHub Actions ejecuta `scripts/construir.js`, que comprueba
  `config.js` y escribe el contenido directamente en el HTML, junto con las
  etiquetas para Google y redes sociales (Open Graph, Twitter Card), los datos
  estructurados de Schema.org (tipo de negocio, dirección, horario, precios),
  `sitemap.xml` y `robots.txt`. Así la web carga más rápido, Google la lee
  completa y las vistas previas de WhatsApp funcionan.
- Las fotos de Unsplash se piden al tamaño justo para cada pantalla y en
  formatos modernos (WebP/AVIF). Todo lo que no se ve al entrar se carga solo
  cuando hace falta (fotos y mapa).
- Accesible: navegable con teclado, textos alternativos en las fotos,
  contraste cuidado y animaciones desactivadas si el usuario lo prefiere.

Para generar la versión publicada en tu ordenador (necesita
[Node.js](https://nodejs.org)): `node scripts/construir.js` → carpeta `_site`.

---

*Las fotos de ejemplo son de [Unsplash](https://unsplash.com/license) (uso
gratuito). «Brasa & Olivo» es un restaurante inventado: sus datos de contacto
son de ejemplo.*
