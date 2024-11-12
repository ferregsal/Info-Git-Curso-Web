'use strict';
// sentencias

// expresiones

// variables y datos

console.log(22, typeof 22);
console.log('Pepe', typeof 'Pepe');
console.log(true, typeof true);

// declaran  var - let - const

// let user
// let age
// let isStudent

// asignación

// user = 'Pepe'
// age = 22
// isStudent = true

// declaran + asignar  var - let - const

let user = 'Pepe';
let age = 22;
let isStudent = true;

user = 'Jose';

// CONST

const course = 'JavaScript';

// Da un error
// course = 'Typescript'

let emotionalState = '😂';
console.log(emotionalState);

let score = 5 + 4;
score = 9;

let newScore = 3 * score;
let otherScore = newScore;
newScore = 54;

console.log(newScore); // 54
console.log(otherScore); // 27

console.log(newScore > otherScore); //true
console.log(newScore === otherScore); // false

console.log(2 === '2'); // false

// Concatenación

const firstName = 'Pepe';
const surName = 'Perez';
const fullName = firstName + ' ' + surName;
console.log(fullName);

// template
console.log(`Hola, soy ${firstName} ${surName}`);

let a = 2;
const b = '2';

console.log(a * b); // 4
console.log((Number(a) + +b) * 2); // 4

console.log(5 % 2);
console.log(4 % 2);

console.log(3 ** 3);
console.log(Math.pow(3, 3));

a = a + 3; // 5
// lo mismo a += 3

a = a + 1;
// Lo mismo a += 1

let e = 23;
console.log(e);
e = 23;
console.log(e++);
console.log(e);

e = 23;
console.log(++e);

// coercion

let v1 = 3;
let v2 = '4';
// Coerción a number de la variable v2
console.log(v1 * v2);
console.log(typeof v2); // string
// Coerción a string de la variable v1
console.log(v1 + v2); // '34'
console.log(typeof v1); // number
// Casting a number de la variable v2
console.log(v1 + Number(v2)); // 7
console.log(true + false); // 1

// Booleans

// Falsies -> false
console.log(Boolean(false));
console.log(Boolean(0));
console.log(Boolean(-0));
console.log(Boolean(0n));
console.log(Boolean(''));
console.log(Boolean(undefined));
console.log(Boolean(null));
console.log(Boolean(NaN));
