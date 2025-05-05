//Utilities --------------------------------------------->
let currentFolder = "Ruok playlist";
let currentSong = new Audio(`public/Songs/${currentFolder}/Problems .mp3`);
document.addEventListener("click", () => {
  // currentSong.play();
});
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Functions to be used ----------------------------------------------------------->

//function to get songs from the folder
let getSongs = async () => {
  let a = await fetch(`/public/Songs/${currentFolder}`);
  // let a = await fetch(`http://127.0.0.1:5500/Songs/${currentFolder}`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    let element = as[index];
    if (element.href.endsWith(".mp3")) songs.push(element.href);
  }
  return songs;
};

//Function to update songs in Liibrary
async function updateSongsInLibrary() {
  let songlist = document.querySelector(".music-list");
  let songs = await getSongs();

  for (const song of songs) {
    songlist.innerHTML =
      songlist.innerHTML +
      `<div class="music">
              <img src="Resources/musical-notes.svg" alt="" />
              <div class="song-details">
                <p class="song-name">${song
                  .split("Songs/")[1]
                  .split("/")[1]
                  .replaceAll("%20", " ")
                  .replace(".mp3", "")}</p>
                  <p class="artist-name">Abhi</p>
              </div>
              <div class="music-list-button">
                <img src="Resources/play-sharp.svg" alt="" />
              </div>
            </div>`;
  }
}

//function to play song from the library -
function playSongFromLibrary() {
  Array.from(document.getElementsByClassName("music")).forEach((e) => {
    let button = e.querySelector(".music-list-button");
    button.addEventListener("click", () => {
      const songName = e.querySelector(".song-name").innerHTML;

      currentSong.src = `/public/Songs/${currentFolder}/` + songName + `.mp3`;
      currentSong.play();
      document.querySelector(".song-description").innerHTML = songName;
      document
        .querySelector(".play-button")
        .getElementsByTagName("img")[0].src = "Resources/pause-outline.svg";
    });
    // let currentSong = `/Songs/` + e.innerHTML + `.mp3`
  });
}

//function to update current song play time and song duration in music bar
function updateCurrentTimeNduration() {
  let currentTime = document.querySelector(".current-time");
  let songDuration = document.querySelector(".song-duration");

  currentSong.addEventListener("timeupdate", () => {
    currentTime.innerHTML =
      formatTime(currentSong.currentTime) + "&nbsp;&nbsp;/&nbsp; ";
  });

  currentSong.addEventListener("loadedmetadata", () => {
    songDuration.innerHTML = " &nbsp;" + formatTime(currentSong.duration);
  });
}

//function to toggle the play button
let togglePlay = () => {
  if (currentSong.paused) {
    currentSong.play();
    document.querySelector(".play-button").getElementsByTagName("img")[0].src =
      "Resources/pause-outline.svg";
  } else {
    currentSong.pause();
    document.querySelector(".play-button").getElementsByTagName("img")[0].src =
      "Resources/play.svg";
  }
};
function playButton() {
  let playButton = document.querySelector(".play-button");
  playButton.addEventListener("click", togglePlay);
}

//function to update the position of the circle on the playbar
function updateCirclePosition() {
  currentSong.addEventListener("timeupdate", () => {
    let circle = document.querySelector(".circle");
    circle.style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  let playbar = document.querySelector(".playbar");
  playbar.addEventListener("click", (e) => {
    let circle = document.querySelector(".circle");

    let currentPosition = (e.offsetX / playbar.offsetWidth) * 100 + "%";
    circle.style.left = currentPosition;
    // console.log((e.offsetX / playbar.offsetWidth) * 100);
    // console.log((e.offsetX / playbar.offsetWidth)*currentSong.duration)
    currentSong.currentTime =
      (e.offsetX / playbar.offsetWidth) * currentSong.duration;
  });
}
//Responsiveness - functions -------------------------------------------------------
let responsiveness = () => {
  let hamburger = document.querySelector("#hamburger");
  hamburger.addEventListener("click", () => {
    document.querySelector(".left").style.left = "0px";
  });

  let cross = document.querySelector("#cross");
  cross.addEventListener("click", () => {
    document.querySelector(".left").style.left = "-538px";
  });
};

//function to control Music Volume ------------------------------------------
let setVolume = () => {
  currentSong.volume = 0.5;
  document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowDown") {
      e.preventDefault();
      console.log("down", e);
      currentSong.volume = currentSong.volume - 0.1;
      document.querySelector(".volume-bar").value = currentSong.volume * 100;
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowUp") {
      e.preventDefault();
      console.log("up", e);

      currentSong.volume = currentSong.volume + 0.1;
      document.querySelector(".volume-bar").value = currentSong.volume * 100;
    }
  });
  let volumeBar = document.querySelector(".volume-bar");
  volumeBar.addEventListener("change", (e) => {
    currentSong.volume = e.target.value / 100;
    // console.log(e.target.value / 100);
  });
};

//function to load playlists ------------------------------------------
let loadPlaylists = async () => {
  let folders = await fetch("/public/Songs/");
  response = await folders.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = Array.from(div.getElementsByTagName("a"));
  let deisredas = [];
  as.forEach((e) => {
    // console.log(e.href)
    if (e.href.includes("/public/Songs/")) deisredas.push(e);
  });

  let contentArea = document.querySelector(".content-area");
  deisredas.forEach((e) => {
    contentArea.innerHTML =
      contentArea.innerHTML +
      `<div data-folder=${e.href} class="card pointer">
        <img  src="public/Songs/${e.href.split("Songs/")[1]}/cover.jpeg" alt="image" />
        <div class="card-button">
          <img src="Resources/play-sharp.svg" alt="" />
        </div>
        <h2 class="card-heading">${e.href
          .split("Songs/")[1]
          .replace("%20", " ")
          .replace("/", "")}</h2>
        <p class="card-description">
          Abhi
        </p>
      </div>`;
  });
};

