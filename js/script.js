const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");
const filterSelect = document.getElementById("filter-select");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    const searchTerm = searchInput.value.toLowerCase();

    filteredTasks = filteredTasks.filter(task =>
        task.text.toLowerCase().includes(searchTerm)
    );

    const filter = filterSelect.value;

    if(filter === "done"){
        filteredTasks = filteredTasks.filter(task => task.done);
    }

    if(filter === "todo"){
        filteredTasks = filteredTasks.filter(task => !task.done);
    }

    filteredTasks.forEach((task, index) => {

        const li = document.createElement("li");
        li.classList.add("task");

        if(task.done){
            li.classList.add("done");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="actions">
                <button class="complete">
                    ${task.done ? "Desfazer" : "Concluir"}
                </button>

                <button class="delete">Excluir</button>
            </div>
        `;

        li.querySelector(".complete").addEventListener("click", () => {
            task.done = !task.done;
            saveTasks();
            renderTasks();
        });

        li.querySelector(".delete").addEventListener("click", () => {
            tasks.splice(index,1);
            saveTasks();
            renderTasks();
        });

        taskList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if(text === ""){
        alert("Digite uma tarefa.");
        return;
    }

    tasks.push({
        text,
        done:false
    });

    saveTasks();
    renderTasks();
    taskInput.value = "";
});

searchInput.addEventListener("keyup", renderTasks);

filterSelect.addEventListener("change", renderTasks);

renderTasks();