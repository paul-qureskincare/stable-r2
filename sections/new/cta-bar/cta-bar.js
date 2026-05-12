(() => {
    const ctaBar = document.querySelector(".cta-bar");
    if (!ctaBar) return;

    // Show/Hide CTA BAR
    const formIds = ["purchase-form", "buy-form"];
    document.addEventListener("scroll", function () {
        const isAnyFormVisible = formIds.some(function (id) {
            const element = document.getElementById(id);
            if (!element) return false;
            const rect = element.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
        });

        if (window.scrollY > 300 && !isAnyFormVisible) {
            ctaBar.classList.add("show");
        } else {
            ctaBar.classList.remove("show");
        }
    });

    // Padding for bottom CTA Bar
    const set = () => document.body.style.setProperty("--sticky-cart", ctaBar.offsetHeight + "px");
    new ResizeObserver(set).observe(ctaBar);
    set();

    // CTA selector dropdown
    const selector = ctaBar.querySelector(".cta-bar__selector");
    if (!selector) return;

    const button = selector.querySelector("button");
    const radios = selector.querySelectorAll('input[type="radio"]');

    const updateButtonContent = (radio) => {
        const label = radio.closest("label");
        if (!label) return;

        const img = label.querySelector("img");
        const span = label.querySelector("span");
        const text = span ? span.textContent.trim() : label.textContent.trim();

        const content = [];

        if (img) {
            content.push(img.cloneNode(true));
        }

        const textNode = document.createElement("span");
        textNode.textContent = text;
        content.push(textNode);

        button.replaceChildren(...content);
    };

    button.addEventListener("click", (e) => {
        e.stopPropagation();
        selector.classList.toggle("show");
    });

    radios.forEach((radio) => {
        radio.addEventListener("change", () => {
            updateButtonContent(radio);
            selector.classList.remove("show");
        });
    });

    const checkedRadio = selector.querySelector('input[type="radio"]:checked');
    if (checkedRadio) {
        updateButtonContent(checkedRadio);
    }

    document.addEventListener("click", (e) => {
        if (!selector.contains(e.target)) {
            selector.classList.remove("show");
        }
    });
})();
