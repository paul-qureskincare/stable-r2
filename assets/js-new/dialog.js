(function () {
    document.addEventListener("click", (event) => {
        const dialog = event.target.closest("dialog");

        if (!dialog) return;

        const rect = dialog.getBoundingClientRect();

        const clickedOutside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;

        if (clickedOutside) dialog.close();
    });
})();
