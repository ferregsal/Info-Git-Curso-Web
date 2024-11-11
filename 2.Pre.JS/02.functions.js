// Declaración de una función

function add(a, b) {
    // parametros: a y b
    const result = a + b;
    console.log(result); // efecto
    return result; // resultado
}

const x = add(2, 4); // Argumentos: 2 y 4
// x = 6

const w = 12;
const k = 2;
add(w, k);
add(12, 2);

// Mal

const f = 2323;

function foo() {
    return f;
}

console.log(foo());
