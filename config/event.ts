/**
 * config/event.ts
 * ─────────────────────────────────────────────────────────────
 * Único archivo que hay que editar para adaptar la landing
 * a un nuevo evento. Ningún componente necesita modificarse.
 * ─────────────────────────────────────────────────────────────
 */

// ── Identidad ────────────────────────────────────────────────
export const EVENT = {
  name:        'Golf Tank',
  edition:     'Edición I · 2026',
  badgeText:   'Club House Golf Pilará · Buenos Aires · Edición I',
  tagline:     'Golf Tank', 
  date: {
    display: 'jueves\n11 de Junio', // \n genera salto de línea
    year:    '2026',
    iso:     '2026-06-11',
  },
  venue: {
    name:     'Club House Golf Pilará',
    location: 'Buenos Aires, Argentina',
    address:  'Panamericana km 56,5, B1670 Pilar, Provincia de Buenos Aires',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3289.3319533954177!2d-58.9548731!3d-34.469102299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc83d7100ad837%3A0x87789a741472c4a2!2sClub%20House%20Golf%20Pilar%C3%A1!5e0!3m2!1ses!2sar!4v1779316656392!5m2!1ses!2sar',
    notes: [
      '40 min desde CABA por Panamericana',
      'Invitación personal no transferible',
    ],
  },

  // ── Imagen del hero ──────────────────────────────────────────
  // Reemplazá por una URL propia o colocá el archivo en /public/hero.jpg
 /*  heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi54gOPSlv6sowDEQxeu-iRcShcRgZTsBosbYYtt8aHVb4q5gHuCMf-Qu8q0CPFOAzacIZ-GIwHkMPhQPbjO2rsSZj2Ep4gvbCn6jYXP_TAZTrlvdk796b-0tetOoaUV_uFs_aYUE0PrH8K9QD9dSbchLr1-8PQVyiXKfhLF71TXVbFR_HbVlvb8dz-nXImw0wOOIjBqCDNaJwIMt8Py-t-ZtZfTkSICTnDdIN9ipXLKR8dCB6U3SEgZNaqXhROXulNSa3UPZNOIk', */

  // ── Agenda ───────────────────────────────────────────────────
  agenda: [
    { time: '8:30 hs', title: 'Bienvenida y acreditación', highlight: false },
    { time: '9:30 hs',    title: 'Salidas simultáneas',          highlight: true  },
    { time: '14:00 hs',    title: 'Fin del juego',              highlight: false },
    { time: '14:15 hs',    title: 'Cocktail de cierre y entrega de premios', highlight: true },
    { time: '16:00 hs',    title: 'Finalización del evento',    highlight: false },
  ],

  // ── Formato ───────────────────────────────────────────────────
  format: [
    { label: 'Modalidad', value: 'Laguneada · Mejor pelota',                                                                                  highlight: false },
    { label: 'Cupos',     value: '20 jugadores',                                            highlight: false },
    { label: 'Incluye',   value: 'Green fee, driving range, desayuno, bar en el hoyo 9, cocktail de cierre, regalos para todos los jugadores y premios para los ganadores.', highlight: true  },
  ],

  // ── SEO / Meta ────────────────────────────────────────────────
  meta: {
    title:       'Golf Tank — Club House Golf Pilará · 11 de Junio 2026',
    description: 'Torneo por invitación. 20 jugadores. Club House Golf Pilará, Buenos Aires',
    ogImage:     '/logo-golf-tank-social.png',
  },
} as const;

// ── Campos del formulario ─────────────────────────────────────
export const FORM_FIELDS = [
  { id: 'nombre',    label: 'Nombre',              type: 'text',  required: true,  placeholder: 'Juan',              autocomplete: 'given-name',   col: 1 },
  { id: 'apellido',  label: 'Apellido',            type: 'text',  required: true,  placeholder: 'Pérez',             autocomplete: 'family-name',  col: 1 },
  { id: 'email',     label: 'Email',               type: 'email', required: true,  placeholder: 'vos@email.com',   autocomplete: 'email',        col: 1 },
  { id: 'whatsapp',  label: 'WhatsApp',            type: 'tel',   required: true,  placeholder: '+54 9 11 …',        autocomplete: 'tel',          col: 1 },
  { id: 'handicap',  label: 'Matrícula AAG', type: 'text', required: true, placeholder: '135052', autocomplete: 'off', col: 2 },
  { id: 'empresa',   label: 'Empresa',             type: 'text',  required: true, placeholder: 'Empresa',        autocomplete: 'organization', col: 2 },
] as const;

export type FormFieldId = (typeof FORM_FIELDS)[number]['id'];
