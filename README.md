# Necroporra 2026

Aplicación web para gestionar listas de la necroporra 2026. Permite a los participantes añadir sus listas de 10 personajes famosos siguiendo las reglas establecidas.

## Reglas

- Cada participante debe añadir **10 personajes famosos**
- Todos los personajes deben ser **menores de 100 años**
- **5 personajes** deben tener 84+ años O ser terminales
- **5 personajes** deben tener menos de 84 años Y NO ser terminales

## Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor:
```bash
npm start
```

3. Abre tu navegador en: `http://localhost:3000`

## Uso

### Para Participantes

La aplicación funciona en dispositivos móviles y escritorio. Los participantes pueden:
- Añadir su lista con nombre, correo electrónico y 10 personajes
- Solo se permite una lista por correo electrónico (previene duplicados)
- Las listas son privadas, solo el administrador puede verlas

### Para Administrador

Para acceder al panel de administración:
1. Ve a: `http://localhost:3000/admin.html`
2. Ingresa la contraseña de administrador (por defecto: `admin123`)
3. Podrás ver todas las listas enviadas con:
   - Nombre y correo del participante
   - Fecha y hora de envío
   - Estadísticas (total de listas, listas de las últimas 24h)
   - Opción de eliminar listas

**Cambiar contraseña de admin:**
Puedes cambiar la contraseña estableciendo la variable de entorno:
```bash
ADMIN_PASSWORD=tu_contraseña npm start
```

## Características

- ✅ Validación de reglas en tiempo real
- ✅ Prevención de listas duplicadas por email
- ✅ Listas privadas (solo visibles para el admin)
- ✅ Interfaz moderna y responsive
- ✅ Panel de administración con estadísticas
- ✅ Validación de formato de email

## Compartir con amigos

### Método Rápido (Red Local WiFi)

1. **Inicia el servidor:**
   ```bash
   npm start
   ```
   El servidor mostrará tu IP local automáticamente.

2. **Comparte estas URLs:**
   - Para participantes: `http://TU_IP:3000`
   - Para admin: `http://TU_IP:3000/admin.html`
   
   (Reemplaza `TU_IP` con la IP que aparece al iniciar el servidor, ej: `192.168.1.100`)

3. **Asegúrate de que todos estén en la misma red WiFi**

4. **Tus amigos pueden acceder desde sus móviles** abriendo la URL en su navegador

**⚠️ Nota:** Mantén el servidor corriendo mientras tus amigos envían sus listas.

### Método Público (Internet)

Para compartir desde cualquier lugar (sin necesidad de estar en la misma WiFi), puedes desplegar la aplicación en servicios gratuitos como:
- **Railway** (https://railway.app) - Recomendado, muy fácil
- **Render** (https://render.com)
- **Fly.io** (https://fly.io)

Ver `COMPARTIR.md` para instrucciones detalladas.

Los datos se guardan en el archivo `data.json` en la raíz del proyecto.

