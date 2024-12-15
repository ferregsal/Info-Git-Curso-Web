const facts = [
    {
        statement: 'JavaScript fue inventado en 1995',
        answer: 'true',
        explicación:
            'Brendan Eich creó JS en Netscape en 1995. La versión inicial del lenguaje fue escrita en solo 10 días.',
    },
    {
        statement: 'Los strings (cadenas) en JS son valores editables',
        answer: 'false',
        explicación:
            'En JavaScript, los strings son valores inmutables, lo que significa que no se pueden editar; sin embargo, se pueden reemplazar con nuevos strings diferentes.',
    },
    {
        statement: '1 + 1 === 2',
        answer: 'true',
        explicación: 'El operador más da la suma de dos números.',
    },
    {
        statement: "'1' + '1' === '2'",
        answer: 'false',
        explicación:
            "El operador más concatena (une) strings, por lo que '1' + '1' === '11'.",
    },
    {
        statement: "typeof ['J', 'S'] === 'array'",
        answer: 'false',
        explicación:
            "Los arrays tienen el tipo 'object'. En JS, todo es un tipo de dato primitivo (por ejemplo, 'string', 'number') o un objeto. Los arrays son un tipo de objeto con algunas propiedades especiales.",
    },
];

export function quizGame() {
    console.log('Loaded quizGame');

    function handleAnswerClick(event) {
        const button = event.target;
        // TODO 6B: Dentro de la función del controlador de eventos,
        // mostrar la explicación del hecho estableciendo el texto del elemento de explicación
        explanationElement.textContent = fact.explicación;

        // TODO 7: Dentro de la función del controlador de eventos,
        // Usar un bucle for para deshabilitar todos los botones de opción
        optionButtons.forEach(disable);

        // TODO 8: Dentro de la función del controlador de eventos,
        // Obtener el valor supuesto del botón clicado
        // Usar una condición para comparar la suposición con la respuesta del hecho
        // y agregar la clase "correct"/"incorrect" según corresponda
        if (isCorrect(button.textContent)) {
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
        }
    }

    // TODO 1: Declarar y asignar variables que apunten a los elementos correspondientes
    // statementElement debe ser el div "statement"
    // optionButtons debe ser todos los elementos dentro del div "options"
    // explanationElement debe ser el div "explanation"

    const statementElement = document.querySelector('.statement');
    const explanationElement = document.querySelector('.explanation');
    const optionButtons = document.querySelectorAll('.options button');

    // TODO 2: Declarar y asignar una variable llamada fact
    // Su valor debe ser un objeto con una declaración, respuesta verdadera/falsa y explicación

    const fact = facts[Math.floor(Math.random() * facts.length)];

    // TODO 3: Establecer el texto del elemento statement en la propiedad correspondiente del objeto fact

    statementElement.textContent = fact.statement;

    // TODO 4: Declarar funciones disable y enable para establecer o eliminar el atributo "disabled" de un elemento de botón dado
    // disable(button) debe establecer el atributo "disabled" del elemento de botón en el valor ""
    // enable(button) debe eliminar el atributo "disabled" del elemento de botón

    function disable(button) {
        button.setAttribute('disabled', '');
    }

    function enable(button) {
        button.removeAttribute('disabled');
    }

    // TODO 5: Declarar una función isCorrect que compare una suposición con la respuesta correcta
    // isCorrect(guess) debe devolver true si la suposición coincide con la respuesta del hecho

    function isCorrect(guess) {
        return guess === fact.answer;
    }

    // TODO 6A: Usar un bucle for para agregar un escucha de eventos de clic a cada uno de los optionButtons

    optionButtons.forEach((button) =>
        button.addEventListener('click', handleAnswerClick)
    );
}
