document.querySelectorAll(".header-slider-desktop .qure__swiper-wrapper img.img-fluid").forEach(img => {
    img.addEventListener("click", () => {
        if (img.closest(".slide-thumbnail")) return;

        // Find the closest link and navigate to its href on click
        const link = img.closest(".slide-image")?.querySelector("a[href]");
        if (link && link.getAttribute("href")) {
            window.location = link.getAttribute("href");
        }
    });
});