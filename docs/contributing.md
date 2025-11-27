# Guía de Contribución

¡Gracias por tu interés en contribuir a Celulares Posadas! Antes de comenzar, por favor lee este documento para entender cómo puedes ayudar.

## Tabla de Contenidos
- [Código de Conducta](#código-de-conducta)
- [¿Cómo Contribuir?](#cómo-contribuir)
  - [Reportar un Error](#reportar-un-error)
  - [Solicitar una Función](#solicitar-una-función)
  - [Enviar Correcciones](#enviar-correcciones)
- [Configuración del Entorno](#configuración-del-entorno)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Convenciones de Código](#convenciones-de-código)
- [Pruebas](#pruebas)
- [Enviar un Pull Request](#enviar-un-pull-request)
- [Revisión de Código](#revisión-de-código)
- [Reconocimientos](#reconocimientos)

## Código de Conducta

Este proyecto y todos los participantes se rigen por nuestro [Código de Conducta](CODE_OF_CONDUCT.md). Al participar, se espera que respetes este código. Por favor, reporta cualquier comportamiento inaceptable a [correo@ejemplo.com].

## ¿Cómo Contribuir?

### Reportar un Error

1. **Buscar problemas existentes**: Antes de crear un nuevo issue, por favor verifica si ya existe un reporte similar en la [sección de issues](https://github.com/tu-usuario/celular-posadas/issues).

2. **Crear un nuevo issue**: Si no encuentras un issue existente, crea uno nuevo con la plantilla de "Bug Report".

3. **Proporcionar información detallada**:
   - Descripción clara del error
   - Pasos para reproducir el problema
   - Comportamiento esperado vs. comportamiento actual
   - Capturas de pantalla o GIFs si es relevante
   - Versión del navegador/sistema operativo

### Solicitar una Función

1. **Verificar si ya existe la solicitud**: Busca en los issues existentes para evitar duplicados.

2. **Crear un nuevo issue**: Usa la plantilla de "Feature Request".

3. **Describir la funcionalidad**:
   - ¿Qué problema resuelve esta función?
   - ¿Cómo debería funcionar?
   - ¿Tienes alguna sugerencia de implementación?

### Enviar Correcciones

1. **Abrir un issue**: Si planeas trabajar en una corrección, primero abre un issue para discutir los cambios propuestos.

2. **Asignarte el issue**: Un mantenedor te asignará el issue o puedes comentar que estás trabajando en él.

3. **Seguir el flujo de trabajo**:
   - Haz fork del repositorio
   - Crea una rama descriptiva
   - Realiza tus cambios
   - Envía un Pull Request

## Configuración del Entorno

### Requisitos Previos
- Node.js 18.x o superior
- npm 9.x o superior
- Git

### Pasos de Configuración

1. **Hacer fork del repositorio**
   - Haz clic en "Fork" en la esquina superior derecha de la [página del repositorio](https://github.com/tu-usuario/celular-posadas).

2. **Clonar tu fork**
   ```bash
   git clone https://github.com/tu-usuario/celular-posadas.git
   cd celular-posadas
   ```

3. **Configurar el upstream**
   ```bash
   git remote add upstream https://github.com/original-owner/celular-posadas.git
   ```

4. **Instalar dependencias**
   ```bash
   npm install
   ```

5. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar el archivo .env con tus credenciales
   ```

6. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

## Proceso de Desarrollo

### Flujo de Trabajo con Git

1. **Sincronizar con el repositorio principal**
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Crear una rama para tu función/corrección**
   ```bash
   git checkout -b feature/nombre-de-la-funcion
   # o
   git checkout -b fix/descripcion-del-error
   ```

3. **Hacer commits atómicos**
   - Un commit por característica o corrección
   - Mensajes de commit descriptivos
   - Referencia el número de issue si corresponde: `git commit -m "feat: agregar carrito de compras #123"`

4. **Mantener tu rama actualizada**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

## Convenciones de Código

### Estilo de Código
- Seguir las reglas de ESLint y Prettier configuradas
- Corregir cualquier advertencia de TypeScript

### Estructura de Carpetas
```
src/
├── components/    # Componentes reutilizables
├── pages/        # Páginas de la aplicación
├── lib/          # Utilidades y lógica de negocio
├── styles/       # Estilos globales
└── types/        # Definiciones de tipos TypeScript
```

### Convenciones de Nombrado
- **Componentes**: `PascalCase` (ej: `ProductCard.astro`)
- **Utilidades**: `camelCase` (ej: `formatPrice.ts`)
- **Archivos de Estilo**: `kebab-case` (ej: `product-card.css`)
- **Variables y Funciones**: `camelCase`
- **Constantes**: `UPPER_SNAKE_CASE`
- **Interfaces/Tipos**: `PascalCase` con prefijo `I` (ej: `IProduct`)

### Documentación
- Documentar props de componentes con JSDoc
- Comentar código complejo
- Mantener actualizado el README

## Pruebas

### Ejecutar Pruebas
```bash
# Todas las pruebas
npm test

# Pruebas unitarias
npm run test:unit

# Pruebas de integración
npm run test:integration

# Cobertura de código
npm run test:coverage
```

### Escribir Pruebas
- Cubrir casos de uso principales
- Probar casos límite
- Mockear dependencias externas

## Enviar un Pull Request

1. **Asegúrate de que tu rama esté actualizada**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Ejecutar pruebas**
   ```bash
   npm test
   npm run build
   ```

3. **Hacer push a tu fork**
   ```bash
   git push origin tu-rama
   ```

4. **Abrir un Pull Request**
   - Ve a la [página de Pull Requests](https://github.com/tu-usuario/celulares-posadas/pulls)
   - Haz clic en "New Pull Request"
   - Selecciona la rama base (main) y la rama de comparación (tu-rama)
   - Completa la plantilla de Pull Request
   - Haz clic en "Create Pull Request"

## Revisión de Código

### Proceso de Revisión
1. Un mantenedor revisará tu PR
2. Se pueden solicitar cambios
3. Realiza los cambios solicitados
4. Los commits adicionales se agregarán automáticamente al PR
5. Una vez aprobado, tu código se fusionará con la rama principal

### Buenas Prácticas para la Revisión
- Sé respetuoso y constructivo
- Explica el porqué de los cambios solicitados
- Reconoce las partes bien hechas

## Reconocimientos

Agradecemos a todos los que han contribuido a este proyecto. Tu ayuda es muy valiosa.

## Preguntas Frecuentes

### ¿Cómo puedo comenzar a contribuir si soy nuevo?
- Revisa los issues etiquetados como `good first issue`
- Únete a nuestro canal de Discord/Slack para hacer preguntas
- Revisa la documentación existente

### ¿Con qué frecuencia debo hacer commit?
- Haz commits pequeños y frecuentes
- Cada commit debe ser una unidad lógica de cambio
- Usa mensajes de commit descriptivos

### ¿Qué hago si tengo problemas para configurar el entorno?
- Revisa la sección de [Configuración del Entorno](#configuración-del-entorno)
- Revisa los issues cerrados para ver si alguien ya reportó un problema similar
- Si no encuentras solución, abre un nuevo issue detallando el problema
