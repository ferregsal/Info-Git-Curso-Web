# ES - Desarrollo del curso

Unidad formativa 2
Denominación: _Desarrollo y reutilización de componentes
software y multimedia mediante lenguajes de guión_
Código: UF1842

90 horas (18 días)
Consumidos en la intro: 30 horas (6 días)

1. Arquitecturas de aplicaciones web
2. Navegadores web
3. Creación de contenido web dinámico (Fundamentos programación)
4. Lenguajes de guión de uso general
5. Contenidos multimedia

## Punto de partida

- Datos. Tipos de datos
- Variables y tipos
- Sentencias. Funciones
- Expresiones. Operadores
- Estructuras de control
  - Condiciones
  - Iteraciones
- Objetos

## Semana 1 - JS en la Web

### Intro

1. Arquitecturas de aplicaciones web
2. Navegadores web

Cuando llega el HTML

- Parse -> DOM
- Render (Layout)
- Paint

(Dia 1. 09/12/2024)

### Conceptos básicos

- Conceptos y modelo mental
- Datos, variables, tipos, comparación

Ejercicios de "regreso" a JS

(Dia 1. 09/12/2024)

- JS: Modelo mental
  - Variables y datos
  - Objetos
  - Asignación vía variables
  - Mutabilidad v. inmutabilidad

(Día 2. 10/12/2024)

#### Propuestas: Profundizando en JS

- Challenge (2): Función strictEquals
- Challenge (3): Funciones de Array 1
- Challenge (4): Funciones de Array 2
- Alt Challenge (FitzBuz)

### JS en la Web

- DOM
  - Acceso secuencial a los nodos de elementos HTML
  - Acceso directo:
    - query v. get
    - NodeList v. HTMLCollection
  - Desplazamiento por el árbol del DOM
  - Ejemplo HTML "Saludos"

(Día 2. 10/12/2024)

- Modificación de elemento
  - Contenido: textContent
  - Nodos HTML: innerHTML, outerHTML

(Día 3. 11/12/2024)

- Revisión de conceptos: funciones
  - Parámetros, atributos, callbacks
- Modificación de elemento (continuación) - Proyecto: Tres en raya
  - Cambios en el HTML
  - Atributos
  - Clases del HTML
  - Eventos -> callbacks

(Día 4. 12/12/2024)

- Revisión de conceptos: métodos de array
  - Mutables: push, sort
  - Inmutables: toSorted, forEach, map, filter, find
  - Ejercicio: implementar los métodos de arrays / strings
    (ejemplos: myLength, myPush)

Uso de arrays en el entorno Web

- Proyecto: Tres en raya
- Comprobar el ganador: uso de arrays

- Formularios
  - input básico
  - Challenge: Quiz

(Día 5. 13/12/2024)

## Semana 2 - JS en la Web / Componentes

- JSON: stringify / parse
- Code review del challenge

### Guías de estilo

### Formularios

- Obtención de datos
- Validaciones nativas de HTML
- Validaciones custom

(Día 1. 16/12/2024)

### Enrutamiento (routing)

- Rutas relativas a origen / a documento
- root en el servidor web
- carga de JS basada en location.path

### Componentes

- template strings de HTML
- element.insertAdjacentHTML
- componentes funcionales

(Día 2. 17/12/2024)

### CRUD basado en componentes: ToDo List

- Concepto de Entidad (Modelo)
- Mock de datos: servicio para la importación desde JSON
- Página tasks y su ruta
- Componente task-cards: array de datos
- Componente card: parámetros
- Delete: función como parámetro

(Día 3. 18/12/2024)

- Final del CRUD: add y update, funciones como parámetros

### Asincronía en JS

- Conceptos
- Callbacks. Timeouts
- Promesas
- Async / await

- Gestión de errores

#### APIs REST -> json

(Día 4. 19/12/2024)

- AJAX. xmlHttpRequest (XHR)
  - Desde el código <https://pokeapi.co/api/v2/pokemon/ditto>
  - fetch (Browser, Node)

(Día 5. 20/12/2024)

#### Render Models

- Creación manual en el servidor
- SSG (Static Site Generation) - se genera el HTML en el servidor en tiempo de compilación (ahead of time)
- SSR (Server Side Rendering) - se genera el HTML en el servidor en tiempo de ejecución (just in time)
- CSR (Client Side Rendering) - se genera el HTML en el cliente en tiempo de ejecución (just in time)

#### Astro JS

Resolución del Challenge
