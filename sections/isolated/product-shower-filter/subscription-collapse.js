document.querySelectorAll('.qure__subscription-collapse').forEach(collapseEl => {
    collapseEl.addEventListener('show.bs.collapse', function () {
      document.querySelectorAll('.qure__subscription-item').forEach(item => item.classList.remove('subscription-active'));
      const accordionItem = this.closest('.qure__subscription-item');
      accordionItem.classList.add('subscription-active');
      const button = accordionItem.querySelector('.qure__subscription-btn');
      const label = button?.dataset.btnlabel;
      if (label && document.getElementById('qr__submit')) {
        document.getElementById('qr__submit').textContent = label;
      }
    });
    collapseEl.addEventListener('hide.bs.collapse', function () {
      const accordionItem = this.closest('.qure__subscription-item');
      accordionItem.classList.remove('subscription-active');
    });
    if (collapseEl.classList.contains('show')) {
      const accordionItem = collapseEl.closest('.qure__subscription-item');
      accordionItem.classList.add('subscription-active');
      const button = accordionItem.querySelector('.qure__subscription-btn');
      const label = button?.dataset.btnlabel;
      if (label && document.getElementById('qr__submit')) {
        document.getElementById('qr__submit').textContent = label;
      }
    }
  });