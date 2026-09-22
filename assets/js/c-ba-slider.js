(function () {
    document.querySelectorAll(".c-ba-slider").forEach((slider) => {
        const input = slider.querySelector('input[type="range"]');
        if (!input) return;

        const update = () => {
            slider.style.setProperty("--position", `${input.value}%`);
        };

        input.addEventListener("input", update);
        update();
    });
})();
