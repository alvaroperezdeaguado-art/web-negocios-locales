/* ==========================================================================
   PLANTILLA · convierte config.js en el HTML de la web.
   La usan el navegador (assets/js/app.js) y el script de publicación
   (scripts/construir.js). Para personalizar la web NO hace falta tocar
   este archivo: todo se cambia en config.js.
   ========================================================================== */
(function (global) {
  'use strict';

  /* ---------- Textos por defecto (por si falta alguno en config.js) ------ */
  var TEXTOS = {
    menu: {
      navegacion: 'Navegación principal', nosotros: 'Nosotros', carta: 'Carta', horario: 'Horario',
      ubicacion: 'Ubicación', resenas: 'Reseñas', abrirMenu: 'Abrir menú', cerrarMenu: 'Cerrar menú'
    },
    reservar: 'Reservar',
    saltarAlContenido: 'Saltar al contenido',
    formatoPrecio: '{precio} €',
    abiertoAhora: 'Abierto ahora',
    cerradoAhora: 'Cerrado ahora',
    cierraA: 'cierra a las {hora}',
    abreHoy: 'abre hoy a las {hora}',
    abreManana: 'abre mañana a las {hora}',
    abreDia: 'abre el {dia} a las {hora}',
    hoy: 'Hoy',
    cerrado: 'Cerrado',
    llamar: 'Llamar',
    comoLlegar: 'Cómo llegar',
    escribirWhatsApp: 'Escríbenos por WhatsApp',
    whatsappFlotante: '¿Reservamos?',
    verCartaPdf: 'Descargar la carta en PDF',
    mapaTitulo: 'Mapa con la ubicación',
    resenasEnGoogle: 'reseñas en Google',
    siguenos: 'Síguenos',
    contacto: 'Contacto',
    derechos: 'Todos los derechos reservados.',
    etiquetas: {
      recomendado: 'Recomendado', nuevo: 'Nuevo', vegetariano: 'Vegetariano',
      vegano: 'Vegano', singluten: 'Sin gluten', picante: 'Picante'
    }
  };

  var COLORES = {
    principal: '#A8432A', textoSobrePrincipal: '#FFFFFF', secundario: '#5B6B3A',
    fondo: '#FBF6EF', fondoAlterno: '#F3EADF', texto: '#2A211C', oscuro: '#1F1915'
  };

  var DIAS_SCHEMA = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  /* ---------- Iconos (SVG en línea, sin peticiones extra) ---------------- */
  var TRAZOS = {
    fuego: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    hoja: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    copa: '<path d="M8 22h8M7 10h10M12 15v7M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/>',
    corazon: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    chef: '<path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><path d="M6 17h12"/>',
    cafe: '<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v2M10 2v2M14 2v2"/>',
    cerveza: '<path d="M17 11h1a3 3 0 0 1 0 6h-1"/><path d="M9 12v6M13 12v6"/><path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z"/><path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"/>',
    pescado: '<path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/><path d="M18 12v.5"/><path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"/>',
    pizza: '<path d="M15 11h.01M11 15h.01M16 16h.01M2 16l20 6-6-20A20 20 0 0 0 2 16"/><path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4"/>',
    cubiertos: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    grupo: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    estrella: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
    reloj: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    mapa: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    telefono: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    ruta: '<path d="M3 11l19-9-9 19-2-8-8-2z"/>',
    correo: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    documento: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6M16 13H8M16 17H8"/>',
    flecha: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    abajo: '<path d="m6 9 6 6 6-6"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    tiktok: '<path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>',
    externo: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'
  };

  var ICONO_WHATSAPP = '<svg class="icono" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.57-.34m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41z"/></svg>';

  var ICONO_GOOGLE = '<svg class="icono" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.65 4.66-6.08 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.05 6.05 29.27 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20c0-1.34-.14-2.65-.4-3.9z"/><path fill="#FF3D00" d="m6.3 14.7 6.57 4.82C14.66 15.11 18.96 12 24 12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.05 6.05 29.27 4 24 4 16.32 4 9.66 8.34 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.17 0 9.86-1.98 13.41-5.19l-6.19-5.24A11.91 11.91 0 0 1 24 36c-5.2 0-9.62-3.32-11.28-7.95l-6.52 5.02C9.5 39.56 16.23 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3a12.04 12.04 0 0 1-4.09 5.57l6.19 5.24C36.97 39.2 44 34 44 24c0-1.34-.14-2.65-.4-3.9z"/></svg>';

  var ICONO_ESTRELLA = '<svg class="icono" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.53L12 17.5l-5.87 3.07 1.12-6.53L2.5 9.41l6.56-.95L12 2.5z"/></svg>';

  /* ---------- Utilidades -------------------------------------------------- */
  function esc(valor) {
    return String(valor == null ? '' : valor)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function lleno(v) { return v != null && String(v).trim() !== ''; }
  function obj(v) { return v && typeof v === 'object' ? v : {}; }
  function lista(v) { return Array.isArray(v) ? v : []; }
  function visible(seccion) { return !!seccion && seccion.mostrar !== false; }
  function rellenar(texto, datos) {
    return String(texto == null ? '' : texto).replace(/\{(\w+)\}/g, function (m, clave) {
      return datos[clave] != null ? datos[clave] : m;
    });
  }
  function normalizar(texto) {
    return String(texto).toLowerCase().normalize('NFD')
      .replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
  }
  function dos(n) { return (n < 10 ? '0' : '') + n; }

  /** Lee un texto de config.textos (con valor por defecto si falta). */
  function T(c, ruta) {
    var partes = ruta.split('.');
    var propio = obj(c.textos), defecto = TEXTOS;
    for (var i = 0; i < partes.length; i++) {
      propio = propio == null ? undefined : propio[partes[i]];
      defecto = defecto == null ? undefined : defecto[partes[i]];
    }
    return lleno(propio) ? String(propio) : (defecto == null ? '' : String(defecto));
  }

  function icono(nombre, clase) {
    var trazo = TRAZOS[normalizar(nombre || '')];
    if (!trazo) return '';
    return '<svg class="icono' + (clase ? ' ' + clase : '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + trazo + '</svg>';
  }

  /** Solo deja pasar enlaces http(s), mailto, tel, anclas y rutas relativas. */
  function enlaceSeguro(url) {
    var u = String(url || '').trim();
    if (!u) return '';
    if (/^(https?:|mailto:|tel:|#)/i.test(u)) return u;
    if (/^[a-z][a-z0-9+.-]*:/i.test(u)) return '';
    return u;
  }

  function color(valor, clave) {
    return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(String(valor || '').trim()) ? String(valor).trim() : COLORES[clave];
  }

  function fuente(nombre, defecto) {
    var limpio = String(nombre || '').replace(/[^\p{L}\p{N} ]/gu, '').trim();
    return limpio || defecto;
  }

  /* ---------- Datos derivados --------------------------------------------- */
  function precio(c, valor) {
    if (valor == null || valor === '') return '';
    var texto;
    if (typeof valor === 'number') {
      texto = valor.toLocaleString(obj(c.web).idioma || 'es', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
      texto = String(valor).trim();
    }
    if (/^[\d\s.,]+$/.test(texto)) return rellenar(T(c, 'formatoPrecio'), { precio: texto });
    return texto;
  }

  var RE_TURNO = /^\s*(\d{1,2})(?:\s*[:.h]\s*(\d{2}))?\s*h?\s*(?:-|–|—|a|hasta)\s*(\d{1,2})(?:\s*[:.h]\s*(\d{2}))?\s*h?\s*$/i;

  /** "13:00-16:00" → { inicio: 780, fin: 960 } (minutos desde las 00:00). */
  function leerTurno(texto) {
    var m = RE_TURNO.exec(String(texto || ''));
    if (!m) return null;
    var h1 = +m[1], m1 = +(m[2] || 0), h2 = +m[3], m2 = +(m[4] || 0);
    if (h1 > 24 || h2 > 24 || m1 > 59 || m2 > 59) return null;
    var inicio = h1 * 60 + m1, fin = h2 * 60 + m2;
    if (fin <= inicio) fin += 1440; // cierra después de medianoche
    return { inicio: inicio, fin: fin };
  }

  function hora(minutos) {
    var m = ((minutos % 1440) + 1440) % 1440;
    return dos(Math.floor(m / 60)) + ':' + dos(m % 60);
  }

  function turnosDelDia(dia) {
    return lista(obj(dia).turnos).map(leerTurno).filter(Boolean).sort(function (a, b) { return a.inicio - b.inicio; });
  }

  function telefonoEnlace(c) {
    var t = String(obj(c.contacto).telefono || '').replace(/[^\d+]/g, '');
    return t ? 'tel:' + t : '';
  }

  function whatsappEnlace(c) {
    var contacto = obj(c.contacto);
    var numero = String(contacto.whatsapp || '').replace(/\D/g, '');
    if (!numero) return '';
    var url = 'https://wa.me/' + numero;
    return lleno(contacto.mensajeWhatsApp) ? url + '?text=' + encodeURIComponent(contacto.mensajeWhatsApp) : url;
  }

  function reservarEnlace(c) {
    return enlaceSeguro(obj(c.enlaces).reservas) || whatsappEnlace(c) || telefonoEnlace(c) || '#ubicacion';
  }

  function esExterno(url) { return /^https?:/i.test(url); }

  function atributosEnlace(url) {
    return 'href="' + esc(url) + '"' + (esExterno(url) ? ' target="_blank" rel="noopener"' : '');
  }

  function direccionCompleta(c) {
    var u = obj(c.ubicacion);
    var linea2 = [u.codigoPostal, u.ciudad].filter(lleno).join(' ');
    return [u.direccion, linea2].filter(lleno).join(', ');
  }

  function busquedaMapa(c) {
    var u = obj(c.ubicacion);
    return lleno(u.busquedaMapa) ? String(u.busquedaMapa) : [obj(c.negocio).nombre, direccionCompleta(c)].filter(lleno).join(', ');
  }

  function comoLlegarEnlace(c) {
    return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(busquedaMapa(c));
  }

  function mapaEmbed(c) {
    var u = obj(c.ubicacion);
    var propio = String(u.mapaPersonalizado || '').trim();
    if (propio) {
      var src = /src\s*=\s*["']([^"']+)["']/i.exec(propio);
      var url = (src ? src[1] : propio).replace(/&amp;/g, '&');
      if (/^https:\/\//i.test(url)) return url;
    }
    var idioma = obj(c.web).idioma || 'es';
    return 'https://maps.google.com/maps?q=' + encodeURIComponent(busquedaMapa(c)) + '&z=16&hl=' + encodeURIComponent(idioma) + '&output=embed';
  }

  /** Dirección pública de la web, con "/" final (o "" si no se conoce). */
  function urlWeb(c) {
    var url = String(obj(c.web).url || '').trim();
    if (!/^https?:\/\//i.test(url)) return '';
    return url.replace(/[?#].*$/, '').replace(/\/?$/, '/');
  }

  /* ---------- Imágenes ------------------------------------------------------ */
  function esUnsplash(src) { return /^https:\/\/images\.unsplash\.com\//i.test(src); }

  function urlImagen(src, ancho, alto) {
    if (!esUnsplash(src)) return src;
    return src.split('?')[0] + '?auto=format&fit=crop&q=70&w=' + ancho + (alto ? '&h=' + alto : '');
  }

  function absoluta(src, base) {
    if (!lleno(src)) return '';
    if (/^https?:\/\//i.test(src)) return esUnsplash(src) ? urlImagen(src, 1200, 630) : src;
    if (!base) return src;
    try { return new URL(src, base).href; } catch (e) { return src; }
  }

  /**
   * <img> optimizada. Las fotos de Unsplash se piden al tamaño justo para
   * cada pantalla. Si una foto no carga, se oculta y queda un fondo de color.
   */
  function imagen(src, alt, op) {
    if (!lleno(src)) return '';
    op = op || {};
    var url = enlaceSeguro(src);
    if (!url) return '';
    var anchos = op.anchos || [480, 800, 1200, 1600];
    var proporcion = op.proporcion || 0; // alto / ancho
    var attrs = ['alt="' + esc(alt || '') + '"'];
    if (esUnsplash(url)) {
      attrs.unshift('src="' + esc(urlImagen(url, anchos[Math.min(1, anchos.length - 1)], proporcion ? Math.round(anchos[Math.min(1, anchos.length - 1)] * proporcion) : 0)) + '"');
      attrs.push('srcset="' + esc(anchos.map(function (w) {
        return urlImagen(url, w, proporcion ? Math.round(w * proporcion) : 0) + ' ' + w + 'w';
      }).join(', ')) + '"');
      attrs.push('sizes="' + esc(op.sizes || '100vw') + '"');
    } else {
      attrs.unshift('src="' + esc(url) + '"');
    }
    if (op.ancho && op.alto) attrs.push('width="' + op.ancho + '" height="' + op.alto + '"');
    attrs.push(op.prioridad ? 'fetchpriority="high"' : 'loading="lazy"');
    attrs.push('decoding="async"');
    attrs.push('onerror="this.onerror=null;this.classList.add(\'img-rota\')"');
    return '<img ' + attrs.join(' ') + '>';
  }

  /* ---------- Horario: ¿está abierto ahora? ------------------------------- */
  function partesFecha(fecha, zona) {
    try {
      var formato = new Intl.DateTimeFormat('en-GB', {
        timeZone: zona || undefined, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
      });
      var p = {};
      formato.formatToParts(fecha).forEach(function (x) { p[x.type] = x.value; });
      var dias = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
      if (dias[p.weekday] == null) throw new Error('día desconocido');
      return { dia: dias[p.weekday], minutos: (+p.hour % 24) * 60 + +p.minute };
    } catch (e) {
      return { dia: (fecha.getDay() + 6) % 7, minutos: fecha.getHours() * 60 + fecha.getMinutes() };
    }
  }

  /**
   * Devuelve { abierto, texto, hoy } según el horario y la hora actual del
   * negocio (zonaHoraria). "hoy" es 0 = lunes … 6 = domingo.
   */
  function estadoAhora(c, fecha) {
    var dias = lista(obj(c.horario).dias);
    if (dias.length !== 7) return null;
    var turnos = dias.map(turnosDelDia);
    var ahora = partesFecha(fecha || new Date(), obj(c.web).zonaHoraria);
    var hoy = ahora.dia, m = ahora.minutos, i, t;

    for (i = 0; i < turnos[hoy].length; i++) {
      t = turnos[hoy][i];
      if (m >= t.inicio && m < t.fin) return abierto(t);
    }
    var ayer = turnos[(hoy + 6) % 7];
    for (i = 0; i < ayer.length; i++) {
      t = ayer[i];
      if (t.fin > 1440 && m < t.fin - 1440) return abierto(t);
    }
    for (var salto = 0; salto < 8; salto++) {
      var d = (hoy + salto) % 7;
      var siguientes = turnos[d].filter(function (x) { return salto > 0 || x.inicio > m; });
      if (siguientes.length) {
        var h = hora(siguientes[0].inicio);
        var plantilla = salto === 0 ? T(c, 'abreHoy') : salto === 1 ? T(c, 'abreManana') : T(c, 'abreDia');
        return {
          abierto: false, hoy: hoy,
          texto: T(c, 'cerradoAhora') + ' · ' + rellenar(plantilla, { hora: h, dia: String(obj(dias[d]).dia || '').toLowerCase() })
        };
      }
    }
    return { abierto: false, hoy: hoy, texto: T(c, 'cerradoAhora') };

    function abierto(turno) {
      return { abierto: true, hoy: hoy, texto: T(c, 'abiertoAhora') + ' · ' + rellenar(T(c, 'cierraA'), { hora: hora(turno.fin) }) };
    }
  }

  /* ---------- <head>: título, SEO, redes, colores y tipografías ----------- */
  function tipoSchema(tipo) {
    var t = normalizar(tipo || '');
    if (/^(bar|taberna|pub|cerveceria|cocteleria|vinoteca|tasca)/.test(t)) return 'BarOrPub';
    if (/^(cafe|cafeteria|coffee)/.test(t)) return 'CafeOrCoffeeShop';
    if (/^(panaderia|pasteleria|obrador)/.test(t)) return 'Bakery';
    if (/^heladeria/.test(t)) return 'IceCreamShop';
    return 'Restaurant';
  }

  function datosEstructurados(c, base) {
    var neg = obj(c.negocio), u = obj(c.ubicacion), con = obj(c.contacto), en = obj(c.enlaces), web = obj(c.web);
    var datos = {
      '@context': 'https://schema.org',
      '@type': tipoSchema(neg.tipo),
      name: neg.nombre || '',
      description: web.descripcionSEO || neg.eslogan || ''
    };
    if (base) { datos.url = base; datos.hasMenu = base + '#carta'; }
    var img = absoluta(web.imagenCompartir || obj(c.portada).imagen, base);
    if (img) datos.image = img;
    if (lleno(con.telefono)) datos.telephone = String(con.telefono);
    if (lleno(con.email)) datos.email = String(con.email);
    if (lleno(neg.rangoPrecios)) datos.priceRange = String(neg.rangoPrecios);
    if (lleno(neg.tipoCocina)) datos.servesCuisine = String(neg.tipoCocina);
    if (lleno(u.direccion)) {
      datos.address = {
        '@type': 'PostalAddress',
        streetAddress: u.direccion || '', postalCode: u.codigoPostal || '',
        addressLocality: u.ciudad || '', addressRegion: u.provincia || '', addressCountry: u.pais || ''
      };
    }
    var horas = [];
    lista(obj(c.horario).dias).forEach(function (dia, i) {
      if (i > 6) return;
      turnosDelDia(dia).forEach(function (t) {
        horas.push({ '@type': 'OpeningHoursSpecification', dayOfWeek: 'https://schema.org/' + DIAS_SCHEMA[i], opens: hora(t.inicio), closes: hora(t.fin) });
      });
    });
    if (horas.length) datos.openingHoursSpecification = horas;
    datos.acceptsReservations = true;
    var redes = ['instagram', 'facebook', 'tiktok', 'tripadvisor'].map(function (r) { return enlaceSeguro(en[r]); }).filter(esExterno);
    if (redes.length) datos.sameAs = redes;
    return JSON.stringify(datos, null, 2).replace(/</g, '\\u003c');
  }

  function cssTema(c) {
    var col = obj(obj(c.apariencia).colores), tip = obj(obj(c.apariencia).tipografias);
    return ':root{' +
      '--c-principal:' + color(col.principal, 'principal') + ';' +
      '--c-sobre-principal:' + color(col.textoSobrePrincipal, 'textoSobrePrincipal') + ';' +
      '--c-secundario:' + color(col.secundario, 'secundario') + ';' +
      '--c-fondo:' + color(col.fondo, 'fondo') + ';' +
      '--c-fondo-alt:' + color(col.fondoAlterno, 'fondoAlterno') + ';' +
      '--c-texto:' + color(col.texto, 'texto') + ';' +
      '--c-oscuro:' + color(col.oscuro, 'oscuro') + ';' +
      "--f-titulos:'" + fuente(tip.titulos, 'Fraunces') + "',ui-serif,Georgia,'Times New Roman',serif;" +
      "--f-texto:'" + fuente(tip.texto, 'DM Sans') + "',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}";
  }

  function fuentesEnlaces(c) {
    var tip = obj(obj(c.apariencia).tipografias);
    var familias = [fuente(tip.titulos, 'Fraunces'), fuente(tip.texto, 'DM Sans')]
      .filter(function (f, i, todas) { return todas.indexOf(f) === i; })
      .map(function (f) { return f.replace(/ /g, '+'); });
    var base = 'https://fonts.googleapis.com/css2?';
    return {
      completa: base + familias.map(function (f) { return 'family=' + f + ':wght@400;500;600;700'; }).join('&') + '&display=swap',
      sencilla: base + familias.map(function (f) { return 'family=' + f; }).join('&') + '&display=swap'
    };
  }

  function favicon(c) {
    var col = obj(obj(c.apariencia).colores);
    var letra = String(obj(c.negocio).nombre || '·').trim().charAt(0).toUpperCase()
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='16' fill='" +
      color(col.principal, 'principal') + "'/><text x='32' y='44' text-anchor='middle' font-family='Georgia,serif' font-size='36' font-weight='700' fill='" +
      color(col.textoSobrePrincipal, 'textoSobrePrincipal') + "'>" + letra + '</text></svg>';
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }

  function locale(c) {
    var idioma = String(obj(c.web).idioma || 'es').toLowerCase();
    var pais = String(obj(c.ubicacion).pais || '').toUpperCase();
    return /^[a-z]{2}$/.test(idioma) && /^[A-Z]{2}$/.test(pais) ? idioma + '_' + pais : idioma;
  }

  /** Todo lo que va dentro de <head> y sale de config.js. */
  function cabecera(c, op) {
    op = op || {};
    var base = op.base != null ? op.base : urlWeb(c);
    var neg = obj(c.negocio), web = obj(c.web), portada = obj(c.portada);
    var titulo = web.tituloSEO || neg.nombre || '';
    var descripcion = web.descripcionSEO || neg.eslogan || '';
    var imgCompartir = absoluta(web.imagenCompartir || portada.imagen, base);
    var fuentes = fuentesEnlaces(c);
    var h = [];

    h.push('<title>' + esc(titulo) + '</title>');
    h.push('<meta name="description" content="' + esc(descripcion) + '">');
    h.push('<meta name="theme-color" content="' + esc(color(obj(obj(c.apariencia).colores).oscuro, 'oscuro')) + '">');
    if (base) h.push('<link rel="canonical" href="' + esc(base) + '">');
    h.push('<meta property="og:type" content="website">');
    h.push('<meta property="og:site_name" content="' + esc(neg.nombre || '') + '">');
    h.push('<meta property="og:title" content="' + esc(titulo) + '">');
    h.push('<meta property="og:description" content="' + esc(descripcion) + '">');
    h.push('<meta property="og:locale" content="' + esc(locale(c)) + '">');
    if (base) h.push('<meta property="og:url" content="' + esc(base) + '">');
    if (imgCompartir) {
      h.push('<meta property="og:image" content="' + esc(imgCompartir) + '">');
      if (esUnsplash(web.imagenCompartir || portada.imagen)) {
        h.push('<meta property="og:image:width" content="1200">');
        h.push('<meta property="og:image:height" content="630">');
      }
      h.push('<meta property="og:image:alt" content="' + esc(portada.textoAlternativo || neg.nombre || '') + '">');
    }
    h.push('<meta name="twitter:card" content="summary_large_image">');
    h.push('<meta name="twitter:title" content="' + esc(titulo) + '">');
    h.push('<meta name="twitter:description" content="' + esc(descripcion) + '">');
    if (imgCompartir) h.push('<meta name="twitter:image" content="' + esc(imgCompartir) + '">');
    h.push('<link rel="icon" href="' + esc(favicon(c)) + '">');
    h.push('<link rel="stylesheet" href="' + esc(fuentes.completa) + '" onerror="this.onerror=null;this.href=\'' + esc(fuentes.sencilla) + '\'">');
    if (lleno(portada.imagen) && esUnsplash(portada.imagen)) {
      var anchos = [640, 960, 1400, 2000];
      h.push('<link rel="preload" as="image" fetchpriority="high" imagesizes="100vw" imagesrcset="' + esc(anchos.map(function (w) {
        return urlImagen(portada.imagen, w) + ' ' + w + 'w';
      }).join(', ')) + '">');
    }
    h.push('<style id="tema">' + cssTema(c) + '</style>');
    h.push('<script type="application/ld+json">' + datosEstructurados(c, base) + '</script>');
    return h.join('\n');
  }

  /* ---------- Secciones de la página ------------------------------------- */
  function cabeceraPagina(c) {
    var neg = obj(c.negocio);
    var enlaces = [];
    if (visible(c.sobreNosotros)) enlaces.push(['#nosotros', T(c, 'menu.nosotros')]);
    if (visible(c.carta)) enlaces.push(['#carta', T(c, 'menu.carta')]);
    if (visible(c.horario)) enlaces.push(['#horario', T(c, 'menu.horario')]);
    if (visible(c.ubicacion)) enlaces.push(['#ubicacion', T(c, 'menu.ubicacion')]);
    if (visible(c.resenas)) enlaces.push(['#resenas', T(c, 'menu.resenas')]);
    var reservar = reservarEnlace(c);
    var marca = lleno(neg.logo)
      ? '<img src="' + esc(enlaceSeguro(neg.logo)) + '" alt="' + esc(neg.nombre || '') + '" height="40">'
      : esc(neg.nombre || '');

    return '<a class="saltar" href="#contenido">' + esc(T(c, 'saltarAlContenido')) + '</a>' +
      '<header class="cabecera" data-cabecera>' +
        '<div class="contenedor cabecera__barra">' +
          '<a class="marca" href="#inicio">' + marca + '</a>' +
          '<nav class="nav" id="nav" aria-label="' + esc(T(c, 'menu.navegacion')) + '">' +
            '<ul class="nav__lista">' +
              enlaces.map(function (e, i) {
                return '<li><a href="' + e[0] + '" style="--i:' + i + '">' + esc(e[1]) + '</a></li>';
              }).join('') +
            '</ul>' +
            '<a class="boton boton--principal nav__reservar" ' + atributosEnlace(reservar) + ' style="--i:' + enlaces.length + '">' + esc(T(c, 'reservar')) + '</a>' +
          '</nav>' +
          '<a class="boton boton--principal boton--peq cabecera__reservar" ' + atributosEnlace(reservar) + '>' + esc(T(c, 'reservar')) + '</a>' +
          '<button class="nav-boton" type="button" aria-controls="nav" aria-expanded="false" aria-label="' + esc(T(c, 'menu.abrirMenu')) +
            '" data-nav-boton data-abrir="' + esc(T(c, 'menu.abrirMenu')) + '" data-cerrar="' + esc(T(c, 'menu.cerrarMenu')) + '">' +
            '<span class="nav-boton__lineas" aria-hidden="true"></span>' +
          '</button>' +
        '</div>' +
      '</header>';
  }

  function chipEstado(clase) {
    return '<p class="estado' + (clase ? ' ' + clase : '') + '" data-estado hidden><span class="estado__punto" aria-hidden="true"></span><span data-estado-texto></span></p>';
  }

  function seccionPortada(c) {
    var p = obj(c.portada);
    var reservar = reservarEnlace(c);
    var conWhatsApp = !lleno(obj(c.enlaces).reservas) && !!whatsappEnlace(c);
    return '<section class="portada" id="inicio">' +
      '<div class="portada__fondo marco-foto">' +
        imagen(p.imagen, p.textoAlternativo, { anchos: [640, 960, 1400, 2000], sizes: '100vw', prioridad: true }) +
      '</div>' +
      '<div class="contenedor portada__contenido">' +
        chipEstado() +
        (lleno(p.antetitulo) ? '<p class="antetitulo">' + esc(p.antetitulo) + '</p>' : '') +
        '<h1 class="portada__titulo">' + esc(p.titulo || obj(c.negocio).nombre || '') + '</h1>' +
        (lleno(p.subtitulo) ? '<p class="portada__subtitulo">' + esc(p.subtitulo) + '</p>' : '') +
        '<div class="portada__botones">' +
          (lleno(p.botonPrincipal) ? '<a class="boton boton--principal boton--grande" ' + atributosEnlace(reservar) + '>' + (conWhatsApp ? ICONO_WHATSAPP : '') + esc(p.botonPrincipal) + '</a>' : '') +
          (lleno(p.botonSecundario) && visible(c.carta) ? '<a class="boton boton--cristal boton--grande" href="#carta">' + esc(p.botonSecundario) + icono('flecha') + '</a>' : '') +
        '</div>' +
      '</div>' +
      '<a class="portada__bajar" href="' + (visible(c.sobreNosotros) ? '#nosotros' : '#carta') + '" tabindex="-1" aria-hidden="true">' + icono('abajo') + '</a>' +
    '</section>';
  }

  function cabezaSeccion(antetitulo, titulo, extra, centrada) {
    return '<header class="cabeza-seccion' + (centrada ? ' cabeza-seccion--centro' : '') + ' revelar">' +
      (lleno(antetitulo) ? '<p class="antetitulo">' + esc(antetitulo) + '</p>' : '') +
      (lleno(titulo) ? '<h2 class="titulo-seccion">' + esc(titulo) + '</h2>' : '') +
      (extra || '') +
    '</header>';
  }

  function seccionNosotros(c) {
    var s = c.sobreNosotros;
    if (!visible(s)) return '';
    var puntos = lista(s.puntosFuertes);
    return '<section class="seccion" id="nosotros">' +
      '<div class="contenedor nosotros' + (lleno(s.imagen) ? '' : ' nosotros--sin-foto') + '">' +
        '<div class="nosotros__texto">' +
          cabezaSeccion(s.antetitulo, s.titulo) +
          lista(s.parrafos).filter(lleno).map(function (p, i) {
            return '<p class="revelar" style="--i:' + (i + 1) + '">' + esc(p) + '</p>';
          }).join('') +
        '</div>' +
        (lleno(s.imagen)
          ? '<figure class="nosotros__foto revelar"><div class="marco-foto">' +
              imagen(s.imagen, s.textoAlternativo, { anchos: [480, 800, 1200], sizes: '(min-width: 900px) 45vw, 100vw', proporcion: 1.25 }) +
            '</div></figure>'
          : '') +
      '</div>' +
      (puntos.length
        ? '<div class="contenedor"><ul class="puntos">' + puntos.map(function (p, i) {
            p = obj(p);
            var ic = icono(p.icono) || (lleno(p.icono) ? '<span class="punto__emoji">' + esc(p.icono) + '</span>' : '');
            return '<li class="punto revelar" style="--i:' + i + '">' +
              (ic ? '<span class="punto__icono">' + ic + '</span>' : '') +
              '<h3>' + esc(p.titulo) + '</h3>' +
              (lleno(p.texto) ? '<p>' + esc(p.texto) + '</p>' : '') +
            '</li>';
          }).join('') + '</ul></div>'
        : '') +
    '</section>';
  }

  function seccionDestacados(c) {
    var s = c.destacados;
    if (!visible(s) || !lista(s.platos).length) return '';
    return '<section class="seccion seccion--alterna" id="destacados">' +
      '<div class="contenedor">' +
        cabezaSeccion(s.antetitulo, s.titulo) +
        '<ul class="destacados">' + lista(s.platos).map(function (p, i) {
          p = obj(p);
          return '<li class="plato-foto revelar" style="--i:' + i + '">' +
            '<div class="plato-foto__imagen marco-foto">' +
              imagen(p.imagen, p.textoAlternativo || p.nombre, { anchos: [400, 600, 900], sizes: '(min-width: 768px) 33vw, 82vw', proporcion: 0.75 }) +
            '</div>' +
            '<div class="plato-foto__cuerpo">' +
              '<h3>' + esc(p.nombre) + '</h3>' +
              (lleno(p.descripcion) ? '<p>' + esc(p.descripcion) + '</p>' : '') +
              (lleno(p.precio) ? '<span class="precio">' + esc(precio(c, p.precio)) + '</span>' : '') +
            '</div>' +
          '</li>';
        }).join('') + '</ul>' +
      '</div>' +
    '</section>';
  }

  function etiquetas(c, lista_) {
    var items = lista(lista_).filter(lleno);
    if (!items.length) return '';
    return '<ul class="etiquetas">' + items.map(function (e) {
      var clave = normalizar(e);
      var texto = T(c, 'etiquetas.' + clave) || String(e);
      return '<li class="etiqueta etiqueta--' + esc(clave) + '">' + esc(texto) + '</li>';
    }).join('') + '</ul>';
  }

  function seccionCarta(c) {
    var s = c.carta;
    if (!visible(s)) return '';
    var cats = lista(s.categorias).map(obj);
    var md = obj(s.menuDelDia);
    var pdf = enlaceSeguro(obj(c.enlaces).cartaPdf);
    var html = '<section class="seccion" id="carta">' +
      '<div class="contenedor contenedor--estrecho">' +
        cabezaSeccion(s.antetitulo, s.titulo, lleno(s.introduccion) ? '<p class="intro">' + esc(s.introduccion) + '</p>' : '', true);

    if (visible(s.menuDelDia) && (lleno(md.titulo) || lleno(md.precio))) {
      html += '<div class="menu-dia revelar">' +
        '<div class="menu-dia__texto">' +
          '<p class="menu-dia__titulo">' + esc(md.titulo) + '</p>' +
          (lleno(md.detalle) ? '<p class="menu-dia__detalle">' + esc(md.detalle) + '</p>' : '') +
          (lleno(md.disponibilidad) ? '<p class="menu-dia__disp">' + icono('reloj') + esc(md.disponibilidad) + '</p>' : '') +
        '</div>' +
        (lleno(md.precio) ? '<p class="menu-dia__precio">' + esc(precio(c, md.precio)) + '</p>' : '') +
      '</div>';
    }

    if (cats.length > 1) {
      html += '<div class="carta__pestanas" role="tablist" aria-label="' + esc(s.antetitulo || T(c, 'menu.carta')) + '">' +
        cats.map(function (cat, i) {
          return '<button class="pestana" type="button" role="tab" id="pestana-' + i + '" aria-controls="panel-' + i + '" aria-selected="' + (i === 0) + '"' + (i ? ' tabindex="-1"' : '') + '>' + esc(cat.nombre) + '</button>';
        }).join('') +
      '</div>';
    }

    html += '<div class="carta__paneles revelar">' + cats.map(function (cat, i) {
      return '<div class="carta__panel"' + (cats.length > 1 ? ' role="tabpanel" id="panel-' + i + '" aria-labelledby="pestana-' + i + '" tabindex="0"' : '') + '>' +
        '<h3 class="carta__categoria">' + esc(cat.nombre) + '</h3>' +
        '<ul class="carta__lista">' + lista(cat.platos).map(function (p) {
          p = obj(p);
          return '<li class="plato">' +
            '<div class="plato__linea">' +
              '<h4 class="plato__nombre">' + esc(p.nombre) + '</h4>' +
              (lleno(p.precio) ? '<span class="plato__puntos" aria-hidden="true"></span><span class="plato__precio">' + esc(precio(c, p.precio)) + '</span>' : '') +
            '</div>' +
            (lleno(p.descripcion) ? '<p class="plato__desc">' + esc(p.descripcion) + '</p>' : '') +
            etiquetas(c, p.etiquetas) +
          '</li>';
        }).join('') + '</ul>' +
      '</div>';
    }).join('') + '</div>';

    if (lleno(s.notaAlergenos) || pdf) {
      html += '<div class="carta__pie">' +
        (lleno(s.notaAlergenos) ? '<p>' + esc(s.notaAlergenos) + '</p>' : '') +
        (pdf ? '<a class="boton boton--contorno" ' + atributosEnlace(pdf) + '>' + icono('documento') + esc(T(c, 'verCartaPdf')) + '</a>' : '') +
      '</div>';
    }
    return html + '</div></section>';
  }

  function bloqueHorario(c) {
    var s = c.horario;
    return '<div class="visita__bloque tarjeta revelar">' +
      cabezaSeccion(s.antetitulo, s.titulo) +
      chipEstado('estado--claro') +
      '<table class="horario"><tbody>' + lista(s.dias).map(function (dia, i) {
        dia = obj(dia);
        var turnos = lista(dia.turnos).filter(lleno);
        var celdas = turnos.length
          ? turnos.map(function (t) {
              var leido = leerTurno(t);
              return '<span>' + esc(leido ? hora(leido.inicio) + ' – ' + hora(leido.fin) : t) + '</span>';
            }).join('')
          : '<span class="horario__cerrado">' + esc(T(c, 'cerrado')) + '</span>';
        return '<tr data-dia="' + i + '"><th scope="row">' + esc(dia.dia) + '<span class="horario__hoy">' + esc(T(c, 'hoy')) + '</span></th><td>' + celdas + '</td></tr>';
      }).join('') + '</tbody></table>' +
      (lleno(s.nota) ? '<p class="nota">' + icono('reloj') + esc(s.nota) + '</p>' : '') +
    '</div>';
  }

  function bloqueUbicacion(c, conId) {
    var u = obj(c.ubicacion);
    var tel = telefonoEnlace(c);
    var linea2 = [u.codigoPostal, u.ciudad].filter(lleno).join(' ');
    return '<div class="visita__bloque tarjeta revelar"' + (conId ? ' id="ubicacion"' : '') + ' style="--i:1">' +
      cabezaSeccion(u.antetitulo, u.titulo) +
      '<address class="direccion">' + icono('mapa') + '<span>' + esc(u.direccion) + (linea2 ? '<br>' + esc(linea2) : '') + '</span></address>' +
      (lleno(u.comoLlegarTexto) ? '<p class="indicaciones">' + esc(u.comoLlegarTexto) + '</p>' : '') +
      '<div class="botones">' +
        '<a class="boton boton--principal" ' + atributosEnlace(comoLlegarEnlace(c)) + '>' + icono('ruta') + esc(T(c, 'comoLlegar')) + '</a>' +
        (tel ? '<a class="boton boton--contorno" href="' + esc(tel) + '">' + icono('telefono') + esc(T(c, 'llamar')) + '</a>' : '') +
      '</div>' +
      '<div class="mapa"><iframe src="' + esc(mapaEmbed(c)) + '" title="' + esc(T(c, 'mapaTitulo')) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>' +
    '</div>';
  }

  function seccionVisita(c) {
    var conHorario = visible(c.horario) && lista(c.horario.dias).length;
    var conUbicacion = visible(c.ubicacion);
    if (!conHorario && !conUbicacion) return '';
    return '<section class="seccion seccion--alterna" id="' + (conHorario ? 'horario' : 'ubicacion') + '">' +
      '<div class="contenedor visita' + (conHorario && conUbicacion ? '' : ' visita--una') + '">' +
        (conHorario ? bloqueHorario(c) : '') +
        (conUbicacion ? bloqueUbicacion(c, conHorario) : '') +
      '</div>' +
    '</section>';
  }

  function seccionResenas(c) {
    var s = c.resenas;
    if (!visible(s)) return '';
    var enlace = enlaceSeguro(obj(c.enlaces).resenasGoogle);
    var estrellas = '';
    for (var i = 0; i < 5; i++) estrellas += '<span style="--i:' + i + '">' + ICONO_ESTRELLA + '</span>';
    return '<section class="seccion resenas" id="resenas">' +
      (lleno(s.imagenFondo) ? '<div class="resenas__fondo marco-foto" aria-hidden="true">' + imagen(s.imagenFondo, '', { anchos: [640, 1200, 1800], sizes: '100vw' }) + '</div>' : '') +
      '<div class="contenedor">' +
        '<div class="resenas__tarjeta revelar">' +
          '<div class="estrellas" aria-hidden="true">' + estrellas + '</div>' +
          (lleno(s.notaMedia)
            ? '<p class="resenas__nota"><strong>' + esc(s.notaMedia) + '</strong>' + (lleno(s.numeroResenas) ? ' · ' + esc(s.numeroResenas) + ' ' + esc(T(c, 'resenasEnGoogle')) : '') + '</p>'
            : '') +
          (lleno(s.antetitulo) ? '<p class="antetitulo">' + esc(s.antetitulo) + '</p>' : '') +
          '<h2 class="titulo-seccion">' + esc(s.titulo) + '</h2>' +
          (lleno(s.texto) ? '<p class="resenas__texto">' + esc(s.texto) + '</p>' : '') +
          (enlace ? '<a class="boton boton--google boton--grande" ' + atributosEnlace(enlace) + '>' + ICONO_GOOGLE + esc(s.boton || T(c, 'menu.resenas')) + '</a>' : '') +
        '</div>' +
      '</div>' +
    '</section>';
  }

  function piePagina(c) {
    var neg = obj(c.negocio), con = obj(c.contacto), en = obj(c.enlaces), u = obj(c.ubicacion);
    var tel = telefonoEnlace(c);
    var linea2 = [u.codigoPostal, u.ciudad].filter(lleno).join(' ');
    var redes = [
      ['instagram', 'Instagram', 'instagram'], ['facebook', 'Facebook', 'facebook'],
      ['tiktok', 'TikTok', 'tiktok'], ['tripadvisor', 'Tripadvisor', 'externo']
    ].filter(function (r) { return esExterno(enlaceSeguro(en[r[0]])); });
    var anio = new Date().getFullYear();

    return '<footer class="pie">' +
      '<div class="contenedor pie__rejilla">' +
        '<div>' +
          '<p class="pie__marca">' + esc(neg.nombre) + '</p>' +
          (lleno(neg.eslogan) ? '<p>' + esc(neg.eslogan) + '</p>' : '') +
        '</div>' +
        '<div>' +
          '<h2 class="pie__titulo">' + esc(T(c, 'contacto')) + '</h2>' +
          (lleno(u.direccion) ? '<address>' + esc(u.direccion) + (linea2 ? '<br>' + esc(linea2) : '') + '</address>' : '') +
          (tel ? '<p><a href="' + esc(tel) + '">' + esc(con.telefono) + '</a></p>' : '') +
          (lleno(con.email) ? '<p><a href="mailto:' + esc(con.email) + '">' + esc(con.email) + '</a></p>' : '') +
        '</div>' +
        (redes.length
          ? '<div><h2 class="pie__titulo">' + esc(T(c, 'siguenos')) + '</h2><ul class="redes">' + redes.map(function (r) {
              return '<li><a ' + atributosEnlace(enlaceSeguro(en[r[0]])) + ' aria-label="' + r[1] + '">' + icono(r[2]) + '</a></li>';
            }).join('') + '</ul></div>'
          : '') +
      '</div>' +
      '<div class="contenedor pie__legal"><p>© <span data-anio>' + anio + '</span> ' + esc(neg.nombre) + '. ' + esc(T(c, 'derechos')) + '</p></div>' +
    '</footer>';
  }

  function botonWhatsApp(c) {
    var wa = whatsappEnlace(c);
    if (!wa) return '';
    return '<a class="whatsapp" ' + atributosEnlace(wa) + ' aria-label="' + esc(T(c, 'escribirWhatsApp')) + '">' +
      '<span class="whatsapp__burbuja" aria-hidden="true">' + esc(T(c, 'whatsappFlotante')) + '</span>' +
      '<span class="whatsapp__circulo">' + ICONO_WHATSAPP + '</span>' +
    '</a>';
  }

  /** Todo el contenido visible de la página. */
  function cuerpo(c) {
    return cabeceraPagina(c) +
      '<main id="contenido">' +
        seccionPortada(c) +
        seccionNosotros(c) +
        seccionDestacados(c) +
        seccionCarta(c) +
        seccionVisita(c) +
        seccionResenas(c) +
      '</main>' +
      piePagina(c) +
      botonWhatsApp(c);
  }

  /* ---------- Comprobaciones de config.js --------------------------------- */
  function validar(c) {
    var errores = [], avisos = [];
    if (!c || typeof c !== 'object') {
      return { errores: ['config.js no define window.CONFIG.'], avisos: avisos };
    }
    if (!lleno(obj(c.negocio).nombre)) errores.push('Falta el nombre del negocio (negocio.nombre).');

    var wa = String(obj(c.contacto).whatsapp || '');
    if (wa && /\D/.test(wa)) avisos.push('El número de WhatsApp solo debe llevar cifras (sin +, espacios ni guiones). Lo he limpiado automáticamente: ' + wa.replace(/\D/g, ''));
    if (wa && wa.replace(/\D/g, '').length < 10) avisos.push('El número de WhatsApp parece demasiado corto. ¿Has puesto el prefijo del país (34 en España)?');

    var dias = lista(obj(c.horario).dias);
    if (visible(c.horario) && dias.length !== 7) avisos.push('El horario debería tener 7 días (de lunes a domingo). Ahora tiene ' + dias.length + '.');
    dias.forEach(function (dia) {
      lista(obj(dia).turnos).forEach(function (t) {
        if (!leerTurno(t)) errores.push('No entiendo el horario «' + t + '» del ' + (obj(dia).dia || 'día') + '. Escríbelo así: "13:00-16:00".');
      });
    });

    var col = obj(obj(c.apariencia).colores);
    Object.keys(COLORES).forEach(function (k) {
      if (lleno(col[k]) && color(col[k], k) !== String(col[k]).trim()) avisos.push('El color «' + k + '» (' + col[k] + ') no es válido. Usa el formato #RRGGBB, por ejemplo #A8432A.');
    });

    if (visible(c.resenas) && !lleno(obj(c.enlaces).resenasGoogle)) avisos.push('Falta el enlace de reseñas de Google (enlaces.resenasGoogle): el botón no se mostrará.');
    var web = obj(c.web);
    if (String(web.tituloSEO || '').length > 65) avisos.push('El tituloSEO es largo (' + String(web.tituloSEO).length + ' letras). Google suele cortar a partir de 60.');
    if (String(web.descripcionSEO || '').length > 160) avisos.push('La descripcionSEO es larga (' + String(web.descripcionSEO).length + ' letras). Google suele cortar a partir de 155.');
    if (lleno(web.url) && !urlWeb(c)) avisos.push('web.url debe empezar por https://');
    return { errores: errores, avisos: avisos };
  }

  /** Rutas de fotos y archivos locales que menciona config.js (para comprobarlas). */
  function archivosLocales(c) {
    var rutas = [
      obj(c.negocio).logo, obj(c.web).imagenCompartir, obj(c.portada).imagen,
      obj(c.sobreNosotros).imagen, obj(c.resenas).imagenFondo, obj(c.enlaces).cartaPdf
    ];
    lista(obj(c.destacados).platos).forEach(function (p) { rutas.push(obj(p).imagen); });
    return rutas.filter(function (r) { return lleno(r) && !/^[a-z][a-z0-9+.-]*:/i.test(String(r).trim()); })
      .map(function (r) { return String(r).trim(); });
  }

  /* ---------- Montaje en el navegador (vista previa sin publicar) --------- */
  function montar(c, doc) {
    var head = doc.head;
    var provisional = head.querySelector('title');
    if (provisional) provisional.parentNode.removeChild(provisional);
    head.insertAdjacentHTML('beforeend', cabecera(c));
    doc.documentElement.lang = obj(c.web).idioma || 'es';
    doc.getElementById('app').innerHTML = cuerpo(c);
  }

  global.Plantilla = {
    cabecera: cabecera,
    cuerpo: cuerpo,
    montar: montar,
    validar: validar,
    archivosLocales: archivosLocales,
    estadoAhora: estadoAhora,
    urlWeb: urlWeb,
    leerTurno: leerTurno,
    precio: precio
  };
})(typeof window !== 'undefined' ? window : globalThis);
