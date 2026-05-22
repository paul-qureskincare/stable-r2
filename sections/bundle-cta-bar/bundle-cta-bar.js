(() => {
    const bundleCtaBar = document.querySelector(".bundle-cta-bar");
    if (!bundleCtaBar) return;

    // Show/Hide CTA BAR
    document.addEventListener("scroll", function () {
        const treatmentElement = document.getElementById("purchase-form");
        let isTreatmentVisible = false;

        if (treatmentElement) {
            const rect = treatmentElement.getBoundingClientRect();
            isTreatmentVisible = rect.top < window.innerHeight && rect.bottom > 0;
        }

        if (window.scrollY > 300 && !isTreatmentVisible) {
            bundleCtaBar.classList.add("show");
        } else {
            bundleCtaBar.classList.remove("show");
        }
    });

    // Padding for bottom Bundle CTA Bar
    const set = () => document.body.style.setProperty("--sticky-cart", bundleCtaBar.offsetHeight + "px");
    new ResizeObserver(set).observe(bundleCtaBar);
    set();
})();