// function to load songs from playlist -----------------------------
let loadPlaylistsSongs = async () => {
  let cards = document.getElementsByClassName("card");
  // console.log(cards)
  Array.from(cards).forEach((e) => {
    // console.log(e.dataset.folder.split("Songs/")[1])
    e.addEventListener("click", async () => {
      document.querySelector(".music-list").innerHTML = "";
      currentFolder = e.dataset.folder.split("Songs/")[1];
      // console.log(currentFolder)
      await updateSongsInLibrary();
      let songs = await getSongs();
      currentSong.src = songs[0];
      let songName = songs[0]
        .split("Songs/")[1]
        .split("/")[1]
        .replaceAll("%20", " ")
        .replace(".mp3", "");
      document.querySelector(".song-description").innerHTML = songName;
      currentSong.play();
      document
        .querySelector(".play-button")
        .getElementsByTagName("img")[0].src = "Resources/pause-outline.svg";
      console.log(currentSong.src);
      playSongFromLibrary();
    });
  });
};

// function to set default Song --------------------------------------------------
let setDefaultSong = async () => {
  let songs = await getSongs();
  currentSong.src = songs[0];
  let songName = songs[0]
    .split("Songs/")[1]
    .split("/")[1]
    .replaceAll("%20", " ")
    .replace(".mp3", "");
  document.querySelector(".song-description").innerHTML = songName;
};

// function to handle previous click
let handlePrevClick = async (e) => {
  let songs = await getSongs();
  let newIndex;
  let currentSongIndex = -1;

  Array.from(songs).forEach((e, index) => {
    // console.log(e,currentSong.src)
    if (e.includes(currentSong.src)) {
      currentSongIndex = index;
      newIndex = currentSongIndex - 1;
    }
  });
  if (newIndex > -1) {
    let songName = songs[newIndex]
      .split("Songs/")[1]
      .split("/")[1]
      .replaceAll("%20", " ")
      .replace(".mp3", "");
    document.querySelector(".song-description").innerHTML = songName;

    currentSong.src = songs[newIndex];
  } else {
    // console.log(
    //   songs[newIndex + 1]
    //     .split("Songs/")[1]
    //     .split("/")[1]
    //     .replaceAll("%20", " ")
    //     .replace(".mp3", "")
    // );
    currentSong.src = songs[newIndex + 1];
  }
  currentSong.play();
  document.querySelector(".play-button").getElementsByTagName("img")[0].src =
    "Resources/pause-outline.svg";
};
document.getElementById("previous").addEventListener("click", handlePrevClick);

// function to handle next click ---------------------------
let handleNxtClick = async (e) => {
  let songs = await getSongs();
  let newIndex;
  let currentSongIndex = -1;

  Array.from(songs).forEach((e, index) => {
    // console.log(e,currentSong.src)
    if (e.includes(currentSong.src)) {
      currentSongIndex = index;
      if (index < songs.length - 1) newIndex = currentSongIndex + 1;
      else newIndex = currentSongIndex;
      console.log(newIndex);
    }
  });
  if (newIndex <= songs.length) {
    let songName = songs[newIndex]
      .split("Songs/")[1]
      .split("/")[1]
      .replaceAll("%20", " ")
      .replace(".mp3", "");
    document.querySelector(".song-description").innerHTML = songName;

    currentSong.src = songs[newIndex];
  } else {
    currentSong.src = songs[newIndex - 1];
  }
  currentSong.play();
  document.querySelector(".play-button").getElementsByTagName("img")[0].src =
    "Resources/pause-outline.svg";
};
document.getElementById("next").addEventListener("click", handleNxtClick);

// function to toggle play and pause using spacebar
let spacebarToggle = () => {
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault(); // Prevent the page from scrolling when Spacebar is pressed
      togglePlay();
      console.log("sc");
      // Add your logic here
    }
  });
};

let AutoPlay = async (e) => {
  let songs = await getSongs();
  let newIndex;
  let currentSongIndex = -1;

  currentSong.addEventListener("ended", (e) => {
    Array.from(songs).forEach((e, index) => {
      // console.log(e,currentSong.src)
      if (e.includes(currentSong.src)) {
        // if (index < songs.length - 1) newIndex = currentSongIndex + 1;
        // else newIndex = currentSongIndex;
        // console.log(newIndex);
      }
    });
    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
      currentSongIndex = 0; // Loop back to the first song (optional)
    }
    console.log(songs[currentSongIndex + 1]);

    currentSong.src = songs[currentSongIndex];
    let songName = songs[currentSongIndex]
      .split("Songs/")[1]
      .split("/")[1]
      .replaceAll("%20", " ")
      .replace(".mp3", "");
    currentSong.play();
    document.querySelector(".song-description").innerHTML = songName; // to update song in playbar
  });
};
// Main function to execute all functions --------------------------------------------------------->
async function main() {
  await updateSongsInLibrary();
  playSongFromLibrary();
  updateCurrentTimeNduration();
  playButton();
  updateCirclePosition();
  responsiveness();
  setVolume();
  await loadPlaylists();
  await loadPlaylistsSongs();
  await setDefaultSong();
  spacebarToggle();
  AutoPlay();
  // prevNnxthandler();
}
main();

//prevent right click
document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});
