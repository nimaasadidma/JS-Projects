function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const dateInput = document.getElementById('dateInput').value;
    const timeInput = document.getElementById('timeInput').value;

    if (taskText === "" || dateInput === "" || timeInput === "") {
        alert("Please enter a task, date, and time.");
        return;
    }

    // Format date and time
    const formattedDate = new Date(`${dateInput}T${timeInput}`).toLocaleString();

    // Create task element with date and time
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <div>
            <span onclick="toggleComplete(this)" class="task-text">${taskText}</span>
            <div class="timestamp">Due: ${formattedDate}</div>
        </div>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;

    // Add task to list
    document.getElementById('taskList').appendChild(taskItem);
    taskInput.value = "";
    document.getElementById('dateInput').value = "";
    document.getElementById('timeInput').value = "";
}

function toggleComplete(taskElement) {
    taskElement.classList.toggle('completed');
}

function deleteTask(deleteButton) {
    const taskItem = deleteButton.parentNode;
    taskItem.remove();
}
