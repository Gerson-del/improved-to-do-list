function toggleTasks() {
  const taskText = document.getElementById("input").value;

  if (taskText === "") {
    alert("please enter a task");
    return;
  }

  crearTareas(taskText);

  document.getElementById("input").value = "";

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function crearTareas(initialText) {
  let currentText = initialText; // 👈 mantiene el texto actualizado
  console.log("current text: ", currentText);

  const taskContainer = document.getElementById("task-container");

  const taskWrapper = document.createElement("div");
  taskWrapper.className = "taskWrapper";

  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "buttonWrapper";

  const task = document.createElement("p");
  task.className = "parrafos";
  task.innerHTML = currentText;

  const deleteButton = document.createElement("button");
  deleteButton.className = "buttons";
  deleteButton.innerHTML = "eliminar";

  const editButton = document.createElement("button");
  editButton.className = "buttons";
  editButton.innerHTML = "editar";

  const checkButton = document.createElement("button");
  checkButton.innerHTML = "✅";
  checkButton.className = "check-button";

  deleteButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this task?")) {
      taskContainer.removeChild(taskWrapper);

      const updatedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const index = updatedTasks.indexOf(currentText); // 👈 usar currentText actualizado

      if (index > -1) {
        updatedTasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      }
    }
  });

  editButton.addEventListener("click", () => {
    task.style.display = "none";
    editButton.style.display = "none";

    const editArea = document.createElement("textarea");
    editArea.value = currentText;
    editArea.className = "edit-area";
    taskWrapper.appendChild(editArea);

    const saveButton = document.createElement("button");
    saveButton.className = "buttons";
    saveButton.innerHTML = "Save";

    saveButton.addEventListener("click", () => {
      const newText = editArea.value.trim();
      console.log("newText : " + newText);

      if (newText !== "") {
        const updatedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const index = updatedTasks.indexOf(currentText);

        if (index > -1) {
          updatedTasks[index] = newText;
          localStorage.setItem("tasks", JSON.stringify(updatedTasks));
          currentText = newText; // 👈 actualizar el texto actual
          console.log("current text after saving : " + currentText);
          task.innerHTML = currentText;
        }
      }

      task.style.display = "flex";
      editArea.remove();
      saveButton.remove();
      editButton.style.display = "block";
    });

    taskWrapper.appendChild(saveButton);
  });

  checkButton.addEventListener("click", () => {
    taskWrapper.classList.toggle("task-completed");
  });

  taskWrapper.appendChild(task);
  taskWrapper.appendChild(checkButton);
  buttonWrapper.appendChild(editButton);
  buttonWrapper.appendChild(deleteButton);
  taskWrapper.appendChild(buttonWrapper);
  taskContainer.appendChild(taskWrapper);
}

function loadTasks() {
  const list = localStorage.getItem("tasks");

  console.log(list);

  const tasks = JSON.parse(list) || [];

  tasks.forEach((taskText) => {
    crearTareas(taskText);
  });
}

document.addEventListener("DOMContentLoaded", loadTasks);
