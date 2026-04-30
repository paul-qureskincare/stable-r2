let prevScrollPos = window.pageYOffset;

const header = document.getElementById('page-header');
const gamificationHeader = document.getElementById('endrock_gamificationHeader');
const announcementHeader = document.getElementById('announcement-bar');

const headerInitiallyVisible = header && window.getComputedStyle(header).display !== 'none';
const gamificationHeaderInitiallyVisible = gamificationHeader && window.getComputedStyle(gamificationHeader).display !== 'none';
const announcementHeaderInitiallyVisible = announcementHeader && window.getComputedStyle(announcementHeader).display !== 'none';

window.addEventListener('scroll', function() {
    if (location.href.includes('guide')) return;
    const currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
        if (header && headerInitiallyVisible) header.style.display = 'block';
        if (gamificationHeader && gamificationHeaderInitiallyVisible) gamificationHeader.style.display = 'block';
        if (announcementHeader && announcementHeaderInitiallyVisible) announcementHeader.style.display = 'block';
    } else {
        if(currentScrollPos > 10) {
            if (header) header.style.display = 'none';
            if (gamificationHeader) gamificationHeader.style.display = 'none';
            if (announcementHeader) announcementHeader.style.display = 'none';
        }
    }

    prevScrollPos = currentScrollPos;
});