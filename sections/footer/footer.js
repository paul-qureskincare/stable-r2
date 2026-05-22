document.addEventListener('click', function(e) {
    const button = e.target.closest('[data-toggle="accordion"]');

    if (!button) return;
    
    const targetElement = button.parentElement.querySelector('ul');
    
    if (!targetElement) return;
    
    const isExpanded = targetElement.classList.contains('show');
    
    if (isExpanded) {
        // Collapse
        targetElement.style.height = targetElement.scrollHeight + 'px';
        setTimeout(() => {
            targetElement.style.height = '0px';
        }, 10);
        targetElement.classList.remove('show');
        button.classList.remove('active');
    } else {
        // Expand
        targetElement.style.height = targetElement.scrollHeight + 'px';
        targetElement.classList.add('show');
        button.classList.add('active');
        
        // Remove inline height after transition
        targetElement.addEventListener('transitionend', function handler() {
            if (targetElement.classList.contains('show')) {
                targetElement.style.height = 'auto';
            }
            targetElement.removeEventListener('transitionend', handler);
        });
    }
});