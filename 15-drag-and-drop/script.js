const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");
// Item Lists
const listColumns = document.querySelectorAll(".drag-item-list");
const backlogList = document.getElementById("backlog-list");
const progressList = document.getElementById("progress-list");
const completeList = document.getElementById("complete-list");
const onHoldList = document.getElementById("on-hold-list");

// Items

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

let updatedOnLoad = false;

// Drag Functionality
let draggedItem;
let currentColumn;

let dragging = false;
// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem("backlogItems")) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ["Release the course", "Sit back and relax"];
    progressListArray = ["Work on projects", "Listen to music"];
    completeListArray = ["Being cool", "Getting stuff done"];
    onHoldListArray = ["Being uncool"];
  }
}

// Set localStorage Arrays
function updateSavedColumns() {
  listArrays = [
    backlogListArray,
    progressListArray,
    completeListArray,
    onHoldListArray,
  ];
  const arrayNames = ["backlog", "progress", "complete", "onHold"];
  arrayNames.map((arr, i) => {
    localStorage.setItem(`${arr}Items`, JSON.stringify(listArrays[i]));
  });
}

//when item starts dragging
function drag(event) {
  // event.target contans the item to be dragged.
  draggedItem = event.target;
  dragging = true;
}

// Allowing to drop into columns
function allowDrop(event) {
  event.preventDefault();
}

function addNewItem(columnNum) {
  const itemText = addItems[columnNum].textContent;
  if (itemText === "") {
    return;
  }
  const selectedArray = listArrays[columnNum];
  selectedArray.push(itemText);
  addItems[columnNum].textContent = "";
  updateDOM();
}

function showInputBox(columnNum) {
  addBtns[columnNum].style.visibility = "hidden";
  saveItemBtns[columnNum].style.display = "flex";
  addItemContainers[columnNum].style.display = "flex";
}

function hideInputBox(columnNum) {
  addBtns[columnNum].style.visibility = "visible";
  saveItemBtns[columnNum].style.display = "none";
  addItemContainers[columnNum].style.display = "none";
  addNewItem(columnNum);
}

// update arrays after dropping items
function updateColumns() {
  backlogListArray = [];
  backlogListArray = Array.from(backlogList.children).map((i) => i.textContent);

  progressListArray = [];
  progressListArray = Array.from(progressList.children).map(
    (i) => i.textContent
  );

  completeListArray = [];
  completeListArray = Array.from(completeList.children).map(
    (i) => i.textContent
  );

  onHoldListArray = [];
  onHoldListArray = Array.from(onHoldList.children).map((i) => i.textContent);

  updateDOM();
}

//Dropping item to column
function drop(event) {
  event.preventDefault();
  // remove padding and color from column adding in dragEnter function.
  listColumns.forEach((elt) => elt.classList.remove("over"));
  // add item to the column.
  const targetColumnToDrop = listColumns[currentColumn];
  targetColumnToDrop.appendChild(draggedItem);
  dragging = false;
  updateColumns();
}

// function when draggable elt enters in the target container to add
// adding styles to dropable and draggable elements.
function dragEnter(column) {
  listColumns[column].classList.add("over");
  currentColumn = column;
}

// update item or delete if necessary
function updateItem(index, column) {
  const selectedArray = listArrays[column];
  const selectedColumnEl = listColumns[column].children;
  if (!dragging) {
    if (!selectedColumnEl[index].textContent) {
      delete selectedArray[index];
    } else {
      selectedArray[index] = selectedColumnEl[index].textContent;
    }
    updateDOM();
  }
}

function filterArray(arr) {
  const filterredArray = arr.filter((item) => item !== null);
  return filterredArray;
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // List Item
  const listEl = document.createElement("li");
  listEl.classList.add("drag-item");
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute("ondragstart", "drag(event)");
  listEl.contentEditable = true;
  listEl.id = index;
  listEl.setAttribute("onfocusout", `updateItem(${index}, ${column})`);
  columnEl.appendChild(listEl);
}
// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }
  // Backlog Column
  backlogList.textContent = ""; // remove all list items in backlog list
  backlogListArray.forEach((backlogItem, index) => {
    createItemEl(backlogList, 0, backlogItem, index);
  });
  backlogListArray = filterArray(backlogListArray);

  // Progress Column
  progressList.textContent = "";
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressList, 1, progressItem, index);
  });

  progressListArray = filterArray(progressListArray);

  // Complete Column
  completeList.textContent = "";
  completeListArray.forEach((completeItem, index) => {
    createItemEl(completeList, 2, completeItem, index);
  });

  completeListArray = filterArray(completeListArray);

  // On Hold Column
  onHoldList.textContent = "";
  onHoldListArray.forEach((onHoldItem, index) => {
    createItemEl(onHoldList, 3, onHoldItem, index);
  });
  onHoldListArray = filterArray(onHoldListArray);

  // Run getSavedColumns only once, Update Local Storage
  updatedOnLoad = true;
  updateSavedColumns();
}

updateDOM();
