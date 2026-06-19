(function () {
    const section = document.querySelector(".expert-reviews");
    if (!section || section.dataset.videoSyncBound) return;

    const mainSlider = section.querySelector(".expert-reviews__content > .c-swiper:not(.c-swiper-thumbs)");
    const videoSlider = section.querySelector(".c-swiper.c-swiper-videos");
    if (!mainSlider || !videoSlider) return;

    const sync = function (mainSwiper, videoSwiper) {
        if (mainSwiper.destroyed || videoSwiper.destroyed) return;

        const index = mainSwiper.realIndex ?? mainSwiper.activeIndex;
        videoSwiper.params.loop ? videoSwiper.slideToLoop(index) : videoSwiper.slideTo(index);
    };

    const bind = function () {
        const mainSwiper = mainSlider.swiper;
        const videoSwiper = videoSlider.swiper;
        if (!mainSwiper || !videoSwiper) return false;

        section.dataset.videoSyncBound = "true";
        mainSwiper.on("slideChange", function () { sync(mainSwiper, videoSwiper); });
        sync(mainSwiper, videoSwiper);

        return true;
    };

    if (bind()) return;

    let attempts = 0;
    const interval = setInterval(function () {
        if (bind() || ++attempts > 50) clearInterval(interval);
    }, 100);
})();
