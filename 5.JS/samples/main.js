import {
    countWords,
    randomLetter,
    randomDigit,
    generatePassword,
    shuffleString,
} from './tools.js';

console.log('Soy main');

const sentence = 'Hola';
console.log(countWords(sentence));

// for (let i = 0; i < 10; i++) {
//     console.log('Random Letter' + ' ' + randomLetter());
// }
// for (let i = 0; i < 10; i++) {
//     console.log('Random number' + ' ' + randomDigit());
// }
// for (let i = 0; i < 10; i++) {
//     console.log('Password' + ' ' + generatePassword(i + 1));
// }
console.log(generatePassword(13));
