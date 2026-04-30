const QureMainMenu = {
    init: function () {
        this.initMainMenu();
        this.setHeaderHeights();
        window.addEventListener("resize", this.setHeaderHeights.bind(this));
    },

    initMainMenu: function () {
        document.querySelectorAll(".nav-toggle").forEach((toggleBtn) => {
            toggleBtn.addEventListener("click", () => {
                document.documentElement.classList.toggle("nav-open");
            });
        });
    },

    setHeaderHeights: function () {
        //const announcementBar = document.getElementById("announcement-bar");
        //const pageHeader = document.getElementById("page-header");
        const stickyCart = document.querySelector('.qure__sticky-atc');

        //const d = announcementBar ? announcementBar.clientHeight : 0;
        //const p = pageHeader ? pageHeader.clientHeight : 0;
        const s = stickyCart ? stickyCart.clientHeight : 0;

        // document.body.style.setProperty("--height-bar", `${d}px`);
        //document.body.style.setProperty("--height-header", `${p}px`);
        document.body.style.setProperty("--sticky-cart", `${s}px`);
    }
};
document.addEventListener("DOMContentLoaded", function () {
    QureMainMenu.init();
});


// js for announcement shift issue
    document.fonts.load('1em "TT Commons"').then(() => {
    document.querySelector('.announcement-bar').style.visibility = 'visible';
});
