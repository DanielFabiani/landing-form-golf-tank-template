# ⛳ Template Landing form Golf Tank

¡Bienvenido al **Golf Event Landing Template**! Esta es una plantilla premium diseñada para crear rápidamente landing pages interactivas para torneos o eventos de golf, con un formulario de acreditación completamente funcional que guarda los registros directamente en **Google Sheets** sin depender de servicios de terceros pagos.

Este proyecto está optimizado para funcionar como un **GitHub Template**, lo que significa que puedes crear nuevos repositorios a partir de este con un solo clic, clonarlo, configurar las variables y tener tu evento online en 5 minutos.

---

## 🚀 Tecnologías y Características

*   **⚡ Next.js 14 (App Router)** & **React** — Para una velocidad de carga ultrarrápida y SEO óptimo.
*   **🎨 Tailwind CSS** — Estilado responsivo de alta fidelidad, con transiciones y micro-animaciones premium.
*   **📦 pnpm** — Para una gestión de dependencias veloz y eficiente.
*   **📊 Google Sheets & Apps Script** — Integración nativa a costo cero para base de datos.
*   **🛠️ Zero-Code Components** — Adapta todo el evento editando **un único archivo** (`config/event.ts`).
*   **🔒 Dependency Security Shield** — Script integrado para proteger contra ataques de dependencias maliciosas recientes (bloquea paquetes de menos de 24 hs de antigüedad).

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
*   [Node.js](https://nodejs.org/) (versión 18 o superior)
*   [pnpm](https://pnpm.io/) (puedes instalarlo globalmente con `npm i -g pnpm`)

---

## 🛠️ Guía de Configuración Paso a Paso

### Paso 1: Configurar la Base de Datos (Google Sheets)

El formulario guarda las inscripciones automáticamente en una hoja de Google Sheets. Sigue estos pasos para configurarla:

1.  Crea una nueva hoja de cálculo vacía en tu **Google Drive**.
2.  En el menú superior de la hoja, ve a **Extensiones** ➔ **Apps Script**.
3.  Borra el código que aparezca por defecto y pega el contenido completo del archivo [`apps-script.gs`](file:///c:/Users/danie/Documents/Desarrollo_Web/FourWinds/Template%20Landing%20Form%20Golf%20Tank/landing-form-golf-tank-template/apps-script.gs) del proyecto.
4.  Haz clic en el icono del **Disquete (Guardar)**.
5.  Haz clic en **Implementar** ➔ **Nueva implementación** (arriba a la derecha).
6.  En el engranaje de configuración, selecciona **Web App** (Aplicación Web).
7.  Configura los siguientes campos exactamente así:
    *   **Descripción:** `Registro de Golf` (o el nombre que gustes)
    *   **Ejecutar como:** `Yo (tu-email@gmail.com)`
    *   **Quién tiene acceso:** `Cualquier persona` *(Esto es vital para que Next.js pueda comunicarse con ella)*.
8.  Haz clic en **Implementar** y autoriza los permisos requeridos por tu cuenta de Google.
9.  **Copia la URL de la Web App** que te proporcionará Google al finalizar (tiene un formato como `https://script.google.com/macros/s/.../exec`).

> [!NOTE]
> No es necesario que crees los encabezados de las columnas manualmente. El Apps Script los autogenerará con estilo y formato premium (verde institucional y negrita) la primera vez que se registre un jugador.

---

### Paso 2: Crear el Archivo de Variables de Entorno (`.env.local`)

El proyecto requiere saber a dónde enviar los datos del formulario de registro.

1.  En la raíz de tu proyecto clonado, duplica el archivo `.env.example`:
    ```bash
    cp .env.example .env.local
    ```
2.  Abre tu nuevo archivo `.env.local` y reemplaza el valor de `APPS_SCRIPT_URL` por la URL que copiaste en el **Paso 1**:
    ```env
    APPS_SCRIPT_URL="https://script.google.com/macros/s/TU_SCRIPT_ID/exec"
    ```

---

### Paso 3: Personalizar tu Evento (`config/event.ts`)

Para adaptar la landing page a tu evento específico, abre el archivo [`config/event.ts`](file:///c:/Users/danie/Documents/Desarrollo_Web/FourWinds/Template%20Landing%20Form%20Golf%20Tank/landing-form-golf-tank-template/config/event.ts) y edita sus valores. 

Puedes modificar:
*   **Nombre & Edición:** El título principal del evento y la fecha en formato legible.
*   **Ubicación (Venue):** Nombre del club, dirección y un mapa interactivo (iframe de Google Maps).
*   **Agenda:** La lista de horarios y actividades para el día.
*   **Formato de Juego:** Detalles de la modalidad, cantidad de cupos e inclusiones.
*   **SEO Metadata:** Título de la pestaña, descripción y la imagen para cuando compartas el enlace en redes sociales o WhatsApp.
*   **Campos del Formulario (`FORM_FIELDS`):** Define qué datos recolectar de los jugadores. Puedes modificar las etiquetas, marcadores de posición (`placeholder`) y el orden sin tocar el formulario visual.

---

### Paso 4: Levantar el Proyecto Localmente

1.  Instala las dependencias del proyecto:
    ```bash
    pnpm install
    ```
2.  Inicia el servidor de desarrollo:
    ```bash
    pnpm dev
    ```
3.  Abre tu navegador en [http://localhost:3000](http://localhost:3000) para ver y probar tu landing page en vivo.

---

## 📦 Cómo Usar como Plantilla de GitHub (Template Repo)

Si quieres usar este repositorio para crear múltiples eventos en el futuro:

1.  Sube este código a tu cuenta de GitHub.
2.  En GitHub, entra a la configuración de tu repositorio (**Settings**).
3.  En la sección **General**, marca la casilla **"Template repository"** (Repositorio de plantilla).
4.  ¡Listo! A partir de ahora, cuando entres a este repositorio en GitHub, verás un botón verde brillante que dice **"Use this template"** (Usar esta plantilla).
5.  Al pulsarlo, GitHub creará un nuevo repositorio limpio a partir de este código, ideal para tu próximo evento de golf.

---

## 🚀 Despliegue en Vercel (Producción)

Desplegar el proyecto a producción es extremadamente sencillo y gratuito usando Vercel:

1.  Crea una cuenta gratuita en [Vercel](https://vercel.com).
2.  Importa tu repositorio de GitHub recién creado.
3.  En la sección de **Environment Variables** (Variables de entorno), agrega la siguiente variable:
    *   **Key:** `APPS_SCRIPT_URL`
    *   **Value:** `https://script.google.com/macros/s/TU_SCRIPT_ID/exec` (La misma URL del Apps Script).
4.  Haz clic en **Deploy**. ¡Tu web estará lista y con HTTPS gratuito en menos de 1 minuto!

---

## 🔒 Seguridad e Instalación de Dependencias

Este proyecto incluye una auditoría automatizada en el script [`scripts/check-deps-age.mjs`](file:///c:/Users/danie/Documents/Desarrollo_Web/FourWinds/Template%20Landing%20Form%20Golf%20Tank/landing-form-golf-tank-template/scripts/check-deps-age.mjs) que se ejecuta al hacer `pnpm install`.
Este script bloquea cualquier dependencia de npm que tenga menos de 24 horas de haber sido publicada, protegiéndote contra paquetes maliciosos inyectados de última hora.

Si por alguna razón necesitas instalar de urgencia un paquete muy nuevo y necesitas saltear esta protección, puedes hacerlo ejecutando:
```bash
SKIP_AGE_CHECK=1 pnpm install
```

---

## 📁 Estructura del Repositorio

Para que te orientes rápidamente por el código si deseas realizar personalizaciones profundas:

```
├── app/
│   ├── layout.tsx            # Estructura base del HTML, fuentes y metadatos SEO
│   ├── globals.css           # Estilos globales y tokens de diseño personalizados
│   ├── page.tsx              # Página principal que ensambla las secciones
│   └── api/
│       └── register/
│           └── route.ts      # Proxy API para procesar registros sin problemas de CORS
│
├── components/
│   ├── Hero.tsx              # Banner principal de bienvenida
│   ├── EventInfo.tsx         # Información rápida de fecha y lugar
│   ├── Agenda.tsx            # Cronograma visual del evento
│   ├── Format.tsx            # Detalles de modalidad e inclusiones
│   ├── Location.tsx          # Dirección y mapa interactivo
│   ├── RegistrationForm.tsx  # Formulario interactivo con manejo de estados
│   ├── Footer.tsx            # Pie de página con créditos
│   └── icons/                # Iconos SVG modulares
│
├── config/
│   └── event.ts              # 📝 CONFIGURACIÓN DEL EVENTO (Todo se cambia aquí)
│
├── apps-script.gs            # Script para pegar en Google Apps Script
├── .env.example              # Guía de variables de entorno requeridas
└── README.md                 # Esta guía de usuario
```

---

*Desarrollado con ❤️ para torneos de golf premium. Si tienes sugerencias de mejora, ¡siéntete libre de contribuir!*
