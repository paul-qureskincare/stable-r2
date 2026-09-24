(function () {
    function loadScript(src) {
      return new Promise(function (resolve, reject) {
        var existing = document.querySelector('script[src="' + src + '"]');
        if (existing) { resolve(); return; }
        var s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }

    var intervals = new WeakMap();

    loadScript("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js")
      .then(function () {
        return loadScript("https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.34/moment-timezone-with-data-10-year-range.min.js");
      })
      .then(function () {
        initAllCountdowns();
        setupMutationObserver();
      });

    function pad2(n) {
      return String(n).padStart(2, '0');
    }

    function initCountdownElement(root) {
      if (typeof moment === "undefined" || typeof moment.tz !== "function") {
        console.error("moment-timezone not loaded");
        return;
      }

      if (!root || root.dataset.countdownInitialized === '1') return;

      var children = root.querySelectorAll(':scope > div[data-key]');
      if (children.length < 4) return;

      root.dataset.countdownInitialized = '1';

      var daysEl    = children[0];
      var hoursEl   = children[1];
      var minutesEl = children[2];
      var secondsEl = children[3];

      var deadlineAttr = root.getAttribute('data-deadline');

      var days = (typeof customDays !== 'undefined') ? customDays : 0;

      var defaultEnd = moment().tz("America/Los_Angeles")
        .add(days, 'days')
        .add(11, 'hours')
        .add(59, 'minutes')
        .add(59, 'seconds');

      var endTime = (deadlineAttr && deadlineAttr.trim() !== '')
        ? moment.tz(deadlineAttr, "America/Los_Angeles")
        : defaultEnd;

      function render() {
        var now = moment().tz("America/Los_Angeles");
        var diffSeconds = Math.max(0, endTime.diff(now, 'seconds'));

        var d = Math.floor(diffSeconds / (24 * 3600));
        diffSeconds -= d * 24 * 3600;
        var h = Math.floor(diffSeconds / 3600);
        diffSeconds -= h * 3600;
        var m = Math.floor(diffSeconds / 60);
        var s = diffSeconds - m * 60;

        daysEl.textContent    = pad2(d);
        hoursEl.textContent   = pad2(h);
        minutesEl.textContent = pad2(m);
        secondsEl.textContent = pad2(s);
      }

      render();
      var timerId = setInterval(function () {
        render();
        if (endTime.diff(moment().tz("America/Los_Angeles")) <= 0) {
          clearInterval(timerId);
          intervals.delete(root);
        }
      }, 1000);
      intervals.set(root, timerId);
    }

    function initAllCountdowns() {
      document.querySelectorAll('.e-countdown').forEach(initCountdownElement);
    }

    function clearCountdownElement(el) {
      var id = intervals.get(el);
      if (id) {
        clearInterval(id);
        intervals.delete(el);
      }
    }

    function setupMutationObserver() {
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType !== 1) return;
            if (node.matches && node.matches('.e-countdown')) {
              initCountdownElement(node);
            } else if (node.querySelectorAll) {
              node.querySelectorAll('.e-countdown').forEach(initCountdownElement);
            }
          });

          mutation.removedNodes.forEach(function (node) {
            if (node.nodeType !== 1) return;
            if (node.matches && node.matches('.e-countdown')) {
              clearCountdownElement(node);
            } else if (node.querySelectorAll) {
              node.querySelectorAll('.e-countdown').forEach(clearCountdownElement);
            }
          });
        });
      });

      observer.observe(document.documentElement || document.body, {
        childList: true,
        subtree: true
      });
    }

    window.initCountdowns = initAllCountdowns;
  })();  