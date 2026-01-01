# 🚀 Subir a GitHub - Pasos Rápidos

## Paso 1: Crear el repositorio en GitHub

1. Ve a https://github.com y inicia sesión
2. Haz clic en el botón **"+"** (arriba a la derecha) → **"New repository"**
3. Nombre del repositorio: `necroporra-2026` (o el que prefieras)
4. Descripción (opcional): "Aplicación web para la necroporra 2026"
5. **NO marques** "Initialize this repository with a README" (ya tenemos uno)
6. Haz clic en **"Create repository"**

## Paso 2: Conectar y subir el código

Una vez creado el repositorio, GitHub te mostrará instrucciones. Ejecuta estos comandos en tu terminal (desde la carpeta del proyecto):

```bash
cd /Users/sergiomarincastro/Downloads/necroporra

# Añadir el repositorio remoto (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/necroporra-2026.git

# Renombrar la rama principal a 'main' (si es necesario)
git branch -M main

# Subir el código
git push -u origin main
```

**Nota:** Si GitHub te muestra una URL diferente en las instrucciones, usa esa en lugar de la de arriba.

## Paso 3: Autenticación

Si te pide usuario y contraseña:
- Usuario: Tu usuario de GitHub
- Contraseña: Usa un **Personal Access Token** (no tu contraseña normal)
  - Crea uno aquí: https://github.com/settings/tokens
  - Selecciona el scope `repo`
  - Copia el token y úsalo como contraseña

## ¡Listo! 🎉

Tu código estará disponible en: `https://github.com/TU_USUARIO/necroporra-2026`

---

## Comandos rápidos (todo en uno)

```bash
cd /Users/sergiomarincastro/Downloads/necroporra
git remote add origin https://github.com/TU_USUARIO/necroporra-2026.git
git branch -M main
git push -u origin main
```

(Reemplaza `TU_USUARIO` con tu usuario real de GitHub)

