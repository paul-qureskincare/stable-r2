(function () {
    window._wq = window._wq || [];

    _wq.push({
        id: "_all",
        onReady: function (video) {
            const container = video.container;

            if (!container) return;

            const playBtn = container.closest(".c-wistia-embed-video").querySelector(".wistia-custom-play");

            if (playBtn) {
                playBtn.addEventListener("click", function () {
                    video.play();
                });
            }
        }
    });

    // New script
    document.querySelectorAll("wistia-player").forEach(player => {
        const container = player.closest(".c-wistia");
        if (!container) return;

        if (player._wistiaBound) return;
        player._wistiaBound = true;

        player.addEventListener('pause', () => {
            container.classList.remove("c-wistia--is-playing");
        });

        player.addEventListener('end', () => {
            container.classList.remove("c-wistia--is-playing");
        });
    });


    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".c-wistia__play");
        if (!btn) return;

        const container = btn.closest(".c-wistia");
        if (!container) return;

        const player = container.querySelector("wistia-player");
        if (!player) return;

        player.play();

        container.classList.add("c-wistia--is-playing");
    });
})();
