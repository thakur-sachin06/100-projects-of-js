const stars = Array.from(document.getElementsByClassName("star"));

const mainContainer = document.getElementById("main-container");

let ratings = 0;

const handleMouseEnter = (e) => {
  const id = e.target.getAttribute("data-id");
  for (let i = 0; i < 5; i++) {
    if (i < id) {
      stars[i].style.background = "gold";
    } else {
      stars[i].style.background = "white";
    }
  }
};

const handleMouseLeave = (e) => {
  const id = e.target.getAttribute("data-id");
  for (let i = 0; i < 5; i++) {
    if (i < ratings) {
      stars[i].style.background = "gold";
    } else {
      stars[i].style.background = "white";
    }
  }
};

const handleMouseClick = (e) => {
  const id = e.target.getAttribute("data-id");
  for (let i = 0; i < 5; i++) {
    if (i < id) {
      stars[i].style.background = "gold";
    } else {
      stars[i].style.background = "white";
    }
  }
  ratings = id;
};

stars.forEach((star) => {
  star.addEventListener("mouseenter", handleMouseEnter);
  star.addEventListener("mouseleave", handleMouseLeave);
});

mainContainer.addEventListener("click", handleMouseClick);
