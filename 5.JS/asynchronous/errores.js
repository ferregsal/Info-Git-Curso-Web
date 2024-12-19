function divide(a, b) {
    if (b === 0) {
        throw new Error('No se puede dividir por 0');
    }
    return a / b;
}

try {
    // foo = 12; // ReferenceError
    // const baz = 13
    // baz = 13; // TypeError
    console.log(divide(23, 0) * 3);
} catch (error) {
    console.log(error.message);
}

console.log('Esto va después del error');
