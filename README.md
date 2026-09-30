# Asociación de Recicladores MC E.S.P. — Sitio web (MVP)

Sitio web institucional para la **Asociación de Recicladores MC E.S.P.** (NIT 901.495.042-1), empresa de servicios públicos en la actividad de aprovechamiento con sede en Barrancabermeja, Santander.

## Características

- **Institucional**: Quiénes somos, Reseña, Misión, Visión y Valores (pestañas).
- **Servicios**: manejo de materiales, asesorías, campañas y certificados.
- **Materiales**: catálogo filtrable de lo que se recibe + guía de separación en la fuente (bolsas blanca/negra/verde).
- **Calculadora de impacto**: kg reciclados → CO₂ evitado.
- **Solicitud de recolección**: formulario que genera el mensaje y lo envía por WhatsApp.
- **Documentación**: PDFs descargables.
- **ECA's**: sede con mapa de Google Maps embebido y botón "Cómo llegar".
- **Rutas de recolección**: buscador por barrio y filtro por día.
- **Galería** con lightbox.
- **Contáctanos**, **Pague su factura** y **PQRS** con número de radicado y consulta de estado (guardado en el navegador).
- 100 % responsive, sin dependencias ni build: HTML + CSS + JS puro.

## Ver en local

```bash
python -m http.server 8765
```

Luego abre <http://localhost:8765>.

## Publicación

El sitio es estático; se publica en **GitHub Pages** desde la rama `main`.

## Pendientes para pasar de MVP a producción

- Reemplazar los PDF de `assets/docs/` por los documentos oficiales.
- Reemplazar las ilustraciones de `assets/img/gal-*.svg` por fotografías reales.
- Confirmar rutas, barrios, horarios y días reales de recolección (`ROUTES` en `app.js`).
- Confirmar textos de misión, visión, reseña y valores con la asociación.
- Conectar los formularios a un backend o servicio de correo (hoy envían por WhatsApp) y las PQRS a una base de datos.
- Integrar pasarela de pago (PSE) en "Pague su factura".
- Añadir correo institucional y redes sociales.
