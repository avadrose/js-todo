document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.getElementById("newTodoForm");
  const todoInput = document.getElementById("todo");
  const todoList = document.getElementById("todoList");

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach(todo => addTodoToDOM(todo));

  todoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const todoText = todoInput.value.trim();

    if (todoText === "") return;

    const newTodo = {
      text: todoText,
      completed: false
    };

    todos.push(newTodo);
    saveTodos();
    addTodoToDOM(newTodo);

    todoForm.reset();
  });

  todoList.addEventListener("click", function (e) {
    const li = e.target.closest("li");

    if (!li) return;

    const index = Array.from(todoList.children).indexOf(li);

    if (e.target.tagName === "BUTTON") {
      todos.splice(index, 1);
      li.remove();
    } else if (e.target.tagName === "LI") {
      todos[index].completed = !todos[index].completed;

      li.style.textDecoration =
        todos[index].completed ? "line-through" : "none";
    }

    saveTodos();
  });

  function addTodoToDOM(todo) {
    const newTodo = document.createElement("li");

    newTodo.innerText = todo.text;

    if (todo.completed) {
      newTodo.style.textDecoration = "line-through";
    }

    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";

    newTodo.appendChild(removeButton);
    todoList.appendChild(newTodo);
  }

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});