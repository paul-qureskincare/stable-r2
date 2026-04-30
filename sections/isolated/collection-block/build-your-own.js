// Mark "added_in_cart" checkbox as checked when clicking .add-cart-button
function findNearestAddedInCartCheckbox(startEl) {
  let node = startEl;
  while (node && node !== document.body) {
    if (node.querySelector) {
      const checkbox = node.querySelector('input[type="checkbox"][name="added_in_cart"]');
      if (checkbox) return checkbox;
    }
    node = node.parentElement;
  }
  return null;
}

document.addEventListener('click', function (e) {
  const button = e.target.closest && e.target.closest('.add-cart-button');
  if (!button) return;

  const checkbox = findNearestAddedInCartCheckbox(button);
  if (!checkbox) return;

  checkbox.checked = true;
  checkbox.dispatchEvent(new Event('change', { bubbles: true }));
});

// Tabs anchor navigation (stable fixed + smooth + active)
// Tabs: smooth scroll + active state
(() => {
  const tabs = document.querySelector('.qure_tabs');
  if (!tabs) return;

  const EXTRA_OFFSET = 190; // <-- твой отступ (если нужен)

  const items = [...tabs.querySelectorAll('a[href^="#"]')]
    .map(link => {
      const hash = link.getAttribute('href');
      if (!hash || hash.length <= 1) return null;

      const section = document.querySelector(hash);
      if (!section) return null;

      return { link, hash, section };
    })
    .filter(Boolean);

  if (!items.length) return;

  let activeHash = null;
  let ticking = false;

  function setActive(hash) {
    if (hash === activeHash) return;
    activeHash = hash;

    items.forEach(item =>
      item.link.classList.toggle('active', item.hash === hash)
    );
  }

  function scrollToSection(section) {
    const target =
      section.getBoundingClientRect().top +
      window.scrollY -
      EXTRA_OFFSET;

    window.scrollTo({
      top: target,
      behavior: 'smooth'
    });
  }

  // click
  items.forEach(item => {
    item.link.addEventListener('click', e => {
      e.preventDefault();
      scrollToSection(item.section);
      setActive(item.hash);
    });
  });

  // active on scroll
  function updateActiveOnScroll() {
    const scrollPos = window.scrollY + EXTRA_OFFSET + 10;

    let current = items[0];

    for (const item of items) {
      const top =
        item.section.getBoundingClientRect().top + window.scrollY;

      if (top <= scrollPos) current = item;
      else break;
    }

    if (current) setActive(current.hash);
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      updateActiveOnScroll();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // init
  updateActiveOnScroll();
})();
