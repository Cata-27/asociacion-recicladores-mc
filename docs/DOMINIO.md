# Compra del dominio .com.co y conexión con el sitio

Guía paso a paso para comprar el dominio **a nombre de la asociación** y conectarlo a Vercel sin perder nada de lo publicado.

---

## 1. Antes de comprar

### 1.1 Elegir el nombre
Verifique disponibilidad en https://www.cointernet.com.co (registro oficial de .co) o en el buscador del registrador que use. Opciones sugeridas, en orden de preferencia:

| Dominio | Comentario |
|---|---|
| `recicladoresmc.com.co` | Corto, coincide con la marca "Recicladores MC" |
| `asorecicladoresmc.com.co` | Variante con "Aso" |
| `recicladoresmcesp.com.co` | Incluye E.S.P. (como areyaesp.com) |

Regla: sin tildes, sin guiones si se puede evitar, todo en minúsculas.

### 1.2 Datos que le van a pedir (tenerlos listos)
El dominio debe quedar a nombre de la asociación, no de una persona.

| Campo | Valor |
|---|---|
| Titular / Organización | ASOCIACIÓN DE RECICLADORES MC E.S.P. |
| Tipo de documento | NIT |
| NIT | 901.495.042-1 |
| Representante legal | Rol Mary Castaño |
| Dirección | Carrera 34 # 61-71, Barrancabermeja, Santander, Colombia |
| Teléfono | +57 320 302 3519 |
| Correo del titular | ⚠️ **Debe ser un correo de la asociación o de la representante legal**, no el suyo. Es el correo que recibe la renovación anual; si se pierde, se pierde el dominio. |
| Contacto técnico | Puede ir su nombre y su correo (usted administra la web) |

**Importante:** `.com.co` no exige ser empresa colombiana ni presentar documentos; cualquier persona puede registrarlo. Lo del NIT es para que la **titularidad** quede en la asociación.

### 1.3 Dónde comprar
Cualquiera de estos sirve. Todos permiten editar DNS gratis, que es lo único que necesitamos.

| Registrador | Precio aprox. .com.co/año | Notas |
|---|---|---|
| **Hostinger** (hostinger.co) | $35.000–$60.000 COP el 1.er año | Panel en español, pago en COP con PSE/tarjeta. Recomendado. |
| **GoDaddy** (godaddy.com/es-co) | $40.000–$70.000 COP | Muy conocido. Ojo con los extras que intenta vender. |
| **Namecheap** | ~USD 12–15 | En inglés, pago en USD. Muy confiable. |
| **Mi.com.co / Cointernet** | ~$60.000 COP | Registrador colombiano oficial. |

Compre **solo el dominio, por 1 año**. **No** compre hosting, ni "constructor web", ni "correo profesional", ni "protección SSL": el sitio ya vive gratis en Vercel con HTTPS incluido. Sí puede aceptar la **protección de privacidad WHOIS** si es gratis.

---

## 2. Comprar (ejemplo con Hostinger; en otros es casi igual)

1. Entre a https://www.hostinger.co/dominios y busque `recicladoresmc.com.co`.
2. Agregue al carrito **solo el dominio**, periodo **1 año**. Quite cualquier producto extra.
3. Cree la cuenta en el registrador. **Sugerencia:** créela con el correo de la asociación o de la representante legal, y guarde esa contraseña en un lugar seguro compartido con la clienta. Usted puede quedar como usuario adicional/técnico.
4. En "Datos del titular / registrante" llene la tabla del punto 1.2 (Organización = la asociación, documento = NIT).
5. Pague. Revise el correo del titular: casi siempre llega un correo **"Verifique su dirección de correo"** del registrador. **Hay que hacer clic en ese enlace en los primeros 15 días**, o el dominio queda suspendido.
6. Active la **renovación automática** y deje una tarjeta válida, o anote la fecha de vencimiento en el calendario. Un dominio vencido lo puede comprar cualquiera.

---

## 3. Conectar el dominio con Vercel (lo hago yo contigo; son 10 minutos)

### 3.1 En Vercel
1. Entrar al proyecto `asociacion-recicladores-mc` → **Settings → Domains**.
2. Escribir `recicladoresmc.com.co` → **Add**. Vercel preguntará si redirigir `www` → aceptar que **`www.recicladoresmc.com.co` redirija al dominio principal** (o al revés, es indiferente).
3. Vercel mostrará los registros DNS que hay que crear (normalmente estos):

| Tipo | Nombre / Host | Valor |
|---|---|---|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

### 3.2 En el registrador (panel DNS del dominio)
1. Buscar **DNS / Zona DNS / Administrar DNS** del dominio.
2. **Borrar** los registros `A` y `CNAME` que vengan por defecto para `@` y `www` (suelen apuntar a una página de "parking" del registrador).
3. Crear los dos registros de la tabla anterior. TTL: el que venga por defecto.
4. No tocar los registros `MX`/`TXT` si en el futuro hay correo con el dominio.

### 3.3 Esperar
- La propagación tarda entre **10 minutos y 24 horas** (normalmente < 1 hora).
- En Vercel, el dominio pasa de "Invalid configuration" a **"Valid configuration"** y emite el **certificado HTTPS automáticamente**. No hay que comprar nada.
- `asociacion-recicladores-mc.vercel.app` sigue funcionando y redirige al dominio nuevo, así que ningún enlace compartido se rompe.

### 3.4 En el código (lo hago yo)
- Actualizar `og:url`/canonical en `index.html` y las URLs en `docs/`.
- Opcional: `robots.txt` y `sitemap.xml` con el dominio definitivo.

---

## 4. Después (opcional)

### Correo con el dominio: `contacto@recicladoresmc.com.co`
- **Zoho Mail** — gratis hasta 5 buzones (solo acceso web/app, sin IMAP en el plan gratis).
- **Google Workspace** — ~USD 7/usuario/mes, Gmail con el dominio.
- Se configuran registros `MX` en el mismo panel DNS. No afecta a la página.

### Checklist de entrega a la clienta
- [ ] Acceso al registrador (usuario y contraseña) a nombre de la asociación.
- [ ] Fecha de renovación anotada y renovación automática activa.
- [ ] Dominio verificado por correo.
- [ ] HTTPS activo (candado en el navegador).
- [ ] `www` y sin `www` funcionan ambos.
