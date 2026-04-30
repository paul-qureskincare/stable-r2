  function initWistiaModal() {
    const videoLinks = document.querySelectorAll('.filter-card-video');
    const modal = document.getElementById('reusableWistiaModal');
    const videoContainer = document.getElementById('wistiaVideoContainer');

    if (!videoLinks.length || !modal || !videoContainer) return;

    videoLinks.forEach(link => {
      link.addEventListener('click', function () {
        const videoId = this.getAttribute('data-video-id');
        if (videoId) {
          const embed = `<wistia-player media-id="${videoId}" seo="false" aspect="0.5625"></wistia-player>`;
          videoContainer.innerHTML = embed;
        }
      });
    });
    modal.addEventListener('hidden.bs.modal', function () {
      videoContainer.innerHTML = '';
    });
  }

  initWistiaModal();
  
new bootstrap.Modal(document.getElementById('reusableWistiaModal'), {
  backdrop: true,
  keyboard: true
});






