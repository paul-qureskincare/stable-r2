(function () {
    const select = document.getElementById('select-competitor');
    const data = document.querySelectorAll('#compare-data [data-option]');

    function show(option) {
        data.forEach(block => {
            block.style.display = (block.dataset.option === option) ? '' : 'none';
        });
    }

    if (select) {
        select.addEventListener('change', (e) => show(e.target.value));
        show(select.value);
    }
})();