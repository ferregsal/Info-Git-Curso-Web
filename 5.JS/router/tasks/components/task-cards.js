import { render } from '../../components/base.js';
import { createCard } from './card.js';
import { createAddTask } from './add-task.js';

//  id: string,
//  title: string,
//  owner: string,
//  isDone: boolean

export function createTaskCards(
    tasks,
    selector = 'body',
    position = 'beforeend'
) {
    function deleteCard({ id }) {
        console.log(id);
        // const index = tasks.findIndex((item) => item.id === id);
        //tasks.splice(index, 1);
        tasks.splice(
            tasks.findIndex((item) => item.id === id),
            1
        );
        console.log(tasks);
    }

    function updateCard(updatedTask) {
        const id = updatedTask.id;
        const index = tasks.findIndex((item) => item.id === id);
        tasks[index] = {
            ...tasks[index],
            ...updatedTask,
        };
        console.log(tasks);
    }

    function addCard(task) {
        // task.id = task.id || crypto.randomUUID().split('-')[0];
        tasks.push(task);
        console.log(tasks);
        createCard(task, deleteCard, updateCard, 'ul.cards');
    }

    function extendedRender() {
        document.querySelector(selector).innerHTML = '';

        const element = render(selector, position, template);
        createAddTask(addCard, 'details');
        tasks.forEach((task) =>
            createCard(task, deleteCard, updateCard, 'ul.cards')
        );
        return element;
    }

    const template = /*html*/ `
    <ul class="cards">
    </ul>
    `;
    const element = extendedRender();
}
