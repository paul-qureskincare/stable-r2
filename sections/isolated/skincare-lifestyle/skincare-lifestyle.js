(function () {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  function init() {
    const sections = document.querySelectorAll(".skin_life_content");
    const buttons = document.querySelectorAll(".nav-link.step");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          buttons.forEach(btn => btn.classList.remove("active_mob"));
          const activeButton = entry.target.querySelector(".nav-link.step");
          if (activeButton) activeButton.classList.add("active_mob");
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
  }
})();
