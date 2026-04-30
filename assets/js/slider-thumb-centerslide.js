// class CenterImageSlideThumbs extends HTMLElement {
//     constructor() {
//         super();
//         this.init();
//     }

//     init() {
//         this.querySelectorAll(".qure__center-wrapper").forEach((wrapper, index) => {
//             this.initGallerySlider(wrapper, index);
//         });
//     }

//     initGallerySlider(wrapper, index) {
//         const thumbsEl = wrapper.querySelector(".qure__center-gallery-thumbnails");
//         const mainEl = wrapper.querySelector(".qure__center-gallery");
//         const nextBtn = wrapper.querySelector(".swiper-next");
//         const prevBtn = wrapper.querySelector(".swiper-prev");

//         if (!thumbsEl || !mainEl) return;

//         const autoplay = thumbsEl.dataset.autoplay === "true";
//         const loop = thumbsEl.dataset.loop === "true";
//         const spacing = parseInt(thumbsEl.dataset.spacing || 0);
//         const paginationSelector = thumbsEl.dataset.pagination || ".swiper-pagination";
//         const useFraction = thumbsEl.dataset.paginationFraction === "true";
//         const desktop = thumbsEl.dataset.desktop || 4;
//         const tablet = thumbsEl.dataset.tablet || 2;
//         const mobile = thumbsEl.dataset.mobile || 1;
//         const centeredSlides = thumbsEl.dataset.centered === "true";
//         console.log(loop);
//         const thumbSwiper = new Swiper(thumbsEl, {
//             spaceBetween: spacing,
//   slidesPerView: mobile,
//   loop: loop, 
//   loopedSlides: parseInt(desktop),
//     centeredSlides: centeredSlides,
//   autoplay: autoplay,
//   watchSlidesProgress: true,
//   navigation: {
//     nextEl: nextBtn,
//     prevEl: prevBtn
//   },
//   breakpoints: {
//     768: {
//       slidesPerView: tablet,
//       spaceBetween: spacing >= 30 ? 30 : spacing
//     },
//     1200: {
//       slidesPerView: desktop,
//       spaceBetween: spacing
//     }
//   }
//         });

//         const mainSwiper = new Swiper(mainEl, {
//             loop: loop,
//             loopedSlides: 3,
//             speed: 600,
//             autoplay: autoplay,
//             navigation: {
//                 nextEl: nextBtn,
//                 prevEl: prevBtn
//             },
//             pagination: {
//                 el: paginationSelector,
//                 clickable: true,
//                 type: useFraction ? "fraction" : "bullets"
//             },
//             thumbs: {
//                 swiper: thumbSwiper
//             }
//         });
//     }
// }
// customElements.define('center-slide-thumbs', CenterImageSlideThumbs);



// var QureEventProductSlider = {
//     init: function () {
//         this.initAllSliders();
//     },

//     initAllSliders: function () {
//         document.querySelectorAll(".qure__center-wrapper").forEach((wrapper, index) => {
//             this.initGallerySlider(wrapper, index);
//         });
//     },

//     initGallerySlider: function (wrapper, index) {
//         const thumbsEl = wrapper.querySelector(".qure__center-gallery-thumbnails");
//         const mainEl = wrapper.querySelector(".qure__center-gallery");
//         const nextBtn = wrapper.querySelector(".swiper-next");
//         const prevBtn = wrapper.querySelector(".swiper-prev");

//         if (!thumbsEl || !mainEl) return;

//         const autoplay = thumbsEl.dataset.autoplay === "true";
//         const loop = thumbsEl.dataset.loop === "true";
//         const spacing = parseInt(thumbsEl.dataset.spacing || 0);
//         const paginationSelector = thumbsEl.dataset.pagination || ".swiper-pagination";
//         const useFraction = thumbsEl.dataset.paginationFraction === "true";
//         const desktop = thumbsEl.dataset.desktop || 4;
//         const tablet = thumbsEl.dataset.tablet || 2;
//         const mobile = thumbsEl.dataset.mobile || 1;
//         const centeredSlides = thumbsEl.dataset.centered === "true";
//         const thumbSwiper = new Swiper(thumbsEl, {
//             spaceBetween: spacing,
//   slidesPerView: mobile,
//   loop: loop,
//   loopedSlides: parseInt(desktop),
//   centeredSlides: centeredSlides,
//   autoplay: autoplay,
//   watchSlidesProgress: true,
//   navigation: {
//     nextEl: nextBtn,
//     prevEl: prevBtn
//   },
//   breakpoints: {
//     768: {
//       slidesPerView: tablet,
//       spaceBetween: spacing >= 30 ? 30 : spacing
//     },
//     1200: {
//       slidesPerView: desktop,
//       spaceBetween: spacing
//     }
//   }
//         });

//         const mainSwiper = new Swiper(mainEl, {
//             loop: loop,
//             loopedSlides: 3,
//             speed: 600,
//             autoplay: autoplay,
//             navigation: {
//                 nextEl: nextBtn,
//                 prevEl: prevBtn
//             },
//             pagination: {
//                 el: paginationSelector,
//                 clickable: true,
//                 type: useFraction ? "fraction" : "bullets"
//             },
//             thumbs: {
//                 swiper: thumbSwiper
//             }
//         });

//         mainSwiper.on("slideChange", () => {
//             thumbSwiper.slideToLoop(mainSwiper.realIndex, 300, false);
//         });

//         thumbSwiper.on("click", () => {
//             thumbSwiper.slideToLoop(thumbSwiper.clickedIndex, 300, false);
//         });

//         setTimeout(() => {
//             thumbSwiper.update();
//             mainSwiper.update();
//             thumbSwiper.slideToLoop(mainSwiper.realIndex, 0, false);
//         }, 100);
//     }
// };

// QureEventProductSlider.init();
document.querySelectorAll(".qure_app-imgs").forEach((el) => {
  const autoplay = el.dataset.autoplay === "true";
  const loop = el.dataset.loop === "true";
  const spacing = parseInt(el.dataset.spacing || 0);

  const paginationSelector = el.dataset.pagination || ".swiper-pagination";
  const useFraction = el.dataset.paginationFraction === "true";

  const centeredSlides = el.dataset.centered === "true";
  const thumbsSelector = el.dataset.thumbs || null;

  // ✅ Breakpoint settings from HTML
  const desktop = parseInt(el.dataset.desktop || 4);
  const tablet  = parseInt(el.dataset.tablet || 2);
  const mobile  = parseInt(el.dataset.mobile || 1);

  const navigationNext = el.dataset.navigationNext || ".swiper-button-next";
  const navigationPrev = el.dataset.navigationPrev || ".swiper-button-prev";

  const swiperConfig = {
    loop,
    centeredSlides,
    spaceBetween: spacing,
    slidesPerView: mobile, // default for mobile
    pagination: {
      el: paginationSelector,
      type: useFraction ? "fraction" : "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: navigationNext,
      prevEl: navigationPrev,
    },
    breakpoints: {
      768: {
        slidesPerView: tablet,
        spaceBetween: spacing >= 30 ? 30 : spacing,
      },
      1200: {
        slidesPerView: desktop,
        spaceBetween: spacing,
      },
    },
  };

  // ✅ Thumbs handling
  if (thumbsSelector) {
    const thumbsEl = document.querySelector(thumbsSelector);
    if (thumbsEl) {
      const thumbSwiper = new Swiper(thumbsEl, {
        slidesPerView: 1,
        freeMode: true,
        watchSlidesProgress: true,
      });
      swiperConfig.thumbs = { swiper: thumbSwiper };
    }
  }

  new Swiper(el, swiperConfig);
});

