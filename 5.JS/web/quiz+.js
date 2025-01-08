import FACTS from './facts.json' with { type: 'json' };

function disable(button) {
    button.setAttribute('disabled', '');
}

function enable(button) {
    button.removeAttribute('disabled');
}

export function quizGamePlus() {
    function getFact() {
        const index = Math.floor(Math.random() * facts.length);
        const [fact] = facts.splice(index, 1);
        document.querySelector('.play-score').textContent =
            +document.querySelector('.play-score').textContent + 1;
        return fact;
    }

    function isCorrect(guess) {
        return guess === fact.answer;
    }

    function handleAnswerClick(event) {
        const button = event.target;
        optionButtons.forEach(disable);

        let htmlExplanation = '';

        if (isCorrect(button.textContent)) {
            button.classList.add('correct');
            htmlExplanation += `<p class="h5">Muy bien 👌</p>`;
            document.querySelector('.win-score').textContent =
                +document.querySelector('.win-score').textContent + 1;
        } else {
            button.classList.add('incorrect');
            htmlExplanation += `<p class="h5">Oh!! Buena suerte en la próxima 😢</p>`;
        }
        htmlExplanation += `<p>${fact.explicación}</p>`;
        explanationElement.innerHTML = htmlExplanation;
    }

    function quizPlayTurn() {
        statementElement.textContent = fact.statement;
        explanationElement.innerHTML = '';

        optionButtons.forEach((button) => {
            enable(button);
            button.classList.remove('correct', 'incorrect');
        });
    }

    function handleNextClick(event) {
        fact = getFact();
        quizPlayTurn();

        if (facts.length === 0) {
            disable(event.target);
        }
    }

    function handleRestartClick() {
        facts = FACTS.slice();
        fact = getFact();
        document.querySelector('.win-score').textContent = 0;
        document.querySelector('.play-score').textContent = 0;
        enable(actionsButtons[0]);
        quizPlayTurn();
    }

    console.log('Loaded quizGame +');

    const statementElement = document.querySelector('.statement');
    const explanationElement = document.querySelector('.explanation');
    const optionButtons = document.querySelectorAll('.answers button');
    const actionsButtons = document.querySelectorAll('.actions button');
    
    optionButtons.forEach((button) =>
        button.addEventListener('click', handleAnswerClick)
    );

    actionsButtons[0].addEventListener('click', handleNextClick);
    actionsButtons[1].addEventListener('click', handleRestartClick);

    let facts = FACTS.slice();
    let fact = getFact();
    quizPlayTurn();
}
