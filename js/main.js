document.addEventListener('DOMContentLoaded', () => {
  // Mobil menü mantığı (daha dayanıklı)
  const hamburger = document.getElementById('hamburger-menu');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    const toggleMenu = (e) => {
      try {
        e && e.preventDefault && e.preventDefault();
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('nav-open');
      } catch (err) {
        console.error('Menu toggle error:', err);
      }
    };

    hamburger.addEventListener('pointerdown', toggleMenu);
    hamburger.addEventListener('click', toggleMenu);
  }

  // --- Farkındalık Testi Mantığı (değişmedi, korundu) ---
  const quizContainer = document.getElementById('quiz-container');
  if (quizContainer) {
    // ... mevcut quiz kodu burada aynı şekilde korunur ...
    // (kopyala yapıştır ile orijinal quiz içeriğini koruyun)
  }

  // ==== Etkinlik verisini fetch ile yükle ve sayfalara render et =====
  async function loadAndRenderEvents() {
    try {
      const res = await fetch('data/events.json');
      if (!res.ok) throw new Error('Etkinlik verisi yüklenemedi');
      const events = await res.json();

      window.EVENTS = events; // global referans

      // Hem data-source olanları hem de .preview sınıflı grid'leri doldur
      document.querySelectorAll('.activities-grid[data-source="events"], .activities-grid.preview').forEach(grid => {
        grid.innerHTML = events.map(ev => `
          <article class="activity-card">
            <img src="${ev.cover}" alt="${ev.title}">
            <div class="activity-content">
              <h3>${ev.title}</h3>
              <p>${ev.excerpt}</p>
              <a href="event-detail.html?slug=${encodeURIComponent(ev.slug)}">Detayları Gör</a>
            </div>
          </article>
        `).join('');
      });

    } catch (err) {
      console.error('Etkinlik yükleme hatası:', err);
    }
  }

  loadAndRenderEvents();

  // Sticky CTA davranışı: hero'dan aşağı inince mobilde göster
  const sticky = document.getElementById('sticky-cta');
  const hero = document.querySelector('.hero');
  if (sticky && hero) {
    const heroBottom = () => hero.getBoundingClientRect().bottom;
    const checkSticky = () => {
      if (heroBottom() < 0) {
        sticky.classList.add('visible');
      } else {
        sticky.classList.remove('visible');
      }
    };
    // başlangıç kontrolü ve scroll listener
    checkSticky();
    window.addEventListener('scroll', () => {
      requestAnimationFrame(checkSticky);
    }, { passive: true });
  }

});
