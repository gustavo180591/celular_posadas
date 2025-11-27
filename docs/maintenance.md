# Guía de Mantenimiento

## Tabla de Contenidos
- [Monitoreo del Sistema](#monitoreo-del-sistema)
- [Respaldos](#respaldos)
- [Actualizaciones](#actualizaciones)
- [Rendimiento](#rendimiento)
- [Seguridad](#seguridad)
- [Escalabilidad](#escalabilidad)
- [Solución de Problemas](#solución-de-problemas)
- [Procedimientos de Emergencia](#procedimientos-de-emergencia)
- [Mantenimiento Programado](#mantenimiento-programado)
- [Documentación](#documentación)

## Monitoreo del Sistema

### Herramientas de Monitoreo
- **Uptime Robot**: Monitoreo de disponibilidad
- **New Relic**: Monitoreo de rendimiento de aplicaciones
- **MongoDB Atlas**: Monitoreo de base de datos
- **Sentry**: Monitoreo de errores en tiempo real

### Métricas Clave a Monitorear
- **Disponibilidad**: Tiempo de actividad del sitio
- **Tiempo de respuesta**: API y tiempo de carga de páginas
- **Uso de recursos**: CPU, memoria, disco
- **Errores**: Errores de servidor, excepciones no manejadas
- **Tráfico**: Número de visitantes, solicitudes por segundo

### Alertas
Configurar alertas para:
- Tiempo de inactividad no planificado
- Alta utilización de CPU/memoria (>80% durante 5 minutos)
- Errores 5xx
- Tiempo de respuesta lento (>2s para el 95% de las solicitudes)

## Respaldos

### Base de Datos
```bash
# Comando para respaldo
mongodump --uri="mongodb://user:password@localhost:27017" --out=/backups/mongodb/$(date +%Y%m%d)

# Comprimir respaldo
tar -czvf /backups/mongodb-$(date +%Y%m%d).tar.gz /backups/mongodb/$(date +%Y%m%d)

# Eliminar respaldos antiguos (más de 30 días)
find /backups -name "mongodb-*.tar.gz" -mtime +30 -delete
```

### Archivos de la Aplicación
```bash
# Crear respaldo de la aplicación
tar -czvf /backups/app-$(date +%Y%m%d).tar.gz /var/www/celular-posadas
```

### Frecuencia de Respaldos
- **Base de datos**: Diario (conservar 30 días)
- **Archivos de la aplicación**: Semanal (conservar 4 semanas)
- **Backup de configuración**: Después de cada cambio

### Almacenamiento de Respaldos
- Almacenar en ubicación externa (AWS S3, Google Cloud Storage)
- Encriptar datos sensibles
- Verificar regularmente la integridad de los respaldos

## Actualizaciones

### Dependencias
```bash
# Verificar dependencias desactualizadas
npm outdated

# Actualizar dependencias
npm update

# Actualizar una dependencia específica
npm install paquete@latest
```

### Actualización del Sistema Operativo
```bash
# Actualizar lista de paquetes
sudo apt update

# Actualizar paquetes instalados
sudo apt upgrade -y

# Actualizar distribución (si es necesario)
sudo apt dist-upgrade -y

# Limpiar paquetes innecesarios
sudo apt autoremove -y
```

### Plan de Actualización
1. Probar actualizaciones en entorno de desarrollo
2. Crear respaldo completo
3. Aplicar actualizaciones en entorno de pruebas
4. Verificar que todo funciona correctamente
5. Programar ventana de mantenimiento
6. Aplicar actualizaciones en producción
7. Monitorear después de la actualización

## Rendimiento

### Optimización de Base de Datos
```javascript
// Ejemplo: Crear índices para consultas frecuentes
db.products.createIndex({ name: 'text', description: 'text' });
db.orders.createIndex({ userId: 1, createdAt: -1 });
```

### Limpieza de Datos
```javascript
// Eliminar órdenes canceladas con más de 30 días
db.orders.deleteMany({ 
  status: 'cancelled',
  updatedAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
});
```

### Caché
- Implementar Redis para caché de consultas frecuentes
- Configurar caché HTTP con Nginx
- Usar Service Workers para activar el modo offline

## Seguridad

### Auditorías de Seguridad
```bash
# Escanear dependencias vulnerables
npm audit

# Corregir vulnerabilidades
npm audit fix

# Escanear puertos abiertos
nmap -sV localhost
```

### Renovación de Certificados SSL
```bash
# Renovar certificados Let's Encrypt
sudo certbot renew --dry-run

# Si todo está bien, renovar sin el modo de prueba
sudo certbot renew
```

### Revisión de Registros
```bash
# Ver logs de la aplicación
journalctl -u celulares-posadas -f

# Ver intentos de acceso fallidos
grep "Failed password" /var/log/auth.log

# Ver errores de Nginx
tail -f /var/log/nginx/error.log
```

## Escalabilidad

### Escalado Horizontal
1. Configurar balanceador de carga (Nginx, HAProxy)
2. Implementar sesiones compartidas (usar Redis)
3. Sincronizar archivos estáticos entre servidores

### Optimización de Consultas
```javascript
// Antes
db.orders.find({}).sort({ createdAt: -1 });

// Después
db.orders.find({})
  .sort({ createdAt: -1 })
  .limit(20)
  .hint({ createdAt: -1 });  // Usar índice
```

### CDN para Recursos Estáticos
- Configurar CloudFront o Cloudflare
- Implementar invalidador de caché
- Comprimir recursos (Gzip/Brotli)

## Solución de Problemas

### Diagnóstico de Problemas Comunes

#### El sitio está lento
1. Verificar uso de recursos (CPU, memoria, disco)
2. Revisar consultas lentas en MongoDB
3. Verificar tráfico de red
4. Comprobar caché

#### Error 500
1. Revisar logs de la aplicación
2. Verificar conexión a la base de datos
3. Comprobar permisos de archivos
4. Verificar espacio en disco

#### Problemas de Conexión
1. Verificar si el servicio está activo
2. Comprobar reglas de firewall
3. Verificar configuración de red

### Herramientas de Diagnóstico
```bash
# Uso de CPU
top
htop

# Uso de memoria
free -m
vmstat 1

# Uso de disco
df -h
du -sh /

# Red
netstat -tulpn
ss -tulpn

# Rendimiento de E/S
iotop
```

## Procedimientos de Emergencia

### Restauración desde Respaldo
```bash
# Detener la aplicación
sudo systemctl stop celulares-posadas

# Restaurar base de datos
mongorestore --drop /backups/mongodb/ultimo-respaldo

# Restaurar archivos de la aplicación
tar -xzvf /backups/app-ultimo-respaldo.tar.gz -C /

# Reiniciar servicios
sudo systemctl start celulares-posadas
```

### Mitigación de Ataques
1. Identificar el tipo de ataque (DDoS, inyección, etc.)
2. Activar WAF (Web Application Firewall)
3. Bloquear IPs maliciosas
4. Notificar al equipo de seguridad

### Página de Mantenimiento
1. Activar modo mantenimiento en Nginx
2. Mostrar página de mantenimiento personalizada
3. Redirigir tráfico a servidor estático si es necesario

## Mantenimiento Programado

### Tareas Diarias
- [ ] Verificar respaldos
- [ ] Revisar logs de errores
- [ ] Monitorear uso de recursos
- [ ] Revisar intentos de acceso fallidos

### Tareas Semanales
- [ ] Limpiar archivos temporales
- [ ] Optimizar índices de base de datos
- [ ] Revisar y aplicar actualizaciones de seguridad
- [ ] Verificar espacio en disco

### Tareas Mensuales
- [ ] Revisar políticas de seguridad
- [ ] Actualizar documentación
- [ ] Probar procedimientos de recuperación
- [ ] Revisar métricas de rendimiento

## Documentación

### Actualización de Documentación
1. Actualizar `CHANGELOG.md` con los cambios
2. Actualizar documentación de la API
3. Actualizar guías de instalación/configuración
4. Notificar al equipo sobre cambios importantes

### Generación de Documentación
```bash
# Generar documentación de la API
npm run docs:api

# Generar documentación de componentes
npm run docs:components
```

### Plantillas
#### Informe de Incidencia
```markdown
# Informe de Incidencia

## Descripción
[Describa el problema con el mayor detalle posible]

## Fecha y Hora
[Fecha y hora en que ocurrió el problema]

## Impacto
[¿Cómo afecta esto a los usuarios/sistema?]

## Pasos para Reproducir
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

## Comportamiento Esperado
[¿Qué debería haber pasado?]

## Comportamiento Actual
[¿Qué está pasando realmente?]

## Evidencia
[Capturas de pantalla, logs, etc.]

## Solución Aplicada
[¿Cómo se resolvió el problema?]

## Prevención
[¿Cómo podemos evitar que vuelva a ocurrir?]
```

#### Informe de Mantenimiento
```markdown
# Informe de Mantenimiento

## Fecha
[Fecha del mantenimiento]

## Hora de Inicio
[Hora de inicio]

## Hora de Finalización
[Hora de finalización]

## Tareas Realizadas
- [ ] Tarea 1
- [ ] Tarea 2
- [ ] Tarea 3

## Problemas Encontrados
[Describa cualquier problema encontrado]

## Acciones Tomadas
[Describa las acciones tomadas para resolver los problemas]

## Próximos Pasos
[¿Qué sigue? ¿Hay tareas pendientes?]

## Firmas
- Responsable: ______________________
- Supervisor: ______________________
```

## Contactos de Emergencia

### Equipo de Desarrollo
- Nombre: [Nombre] - [Teléfono] - [Email]
- Nombre: [Nombre] - [Teléfono] - [Email]

### Proveedores de Servicios
- **Hosting**: [Nombre] - [Teléfono] - [Email]
- **Dominio**: [Nombre] - [Teléfono] - [Email]
- **Base de Datos**: [Nombre] - [Teléfono] - [Email]

### Horario de Soporte
- Lunes a Viernes: 9:00 - 18:00
- Emergencias: 24/7 (solo para problemas críticos)
