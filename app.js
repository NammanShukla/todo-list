const taskList = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks(filterText = '', status = 'all') {
    const taskListElement = document.getElementById('task-list');
    const taskStatusElement = document.getElementById('task-status');
    taskListElement.innerHTML = '';

    const lowerText = filterText.toLowerCase();

    const filteredTasks = taskList.filter(task => {
        const matchesText = task.name.toLowerCase().includes(lowerText);
        const matchesStatus =
            status === 'all' ||
            (status === 'completed' && task.completed) ||
            (status === 'pending' && !task.completed);
        return matchesText && matchesStatus;
    });

    filteredTasks.forEach((task, index) => {
        taskListElement.innerHTML += `
            <li class="${task.completed ? 'completed' : ''}">
                <div class="checkbox-layout">
                <input type="checkbox" class="task-checkbox" data-id="${task.id}">
                </div>
                <span>${task.name}</span>
                <div class="task-buttons">
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                    <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                </div>
            </li>
        `;
    });

    const total = taskList.length;
    const completed = taskList.filter(task => task.completed).length;
    const remaining = total - completed;
    taskStatusElement.textContent = `Total: ${total} | Completed: ${completed} | Remaining: ${remaining}`;

    localStorage.setItem('tasks', JSON.stringify(taskList));
}



function addTask() {
    const name = document.getElementById('task-name').value.trim();
    if (name) {
        const id = Math.random().toString(36).substr(2, 9);
        taskList.push({ id, name, completed: false });
        applyFilters();
        document.getElementById('task-name').value = '';
    }
}

function deleteTask(index) {
    taskList.splice(index, 1);
    applyFilters();
}

function toggleComplete(index) {
    taskList[index].completed = !taskList[index].completed;
    applyFilters();
}

function editTask(index) {
    const newName = prompt('Enter new task name:', taskList[index].name);
    if (newName !== null) {
        taskList[index].name = newName.trim();
        applyFilters();
    }
}

function filterTask(query) {
    renderTasks(query);
}

function applyFilters() {
    const text = document.getElementById('task-filter').value;
    const status = document.getElementById('status-filter').value;
    renderTasks(text, status);
}

function deleteSelectedTasks() {
    const checkboxes = document.querySelectorAll('.task-checkbox:checked');
    const idsToDelete = Array.from(checkboxes).map(cb => cb.getAttribute('data-id'));
    for (let i = taskList.length - 1; i >= 0; i--) {
        if (idsToDelete.includes(taskList[i].id)) {
            taskList.splice(i, 1);
        }
    }
    applyFilters();
}

renderTasks();