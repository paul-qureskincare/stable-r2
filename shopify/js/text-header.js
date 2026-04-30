if (window.location.hash === '#' + text_header_title) {
    setTimeout(function() {
      var el = document.querySelector('[data-id="' + text_header_title + '"]');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 3000);
}