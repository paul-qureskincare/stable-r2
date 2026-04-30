if (!customElements.get("qure__banner-scrolling")) {
  class e extends HTMLElement {
      constructor() {
          super()
      }
      connectedCallback() {
          this.promotion = this.querySelector(".qure__video-col"), this.init()
      }
      init() {
          if (1 === this.childElementCount) {
              this.promotion.classList.add("qure__video-col--animated");
              for (let e = 0; e < 1; e++) this.clone = this.promotion.cloneNode(!0), this.clone.setAttribute("aria-hidden", !0), this.appendChild(this.clone);
              new IntersectionObserver(((e, t) => {
                  e.forEach((e => {
                      e.isIntersecting ? this.scrollingPlay() : this.scrollingPause()
                  }))
              }), {
                  rootMargin: "0px 0px 50px 0px"
              }).observe(this)
          }
      }
      scrollingPlay() {
          this.classList.remove("qure__video-col--paused")
      }
      scrollingPause() {
          this.classList.add("qure__video-col--paused")
      }
  }
  customElements.define("qure__banner-scrolling", e)
}