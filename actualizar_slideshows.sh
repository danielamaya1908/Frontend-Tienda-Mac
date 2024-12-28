#!/bin/bash
# Este script hace git pull, agrega las imágenes de Slideshows, realiza commit y hace git push

# Mensaje inicial
echo "Iniciando actualización de imágenes del slideshow..."

# Actualizar el repositorio local
git pull --rebase origin main

# Añadir los cambios de la carpeta Slideshows
git add src/components/Home/SlidesShows/img

# Hacer commit con un mensaje claro
git commit -m "Actualización de imágenes del slideshow"

# Subir los cambios al repositorio remoto
git push origin main

# Mensaje de éxito
echo "Actualización de imágenes del slideshow completada con éxito."
