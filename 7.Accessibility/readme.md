# Accessibility (A11y)

- Elegir un DOCTYPE (histórico)
- Identificar el idioma de la página
- Construir títulos de página significativos
- Usar HTML Semántico y válido
- Encabezados y su orden. Encabezados reales
- Ayudas de navegación adicionales.
  - Propósito de los enlaces
  - Añadir título a los vínculos
- Presentar inicialmente el contenido principal ('above the fold')
- Contraste de color
- Usar colores de manera segura en los vínculos y siempre que tengan valor informativo
- Definir abreviaturas y acrónimos
- Responsive Web
  - ‘Saltar’ sobre los vínculos de navegación
- Texto alternativo (Alt) en las imágenes
  - Proveer texto equivalente para los mapas de imágenes / svg interactivos
- ¿No abrir ventanas nuevas?
- Marcar correctamente las cabeceras de las tablas
- Usar tamaños de fuentes relativos (rem, em)
  - FontSize al 200%
- Elementos de los formularios definidos correctamente
- Definir accesos directos desde el teclado

  - Formularios y sus relaciones: label -> input
  - Placeholders extra
  - La importancia del focus - Perceptible y no solo con color
  - Navegación a través del teclado
  - Componente complejos, establece relaciones y da feedback
  - Enlaces Vs Botones (¿cursor pointer?)

- Animaciones: uso y abuse
- ¿Evitar la dependencia de los scripts?

  - Progressive enhancement

- Nuevas propiedades de CSS

## Accesibilidad y CSS Actual

- `prefers-reduced-motion`

  > 2️⃣0️⃣2️⃣0️⃣🔥🧨☀️😎 nueva _característica de medios_ que se utiliza para detectar si el usuario ha solicitado que el sistema minimice la cantidad de movimiento no esencial que utiliza.

  ```css
  @media (prefers-reduced-motion) {
    .animation {
      animation: none;
    }
  }
  ```

- `prefers-color-scheme`

  > 2️⃣0️⃣2️⃣0️⃣🔥🧨☀️😎 nueva _característica de medios_ que se utiliza para detectar si el usuario ha solicitado un tema de color claro u oscuro.

  ```css
  @media (prefers-color-scheme: dark) {
    .foo {
      background: #333;
      color: white;
    }
  }
  ```

- `prefers-reduced-data`

  > 2️⃣0️⃣2️⃣1️⃣🔥🧨☀️😎 nueva _característica de medios_ que se utiliza para detectar si el usuario ha solicitado contenido web que consuma menos tráfico de internet.

  ```css
  @media (prefers-reduced-data: reduce) {
    body {
      font-family: system-ui;
    }
  }
  ```

- `color-scheme`

  > 2️⃣0️⃣2️⃣1️⃣🔥🧨☀️😎 nueva _propiedad CSS_ que permite a un elemento indicar en qué esquemas de color puede renderizado cómodamente.

  ```css
  .html {
    color-scheme: light dark;
  }
  ```

- `prefers-contrast`

  > 2️⃣0️⃣2️⃣2️⃣🔥🧨☀️ nueva _característica de medios_ que se utiliza para detectar si el usuario ha solicitado contenido web que cumpla con ciertos niveles de contraste.

  ```css
  @media (prefers-contrast: more) {
    .contrast {
      outline: 2px solid black;
    }
  }
  ```

- `forced-colors`

  > 2️⃣0️⃣2️⃣2️⃣🔥🧨☀️ nueva _característica de medios_ que se utiliza para detectar si el usuario ha solicitado contenido web que cumpla con ciertos niveles de color.

  ```css
  @media (forced-colors: active) {
    .button {
      border: 2px green solid;
    }
  }
  ```

- `color-contrast()`

  > 2️⃣0️⃣2️⃣1️⃣🧨☀️😎 nueva _notación funcional_ que toma un valor de color y lo compara con una lista de otros valores de color, seleccionando el que tenga el mayor contraste de la lista.

- `:focus-visible`

  > 2️⃣0️⃣2️⃣2️⃣🔥🧨☀️ nueva _pseudo-clase_ que se aplica a un elemento que recibe el enfoque del teclado, pero solo si el enfoque no se realiza con un mouse u otro dispositivo de puntero.

  ```css
  .focus-visible-only:focus-visible {
    outline: 2px dashed darkorange;
  }
  ```

- `:focus-within`

  > _pseudo-clase_ que se aplica a un elemento que contiene un elemento que recibe el enfoque del teclado.

- `light-dark()`

  > 2️⃣0️⃣2️⃣4️⃣🔥 nueva _función de CSS_ que selecciona un valor de una lista de valores basándose en si el usuario ha solicitado un tema de color claro u oscuro.

  ```css
  code {
    color: light-dark(var(--light-code), var(--dark-code));
  }
  ```

### Accesibilidad en HTML

- 😎 **tabindex** (HTML)

  - atributo _global de HTML_ que indica que su elemento puede recibir el enfoque y dónde participa en la navegación secuencial del teclado (generalmente con la tecla Tab, de ahí el nombre).

- 😎 **ARIA HTML**
  - conjunto de _atributos HTML_ que definen formas de hacer que el contenido web y las aplicaciones web (especialmente aquellas desarrolladas con JavaScript) sean más accesibles para personas con discapacidades.
