const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

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

//  add event listner for next and prev
prevBtn.addEventListener("click", previousSong);
nextBtn.addEventListener("click", nextSong);
