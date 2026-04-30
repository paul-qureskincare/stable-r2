 (function () {
    var root = document.querySelector('.qure_sale-countdown');
    if (!root) return;

    var deadlineAttr = root.getAttribute('data-deadline');
    var defaultEnd = new Date(Date.now() + (4 * 24 * 60 * 60 + 9 * 60 * 60 + 59 * 60 + 36) * 1000);
    var endTime = deadlineAttr ? new Date(deadlineAttr) : defaultEnd;

    var valueFor = function (key) {
        return root.querySelector('.qs-value[data-key="' + key + '"]');
    };

    function pad2(n) {
        return String(n).padStart(2, '0');
    }

    function render() {
        var now = new Date();
        var diffMs = Math.max(0, endTime.getTime() - now.getTime());

        var totalSeconds = Math.floor(diffMs / 1000);
        var days = Math.floor(totalSeconds / (24 * 3600));
        totalSeconds -= days * 24 * 3600;
        var hours = Math.floor(totalSeconds / 3600);
        totalSeconds -= hours * 3600;
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds - minutes * 60;

        var daysEl = valueFor('days');
        var hoursEl = valueFor('hours');
        var minutesEl = valueFor('minutes');
        var secondsEl = valueFor('seconds');

        if (daysEl) daysEl.textContent = pad2(days);
        if (hoursEl) hoursEl.textContent = pad2(hours);
        if (minutesEl) minutesEl.textContent = pad2(minutes);
        if (secondsEl) secondsEl.textContent = pad2(seconds);
    }

    render();
    var timerId = setInterval(function () {
        render();
        if (endTime.getTime() - Date.now() <= 0) {
            clearInterval(timerId);
        }
    }, 1000);
})();