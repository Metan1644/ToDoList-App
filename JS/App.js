let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const deadlineInput = document.getElementById("deadlineInput");
  const taskName = taskInput.value;
  const deadline = deadlineInput.value;

  const task = { name: taskName, deadline: deadline, completed: false };
  tasks.push(task);

  renderTasks();

  taskInput.value = "";
  deadlineInput.value = "";
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
  
    const showCompleted = document.getElementById("completedFilter").checked;
  
    tasks.forEach((task, index) => {
      if (!showCompleted && task.completed) {
        return;
      }
      const li = document.createElement("li");
      li.textContent = task.name;
      if (task.completed) {
        li.classList.add("completed");
      }
      const deadline = task.deadline ? ` (${task.deadline})` : "";
      li.textContent += deadline;
  
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => toggleTaskCompletion(index));
  
      li.prepend(checkbox);
      taskList.appendChild(li);
    });
  }
  

function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function toggleCompletedVisibility() {
  renderTasks();
}

function sortTasks() {
  const sortSelect = document.getElementById("sortSelect");
  const sortBy = sortSelect.value;

  if (sortBy === "name") {
    tasks.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "deadline") {
    tasks.sort((a, b) => a.deadline.localeCompare(b.deadline));

  }

  renderTasks();
}

