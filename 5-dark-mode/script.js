const localStorage = window.localStorage;
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

function changeImages(mode) {
  image1.src = `./img/undraw_proud_coder_${mode}.svg`;
  image2.src = `./img/undraw_feeling_proud_${mode}.svg`;
  image3.src = `./img/undraw_conceptual_idea_${mode}.svg`;
}

function darkMode() {
  nav.style.backgroundColor = 'rgba(0,0,0,50%)';
  textBox.style.backgroundColor = 'rgba(255, 255, 255, 50%)';
  toggleIcon.children[0].textContent = 'Dark Mode';
  toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
  changeImages('dark');
}

function lightMode() {
  nav.style.backgroundColor = 'rgba(255, 255, 255, 50%)';
  textBox.style.backgroundColor = 'rgba(0, 0, 0, 50%)';
  toggleIcon.children[0].textContent = 'Light Mode';
  toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
  changeImages(LIGHT_THEME);

}

function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute('data-theme', DARK_THEME); // data-theme is defined in styles.css
    localStorage.setItem('theme', DARK_THEME);
    darkMode();
  }
  else {
    document.documentElement.setAttribute('data-theme', LIGHT_THEME);
    localStorage.setItem('theme', LIGHT_THEME);
    lightMode();
  }
}

// Event Listener
toggleSwitch.addEventListener('change', switchTheme);

// checking local storage

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === DARK_THEME) {
    toggleSwitch.checked = true;
    darkMode();
  }
}

