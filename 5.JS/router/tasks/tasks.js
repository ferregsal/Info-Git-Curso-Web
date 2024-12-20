import { createHeader } from '../components/header.js';
import { getTasksFromBackend } from '../services.js';
import { createTaskCards } from './components/task-cards.js';

export function loadTasks() {
    console.log('loaded tasks');
    const pageTitle = 'Tareas';
    createHeader(pageTitle);
    const tasks = getTasksFromBackend();
    console.log(tasks);
    createTaskCards(tasks, '.cards-container');
}
