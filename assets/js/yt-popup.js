// document.querySelectorAll(".lvideo").forEach((d) => d.addEventListener("click", playVideos));
// const body = document.body;

// function playVideos(e) {
//   lvideo(e.currentTarget.dataset.url);

//   body.classList.add("lvideo-active");
//   var lvideoWrap = document.createElement("DIV");
//   lvideoWrap.setAttribute("id", "lvideo-wrap");
//   document.body.appendChild(lvideoWrap);
//   const wrapper = document.getElementById("lvideo-wrap");
//   wrapper.classList.add("active");

//   const url = this.dataset.url;

//   const startModal = `<span onclick="lvideoClose();" class="lvideo-overlay"></span> <div class="lvideo-container">`;
//   const finishModal = `</div><button onclick="lvideoClose();" class="lvideo-close"><i class="fa-solid fa-xmark"></i></button>`;

//     if (url.indexOf("youtube") !== -1 || url.indexOf("youtu") !== -1) {
//     const ytUrl = [this.dataset.url];

//     var i,
//       r,
//       regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

//     for (i = 0; i < ytUrl.length; ++i) {
//       r = ytUrl[i].match(regExp);
//       document.getElementById(
//         "lvideo-wrap"
//       ).innerHTML = `${startModal}<iframe width="560" height="315" title="YouTube Video" src='https://www.youtube.com/embed/${r[1]}?rel=0&autoplay=1&mute=1&loop=1&playlist=${r[1]}' frameborder="0" allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>${finishModal}`;
//     }
//   } else if (url.indexOf("vimeo") !== -1) {

//     const vimeoURL = this.dataset.url;
//     const regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;

//     const match = vimeoURL.match(regExp);

//     if (match) {
//       document.getElementById(
//         "lvideo-wrap"
//       ).innerHTML = `${startModal}<iframe title="Vimeo" src="https://player.vimeo.com/video/${match[2]}?autoplay=1&loop=1" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>${finishModal}`;
//     } else {
//       alert("Not a Vimeo!  URL example:\n https://vimeo.com/120206922");
//     }
  
//   } else if (url.indexOf("mp4") !== -1 || url.indexOf("m4v") !== -1) {
    
//     document.getElementById(
//       "lvideo-wrap"
//     ).innerHTML = `${startModal}<video controls loop playsinline autoplay><source src='${this.dataset.url}' type="video/mp4"></video>${finishModal}`;
//   } else {
//     alert("No video link found.");
//   }
// }
// const lvideoClose = () => {
//   body.classList.remove("lvideo-active");

//   const wrapper = document.getElementById("lvideo-wrap");
//   wrapper.parentNode.removeChild(wrapper);
// };

// // LAUNCH
// function lvideo(){}


// Only define if not already defined
if (typeof window.VideoModal === "undefined") {
  class VideoModal {
    constructor(triggerSelector) {
      this.triggers = document.querySelectorAll(triggerSelector);
      this.body = document.body;
      this.init();
    }

    init() {
      this.triggers.forEach((trigger) => {
        trigger.addEventListener("click", (e) => this.playVideo(e));
      });
    }

    playVideo(e) {
      const url = e.currentTarget.dataset.url;
      const modalId = `lvideo-wrap-${Date.now()}`;
      this.body.classList.add("lvideo-active");

      const modalWrapper = document.createElement("div");
      modalWrapper.classList.add("lvideo-wrap");
      modalWrapper.setAttribute("id", modalId);
      this.body.appendChild(modalWrapper);

      const startModal = `<span class="lvideo-overlay"></span><div class="lvideo-container">`;
      const finishModal = `</div><button class="lvideo-close"><i class="fa-solid fa-xmark"></i></button>`;

      let videoContent = "";

      if (url.includes("youtube") || url.includes("youtu")) {
        const regExp = /^.*(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[1]) {
          const videoId = match[1];
          videoContent = `<iframe width="560" height="315" title="YouTube Video" src="https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&mute=1&loop=1&playlist=${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        }
      } else if (url.includes("vimeo")) {
        const regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
        const match = url.match(regExp);
        if (match) {
          videoContent = `<iframe title="Vimeo" src="https://player.vimeo.com/video/${match[2]}?autoplay=1&loop=1" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        }
      } else if (url.includes("mp4") || url.includes("m4v")) {
        videoContent = `<video controls loop playsinline autoplay><source src="${url}" type="video/mp4"></video>`;
      } else {
        alert("Unsupported video URL.");
        return;
      }

      modalWrapper.innerHTML = `${startModal}${videoContent}${finishModal}`;

      modalWrapper.querySelector(".lvideo-overlay").addEventListener("click", () => this.closeVideo(modalWrapper));
      modalWrapper.querySelector(".lvideo-close").addEventListener("click", () => this.closeVideo(modalWrapper));
    }

    closeVideo(wrapper) {
      this.body.classList.remove("lvideo-active");
      wrapper.remove();
    }
  }

  // Expose to global scope safely
  window.VideoModal = VideoModal;
}

// Then you can use this anywhere on the page, even multiple times:
new VideoModal(".lvideo");
