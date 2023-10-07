const todoForm = document.getElementById('todoForm');
const taskList = document.getElementById('taskList');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <input type="checkbox">
          <span>${task.task} - ${task.date}</span>
          <button class="delete" data-index="${index}">Eliminar</button>
        `;
        taskList.appendChild(listItem);

        listItem.querySelector('.delete').addEventListener('click', function () {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
    });
}

renderTasks();

todoForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskInput = document.getElementById('task');
    const dateInput = document.getElementById('date');

    const taskText = taskInput.value;
    const dateText = dateInput.value;

    if (taskText && dateText) {
        tasks.push({ task: taskText, date: dateText });
        saveTasks();
        renderTasks();

        taskInput.value = '';
        dateInput.value = '';
    }
});