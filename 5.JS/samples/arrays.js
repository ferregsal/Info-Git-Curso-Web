const data = [7, 6, 5];

// Funciones mutables v. funciones inmutables

const initialData = [23, 34, 18];
const sorted = [...initialData].sort();
console.log(initialData, sorted);

const sorted2 = initialData.toSorted();
console.log(initialData, sorted2);

// ForEach recorre un array
data.forEach((item, i) => {
    console.log(item, i);
});

// ForEach para "mapear" o proyectar un array
const newArray = [];
data.forEach((item, i) => {
    newArray[i] = item * 2;
});

// Para esto está MAP
const newArray2 = data.map((item) => item * 2);

// Filter y Find

const names = ['Pepe', 'Pedro', 'Ramón', 'Luis'];

const filteredNames = names.filter((item) => item[0] === 'R');

const fonded = names.find((item) => item[0] === 'R');

console.log(names, filteredNames, fonded);

function myLength(array) {
    // return array.length
    for (let i = 0; i < Infinity; i++) {
        if (array[i] === undefined) {
            return i;
        }
    }
}

function myPush(array, value) {
    array[myLength(array)] = value;
}

{
    const data = [4, 6];
    myPush(data, 1);
    console.log(data, data.length);
}
