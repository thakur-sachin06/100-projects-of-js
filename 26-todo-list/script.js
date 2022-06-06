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

let draggableItem;
let localStorageTasks = JSON.parse(localStorage.getItem("tasks"));
let userTasks =
  localStorageTasks && localStorageTasks.length ? localStorageTasks : tasks;

const todoTasks = userTasks.filter((task) => task.status === TODO);
const inprogressTasks = userTasks.filter((task) => task.status === INPROGRESS);
const completedTasks = userTasks.filter((task) => task.status === COMPLETED);

const mainAddTaskBtn = document.getElementById("main-btn");

const modal = document.getElementById("modal");
const modalBtn = document.getElementById("modal-add-btn");
const modalInput = document.getElementById("modal-input");
const modalSelect = document.getElementById("modal-select");

const toDoSection = document.getElementById("task-container");
const inProgressSection = document.getElementById("inprogress-section");
const completedSection = document.getElementById("completed-section");

const mainToDoContainer = document.getElementById("to-do-section");

function getBackgroundColor(task) {
  if (task.status === TODO) {
    return "#f1dada";
  } else if (task.status === INPROGRESS) {
    return "rgb(233, 243, 255)";
  } else {
    return "rgb(233, 243, 234)";
  }
}

function updateTasks(id, status) {
  debugger;
  const taskId = id.split("-")[1];
  userTasks.map((elt) => {
    if (elt.id == taskId) {
      elt.status = status;
    }
  });
}

function toggleTasksInput(e) {
  const isChecked = e.target.checked;
  const toggledTask = document.getElementById(e.target.getAttribute("id"));
  let newStatus;
  if (isChecked) {
    completedSection.appendChild(toggledTask);
    newStatus = "COMPLETED";
    toggledTask.style.background = "rgb(233, 243, 234)";
  } else {
    toDoSection.appendChild(toggledTask);
    toggledTask.style.background = "#f1dada";
    newStatus = "TODO";
  }
  updateTasks(e.target.getAttribute("id"), newStatus);
}

function dragStart(e) {
  draggableItem = e.target;
}

function dragEnter(e) {
  e.preventDefault();
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  const id = e.target.getAttribute("id");
  let newStatus;
  if (id === "task-container") {
    draggableItem.childNodes[0].checked = false;
    draggableItem.style.background = "#f1dada";
    newStatus = TODO;
  } else if (id === "inprogress-section") {
    draggableItem.childNodes[0].checked = false;
    draggableItem.style.background = "rgb(233, 243, 255)";
    newStatus = INPROGRESS;
  } else {
    draggableItem.childNodes[0].checked = true;
    draggableItem.style.background = "rgb(233, 243, 234)";
    newStatus = COMPLETED;
  }
  e.target.appendChild(draggableItem);

  const taskId = draggableItem.childNodes[0].getAttribute("id");
  updateTasks(taskId, newStatus);
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
  container.addEventListener("dragstart", dragStart);
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

  mainToDoContainer.addEventListener("dragenter", dragEnter);
  mainToDoContainer.addEventListener("dragover", dragOver);
  mainToDoContainer.addEventListener("drop", drop);

  inProgressSection.addEventListener("dragenter", dragEnter);
  inProgressSection.addEventListener("dragover", dragOver);
  inProgressSection.addEventListener("drop", drop);

  completedSection.addEventListener("dragenter", dragEnter);
  completedSection.addEventListener("dragover", dragOver);
  completedSection.addEventListener("drop", drop);
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

// storing in local storage just before tab is closed or refereshing the page
window.addEventListener("beforeunload", () =>
  localStorage.setItem("tasks", JSON.stringify(userTasks))
);
