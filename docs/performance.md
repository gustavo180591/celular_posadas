# Guía de Rendimiento

## Tabla de Contenidos
- [Métricas Clave](#métricas-clave)
- [Optimización del Frontend](#optimización-del-frontend)
- [Optimización de la API](#optimización-de-la-api)
- [Optimización de la Base de Datos](#optimización-de-la-base-de-datos)
- [Caché](#caché)
- [Optimización de Imágenes](#optimización-de-imágenes)
- [Optimización de Red](#optimización-de-red)
- [Monitoreo y Alertas](#monitoreo-y-alertas)
- [Pruebas de Carga](#pruebas-de-carga)
- [Optimización para Móviles](#optimización-para-móviles)
- [Herramientas Recomendadas](#herramientas-recomendadas)

## Métricas Clave

### Core Web Vitals
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

### Métricas Adicionales
- **Time to First Byte (TTFB)**: < 200ms
- **First Contentful Paint (FCP)**: < 1.8s
- **Speed Index**: < 3.4s
- **Time to Interactive (TTI)**: < 3.8s
- **Total Blocking Time (TBT)**: < 200ms

## Optimización del Frontend

### Carga de Código
- **Code Splitting**:
  ```javascript
  // Componente con carga diferida
  const LazyComponent = React.lazy(() => import('./LazyComponent'));
  
  function MyComponent() {
    return (
      <Suspense fallback={<div>Cargando...</div>}>
        <LazyComponent />
      </Suspense>
    );
  }
  ```

- **Tree Shaking**:
  ```javascript
  // En webpack.config.js
  module.exports = {
    mode: 'production',
    optimization: {
      usedExports: true,
    },
  };
  ```

### Renderizado del Lado del Cliente (CSR)
- Uso de `React.memo` para componentes puros
- Implementación de `useMemo` y `useCallback`
- Virtualización de listas con `react-window`
- Renderizado condicional de componentes pesados

### Optimización de CSS
- Extracción de CSS crítico
- Minificación y purga de CSS no utilizado
- Uso de `content-visibility` para renderizado perezoso
- Evitar `@import` en CSS (usar enlaces en HTML)

## Optimización de la API

### Endpoints Eficientes
- Paginación de resultados
- Filtrado y ordenamiento en el servidor
- Campos seleccionables
- Compresión de respuestas

### Ejemplo de Endpoint Optimizado
```typescript
// GET /api/products
app.get('/api/products', async (req, res) => {
  const { 
    page = 1, 
    limit = 10, 
    sort = 'name', 
    order = 'asc',
    fields = 'name,price,image',
    ...filters 
  } = req.query;

  const skip = (page - 1) * limit;
  const sortOptions = { [sort]: order === 'asc' ? 1 : -1 };
  
  // Construir consulta con filtros
  const query = {};
  if (filters.category) {
    query.category = filters.category;
  }
  if (filters.price) {
    const [min, max] = filters.price.split('-').map(Number);
    query.price = { $gte: min, $lte: max };
  }

  // Ejecutar consultas en paralelo
  const [items, total] = await Promise.all([
    Product.find(query)
      .select(fields.split(',').join(' '))
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    Product.countDocuments(query)
  ]);

  res.json({
    data: items,
    pagination: {
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      limit: Number(limit)
    }
  });
});
```

### Caché de Respuestas
```javascript
// Middleware de caché con Redis
const cache = (duration) => {
  return (req, res, next) => {
    const key = `__express__${req.originalUrl || req.url}`;
    const cachedBody = client.get(key);

    if (cachedBody) {
      res.send(JSON.parse(cachedBody));
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        client.setex(key, duration, JSON.stringify(body));
        res.sendResponse(body);
      };
      next();
    }
  };
};

// Uso
app.get('/api/products', cache(3600), productController.getProducts);
```

## Optimización de la Base de Datos

### Índices
```javascript
// Crear índices para consultas frecuentes
await db.collection('products').createIndex({ name: 'text', description: 'text' });
await db.collection('orders').createIndex({ userId: 1, createdAt: -1 });
await db.collection('users').createIndex({ email: 1 }, { unique: true });
```

### Consultas Eficientes
- Proyección de solo los campos necesarios
- Uso de `explain()` para analizar consultas
- Evitar operaciones costosas como `$where` y `$regex` sin índices
- Usar operadores de agregación para procesamiento en la base de datos

### Ejemplo de Consulta Optimizada
```javascript
// Consulta ineficiente
const products = await Product.find({});
const filtered = products.filter(p => p.price > 1000);

// Consulta optimizada
const expensiveProducts = await Product.find({ price: { $gt: 1000 } })
  .select('name price image')
  .sort({ price: -1 })
  .limit(10);
```

## Caché

### Estrategias de Caché
1. **Nivel de Página**: Para páginas completas
2. **Nivel de API**: Para respuestas de API
3. **Nivel de Objeto**: Para objetos de negocio
4. **Nivel de Consulta**: Para resultados de consultas

### Implementación con Redis
```javascript
const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setex).bind(client);

async function getFromCache(key) {
  try {
    const value = await getAsync(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error de caché:', error);
    return null;
  }
}

async function setCache(key, value, ttl = 3600) {
  try {
    await setexAsync(key, ttl, JSON.stringify(value));
  } catch (error) {
    console.error('Error al guardar en caché:', error);
  }
}
```

## Optimización de Imágenes

### Formatos Modernos
- **WebP**: Para la mayoría de las imágenes
- **AVIF**: Para imágenes con alta calidad
- **SVG**: Para iconos y gráficos vectoriales

### Tamaños Responsivos
```html
<picture>
  <source 
    srcset="image.webp 1x, image@2x.webp 2x"
    type="image/webp">
  <source 
    srcset="image.jpg 1x, image@2x.jpg 2x"
    type="image/jpeg">
  <img 
    src="image.jpg" 
    alt="Descripción"
    loading="lazy"
    width="800"
    height="600">
</picture>
```

### Lazy Loading
```html
<!-- Imágenes fuera del viewport -->
<img 
  src="placeholder.jpg" 
  data-src="image.jpg" 
  alt="Descripción"
  loading="lazy"
  class="lazyload">

<!-- Script para carga perezosa -->
<script>
  if ('loading' in HTMLImageElement.prototype) {
    // El navegador soporta loading="lazy"
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Polyfill para navegadores antiguos
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }
</script>
```

## Optimización de Red

### HTTP/2 y HTTP/3
- Habilitar HTTP/2 en el servidor
- Usar Server Push para recursos críticos
- Configurar priorización de recursos

### Preconexiones
```html
<!-- Preconectar a orígenes externos -->
<link rel="preconnect" href="https://api.celularesposadas.com">
<link rel="dns-prefetch" href="https://api.celularesposadas.com">

<!-- Precargar recursos críticos -->
<link rel="preload" href="/css/critical.css" as="style">
<link rel="preload" href="/js/main.js" as="script">

<!-- Precargar fuentes -->
<link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin>
```

### Compresión
- Habilitar Brotli o Gzip
- Nivel de compresión óptimo
- Comprimir respuestas de API

## Monitoreo y Alertas

### Herramientas de Monitoreo
- **Lighthouse**: Auditorías de rendimiento
- **Web Vitals**: Métricas en tiempo real
- **New Relic**: Monitoreo de aplicaciones
- **Sentry**: Monitoreo de errores

### Configuración de Alertas
- LCP > 2.5s
- FID > 100ms
- CLS > 0.1
- Errores > 1%
- Tiempo de respuesta del servidor > 1s

## Pruebas de Carga

### Herramientas
- **k6**: Para pruebas de carga programáticas
- **Artillery**: Para pruebas de carga declarativas
- **Locust**: Para pruebas de carga con Python

### Escenario de Prueba con k6
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },  // Ramp-up
    { duration: '1m', target: 50 },   // Carga normal
    { duration: '10s', target: 100 }, // Pico
    { duration: '30s', target: 0 },   // Ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% de las peticiones deben ser <500ms
    http_req_failed: ['rate<0.1'],    // Menos del 10% de errores
  },
};

export default function () {
  const res = http.get('https://api.celularesposadas.com/products');
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  sleep(1);
}
```

## Optimización para Móviles

### Técnicas Avanzadas
- **Adaptive Loading**: Cargar recursos según el dispositivo
- **Service Workers**: Para modo offline
- **Web Workers**: Para tareas pesadas

### Ejemplo de Service Worker
```javascript
// sw.js
const CACHE_NAME = 'celulares-posadas-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/app.js',
  '/images/logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

## Herramientas Recomendadas

### Análisis y Monitoreo
- **Lighthouse**: Auditorías de rendimiento
- **WebPageTest**: Pruebas de rendimiento detalladas
- **Calibre**: Monitoreo continuo

### Optimización
- **ImageOptim**: Compresión de imágenes
- **webpack-bundle-analyzer**: Análisis de paquetes
- **Critters**: Extracción de CSS crítico

### Pruebas
- **k6**: Pruebas de carga
- **Sentry**: Monitoreo de errores
- **SpeedCurve**: Monitoreo de rendimiento visual
