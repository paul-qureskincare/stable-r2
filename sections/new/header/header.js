(() => {
    // HEADER DROPDOWNS
    const DESKTOP_MIN_WIDTH = 992;
    const isDesktop = () => window.innerWidth >= DESKTOP_MIN_WIDTH;
    const HOVER_CLASS = 'show-on-hover';

    let activePane = null;
    let activeMenuItem = null;

    function setActiveMenuItem(header, id) {
        if (activeMenuItem) activeMenuItem.classList.remove('active');
        const item = header.querySelector(`.header__menu [data-target="${id}"]`);
        if (item) item.classList.add('active');
        activeMenuItem = item || null;
    }

    function showPane(header, id) {
        const targetId = id && id[0] === '#' ? id.slice(1) : id;
        if (!targetId) return;
        const safeId = (window.CSS && CSS.escape) ? CSS.escape(targetId) : targetId;
        const pane = header.querySelector(`#${safeId}`);
        if (!pane) return;

        if (activePane && activePane !== pane) activePane.classList.remove(HOVER_CLASS);
        if (activePane !== pane) {
            pane.classList.add(HOVER_CLASS);
            activePane = pane;
            if (pane.id) setActiveMenuItem(header, pane.id);
        }
    }

    function hideAll() {
        if (!isDesktop()) return;
        if (activePane) activePane.classList.remove(HOVER_CLASS);
        activePane = null;
        if (activeMenuItem) activeMenuItem.classList.remove('active');
        activeMenuItem = null;
    }

    // Hover to show (desktop only)
    const HOVER_DELAY_MS = 400;
    const MENU_ITEM_SELECTOR = '#header [data-target]';
    let hoverTimer = null;
    let hoverEl = null;

    document.addEventListener('pointerover', (e) => {
        if (!isDesktop()) return;

        const el = e.target.closest(MENU_ITEM_SELECTOR);
        if (el === hoverEl) return;

        if (hoverTimer) {
            clearTimeout(hoverTimer);
            hoverTimer = null;
        }

        hoverEl = el || null;
        if (!hoverEl) return;

        const header = hoverEl.closest('#header');
        if (!header) return;

        hoverTimer = setTimeout(() => {
            if (hoverEl !== el) return;
            showPane(header, hoverEl.dataset.target || '');
            hoverTimer = null;
        }, HOVER_DELAY_MS);
    });

    // Hide when leaving header (desktop only) and cancel pending hover
    document.addEventListener('pointerout', (e) => {
        if (!isDesktop()) return;

        const header = e.target.closest('#header');
        if (!header) return;

        const to = e.relatedTarget;
        if (to && header.contains(to)) return;

        if (hoverTimer) {
            clearTimeout(hoverTimer);
            hoverTimer = null;
        }
        hoverEl = null;
        hideAll();
    });

    // Click to show (desktop), allow navigation on mobile
    document.addEventListener('click', (e) => {
        const el = e.target.closest('#header .header__menu [data-target]');
        if (!el) return;
        const header = el.closest('#header');
        if (!header) return;
        if (!isDesktop()) return; // let links work on mobile
        e.preventDefault();
        showPane(header, el.getAttribute('data-target') || '');
    });
    // HEADER DROPDOWNS END

    // MOBILE MENU TOGGLE
    const MOBILE_OPEN_CLASS = 'menu-show';

    // Delegate clicks; no init or observers needed
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('#hamburger');
        if (!btn) return;

        const open = document.body.classList.toggle(MOBILE_OPEN_CLASS);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close on resize
    window.addEventListener('resize', () => {
        if (!document.body.classList.contains(MOBILE_OPEN_CLASS)) return;
        document.body.classList.remove(MOBILE_OPEN_CLASS);
        const btn = document.getElementById('hamburger');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    });
    // MOBILE MENU TOGGLE

    // Show FLYOUT CART
    document.addEventListener('click', e => {
        const btn = e.target.closest('.show-flyout-cart');
        if (!btn) return;

        e.preventDefault();

        const scrollY = window.scrollY;
        document.body.style.top = `-${scrollY}px`;

        const cartPopup = document.getElementById('cartCanvas');
        if (!cartPopup || !window.bootstrap?.Offcanvas) return;

        // cartPopup.showModal();

        bootstrap.Offcanvas.getOrCreateInstance(cartPopup).show();
    });
    // Show FLYOUT CART

    // SCROLL HIDE HEADER
    let lastScrollY = window.scrollY || 0;
    const HIDING_CLASS = 'scroll-hiding';
    const SCROLL_DELTA_PX = 2;

    // #header can be injected dynamically; keep refs but re-resolve if detached
    let header = null;
    let announcementBar = null;
    let guideMenuSelect = null;

    let isHidden = false;
    let rafPending = false;
    let latestScrollY = lastScrollY;

    // Ensure transform transition exists on the base element so show/hide both animate.
    const ensureTransformTransition = (el) => {
        if (!el || el.dataset.scrollHideTransition) return;
        el.dataset.scrollHideTransition = '1';
        const t = (el.style.transition || '').trim();
        if (/\btransform\b/i.test(t)) return;
        el.style.transition = !t || t === 'none' ? 'transform 300ms linear' : `${t}, transform 300ms linear`;
    };

    const resolveHeaderEls = () => {
        if (!header || !header.isConnected) header = document.getElementById('header');
        if (!announcementBar || !announcementBar.isConnected) announcementBar = document.getElementById('announcement-bar');
        if (!guideMenuSelect || !guideMenuSelect.isConnected) guideMenuSelect = document.querySelector('.guide-menu__select');
        ensureTransformTransition(header);
        ensureTransformTransition(announcementBar);
        ensureTransformTransition(guideMenuSelect);
    };

    const applyHidden = (nextHidden) => {
        if (isHidden === nextHidden) return;
        isHidden = nextHidden;
        header?.classList.toggle(HIDING_CLASS, nextHidden);
        announcementBar?.classList.toggle(HIDING_CLASS, nextHidden);
        guideMenuSelect?.classList.toggle(HIDING_CLASS, nextHidden);
    };

    const updateOnScroll = () => {
        rafPending = false;
        resolveHeaderEls();
        const y = latestScrollY;
        if (!header && !announcementBar && !guideMenuSelect) return (lastScrollY = y);
        if (y <= 0) return applyHidden(false), (lastScrollY = 0);
        if (Math.abs(y - lastScrollY) < SCROLL_DELTA_PX) return;
        applyHidden(y > lastScrollY);
        lastScrollY = y;
    };

    window.addEventListener('scroll', () => {
        latestScrollY = window.scrollY || 0;
        if (rafPending) return;
        rafPending = true;
        requestAnimationFrame(updateOnScroll);
    }, { passive: true });
    // SCROLL HIDE HEADER


    /* // Padding fot bottom CTA panel. TODO: Move this script to new CTA panel script
    const el = document.querySelector('.qure__sticky-atc');
    if (el) {
        const set = () => document.body.style.setProperty('--sticky-cart', el.offsetHeight + 'px');
        new ResizeObserver(set).observe(el);
        set();
    } */
})();
