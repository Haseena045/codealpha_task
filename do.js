document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.completed);
        });
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.textContent.trim().replace('Delete', '').trim(),
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to DOM
    const addTaskToDOM = (text, completed = false) => {
        const li = document.createElement('li');
        if (completed) {
            li.classList.add('completed');
        }
        li.innerHTML = `
            ${text}
            <button class="delete">Delete</button>
        `;
        li.querySelector('button.delete').addEventListener('click', () => {
            li.remove();
            saveTasks();
        });
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });
        taskList.appendChild(li);
    };

    // Add task on button click
    addTaskButton.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text) {
            addTaskToDOM(text);
            taskInput.value = '';
            saveTasks();
        }
    });

    // Add task on Enter key press
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });

    // Initial load
    loadTasks();
});
