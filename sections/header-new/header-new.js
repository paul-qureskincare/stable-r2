// New navigation (test page only, see pages/layouts/new-nav.hbs).
// The header is injected by assets/js/fileloader.js, so all listeners are delegated to document.
(function () {
    var DESKTOP_MIN_WIDTH = 992;
    var CLOSE_DELAY = 150;
    var closeTimer = null;

    var isDesktop = function () {
        return window.innerWidth >= DESKTOP_MIN_WIDTH;
    };

    var header = function () {
        return document.getElementById('header-new');
    };

    function closeAll() {
        var h = header();
        if (!h) return;
        h.querySelectorAll('.header-new__dropdown.is-open, .header-new__nav-link.is-open').forEach(function (el) {
            el.classList.remove('is-open');
        });
    }

    function open(link) {
        var h = header();
        var dropdown = h && h.querySelector('#' + link.getAttribute('data-target'));
        closeAll();
        if (!dropdown) return;
        link.classList.add('is-open');
        dropdown.classList.add('is-open');
    }

    function showPanel(category) {
        var dropdown = category.closest('.header-new__dropdown');
        var panel = dropdown && dropdown.querySelector('#' + category.getAttribute('data-panel'));
        if (!panel) return;
        dropdown.querySelectorAll('.header-new__category.is-active, .header-new__panel.is-active').forEach(function (el) {
            el.classList.remove('is-active');
        });
        category.classList.add('is-active');
        panel.classList.add('is-active');
    }

    // Hover: open on a menu item, keep open while the pointer is inside the header.
    document.addEventListener('mouseover', function (e) {
        if (!isDesktop() || !e.target.closest('#header-new')) return;
        clearTimeout(closeTimer);

        var link = e.target.closest('.header-new__nav-link');
        if (link && !link.classList.contains('is-open')) open(link);

        var category = e.target.closest('.header-new__category[data-panel]');
        if (category) showPanel(category);
    });

    document.addEventListener('mouseout', function (e) {
        if (!isDesktop() || !e.target.closest('#header-new')) return;
        if (e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('#header-new')) return;
        clearTimeout(closeTimer);
        closeTimer = setTimeout(closeAll, CLOSE_DELAY);
    });

    // Mobile menu (drawer).
    function setDrawer(isOpen) {
        var h = header();
        var drawer = h && h.querySelector('.header-new__drawer');
        if (!drawer) return;
        drawer.classList.toggle('is-open', isOpen);
        h.querySelector('.header-new__burger').setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.documentElement.classList.toggle('header-new-locked', isOpen);
    }

    // Toggles .is-open on the closest `group` of the clicked header button.
    function toggleGroup(button, group) {
        var isOpen = group.classList.toggle('is-open');
        button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    document.addEventListener('click', function (e) {
        if (e.target.closest('#header-new .header-new__burger')) {
            setDrawer(true);
            return;
        }
        if (e.target.closest('#header-new .header-new__drawer-close')) {
            setDrawer(false);
            return;
        }
        var accHead = e.target.closest('#header-new .header-new__acc-head');
        if (accHead) {
            toggleGroup(accHead, accHead.closest('.header-new__acc'));
            return;
        }
        var catHead = e.target.closest('#header-new button.header-new__mob-cat-head');
        if (catHead) toggleGroup(catHead, catHead.closest('.header-new__mob-cat'));
    });

    // Click / keyboard: toggle the menu item, switch categories.
    document.addEventListener('click', function (e) {
        var link = e.target.closest('#header-new .header-new__nav-link');
        if (link) {
            // With a mouse the item is already open from hover, so a click must not close it.
            var canHover = window.matchMedia('(hover: hover)').matches;
            if (link.classList.contains('is-open') && !canHover) closeAll();
            else open(link);
            return;
        }

        var category = e.target.closest('#header-new .header-new__category[data-panel]');
        if (category) {
            showPanel(category);
            return;
        }

        if (!e.target.closest('#header-new')) closeAll();
    });

    document.addEventListener('focusin', function (e) {
        var category = e.target.closest('#header-new .header-new__category[data-panel]');
        if (category) showPanel(category);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeAll();
            setDrawer(false);
        }
    });

    window.addEventListener('resize', function () {
        if (!isDesktop()) closeAll();
        else setDrawer(false);
    });
})();
