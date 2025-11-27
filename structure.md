# Estructura de la Landing Page - Celulares Posadas

## 📌 Página Principal (`/`)

### 1. Header
- **Componente**: `Header.astro`
- **Contenido**:
  - Logo + Nombre
  - Menú de navegación principal
  - Botón de WhatsApp flotante
  - Selector de idioma (opcional)
- **Estado**: `🟢 Listo`

### 2. Hero Section
- **Componente**: `sections/Hero.astro`
- **Contenido**:
  - Título principal + subtítulo
  - Llamado a la acción principal
  - Imagen de fondo con overlay
  - Indicador de scroll
- **Props**:
  - `title: string`
  - `subtitle: string`
  - `ctaText: string`
  - `ctaLink: string`
  - `backgroundImage: string`

### 3. Sección de Beneficios
- **Componente**: `sections/Benefits.astro`
- **Contenido**:
  - Grid de 3-4 tarjetas con íconos
  - Título y descripción corta por beneficio
  - Animaciones al hacer scroll
- **Beneficios a destacar**:
  - Entrega en el día
  - Garantía oficial
  - Todos los medios de pago
  - Asesoramiento personalizado

### 4. Catálogo de Productos
- **Componente**: `sections/ProductCatalog.astro`
- **Subcomponentes**:
  - `ProductCard.astro`
  - `ProductFilters.astro`
- **Características**:
  - Grid de productos responsivo
  - Filtros por:
    - Marca
    - Rango de precios
    - Condición (Nuevo/Usado)
  - Ordenamiento
  - Paginación o carga infinita

### 5. Cómo Comprar
- **Componente**: `sections/HowToBuy.astro`
- **Pasos**:
  1. Elegí tu producto
  2. Contactanos por WhatsApp
  3. Acordá el pago
  4. Recibí tu pedido
- **Incluir**:
  - Íconos ilustrativos
  - Descripción breve de cada paso
  - Llamado a la acción

### 6. Testimonios
- **Componente**: `sections/Testimonials.astro`
- **Características**:
  - Carrusel de testimonios
  - Foto + Nombre + Valoración
  - Comentario del cliente
  - Controles de navegación

### 7. Marcas
- **Componente**: `sections/Brands.astro`
- **Contenido**:
  - Logos de marcas disponibles
  - Efecto hover sutil
  - Carrusel automático

### 8. Preguntas Frecuentes
- **Componente**: `sections/FAQ.astro`
- **Estructura**:
  - Acordeón de preguntas
  - Búsqueda de preguntas
  - Categorías (Envíos, Pagos, Garantía, etc.)

### 9. Contacto
- **Componente**: `sections/Contact.astro`
- **Elementos**:
  - Formulario de contacto
  - Información de contacto
  - Mapa de ubicación
  - Horarios de atención

### 10. Footer
- **Componente**: `Footer.astro`
- **Secciones**:
  - Logo + Descripción
  - Enlaces rápidos
  - Contacto
  - Redes sociales
  - Mapa del sitio
  - Avisos legales

## 🛠️ Componentes Compartidos

### ProductCard
- **Archivo**: `components/ProductCard.astro`
- **Props**:
  ```typescript
  interface ProductCardProps {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    image: string;
    condition: 'new' | 'used' | 'refurbished';
    tags?: string[];
    rating?: number;
  }
  ```
- **Estados**:
  - Hover: Muestra botones de acción
  - Loading: Skeleton loader

### WhatsAppButton
- **Archivo**: `components/WhatsAppButton.astro`
- **Props**:
  - `phone: string`
  - `message: string`
  - `variant?: 'floating' | 'inline'`
  - `showLabel?: boolean`

### Accordion
- **Archivo**: `components/ui/Accordion.astro`
- **Uso**:
  ```astro
  <Accordion>
    <AccordionItem title="¿Hacen envíos?" isOpen={true}>
      <p>Sí, realizamos envíos a todo Posadas.</p>
    </AccordionItem>
  </Accordion>
  ```

## 📱 Breakpoints y Responsive

| Dispositivo | Ancho Mínimo | Contenedor | Columnas |
|-------------|--------------|------------|----------|
| Móvil      | 320px        | 100%       | 1        |
| Tableta    | 640px        | 90%        | 2        |
| Laptop     | 1024px       | 1200px     | 3        |
| Escritorio | 1280px       | 1400px     | 4        |

## 🎨 Paleta de Colores

| Uso                | Color (HEX) | Clase Tailwind      |
|--------------------|-------------|---------------------|
| Primario          | #10B981     | `bg-emerald-500`    |
| Primario Oscuro   | #059669     | `bg-emerald-600`    |
| Fondo Oscuro      | #0F172A     | `bg-slate-900`      |
| Texto Principal   | #F8FAFC     | `text-slate-50`     |
| Texto Secundario  | #94A3B8     | `text-slate-400`    |
| Borde            | #1E293B     | `border-slate-700`  |
| Éxito            | #22C55E     | `bg-green-500`      |
| Advertencia      | #F59E0B     | `bg-amber-500`      |
| Peligro          | #EF4444     | `bg-red-500`        |

## 📝 Notas de Implementación

1. **Optimización de Imágenes**:
   - Usar formato WebP
   - Tamaños adecuados para cada breakpoint
   - Lazy loading para imágenes fuera del viewport

2. **Accesibilidad**:
   - Contraste adecuado
   - Navegación por teclado
   - ARIA labels
   - Textos alternativos

3. **Rendimiento**:
   - Carga diferida de componentes
   - Optimización de fuentes
   - Minificación de recursos

4. **SEO**:
   - Meta tags dinámicos
   - Estructura semántica
   - URLs amigables
   - Sitemap.xml

## 📂 Estructura de Archivos

```
src/
├── components/
│   ├── ui/               # Componentes de UI genéricos
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   └── ...
│   ├── sections/         # Secciones de la landing
│   │   ├── Hero.astro
│   │   └── ...
│   ├── Header.astro
│   └── Footer.astro
├── layouts/
│   └── BaseLayout.astro
├── lib/
│   ├── products.ts       # Datos de productos
│   └── utils.ts          # Funciones de utilidad
├── pages/
│   └── index.astro       # Página principal
└── styles/
    └── global.css        # Estilos globales
```

## 🚀 Próximos Pasos

1. Implementar el componente Hero con animaciones
2. Desarrollar el sistema de filtrado de productos
3. Crear el carrusel de testimonios
4. Implementar el formulario de contacto
5. Optimizar para SEO y rendimiento
