const taskList = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks(filter = '') {
    const taskListElement = document.getElementById('task-list');
    taskListElement.innerHTML = '';
    taskList
        .filter(task => task.name.toLowerCase().includes(filter.toLowerCase()))
        .forEach((task, index) => {
            taskListElement.innerHTML += `
                <li class="${task.completed ? 'completed' : ''}">
                    <span>${task.name}</span>
                    <div class="task-buttons">
                        <button onclick="editTask(${index})">Edit</button>
                        <button onclick="deleteTask(${index})">Delete</button>
                        <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                    </div>
                </li>
            `;
        });
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

function addTask() {
    const name = document.getElementById('task-name').value.trim();
    if (name) {
        const id = Math.random().toString(36).substr(2, 9);
        taskList.push({ id, name, completed: false });
        renderTasks(document.getElementById('task-filter').value);
        document.getElementById('task-name').value = '';
    }
}

function deleteTask(index) {
    taskList.splice(index, 1);
    renderTasks(document.getElementById('task-filter').value);
}

function toggleComplete(index) {
    taskList[index].completed = !taskList[index].completed;
    renderTasks(document.getElementById('task-filter').value);
}

function editTask(index) {
    const newName = prompt('Enter new task name:', taskList[index].name);
    if (newName !== null) {
        taskList[index].name = newName.trim();
        renderTasks(document.getElementById('task-filter').value);
    }
}

function filterTask(query) {
    renderTasks(query);
}

renderTasks();