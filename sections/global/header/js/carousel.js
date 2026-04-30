class SlideCarousel extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.init();
  }

  init() {
    this.QureSlideCarousel();
  }
    QureSlideCarousel() {
        var e = this.querySelector(".qure__swiper-carousel"),
            t = "true" === e.dataset.autoplay,
            n = "true" === e.dataset.loop,
            o = e.dataset.arrowCenterimage ? e.dataset.arrowCenterimage : 0,
            i = e.dataset.desktop ? e.dataset.desktop : 1,
            s = e.dataset.tablet ? e.dataset.tablet : 1,
            l = e.dataset.mobile ? e.dataset.mobile : 1,
            r = e.dataset.spacing ? e.dataset.spacing : 0;
        r = Number(r), new Swiper(e, {
            slidesPerView: l,
            spaceBetween: r >= 15 ? 15 : r,
            autoplay: t,
            loop: n,
            watchSlidesProgress: !0,
            watchSlidesVisibility: !0,
            navigation: {
                nextEl: e.querySelector(".swiper-button-next-item"),
                prevEl: e.querySelector(".swiper-button-prev-item")
            },
            pagination: {
                clickable: !0,
                el: e.querySelector(".swiper-pagination-item"),
                type: "progressbar"
            },
            breakpoints: {
                768: {
                    slidesPerView: s,
                    spaceBetween: r >= 30 ? 30 : r
                },
                1200: {
                    slidesPerView: i,
                    spaceBetween: r
                }
            }
        })
    }
}
customElements.define("slide-carousel", SlideCarousel);