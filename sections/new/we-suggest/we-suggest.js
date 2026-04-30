(() => {
    document.addEventListener('click', function (e) {
        const button = e.target.closest('.c-suggest-card__media-switcher button');
        if (!button) return;

        const media = button.closest('.c-suggest-card__media');
        const buttons = [...media.querySelectorAll('.c-suggest-card__media-switcher button')];
        const contents = media.querySelectorAll('.c-suggest-card__media-content');

        const index = buttons.indexOf(button);

        // переключаем кнопки
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // переключаем контент
        contents.forEach(el => el.classList.remove('show'));
        if (contents[index]) {
            contents[index].classList.add('show');
        }
    });
})();
