document.addEventListener("scroll", function() {
  const stickyElement = document.querySelector(".qure__sticky-atc");
  if (!stickyElement) return;

  if (window.scrollY > 400) { // ~20cm = 200px approx (adjust if needed)
    stickyElement.classList.add("show_cta");
  } else {
    stickyElement.classList.remove("show_cta");
  }
});