(() => {
    const selects = document.querySelectorAll("select.synced-select");

    if (selects.length < 2) return;

    const visibleSelect = selects[0];
    const hiddenSelect  = selects[1];

    const hiddenParent = hiddenSelect.parentElement;

    function toggleSecondSelect() {
        if (visibleSelect.value === "product__Inquiry") {
            hiddenParent.style.display = "";
        } else {
            hiddenParent.style.display = "none";
        }
    }

    toggleSecondSelect();

    visibleSelect.addEventListener("change", toggleSecondSelect);
})();
