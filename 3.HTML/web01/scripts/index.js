console.log('Loaded index');

function handleSubmit(ev) {
    ev.preventDefault();
    console.log(ev);
    const elements = ev.target.elements;
    console.log(elements.namedItem('firstname').value);
}

const form = document.querySelector('form');
console.dir(form);
//form.addEventListener('submit', handleSubmit);
