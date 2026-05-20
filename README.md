# The Invitational — Event Landing

Landing page de evento de golf + formulario de registro con Google Sheets.
**Stack: Next.js 14 · TypeScript · Tailwind CSS · pnpm · Vercel**

---

## Setup

```bash
# 1. Prerrequisitos
node -v   # 18+
npm i -g pnpm

# 2. Instalar (corre check de antigüedad automáticamente)
pnpm install

# 3. Variables de entorno
cp .env.example .env.local
# → Editá APPS_SCRIPT_URL con la URL de tu Web App

# 4. Dev
pnpm dev   # → http://localhost:3000
```

> Para saltear el check de seguridad en emergencias: `SKIP_AGE_CHECK=1 pnpm install`

---

## Personalizar un nuevo evento

**Un solo archivo:**
```
config/event.ts
```
Cambiá nombre, fecha, lugar, agenda, formato, campos del formulario.
Ningún componente necesita tocarse.

---

## Estructura de componentes

```
app/
  layout.tsx              # HTML shell, fuente, metadata
  globals.css             # Design tokens + estilos de componentes
  page.tsx                # Ensambla todas las secciones
  api/register/route.ts   # Proxy server-side → Apps Script (evita CORS)

components/
  Hero.tsx                # Hero full-bleed con imagen y CTA
  EventInfo.tsx           # Strip fecha / lugar
  Agenda.tsx              # Timeline de la jornada
  Format.tsx              # Grid de modalidad
  Location.tsx            # Info de venue + Google Maps
  RegistrationForm.tsx    # Formulario con validación y estado de éxito
  Footer.tsx              # Pie de página
  icons/                  # SVG inline como componentes

config/
  event.ts                # ← Todo lo que personaliza el evento
```

---

## Conectar con Google Sheets

1. Abrí tu Google Sheet
2. **Extensiones → Apps Script** → pegá el contenido de `apps-script.gs`
3. **Implementar → Nueva implementación**
   - Tipo: Web App
   - Ejecutar como: **Yo**
   - Acceso: **Cualquier persona**
4. Copiá la URL → pegala en `.env.local` como `APPS_SCRIPT_URL`

El formulario llama a `/api/register` (server-side), que hace el fetch
al Apps Script. Esto evita los problemas de CORS del browser.

---

## Deploy en Vercel

```bash
# Via CLI
pnpm add -g vercel && vercel

# O desde el dashboard:
# vercel.com → New Project → importá el repo de GitHub
# → Settings → Environment Variables → agregá APPS_SCRIPT_URL
```

---

## Seguridad de paquetes

`scripts/check-deps-age.mjs` corre en cada `pnpm install` / `pnpm add`
y rechaza paquetes publicados hace menos de **24 horas**.
Verificación manual: `pnpm check:deps`
