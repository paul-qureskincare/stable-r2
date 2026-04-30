var QureSettingsSwiper = {
    init: function() {
        this.QureSettingsCarousel()
    },
    QureSettingsCarousel: function() {
        document.querySelectorAll(".qure__swiper").forEach((e => {
            this.QureCarousel(e)
        }))
    },
    QureCarousel: function(e) {
        var t, n = "true" === e?.dataset.autoplay,
            o = "true" === e?.dataset.loop,
            i = e?.dataset.slideshow ? e?.dataset.slideshow : 0,
            s = e?.dataset.arrowCenterimage ? e?.dataset.arrowCenterimage : 0,
            l = e?.dataset.desktop ? e?.dataset.desktop : 4,
            r = e?.dataset.tablet ? e?.dataset.tablet : 2,
            a = e?.dataset.mobile ? e?.dataset.mobile : 1,
            c = e?.dataset.autoplaySpeed ? e?.dataset.autoplaySpeed : 3e3,
            d = e?.dataset.speed ? e?.dataset.speed : 400,
            u = e?.dataset.effect ? e?.dataset.effect : "slide",
            m = e?.dataset.sectionId,
            p = e?.dataset.row ? e?.dataset.row : 1,
            pd = e?.dataset.rowtablet ? e?.dataset.rowtablet : 1,
            pm = e?.dataset.rowmobile ? e?.dataset.rowmobile : 1,
            h = e?.dataset.spacing ? e?.dataset.spacing : 0,
            hm = e?.dataset.spacingmob ? e?.dataset.spacingmob : 0,
            g = "true" === e?.dataset.paginationFraction,
            f = "true" === e?.dataset.animationSrcoll,
            cs = "true" === e?.dataset.slidecenter,
            csm = "true" === e?.dataset.stylemode,
            v = window.innerWidth,
            b = "true" === e?.dataset.itemMobile,
            al = e?.dataset.arrowleft ? e?.dataset.arrowleft : "qure-swiper-button-prev", 
            ar = e?.dataset.arrowright ? e?.dataset.arrowright : "qure-swiper-button-next",
            pg = e?.dataset.pagination ? e?.dataset.pagination : "swiper-pagination"; 
            let rawHm = e?.dataset.spacingmob;
            let safeHm = Number(rawHm ?? 15);
            safeHm = safeHm >= 15 ? 15 : safeHm;
        h = Number(h), c = Number(c), d = Number(d), n && (n = {
            delay: c
        }),
         t = new Swiper("#qure__swiper-" + m, {
            slidesPerView: b ? "auto" : a,
            spaceBetween: safeHm,
            autoplay: n,
            loop: o,
            effect: u,
            speed: d,
            cssMode: csm,
            centeredSlides: cs,
            watchSlidesProgress: !0,
            watchSlidesVisibility: !0,
            
            grid: {
                rows: pm,
                fill: "row"
            },
            navigation: {
                
                nextEl: `.${ar}`,
                prevEl: `.${al}`
            },
            pagination: {
                clickable: !0,

                el: `.${pg}`,
                type: g ? "fraction" : "bullets"
            },
            breakpoints: {
                600: {
                    slidesPerView: r,
                    spaceBetween: h >= 30 ? 30 : h,
                    grid: {
                      rows: pd,
                  },
                },
                1200: {
                    slidesPerView: l,
                    spaceBetween: h,
                    centeredSlides: cs,
                    grid: {
                      rows: p,
                      fill: "row"
                  },
                }
            },
            on: {
                init: function() {
                    if (i && (v > 767 ? document.querySelectorAll(".slide-image").forEach((e => {
                            var t = e?.dataset.imgSlide;
                            e.innerHTML = `<img \n                      src=${t} \n                      alt="slide" \n                      srcset="${t} width=375 375w, ${t} width=550 550w, ${t} width=750 750w, ${t} width=1100 1100w, ${t} width=1500 1500w, ${t} width=1780 1780w, ${t} width=2000 2000w, ${t} width=3000 3000w, ${t} width=3840 3840w" \n                      sizes="100vw"\n                    >`
                        })) : document.querySelector(".slide-image-mobile") ? document.querySelectorAll(".slide-image-mobile").forEach((e => {
                            var t = e?.dataset.imgSlideMobile;
                            e.innerHTML = `<img \n                        src=${t} \n                        alt="slide mobile" \n                        srcset="${t} width=375 375w, ${t} width=550 550w, ${t} width=750 750w, ${t} width=1100 1100w, ${t} width=1500 1500w, ${t} width=1780 1780w, ${t} width=2000 2000w, ${t} width=3000 3000w, ${t} width=3840 3840w" \n                        sizes="100vw"\n                      >`
                        })) : document.querySelectorAll(".slide-image").forEach((e => {
                            var t = e?.dataset.imgSlide;
                            e.innerHTML = `<img \n                        src=${t} \n                        alt="slide" \n                        srcset="${t} width=375 375w, ${t} width=550 550w, ${t} width=750 750w, ${t} width=1100 1100w, ${t} width=1500 1500w, ${t} width=1780 1780w, ${t} width=2000 2000w, ${t} width=3000 3000w, ${t} width=3840 3840w" \n                        sizes="100vw"\n                      >`
                        })), window.addEventListener("resize", (function() {
                            window.innerWidth <= 767 ? document.querySelector(".slide-image-mobile") ? document.querySelectorAll(".slide-image-mobile").forEach((e => {
                                var t = e?.dataset.imgSlideMobile;
                                e.innerHTML = `<img \n                          src=${t} \n                          alt="slide mobile" \n                          srcset="${t} width=375 375w, ${t} width=550 550w, ${t} width=750 750w, ${t} width=1100 1100w, ${t} width=1500 1500w, ${t} width=1780 1780w, ${t} width=2000 2000w, ${t} width=3000 3000w, ${t} width=3840 3840w" \n                          sizes="100vw"\n                        >`
                            })) : document.querySelectorAll(".slide-image").forEach((e => {
                                var t = e?.dataset.imgSlide;
                                e.innerHTML = `<img \n                          src=${t} \n                          alt="slide" \n                          srcset="${t} width=375 375w, ${t} width=550 550w, ${t} width=750 750w, ${t} width=1100 1100w, ${t} width=1500 1500w, ${t} width=1780 1780w, ${t} width=2000 2000w, ${t} width=3000 3000w, ${t} width=3840 3840w" \n                          sizes="100vw"\n                        >`
                            })) : document.querySelectorAll(".slide-image").forEach((e => {
                                var t = e?.dataset.imgSlide;
                                e.innerHTML = `<img \n                        src=${t} \n                        alt="slide" \n                        srcset="${t} width=375 375w, ${t} width=550 550w, ${t} width=750 750w, ${t} width=1100 1100w, ${t} width=1500 1500w, ${t} width=1780 1780w, ${t} width=2000 2000w, ${t} width=3000 3000w, ${t} width=3840 3840w" \n                        sizes="100vw"\n                      >`
                            }))
                        })), f && initializeScrollZoomAnimationTrigger()), s) {
                        var e = document.getElementById("qure__swiper-" + m),
                            t = e.querySelectorAll(".qure__responsive-image");
                        if (0 != t.length) {
                            var n = [];
                            t.forEach((e => {
                                n.push(e.offsetHeight / 2)
                            }));
                            var o = "--arrows-offset-top: " + Math.max(...n) + "px";
                            e.querySelectorAll(".swiper-arrow") && e.querySelectorAll(".swiper-arrow").forEach((e => {
                                e.setAttribute("style", o)
                            }))
                        }
                    }
                }
            }
        }), i && t.on("slideChange", (function() {
            document.querySelectorAll(".video-slider").forEach((e => {
                var t = e.dataset.video,
                    n = e.dataset.poster;
                e.innerHTML = `\n <video playsinline="true" loop="loop" muted="muted" autoplay="autoplay" preload="metadata"\n poster="${n}">\n                <source\n                  src="${t}"\n                  type="video/mp4">\n              </video>\n              `
            }))
        }))
    }
};
QureSettingsSwiper.init();
