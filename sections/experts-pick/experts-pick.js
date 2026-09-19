(function () {
    var items = document.querySelectorAll(".e-ingredient-info");
    if (!items.length) return;

    var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            animateIngredientInfo(entry.target);
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.3 });

    items.forEach(function (item) {
        observer.observe(item);
    });

    function animateIngredientInfo(item) {
        var target = parseFloat(item.dataset.percent) || 0;
        var counter = item.querySelector(".e-ingredient-info__counter");
        var duration = 1500;
        var start = null;

        item.classList.add("e-ingredient-info--in-view");

        function step(timestamp) {
            if (!start) start = timestamp;
            var progress = Math.min((timestamp - start) / duration, 1);
            if (counter) counter.textContent = Math.floor(progress * target) + "%";
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }
})();
