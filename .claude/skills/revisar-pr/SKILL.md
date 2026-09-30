---
name: revisar-pr
description: Revisa una pull request del sitio Recicladores MC (código, contenido, convenciones de ramas y commits) y decide si se puede aprobar. Usar cuando el usuario diga "/revisar-pr <número>", "revisa la PR", "¿puedo hacer merge?" o abra una PR y pida revisión.
---

# Revisar PR — trabajo en conjunto

El usuario abre la PR; tú la revisas y le dices con claridad **qué se puede subir, qué no y por qué**. Si está limpia, la apruebas. El merge lo hace el usuario (o tú si lo pide explícitamente).

## Pasos

1. **Identificar la PR.** Si no dan número: `gh pr list --state open`. Leer con `gh pr view <n>` y `gh pr diff <n>`. Ver rama origen/destino.

2. **Verificar convenciones** (ver memoria `git-workflow-ramas`):
   - `feature/*` → `dev` ✅ · `dev` → `main` ✅ · cualquier otra cosa → observar.
   - Commits en español, claros, un tema por commit. Si hay commits tipo "fix", "cambios", "asdf" → pedir que se reescriban (`git commit --amend` o `rebase -i`) antes de aprobar.
   - No debe tocar `main` directamente.

3. **Revisar el código** del diff, en este orden de importancia:
   - **Rompe algo:** HTML mal cerrado, JS con errores (`node --check app.js`), enlaces `#ancla` a secciones que no existen, rutas de archivos que no existen en el repo.
   - **Seguridad / datos:** claves, tokens o contraseñas en el código; datos personales reales de terceros; `innerHTML` con texto de usuario sin escapar (usar `esc()`).
   - **Archivos pesados:** imágenes > 300 KB, PDFs > 5 MB, videos. Rechazar y remitir a `docs/FUNCIONALIDADES.md` → "Manejo de espacio".
   - **Contenido:** textos con errores de ortografía, datos que contradigan `docs/INFORMACION-EMPRESA.md`, teléfono/NIT distintos a los verificados, cosas que suenen artificiales o exageradas.
   - **Consistencia:** mismos colores/variables de `styles.css`, mismo tono (tuteo), responsive (revisar que no haya anchos fijos).
   - **Documentación:** si agrega o cambia una funcionalidad, `docs/FUNCIONALIDADES.md` debe actualizarse en la misma PR.

4. **Probar** si el cambio es visual o de comportamiento: levantar `python -m http.server 8765` en la rama de la PR (`gh pr checkout <n>`), abrir en el navegador integrado, revisar escritorio y móvil, y leer la consola. Volver a la rama anterior al terminar.

5. **Responder al usuario** en el chat con este formato:

   ```
   ## Revisión PR #n — <título>
   **Veredicto:** ✅ Se puede subir / ⚠️ Con cambios / ❌ No se puede subir

   ### Bloqueantes (hay que corregir antes del merge)
   - archivo:línea — problema — cómo arreglarlo

   ### Sugerencias (opcionales)
   - ...

   ### Lo que está bien
   - ...
   ```

6. **Actuar en GitHub:**
   - ✅ → `gh pr review <n> --approve --body "<resumen>"`.
   - ⚠️/❌ → `gh pr review <n> --request-changes --body "<lista de bloqueantes>"`. No aprobar.
   - Merge solo si el usuario lo pide: `gh pr merge <n> --squash --delete-branch` para `feature/* → dev`; `--merge` (sin squash) para `dev → main` para conservar historial.

7. Si la PR va a `main`, recordar que Vercel/GitHub Pages publican solos en 1-2 min y que la clienta lo verá.
