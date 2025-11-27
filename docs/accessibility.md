# Guía de Accesibilidad Web

## Tabla de Contenidos
- [Introducción](#introducción)
- [Estándares y Directrices](#estándares-y-directrices)
- [Estructura Semántica](#estructura-semántica)
- [Navegación por Teclado](#navegación-por-teclado)
- [Contenido Multimedia](#contenido-multimedia)
- [Formularios Accesibles](#formularios-accesibles)
- [Contraste de Color](#contraste-de-color)
- [ARIA](#aria)
- [Pruebas de Accesibilidad](#pruebas-de-accesibilidad)
- [Recursos y Herramientas](#recursos-y-herramientas)
- [Checklist de Verificación](#checklist-de-verificación)
- [Pautas para Desarrolladores](#pautas-para-desarrolladores)
- [Pautas para Diseñadores](#pautas-para-diseñadores)
- [Pautas para Redactores de Contenido](#pautas-para-redactores-de-contenido)

## Introducción

Esta guía establece los estándares de accesibilidad web que deben seguirse en el desarrollo y mantenimiento de Celulares Posadas. El objetivo es garantizar que nuestro sitio web sea accesible para todas las personas, independientemente de sus capacidades o discapacidades.

### Niveles de Conformidad
- **Nivel A**: Requisitos básicos de accesibilidad
- **Nivel AA**: Requisitos que abordan los principales problemas de accesibilidad
- **Nivel AAA**: Nivel más alto de accesibilidad (recomendado donde sea posible)

## Estándares y Directrices

### WCAG 2.1
Seguimos las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1, que incluyen:
- **Perceptible**: La información debe ser presentable a los usuarios de manera que puedan percibirla
- **Operable**: Los componentes de la interfaz de usuario deben ser operables
- **Comprensible**: La información y el manejo de la interfaz de usuario deben ser comprensibles
- **Robusto**: El contenido debe ser lo suficientemente robusto como para ser interpretado de forma fiable por una amplia variedad de agentes de usuario

### Legislación Aplicable
- Ley Nacional de Discapacidad (Argentina, Ley 22.431)
- Convención sobre los Derechos de las Personas con Discapacidad (ONU)
- European Accessibility Act (para usuarios internacionales)

## Estructura Semántica

### Uso de HTML5
```html
<!-- Estructura básica -->
<header>
  <nav aria-label="Navegación principal">
    <!-- Menú de navegación -->
  </nav>
</header>

<main>
  <h1>Página de Productos</h1>
  
  <section aria-labelledby="destacados">
    <h2 id="destacados">Productos Destacados</h2>
    <!-- Contenido -->
  </section>
  
  <aside aria-label="Filtros">
    <!-- Filtros -->
  </aside>
</main>

<footer>
  <!-- Pie de página -->
</footer>
```

### Encabezados
- Usar un solo `<h1>` por página
- Mantener un orden lógico (h1 > h2 > h3, etc.)
- No saltar niveles de encabezado
- Los encabezados deben describir claramente el contenido que les sigue

### Listas
```html
<!-- Lista desordenada -->
<ul>
  <li>Teléfonos móviles</li>
  <li>Accesorios</li>
  <li>Repuestos</li>
</ul>

<!-- Lista ordenada -->
<ol>
  <li>Seleccionar producto</li>
  <li>Agregar al carrito</li>
  <li>Completar compra</li>
</ol>
```

## Navegación por Teclado

### Orden de Tabulación
- Asegurar que el orden de tabulación sea lógico e intuitivo
- Usar `tabindex="0"` para elementos interactivos personalizados
- Usar `tabindex="-1"` para elementos que necesitan enfoque programático

### Saltar al Contenido
```html
<a href="#main-content" class="skip-link">Saltar al contenido principal</a>

<main id="main-content">
  <!-- Contenido principal -->
</main>

<style>
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: white;
    padding: 8px;
    z-index: 100;
    transition: top 0.3s;
  }
  
  .skip-link:focus {
    top: 0;
  }
</style>
```

### Controles Interactivos
- Asegurar que todos los controles interactivos sean accesibles por teclado
- Implementar manejadores de eventos para teclado (keydown, keyup)
- Proporcionar indicadores de enfoque visibles

## Contenido Multimedia

### Imágenes
```html
<!-- Imagen decorativa -->
<img src="decorative.jpg" alt="" role="presentation">

<!-- Imagen informativa -->
<img 
  src="producto.jpg" 
  alt="iPhone 13 Pro Max en color azul sierra"
  width="400"
  height="300">

<!-- Imagen con descripción larga -->
<figure>
  <img 
    src="grafico-complejo.jpg"
    alt="Gráfico de ventas por mes"
    aria-describedby="desc-grafico">
  <figcaption id="desc-grafico">
    Gráfico que muestra las ventas mensuales del último año.
    Enero: 120 unidades, Febrero: 150 unidades, etc.
  </figcaption>
</figure>
```

### Videos
```html
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track 
    kind="captions" 
    src="subtitulos.vtt" 
    srclang="es" 
    label="Español"
    default>
  Tu navegador no soporta el elemento de video.
</video>

<!-- Transcripción -->
<details>
  <summary>Ver transcripción del video</summary>
  <p>Contenido de la transcripción...</p>
</details>
```

### Iframes
```html
<iframe 
  title="Mapa de ubicación de la tienda física"
  src="https://maps.google.com/maps?output=embed"
  aria-label="Mapa interactivo mostrando la ubicación de nuestra tienda">
</iframe>
```

## Formularios Accesibles

### Estructura Básica
```html
<form>
  <fieldset>
    <legend>Información de Contacto</legend>
    
    <div class="form-group">
      <label for="nombre">Nombre completo *</label>
      <input 
        type="text" 
        id="nombre" 
        name="nombre"
        required
        aria-required="true">
    </div>
    
    <div class="form-group">
      <label for="email">Correo electrónico *</label>
      <input 
        type="email" 
        id="email" 
        name="email"
        required
        aria-required="true"
        aria-describedby="email-help">
      <small id="email-help">Nunca compartiremos tu correo electrónico con nadie más.</small>
    </div>
    
    <div class="form-group">
      <label for="telefono">Teléfono</label>
      <input 
        type="tel" 
        id="telefono" 
        name="telefono"
        pattern="[0-9]{10}"
        aria-describedby="telefono-format">
      <span id="telefono-format" class="hint">Formato: 1234567890</span>
    </div>
    
    <div class="form-group">
      <fieldset>
        <legend>Método de contacto preferido</legend>
        <input type="radio" id="contact-email" name="contact-method" value="email" checked>
        <label for="contact-email">Correo electrónico</label>
        
        <input type="radio" id="contact-phone" name="contact-method" value="phone">
        <label for="contact-phone">Llamada telefónica</label>
        
        <input type="radio" id="contact-whatsapp" name="contact-method" value="whatsapp">
        <label for="contact-whatsapp">WhatsApp</label>
      </fieldset>
    </div>
    
    <div class="form-group">
      <label for="mensaje">Mensaje *</label>
      <textarea 
        id="mensaje" 
        name="mensaje" 
        rows="5"
        required
        aria-required="true"></textarea>
    </div>
    
    <div class="form-group">
      <input type="checkbox" id="privacidad" name="privacidad" required>
      <label for="privacidad">He leído y acepto la <a href="/privacidad">política de privacidad</a> *</label>
    </div>
    
    <button type="submit">Enviar mensaje</button>
  </fieldset>
</form>
```

### Validación
- Proporcionar mensajes de error claros y específicos
- Vincular mensajes de error con los campos correspondientes usando `aria-describedby`
- Usar `aria-invalid` para indicar campos con errores

## Contraste de Color

### Ratios Mínimos
- Texto normal: 4.5:1 sobre el fondo
- Texto grande (18pt o 14pt en negrita): 3:1 sobre el fondo
- Componentes de interfaz de usuario: 3:1 sobre el fondo

### Herramientas de Verificación
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio](https://contrast-ratio.com/)
- Extensión de navegador: WCAG Color Contrast Checker

### Ejemplo de Código
```html
<!-- Mal contraste -->
<p style="color: #999999; background: white;">Texto difícil de leer</p>

<!-- Buen contraste -->
<p style="color: #333333; background: white;">Texto fácil de leer</p>
```

## ARIA

### Uso Básico
```html
<!-- Barra de progreso -->
<div 
  role="progressbar" 
  aria-valuenow="75" 
  aria-valuemin="0" 
  aria-valuemax="100">
  75% completado
</div>

<!-- Diálogo modal -->
<button aria-expanded="false" aria-controls="modal">Abrir modal</button>
<div id="modal" role="dialog" aria-labelledby="modal-title" hidden>
  <h2 id="modal-title">Título del modal</h2>
  <p>Contenido del modal</p>
  <button>Guardar</button>
  <button aria-label="Cerrar">X</button>
</div>
```

### Buenas Prácticas
- Usar elementos HTML semánticos en lugar de ARIA cuando sea posible
- No modificar los roles nativos de los elementos
- Probar con lectores de pantalla

## Pruebas de Accesibilidad

### Herramientas Automatizadas
- **axe DevTools**: Extensión de navegador
- **WAVE**: Evaluador de accesibilidad web
- **Lighthouse**: Herramienta de auditoría de Chrome
- **pa11y**: Herramienta de línea de comandos

### Pruebas Manuales
1. Navegación por teclado
2. Lector de pantalla (NVDA, VoiceOver, TalkBack)
3. Zoom al 200%
4. Modo de alto contraste
5. Solo teclado

### Pruebas con Usuarios
- Incluir personas con diferentes discapacidades
- Probar con diferentes tecnologías de asistencia
- Documentar problemas encontrados

## Recursos y Herramientas

### Documentación
- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
- [WebAIM](https://webaim.org/)
- [A11Y Project](https://www.a11yproject.com/)
- [MDN Web Docs - Accesibilidad](https://developer.mozilla.org/es/docs/Web/Accessibility)

### Herramientas
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [HeadingsMap](https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi)
- [axe DevTools](https://www.deque.com/axe/)
- [NVDA Screen Reader](https://www.nvaccess.org/)

## Checklist de Verificación

### Nivel A
- [ ] Todas las imágenes tienen texto alternativo
- [ ] Los videos tienen subtítulos
- [ ] La navegación por teclado es posible
- [ ] No hay trampas de teclado
- [ ] La estructura de encabezados es lógica
- [ ] Los formularios tienen etiquetas asociadas
- [ ] Los mensajes de error son descriptivos
- [ ] El contraste de color es adecuado

### Nivel AA
- [ ] El contraste de color es de al menos 4.5:1
- [ ] El texto puede redimensionarse hasta 200% sin pérdida de funcionalidad
- [ ] Los controles de formulario tienen etiquetas visibles
- [ ] La navegación es consistente
- [ ] Los encabezados y etiquetas son descriptivos

### Nivel AAA
- [ ] El contraste de color es de al menos 7:1
- [ ] No hay imágenes de texto (excepto logotipos)
- [ ] La navegación es completamente predecible
- [ ] Se proporciona ayuda contextual

## Pautas para Desarrolladores

### React
```jsx
// Componente accesible
const AccessibleButton = ({ children, onClick }) => (
  <button 
    onClick={onClick}
    aria-label={children}
    className="btn"
  >
    {children}
  </button>
);

// Manejo de teclado
const handleKeyDown = (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    // Lógica del clic
  }
};
```

### Enfoque en el Manejo de Enfoque
- Gestionar el foco en componentes dinámicos
- Devolver el foco al elemento que lo activó
- Usar `useRef` y `useEffect` para manejar el foco

## Pautas para Diseñadores

### Espaciado y Tamaño
- Tamaño mínimo de objetivo táctil: 44x44 píxeles
- Espaciado adecuado entre elementos interactivos
- Tipografía legible (mínimo 16px para texto de cuerpo)

### Estados de los Componentes
- Diseñar estados de enfoque, hover, activo y deshabilitado
- Proporcionar indicadores visuales claros para la interacción
- Asegurar que los estados sean distinguibles

## Pautas para Redactores de Contenido

### Texto Alternativo
- Describir el propósito de la imagen
- Ser conciso pero descriptivo
- No incluir "imagen de..." o "foto de..."
- Dejar vacío si la imagen es puramente decorativa

### Encabezados
- Usar un solo H1 por página
- Mantener una jerarquía lógica
- Usar encabezados descriptivos
- No usar encabezados solo por estilo visual
