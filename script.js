const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// music
const song = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Front Row (remix)",
    artist: "Jacinto Design",
  },
];

//  check if playing
let isPlaying = false;
// play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

//  play or pause event listner
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

//  update Dom
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// current song
let songIndex = 0;

// Next Song
function prevNextSong(isPrev) {
  isPrev ? songIndex-- : songIndex++;
  if (songIndex < 0) {
    songIndex = song.length - 1;
  } else if (songIndex > song.length - 1) {
    songIndex = 0;
  }
  loadSong(song[songIndex]);
  playSong();
}

function previousSong() {
  prevNextSong(true);
}

function nextSong() {
  prevNextSong(false);
}

// on - load song
loadSong(song[0]);

// update progress bar & time 
function updateProgressBar(e){
  if(isPlaying){
    const {duration,currentTime} = e.srcElement;
    // update progress bar
    const progressPercent = (currentTime/duration) * 100;
    progress.style.width=`${progressPercent}%`;
    // calculate display for duration 
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if(durationSeconds<10){
      durationSeconds = `0${durationSeconds}`;
    }
    if(durationSeconds&&durationMinutes){

      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // calculate display for current 
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if(currentSeconds<10){
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

  }
}

// set progress bar 
function setProgressBar(e){
const width = e.srcElement.clientWidth;
const clickX = e.offsetX;
const {duration} = music;
music.currentTime = ((clickX/width) * duration);
}
//  add event listner for next and prev
prevBtn.addEventListener("click", previousSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener('timeupdate',updateProgressBar);
music.addEventListener('ended',nextSong);
progressContainer.addEventListener("click",setProgressBar);