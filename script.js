
  // Apply saved theme before styles load
  (function () {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  })();

  // Copy text to clipboard
  function copyText(event, element) {
    const text = element.querySelector('p').textContent;
    navigator.clipboard.writeText(text).then(() => {
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.textContent = 'Copied!';
      document.body.appendChild(notification);

      const offsetX = -35;
      const offsetY = -60;
      let posX = event.clientX + offsetX;
      let posY = event.clientY + offsetY;
      const maxX = window.innerWidth - 100 - 10;
      const maxY = window.innerHeight - 30 - 10;
      posX = Math.min(posX, maxX);
      posY = Math.min(posY, maxY);
      notification.style.left = posX + 'px';
      notification.style.top = posY + 'px';

      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => notification.remove(), 300);
      }, 1500);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  // Load content dynamically with fade-in
  async function loadPage(page, pushState = true) {
    const main = document.getElementById('main-content');
    main.classList.remove('fade-in');

    try {
      const response = await fetch(page);
      if (!response.ok) throw new Error('Page not found');
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newMain = doc.querySelector('main');
      if (!newMain) throw new Error('Main content not found');

      requestAnimationFrame(() => {
        main.innerHTML = newMain.innerHTML;
        main.classList.add('fade-in');
      });

      document.title = doc.querySelector('title')?.textContent || 'HR Support';

      if (pushState) {
        history.pushState({ page }, '', page);
      }
    } catch (err) {
      console.error('Error loading page:', err);
      main.innerHTML = '<p>Error loading content. Please try again.</p>';
      main.classList.add('fade-in');
    }
  }

  // Set up navigation listeners
  function attachNavListeners() {
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-page');
        loadPage(page);
      });
    });
  }

  // Handle browser back/forward
  window.addEventListener('popstate', (e) => {
    const currentPage = window.location.pathname.split('/').pop() || 'router.html';
    const page = e.state?.page || currentPage;
    loadPage(page, false);
  });

  // DOM loaded
  document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Update theme toggle icon
    function updateToggleIcon(theme) {
      themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
      themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    }

    // Initial setup
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    // Toggle handler
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateToggleIcon(newTheme);
    });

    // Attach nav links
    attachNavListeners();
  });

