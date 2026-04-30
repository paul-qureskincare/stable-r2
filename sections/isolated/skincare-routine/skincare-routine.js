window.addEventListener('load', function () {
  const allImages = document.querySelectorAll('.routine-img');
  const tabs = document.querySelectorAll('#SkinPlanTab .nav-link');

  if (tabs.length && allImages.length) {
    tabs.forEach(tab => {
      tab.addEventListener('shown.bs.tab', function (event) {
        const imgToShow = event.target.getAttribute('data-img');

        allImages.forEach(img => img.classList.add('d-none'));

        const targetImg = document.querySelector('.routine-img.' + imgToShow);
        if (targetImg) targetImg.classList.remove('d-none');
      });
    });
  }
});
