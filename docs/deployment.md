# Guía de Despliegue

## Requisitos del Sistema

### Servidor
- **Sistema Operativo**: Ubuntu 20.04 LTS o superior
- **RAM Mínima**: 1GB (2GB recomendado)
- **Almacenamiento**: 10GB (SSD recomendado)
- **Node.js**: v18.x o superior
- **npm**: v9.x o superior
- **MongoDB**: v6.x o superior

## Configuración Inicial

### 1. Instalar Dependencias del Sistema
```bash
# Actualizar paquetes
sudo apt update && sudo apt upgrade -y

# Instalar Node.js y npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org

# Iniciar MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 2. Configurar Variables de Entorno
Crear archivo `.env` en la raíz del proyecto:
```env
# Entorno
NODE_ENV=production
PORT=3000

# Base de Datos
MONGODB_URI=mongodb://localhost:27017/celulares_posadas

# Autenticación
JWT_SECRET=tu_clave_secreta_muy_segura
JWT_EXPIRES_IN=30d

# WhatsApp
WHATSAPP_NUMBER=5493764000000

# URL del Frontend
FRONTEND_URL=https://tudominio.com
```

## Proceso de Despliegue

### 1. Obtener el Código
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/celular-posadas.git
cd celular-posadas

# Instalar dependencias
npm install

# Construir la aplicación
npm run build
```

### 2. Configurar PM2 (Process Manager)
```bash
# Instalar PM2 globalmente
sudo npm install -g pm2

# Iniciar la aplicación con PM2
pm2 start npm --name "celulares-posadas" -- start

# Configurar inicio automático
pm2 startup
pm2 save
```

### 3. Configurar Nginx como Proxy Inverso
```bash
# Instalar Nginx
sudo apt install -y nginx

# Crear configuración del sitio
sudo nano /etc/nginx/sites-available/celulares-posadas
```

Agregar la siguiente configuración:
```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Habilitar el sitio:
```bash
sudo ln -s /etc/nginx/sites-available/celulares-posadas /etc/nginx/sites-enabled/
sudo nginx -t  # Verificar la configuración
sudo systemctl restart nginx
```

### 4. Configurar Certificado SSL con Let's Encrypt
```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtener certificado SSL
sudo certbot --nginx -d tudominio.com -d www.tudominio.com

# Renovar automáticamente
sudo certbot renew --dry-run
```

## Actualizaciones

### 1. Actualizar el Código
```bash
cd /ruta/a/celular-posadas
git pull origin main
npm install
npm run build
pm2 restart celulares-posadas
```

### 2. Verificar el Estado
```bash
# Ver logs
pm2 logs celulares-posadas

# Ver estado
pm2 status
```

## Resolución de Problemas Comunes

### La aplicación no se inicia
```bash
# Ver logs de la aplicación
pm2 logs celulares-posadas

# Verificar si el puerto está en uso
sudo lsof -i :3000

# Verificar si MongoDB está corriendo
sudo systemctl status mongod
```

### Problemas con Nginx
```bash
# Verificar configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx

# Ver logs de Nginx
sudo tail -f /var/log/nginx/error.log
```

## Monitoreo

### Uptime Robot
Configurar monitoreo en [Uptime Robot](https://uptimerobot.com/) para recibir alertas de caídas.

### PM2 Monitoring
```bash
# Instalar el módulo de monitoreo
pm2 install pm2-server-monit

# Ver métricas
pm2 monit
```

## Backup y Recuperación

### Backup de Base de Datos
```bash
# Crear backup
mongodump --db=celulares_posadas --out=/ruta/backups/$(date +%Y%m%d)

# Restaurar backup
mongorestore /ruta/backups/ultimo_backup
```

### Backup de Archivos
```bash
# Comprimir la aplicación
tar -czvf celulares-posadas-backup-$(date +%Y%m%d).tar.gz /ruta/a/celular-posadas
```
## Despliegue en Plataformas en la Nube

### Vercel
1. Conectar el repositorio de GitHub a Vercel
2. Configurar las variables de entorno en la interfaz de Vercel
3. Establecer el comando de build: `npm run build`
4. Especificar el directorio de salida: `dist`
5. Configurar el dominio personalizado si es necesario

### Heroku
```bash
# Instalar Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Iniciar sesión
heroku login

# Crear aplicación
heroku create celulares-posadas

# Configurar variables de entorno
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=tu_cadena_conexion_mongodb

# Desplegar
git push heroku main
```

## Escalabilidad

### Aumentar Recursos PM2
```bash
# Escalar a 4 instancias
pm2 scale celulares-posadas 4

# Balancear carga
pm2 start npm --name="celulares-posadas" -i max -- start
```

### Usar MongoDB Atlas
1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear un clúster gratuito
3. Configurar IPs permitidas
4. Obtener cadena de conexión y actualizar `MONGODB_URI`

## Seguridad

### Firewall
```bash
# Instalar UFW
sudo apt install ufw

# Configurar reglas
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
```

### Actualizaciones de Seguridad
```bash
# Actualizar paquetes del sistema
sudo apt update && sudo apt upgrade -y

# Actualizar dependencias de Node.js
npm audit fix
```
