(() => {
    const track = document.getElementById("features-marquee-container");

    const applyMarqueeDuplication = () => {
        if (window.innerWidth < 768 && !track.dataset.duplicated) {
            track.innerHTML += track.innerHTML;
            track.dataset.duplicated = "true";
        }
    };

    applyMarqueeDuplication();
    window.addEventListener("resize", applyMarqueeDuplication);
})();
