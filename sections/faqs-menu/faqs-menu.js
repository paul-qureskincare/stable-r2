(function () {
    const toggleBtn = document.getElementById('dropdown-menu');
    if (!toggleBtn) return;

    const dropdown = toggleBtn.closest('.dropdown');
    const menu = dropdown ? dropdown.querySelector('.dropdown-menu') : null;
    if (!menu) return;

    if (window.innerWidth < 768) {
        menu.addEventListener('click', function (e) {
            const itemBtn = e.target.closest('button');
            if (!itemBtn || !menu.contains(itemBtn)) return;

            toggleBtn.innerHTML = itemBtn.innerHTML;

            if (window.bootstrap && bootstrap.Dropdown) {
                const dd = bootstrap.Dropdown.getOrCreateInstance(toggleBtn);
                dd.hide();
            }
        }, false);
    }
})();