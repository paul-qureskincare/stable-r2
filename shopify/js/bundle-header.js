function scrollToProductHandle(productHandle) {
    if (productHandle && productHandle.trim() !== "") {
        const type = window.get_form_bundle_products_data[productHandle];

        if (type) {
            const el = document.querySelector('.bundle_heading[data-type="' + type + '"]');
            if (el) el.click();

            setTimeout(() => {
                const target = document.getElementById(productHandle);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
        }
    }
}

document.querySelectorAll(".bundle-header .swiper-wrapper img.img-fluid").forEach(img => {
    img.addEventListener("click", () => {
        if (img.closest(".slide-thumbnail")) return;
        const productHandle = img.dataset.productHandle;
        scrollToProductHandle(productHandle);
    });
});


let productHandle = null;

const params = new URLSearchParams(window.location.search);
if (params.has('productHandle')) {
    productHandle = params.get('productHandle');
}

if (!productHandle && window.location.hash.startsWith('#productHandle=')) {
    productHandle = window.location.hash.replace('#productHandle=', '');
}
else if (!productHandle && window.location.hash.length > 1) {
    productHandle = window.location.hash.substring(1);
}

if (productHandle) {
    setTimeout(() => {
        scrollToProductHandle(productHandle);
    }, 1500);
}