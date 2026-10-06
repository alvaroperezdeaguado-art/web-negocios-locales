/* ==========================================================================
   Motion graphics de la web: barra de progreso, títulos que aparecen palabra
   a palabra, parallax y chispas en la portada, tarjetas en 3D, botones
   magnéticos, cinta de platos, precios que cuentan… No hace falta tocar este
   archivo. Se desactiva con «apariencia.animaciones: false» en config.js y
   también si el visitante tiene activado «reducir movimiento» en su móvil.
   ========================================================================== */
(function () {
  'use strict';

  var config = window.CONFIG || {};
  var raiz = document.documentElement;
  var apariencia = config.apariencia || {};
  var sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (apariencia.animaciones === false || sinMovimiento || !document.querySelector('.portada, .seccion')) return;

  var punteroFino = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  raiz.classList.add('mov');

  barraProgreso();
  partirEnPalabras(document.querySelector('.portada__titulo'), true);
  document.querySelectorAll('.titulo-seccion').forEach(function (t) {
    if (t.closest('.revelar')) partirEnPalabras(t, false);
  });
  cintaPlatos();
  parallaxPortada();
  if (apariencia.chispas !== false) chispas();
  contadores();
  indicadorPestanas();
  if (punteroFino) {
    document.querySelectorAll('.plato-foto, .punto').forEach(inclinar);
    document.querySelectorAll('.portada__botones .boton, .resenas .boton').forEach(magnetico);
  }

  /* Un único bucle de scroll para todo ---------------------------------- */
  function alHacerScroll(fn) {
    var pendiente = false;
    window.addEventListener('scroll', function () {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(function () { pendiente = false; fn(window.scrollY); });
    }, { passive: true });
    fn(window.scrollY);
  }

  /* Barra fina arriba que se llena al bajar ------------------------------ */
  function barraProgreso() {
    var barra = document.createElement('div');
    barra.className = 'progreso';
    barra.setAttribute('aria-hidden', 'true');
    document.body.appendChild(barra);
    alHacerScroll(function (y) {
      var total = document.documentElement.scrollHeight - window.innerHeight;
      barra.style.transform = 'scaleX(' + (total > 0 ? Math.min(1, y / total) : 0) + ')';
    });
  }

  /* Títulos que suben palabra a palabra, como en un tráiler -------------- */
  function partirEnPalabras(titulo, alCargar) {
    if (!titulo || titulo.querySelector('.palabra')) return;
    var texto = titulo.textContent.trim();
    titulo.setAttribute('aria-label', texto);
    titulo.textContent = '';
    texto.split(/\s+/).forEach(function (palabra, i) {
      var caja = document.createElement('span');
      caja.className = 'palabra';
      caja.setAttribute('aria-hidden', 'true');
      var dentro = document.createElement('span');
      dentro.textContent = palabra;
      dentro.style.setProperty('--p', i);
      caja.appendChild(dentro);
      titulo.appendChild(caja);
      titulo.appendChild(document.createTextNode(' '));
    });
    titulo.classList.add(alCargar ? 'titulo-animado--ya' : 'titulo-animado');
  }

  /* Cinta infinita con los platos y puntos fuertes bajo la portada ------- */
  function cintaPlatos() {
    var portada = document.querySelector('.portada');
    var textos = [];
    ((config.destacados || {}).platos || []).forEach(function (p) { if (p && p.nombre) textos.push(p.nombre); });
    ((config.sobreNosotros || {}).puntosFuertes || []).forEach(function (p) { if (p && p.titulo) textos.push(p.titulo); });
    if (!portada || textos.length < 2) return;

    var cinta = document.createElement('div');
    cinta.className = 'cinta';
    cinta.setAttribute('aria-hidden', 'true');
    var pista = document.createElement('div');
    pista.className = 'cinta__pista';
    // Se repite el grupo para que el bucle no tenga cortes.
    for (var r = 0; r < 4; r++) {
      textos.forEach(function (t) {
        var item = document.createElement('span');
        item.className = 'cinta__item';
        item.textContent = t;
        pista.appendChild(item);
      });
    }
    pista.style.setProperty('--duracion', Math.max(20, textos.length * 6) + 's');
    cinta.appendChild(pista);
    portada.parentNode.insertBefore(cinta, portada.nextSibling);
  }

  /* Parallax: la foto de portada baja más lenta y el texto se desvanece --- */
  function parallaxPortada() {
    var portada = document.querySelector('.portada');
    var fondo = document.querySelector('.portada__fondo');
    var contenido = document.querySelector('.portada__contenido');
    if (!portada || !fondo) return;
    alHacerScroll(function (y) {
      var alto = portada.offsetHeight || window.innerHeight;
      if (y > alto) return;
      var avance = y / alto;
      fondo.style.transform = 'translate3d(0,' + (y * 0.35).toFixed(1) + 'px,0)';
      if (contenido) {
        contenido.style.transform = 'translate3d(0,' + (y * -0.12).toFixed(1) + 'px,0)';
        contenido.style.opacity = String(Math.max(0, 1 - avance * 1.4).toFixed(3));
      }
    });
  }

  /* Chispas de brasa subiendo sobre la foto de portada -------------------- */
  function chispas() {
    var portada = document.querySelector('.portada');
    if (!portada || !window.HTMLCanvasElement) return;
    var lienzo = document.createElement('canvas');
    lienzo.className = 'portada__chispas';
    lienzo.setAttribute('aria-hidden', 'true');
    portada.appendChild(lienzo);
    var ctx = lienzo.getContext('2d');
    if (!ctx) return;

    var color = getComputedStyle(raiz).getPropertyValue('--c-principal').trim() || '#A8432A';
    var ppp = Math.min(window.devicePixelRatio || 1, 2);
    var ancho = 0, alto = 0, particulas = [], activo = true, ultimo = 0;

    function medir() {
      ancho = portada.offsetWidth; alto = portada.offsetHeight;
      lienzo.width = ancho * ppp; lienzo.height = alto * ppp;
      ctx.setTransform(ppp, 0, 0, ppp, 0, 0);
      var cuantas = Math.round(Math.min(70, ancho / 18));
      particulas = [];
      for (var i = 0; i < cuantas; i++) particulas.push(nueva(true));
    }
    function nueva(enCualquierSitio) {
      return {
        x: Math.random() * ancho,
        y: enCualquierSitio ? Math.random() * alto : alto + 10,
        r: 0.6 + Math.random() * 1.8,
        v: 0.25 + Math.random() * 0.7,
        fase: Math.random() * Math.PI * 2,
        vida: 0.35 + Math.random() * 0.65
      };
    }
    function dibujar(t) {
      if (!activo) return;
      requestAnimationFrame(dibujar);
      if (t - ultimo < 30) return; // ~30 fps es suficiente y ahorra batería
      ultimo = t;
      ctx.clearRect(0, 0, ancho, alto);
      ctx.globalCompositeOperation = 'lighter';
      particulas.forEach(function (p, i) {
        p.y -= p.v;
        p.x += Math.sin(t / 900 + p.fase) * 0.35;
        var altura = p.y / alto;
        if (p.y < -10) { particulas[i] = nueva(false); return; }
        var brillo = Math.max(0, Math.min(1, altura)) * p.vida * (0.6 + 0.4 * Math.sin(t / 220 + p.fase));
        ctx.globalAlpha = brillo;
        ctx.fillStyle = p.r > 1.6 ? color : '#FFB46B';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }
    medir();
    window.addEventListener('resize', medir);
    // Se pausa cuando la portada no se ve.
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        var antes = activo;
        activo = e[0].isIntersecting;
        if (activo && !antes) requestAnimationFrame(dibujar);
      }).observe(portada);
    }
    requestAnimationFrame(dibujar);
  }

  /* Precios que cuentan desde cero cuando aparecen ------------------------ */
  function contadores() {
    var precios = document.querySelectorAll('.precio, .menu-dia__precio');
    if (!precios.length || !('IntersectionObserver' in window)) return;
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        observador.unobserve(e.target);
        contar(e.target);
      });
    }, { threshold: 0.6 });
    precios.forEach(function (p) { observador.observe(p); });
  }
  function contar(el) {
    var original = el.textContent;
    var m = original.match(/(\d+)([.,](\d+))?/);
    if (!m) return;
    var decimales = m[3] ? m[3].length : 0;
    var separador = m[2] ? m[2].charAt(0) : '';
    var final = parseFloat(m[1] + (m[3] ? '.' + m[3] : ''));
    var inicio = null, dura = 1100;
    el.setAttribute('aria-label', original);
    function paso(t) {
      if (inicio === null) inicio = t;
      var k = Math.min(1, (t - inicio) / dura);
      var suave = 1 - Math.pow(1 - k, 4);
      var n = (final * suave).toFixed(decimales);
      if (separador) n = n.replace('.', separador);
      el.textContent = original.replace(m[0], n);
      if (k < 1) requestAnimationFrame(paso); else el.textContent = original;
    }
    requestAnimationFrame(paso);
  }

  /* Píldora que se desliza entre las pestañas de la carta ----------------- */
  function indicadorPestanas() {
    var barra = document.querySelector('.carta__pestanas');
    if (!barra) return;
    var pildora = document.createElement('span');
    pildora.className = 'pestanas__pildora';
    pildora.setAttribute('aria-hidden', 'true');
    barra.insertBefore(pildora, barra.firstChild);
    barra.classList.add('con-pildora');
    function colocar() {
      var activa = barra.querySelector('[aria-selected="true"]');
      if (!activa) return;
      pildora.style.width = activa.offsetWidth + 'px';
      pildora.style.height = activa.offsetHeight + 'px';
      pildora.style.transform = 'translate(' + activa.offsetLeft + 'px,' + activa.offsetTop + 'px)';
    }
    new MutationObserver(colocar).observe(barra, { attributes: true, subtree: true, attributeFilter: ['aria-selected'] });
    window.addEventListener('resize', colocar);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(colocar);
    colocar();
  }

  /* Tarjetas que se inclinan en 3D siguiendo el ratón --------------------- */
  function inclinar(el) {
    el.classList.add('inclinable');
    var marco = 0;
    el.addEventListener('pointermove', function (e) {
      cancelAnimationFrame(marco);
      marco = requestAnimationFrame(function () {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--rx', (y * -7).toFixed(2) + 'deg');
        el.style.setProperty('--ry', (x * 9).toFixed(2) + 'deg');
        el.style.setProperty('--gx', ((x + 0.5) * 100).toFixed(1) + '%');
        el.style.setProperty('--gy', ((y + 0.5) * 100).toFixed(1) + '%');
      });
    });
    el.addEventListener('pointerleave', function () {
      cancelAnimationFrame(marco);
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  }

  /* Botones que «atraen» el cursor --------------------------------------- */
  function magnetico(boton) {
    boton.classList.add('magnetico');
    boton.addEventListener('pointermove', function (e) {
      var r = boton.getBoundingClientRect();
      var x = e.clientX - (r.left + r.width / 2);
      var y = e.clientY - (r.top + r.height / 2);
      boton.style.transform = 'translate(' + (x * 0.25).toFixed(1) + 'px,' + (y * 0.35).toFixed(1) + 'px)';
    });
    boton.addEventListener('pointerleave', function () { boton.style.transform = ''; });
  }
})();
