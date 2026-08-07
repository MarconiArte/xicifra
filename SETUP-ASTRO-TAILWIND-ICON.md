# Setup Base: Astro + Tailwind v3 + Astro-Icon

Guía de configuración probada para crear landing pages de óptica/estética compatibles con diseños generados por IA (Stitch, MidJourney, etc).

## ⚠️ ADVERTENCIA CRÍTICA: Tailwind v4 rompe diseños de IA

**NO uses:** `npx astro add tailwindcss` (instala v4 automáticamente)

**USA ESTO:** Instalación manual de v3.4.0 que reconoce clases personalizadas

---

## 1️⃣ Crear proyecto Astro

```bash
npm create astro@latest
# Elegí: Empty (sin template)
cd nombre-del-proyecto
```

---

## 📋 Alternativa: Copiar desde plantilla

Si ya tienes `plantilla-tailwindv3` creada, simplemente cópiala:

**En Bash:**
```bash
cp -r plantilla-tailwindv3 nombre-nuevo-proyecto
cd nombre-nuevo-proyecto
npm install
```

**En PowerShell:**
```powershell
Copy-Item -Path "plantilla-tailwindv3" -Destination "nombre-nuevo-proyecto" -Recurse
cd nombre-nuevo-proyecto
npm install
```

⚠️ **IMPORTANTE:** Después de copiar, no olvides cambiar el git remote (ver sección "Configurar Git Remote").

---

## 2️⃣ Instalar Tailwind CSS v3 (Manual)

```bash
npm install -D @astrojs/tailwind tailwindcss@^3.4.0
```

⚠️ **Importante:** El comando `@astrojs/tailwind` automáticamente integra el plugin en `astro.config.mjs`. NO ejecutes `npx astro add tailwindcss`.

---

## 3️⃣ Instalar sistema de iconos (Astro-Icon)

```bash
npx astro add astro-icon
npm install @iconify-json/lucide
```

Esto instala:
- **astro-icon**: Motor de iconos SVG optimizado
- **@iconify-json/lucide**: Librería de 300+ iconos minimalistas

---

## 4️⃣ Configurar `astro.config.mjs`

```javascript
// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

export default defineConfig({
    integrations: [
        tailwind(), 
        icon({
            include: {
                lucide: ['*'], // Cargar todos los iconos de Lucide
            },
        })
    ],
});
```

---

## 5️⃣ Crear `tailwind.config.mjs`

En la raíz del proyecto:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#2b8cee',
        'background-light': '#f6f7f8',
        'navy-deep': '#1a2b3c',
        'teal-accent': '#e0f2f1',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

---

## 6️⃣ Configurar `src/styles/global.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .glass-effect {
    @apply backdrop-blur-md bg-white/30 border border-white/20;
  }
}

@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;400;500;700;800&display=swap');
```

---

## 7️⃣ Estructura base: `src/layouts/Layout.astro`

```astro
---
import { Icon } from 'astro-icon/components';
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const { title = 'Mística', description = 'Soluciones visuales completas' } = Astro.props;
---

<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <title>{title}</title>
  </head>
  <body class="bg-white text-navy-deep">
    <slot />
  </body>
</html>
```

---

## 8️⃣ Cómo usar iconos

### En cualquier componente `.astro`:

```astro
---
import { Icon } from 'astro-icon/components';
---

<!-- Icon básico -->
<Icon name="lucide:eye" class="w-8 h-8 text-primary" />

<!-- Icon con animación -->
<Icon name="lucide:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />

<!-- Icon relleno (para stars) -->
<Icon name="lucide:star" class="w-5 h-5 fill-yellow-400 text-yellow-400" />
```

---

## 📋 Lucide Icons más comunes

| Necesidad | Icono Lucide |
|-----------|-------------|
| Ojo/Visión | `lucide:eye` |
| Lentes | `lucide:glasses` |
| Herramienta/Reparación | `lucide:wrench` |
| Contacto | `lucide:contact` |
| Flecha derecha | `lucide:arrow-right` |
| Verificado/Check | `lucide:check-circle` |
| Estrella | `lucide:star` |
| Ubicación | `lucide:map-pin` |
| Cámara | `lucide:camera` |
| Compartir | `lucide:share-2` |
| Menú | `lucide:menu` |
| Cerrar | `lucide:x` |

---

## 🎨 Estructura de componentes recomendada

```
src/
├── layouts/
│   └── Layout.astro
├── components/
│   ├── Header.astro
│   ├── Hero.astro
│   ├── Services.astro
│   ├── Collections.astro
│   ├── Testimonials.astro
│   ├── CTA.astro
│   └── Footer.astro
├── pages/
│   └── index.astro
└── styles/
    └── global.css
```

---

## ✅ Validación

Después de todo configurado, ejecutá:

```bash
npm run dev
```

Si ves la página en `http://localhost:3000` sin errores de `lucide` → ¡Configuración correcta! ✨

---

## 🚀 Compilar para producción

```bash
npm run build
```

Genera carpeta `dist/` lista para Deploy en Netlify, Vercel, etc.

---

## 🔗 Configurar Git Remote (IMPORTANTE)

Si copias la plantilla, asegúrate de cambiar el repositorio remoto:

```bash
# Ver el remote actual
git remote -v

# Remover el remote anterior
git remote remove origin

# Agregar tu repositorio nuevo
git remote add origin https://github.com/tu-usuario/tu-repo.git

# Verificar que cambió correctamente
git remote -v
```

⚠️ **Importante:** Siempre verifica `git remote -v` antes de hacer `git push` para asegurate que vas a pushear al repositorio correcto.

---

## ⚙️ Solución de problemas

### Error: "Unable to locate the lucide icon set"

```bash
# Asegúrate de tener los packages correctos
npm list @iconify-json/lucide astro-icon

# Si no aparecer, reinstala
npm install @iconify-json/lucide
```

### Tailwind no reconoce colores personalizados

Verifica que `tailwind.config.mjs` tenga la estructura correcta y que `global.css` importe los directives de Tailwind.

### Los estilos "dark:" aparecen en HTML

Asegúrate que `tailwind.config.mjs` NO tenga:
```javascript
darkMode: 'class', // ❌ REMOVER ESTO
```

---

## 📚 Recursos

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS v3](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [Astro-Icon](https://github.com/natemoo-re/astro-icon)

---

**Versiones validadas:**
- Astro: ^5.17.1
- Tailwind CSS: 3.4.19
- Astro-Icon: ^0.20.0
- @iconify-json/lucide: ^1.2.0

Documento actualizado: 24 de febrero de 2026 ✨
