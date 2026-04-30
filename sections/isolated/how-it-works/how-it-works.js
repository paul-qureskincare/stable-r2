document.querySelectorAll('#modeTabs .nav-link').forEach(button => {
    button.addEventListener('click', () => {
      const selectedMode = button.getAttribute('data-mode');

      // Activate tab buttons
      document.querySelectorAll('#modeTabs .nav-link').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Show correct content (all groups)
      document.querySelectorAll('.mode-tab').forEach(tab => {
        if (tab.classList.contains(`mode-tab-${selectedMode}`)) {
          tab.classList.remove('d-none');
          tab.classList.add('active');
        } else {
          tab.classList.add('d-none');
          tab.classList.remove('active');
        }
      });
    });
  });