console.log('Index loaded')

function greeting() {

const question = '¿Como te llamas?'
    const userName = prompt(question)
    if(userName === null || userName === '')  return
    const response = `Hola, ${userName}, que tal estas`
    alert(response)

    // if(userName !== null) {
    //     const response = `Hola, ${userName}, que tal estas`
    //     alert(response)
    // }
}

const button = document.querySelector('form button')
button.addEventListener('click', greeting)

