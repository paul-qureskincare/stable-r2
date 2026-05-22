(() => {
    document.addEventListener('click', function (e) {
        const button = e.target.closest('.skincare-routine__switcher button');
        if (!button) return;

        const section = button.closest('.skincare-routine');

        const buttons = [...section.querySelectorAll('.skincare-routine__switcher button')];
        const mediaItems = section.querySelectorAll('.skincare-routine__media-item');
        const infoItems = section.querySelectorAll('.skincare-routine__info-item');

        const index = buttons.indexOf(button);

        // active button
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // media
        mediaItems.forEach(el => el.classList.remove('show'));
        if (mediaItems[index]) {
            mediaItems[index].classList.add('show');
        }

        // info
        infoItems.forEach(el => el.classList.remove('show'));
        if (infoItems[index]) {
            infoItems[index].classList.add('show');
        }
    });
})();
