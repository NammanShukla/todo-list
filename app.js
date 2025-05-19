const taskList = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    const taskListElement = document.getElementById('task-list');
    taskListElement.innerHTML = '';
    taskList.forEach((task, index) => {
        taskListElement.innerHTML += `
            <li class="${task.completed ? 'completed' : ''}">
                <span>${task.id} | ${task.name}</span>
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
        renderTasks();
        document.getElementById('task-name').value = '';
    }
}

function deleteTask(index) {
    taskList.splice(index, 1);
    renderTasks();
}

function toggleComplete(index) {
    taskList[index].completed = !taskList[index].completed;
    renderTasks();
}

function editTask(index) {
    const newName = prompt('Edit your selected task', taskList[index].name);
    if (newName !== null) {
        taskList[index].name = newName.trim();
        renderTasks();
    }
}

renderTasks();