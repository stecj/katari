# Usa la imagen oficial de Node.js versión 20 como base
FROM node:20

# Establece el directorio de trabajo en el contenedor
WORKDIR /frontend

# Copia solo los archivos necesarios para la instalación de dependencias
COPY package.json package-lock.json* ./

# Instala las dependencias del proyecto
RUN npm install --only=production

# Copia el resto de los archivos del proyecto al directorio de trabajo del contenedor
COPY . .

# Especifica un usuario no root para mayor seguridad
USER node

# Expone el puerto que usa tu aplicación, ajusta según el puerto que tu app utilice
EXPOSE 3000

# Comando para ejecutar tu aplicación
CMD ["npm", "start"]