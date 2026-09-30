# Funcionalidades del sitio y cómo funcionan

> Inventario técnico de todo lo que hace la página, cómo está implementado y qué falta para producción. Actualizar cada vez que se agregue o cambie una funcionalidad.

## Stack

- **HTML + CSS + JavaScript puro.** Sin frameworks, sin build, sin dependencias de npm. Se abre directamente o con cualquier servidor estático.
- Archivos: `index.html` (estructura y contenido), `styles.css` (diseño), `app.js` (comportamiento), `assets/` (imágenes y PDFs).
- Fuentes: Google Fonts (Manrope), cargada por CDN.
- Íconos: SVG en línea (sprite `<symbol>` al inicio de `index.html`). No se usan emojis ni librerías de íconos.
- Marca: logotipo oficial de la asociación (`assets/img/logo.webp`, 400 px, recorte circular y nitidez aplicados a la foto original que está en `docs/referencias/`). Se usa en cabecera, inicio y pie. Cuando la asociación entregue un logo en alta resolución o vectorial, reemplazar ese archivo.
- Hosting: **Vercel** (URL para la clienta) y GitHub Pages (respaldo). Ambos se actualizan solos al hacer push a `main`.

## Funcionalidades

| # | Funcionalidad | Dónde | Cómo funciona | Estado |
|---|---|---|---|---|
| 1 | Menú responsive con dropdown "Nosotros" | `index.html` header · `app.js` "Navegación" | Mobile-first: en móvil/tablet (<1024 px) es un panel lateral con botón hamburguesa, fondo oscurecido, cierre con Esc o tocando fuera. En escritorio el dropdown abre al pasar el mouse. El enlace activo se resalta según la sección visible. | ✅ |
| 2 | Pestañas Nosotros (Quiénes somos, Reseña, Misión, Visión, Valores) | `#institucional` · `app.js` "Tabs" | Botones que muestran/ocultan paneles. Los enlaces del dropdown también activan la pestaña correspondiente. | ✅ textos por validar |
| 3 | Servicios (6 tarjetas) | `#servicios` | Contenido estático. | ✅ |
| 4 | Materiales filtrables | `#materiales` · `app.js` `MATERIALS` | Lista de 12 materiales en un arreglo JS; los chips filtran por categoría (metal, papel, plástico, vidrio/otros). Para agregar un material: añadir un objeto al arreglo `MATERIALS`. | ✅ lista por validar |
| 5 | Guía de bolsas (blanca/negra/verde) | `#materiales` | Estático, según Resolución 2184 de 2019. | ✅ |
| 6 | Cómo vender (3 pasos) | `#proceso` | Estático + botón a WhatsApp. | ✅ |
| 7 | Solicitar recolección | `#solicitar` · `app.js` "Solicitud de recolección" | Formulario con validación en el navegador. Al enviar, arma un mensaje con los datos y abre WhatsApp (`wa.me/573203023519`) con el texto listo. **No guarda nada en servidor.** | ✅ (MVP) |
| 8 | Documentos descargables | `#documentacion` · `assets/docs/*.pdf` | Enlaces directos a PDFs. Reemplazar los archivos manteniendo el mismo nombre y no hay que tocar código. | ⚠️ PDFs de muestra |
| 9 | Sede con mapa | `#ecas` | Google Maps embebido (iframe gratuito, sin API key) + botón "Cómo llegar". | ✅ horario por confirmar |
| 10 | Rutas de recolección con buscador | `#rutas` · `app.js` `ROUTES` | Tabla generada desde el arreglo `ROUTES`. Buscador por barrio (ignora tildes) y filtro por día. En móvil cada fila se muestra como tarjeta (CSS `data-label`). Para editar rutas: modificar el arreglo. | ⚠️ datos inventados |
| 11 | Galería con lightbox | `#galeria` · `app.js` `GALLERY` | Cuadrícula generada desde el arreglo `GALLERY`; clic abre visor a pantalla completa con flechas y teclado (←, →, Esc). | ⚠️ ilustraciones |
| 12 | Contacto | `#contacto` | Formulario → WhatsApp, igual que el #7. | ✅ falta correo |
| 13 | Pague su factura | `#factura` | Explicación de cómo se cobra el aprovechamiento + consulta de cuenta por WhatsApp. | ⚠️ sin pasarela |
| 14 | PQRS con radicado | `#pqrs` · `app.js` "PQRS" | Al radicar, genera un número `MC-AAAA-NNNNNN`, lo muestra en un modal y ofrece enviar copia por WhatsApp. El radicado se guarda en el `localStorage` del navegador del usuario (solo él puede consultarlo desde ese mismo equipo). | ⚠️ sin backend |
| 15 | Botón flotante de WhatsApp | global | Enlace `wa.me` con mensaje predefinido. | ✅ |
| 16 | Animaciones | `.reveal` · `app.js` "Aparición al hacer scroll" · `styles.css` | Entrada del hero al cargar (título, texto, botones y logo con anillo animado) y aparición suave de tarjetas, listas y bloques al entrar en pantalla, con escalonado por grupo. Sutiles y sin loops llamativos. Se desactivan con "reducir movimiento". | ✅ |
| 17 | SEO básico | `<head>` | Título, descripción, Open Graph, favicon, `theme-color`. | ✅ |

