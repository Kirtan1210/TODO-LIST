const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

// Load saved tasks
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(task => createTodoItem(task.text, task.done));
};

// Save tasks
function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".todo-item").forEach(item => {
    tasks.push({
      text: item.querySelector("input").value,
      done: item.querySelector("input").classList.contains("done")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add new task
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") {
    alert("Please enter a task!");
    return;
  }
  createTodoItem(text);
  taskInput.value = "";
  saveTasks();
});

function createTodoItem(text, done = false) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");

  const input = document.createElement("input");
  input.type = "text";
  input.value = text;
  input.setAttribute("readonly", "readonly");
  if (done) input.classList.add("done");

  const actions = document.createElement("div");
  actions.classList.add("actions");

  const editBtn = document.createElement("i");
  editBtn.className = "fa-solid fa-pen-to-square";

  const doneBtn = document.createElement("i");
  doneBtn.className = "fa-solid fa-check";

  const deleteBtn = document.createElement("i");
  deleteBtn.className = "fa-solid fa-trash";

  actions.append(editBtn, doneBtn, deleteBtn);
  todoItem.append(input, actions);
  todoList.appendChild(todoItem);

  // Edit
  editBtn.addEventListener("click", () => {
    if (input.hasAttribute("readonly")) {
      input.removeAttribute("readonly");
      input.focus();
      editBtn.style.color = "lightgreen";
    } else {
      input.setAttribute("readonly", "readonly");
      editBtn.style.color = "#e55c8a";
      saveTasks();
    }
  });

  // Done
  doneBtn.addEventListener("click", () => {
    input.classList.toggle("done");
    saveTasks();
  });

  // Delete
  deleteBtn.addEventListener("click", () => {
    todoItem.remove();
    saveTasks();
  });
}
