const songImage = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressBarContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress');
const currentTimeElt = document.getElementById('current-time');
const durationTimeElt = document.getElementById('duration');
const shuffleBtn = document.getElementById('shuffle');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');
const shuffleText = document.getElementById('shuffle-text');

let currentSong = {};
let isShuffle = false;

const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill",
    artist: "Sachin"
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army",
    artist: "Ellentanio"
  },
  {
    name: "jacinto-3",
    displayName: "Dhup Chik Dhup Chik",
    artist: "Cabraiino"
  },
  {
    name: "metric-1",
    displayName: "Metric song",
    artist: "Al Paccino"
  }
];

const totalSongs = songs.length;

let isPlaying = false;

function playSongs() {
  music.play();
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  isPlaying = true;
}

function pauseSongs() {
  music.pause();
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  isPlaying = false;
}

function loadSong(song) {
  currentSong = song;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  songImage.src = `img/${song.name}.jpg`;
}

function selectRandomSong() {
  return (Math.floor(Math.random() * 4));
}

function playNextSong() {
  const currentSongIndex = songs.indexOf(currentSong);
  let nextSongIndex;
  if (!isShuffle) {
    nextSongIndex = (currentSongIndex + 1) % totalSongs;
  }
  else if (isShuffle) {
    nextSongIndex = selectRandomSong();
    if (nextSongIndex === currentSongIndex) {
      nextSongIndex = selectRandomSong()
    }
  }
  loadSong(songs[nextSongIndex]);
  playSongs();
}

function playPrevSong() {
  const currentSongIndex = songs.indexOf(currentSong);
  let prevSongIndex;
  if (!isShuffle) {
    if (currentSongIndex === 0) {
      prevSongIndex = songs.length - 1;
    }
    else {
      prevSongIndex = (Math.abs(currentSongIndex - 1)) % totalSongs;
    }
  }

  else if (isShuffle) {
    prevSongIndex = selectRandomSong();
    if (prevSongIndex === currentSongIndex) {
      prevSongIndex = selectRandomSong()
    }
  }
  loadSong(songs[prevSongIndex]);
  playSongs();
}

function updateSongDuration(event) {
  const { currentTime, duration } = event.srcElement;
  const progressBarWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressBarWidth}%`;
  const durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);
  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`
  }
  if (durationSeconds) {
    durationTimeElt.textContent = `${durationMinutes}:${durationSeconds}`;
  }
}

function trackCurrentTime(event) {
  const { currentTime, duration } = event.srcElement;
  const currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`
  }
  if (currentSeconds) {
    currentTimeElt.textContent = `${currentMinutes}:${currentSeconds}`;
  }
  if (currentTime === duration) {
    playNextSong();
  }
}

function updateProgressBar(event) {
  if (isPlaying) {
    updateSongDuration(event);
    trackCurrentTime(event)
  }
}

// to dynamically change the song timing on clicking on progres bar.
function setProgressBar(event) {
  // this refers to the element which is getting event so here the progress container and we need width of this.
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration; // dynamically setting the time of song.
}

function toggleShuffle() {
  if (!isShuffle) {
    isShuffle = true;
    shuffleBtn.style.color = 'crimson';
    shuffleText.textContent = 'Shuffle On'
    shuffleText.style.color = 'crimson';
  }
  else {
    isShuffle = false;
    shuffleBtn.style.color = 'rgb(129, 129, 129)';
    shuffleText.textContent = 'Shuffle Off';
    shuffleText.style.color = 'rgb(129, 129, 129)';
  }
}

playBtn.addEventListener('click', () => {
  isPlaying ? pauseSongs() : playSongs()
});

shuffleBtn.addEventListener('click', toggleShuffle);
nextBtn.addEventListener('click', playNextSong);
prevBtn.addEventListener('click', playPrevSong);
progressBarContainer.addEventListener('click', setProgressBar);
music.addEventListener('timeupdate', updateProgressBar);

loadSong(songs[0]);