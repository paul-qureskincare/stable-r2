document.querySelectorAll(".variant_block").forEach(product => {
    const select = product.querySelector(".color-select");
    const img = product.querySelector(".productImage");

    select.addEventListener("change", function() {
        const variant = this.options[this.selectedIndex].getAttribute("variant");
        img.src = `sections/isolated/offer-bundle/images/${variant}.webp`;
    });
});