const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/resistor-color-code', label: 'Resistor Color Code Calculator' },
  { path: '/series-resistance', label: 'Series Resistance Calculator' },
  { path: '/parallel-resistance', label: 'Parallel Resistance Calculator' },
  { path: '/voltage-divider', label: 'Voltage Divider Calculator' },
  { path: '/resistor-guide', label: 'Resistor Guide' },
  { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact Us' },
];

const FOOTER_CALC_LINKS = [
  { path: '/resistor-color-code', label: 'Resistor Color Code' },
  { path: '/series-resistance', label: 'Series Resistance' },
  { path: '/parallel-resistance', label: 'Parallel Resistance' },
  { path: '/voltage-divider', label: 'Voltage Divider' },
];

const FOOTER_INFO_LINKS = [
  { path: '/resistor-guide', label: 'Resistor Guide' },
  { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact Us' },
  { path: '/privacy-policy', label: 'Privacy Policy' },
  { path: '/disclaimer', label: 'Disclaimer' },
  { path: '/terms', label: 'Terms & Conditions' },
];

function getCurrentPath() {
  const path = window.location.pathname;
  if (path === '/' || path === '/index.html') return '/';
  return path.replace(/\.html$/, '');
}

function isActive(path) {
  return getCurrentPath() === path;
}

function renderHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  header.className = 'site-header';
  header.innerHTML = `
    <div class="header-inner">
      <button class="menu-btn" id="menuBtn" aria-label="Menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
      <a href="/" class="logo">OhmLab</a>
    </div>
  `;
  document.getElementById('menuBtn').addEventListener('click', openMenu);
}

function renderFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-section">
          <h4>OhmLab</h4>
          <p>Fast resistor & electronics calculators for students</p>
          <p class="owner">Created by Ajmal Ali A</p>
        </div>
        <div class="footer-section">
          <h4>Calculators</h4>
          ${FOOTER_CALC_LINKS.map(l => `<a href="${l.path}">${l.label}</a>`).join('')}
        </div>
        <div class="footer-section">
          <h4>Information</h4>
          ${FOOTER_INFO_LINKS.map(l => `<a href="${l.path}">${l.label}</a>`).join('')}
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 OhmLab. All rights reserved. | Kerala, India</p>
      </div>
    </div>
  `;
}

function loadAdScripts() {
  const scripts = [
    { src: 'https://bauval.org/14/69145a469e06449c4f98df58b813f617', attrs: { 'data-cfasync': 'false' } },
    { src: 'https://bauval.org/21/599b0f251b4dddca60e7fc09e25a632f', attrs: { async: 'async', 'data-cfasync': 'false' } },
    { src: 'https://abscloud.org/1/5a5064fc1a1d7257a482cf855232b21e', attrs: { 'data-cfasync': 'false' } },
  ];
  scripts.forEach(({ src, attrs }) => {
    const s = document.createElement('script');
    s.src = src;
    for (const [k, v] of Object.entries(attrs)) {
      s.setAttribute(k, v === true ? '' : v);
    }
    document.head.appendChild(s);
  });
}

function renderSideAds() {
  const left = document.createElement('div');
  left.className = 'side-ad side-ad-left';
  left.id = 'sideAdLeft';
  document.body.appendChild(left);

  const right = document.createElement('div');
  right.className = 'side-ad side-ad-right';
  right.id = 'sideAdRight';
  document.body.appendChild(right);
}

function openMenu() {
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  overlay.id = 'menuOverlay';
  overlay.addEventListener('click', closeMenu);

  const menu = document.createElement('div');
  menu.className = 'side-menu';
  menu.id = 'sideMenu';
  menu.innerHTML = `
    <div class="side-menu-inner">
      <button class="side-menu-close" id="menuCloseBtn" aria-label="Close menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <nav>
        ${NAV_LINKS.map(l => `<a href="${l.path}" class="${isActive(l.path) ? 'active' : ''}">${l.label}</a>`).join('')}
      </nav>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(menu);
  document.getElementById('menuCloseBtn').addEventListener('click', closeMenu);
}

function closeMenu() {
  const overlay = document.getElementById('menuOverlay');
  const menu = document.getElementById('sideMenu');
  if (overlay) overlay.remove();
  if (menu) menu.remove();
}

document.addEventListener('DOMContentLoaded', function() {
  renderHeader();
  renderFooter();
  loadAdScripts();
  renderSideAds();
});
