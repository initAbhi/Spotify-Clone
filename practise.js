// async function getSongs(){
//     let a = await fetch("http://127.0.0.1:5500/Songs/")
//     let response = await a.text();
//     console.log(response);
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a")
//     let  songs = [];
//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         if(element.href.endsWith(".mp3"))
//         songs.push(element.href);
// }
// return songs;
// }
// async function autoPlay(){
//     let songs = await getSongs();
//     let audio = new Audio(songs[0]);
//     audio.play();
// }
// autoPlay();

// function to print the songs
// async function printSongs(){
//     let songs = await getSongs();
//     console.log(songs)
//     let a = -1;
//     for (const song of songs) {
//         a++
//         let song = songs[a].replaceAll("%20", " ").split("Songs/")[1].replaceAll(".mp3","");
//         console.log(song)
//     }
// }
// printSongs();
// .replaceAll("%20", " ")
                  // .split("Songs/")[1]
                  // .replaceAll(".mp3", "")
                  // .replaceAll(`${currentFolder.replace("%20", " ")}/`, "")}</p>


// function to change song previos and next
// let prevNnxthandler = async () => {
//     let currentSongIndex = -1;
//     document.getElementById("previous").addEventListener("click", async () => {
//       let songs = await getSongs();
//       currentSong.src = songs[0];
//       let newIndex;
//       Array.from(songs).forEach((e, index) => {
//         // console.log(e,currentSong.src)
//         if (e.includes(currentSong.src)) {
//           currentSongIndex = index;
//           newIndex = currentSongIndex - 1;
  
//           const songName = document.querySelector(".song-name").innerHTML;
//           document.querySelector(".song-description").innerHTML = songName;
//         }
//       });
  
//       if (newIndex < songs.length) {
//         currentSong.src = songs[newIndex];
//       } else {
//         newIndex = newIndex - 1;
//         currentSong.src = songs[newIndex];
//       }
//       currentSong.play();
//     });
  
//     document.getElementById("next").addEventListener("click", async () => {
//       let songs = await getSongs();
  
//       Array.from(songs).forEach((e, index) => {
//         // console.log(e,currentSong.src)
//         if (e.includes(currentSong.src)) {
//           currentSongIndex = index;
//           console.log(index);
  
//           const songName = document.querySelector(".song-name").innerHTML;
//           document.querySelector(".song-description").innerHTML = songName;
//         }
//       });
  
//       newIndex = currentSongIndex + 1;
//       console.log(newIndex);
//       // console.log(songs)
  
//       if (newIndex <= songs.length - 1) currentSong.src = songs[newIndex];
//       else currentSong.src = songs[newIndex - 1];
//       currentSong.play();
//     });
//   };
  
  //Function so set default song ------
