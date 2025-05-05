let draggedCard = null;
let rightClickedCard = null;
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

function addTask(columnId) {
    const input = document.getElementById(`${columnId}-input`);
    const taskText = input.value.trim();

    if(taskText === "") {
        return;
    }

    const taskDate = new Date().toLocaleString();
    const taskElement = createTaskElement(taskText, taskDate);

    document.getElementById(`${columnId}-tasks`).appendChild(taskElement);
    saveTasksToLocaleStorage(columnId, taskText, taskDate); 

    input.value = "";
}

function createTaskElement(taskText, taskDate) {
    const element = document.createElement("div");
    element.innerHTML = `<span>${taskText}</span><br><small class="time">${taskDate}</small>`;
    element.classList.add("card");
    element.draggable = true;
    element.addEventListener("dragstart", dragStart);
    element.addEventListener("dragend", dragEnd);
    element.addEventListener("contextmenu", function(event) {
        event.preventDefault();
        rightClickedCard = this;
        showContextMenu(event.pageX, event.pageY);
        
    })
    return element;
}

function dragStart() {
    this.classList.add("dragging");
    draggedCard = this;
}

function dragEnd() {
    this.classList.remove("dragging");
    updateLocalStorage();
}

const columns = document.querySelectorAll(".tasks");
columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    // column.addEventListener("drop", drop);
})

function dragOver(event) {
    event.preventDefault();
    this.appendChild(draggedCard);
}

const contextmenu = document.querySelector(".context-menu");
function showContextMenu(x, y) {
    contextmenu.style.left = `${x}px`;
    contextmenu.style.top = `${y}px`;
    contextmenu.style.display = "block";
}

document.addEventListener("click", () => {
    contextmenu.style.display = "none";
})

function editTask() {
    if(rightClickedCard !== null) {
        const newTaskText = prompt("Edit task - ",rightClickedCard.textContent);
        if(newTaskText !== "") {
            rightClickedCard.textContent = newTaskText;
            updateLocalStorage();
        }
    }
}

function deleteTask() {
    if (rightClickedCard !== null) {
        rightClickedCard.remove();

        updateLocalStorage();
    }
}

function saveTasksToLocaleStorage(columnId, taskText, taskDate) {
    const tasks = JSON.parse(localStorage.getItem(columnId)) || [];
    tasks.push({ text: taskText, date: taskDate});
    localStorage.setItem(columnId, JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    ["todo", "doing", "done"].forEach((columnId) => {
        const tasks = JSON.parse(localStorage.getItem(columnId)) || [];
        tasks.forEach(({text, date}) => {
            const taskElement = createTaskElement(text, date);
            document.getElementById(`${columnId}-tasks`).appendChild(taskElement);
        });
    })
}

function updateLocalStorage() {
    ["todo", "doing", "done"].forEach((columnId) => {
        const tasks = [];
        document.querySelectorAll(`#${columnId}-tasks .card`).forEach((card) => {
            const taskText = card.querySelector("span").textContent;
            const taskDate = card.querySelector("small").textContent;
            tasks.push({text: taskText, date: taskDate});
        });
        localStorage.setItem(columnId, JSON.stringify(tasks));
    });
} 