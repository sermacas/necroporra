# 🚀 Desplegar en Netlify

⚠️ **IMPORTANTE**: Netlify está diseñado principalmente para sitios estáticos y funciones serverless. Este proyecto usa un servidor Express completo, por lo que **Netlify no es la opción ideal**.

## Opciones Recomendadas (Mejores para servidores Express):

### 1. Railway (Recomendado) ⭐
- ✅ Gratis para empezar
- ✅ Perfecto para Node.js/Express
- ✅ Despliegue automático desde GitHub
- https://railway.app

**Pasos:**
1. Ve a https://railway.app
2. Inicia sesión con GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Selecciona tu repositorio
5. Railway detectará automáticamente Node.js
6. Añade variable de entorno: `ADMIN_PASSWORD` (opcional)
7. ¡Listo! Tendrás una URL pública

### 2. Render
- ✅ Gratis para proyectos personales
- ✅ Soporte completo para Express
- https://render.com

**Pasos:**
1. Ve a https://render.com
2. "New" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Configuración:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node
5. Añade variable: `ADMIN_PASSWORD` (opcional)
6. Despliega

### 3. Fly.io
- ✅ Opción gratuita disponible
- ✅ Buena para aplicaciones Node.js
- https://fly.io

---

## Si AÚN quieres usar Netlify:

Netlify podría funcionar si adaptas la aplicación a usar **Netlify Functions** (serverless), pero esto requiere refactorizar el código significativamente.

### Alternativa: Netlify + Functions

Si quieres intentar con Netlify Functions, necesitarías:
1. Convertir las rutas del servidor Express en funciones serverless
2. Usar Netlify Functions para las APIs
3. Mantener el frontend estático

Esto requeriría cambios importantes en la estructura del código.

---

## Recomendación Final

**Para este proyecto, usa Railway o Render** - Son mucho más simples y están diseñados específicamente para aplicaciones como esta.

