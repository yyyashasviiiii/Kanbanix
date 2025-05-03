let draggedCard = null;
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
    return element;
}

function dragStart() {
    this.classList.add("dragging");
    draggedCard = this;
    console.log(this)
}

function dragEnd() {
    this.classList.remove("dragging");
}

const columns = document.querySelectorAll(".columns .tasks");
columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
})

function dragOver(event) {
    event.preventDefault();
    this.appendChild(draggedCard);
}