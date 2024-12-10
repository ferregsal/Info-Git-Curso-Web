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
