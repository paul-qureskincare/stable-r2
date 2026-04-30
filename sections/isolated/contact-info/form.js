
      const selects = document.querySelectorAll('.synced-select');
      selects.forEach(select => {
        const wrapper = select.parentElement;
        const dropdown = document.createElement('div');
        dropdown.className = 'qure__custom-dropdown';
        dropdown.textContent = select.options[select.selectedIndex]?.textContent || 'Select';

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'qure__dropdown-options';

        Array.from(select.options).forEach((option, idx) => {
          const optDiv = document.createElement('div');
          optDiv.className = 'qure__dropdown-option';
          optDiv.dataset.value = option.value;
          optDiv.textContent = option.textContent;

          if (option.selected && option.value) {
            optDiv.classList.add('active');
          }

          optDiv.addEventListener('click', () => {
            select.value = option.value;
            select.dispatchEvent(new Event('change'));
            dropdown.textContent = option.textContent;
            optionsContainer.classList.remove('active');
            optionsContainer.querySelectorAll('.qure__dropdown-option').forEach(o => o.classList.remove('active'));
            optDiv.classList.add('active');
          });

          optionsContainer.appendChild(optDiv);
        });

        dropdown.addEventListener('click', () => {
          optionsContainer.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
          if (!wrapper.contains(e.target)) {
            optionsContainer.classList.remove('active');
          }
        });

        wrapper.appendChild(dropdown);
        wrapper.appendChild(optionsContainer);
        select.addEventListener('change', () => {
          const val = select.value;
          const selectedOpt = Array.from(select.options).find(opt => opt.value === val);
          if (selectedOpt) {
            dropdown.textContent = selectedOpt.textContent;

            optionsContainer.querySelectorAll('.qure__dropdown-option').forEach(opt => {
              opt.classList.toggle('active', opt.dataset.value === val);
            });
          }
        });
      });
    
   
      document.querySelectorAll('.related-select').forEach(select => {
  const relatedFields = document.querySelectorAll('.related-field');

  function toggleFields() {
    const selectedValue = select.value;
    relatedFields.forEach(field => {
      field.style.display = (field.id === selectedValue) ? 'block' : 'none';
    });
  }

  select.addEventListener('change', toggleFields);
  toggleFields();
});

  