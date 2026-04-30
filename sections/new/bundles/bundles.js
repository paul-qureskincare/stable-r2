(() => {
    document.addEventListener('click', function (e) {
        const button = e.target.closest('.c-bundle-card__switcher-buttons button');
        if (!button) return;

        const dialog = button.closest('dialog');
        if (!dialog) return;

        const media = button.closest('.c-bundle-card__switcher');
        if (!media) return;

        const buttons = [...media.querySelectorAll('.c-bundle-card__switcher-buttons button')];
        const contents = media.querySelectorAll('.c-bundle-card__switcher-content');

        const index = buttons.indexOf(button);

        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        contents.forEach(el => el.classList.remove('show'));
        if (contents[index]) {
            contents[index].classList.add('show');
        }
    });

    document.addEventListener('change', function (e) {
        const select = e.target.closest('select[name="kit-item-options"]');
        if (!select) return;

        const li = select.closest('li');
        if (!li) return;

        const img = li.querySelector('img');
        if (!img) return;

        const selectedOption = select.options[select.selectedIndex];
        const newSrc = selectedOption.dataset.img;

        if (newSrc) {
            img.src = newSrc;
        }
    });
})();
