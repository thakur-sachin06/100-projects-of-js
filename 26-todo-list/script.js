let tasks = [
  {
    id: 1,
    title: "Complete Angular Course",
    isCompleted: false,
  },
  {
    id: 2,
    title: "Complete DSA Course",
    isCompleted: false,
  },
  {
    id: 3,
    title: "Complete 100-days-of-js",
    isCompleted: false,
  },
];

const inProgressSection = document.getElementById("inprogress-tasks");

function createTasksList() {
  const inprogressTasks = tasks.filter((task) => !task.isCompleted);
  const fragment = document.createDocumentFragment();
  inprogressTasks.forEach((task) => {
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    fragment.appendChild(input);
  });
  inProgressSection.appendChild(fragment);
}

createTasksList();
