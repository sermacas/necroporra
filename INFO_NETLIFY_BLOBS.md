# ⚠️ Problema con Netlify Blobs

Las funciones están devolviendo error 503. Esto puede deberse a:

1. **Netlify Blobs necesita ser habilitado** en el dashboard de Netlify
2. **El plan gratuito podría no incluir Blobs** (aunque debería)
3. **Error en la configuración** del store

## Soluciones:

### Opción 1: Verificar en Netlify Dashboard

1. Ve a https://app.netlify.com
2. Selecciona tu sitio (necroporra2026)
3. Ve a "Functions" → "Blobs"
4. Verifica que esté habilitado

### Opción 2: Usar una alternativa (JSONBin.io, MongoDB Atlas, etc.)

Si Netlify Blobs no funciona, podemos usar:
- **JSONBin.io** (gratis, fácil)
- **MongoDB Atlas** (gratis)
- **Supabase** (gratis)

¿Quieres que configure alguna de estas alternativas?

