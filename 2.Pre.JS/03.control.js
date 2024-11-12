'use strict';
// var -> ámbito global y función
// let y const ámbito de bloque

let a = 4;

if (true) {
    let a = 5;
    console.log('Desde el bloque', a); // 5
}

console.log('Global', a); // 4

// If / else

const age = 18;
const userName = `Pepe`;
const gender = '';

if (age <= 10) {
    console.log('Los niños no pueden entrar');
} else if (age < 18) {
    console.log('Los menores deben ir acompañados');
} else if (gender === 'male') {
    console.log(`Bienvenido, ${userName}`);
} else {
    console.log(`Bienvenida, ${userName}`);
}

console.log('Fin');

const language = 'De';
const role = 'user';
let greeting;
switch (language) {
    case 'En':
        greeting = 'Hello my friend';
        break;
    case 'Es':
        greeting = 'Hola amigo';
        break;
    case 'Fr':
        greeting = 'Salut mon ami';
        break;
    case 'De':
    case 'Ne':
        greeting = 'Hallo Freund';
        break;
    default:
        greeting = 'Hi';
        break;
}
console.log(greeting);

// tirar un dado 1 vez

function rollDiceN(n) {
    let accumulator = 0;
    for (let i = 0; i < n; i++) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log('Valor del dado:', dice);
        // accumulator = accumulator + dice
        accumulator += dice;
    }
    console.log('Total:', accumulator);
}

function rollDiceNFriki(n) {
    let accumulator = 0;
    for (let i = n; i > 0; i--) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log('Valor del dado:', dice);
        // accumulator = accumulator + dice
        accumulator += dice;
    }
    console.log('Total:', accumulator);
}

rollDiceN(10);
rollDiceNFriki(10);

const cad = 'Hola que tal';
console.log(cad.length);
// Error cad[3] = 'r';
console.log(cad[3]);

for (let i = 0; i < cad.length; i++) {
    const element = cad[i];
    console.log(element);
}
