/**
 * nav-mobile.js – Library University
 */
(function () {
  var nav = document.querySelector('nav');
  if (!nav) return;

  // ── 1. Inject hamburger ──
  var hamburger = document.createElement('button');
  hamburger.className = 'nav-hamburger';
  hamburger.setAttribute('aria-label', 'Menu');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(hamburger);

  // ── 2. Overlay ──
  var overlay = document.createElement('div');
  overlay.className = 'nav-mobile-overlay';
  document.body.appendChild(overlay);

  // ── 3. Slide-in menu ──
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  var mobileMenu = document.createElement('div');
  mobileMenu.className = 'nav-mobile-menu';

  // 3 mục cố định
  var mainLinks = [
    { href: 'index.html',    text: 'Trang chủ' },
    { href: 'huongdan.html', text: 'Hướng dẫn' },
    { href: 'gioithieu.html','text': 'Giới thiệu' }
  ];
  mainLinks.forEach(function(link) {
    var a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.text;
    if (currentPage === link.href) a.classList.add('active');
    mobileMenu.appendChild(a);
  });

  // Divider
  var divider = document.createElement('div');
  divider.className = 'nav-mobile-divider';
  mobileMenu.appendChild(divider);

  // Đăng nhập / đăng xuất
  var user = null;
  try { user = JSON.parse(sessionStorage.getItem('lib_user') || 'null'); } catch(e) {}

  if (user) {
    // Đã đăng nhập: hiện thêm cá nhân + giá sách + đăng xuất
    var btnProfile = document.createElement('a');
    btnProfile.href = 'canhan.html';
    btnProfile.textContent = '☆ Thông tin cá nhân';
    if (currentPage === 'canhan.html') btnProfile.classList.add('active');
    mobileMenu.appendChild(btnProfile);

    var btnShelf = document.createElement('a');
    btnShelf.href = 'giasach.html';
    btnShelf.textContent = '☆ Giá sách của tôi';
    if (currentPage === 'giasach.html') btnShelf.classList.add('active');
    mobileMenu.appendChild(btnShelf);

    var divider2 = document.createElement('div');
    divider2.className = 'nav-mobile-divider';
    mobileMenu.appendChild(divider2);

    var btnLogout = document.createElement('button');
    btnLogout.textContent = '🚪 Đăng xuất';
    btnLogout.style.color = '#e74c3c';
    btnLogout.onclick = function() {
      sessionStorage.removeItem('lib_user');
      localStorage.removeItem('lib_user_remember');
      window.location.href = 'index.html';
    };
    mobileMenu.appendChild(btnLogout);
  } else {
    // Chưa đăng nhập
    var btnLogin = document.createElement('a');
    btnLogin.href = 'dangnhap.html';
    btnLogin.textContent = '→ Đăng nhập';
    btnLogin.style.color = '#3a9ad9';
    mobileMenu.appendChild(btnLogin);
  }

  document.body.appendChild(mobileMenu);

  // ── 4. Toggle ──
  function openMenu() {
    hamburger.classList.add('open');
    overlay.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    hamburger.classList.remove('open');
    overlay.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });
  overlay.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
  });
})();