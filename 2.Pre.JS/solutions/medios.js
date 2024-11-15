// 1. Crea una función que elimine el primer y último caracter de un string recibido por parámetros.

const removeLastFirst = function (value = '') {
    let result = '';
    for (let i = 1; i < value.length - 1; i++) {
        result += value[i];
    }

    // const r = value.slice(1, value.length - 1);
    // const r2 = value.substring(1, value.length - 1);

    return result;
};

console.log(removeLastFirst('PatatA'));

// 2. Escribe una función que reciba una palabra y revise si es un palíndromo.

// palindrimo => algo === algo alreves

function revertStringByArray(value = '') {
    return value.split('').reverse().join('');
}

function removeSpaces(value = '') {
    return value.replaceAll(' ', '');
}

function removeAccents(value = '') {
    const vocals = 'aeiou';
    const invalids = 'áéíóúü';
    const characters = value.split('');

    for (let i = 0; i < characters.length; i++) {
        const character = characters[i];
        if (invalids.includes(character)) {
            switch (character) {
                case 'á':
                    characters[i] = vocals[0];
                    break;
                case 'é':
                    characters[i] = vocals[1];
                    break;
                case 'í':
                    characters[i] = vocals[2];
                    break;
                case 'ó':
                    characters[i] = vocals[3];
                    break;
                case 'ú':
                case 'ü':
                    characters[i] = vocals[4];
                    break;
            }
        }
    }

    return characters.join('');
}

function removeAccentsPro(value = '') {
    const vocals = {
        á: 'a',
        é: 'e',
        í: 'i',
        ó: 'o',
        ú: 'u',
        ü: 'u',
    };

    const invalids = 'áéíóúü';
    const characters = value.split('');

    for (let i = 0; i < characters.length; i++) {
        const character = characters[i];
        if (invalids.includes(character)) {
            characters[i] = vocals[character];
        }
    }

    return characters.join('');
}

function isPalindrome(value = '') {
    const valueLowerCase = value.toLocaleLowerCase();
    // quitar espacios
    // 1. usar el string ....
    const noSpacesValue = removeSpaces(valueLowerCase);
    // 2. convertir en array ...
    // const noSpacesValue = valueLowerCase.split(' ').join('')
    const noAccentsValue = removeAccentsPro(noSpacesValue);

    const inverseValue = revertStringByArray(noAccentsValue);
    return noAccentsValue === inverseValue;
}

let sample = 'atar a la rata';
console.log(sample, 'is palindrome: ', isPalindrome(sample));
sample = 'dábale arroz a la zorra el abad';
console.log(sample, 'is palindrome: ', isPalindrome(sample));
sample = 'no soy palíndromo';
console.log(sample, 'is palindrome: ', isPalindrome(sample));

// 3. Crea una función que cuente las vocales que contiene una palabra dada por parámetros.

const countVocals = function (value = '') {
    const lowerValue = value.toLowerCase();
    let accumulator = 0;
    const vocals = 'aeiouáéíóúü';

    for (let i = 0; i < lowerValue.length; i++) {
        const item = lowerValue[i];
        accumulator += vocals.includes(item);
        // if (vocals.includes(item)) {
        //     accumulator++;
        // }
    }
    return accumulator;
};

console.log(countVocals('El Murciélago verde')); // 8

// 4. Crea una función que verifique si una cadena de texto recibida por parámetros es un pangrama (contiene todas las letras del abecedario).

function isPangram(value = '') {
    const letters = 'abcdefghijklmnñopqrstuvwxyz';
    let validValue = value.toLowerCase();
    validValue = removeAccents(validValue);

    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        if (!validValue.includes(letter)) {
            return false;
        }
    }
    return true;
}

sample = '';
console.log(sample, 'is pangram: ', isPangram(sample));
sample = 'ábcdéfghijk lmnño❤️😁,:;^pqrstuvwxyz';
console.log(sample, 'is pangram: ', isPangram(sample));

// 5. Escribe una función que compruebe si una cadena de texto contiene todas las vocales.

