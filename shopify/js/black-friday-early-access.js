function loadScript(src) {
    return new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

loadScript("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js")
.then(function () {
  return loadScript("https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.34/moment-timezone-with-data-10-year-range.min.js");
})
.then(function () {
    if (typeof moment === "undefined" || typeof dateBF === "undefined") return;

    const $ = id => document.getElementById(id);
    const [$hours, $minutes, $seconds] = ['ea-hours', 'ea-minutes', 'ea-seconds'].map($);
    const pad = n => n.toString().padStart(2, '0');
    let interval;

    const [year, month, day] = dateBF.split('-').map(Number);
    const targetBF = moment.tz([year, month - 1, day, 0, 0, 0], "America/Los_Angeles");

    function updateCountdown() {
        const now = moment.tz("America/Los_Angeles");
        let diff = targetBF.diff(now);

        diff = Math.max(0, diff);

        const totalSeconds = Math.floor(diff / 1000);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        $hours.textContent = pad(hours);
        $minutes.textContent = pad(minutes);
        $seconds.textContent = pad(seconds);

        if (diff === 0) {
            clearInterval(interval);
        }
    }

    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
});


// Early access password gate

var form = document.querySelector('.early-access-form');

if(form) {
    var PASSWORD = 'QURE-BF25-X9T4G7';
    var REDIRECT_URL = 'https://qureskincare.com/pages/exclusive-holiday-bundle-early-access';

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="password"]');

        if (input && input.value.trim() === PASSWORD) {
            window.location.href = REDIRECT_URL;
        } else if (input) {
            // Optional: provide simple feedback via native validity UI
            if (typeof input.setCustomValidity === 'function') {
                input.setCustomValidity('Incorrect password');
                input.reportValidity();
                // Clear message after a moment so it doesn't persist
                setTimeout(function(){ input.setCustomValidity(''); }, 1500);
            }
        }
    });
}