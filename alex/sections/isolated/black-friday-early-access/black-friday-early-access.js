const [day, month, year] = dateBF.split('.').map(Number);
const targetBF = new Date(year, month - 1, day, 0, 0, 0).getTime();

const $ = id => document.getElementById(id);
const [$hours, $minutes, $seconds] = ['ea-hours', 'ea-minutes', 'ea-seconds'].map($);

const pad = n => n.toString().padStart(2, '0');

function update() {
    const diff = Math.max(0, targetBF - Date.now());

    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    $hours.textContent = pad(hours);
    $minutes.textContent = pad(minutes);
    $seconds.textContent = pad(seconds);

    if (!diff) {
        clearInterval(interval);
        // document.getElementById('early-access-countdown').textContent = 'Event started!';
    }
}

update();
const interval = setInterval(update, 1000);
