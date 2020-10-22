const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTimeElt = document.querySelector(".time-elapsed");
const videoDuration = document.querySelector(".time-duration");
const fullScreenBtn = document.querySelector(".fullscreen");
const speed = document.getElementById("player-speed");
const player = document.querySelector(".player");

let lastVolume = 1;

// Play & Pause ----------------------------------- //

const showPlayBtn = () => {
  playBtn.classList.replace("fa-pause", "fa-play");
};

const togglePlay = () => {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
  } else {
    video.pause();
    showPlayBtn();
  }
};

// Progress Bar ---------------------------------- //

//calculate display time
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

function updateProgress() {
  const { duration, currentTime } = video;
  progressBar.style.width = `${(currentTime / duration) * 100}%`;
  currentTimeElt.textContent = `${displayTime(currentTime)} /`;
  videoDuration.textContent = displayTime(duration);
}

function setProgress(e) {
  // e.offset is pixel value where we have clicked w.r.t parent.
  // progressRange.offsetWidth width of actual rabge container.
  // newTime will be between 0 and 1. So we want to get %.
  const newTime = e.offsetX / progressRange.offsetWidth; // total width and e.offsetX is where we have clicked on progress bar
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration; // setting the video time when progress bar is clicked.
}

function toggleFullScreenMode() {
  video.style.width = "100%";
}

function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  volumeIcon.className = ""; // removing all icons to set volume icons based on volume level
  if (volume > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (volume === 0) {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }
  lastVolume = volume;
}

function toggleMute() {
  // removing class name
  volumeIcon.className = "";
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add("fas", "fa-volume-mute");
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.classList.add("fas", "fa-volume-up");
  }
}

function changeSpeed() {
  video.playbackRate = speed.value; // spee is a select and whatever elt we will select with speed.value we will get the selected value
}

let isFullscreen = false;

function toggleFullScreen() {
  if (!isFullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  isFullscreen = !isFullscreen;
}

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
  video.classList.add("video-fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
  video.classList.remove("video-fullscreen");
}

playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);

// if video ended show play button again
video.addEventListener("ended", showPlayBtn);
video.addEventListener("timeupdate", updateProgress); // timeupdate is an event which will fires whenever video time is changed
video.addEventListener("canPlay", updateProgress);

progressRange.addEventListener("click", setProgress);
fullScreenBtn.addEventListener("click", toggleFullScreenMode);

volumeRange.addEventListener("click", changeVolume);

volumeIcon.addEventListener("click", toggleMute);

speed.addEventListener("change", changeSpeed);

fullScreenBtn.addEventListener("click", toggleFullScreen);
