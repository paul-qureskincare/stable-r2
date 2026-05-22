(function () {
    const body = document.body;

    document.addEventListener("click", (e) => {
        const trigger = e.target.closest(".lvideo, [data-url*=\"youtube\"]");
        if (!trigger) return;

        e.preventDefault();
        const url = trigger.dataset.url;
        if (!url) return;

        const content = getVideoContent(url);
        if (!content) {
            alert("Unsupported video URL.");
            return;
        }

        const wrapper = document.createElement("div");
        wrapper.className = "lvideo-wrap";

        wrapper.innerHTML = `
            <span class="lvideo-overlay"></span>
            <div class="lvideo-container">${content}</div>
            <button class="lvideo-close">
                <i class="e-icon e-icon-cross"></i>
            </button>
        `;

        body.classList.add("lvideo-active");
        body.appendChild(wrapper);

        wrapper.addEventListener("click", (e) => {
            if (
                e.target.classList.contains("lvideo-overlay") ||
                e.target.closest(".lvideo-close")
            ) {
                closeModal(wrapper);
            }
        });
    });

    function closeModal(wrapper) {
        body.classList.remove("lvideo-active");
        wrapper.remove();
    }

    function getVideoContent(url) {
        const youtubeId = extractYouTubeId(url);
        if (youtubeId) {
            return `
                <iframe
                    src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                >
                </iframe>
            `;
        }

        const vimeoId = extractVimeoId(url);
        if (vimeoId) {
            return `
                <iframe
                    src="https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1"
                    allow="autoplay; fullscreen"
                    allowfullscreen
                >
                </iframe>
            `;
        }

        if (/\.(mp4|m4v)$/i.test(url)) {
            return `
                <video controls autoplay loop playsinline>
                <source src="${url}" type="video/mp4">
                </video>
            `;
        }

        return null;
    }

    function extractYouTubeId(url) {
        const match = url.match(
            /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&]+)/i
        );
        return match ? match[1] : null;
    }

    function extractVimeoId(url) {
        const match = url.match(/vimeo\.com\/(\d+)/);
        return match ? match[1] : null;
    }
})();
