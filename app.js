(function () {
  document.documentElement.classList.add('js');

  /* ===== DATA (본인 정보로 수정하세요) ===== */
  var ROLES = ['프론트엔드 개발자', 'UI/UX 엔지니어', '디자인 시스템 빌더', '웹 성능 최적화 전문가'];

  var SKILLS = [
    { name: 'JavaScript / TypeScript', level: 92 },
    { name: 'React / Next.js', level: 90 },
    { name: 'Vue / Nuxt', level: 78 },
    { name: 'HTML / CSS / 접근성', level: 95 },
    { name: '디자인 시스템 / Storybook', level: 85 },
    { name: '성능 최적화 / 테스트', level: 80 }
  ];

  var CHIPS = ['React', 'TypeScript', 'Next.js', 'Vue', 'Vite', 'Zustand', 'React Query', 'Storybook', 'Jest', 'Playwright', 'Figma', 'Git'];

  var PROJECTS = [
    { title: '커머스 어드민 대시보드', desc: '주문·재고·정산을 한 화면에서 관리하는 B2B 어드민. 렌더링 최적화로 초기 로딩 40% 단축.', tags: ['React', 'TypeScript', 'Chart.js'], cat: 'web', label: 'Web App' },
    { title: '사내 디자인 시스템 Vibe UI', desc: '40여 개 컴포넌트와 토큰 체계를 구축하고 5개 서비스에 일괄 적용.', tags: ['Storybook', 'CSS', 'Figma'], cat: 'design', label: 'Design System' },
    { title: '피트니스 트래킹 앱', desc: '운동 기록과 통계를 보여주는 하이브리드 모바일 앱. 오프라인 동기화 지원.', tags: ['React Native', 'SQLite'], cat: 'mobile', label: 'Mobile' },
    { title: '실시간 협업 보드', desc: '여러 명이 동시에 편집하는 칸반 보드. WebSocket 기반 실시간 반영.', tags: ['Vue', 'WebSocket', 'Pinia'], cat: 'web', label: 'Web App' },
    { title: '접근성 개선 프로젝트', desc: 'WCAG 2.1 AA 기준으로 공공 서비스 UI를 전면 개선하고 가이드 문서 작성.', tags: ['A11y', 'HTML', 'CSS'], cat: 'design', label: 'Design System' },
    { title: '배달 주문 모바일 앱', desc: '지도 기반 가게 탐색과 주문 결제 흐름을 설계하고 구현.', tags: ['Flutter', 'REST API'], cat: 'mobile', label: 'Mobile' }
  ];

  var TIMELINE = [
    { date: '2023.03 — 현재', title: '시니어 프론트엔드 개발자', org: '(주)테크스타트', desc: '프론트엔드 팀 리드. 디자인 시스템 구축과 웹 성능 개선을 주도했습니다.' },
    { date: '2021.01 — 2023.02', title: '프론트엔드 개발자', org: '(주)웹크리에이티브', desc: 'React 기반 커머스 플랫폼 개발. 결제 플로우 개선으로 전환율 18% 상승.' },
    { date: '2019.06 — 2020.12', title: '주니어 개발자', org: '(주)픽셀랩', desc: '기업 웹사이트와 이벤트 페이지를 제작하며 웹 표준과 반응형 개발을 익혔습니다.' },
    { date: '2015.03 — 2019.02', title: '컴퓨터공학 학사', org: '한국대학교', desc: '웹 프로그래밍, 자료구조, HCI를 공부했습니다.' }
  ];

  /* ===== HELPERS ===== */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ===== THEME ===== */
  var themeBtn = $('#themeToggle');
  function applyTheme(t) {
    if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    if (themeBtn) themeBtn.textContent = t === 'dark' ? 'LIGHT' : 'DARK';
  }
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  applyTheme(saved === 'dark' ? 'dark' : 'light');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ===== MOBILE MENU ===== */
  var menu = $('#menu');
  var burger = $('#burger');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.textContent = open ? 'CLOSE' : 'MENU';
    });
    $$('[data-link]').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        burger.textContent = 'MENU';
      });
    });
  }

  /* ===== TYPING ===== */
  var typingEl = $('#typing');
  if (typingEl) {
    if (reduceMotion) {
      typingEl.textContent = ROLES[0];
    } else {
      var ri = 0, ci = 0, deleting = false;
      (function tick() {
        var word = ROLES[ri];
        if (!deleting) {
          ci++;
          typingEl.textContent = word.slice(0, ci);
          if (ci === word.length) { deleting = true; return setTimeout(tick, 1600); }
          return setTimeout(tick, 90);
        }
        ci--;
        typingEl.textContent = word.slice(0, ci);
        if (ci === 0) { deleting = false; ri = (ri + 1) % ROLES.length; return setTimeout(tick, 400); }
        setTimeout(tick, 45);
      })();
    }
  }

  /* ===== SKILLS ===== */
  var skillsGrid = $('#skillsGrid');
  if (skillsGrid) {
    skillsGrid.innerHTML = SKILLS.map(function (s) {
      return '<div class="skill reveal"><div class="skill-head"><span>' + esc(s.name) + '</span><span>' + s.level +
        '%</span></div><div class="bar"><i data-level="' + s.level + '"></i></div></div>';
    }).join('');
  }
  var chips = $('#chips');
  if (chips) {
    chips.innerHTML = CHIPS.map(function (c) { return '<span class="chip">' + esc(c) + '</span>'; }).join('');
  }

  /* ===== PROJECTS ===== */
  var grid = $('#projectGrid');
  function renderProjects(filter) {
    if (!grid) return;
    var list = PROJECTS.filter(function (p) { return filter === 'all' || p.cat === filter; });
    grid.innerHTML = list.map(function (p, i) {
      var no = (i + 1 < 10 ? '0' : '') + (i + 1);
      return '<a href="#" class="p-row" style="animation-delay:' + (i * 0.05) + 's">' +
        '<span class="p-no">' + no + '</span>' +
        '<div class="p-main"><h3>' + esc(p.title) + '</h3><p>' + esc(p.desc) + '</p></div>' +
        '<div class="tags">' + p.tags.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
        '<span class="p-cat">' + esc(p.label) + '</span>' +
        '<span class="card-link">자세히</span></a>';
    }).join('');
    $$('.p-row', grid).forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); });
    });
  }
  renderProjects('all');
  $$('.filter').forEach(function (btn) {
    btn.addEventListener('click', function () {
      $$('.filter').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      renderProjects(btn.getAttribute('data-filter'));
    });
  });

  /* ===== TIMELINE ===== */
  var tl = $('#timeline');
  if (tl) {
    tl.innerHTML = TIMELINE.map(function (t) {
      return '<div class="t-item reveal"><div class="t-date">' + esc(t.date) + '</div><h3>' + esc(t.title) +
        '</h3><h4>' + esc(t.org) + '</h4><p>' + esc(t.desc) + '</p></div>';
    }).join('');
  }

  /* ===== REVEAL / BARS / COUNTERS ===== */
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (reduceMotion) { el.textContent = target; return; }
    var start = null, dur = 1200;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function showAll() {
    $$('.reveal').forEach(function (el) { el.classList.add('visible'); });
    $$('.bar i').forEach(function (b) { b.style.width = b.getAttribute('data-level') + '%'; });
    $$('[data-count]').forEach(animateCount);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.classList.add('visible');
        var bar = $('.bar i', el);
        if (bar) bar.style.width = bar.getAttribute('data-level') + '%';
        io.unobserve(el);
      });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(function (el) { io.observe(el); });

    var counted = false;
    var statsEl = $('.stats');
    if (statsEl) {
      var io2 = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !counted) {
          counted = true;
          $$('[data-count]').forEach(animateCount);
          io2.disconnect();
        }
      }, { threshold: 0.4 });
      io2.observe(statsEl);
    }
  } else {
    showAll();
  }

  /* ===== PROGRESS + SCROLL SPY + TOP ===== */
  var progress = $('#progress');
  var sections = $$('main section[id]');
  var links = $$('[data-link]');
  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    var current = '';
    sections.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var toTop = $('#toTop');
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ===== TOAST ===== */
  var toast = $('#toast');
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3000);
  }

  /* ===== FORM ===== */
  var form = $('#contactForm');
  var errorEl = $('#formError');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#name').value.trim();
      var email = $('#email').value.trim();
      var msg = $('#message').value.trim();
      var err = '';
      if (name.length < 2) err = '이름을 2자 이상 입력해주세요.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) err = '올바른 이메일 주소를 입력해주세요.';
      else if (msg.length < 10) err = '메시지를 10자 이상 입력해주세요.';
      if (errorEl) errorEl.textContent = err;
      if (err) return;
      form.reset();
      showToast('메시지가 전송되었습니다. 곧 답장드릴게요!');
    });
  }

  /* ===== YEAR ===== */
  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();