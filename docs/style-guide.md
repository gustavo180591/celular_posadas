# Guía de Estilo

## Componentes UI
### Botones
```astro
<Button variant="primary">Comprar ahora</Button>
<Button variant="secondary">Ver detalles</Button>
```

### Paleta de Colores
- Primario: `#10B981` (Emerald-500)
- Secundario: `#3B82F6` (Blue-500)
- Fondo: `#0F172A` (Gray-900)
- Texto Principal: `#F8FAFC` (Slate-50)
- Texto Secundario: `#94A3B8` (Slate-400)

### Tipografía
- Familia Principal: `Inter`, -apple-system, sans-serif
- Tamaños:
  - Títulos: `2rem` (32px)
  - Subtítulos: `1.5rem` (24px)
  - Texto: `1rem` (16px)
  - Pequeño: `0.875rem` (14px)

### Espaciado
- Base: `1rem` (16px)
- Chico: `0.5rem` (8px)
- Mediano: `1.5rem` (24px)
- Grande: `3rem` (48px)

### Sombras
```css
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
.shadow-md {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}
```

### Transiciones
```css
.transition-default {
  transition: all 0.2s ease-in-out;
}
```

### Breakpoints
- Móvil: `640px`
- Tableta: `768px`
- Laptop: `1024px`
- Escritorio: `1280px`

### Componentes
#### Tarjeta de Producto
```astro
<ProductCard 
  title="Samsung Galaxy S23 Ultra"
  price={820000}
  condition="like_new"
  image="/images/s23-ultra.jpg"
  badge="Más vendido"
/>
```

#### Formulario de Contacto
```astro
<Form>
  <Input label="Nombre" name="name" required />
  <Input type="email" label="Email" name="email" required />
  <Textarea label="Mensaje" name="message" rows="4" required />
  <Button type="submit">Enviar mensaje</Button>
</Form>
```

### Iconos
Usar siempre Heroicons v2:
```astro
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
```

### Accesibilidad
- Usar etiquetas semánticas (header, nav, main, section, etc.)
- Asegurar contraste adecuado (mínimo 4.5:1)
- Incluir texto alternativo en imágenes
- Navegación por teclado funcional

### Convenciones de Código
- Usar nombres descriptivos para variables y funciones
- Comentar código complejo
- Mantener las líneas a un máximo de 100 caracteres
- Usar comillas simples para strings
- Usar punto y coma al final de las declaraciones
