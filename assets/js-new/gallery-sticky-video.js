(function () {
    // Gallery sticky video
    document.querySelectorAll('.gallery-sticky-video, .e-sticky-thumb-video').forEach(container => {
        const closeBtn = container.querySelector('.gallery-sticky-video__close, .e-sticky-thumb-video button');
        const video = container.querySelector('video');
        let isExpanded = false;
        let resizeRaf = null;

        if (video) {
            video.muted = true;
            const autoplay = () => {
                const p = video.play();
                if (p && typeof p.then === 'function') p.catch(() => {});
            };
            if (video.readyState >= 1) {
                autoplay();
            } else {
                video.addEventListener('loadedmetadata', autoplay, { once: true });
            }
        }

        const resetView = () => {
            isExpanded = false;
            container.classList.remove('expanded');
            if (video) {
                video.muted = true;
            }
        };

        container.addEventListener('click', (e) => {
            if (closeBtn && (e.target === closeBtn || closeBtn.contains(e.target))) return;
            isExpanded = !isExpanded;
            container.classList.toggle('expanded', isExpanded);
            if (video) {
                video.muted = !isExpanded;
                if (isExpanded) {
                    const p = video.play();
                    if (p && typeof p.then === 'function') p.catch(() => {});
                }
            }
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (video) video.pause();
                container.style.display = 'none';
            });
        }

        const onResize = () => {
            if (resizeRaf) cancelAnimationFrame(resizeRaf);
            resizeRaf = requestAnimationFrame(resetView);
        };

        window.addEventListener('resize', onResize);
        window.addEventListener('orientationchange', onResize);
    });
})();
