#!/usr/bin/env node
/* ==========================================================================
   CONSTRUIR LA WEB PARA PUBLICARLA
   --------------------------------------------------------------------------
   GitHub ejecuta este script automáticamente cada vez que guardas un cambio
   (ver .github/workflows/publicar.yml). No hace falta usarlo a mano.

   Qué hace:
   1. Comprueba que config.js no tiene errores (si los tiene, NO publica y
      explica qué falla, así la web que ya funciona no se rompe).
   2. Escribe dentro de index.html el contenido, el título, la descripción,
      los datos para Google y la imagen para compartir en WhatsApp/redes.
   3. Deja todo listo en la carpeta _site, que es lo que se publica.

   Para probarlo en tu ordenador (opcional, necesita Node.js):
       node scripts/construir.js
   ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const RAIZ = path.resolve(__dirname, '..');
const SALIDA = path.join(RAIZ, '_site');
const EN_GITHUB = process.env.GITHUB_ACTIONS === 'true';

// Lo que no se publica.
const EXCLUIR = new Set(['.git', '.github', '.gitignore', '_site', 'scripts', 'node_modules', 'README.md', 'CNAME.example']);

function error(mensaje, archivo, linea) {
  if (EN_GITHUB) {
    const donde = archivo ? ` file=${archivo}${linea ? `,line=${linea}` : ''}` : '';
    console.log(`::error${donde}::${mensaje.replace(/\n/g, '%0A')}`);
  } else {
    console.error(`\n✖ ${mensaje}${archivo ? ` (${archivo}${linea ? `, línea ${linea}` : ''})` : ''}`);
  }
}

function aviso(mensaje) {
  if (EN_GITHUB) console.log(`::warning file=config.js::${mensaje}`);
  else console.warn(`⚠ ${mensaje}`);
}

function cargar(contexto, archivo) {
  const codigo = fs.readFileSync(path.join(RAIZ, archivo), 'utf8');
  try {
    new vm.Script(codigo, { filename: archivo }).runInContext(contexto);
  } catch (e) {
    const linea = (String(e.stack).match(new RegExp(archivo.replace(/[.\/]/g, '\\$&') + ':(\\d+)')) || [])[1];
    error(
      `Hay un error de escritura en ${archivo}${linea ? ` cerca de la línea ${linea}` : ''}: ${e.message}.\n` +
      'Suele ser una coma que falta al final de una línea, unas comillas sin cerrar o una llave { } borrada sin querer.',
      archivo, linea
    );
    process.exit(1);
  }
}

/** Dirección pública: config.js > archivo CNAME > dirección de GitHub Pages. */
function direccionPublica(Plantilla, config) {
  const propia = Plantilla.urlWeb(config);
  if (propia) return propia;
  const cname = path.join(RAIZ, 'CNAME');
  if (fs.existsSync(cname)) {
    const dominio = fs.readFileSync(cname, 'utf8').trim();
    if (dominio) return `https://${dominio}/`;
  }
  const repo = process.env.GITHUB_REPOSITORY;
  if (repo && repo.includes('/')) {
    const [dueno, nombre] = repo.split('/');
    const usuario = dueno.toLowerCase();
    return nombre.toLowerCase() === `${usuario}.github.io` ? `https://${usuario}.github.io/` : `https://${usuario}.github.io/${nombre}/`;
  }
  return '';
}

/** Reemplaza un bloque <!--INICIO:X-->…<!--FIN:X--> sin interpretar "$" en el contenido. */
function sustituir(html, marca, contenido) {
  const patron = new RegExp(`<!--INICIO:${marca}-->[\\s\\S]*?<!--FIN:${marca}-->`);
  if (!patron.test(html)) {
    error(`No encuentro la marca ${marca} en index.html. ¿Se ha editado ese archivo?`, 'index.html');
    process.exit(1);
  }
  return html.replace(patron, () => contenido);
}

function copiar(origen, destino) {
  for (const nombre of fs.readdirSync(origen)) {
    if (nombre === '.DS_Store' || nombre === 'Thumbs.db') continue;
    if (origen === RAIZ && EXCLUIR.has(nombre)) continue;
    const de = path.join(origen, nombre);
    const a = path.join(destino, nombre);
    if (fs.statSync(de).isDirectory()) {
      fs.mkdirSync(a, { recursive: true });
      copiar(de, a);
    } else {
      fs.copyFileSync(de, a);
    }
  }
}

function principal() {
  // 1. Cargar config.js y la plantilla en un entorno aislado.
  const contexto = vm.createContext({ window: {}, console });
  cargar(contexto, 'config.js');
  cargar(contexto, 'assets/js/plantilla.js');
  const config = contexto.window.CONFIG;
  const Plantilla = contexto.window.Plantilla;

  // 2. Comprobar config.js.
  const { errores, avisos } = Plantilla.validar(config);
  if (config) {
    for (const ruta of Plantilla.archivosLocales(config)) {
      let limpia;
      try { limpia = decodeURI(ruta.split(/[?#]/)[0]); } catch (e) { limpia = ruta; }
      if (!fs.existsSync(path.join(RAIZ, limpia))) {
        errores.push(`No encuentro el archivo «${ruta}». Comprueba que lo has subido y que el nombre coincide exactamente (mayúsculas, tildes y extensión .jpg/.png incluidas).`);
      }
    }
  }
  avisos.forEach(aviso);
  if (errores.length) {
    errores.forEach((e) => error(e, 'config.js'));
    console.log(`\nNo se ha publicado nada: corrige ${errores.length === 1 ? 'el error' : `los ${errores.length} errores`} de arriba y vuelve a guardar config.js.`);
    process.exit(1);
  }

  // 3. Generar index.html con todo el contenido ya escrito.
  const base = direccionPublica(Plantilla, config);
  const version = (process.env.GITHUB_SHA || Date.now().toString(36)).slice(0, 8);
  const idioma = String((config.web && config.web.idioma) || 'es').replace(/[^a-zA-Z-]/g, '') || 'es';

  let html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');
  html = sustituir(html, 'CABECERA', Plantilla.cabecera(config, { base }));
  html = sustituir(html, 'CUERPO', Plantilla.cuerpo(config));
  html = html.replace(/<html lang="[^"]*">/, () => `<html lang="${idioma}" data-generada>`);
  html = html.replace(/(href|src)="((?:assets\/[^"?]+)|config\.js)"/g, (m, atributo, url) => `${atributo}="${url}?v=${version}"`);

  // 4. Preparar la carpeta _site.
  fs.rmSync(SALIDA, { recursive: true, force: true });
  fs.mkdirSync(SALIDA, { recursive: true });
  copiar(RAIZ, SALIDA);
  fs.writeFileSync(path.join(SALIDA, 'index.html'), html);
  fs.writeFileSync(path.join(SALIDA, '.nojekyll'), '');

  if (base) {
    const hoy = new Date().toISOString().slice(0, 10);
    fs.writeFileSync(path.join(SALIDA, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${base}sitemap.xml\n`);
    fs.writeFileSync(path.join(SALIDA, 'sitemap.xml'),
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      `  <url><loc>${base}</loc><lastmod>${hoy}</lastmod></url>\n` +
      '</urlset>\n');
  } else {
    aviso('No sé la dirección final de la web: sin ella, las vistas previas al compartir en redes pueden no mostrar la foto. Rellena web.url en config.js si usas un dominio propio.');
  }

  console.log(`✔ Web construida en _site${base ? ` → se publicará en ${base}` : ''}`);
}

principal();
