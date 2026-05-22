(() => {
    const block = document.querySelector('.skincare-lifestyle');
    if (!block) return;

    const buttons = [...block.querySelectorAll('ul button')];
    const items = [...block.querySelectorAll('ul li')];
    const pictures = block.querySelectorAll('picture');

    function setActive(index) {
        buttons.forEach(btn => btn.classList.remove('active'));
        pictures.forEach(pic => pic.classList.remove('show'));

        if (buttons[index]) buttons[index].classList.add('active');
        if (pictures[index]) pictures[index].classList.add('show');
    }

    // --- DESKTOP (click) ---
    block.addEventListener('click', function (e) {
        if (window.innerWidth < 768) return;

        const button = e.target.closest('button');
        if (!button) return;

        const index = buttons.indexOf(button);
        if (index !== -1) setActive(index);
    });

    // --- MOBILE (scroll) ---
    function handleScroll() {
        if (window.innerWidth >= 768) return;

        const middle = window.innerHeight / 2;

        items.forEach((item, index) => {
            const rect = item.getBoundingClientRect();

            if (rect.top <= middle && rect.bottom >= middle) {
                setActive(index);
            }
        });
    }

    function resetMobile() {
        if (window.innerWidth < 768) {
            buttons.forEach(btn => btn.classList.remove('active'));
        }
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', resetMobile);

    // init
    resetMobile();
    handleScroll();
})();
