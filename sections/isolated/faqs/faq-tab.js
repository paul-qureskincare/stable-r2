// const dropdown = document.getElementById('customTabDropdown');
//     const selected = document.getElementById('customSelectedTab');
//     const options = document.getElementById('customTabOptions');
//     const optionItems = options.querySelectorAll('.custom-tab-option');
//     const navLinks = document.querySelectorAll('.qure__faqs-button');

//     selected.addEventListener('click', () => {
//       options.style.display = options.style.display === 'flex' ? 'none' : 'flex';
//     });

//     optionItems.forEach(option => {
//       option.addEventListener('click', () => {
//         const targetId = option.getAttribute('data-bs-target');
//         const text = option.querySelector('span').textContent;
//         const imgSrc = option.getAttribute('data-img');

//         selected.innerHTML = `<img src="${imgSrc}" alt=""><span>${text}</span>`;
//         options.style.display = 'none';
//         const tabTrigger = new bootstrap.Tab(document.querySelector(`.qure__faqs-button[href="${targetId}"]`));
//         tabTrigger.show();
//       });
//     });

//     navLinks.forEach(link => {
//       link.addEventListener('click', function () {
//         const targetId = this.getAttribute('href');
//         const option = options.querySelector(`.custom-tab-option[data-bs-target="${targetId}"]`);
//         if (option) {
//           const img = option.getAttribute('data-img');
//           const text = option.querySelector('span').textContent;
//           selected.innerHTML = `<div class="qure__faqs-icon"><img src="${img}" alt=""></div><span>${text}</span>`;
//         }
//       });
//     });

//     document.addEventListener('click', function (e) {
//       if (!dropdown.contains(e.target)) {
//         options.style.display = 'none';
//       }
//     });


const dropdown = document.getElementById('customTabDropdown');
const selected = document.getElementById('customSelectedTab');
const options = document.getElementById('customTabOptions');
const optionItems = options.querySelectorAll('.custom-tab-option');
const navLinks = document.querySelectorAll('.qure__faqs-button');

selected.addEventListener('click', () => {
  options.style.display = options.style.display === 'flex' ? 'none' : 'flex';
});

optionItems.forEach(option => {
  option.addEventListener('click', () => {
    const targetId = option.getAttribute('data-bs-target');
    const text = option.querySelector('span').textContent;
    const imgSrc = option.getAttribute('data-img');

    // Update selected HTML
    selected.innerHTML = `<img src="${imgSrc}" alt=""><span>${text}</span>`;
    options.style.display = 'none';

    // Remove 'active' from all options and add to the selected one
    optionItems.forEach(item => item.classList.remove('active'));
    option.classList.add('active');

    // Show the corresponding tab
    const tabTrigger = new bootstrap.Tab(document.querySelector(`.qure__faqs-button[href="${targetId}"]`));
    tabTrigger.show();
  });
});

navLinks.forEach(link => {
  link.addEventListener('click', function () {
    const targetId = this.getAttribute('href');
    const option = options.querySelector(`.custom-tab-option[data-bs-target="${targetId}"]`);
    if (option) {
      const img = option.getAttribute('data-img');
      const text = option.querySelector('span').textContent;

      selected.innerHTML = `<div class="qure__faqs-icon"><img src="${img}" alt=""></div><span>${text}</span>`;

      // Sync active state
      optionItems.forEach(item => item.classList.remove('active'));
      option.classList.add('active');
    }
  });
});

document.addEventListener('click', function (e) {
  if (!dropdown.contains(e.target)) {
    options.style.display = 'none';
  }
});
