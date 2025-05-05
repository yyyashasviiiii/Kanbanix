let draggedCard = null;
let rightClickedCard = null;
function addTask(columnId) {
    const input = document.getElementById(`${columnId}-input`);
    const taskText = input.value.trim();

    if(taskText === "") {
        return;
    }

    const taskElement = createTaskElement(taskText);

    document.getElementById(`${columnId}-tasks`).appendChild(taskElement);

    input.value = "";
}

function createTaskElement(taskText) {
    const element = document.createElement("div");
    element.textContent = taskText;
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
        }
    }
}

function deleteTask() {
    if (rightClickedCard !== null) {
        rightClickedCard.remove();
    }
}