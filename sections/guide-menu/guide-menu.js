(function () {
    const select = document.getElementById('guide-select');
    if (!select) return;
    document.body.classList.add('has-guide-select');

    // Optional: show the fixed select only once the page reaches the element from data-show-after
    // (e.g. the first guide section), so it does not cover the first screen.
    const selectBox = select.closest('.guide-menu__select');
    const showAfter = selectBox && selectBox.dataset.showAfter && document.querySelector(selectBox.dataset.showAfter);
    if (showAfter) {
        const toggleSelect = function () {
            // Fixed position without the .scroll-hiding shift
            const offset = parseFloat(getComputedStyle(selectBox).top) + selectBox.offsetHeight;
            selectBox.classList.toggle('is-visible', showAfter.getBoundingClientRect().top <= offset);
        };
        toggleSelect();
        window.addEventListener('scroll', toggleSelect, { passive: true });
        window.addEventListener('resize', toggleSelect);
    }

    select.addEventListener('change', function () {
        const value = (this.value || '').trim();
        if (!value) return;

        const target = document.getElementById(`${value}-tab`);
        if (!target) return;

        const hasAnnouncementBar = !!document.getElementById('announcement-bar');
        const scrollOffset = 115 + (hasAnnouncementBar ? 35 : 0);
        const top = target.getBoundingClientRect().top + window.pageYOffset - scrollOffset;
        window.scrollTo({ top, behavior: 'smooth' });

        setTimeout(() => {
            const btn = target.querySelector('.accordion-button');
            if (btn && btn.getAttribute('aria-expanded') !== 'true') {
                btn.click();
            }

            const selectedText = select.options[select.selectedIndex]?.textContent || '';
            const placeholderOption = select.querySelector('option[disabled]');
            if (placeholderOption && selectedText) {
                placeholderOption.textContent = selectedText;
            }

            // Reset select back to placeholder after scroll/action
            select.selectedIndex = 0;
            select.value = '';
        }, 200);
    });
})();
