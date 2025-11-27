# Guía de Pruebas

## Visión General

Esta guía cubre las estrategias, herramientas y mejores prácticas para probar la aplicación Celulares Posadas. El objetivo es garantizar la calidad del código y la funcionalidad en todo momento.

## Tabla de Contenidos

- [Tipos de Pruebas](#tipos-de-pruebas)
- [Configuración del Entorno](#configuración-del-entorno)
- [Ejecutando las Pruebas](#ejecutando-las-pruebas)
- [Escribiendo Pruebas](#escribiendo-pruebas)
- [Cobertura de Código](#cobertura-de-código)
- [Pruebas de Integración](#pruebas-de-integración)
- [Pruebas de Extremo a Extremo](#pruebas-de-extremo-a-extremo)
- [Pruebas de Rendimiento](#pruebas-de-rendimiento)
- [Mocking y Stubs](#mocking-y-stubs)
- [Integración Continua](#integración-continua)
- [Depuración de Pruebas](#depuración-de-pruebas)
- [Mejores Prácticas](#mejores-prácticas)

## Tipos de Pruebas

### 1. Pruebas Unitarias
- **Qué prueban**: Componentes y funciones individuales
- **Herramientas**: Vitest, React Testing Library
- **Ubicación**: `src/**/__tests__/*.test.ts(x)`

### 2. Pruebas de Integración
- **Qué prueban**: Múltiples componentes trabajando juntos
- **Herramientas**: Vitest, React Testing Library
- **Ubicación**: `src/**/__tests__/*.integration.test.ts(x)`

### 3. Pruebas de Extremo a Extremo (E2E)
- **Qué prueban**: Flujos completos de usuario
- **Herramientas**: Cypress
- **Ubicación**: `cypress/e2e/*.spec.js`

### 4. Pruebas de Rendimiento
- **Qué prueban**: Tiempos de carga y rendimiento
- **Herramientas**: Lighthouse, Web Vitals
- **Ubicación**: `tests/performance/*.test.js`

## Configuración del Entorno

### Requisitos Previos
- Node.js 18.x o superior
- npm 9.x o superior

### Instalación

1. Instalar dependencias de desarrollo:
   ```bash
   npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @types/jest cypress
   ```

2. Configurar scripts en `package.json`:
   ```json
   {
     "scripts": {
       "test": "vitest",
       "test:watch": "vitest watch",
       "test:coverage": "vitest run --coverage",
       "test:e2e": "cypress open",
       "test:e2e:headless": "cypress run"
     }
   }
   ```

3. Configurar `vitest.config.js`:
   ```javascript
   import { defineConfig } from 'vitest/config';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
     test: {
       globals: true,
       environment: 'jsdom',
       setupFiles: ['./src/setupTests.js'],
       coverage: {
         reporter: ['text', 'json', 'html'],
         exclude: [
           'node_modules/',
           'src/setupTests.js',
           '**/*.d.ts',
           '**/index.js',
           '**/serviceWorker.js',
           '**/tests/**',
         ],
       },
     },
   });
   ```

4. Configurar `src/setupTests.js`:
   ```javascript
   import '@testing-library/jest-dom';
   import { cleanup } from '@testing-library/react';
   import { afterEach } from 'vitest';

   // Limpiar después de cada prueba
   afterEach(() => {
     cleanup();
   });
   ```

## Ejecutando las Pruebas

### Pruebas Unitarias
```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar en modo observación
npm run test:watch

# Ejecutar pruebas específicas
npm test src/components/__tests__/Button.test.tsx
```

### Cobertura de Código
```bash
# Generar reporte de cobertura
npm run test:coverage

# Ver reporte en el navegador
open coverage/lcov-report/index.html
```

### Pruebas E2E con Cypress
```bash
# Interfaz gráfica
npm run test:e2e

# Modo headless
npm run test:e2e:headless
```

## Escribiendo Pruebas

### Estructura de un Test
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'iPhone 13',
    price: 999,
    image: '/iphone13.jpg',
  };

  it('debe mostrar el nombre del producto', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('iPhone 13')).toBeInTheDocument();
  });

  it('debe formatear correctamente el precio', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('$999')).toBeInTheDocument();
  });
});
```

### Pruebas de Eventos
```typescript
import userEvent from '@testing-library/user-event';

describe('AddToCartButton', () => {
  it('debe llamar a onAdd cuando se hace clic', async () => {
    const handleAdd = vi.fn();
    render(<AddToCartButton onAdd={handleAdd} />);
    
    const button = screen.getByRole('button', { name: /agregar al carrito/i });
    await userEvent.click(button);
    
    expect(handleAdd).toHaveBeenCalledTimes(1);
  });
});
```

### Probando Hooks
```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useCart } from '../../hooks/useCart';

describe('useCart', () => {
  it('debe agregar un producto al carrito', () => {
    const { result } = renderHook(() => useCart());
    
    act(() => {
      result.current.addToCart({ id: '1', name: 'iPhone', price: 999 });
    });
    
    expect(result.current.items).toHaveLength(1);
    expect(result.current.total).toBe(999);
  });
});
```

## Cobertura de Código

### Configuración
En `vitest.config.js`:
```javascript
export default {
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.d.ts',
        '**/src/types/**',
        '**/src/setupTests.js',
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
};
```

### Mejorando la Cobertura
1. Identifica archivos con baja cobertura:
   ```bash
   npm run test:coverage
   ```
2. Revisa el reporte en `coverage/lcov-report/index.html`
3. Escribe pruebas para las ramas no cubiertas

## Pruebas de Integración

### Ejemplo: Proceso de Checkout
```typescript
describe('Checkout Flow', () => {
  it('debe completar el proceso de checkout', async () => {
    // 1. Navegar a la página de productos
    render(<App />);
    
    // 2. Agregar producto al carrito
    const addButtons = await screen.findAllByRole('button', { name: /agregar/i });
    await userEvent.click(addButtons[0]);
    
    // 3. Ir al carrito
    const cartButton = screen.getByRole('link', { name: /carrito/i });
    await userEvent.click(cartButton);
    
    // 4. Verificar que el producto está en el carrito
    expect(await screen.findByText('1 artículo en el carrito')).toBeInTheDocument();
    
    // 5. Proceder al checkout
    const checkoutButton = screen.getByRole('button', { name: /pagar/i });
    await userEvent.click(checkoutButton);
    
    // 6. Completar formulario de envío
    const nameInput = screen.getByLabelText(/nombre completo/i);
    await userEvent.type(nameInput, 'Juan Pérez');
    
    // ... completar otros campos ...
    
    // 7. Enviar formulario
    const submitButton = screen.getByRole('button', { name: /confirmar pedido/i });
    await userEvent.click(submitButton);
    
    // 8. Verificar mensaje de éxito
    expect(await screen.findByText(/pedido realizado con éxito/i)).toBeInTheDocument();
  });
});
```

## Pruebas de Extremo a Extremo

### Configuración de Cypress

1. Crear `cypress.config.js`:
   ```javascript
   const { defineConfig } = require('cypress');

   module.exports = defineConfig({
     e2e: {
       baseUrl: 'http://localhost:3000',
       setupNodeEvents(on, config) {
         // implement node event listeners here
       },
       supportFile: 'cypress/support/e2e.js',
     },
   });
   ```

2. Escribir pruebas en `cypress/e2e/checkout.cy.js`:
   ```javascript
   describe('Checkout Flow', () => {
     it('debe completar el proceso de compra', () => {
       // Visitar la página de inicio
       cy.visit('/');
       
       // Buscar un producto
       cy.get('input[placeholder="Buscar productos"]').type('iPhone');
       cy.contains('Buscar').click();
       
       // Agregar al carrito
       cy.get('[data-testid="product-card"]').first().within(() => {
         cy.contains('Agregar al carrito').click();
       });
       
       // Verificar notificación
       cy.contains('Producto agregado al carrito').should('be.visible');
       
       // Ir al carrito
       cy.contains('Ver carrito').click();
       
       // Verificar que estamos en la página del carrito
       cy.url().should('include', '/cart');
       
       // Proceder al checkout
       cy.contains('Proceder al pago').click();
       
       // Completar formulario de envío
       cy.get('#name').type('Juan Pérez');
       cy.get('#email').type('juan@example.com');
       // ... completar otros campos
       
       // Enviar formulario
       cy.get('form').submit();
       
       // Verificar mensaje de éxito
       cy.contains('¡Pedido realizado con éxito!').should('be.visible');
     });
   });
   ```

## Pruebas de Rendimiento

### Lighthouse CI

1. Instalar Lighthouse CI:
   ```bash
   npm install -g @lhci/cli
   ```

2. Crear `.lighthouserc.js`:
   ```javascript
   module.exports = {
     ci: {
       collect: {
         staticDistDir: './dist',
         url: ['http://localhost:3000'],
         numberOfRuns: 3,
       },
       assert: {
         assertions: {
           'categories:performance': ['error', { minScore: 0.9 }],
           'categories:accessibility': ['error', { minScore: 0.9 }],
           'categories:best-practices': ['error', { minScore: 0.9 }],
           'categories:seo': ['error', { minScore: 0.9 }],
         },
       },
       upload: {
         target: 'temporary-public-storage',
       },
     },
   };
   ```

3. Ejecutar pruebas de rendimiento:
   ```bash
   npm run build
   npx serve -s dist &
   npx lhci autorun
   ```

## Mocking y Stubs

### Mock de Módulos
```typescript
// __mocks__/api.ts
import { vi } from 'vitest';

export const fetchProducts = vi.fn(() => 
  Promise.resolve([
    { id: '1', name: 'iPhone 13', price: 999 }
  ])
);

// En la prueba
import { fetchProducts } from '../../api';
import { vi } from 'vitest';

vi.mock('../../api');

describe('ProductList', () => {
  it('debe mostrar la lista de productos', async () => {
    // Configurar el mock
    fetchProducts.mockResolvedValue([
      { id: '1', name: 'iPhone 13', price: 999 },
      { id: '2', name: 'Samsung Galaxy', price: 899 },
    ]);
    
    render(<ProductList />);
    
    // Verificar que los productos se muestran
    expect(await screen.findByText('iPhone 13')).toBeInTheDocument();
    expect(screen.getByText('Samsung Galaxy')).toBeInTheDocument();
  });
});
```

### Mock de Peticiones HTTP
```typescript
import { server } from '../mocks/server';
import { rest } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ProductList', () => {
  it('debe manejar errores de la API', async () => {
    // Sobrescribir el manejador para esta prueba
    server.use(
      rest.get('/api/products', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    
    render(<ProductList />);
    
    // Verificar que se muestra el mensaje de error
    expect(await screen.findByText(/error al cargar los productos/i)).toBeInTheDocument();
  });
});
```

## Integración Continua

### GitHub Actions
Crear `.github/workflows/test.yml`:
```yaml
name: Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run E2E tests
        run: npm run test:e2e:ci
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          file: ./coverage/coverage-final.json
```

## Depuración de Pruebas

### Depuración en VS Code
1. Crear `.vscode/launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "type": "node",
         "request": "launch",
         "name": "Debug Tests",
         "runtimeExecutable": "npm",
         "runtimeArgs": ["run", "test"],
         "console": "integratedTerminal",
         "internalConsoleOptions": "neverOpen"
       }
     ]
   }
   ```

2. Establecer puntos de interrupción en el código
3. Presionar F5 para iniciar la depuración

### Depuración de Pruebas E2E
1. Usar `cy.pause()` en las pruebas de Cypress
2. Usar `cy.debug()` para inspeccionar elementos
3. Usar el modo Time Travel en la interfaz de Cypress

## Mejores Prácticas

### Organización de Pruebas
- Agrupar pruebas relacionadas con `describe`
- Usar nombres descriptivos para las pruebas
- Mantener las pruebas independientes
- Limpiar el estado después de cada prueba

### Selectores
- Preferir `getByRole` sobre otros selectores
- Usar `data-testid` para elementos sin roles accesibles
- Evitar selectores frágiles como clases CSS o IDs generados

### Rendimiento
- Usar `findBy*` para esperar elementos asíncronos
- Limitar el uso de `waitFor`
- Usar `userEvent` sobre `fireEvent` para interacciones de usuario

### Mantenibilidad
- Extraer lógica repetitiva en funciones auxiliares
- Usar factories para datos de prueba
- Mantener las pruebas cortas y enfocadas

### Documentación
- Documentar casos de prueba complejos
- Agregar comentarios para explicar el porqué, no el qué
- Mantener actualizada la documentación de pruebas
