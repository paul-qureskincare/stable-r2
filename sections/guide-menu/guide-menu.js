(function () {
    const select = document.getElementById('guide-select');
    if (!select) return;
    document.body.classList.add('has-guide-select');

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
