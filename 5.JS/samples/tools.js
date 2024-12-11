// Módulo

export function foo() {
    console.log('Soy foo');
}

// Crea una función que cuente la cantidad de palabras en una frase.

export function countWords(sentence = '') {
    if (typeof sentence !== 'string') return;
    if (sentence === '') return 0;
    const words = sentence.split(' ');
    return words.length;
}

// Crea una función que genere una
// contraseña aleatoria con
// letras mayúsculas,
// letras minúsculas
// y números.
export function randomDigit() {
    return Math.trunc(Math.random() * 10);
}

export function randomIntegerInInterval(min, max) {
    return Math.trunc(Math.random() * (max - min) + min);
}
export function randomLetter() {
    const letters = 'abcdefghijklmnñopqrstuvwxyz';
    const position = [randomIntegerInInterval(0, letters.length - 1)];
    return letters[position];
}

export function shuffleString(word = '') {
    const initialLetters = word.split('');
    const finalLetters = [];

    for (let i = 0; i < word.length; i++) {
        const n = randomIntegerInInterval(0, initialLetters.length - 1);
        const letter = initialLetters.splice(n, 1);
        finalLetters.push(letter);
    }

    return finalLetters.join('');
}

export function generatePassword(Lenght) {
    let rounds = 2;
    if (Lenght > 6) {
        rounds = Math.ceil(Lenght / 3);
    }
    let result = '';
    for (let i = 0; i < rounds; i++) {
        result += randomIntegerInInterval(0, 9);
        result += randomLetter();
        result += randomLetter().toUpperCase();
    }
    // if (Lenght > 6) result = result.slice(0, Lenght);

    //  return result;

    result = Lenght <= 6 ? result : (result = result.slice(0, Lenght));
    return shuffleString(result);
}
