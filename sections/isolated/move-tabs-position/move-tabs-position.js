document.querySelectorAll('.qure-scroll-tabs').forEach(tabList => {
  tabList.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('button.qure-scroll-link');
    if (!clickedButton) return;

    const clickedItem = clickedButton.closest('.qure-scroll-item');
    if (!clickedItem) return;

    const items = [...tabList.querySelectorAll('.qure-scroll-item')];
    const index = items.indexOf(clickedItem);

    if (index === 0) {
      // Scroll fully left for first tab
      tabList.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    // Scroll so clicked tab is fully aligned left (scroll container to clickedItem.offsetLeft)
    const scrollTarget = clickedItem.offsetLeft;
    tabList.scrollTo({ left: scrollTarget, behavior: 'smooth' });
  });
});