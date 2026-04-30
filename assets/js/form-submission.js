const forms = document.querySelectorAll('.popupForm');
  const popup = document.querySelector('.popup-message');
  const closePopupBtn = document.querySelector('.closePopup');

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Stop page refresh
      popup.classList.add('show');
      setTimeout(() => {
        popup.style.display = 'flex';
        }, 300); // wait for fade-out
      form.reset();
    });
  });

  closePopupBtn.addEventListener('click', function() {
    popup.classList.remove('show');
    setTimeout(() => {
      popup.style.display = 'none';
    }, 300); // wait for fade-out
  });