// 6. Crea una función que realice una cuenta atrás desde un número recibido por parámetros.

// 7. Escribe una función que reciba por parámetros el año de nacimiento, y calcule la edad de la persona.

function calculateAge(year = 0) {
    const today = new Date();
    actualYear = today.getFullYear();
    return actualYear - year;
}

console.log(calculateAge(2000));

// 8. Crea una función que reciba la edad de una persona por parámetros y verifique si es mayor de edad. Imprime por consola un string con el resultado.

// 9. Crea una función que simule el lanzamiento de un dado de 12 caras e imprime por consola el resultado cada vez que se ejecuta.

// 10. Crea una función que reciba un año por parámetros y compruebe e imprima por consola si el año es bisiesto o no.

// 11. Escribe una función que simula el juego piedra, papel y tijera. Recibirá como parámetro una opción (piedra, papel o tijera) en forma de string. La máquina, elegirá automáticamente una opción aleatoria. Imprime por consola ambas elecciones y en caso de ganar el jugador un mensaje de victoria, y en caso de perder uno de derrota.

function renderStonePaperScissors(userRoll = '') {
    const rolls = ['piedra', 'papel', 'tijeras'];
    if (!rolls.includes(userRoll)) {
        console.log('Tirada inválida');
        return;
    }
    const rollNumber = Math.round(Math.random() * 2);
    const machineRoll = rolls[rollNumber];

    let winner = 'user';
    if (userRoll === machineRoll) {
        winner = 'empate';
    } else if (userRoll === 'piedra') {
        if (machineRoll === 'papel') {
            winner = 'machine';
        }
        //machineRoll = 'tijeras'
    } else if (userRoll === 'papel') {
        if (machineRoll === 'tijeras') {
            winner = 'machine';
        }
        //machineRoll = 'piedra'
    } else {
        // (userRoll = 'tijera')
        if (machineRoll === 'piedra') {
            winner = 'machine';
        }
        //machineRoll = 'papel'
    }

    console.log('Tu opción (user)', userRoll);
    console.log('Opción de la maquina', machineRoll);
    console.log('Result', winner);
}

function playStonePaperScissors() {
    const rolls = ['piedra', 'papel', 'tijeras'];
    const rollNumber = Math.round(Math.random() * 2);
    renderStonePaperScissors(rolls[rollNumber]);
}

playStonePaperScissors();

// 12. La serie de Fibonacci es un problema matemático que realiza la suma de los dos números anteriores para generar el siguiente. Crea una función que imprima por consola la serie de Fibonacci si superar un número introducido por el usuario. El usuario debe ser preguntado por este número al iniciar la aplicación.

// 13. Escribe una función generadora de nombres de usuario aleatorios, a partir de dos grupos de palabras dadas. Estos grupos de palabras pueden estar agrupados en arrays. (nombres=['Hugo', 'Luis'], apellidos=['Duro', 'Fabiano']). Retorna un nombre de usuario aleatorio con nombre, apellido y un número aleatorio del 1 al 100. (Por ejemplo -> 'Pepe Pérez 87'.)

// 14. Crea una función calculadora de propinas. Debe recibir el total de la cuenta y el porcentaje de propina deseado, con ello deberá calcular e imprimir por consola la cuenta, la propina que corresponde a la cuenta introducida, y el total a pagar. Redondea a dos decimales.

const x = 45.7;

console.log(x, 'Euros'); //47,78€

// 15. Escribe una función que calcule el descuento aplicado a un precio. La función recibirá el precio y el descuento del artículo en venta, con ellos deberá calcular e imprimir por consola el precio, el descuento y el total del precio una vez aplicado el descuento. Redondea a dos decimales.

//  16. Crea una función que sume todos los números recibidos como un array o por separado.

// function totalArray(array) {}

function sumaNumbers() {
    let accumulator = 0;
    for (let i = 0; i < arguments.length; i++) {
        accumulator += arguments[i];
    }
    return accumulator;
}

// totalArray([1,3,4,5,6,7])

console.log(sumaNumbers(1, 4, 5, 6, 7, 8));
