// Helmet Gallery
let helmetSwiper = null;
const SELECTOR = '#helmet-gallery';
const THUMB_SELECTOR = '#helmet-gallery-thumbs';
const BREAKPOINT = 767.9;
let resizeTimer = null;

function initSwiper() {
    if (typeof Swiper === 'undefined') return;
    const el = document.querySelector(SELECTOR);
    const thumbEl = document.querySelector(THUMB_SELECTOR);
    if (!el || !thumbEl) return;
    if (helmetSwiper) return;

    const thumbsSwiper = new Swiper(THUMB_SELECTOR, {
        slidesPerView: 6.05,
        spaceBetween: -20,
        slideToClickedSlide: true,
        watchSlidesProgress: true,
    });

    helmetSwiper = new Swiper(SELECTOR, {
        slidesPerView: 1.01,
        spaceBetween: -15,
        thumbs: {
            swiper: thumbsSwiper,
        },
        on: {
            slideChange() {
                if (!thumbsSwiper || typeof thumbsSwiper.slideTo !== 'function') return;
                const idx = this.activeIndex;
                const lastIndex = thumbsSwiper.slides.length - 1;
                thumbsSwiper.slideTo(Math.min(idx, lastIndex));
            }
        },
    });
}

function destroySwiper() {
    if (!helmetSwiper) return;
    if (typeof helmetSwiper.destroy === 'function') {
        try { helmetSwiper.destroy(true, true); } catch (e) { helmetSwiper.destroy(); }
    }
    helmetSwiper = null;
}

function checkBreakpoint() {
    const w = window.innerWidth;
    if (w > BREAKPOINT) {
        destroySwiper();
    } else {
        initSwiper();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkBreakpoint);
} else {
    checkBreakpoint();
}

window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(checkBreakpoint, 120);
});

window.hemletHome = {
    init: initSwiper,
    destroy: destroySwiper,
    check: checkBreakpoint
};