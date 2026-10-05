/* ==========================================================================
   Comportamiento de la web: menú móvil, pestañas de la carta, «Abierto
   ahora», animaciones al hacer scroll… No hace falta tocar este archivo.
   ========================================================================== */
(function () {
  'use strict';

  var raiz = document.documentElement;
  var config = window.CONFIG;
  var Plantilla = window.Plantilla;

  if (!config || !Plantilla) return mostrarError();

  // En la vista previa (sin publicar) la página se dibuja aquí mismo.
  // En la web publicada ya viene dibujada y solo se activan los detalles.
  if (!raiz.hasAttribute('data-generada')) {
    try {
      Plantilla.montar(config, document);
    } catch (e) {
      return mostrarError(e);
    }
    var revision = Plantilla.validar(config);
    revision.errores.concat(revision.avisos).forEach(function (m) { console.warn('[config.js] ' + m); });
  }

  iniciarCabecera();
  iniciarMenu();
  iniciarPestanas();
  iniciarEstado();
  iniciarRevelado();
  var anio = document.querySelector('[data-anio]');
  if (anio) anio.textContent = new Date().getFullYear();

  /* La cabecera se vuelve sólida al bajar ------------------------------- */
  function iniciarCabecera() {
    var cabecera = document.querySelector('[data-cabecera]');
    if (!cabecera) return;
    var pendiente = false;
    function actualizar() {
      pendiente = false;
      cabecera.classList.toggle('cabecera--solida', window.scrollY > 40);
    }
    window.addEventListener('scroll', function () {
      if (!pendiente) { pendiente = true; requestAnimationFrame(actualizar); }
    }, { passive: true });
    actualizar();
  }

  /* Menú del móvil ------------------------------------------------------- */
  function iniciarMenu() {
    var boton = document.querySelector('[data-nav-boton]');
    var nav = document.getElementById('nav');
    if (!boton || !nav) return;

    function cambiar(abrir) {
      raiz.classList.toggle('menu-abierto', abrir);
      boton.setAttribute('aria-expanded', String(abrir));
      boton.setAttribute('aria-label', abrir ? boton.getAttribute('data-cerrar') : boton.getAttribute('data-abrir'));
    }
    boton.addEventListener('click', function () {
      cambiar(!raiz.classList.contains('menu-abierto'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) cambiar(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && raiz.classList.contains('menu-abierto')) { cambiar(false); boton.focus(); }
    });
    window.matchMedia('(min-width: 900px)').addEventListener('change', function (m) {
      if (m.matches) cambiar(false);
    });
  }

  /* Pestañas de la carta ------------------------------------------------- */
  function iniciarPestanas() {
    var pestanas = Array.prototype.slice.call(document.querySelectorAll('.carta__pestanas [role="tab"]'));
    if (!pestanas.length) return;
    var paneles = pestanas.map(function (p) { return document.getElementById(p.getAttribute('aria-controls')); });

    function activar(indice, enfocar) {
      pestanas.forEach(function (p, i) {
        var activa = i === indice;
        p.setAttribute('aria-selected', String(activa));
        p.tabIndex = activa ? 0 : -1;
        if (paneles[i]) paneles[i].hidden = !activa;
      });
      if (enfocar) pestanas[indice].focus();
      var barra = pestanas[indice].parentNode;
      var p = pestanas[indice];
      barra.scrollTo({ left: p.offsetLeft - (barra.clientWidth - p.offsetWidth) / 2, behavior: 'smooth' });
    }

    pestanas.forEach(function (p, i) {
      p.addEventListener('click', function () { activar(i); });
      p.addEventListener('keydown', function (e) {
        var destino = null;
        if (e.key === 'ArrowRight') destino = (i + 1) % pestanas.length;
        if (e.key === 'ArrowLeft') destino = (i - 1 + pestanas.length) % pestanas.length;
        if (e.key === 'Home') destino = 0;
        if (e.key === 'End') destino = pestanas.length - 1;
        if (destino !== null) { e.preventDefault(); activar(destino, true); }
      });
    });
    activar(0);
  }

  /* «Abierto ahora» y el día de hoy en el horario ------------------------- */
  function iniciarEstado() {
    function pintar() {
      var estado = Plantilla.estadoAhora(config, new Date());
      if (!estado) return;
      document.querySelectorAll('[data-estado]').forEach(function (el) {
        el.hidden = false;
        el.classList.toggle('estado--abierto', estado.abierto);
        el.querySelector('[data-estado-texto]').textContent = estado.texto;
      });
      document.querySelectorAll('[data-dia]').forEach(function (fila) {
        fila.classList.toggle('hoy', Number(fila.getAttribute('data-dia')) === estado.hoy);
      });
    }
    pintar();
    setInterval(pintar, 60 * 1000);
  }

  /* Aparición suave de los bloques al hacer scroll ------------------------ */
  function iniciarRevelado() {
    var elementos = document.querySelectorAll('.revelar');
    var sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window) || sinMovimiento) {
      elementos.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          observador.unobserve(entrada.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    elementos.forEach(function (el) { observador.observe(el); });
  }

  /* Si config.js tiene un error, se explica en pantalla ------------------ */
  function mostrarError(error) {
    var detalles = (window.erroresConfig || []).map(function (e) {
      return e.mensaje + (e.linea ? ' (línea ' + e.linea + ')' : '');
    });
    if (error) detalles.push(String(error.message || error));
    var app = document.getElementById('app');
    if (!app) return;
    app.innerHTML =
      '<div class="error-config">' +
        '<h1>No se ha podido mostrar la web</h1>' +
        '<p>Hay un error de escritura en <strong>config.js</strong>. Suele ser una coma que falta al final de una línea, unas comillas sin cerrar o una llave <code>{ }</code> borrada sin querer.</p>' +
        (detalles.length ? '<pre></pre>' : '<p>Revisa los últimos cambios que hiciste en config.js.</p>') +
      '</div>';
    if (detalles.length) app.querySelector('pre').textContent = detalles.join('\n');
  }
})();
