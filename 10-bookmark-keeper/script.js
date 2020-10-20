const localStorage = window.localStorage;

const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const addBookmarkButton = document.getElementById("title");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameElt = document.getElementById("website-name");
const websiteUrlElt = document.getElementById("website-url");
const bookmarkContainer = document.getElementById("bookmarks-container");
const closeModal = document.getElementById("close-modal-icon");

let websiteName = "";
let websiteURL = "";
let bookmarks = [];

function showModal() {
  modal.classList.add("show-modal");
  websiteNameElt.focus();
}

addBookmarkButton.addEventListener("click", showModal);
closeModal.addEventListener("click", () => {
  modal.classList.remove("show-modal");
  resetForm();
});

// closing modal by clicking ouside the modal.
// e.target contains the element on which click is made. if click is not on modal we are hiding the modal
window.addEventListener("click", (e) =>
  e.target === modal ? modal.classList.remove("show-modal") : false
);

function validateURL(nameValue, urlValue) {
  if (!name || !websiteURL) {
    alert("Please Provide all values");
    return false;
  }
  const exp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const regex = new RegExp(exp);
  if (!urlValue.match(regex)) {
    alert("Please provide a valid website address");
    return false;
  }
  return true;
}

function resetForm() {
  websiteNameElt.value = "";
  websiteUrlElt.value = "";
}

function storeBookmark(e) {
  e.preventDefault();
  name = websiteNameElt.value;
  websiteURL = websiteUrlElt.value;
  if (!websiteURL.includes("http://", "https://")) {
    websiteURL = `http://${websiteURL}`;
  }

  if (validateURL(name, websiteURL)) {
    let newBookmark = {};
    newBookmark.websiteName = name;
    newBookmark.websiteURL = websiteURL;
    bookmarks.push(newBookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    buildBookmark(newBookmark);
    resetForm();
  }
}

function deleteBookmark(url) {
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.websiteURL === url) {
      bookmarks.splice(i, 1);
      return;
    }
  });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarksFromLocalStorage();
}

function buildBookmark(bookmark) {
  const { websiteName, websiteURL } = bookmark;

  // creating bookmark element. for ref see html file

  const item = document.createElement("div");
  item.classList.add("item");
  const closeIcon = document.createElement("i");
  closeIcon.classList.add("fas", "fa-times", "delete-bookmark");
  closeIcon.setAttribute("title", "Delete Bookmark");
  closeIcon.setAttribute("onclick", `deleteBookmark('${websiteURL}')`);

  const linkInfo = document.createElement("div");
  linkInfo.classList.add("name");
  const favicon = document.createElement("img");
  favicon.setAttribute(
    "src",
    `https://s2.googleusercontent.com/s2/favicons?domain=${websiteURL}`
  );
  const link = document.createElement("a");
  link.setAttribute("href", websiteURL);
  link.setAttribute("target", "_blank");
  link.textContent = websiteName;

  linkInfo.append(favicon, link);
  item.append(closeIcon, linkInfo);
  bookmarkContainer.append(item);
}

function buildBookmarks() {
  // reset bookmark container each time we are builiding the bookmarks.
  bookmarkContainer.textContent = "";
  bookmarks.forEach((bookmark, i) => {
    const { websiteName, websiteURL } = bookmark;

    // creating bookmark element. for ref see html file

    const item = document.createElement("div");
    item.classList.add("item");
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times", "delete-bookmark");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark('${websiteURL}')`);

    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${websiteURL}`
    );
    const link = document.createElement("a");
    link.setAttribute("href", websiteURL);
    link.setAttribute("target", "_blank");
    link.textContent = websiteName;

    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarkContainer.append(item);
  });
}

function fetchBookmarksFromLocalStorage() {
  if (localStorage.getItem("bookmarks").length)
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  buildBookmarks();
}

bookmarkForm.addEventListener("submit", storeBookmark);

fetchBookmarksFromLocalStorage();
