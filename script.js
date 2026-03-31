document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.portal-btn');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const target = btn.getAttribute('href');
      const rect = btn.getBoundingClientRect();

      // Fade out entry page content simultaneously
      const entryContent = document.querySelector('.entry-page');
      const topBar = document.querySelector('.top-bar');
      const footerNote = document.querySelector('.footer-note');
      [entryContent, topBar, footerNote].forEach(el => {
        if (el) {
          el.style.transition = 'opacity 0.3s ease';
          el.style.opacity = '0';
        }
      });

      // Create expanding overlay centered on the button
      const overlay = document.createElement('div');
      overlay.classList.add('portal-transition-overlay');

      // Size it as a small circle at the button's center
      const size = 10;
      overlay.style.width = size + 'px';
      overlay.style.height = size + 'px';
      overlay.style.left = (rect.left + rect.width / 2 - size / 2) + 'px';
      overlay.style.top = (rect.top + rect.height / 2 - size / 2) + 'px';

      document.body.appendChild(overlay);

      // Trigger expansion on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          overlay.classList.add('expand');
        });
      });

      // Navigate after animation completes
      setTimeout(() => {
        window.location.href = target;
      }, 580);
    });
  });
});
