(function() {
    tippy('[tooltip-target]', {
        placement: 'top',
        delay: [300, 0],
        interactive: true,
        allowHTML: true,
        content: function(reference) {
            var template = document.querySelector('[tooltip-template="' + reference.getAttribute('tooltip-target') + '"]');
            return template ? template.innerHTML : '';
        }
    });

    document.querySelectorAll('.c-info__icon').forEach(function(icon) {
        var tooltip = icon.parentElement.querySelector('.c-info__tooltip');

        if (tooltip) {
            tippy(icon, {
                placement: 'top',
                delay: [300, 0],
                interactive: true,
                allowHTML: true,
                content: tooltip.innerHTML
            });
        }
    });
})();
