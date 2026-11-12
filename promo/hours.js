// Marks the hour being read in the margin calendar: the link gets
// aria-current and a gold rule slides beside it. Without this script the
// calendar is still a list of plain links.
(() => {
  const nav = document.querySelector('.kal');
  if (!nav || !('IntersectionObserver' in window)) return;
  const marker = nav.querySelector('.kal-marker');
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const byId = new Map(links.map(a => [a.hash.slice(1), a]));
  const targets = [...byId.keys()].map(id => document.getElementById(id)).filter(Boolean);
  const visible = new Set();
  let current = null;

  function mark(link) {
    if (link === current) return;
    if (current) current.removeAttribute('aria-current');
    current = link;
    if (!link) { marker.style.opacity = '0'; return; }
    link.setAttribute('aria-current', 'step');
    marker.style.opacity = '1';
    marker.style.height = link.offsetHeight + 'px';
    marker.style.transform = 'translateY(' + link.offsetTop + 'px)';
  }

  const io = new IntersectionObserver(entries => {
    for (const e of entries) e.isIntersecting ? visible.add(e.target) : visible.delete(e.target);
    const first = targets.find(t => visible.has(t));
    mark(first ? byId.get(first.id) : null);
  }, { rootMargin: '-30% 0px -60% 0px' });
  targets.forEach(t => io.observe(t));
})();
