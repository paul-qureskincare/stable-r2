// js for change the text to added 
document.querySelectorAll('.btn.border-0.w-100').forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      this.classList.toggle('added'); // toggle for each button
      this.textContent = this.classList.contains('added') 
        ? "Added!" 
        : "Add to Bundle";
    });
  });

