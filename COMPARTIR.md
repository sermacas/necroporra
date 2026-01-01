# 📱 Cómo Compartir la Necroporra 2026

## Opción 1: Red Local (WiFi) - Recomendado para uso inmediato

### Paso 1: Iniciar el servidor
```bash
npm start
```

Cuando el servidor inicie, verás algo como esto:
```
========================================
🚀 Servidor Necroporra 2026 iniciado
========================================
📍 Local:     http://localhost:3000
🌐 Red local: http://192.168.1.XXX:3000
🔐 Admin:     http://192.168.1.XXX:3000/admin.html
========================================
```

### Paso 2: Encontrar tu IP local (si no aparece arriba)

**En Mac:**
1. Abre Terminal
2. Ejecuta: `ipconfig getifaddr en0` (o `ipconfig getifaddr en1` si no funciona)
3. Verás algo como: `192.168.1.100`

**En Windows:**
1. Abre CMD (Símbolo del sistema)
2. Ejecuta: `ipconfig`
3. Busca "Dirección IPv4" bajo tu conexión WiFi (ej: `192.168.1.100`)

**En Linux:**
```bash
hostname -I | awk '{print $1}'
```

### Paso 3: Compartir con tus amigos

1. **Asegúrate de que todos estén en la misma red WiFi**
2. Comparte esta URL con tus amigos:
   ```
   http://TU_IP:3000
   ```
   Por ejemplo: `http://192.168.1.100:3000`

3. Para el panel de admin, comparte:
   ```
   http://TU_IP:3000/admin.html
   ```
   Por ejemplo: `http://192.168.1.100:3000/admin.html`

### Paso 4: Acceder desde móviles

Tus amigos pueden:
- Abrir la URL en el navegador de su móvil (Chrome, Safari, etc.)
- Añadir su lista con nombre, email y 10 personajes
- La lista quedará guardada en tu servidor

### ⚠️ Importante:

- **Firewall**: Si no funciona, puede que necesites permitir conexiones en el puerto 3000:
  - **Mac**: Sistema → Seguridad → Firewall → Opciones → Permitir conexiones entrantes para Node
  - **Windows**: Configuración de Windows Defender Firewall → Permitir una app → Node.js

- **Mantén el servidor corriendo**: Mientras tus amigos estén enviando listas, no cierres la terminal donde corre el servidor

- **Misma red**: Todos deben estar conectados a la misma WiFi

---

## Opción 2: Desplegar en Internet (Para compartir desde cualquier lugar)

Si quieres que tus amigos puedan acceder desde cualquier lugar (no solo la misma WiFi), puedes desplegar la aplicación en un servicio gratuito:

### Opciones gratuitas:

1. **Railway** (https://railway.app)
   - Conecta tu repositorio de GitHub
   - Despliega automáticamente
   - Tienes una URL pública como: `https://tu-app.railway.app`

2. **Render** (https://render.com)
   - Servicio gratuito para Node.js
   - Despliega desde GitHub
   - URL pública gratuita

3. **Fly.io** (https://fly.io)
   - Opción gratuita disponible
   - Fácil de desplegar

### Pasos para desplegar (ejemplo con Railway):

1. Crea una cuenta en Railway
2. Conecta tu repositorio de GitHub
3. Railway detectará automáticamente que es una app Node.js
4. Añade la variable de entorno `ADMIN_PASSWORD` si quieres cambiar la contraseña
5. ¡Listo! Tendrás una URL pública

---

## Resumen Rápido

**Para uso local (misma WiFi):**
1. `npm start`
2. Copia la IP que aparece (ej: `192.168.1.100`)
3. Comparte: `http://192.168.1.100:3000`
4. Admin: `http://192.168.1.100:3000/admin.html`

**Para uso público (internet):**
1. Despliega en Railway/Render/Fly.io
2. Comparte la URL pública que te den

