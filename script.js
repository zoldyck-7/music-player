const tracks = [
    { 
        name: 'Stay High', 
        src: "songs/stayhigh.mp3",
        artist: 'Juice WRLD'
    },
    { 
        name: 'Someday', 
        src: "songs/someday.mp3",
        artist: 'OneRepublic'
    }
];

const audio = new Audio();
let currentTrackIndex = 0;


const trackName = document.getElementById('track-name');
const playPauseBtn = document.getElementById('play-pause-btn');
const stopBtn = document.getElementById('stop-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');
const volumeControl = document.getElementById('volume-control');
const songList = document.getElementById('song-list');


function populateSongList() {
    songList.innerHTML = ''; 
    tracks.forEach((track, index) => {
        const songItem = document.createElement('div');
        songItem.classList.add('song-item');
        songItem.textContent = `${track.name} - ${track.artist}`;
        songItem.addEventListener('click', () => {
            loadTrack(index);
            audio.play();
            updatePlayPauseButton(true);
        });
        songList.appendChild(songItem);
    });
}


function updatePlayPauseButton(isPlaying) {
    const icon = playPauseBtn.querySelector('i');
    icon.classList.remove('fa-play', 'fa-pause');
    icon.classList.add(isPlaying ? 'fa-pause' : 'fa-play');
}


function loadTrack(index) {
    audio.src = tracks[index].src;
    trackName.textContent = `${tracks[index].name} - ${tracks[index].artist}`;
    currentTrackIndex = index;
}


function playPause() {
    if (audio.paused) {
        audio.play();
        updatePlayPauseButton(true);
    } else {
        audio.pause();
        updatePlayPauseButton(false);
    }
}


function stop() {
    audio.pause();
    audio.currentTime = 0;
    updatePlayPauseButton(false);
}


function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    updatePlayPauseButton(true);
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    updatePlayPauseButton(true);
}

audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
});

progressBar.addEventListener('click', (e) => {
    const progressWidth = progressBar.clientWidth;
    const clickPosition = e.offsetX;
    const percentage = clickPosition / progressWidth;
    audio.currentTime = percentage * audio.duration;
});

volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

playPauseBtn.addEventListener('click', playPause);
stopBtn.addEventListener('click', stop);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

audio.addEventListener('ended', nextTrack);

function addSong(name, src, artist = 'Unknown Artist') {
    tracks.push({ name, src, artist });
    populateSongList();
}

populateSongList();
loadTrack(0);