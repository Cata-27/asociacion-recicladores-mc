# Despliegue: link para la clienta y dominio definitivo

## Ramas

| Rama | Para qué | Quién la actualiza |
|---|---|---|
| `main` | Lo que ve la clienta. Vercel y GitHub Pages publican desde aquí. | Solo por merge desde `dev`, con PR revisada. |
| `dev` | Desarrollo. Aquí se integran las ramas de cambios. | Merge de ramas `feature/*`. |
| `feature/<nombre>` | Un cambio grande (nueva sección, rediseño, integración). | Se crea desde `dev`, se abre PR hacia `dev`. |

Flujo: `feature/x` → PR → revisión (`/revisar-pr`) → merge a `dev` → cuando hay algo que mostrar, PR `dev → main` → publicado.

## Link temporal (mientras no hay dominio)

**Vercel** — https://asociacion-recicladores-mc.vercel.app (la URL exacta la asigna Vercel al importar el proyecto).
Gratis, con HTTPS, no se apaga, y se redepliega solo con cada push a `main`. Además crea una URL de vista previa por cada PR, útil para revisar antes de aprobar.

Respaldo: GitHub Pages en https://cata-27.github.io/asociacion-recicladores-mc/ (mismo código, misma rama `main`).

### Configurar Vercel (una sola vez, desde el navegador)

1. Entrar a https://vercel.com y **Continue with GitHub** (cuenta Cata-27).
2. **Add New → Project → Import** `Cata-27/asociacion-recicladores-mc`.
3. Framework Preset: **Other**. Build command: vacío. Output directory: `.` (raíz). No hay build.
4. **Deploy.** En ~30 s da la URL `*.vercel.app`.
5. Settings → Git: Production Branch = `main`. Listo; las demás ramas generan previews automáticos.

El archivo `vercel.json` del repo ya trae cabeceras de seguridad y caché para los assets.

## Dominio definitivo `.com.co`

Cuando la página esté terminada:

1. Comprar el dominio (ej. `recicladoresmc.com.co`) en un registrador: [cointernet.com.co](https://www.cointernet.com.co) (registrador oficial de .co), GoDaddy, Namecheap u Hostinger. Costo aproximado: $60.000–$90.000 COP/año.
2. En Vercel: Project → Settings → **Domains** → Add `recicladoresmc.com.co` y `www.recicladoresmc.com.co`. Vercel muestra los registros DNS a crear.
3. En el registrador, zona DNS del dominio, crear:
   - `A` · nombre `@` · valor `76.76.21.21`
   - `CNAME` · nombre `www` · valor `cname.vercel-dns.com`
4. Esperar propagación (minutos a 24 h). Vercel emite el certificado HTTPS automáticamente.
5. La URL `*.vercel.app` sigue funcionando y redirige al dominio.

No hay que mover código ni pagar hosting: solo el dominio.

## Correo con el dominio (opcional, después)

Para tener `contacto@recicladoresmc.com.co`: Zoho Mail (gratis hasta 5 usuarios) o Google Workspace (~USD 7/usuario/mes). Se configuran registros MX en el mismo panel DNS.
