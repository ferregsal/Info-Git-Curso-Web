'use strict';
// Objetos literales

// JSON
const user = {
    name: 'Pepe',
    age: 22,
};

console.log(user.name);

// Primitivos (inmutables)
// const -> CONSTANTE

const x = 22;
// imposible x = 1

// Objetos (mutables)
// const -> NO RE-ASIGNABLE

const student = {
    name: 'Pepe',
    age: 22,
    color: 'white',
};

student.age = 23;
student.course = 'web';
delete student.color;

console.log(student);

// Strings -> INMUTABLES
// Iterables solo de lectura
const userName = 'Pepe Pérez';
console.log(userName.length);
console.log(userName[0]);
// Error userName[0] = 'Z';

const data = ['Pepe', 'Juan', 'Rosa', 'Ernestina'];
console.log(data[0]);
data[0] = 'Jose';
console.log(data[0]);
console.log(data.length);
data[data.length] = 'Francisco';
console.log(data.length);
console.log(data);
data.length = 2;
console.log(data);
data.length = 5;
console.log(data);
data[123] = 'Ramón';
console.log(data);
data.use = 'List of names';
console.log(data);
console.log(data.length);
console.log(typeof data);

const course = 'Web Developer';
console.log(course.toUpperCase());

const numbers = [1, 4, 3, 10, 2, 6, 8];

// Métodos de Arrays:

// Mutables

//numbers[numbers.length] = 45
let l = numbers.push(45);
console.log(l, numbers);
let number = numbers.pop();
console.log(number, numbers);
l = numbers.unshift(45);
console.log(l, numbers);
number = numbers.shift();
console.log(number, numbers);

// numbers.sort();
// console.log(numbers);

// Inmutables

const numString = numbers.join(' - ');
console.log(numString);
const sortedNumbers = numbers.toSorted((a, b) => a - b);
console.log(numbers);
console.log(sortedNumbers);

const matrix = [
    [1, 2, 3, 4],
    [10, 20, 30, 40],
    [100, 200, 300, 400],
];

const rows = matrix.length;
const cols = matrix[0].length;

console.log(rows); // 3
console.log(cols); // 4
console.log(matrix[1][1]); // 20

let accumulator = 0;
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const element = matrix[i][j];
        accumulator += element;
        console.log(element);
    }
}
console.log(accumulator);
