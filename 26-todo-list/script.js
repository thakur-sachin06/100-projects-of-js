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

const todoTasks = tasks.filter((task) => task.status === "TODO");
const inprogressTasks = tasks.filter((task) => task.status === "INPROGRESS");
const completedTasks = tasks.filter((task) => task.status === "COMPLETED");

const toDoSection = document.getElementById("to-do-section");
const inProgressSection = document.getElementById("inprogress-section");
const completedSection = document.getElementById("completed-section");

function toggleTasksInput(e) {
  const isChecked = e.target.checked;
  const toggledTask = document.getElementById(e.target.getAttribute("id"));
  if (isChecked) {
    completedSection.appendChild(toggledTask);
  } else {
    toDoSection.appendChild(toggledTask);
  }
}

function createTasksList(tasks, section) {
  const fragment = document.createDocumentFragment();
  tasks.forEach((task) => {
    const container = document.createElement("div");
    container.setAttribute("id", `task-${task.id}`);
    container.classList.add("tasks");
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", `task-${task.id}`);
    input.setAttribute("value", task.title);
    input.setAttribute("id", `task-${task.id}`);
    if (task.status === "COMPLETED") {
      input.checked = true;
    }
    const label = document.createElement("label");
    label.setAttribute("for", `task-${task.id}`);
    label.innerText = task.title;
    label.style.marginLeft = "10px";
    container.appendChild(input);
    container.appendChild(label);
    fragment.appendChild(container);
  });
  section.appendChild(fragment);
}

toDoSection.addEventListener("change", toggleTasksInput);
inProgressSection.addEventListener("change", toggleTasksInput);
completedSection.addEventListener("change", toggleTasksInput);

createTasksList(todoTasks, toDoSection);
createTasksList(inprogressTasks, inProgressSection);
createTasksList(completedTasks, completedSection);
