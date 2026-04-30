window._klOnsite = window._klOnsite || []; 

var trigger = document.getElementById("klaviyo_form_trigger");
if (trigger) {
  trigger.addEventListener("click", function(e) {
    e.preventDefault();
    if (window.innerWidth <= 768) {
        window._klOnsite.push(['openForm', 'XTbNqm']);
    } else {
        window._klOnsite.push(['openForm', 'UHuj8m']);
    }
  });
}