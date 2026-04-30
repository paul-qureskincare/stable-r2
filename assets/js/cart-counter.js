class CartNotification extends HTMLElement {
    constructor() {
      super();
      this.cartCountDown = this.querySelector('.cart-countdown-time');
      this.startTime = Date.now();
      this.countdownTimer();
    }

    countdownTimer() {
      if (!this.cartCountDown) return;
      const e = Number(this.cartCountDown.dataset.countdownTime) || 5,
            t = this.cartCountDown.dataset.timeoutMessage,
            r = this.startTime + 60 * e * 1000;

      const i = setInterval(() => {
        if (document.querySelector(".cart-countdown-time .countdown-message")) {
          if (Date.now() > r) {
            this.cartCountDown.querySelector(".countdown-message").innerHTML = t;
            clearInterval(i);
          } else {
            const remaining = r - Date.now(),
                  minutes = Math.floor((remaining % 3600000) / 60000),
                  seconds = Math.floor((remaining % 60000) / 1000);

            document.querySelector(".countdown-timer-minute").innerHTML = String(minutes).padStart(2, '0');
            document.querySelector(".countdown-timer-sec").innerHTML = String(seconds).padStart(2, '0');
          }
        } else {
          clearInterval(i);
        }
      }, 1000);
    }
  }

 customElements.define("cart-notification", CartNotification);
 window.CartNotificationLoaded = true;








 

// countdown-timer.js
(function () {
  // Default target (change this to your default). Individual sections can override with data-target.
  const DEFAULT_TARGET = "2025-10-02T00:00:00";

  // Map to hold interval IDs so we can clear them if needed
  const intervals = new WeakMap();

  // Format helper
  function pad(n) {
    return String(n).padStart(2, "0");
  }

  // Initialize a single .countdown element
  function initCountdownElement(el) {
    if (!el || el.dataset.countdownInitialized === "1") return; // already initialized

    const targetStr = el.dataset.target || DEFAULT_TARGET;
    const target = Date.parse(targetStr);
    if (isNaN(target)) {
      console.warn("countdown-timer: invalid target date:", targetStr);
      return;
    }

    // mark initialized
    el.dataset.countdownInitialized = "1";

    const daysEl = el.querySelector(".days");
    const hoursEl = el.querySelector(".hours");
    const minutesEl = el.querySelector(".minutes");
    const secondsEl = el.querySelector(".seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
      console.warn("countdown-timer: missing .days/.hours/.minutes/.seconds inside", el);
      return;
    }

    function update() {
      const now = Date.now();
      let distance = target - now;

      if (distance <= 0) {
        // end state
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        // If we have an interval running, clear it
        const prev = intervals.get(el);
        if (prev) {
          clearInterval(prev);
          intervals.delete(el);
        }
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = pad(days);
      hoursEl.textContent = pad(hours);
      minutesEl.textContent = pad(minutes);
      secondsEl.textContent = pad(seconds);
    }

    // run immediately and then every second
    update();
    const id = setInterval(update, 1000);
    intervals.set(el, id);
  }

  // Initialize all existing .countdown nodes
  function initAllCountdowns() {
    document.querySelectorAll(".countdown").forEach(initCountdownElement);
  }

  // Observe DOM for dynamically added/removed countdowns
  function setupMutationObserver() {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(mutation => {
        // handle added nodes
        mutation.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          if (node.matches && node.matches(".countdown")) {
            initCountdownElement(node);
          } else if (node.querySelectorAll) {
            node.querySelectorAll(".countdown").forEach(initCountdownElement);
          }
        });

        // handle removed nodes to clear intervals (avoid memory leaks)
        mutation.removedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          if (node.matches && node.matches(".countdown")) {
            const id = intervals.get(node);
            if (id) {
              clearInterval(id);
              intervals.delete(node);
            }
          } else if (node.querySelectorAll) {
            node.querySelectorAll(".countdown").forEach(n => {
              const id = intervals.get(n);
              if (id) {
                clearInterval(id);
                intervals.delete(n);
              }
            });
          }
        });
      });
    });

    observer.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true
    });
  }

  // Expose a public init function in case you want to call it manually after injecting HTML
  window.initCountdowns = initAllCountdowns;

  // Run
  initAllCountdowns();
  setupMutationObserver();
})();
