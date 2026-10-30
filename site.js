(() => {
  const root = document.documentElement;

  const intro = document.querySelector('.intro');
  if (intro) {
    setTimeout(() => root.classList.add('is-fill'), 450);
    setTimeout(() => root.classList.add('is-ready'), 1300);
  } else {
    root.classList.add('is-ready');
  }

  const slides = [...document.querySelectorAll('.fv__img')];
  if (slides.length > 1) {
    let cur = 0;
    setInterval(() => {
      slides[cur].classList.remove('is-on');
      cur = (cur + 1) % slides.length;
      slides[cur].classList.add('is-on');
    }, 6000);
  }

  const btn = document.querySelector('.menu-btn');
  const drawer = document.querySelector('.drawer');
  if (btn && drawer) {
    const set = (open) => {
      drawer.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      root.classList.toggle('is-locked', open);
    };
    btn.addEventListener('click', () => set(!drawer.classList.contains('is-open')));
    drawer.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      if (el.classList.contains('rv')) {
        const sibs = [...el.parentElement.children].filter((c) => c.classList.contains('rv'));
        el.style.setProperty('--rv-delay', `${sibs.indexOf(el) * 0.12}s`);
      }
      el.classList.add('is-on');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.rv, .zoom').forEach((el) => io.observe(el));
})();