## Cómo editar contenido sin saber programar

| Quiero cambiar… | Dónde |
|---|---|
| Teléfono / WhatsApp | Buscar `573203023519` en `index.html` y `app.js` (constante `WA_NUMBER`) |
| Dirección, NIT, textos | `index.html`, buscar el texto |
| Materiales | `app.js` → arreglo `MATERIALS` |
| Rutas | `app.js` → arreglo `ROUTES` |
| Fotos de galería | Subir a `assets/img/` y actualizar `app.js` → arreglo `GALLERY` (hoy hay marcadores neutros `gal-*.svg`) |
| Logotipo | Reemplazar `assets/img/logo.webp` (cuadrado, fondo transparente) y `assets/img/favicon.png` |
| PDFs | Reemplazar en `assets/docs/` con el mismo nombre |
| Colores | `styles.css` → variables al inicio (`:root`) |

## Manejo de espacio y archivos pesados

GitHub recomienda repos < 1 GB y archivos < 50 MB; Vercel sirve estáticos sin problema hasta ~100 MB por deploy en plan gratuito. Reglas para no llenarlo:

1. **Fotos**: comprimir antes de subir. Máximo ~1600 px de ancho y < 300 KB cada una. Formato **WebP** o JPG. Herramientas gratis: [squoosh.app](https://squoosh.app) o [tinypng.com](https://tinypng.com).
2. **PDFs**: < 5 MB cada uno. Si un documento pesa más, comprimirlo (ej. [ilovepdf.com/compress](https://www.ilovepdf.com/compress_pdf)).
3. **Videos**: **nunca al repo.** Subirlos a YouTube (como "no listado") y embeber el iframe.
4. **Muchas fotos** (más de ~50): usar un servicio de imágenes gratuito (Cloudinary, plan gratis 25 GB) y enlazarlas por URL en `GALLERY`.
5. Nombres de archivo sin espacios ni tildes: `sede-bascula.webp`, no `Foto Báscula.JPG`.

## Pendientes para producción (orden sugerido)

1. Reemplazar datos provisionales (rutas, textos de Nosotros, horario, PDFs, fotos) → ver `docs/INFORMACION-EMPRESA.md`.
2. Formularios: pasar de "abrir WhatsApp" a envío real por correo. Opción gratis sin backend: **Formspree** o **Web3Forms** (se agrega un `action` al formulario). Las PQRS podrían ir a una hoja de Google Sheets con **Google Apps Script**.
3. Correo institucional y redes sociales en el pie de página.
4. Pasarela de pago (PSE) — requiere convenio con Wompi/PayU/ePayco a nombre de la asociación.
5. Dominio `.com.co` conectado a Vercel (ver `docs/DESPLIEGUE.md`).
6. Google Analytics o similar, si quieren medir visitas.
