document.addEventListener("DOMContentLoaded", () => {
  const todoList = document.getElementById("todo");
  const todoInput = document.querySelector("input[type='text']");
  const addButton = document.querySelector("button[type='submit']");

  function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach((todo) => addTodoItem(todo));
  }

  function saveTodos() {
    const todos = [];
    todoList.querySelectorAll("li span").forEach((span) => {
      todos.push(span.textContent);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function addTodoItem(task) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = task;

    const button = document.createElement("button");
    button.className =
      "bg-red-500 px-4 py-1 font-semibold rounded-md hover:bg-red-600 ml-2";
    button.type = "button";

    const svg = `
        <svg class="size-5 text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
        </svg>
      `;
    button.innerHTML = svg;

    button.addEventListener("click", () => {
      todoList.removeChild(li);
      saveTodos();
    });

    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
  }

  addButton.addEventListener("click", (event) => {
    event.preventDefault();
    const task = todoInput.value.trim();
    if (task) {
      addTodoItem(task);
      saveTodos();
      todoInput.value = "";
    }
  });

  loadTodos();
});
