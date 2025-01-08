# Evolución del proyecto

## Estado inicial del proyecto

- index.html
- main.css
- reset.css
- index.js
- ttt.js --> export tttGame()
- components/header.js

## Commits

- Create ttt files from main
  - ttt.html
  - ttt.css
  - ttt.js (ya existía)
- Update index with a style guide
  - guide.html
  - guide.css (absorbe reset.css)
  - se modifican index.html y main.css
- Update style guide
- Add footer generated from JS
  - components/footer.js
- Add placeholders for new pages
  - players.html, players.css, players.js
  - quiz.html, quiz.css, quiz.js
  - canis.html, canis.css, canis.js
- Add navigation
  - components/header.js (se modifica)
  - components/dialog-nav.js
- Remove players from ttt
  - ttt.html, ttt.css, ttt.js (se modifican)
- Add players page
  - players.html, players.css, players.js

## Players

- Formulario de registro
  - Opciones para recoger los datos de un formulario
  - Validación build-in de HTML: required, type, pattern
  - Validación custom con HTML y JS: setCustomValidity()
- Lista de jugadores
  - Lectura inicial
  - Añadir jugadores
  - Eliminar jugadores
  - Persistencia de datos: localStorage
- Ranking de jugadores (TODO)
- Ordenar jugadores (TODO)
- Filtrar jugadores (TODO)
- Buscar jugadores (TODO)
- Editar jugadores (TODO)
- Estadísticas de jugadores (TODO)
- Gráficos de jugadores (TODO)
- Exportar jugadores (TODO)
- Importar jugadores (TODO)
- Compartir jugadores (TODO)
- Notificar jugadores (TODO)

## Tres en raya (3nR/TTT)

- Seleccionar de jugadores (desde localStorage)
- Botones deshabilitados si no hay jugadores seleccionados
- Añadido botón de cierre en el dialog de avisos
- Añadir juego interactivo al hacer clic en el tablero (TODO)

## Quiz (versión básica)

- Añadido el HTML y CSS del challenge
- Añadido el JS del challenge
  - Definir variables
  - Definir funciones de ayuda (disable, enable, isCorrect)
  - Registrar y definir funciones de eventos

## Quiz (versión avanzada)

- Se carga un array de preguntas y respuestas desde json
- Se muestra una pregunta aleatoria
- Se recoge el resultado del usuario
- Se refleja el resultado en la interfaz
- El usuario puede pasar a la siguiente pregunta
- El usuario reiniciar el quiz (preguntas y puntuaciones)
- Añadir selección de jugador (TODO)
- Añadir temporizador (TODO)
- Añadir ranking de puntuaciones (TODO)
- Añadir persistencia de datos (TODO)
