(() => {
    // Works only with the .comparison-table--equal-rows modifier.
    // Equalizes row heights between the label list and the lists inside Swiper slides
    document.querySelectorAll(".comparison-table--equal-rows .comparison-table__content").forEach((content) => {
        const labels = [...content.querySelectorAll(":scope > ul > li")];
        const lists = [...content.querySelectorAll("article ul")];
        if (!labels.length || !lists.length) return;

        const rows = labels.map((label, i) => [label, ...lists.map((ul) => ul.children[i]).filter(Boolean)]);
        let frame = 0;
        let key = "";

        const sync = (force) => {
            frame = 0;

            // Re-measure only when widths changed (our own height writes must not retrigger it)
            const nextKey = [content, ...lists].map((el) => el.clientWidth).join();
            if (!force && nextKey === key) return;
            key = nextKey;

            rows.forEach((row) => row.forEach((el) => (el.style.height = "")));
            const heights = rows.map((row) => Math.max(...row.map((el) => Math.ceil(el.getBoundingClientRect().height))));
            rows.forEach((row, i) => row.forEach((el) => (el.style.height = heights[i] + "px")));
        };

        const schedule = (force) => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => sync(force));
        };

        const observer = new ResizeObserver(() => schedule(false));
        observer.observe(content);
        content.querySelectorAll(".swiper-slide").forEach((slide) => observer.observe(slide));

        // Web fonts change text metrics without changing widths
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => schedule(true));
    });
})();
