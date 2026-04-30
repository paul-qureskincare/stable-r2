async function redirectIfNotUS() {
    if (typeof is_country_us === 'function') {
        const isUS = await is_country_us();
        if (!isUS) {
            window.location.href = '/';
        }
    }
}

redirectIfNotUS();