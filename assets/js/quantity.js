(function () {
    document.querySelectorAll("[data-e-quantity]").forEach(function (counter) {
        var input = counter.querySelector('input[name="qty"]');
        if (!input) return;

        var form = counter.closest("form");
        var hiddenQty = form ? form.querySelector('input[name="quantity"]') : null;
        var decBtn = counter.querySelector('[data-e-quantity-action="decrement"]');
        var incBtn = counter.querySelector('[data-e-quantity-action="increment"]');

        function getValue() {
            var v = parseInt(input.value, 10);
            return Number.isFinite(v) && v > 0 ? v : 1;
        }

        function setValue(v) {
            v = Math.max(1, parseInt(v, 10) || 1);
            input.value = String(v);
            if (hiddenQty) hiddenQty.value = String(v);
            if (decBtn) decBtn.disabled = v <= 1;
        }

        // init
        setValue(getValue());

        counter.addEventListener("click", function (e) {
            var btn = e.target.closest("button");
            if (!btn) return;
            if (btn === decBtn) setValue(getValue() - 1);
            if (btn === incBtn) setValue(getValue() + 1);
        });
    });
})();
