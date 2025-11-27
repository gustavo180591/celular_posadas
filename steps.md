# Celulares Posadas - Proyecto de Landing Page

**Estado del Proyecto**: 🟡 En Desarrollo (MVP en progreso)
**Última Actualización**: 26/11/2025

## Estructura del Proyecto

```
celular-posadas/
├── public/
├── src/
│   ├── components/
│   │   ├── DeliverySection.astro
│   │   ├── Hero.astro
│   │   ├── PaymentMethodsSection.astro
│   │   ├── ProductCard.astro
│   │   ├── ProductsSection.astro
│   │   └── TrustSection.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   │   └── products.ts
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── .gitignore
├── astro.config.mjs
├── package.json
├── README.md
├── steps.md
└── tailwind.config.mjs
```

## Pasos de Implementación

### 1. Configuración Inicial (Listo)
- [x] Inicializar proyecto Astro con TypeScript y Tailwind CSS
- [x] Configurar Tailwind CSS con los colores y fuentes del proyecto
- [x] Configurar rutas básicas
- [x] Crear estructura de carpetas

### 2. Layout Base (Listo)
- [x] Crear `BaseLayout.astro` con:
  - Header con logo y navegación
  - Footer con información de contacto y enlaces
  - Estilos responsivos
  - Soporte para meta tags

### 3. Página Principal (En Progreso)
- [x] Crear estructura básica de componentes
- [ ] Implementar sección Hero (`Hero.astro`)
  - [ ] Título principal y subtítulo atractivo
  - [ ] Llamado a la acción (CTA) destacado con ícono
  - [ ] Imagen de fondo con overlay oscuro
  - [ ] Botón flotante de WhatsApp

- [ ] Implementar sección de Confianza (`TrustSection.astro`)
  - [ ] Tarjetas con íconos de beneficios (Entrega rápida, Garantía, Soporte)
  - [ ] Contadores animados (Clientes satisfechos, Entregas realizadas)
  - [ ] Testimonios con fotos y valoraciones

- [ ] Implementar catálogo de productos (`ProductsSection.astro` y `ProductCard.astro`)
  - [ ] Grid de productos responsivo
  - [ ] Filtros por:
    - [ ] Marca
    - [ ] Rango de precios
    - [ ] Condición (Nuevo/Usado)
  - [ ] Tarjetas de producto con:
    - [ ] Imagen con efecto hover
    - [ ] Título y especificaciones clave
    - [ ] Precio destacado
    - [ ] Botón "Consultar por WhatsApp" con mensaje predefinido
    - [ ] Badges (Oferta, Más vendido, etc.)

- [ ] Implementar métodos de pago (`PaymentMethodsSection.astro`)
  - Íconos de métodos de pago aceptados
  - Información de financiación

- [ ] Implementar sección de envíos (`DeliverySection.astro`)
  - Zonas de cobertura
  - Tiempos de entrega
  - Información de envío gratuito

### 4. Integración con WhatsApp (Prioridad Alta)
- [x] Configurar variables de entorno para WhatsApp
- [ ] Implementar botón flotante fijo
- [ ] Mensaje predefinido con información del producto seleccionado
- [ ] Función para formatear mensaje con detalles del producto
- [ ] Indicador de estado en línea/offline
- [ ] Horario de atención visible

### 5. Métodos de Pago y Envíos (Próximos pasos)
- [ ] Sección de Métodos de Pago (`PaymentMethodsSection.astro`)
  - [ ] Íconos de medios de pago aceptados
  - [ ] Información sobre cuotas sin interés
  - [ ] Precios en efectivo vs. otros medios
  - [ ] Medidas de seguridad

- [ ] Sección de Envíos (`DeliverySection.astro`)
  - [ ] Mapa de zonas de cobertura
  - [ ] Tiempos de entrega estimados
  - [ ] Instrucciones para retiro en local
  - [ ] Seguimiento de envíos (si aplica)

### 6. Optimización y SEO
- [ ] Meta tags dinámicos por producto
- [ ] Optimización de imágenes (WebP, lazy loading)
- [ ] Esquema JSON-LD para productos
- [ ] Sitemap.xml y robots.txt
- [ ] Integración con Google Analytics 4

### 6. Pruebas
- [ ] Pruebas en diferentes navegadores
- [ ] Pruebas en dispositivos móviles
- [ ] Pruebas de rendimiento
- [ ] Validación de HTML/CSS

### 7. Despliegue
- [ ] Configurar dominio personalizado
- [ ] Configurar HTTPS
- [ ] Configurar redirecciones
- [ ] Implementar estrategia de caché

## Comandos Útiles

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción local
npm run preview

# Formatear código
npm run format
```

## Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
# Configuración de WhatsApp
WHATSAPP_NUMBER=5493764000000
WHATSAPP_MESSAGE=Hola, vi la página de celulares en Posadas y quiero información sobre

# Configuración de la API (si aplica)
API_URL=https://api.ejemplo.com
```

## Recursos

- [Documentación de Astro](https://docs.astro.build/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Íconos de Heroicons](https://heroicons.com/)
- [Guía de Accesibilidad Web](https://web.dev/accessibility/)

## Próximos Pasos (Sprint Actual)

1. Completar el componente Hero con:
   - Imagen de fondo optimizada
   - Efectos de hover y animaciones sutiles
   - Botón de WhatsApp funcional

2. Desarrollar el componente ProductCard con:
   - Diseño responsivo
   - Estados hover/focus
   - Integración con WhatsApp

3. Implementar la sección de Confianza:
   - Tarjetas de beneficios
   - Contadores animados
   - Testimonios reales

## Notas Técnicas

- Usar variables de CSS para los colores principales
- Implementar dark/light mode (si es necesario)
- Optimizar el bundle final
- Documentar componentes con JSDoc

## Recursos de Diseño

- Paleta de colores:
  - Principal: `#10B981` (Emerald-500)
  - Fondo oscuro: `#0F172A` (Gray-900)
  - Texto: `#F8FAFC` (Slate-50) / `#1E293B` (Slate-800)
  - Éxito: `#22C55E` (Green-500)
  - Advertencia: `#F59E0B` (Amber-500)
  - Peligro: `#EF4444` (Red-500)

- Tipografía:
  - Principal: Inter (sans-serif)
  - Tamaños base: 16px (mobile) / 18px (desktop)
  - Escala de tipos: 1.2 (minor third)
