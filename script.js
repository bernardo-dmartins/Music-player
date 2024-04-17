const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'goodnight.mp3',
        displayName: 'Good Night',
        cover: 'img2.jpg',
        artist: 'FASSounds',
    },
    {
        path: 'tvari-tokyo-cafe.mp3',
        displayName: 'Tokyo-cafe',
        cover: 'img3.jpg',
        artist: 'TVARI',
    },
    {
        path: 'lofichill.mp3',
        displayName: 'LoFi Chill',
        cover: 'img1.jpg',
        artist: 'BoDleasons',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

const formatTime = (time) => {
  if (isNaN(time)) {
    return "0:00";
  }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

function updateProgress() {
    const currentTime = music.currentTime;
    const duration = music.duration;
    if (!isNaN(duration)) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(currentTime);
        durationEl.textContent = formatTime(duration);
    } else {
      setTimeout(() => {
        updateProgress();
      }, 100);  
    } 
}



music.addEventListener('timeupdate', updateProgress);

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    const duration = music.duration;
    music.currentTime = (clickX / width) * duration;
    durationEl.textContent = formatTime(duration);
}

let isDragging = false;

playerProgress.addEventListener('mousedown', (e) => {
    isDragging = true;
    setProgressBar(e);
});

playerProgress.addEventListener('mousemove', (e) => {
    if (isDragging) {
        setProgressBar(e);
    }
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));

loadMusic(songs[musicIndex]);
