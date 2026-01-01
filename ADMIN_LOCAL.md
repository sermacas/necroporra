# 🔐 Admin Local - Ver Listas desde Netlify

Como el admin se ejecuta localmente pero las listas se envían a Netlify, tienes varias opciones para ver las listas.

## Opción 1: Panel Admin Web Local (Recomendado) ⭐

Usa el panel admin que se conecta directamente a Netlify:

1. Abre `admin-netlify.html` en tu navegador (doble clic o arrastra al navegador)
   
   O ejecuta el servidor local y abre:
   ```bash
   npm start
   ```
   Luego ve a: `http://localhost:3000/admin-netlify.html`

2. Ingresa la contraseña: `admin123` (o la que hayas configurado en Netlify)

3. Verás todas las listas enviadas desde Netlify con la interfaz completa del admin.

**Nota:** Si tu URL de Netlify es diferente, edita `admin-netlify.html` y cambia:
```javascript
const NETLIFY_URL = 'https://necroporra2026.netlify.app'; // Cambia por tu URL
```

## Opción 2: Script de Node.js (Consola)

1. Ejecuta el script:
   ```bash
   npm run admin
   ```
   
   O directamente:
   ```bash
   node admin-local.js
   ```
   
   O especifica la URL de Netlify:
   ```bash
   node admin-local.js https://necroporra2026.netlify.app
   ```

2. Verás todas las listas enviadas en la consola.

## Opción 3: Ver directamente en Netlify

Simplemente ve a: `https://necroporra2026.netlify.app/admin.html`

Y usa la contraseña: `admin123` (o la que hayas configurado)

---

**Nota importante sobre almacenamiento:**

Actualmente, las listas se guardan en `/tmp` en Netlify Functions, que es temporal. Los datos pueden perderse cuando:
- Netlify reinicia las funciones
- Hay un nuevo deploy

Para un almacenamiento persistente, considera usar una base de datos como:
- MongoDB Atlas (gratis)
- FaunaDB (gratis)
- Supabase (gratis)

