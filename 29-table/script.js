let data = [];
let currentPage = 1;
let pageSize = 20;

const paginationContainer = document.getElementById("pagination");

const searchField = document.getElementById("search");

window.onload = function getData() {
  try {
    data = fetch("https://api.publicapis.org/entries")
      .then((response) => response.json())
      .then((res) => {
        data = res.entries;
        createTable(res.entries);
      });
  } catch (err) {
    alert("err from api");
  }
};

const createHeaders = (headerArr) => {
  const fragment = document.createDocumentFragment();
  headerArr.forEach((elt) => {
    const header = document.createElement("th");
    header.style.border = "1px solid #dddddd";
    header.style.padding = "8px";

    header.innerText = elt;
    fragment.appendChild(header);
  });
  return fragment;
};

const HEADERS = ["API", "Auth", "HTTPS", "Cors", "Category"];

const handlePagechange = (e) => {
  const id = e.target.getAttribute("page-index");
  currentPage = id;

  const arr = Array.from(document.querySelectorAll(".paginated-button"));
  arr.forEach((elt) => {
    elt.classList.remove("active");
    const id1 = elt.getAttribute("page-index");
    if (id == id1) {
      elt.classList.add("active");
    }
  });
  document
    .getElementById("table-container")
    .removeChild(document.getElementById("table"));
  createTable();
};

const createPagination = () => {
  const fragment = document.createDocumentFragment();
  const numOfPages = Math.ceil(data.length / pageSize);
  for (let i = 1; i <= numOfPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.setAttribute("page-index", i);
    button.setAttribute("class", "paginated-button");
    button.addEventListener("click", handlePagechange);
    fragment.append(button);
  }
  paginationContainer.appendChild(fragment);
};

const createTable = () => {
  const container = document.getElementById("table-container");
  const table = document.createElement("table");
  table.setAttribute("id", "table");
  const tableheaderRow = document.createElement("thead");
  const headers = createHeaders(HEADERS);
  tableheaderRow.appendChild(headers);
  table.appendChild(tableheaderRow);

  const fragment = document.createDocumentFragment();
  const min = (currentPage - 1) * pageSize;
  const max = currentPage * pageSize;

  const newData = data.slice(min + 1, max);
  newData.forEach((elt, index) => {
    const row = document.createElement("tr");
    row.setAttribute("row-num", index);
    HEADERS.forEach((header) => {
      const data = document.createElement("td");
      data.style.border = "1px solid #dddddd";
      data.style.padding = "8px";
      data.innerText = elt[header];
      row.append(data);
      fragment.append(row);
    });
  });
  table.append(fragment);
  container.append(table);

  createPagination();
};

let debounceTimer;

const suggestions = [
  "apple",
  "apple watch",
  "apple macbook",
  "apple macbook pro",
  "iphone",
  "iphone 12",
  "dogs",
  "best dogs",
];

const onSuggectionSelect = (selected) => {
  searchField.value = `${selected.innerText} `;
  const suggestionList = document.getElementById("suggestion-list");
  suggestionList.innerHTML = "";
  // showSuggestion(selected.innerText, selected);
};

const showSuggestion = (text, selected = "") => {
  const suggestionList = document.getElementById("suggestion-list");
  suggestionList.innerHTML = "";
  if (text && text.length) {
    const list = document.createElement("ul");
    list.setAttribute("id", "suggestions");
    const fragment = document.createDocumentFragment();

    const filteredSuggestions = suggestions.filter((elt) => {
      if (
        elt.trim().toLowerCase().includes(text.trim().toLowerCase()) &&
        elt !== selected
      ) {
        return elt;
      }
    });
    filteredSuggestions.forEach((elt) => {
      const item = document.createElement("li");
      item.innerText = elt;
      item.addEventListener("click", (e) => onSuggectionSelect(e.target));
      fragment.append(item);
    });
    list.append(fragment);
    suggestionList.append(list);
  }
};

const debounce = (callback, timer) => {
  let timerId = null;
  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      callback.apply(null, args);
    }, timer);
  };
};

searchField.addEventListener("change", (e) => {
  const fn = debounce(showSuggestion, 300);
  fn(e.target.value);
});
