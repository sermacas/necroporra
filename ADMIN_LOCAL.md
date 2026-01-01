# 🔐 Admin Local - Ver Listas desde Netlify

Como el admin se ejecuta localmente pero las listas se envían a Netlify, puedes usar este script para ver las listas desde tu máquina local.

## Opción 1: Script de Node.js (Recomendado)

1. Ejecuta el script:
   ```bash
   node admin-local.js
   ```
   
   O especifica la URL de Netlify:
   ```bash
   node admin-local.js https://necroporra2026.netlify.app
   ```

2. Verás todas las listas enviadas en la consola.

## Opción 2: Usar el Panel Admin Web Local

Puedes modificar el admin local para que se conecte a Netlify. Edita `public/admin.html` y cambia:

```javascript
const API_URL = 'https://necroporra2026.netlify.app'; // Cambiar a tu URL de Netlify
```

Luego ejecuta el servidor local solo para servir el admin:
```bash
npm start
```

Y abre: `http://localhost:3000/admin.html`

El admin se conectará a las APIs de Netlify para obtener las listas.

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

