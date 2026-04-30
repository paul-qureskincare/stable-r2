  // // Target date: October 10, 2025
  // const targetDate = new Date("2025-10-02T00:00:00").getTime();

  // function updateCountdown() {
  //   const now = new Date().getTime();
  //   const distance = targetDate - now;

  //   if (distance <= 0) {
  //     // Countdown ended
  //     document.getElementById('days').textContent = '00';
  //     document.getElementById('hours').textContent = '00';
  //     document.getElementById('minutes').textContent = '00';
  //     document.getElementById('seconds').textContent = '00';
  //     clearInterval(timer);
  //     return;
  //   }

  //   const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //   const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //   const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //   document.getElementById('days').textContent = String(days).padStart(2, '0');
  //   document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  //   document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  //   document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  // }

  // const timer = setInterval(updateCountdown, 1000);
  // updateCountdown(); // initial call







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














