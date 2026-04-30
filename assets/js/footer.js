// Slide Toggle
const slideAnime = (() => {
  let e = !1;
  return (t) => {
    const n = Object.assign(
        {},
        {
          target: !1,
          animeType: "slideToggle",
          duration: 400,
          easing: "ease",
          isDisplayStyle: "block",
        },
        t
      ),
      o = n.target;
    if (!o) return;
    if (e) return;
    e = !0;
    let i = n.animeType;
    const s = getComputedStyle(o);
    if (
      ("slideToggle" === i &&
        (i = "none" === s.display ? "slideDown" : "slideUp"),
      ("slideUp" === i && "none" === s.display) ||
        ("slideDown" === i && "none" !== s.display) ||
        ("slideUp" !== i && "slideDown" !== i))
    )
      return (e = !1), !1;
    o.style.overflow = "hidden";
    const l = n.duration,
      r = n.easing,
      a = n.isDisplayStyle;
    "slideDown" === i && (o.style.display = a);
    const c = {
      height: o.getBoundingClientRect().height + "px",
      marginTop: s.marginTop,
      marginBottom: s.marginBottom,
      paddingTop: s.paddingTop,
      paddingBottom: s.paddingBottom,
    };
    if (
      (Object.keys(c).forEach((e) => {
        0 === parseFloat(c[e]) && delete c[e];
      }),
      0 === Object.keys(c).length)
    )
      return (e = !1), !1;
    let d;
    "slideDown" === i
      ? (Object.keys(c).forEach((e) => {
          o.style[e] = 0;
        }),
        (d = o.animate(c, {
          duration: l,
          easing: r,
        })))
      : "slideUp" === i &&
        (Object.keys(c).forEach((e) => {
          (o.style[e] = c[e]), (c[e] = 0);
        }),
        (d = o.animate(c, {
          duration: l,
          easing: r,
        }))),
      d.finished.then(() => {
        (o.style.overflow = ""),
          Object.keys(c).forEach((e) => {
            o.style[e] = "";
          }),
          "slideUp" === i && (o.style.display = "none"),
          (e = !1);
      });
  };
})();

// Slide Toggle
var QureEvents = {
    init: function() {
        this.setupEventListeners();

    },
    setupEventListeners: function() {
        document.querySelectorAll(".qure__footer-title").forEach((e => {
            e.addEventListener("click", (e => {
                const t = e.currentTarget,
                    n = t.parentElement.querySelector(".qure__footer-content");
                slideAnime({
                    target: n,
                    animeType: "slideToggle"
                });
                const o = t.closest(".qure__footer_block");
                o.classList.contains("active") ? o.classList.remove("active") : o.classList.add("active")
            }))
        }));
    }
};

const observer = new MutationObserver(() => {
  if (document.querySelector(".qure__footer-title")) {
    QureEvents.init();
    observer.disconnect();
  }
});
observer.observe(document.body, {
  childList: true,
  subtree: true,
}); 