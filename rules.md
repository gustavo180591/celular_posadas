# Reglas y Estándares del Proyecto

## 📁 Estructura de Archivos

### Convenciones de Nombrado
- **Componentes**: `PascalCase` (ej: `ProductCard.astro`)
- **Utilidades/Helpers**: `camelCase` (ej: `formatPrice.ts`)
- **Hooks**: Prefijo `use` (ej: `useProducts.ts`)
- **Constantes**: `UPPER_SNAKE_CASE` (ej: `API_ENDPOINTS.ts`)
- **Tipos/Interfaces**: Prefijo `I` (ej: `IProduct.ts`)

### Estructura de Carpetas
```
src/
├── components/     # Componentes reutilizables
│   ├── ui/        # Componentes de UI genéricos
│   └── sections/  # Componentes de secciones específicas
├── layouts/       # Layouts de la aplicación
├── lib/           # Utilidades y helpers
├── pages/         # Rutas de la aplicación
└── styles/        # Estilos globales
```

## 🎨 Estilos y Diseño

### Tailwind CSS
- Usar clases de utilidad de Tailwind en lugar de CSS personalizado cuando sea posible
- Para estilos reutilizables, usar `@apply` en `global.css`
- Mantener el orden de las clases:
  1. Posicionamiento (flex, grid, etc.)
  2. Box Model (margin, padding, width, etc.)
  3. Tipografía
  4. Visual (colors, shadows, etc.)
  5. Efectos (hover, focus, etc.)
  6. Animaciones

### Variables de Diseño
```css
:root {
  --color-primary: #10B981;
  --color-secondary: #3B82F6;
  --color-dark: #0F172A;
  --color-light: #F8FAFC;
  --transition-default: all 0.2s ease-in-out;
}
```

## ⚙️ Configuración

### ESLint y Prettier
- Máximo de 100 caracteres por línea
- Comillas simples para strings
- Punto y coma al final de las declaraciones
- 2 espacios para indentación
- Archivos de configuración en formato JSON

## 🧩 Componentes

### Convenciones
- Un componente por archivo
- Nombre del archivo igual al nombre del componente
- Usar TypeScript para tipado fuerte
- Documentación con JSDoc para props y funciones

### Estructura de un Componente
```astro
---
// 1. Imports
import type { Props } from '../types';

// 2. Props y Tipos
interface Props {
  title: string;
  description?: string;
}

// 3. Lógica del componente
const { title, description = '' } = Astro.props;
---

<!-- 4. Template HTML -->
<article class="p-4 rounded-lg bg-white dark:bg-slate-800">
  <h2 class="text-xl font-bold text-slate-900 dark:text-white">
    {title}
  </h2>
  {description && (
    <p class="mt-2 text-slate-600 dark:text-slate-300">
      {description}
    </p>
  )}
</article>

<!-- 5. Estilos específicos del componente (si es necesario) -->
<style>
  article {
    transition: var(--transition-default);
  }
  article:hover {
    transform: translateY(-2px);
  }
</style>
```

## 🛠️ Funciones y Utilidades

### Convenciones
- Funciones puras cuando sea posible
- Nombres descriptivos en inglés
- Documentación con JSDoc
- Manejo de errores apropiado

### Ejemplo de Función
```typescript
/**
 * Formatea un precio numérico a formato de moneda argentina
 * @param {number} price - Precio a formatear
 * @returns {string} Precio formateado con símbolo de peso
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}
```

## 🔄 Gestión de Estado

### Reglas
- Usar el estado local del componente cuando sea suficiente
- Para estado global, usar el Context API de React
- Mantener el estado lo más cercano posible a donde se usa

### Ejemplo de Estado con React Hooks
```typescript
const [products, setProducts] = useState<Product[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchProducts();
}, []);
```

## 🧪 Testing

### Convenciones
- Usar Vitest para pruebas unitarias
- Nombre de archivos de prueba: `*.test.ts` o `*.spec.ts`
- Cubrir al menos el 80% del código con pruebas

### Estructura de Prueba
```typescript
import { describe, it, expect } from 'vitest';
import { formatPrice } from './formatters';

describe('formatPrice', () => {
  it('formats price correctly', () => {
    expect(formatPrice(1000)).toBe('$1.000');
    expect(formatPrice(2500.50)).toBe('$2.501');
  });
});
```

## 🔄 Control de Versiones

### Convención de Commits
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Tipos de Commits
- `feat`: Nueva característica
- `fix`: Corrección de errores
- `docs`: Cambios en la documentación
- `style`: Cambios de formato (puntos y comas, indentación, etc.)
- `refactor`: Cambios que no corrigen errores ni agregan características
- `perf`: Mejoras de rendimiento
- `test`: Agregar o corregir pruebas
- `chore`: Cambios en el proceso de construcción o herramientas auxiliares

## 📱 Responsive Design

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile First
- Estilos base para móviles
- Usar `min-width` para breakpoints
- Ocultar/alternar contenido según el tamaño de pantalla

## 🔍 SEO y Accesibilidad

### Meta Tags
- Título único por página (máx. 60 caracteres)
- Descripción única por página (150-160 caracteres)
- URLs amigables y descriptivas
- Imágenes con atributos `alt` descriptivos

### ARIA
- Usar roles ARIA cuando sea necesario
- Asegurar que los controles sean accesibles por teclado
- Mantener un contraste adecuado (mínimo 4.5:1 para texto normal)

## 🔄 Despliegue

### Variables de Entorno
- Usar `.env` para configuraciones sensibles
- No incluir archivos `.env` en el control de versiones
- Documentar las variables necesarias en `.env.example`

### Build y Deploy
- El comando `npm run build` debe generar una carpeta `dist/` lista para producción
- Configurar redirecciones y headers según sea necesario
- Implementar estrategia de caché adecuada
