(function () {
    const CHECKBOX_SELECTOR = 'input[name="subscription"]';

    // Swap the first-slide image of every swiper inside the checkbox's own
    // hero-product section, then rewind those swipers back to the first slide.
    function updateGallery(checkbox) {
        const hidden = checkbox
            .closest('.c-optional-subscription__option')
            ?.querySelector('input[name="unchecked-image"]');
        if (!hidden) return;

        const section = checkbox.closest('.hero-product');
        if (!section) return;

        section.querySelectorAll('.c-swiper').forEach((swiperEl) => {
            const img = swiperEl.querySelector('.swiper-slide img');
            if (!img) return;

            // Remember the original (checked) source once so it can be restored.
            if (!img.dataset.checkedImage) {
                img.dataset.checkedImage = img.getAttribute('src');
            }

            const next = checkbox.checked ? img.dataset.checkedImage : hidden.value;
            if (img.getAttribute('src') === next) return;

            img.src = next;
            // Rewind to the first slide once the image actually changed.
            if (swiperEl.swiper) swiperEl.swiper.slideTo(0);
        });
    }

    // Delegated listener so synchronization keeps working even if the second
    // subscription checkbox is added to the DOM after this script runs.
    document.addEventListener('change', (event) => {
        const source = event.target;
        if (!source.matches || !source.matches(CHECKBOX_SELECTOR)) return;

        const checked = source.checked;

        // Keep every subscription checkbox in sync, then refresh each gallery.
        document.querySelectorAll(CHECKBOX_SELECTOR).forEach((cb) => {
            cb.checked = checked;
            updateGallery(cb);
        });
    });
})();
