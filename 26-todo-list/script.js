const TODO = "TODO";
const INPROGRESS = "INPROGRESS";
const COMPLETED = "COMPLETED";

let tasks = [
  {
    id: 1,
    title: "Complete Angular Course",
    status: "TODO",
  },
  {
    id: 2,
    title: "Complete DSA Course",
    status: "INPROGRESS",
  },
  {
    id: 3,
    title: "Complete 100-days-of-js",
    status: "COMPLETED",
  },
];

let newTaskName = "";
let newTaskStatus = TODO;

const todoTasks = tasks.filter((task) => task.status === TODO);
const inprogressTasks = tasks.filter((task) => task.status === INPROGRESS);
const completedTasks = tasks.filter((task) => task.status === COMPLETED);

const mainAddTaskBtn = document.getElementById("main-btn");

const modal = document.getElementById("modal");
const modalBtn = document.getElementById("modal-add-btn");
const modalInput = document.getElementById("modal-input");
const modalSelect = document.getElementById("modal-select");

const toDoSection = document.getElementById("task-container");
const inProgressSection = document.getElementById("inprogress-section");
const completedSection = document.getElementById("completed-section");

function getBackgroundColor(task) {
  if (task.status === TODO) {
    return "#f1dada";
  } else if (task.status === INPROGRESS) {
    return "rgb(233, 243, 255)";
  } else {
    return "rgb(233, 243, 234)";
  }
}

function toggleTasksInput(e) {
  const isChecked = e.target.checked;
  const toggledTask = document.getElementById(e.target.getAttribute("id"));
  if (isChecked) {
    completedSection.appendChild(toggledTask);
    toggledTask.style.background = "rgb(233, 243, 234)";
  } else {
    toDoSection.appendChild(toggledTask);
    toggledTask.style.background = "#f1dada";
  }
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

function allowDrop(ev) {
  ev.preventDefault();
}

function createTask(task) {
  const container = document.createElement("div");
  container.setAttribute("id", `task-${task.id}`);
  container.classList.add("tasks");
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("name", `task-${task.id}`);
  input.setAttribute("value", task.title);
  input.setAttribute("id", `task-${task.id}`);
  input.style.cursor = "pointer";
  input.style.width = "20px";
  input.style.height = "20px";

  if (task.status === "COMPLETED") {
    input.checked = true;
  }
  container.style.background = getBackgroundColor(task);
  const label = document.createElement("label");
  label.setAttribute("for", `task-${task.id}`);
  label.innerText = task.title;
  label.style.marginLeft = "10px";
  container.appendChild(input);
  container.appendChild(label);
  container.setAttribute("draggable", true);
  container.addEventListener("ondragstart", drag);
  return container;
}

function createTasksList(tasks, section) {
  const fragment = document.createDocumentFragment();
  tasks.forEach((task) => {
    const container = createTask(task, section);
    fragment.appendChild(container);
  });
  section.appendChild(fragment);
}

function createTasks() {
  createTasksList(todoTasks, toDoSection);
  createTasksList(inprogressTasks, inProgressSection);
  createTasksList(completedTasks, completedSection);
  toDoSection.addEventListener("change", toggleTasksInput);
  inProgressSection.addEventListener("change", toggleTasksInput);
  completedSection.addEventListener("change", toggleTasksInput);

  toDoSection.addEventListener("ondragover", allowDrop);
  toDoSection.addEventListener("ondrop", drop);

  inProgressSection.addEventListener("ondragover", allowDrop);
  inProgressSection.addEventListener("ondrop", drop);

  completedSection.addEventListener("ondragover", allowDrop);
  completedSection.addEventListener("ondrop", drop);
}

// Add task modal

function addNewTask() {
  if (!newTaskName.length) {
    return;
  }
  const newTask = {
    id: tasks.length + 1,
    title: newTaskName,
    status: newTaskStatus,
  };
  const container = createTask(newTask);
  if (newTask.status === TODO) {
    toDoSection.appendChild(container);
  } else if (newTask.status === INPROGRESS) {
    inProgressSection.appendChild(container);
  } else {
    completedSection.appendChild(container);
  }
  tasks.push(newTask);
  newTaskName = "";
  newTaskStatus = TODO;
  modalInput.value = "";
  modalSelect.value = TODO;
  modal.style.display = "none";
}

modalBtn.addEventListener("click", addNewTask);
modalInput.addEventListener("change", (e) => {
  newTaskName = e.target.value;
});
modalSelect.addEventListener("change", (e) => {
  newTaskStatus = e.target.value;
});

mainAddTaskBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

createTasks();

// start drag and drop feature
