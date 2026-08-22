document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  highlightActiveNav();
  initTabSwitchers();
  initDropdowns();
});

/**
 * Mobile Drawer Menu Handler
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer') || document.querySelector('nav.fixed.left-0');
  
  if (!toggleBtn || !drawer) return;

  // Create backdrop if not existing
  let backdrop = document.getElementById('mobile-drawer-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'mobile-drawer-backdrop';
    backdrop.className = 'fixed inset-0 bg-black/40 backdrop-blur-sm z-30 hidden opacity-0 transition-opacity duration-300 pointer-events-none md:hidden';
    document.body.appendChild(backdrop);
  }

  function openDrawer() {
    drawer.classList.remove('hidden', '-translate-x-full');
    drawer.classList.add('flex', 'translate-x-0');
    backdrop.classList.remove('hidden', 'pointer-events-none');
    backdrop.classList.add('opacity-100');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.add('-translate-x-full');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (window.innerWidth < 768) {
        drawer.classList.add('hidden');
      }
    }, 300);
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = drawer.classList.contains('hidden') || drawer.classList.contains('-translate-x-full');
    if (isHidden) {
      openDrawer();
    } else {
      closeDrawer();
    }
  });

  backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
}

/**
 * Highlight active page link in top bar and side nav
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('a[href]');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('http')) return;

    const linkPath = href.split('/').pop();
    if (linkPath === currentPath) {
      // Active state styling for sidebar links
      if (link.closest('ul')) {
        link.classList.add('bg-primary-container', 'text-on-primary-container', 'font-semibold');
        link.classList.remove('text-on-surface-variant');
      }
    }
  });
}

/**
 * Tab switching helper
 */
function initTabSwitchers() {
  const tabButtons = document.querySelectorAll('[data-tab-target]');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab-target');
      const container = btn.closest('[data-tab-container]') || document;
      
      container.querySelectorAll('[data-tab-target]').forEach(b => {
        b.classList.remove('border-primary', 'text-primary', 'font-semibold', 'bg-primary-container', 'text-on-primary-container');
        b.classList.add('text-on-surface-variant', 'border-transparent');
      });

      btn.classList.add('border-primary', 'text-primary', 'font-semibold');
      btn.classList.remove('text-on-surface-variant', 'border-transparent');

      container.querySelectorAll('[data-tab-content]').forEach(content => {
        if (content.id === targetId) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });
    });
  });
}

/**
 * Dropdown Menu Handlers
 */
function initDropdowns() {
  const dropdownTriggers = document.querySelectorAll('[data-dropdown-toggle]');
  dropdownTriggers.forEach(trigger => {
    const targetId = trigger.getAttribute('data-dropdown-toggle');
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      targetEl.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!targetEl.contains(e.target) && !trigger.contains(e.target)) {
        targetEl.classList.add('hidden');
      }
    });
  });
}
