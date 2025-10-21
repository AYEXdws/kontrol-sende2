document.addEventListener('DOMContentLoaded', () => {
  // Mobil menü mantığı
  const hamburger = document.getElementById('hamburger-menu');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // --- Farkındalık Testi Mantığı ---
  const quizContainer = document.getElementById('quiz-container');
  if (quizContainer) {
    const questions = [
      {
        question: "Zor bir günün ardından rahatlamak için ilk aklına gelen şey nedir?",
        answers: [
          { text: "Biriyle konuşmak veya yürüyüşe çıkmak.", score: 0 },
          { text: "Müzik dinlemek veya bir şeyler izlemek.", score: 1 },
          { text: "Saatlerce sosyal medyada gezinmek veya oyun oynamak.", score: 2 },
          { text: "Canım sıkkın olduğunda ne yaptığımı pek düşünmem.", score: 3 }
        ]
      },
      {
        question: "Bir arkadaşın mesajına hemen cevap vermediğinde ne hissedersin?",
        answers: [
          { text: "Müsait olduğunda döneceğini bilir, sakince beklerim.", score: 0 },
          { text: "Biraz endişelenirim ama aklıma takmamaya çalışırım.", score: 1 },
          { text: "Kötü bir şey olduğunu düşünüp sürekli telefonumu kontrol ederim.", score: 2 },
          { text: "Bana değer vermediğini düşünür, üzülürüm.", score: 3 }
        ]
      },
      {
        question: "Yeni bir diziye başladığında veya oyun aldığında uyku düzenin nasıl etkilenir?",
        answers: [
          { text: "Uyku saatlerime sadık kalırım, ertesi gün devam ederim.", score: 0 },
          { text: "Biraz geciktiririm ama abartmam.", score: 1 },
          { text: "Sık sık 'bir bölüm daha' diyerek uykusuz kalırım.", score: 2 },
          { text: "Bitirene kadar uyumadığım olur.", score: 3 }
        ]
      },
      {
        question: "Sosyal çevrenle planların, dijitaldeki bir aktivite (örn: online oyun turnuvası) yüzünden iptal olur mu?",
        answers: [
          { text: "Asla, gerçek hayattaki planlarım önceliklidir.", score: 0 },
          { text: "Nadiren, çok önemli bir şeyse olabilir.", score: 1 },
          { text: "Bazen arkadaşlarımı ekmek zorunda kalırım.", score: 2 },
          { text: "Sıklıkla dijital aktiviteleri tercih ederim.", score: 3 }
        ]
      },
      {
        question: "Kendini değerli hissetmek için neye ihtiyaç duyarsın?",
        answers: [
          { text: "Kendi hedeflerime ulaştığımda kendimi değerli hissederim.", score: 0 },
          { text: "Arkadaşlarımın ve ailemin sevgisine.", score: 1 },
          { text: "Sosyal medyada aldığım beğenilere ve yorumlara.", score: 2 },
          { text: "Belirli bir kişinin (arkadaş, sevgili) ilgisine ve onayına.", score: 3 }
        ]
      }
    ];

    let currentQuestionIndex = 0;
    let userScore = 0;

    const questionContainer = document.getElementById('question-container');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const resultContainer = document.getElementById('result-container');

    function displayQuestion() {
      const currentQuestion = questions[currentQuestionIndex];
      const progress = ((currentQuestionIndex) / questions.length) * 100;
      if (progressBar) progressBar.style.width = `${progress}%`;

      if (questionContainer) {
        questionContainer.innerHTML = `
          <p>${currentQuestion.question}</p>
          <div class="options">
            ${currentQuestion.answers.map((answer) => `
              <button class="option" data-score="${answer.score}">${answer.text}</button>
            `).join('')}
          </div>
        `;

        document.querySelectorAll('.option').forEach(option => {
          option.addEventListener('click', (e) => {
            document.querySelectorAll('.option').forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');
          });
        });
      }
    }

    function showResults() {
      if (quizContainer) quizContainer.style.display = 'none';
      if (resultContainer) resultContainer.style.display = 'block';
      let resultHTML = '';

      if (userScore <= 4) {
        resultHTML = `
          <h2>Dengeli ve Farkında Bir Yaklaşım</h2>
          <p>Harika! Alışkanlıkların ve duygusal ihtiyaçların arasında sağlıklı bir denge kurmuş görünüyorsun.</p>
          <a href="etkinlikler.html" class="cta-button">Projelerimize Göz At</a>
        `;
      } else if (userScore <= 9) {
        resultHTML = `
          <h2>Güçlü Bağlar ve Arayışlar</h2>
          <p>İnsanlarla derin bağlar kurmayı ve seni heyecanlandıran dünyalara dalmayı seviyorsun. Bazen bu arayışta dengeyi kaçırdığını fark edebilirsin.</p>
          <a href="yardim.html" class="cta-button">Destek Noktaları</a>
        `;
      } else {
        resultHTML = `
          <h2>Yoğun Duygular ve Yüksek Beklentiler</h2>
          <p>Duyguları yoğun yaşayan ve ilişkilerinde yüksek bir bağlılık arayan bir yapın var. Bu durum zaman zaman zorluk yaratabilir.</p>
          <a href="yardim.html" class="cta-button secondary">Yalnız Değilsin, Destek Al</a>
        `;
      }

      if (resultContainer) resultContainer.innerHTML = resultHTML;
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const selectedOption = document.querySelector('.option.selected');
        if (!selectedOption) {
          alert('Lütfen bir seçenek belirleyin.');
          return;
        }

        userScore += parseInt(selectedOption.dataset.score, 10);
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
          displayQuestion();
        } else {
          showResults();
        }
      });
    }

    displayQuestion();
  }

  // ==== Etkinlik verisini fetch ile yükle ve sayfalara render et =====
  async function loadAndRenderEvents() {
    try {
      const res = await fetch('data/events.json');
      if (!res.ok) throw new Error('Etkinlik verisi yüklenemedi');
      const events = await res.json();

      // Eğer etkinlik objesinde tarih alanı varsa, ISO string beklenir (ör: "2025-11-01T18:00:00Z")
      const parseDate = (d) => {
        try {
          const dt = d ? new Date(d) : null;
          return dt && !isNaN(dt) ? dt : null;
        } catch (e) {
          return null;
        }
      };

      // Tarihe göre artan (yaklaşan) sıralama; tarih yoksa sona at
      events.sort((a, b) => {
        const da = parseDate(a.date);
        const db = parseDate(b.date);
        if (da && db) return da - db;
        if (da && !db) return -1;
        if (!da && db) return 1;
        return 0;
      });

      window.EVENTS = events; // global referans, gerekirse kullanılabilir

      // 1) Listeleri doldur (tüm sayfalardaki grid'ler için)
      document.querySelectorAll('.activities-grid[data-source="events"]').forEach(grid => {
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

      // 2) Eğer detay sayfasındaysak, detay içeriğini doldur
      const detailRoot = document.getElementById('event-detail-root');
      if (detailRoot) {
        const params = new URLSearchParams(location.search);
        const slug = params.get('slug');
        const ev = events.find(x => x.slug === slug);

        const titleEl = document.getElementById('event-title');
        const coverEl = document.getElementById('event-cover');
        const bodyEl  = document.getElementById('event-body');
        const galEl   = document.getElementById('event-gallery');

        if (!ev) {
          if (titleEl) titleEl.textContent = "Etkinlik bulunamadı";
          if (bodyEl) bodyEl.innerHTML = "<p class='muted'>Aradığınız etkinlik kaldırılmış veya taşınmış olabilir.</p>";
          if (coverEl) coverEl.style.display = 'none';
          return;
        }

        if (titleEl) titleEl.textContent = ev.title;
        if (coverEl) coverEl.style.backgroundImage = `url('${ev.cover}')`;
        if (bodyEl) bodyEl.innerHTML = ev.content || "";

        if (galEl) {
          const pics = ev.gallery || [];
          galEl.innerHTML = pics.length
            ? pics.map(src => `<img src="${src}" alt="${ev.title} görseli">`).join('')
            : `<div class="muted">Galeri içeriği yakında.</div>`;
        }
      }

    } catch (err) {
      console.error('Etkinlik yükleme hatası:', err);
    }
  }

  loadAndRenderEvents();

 // sticky kontrol bloğunun bulunduğu yere şu mantığı ekleyin:
const sticky = document.getElementById('sticky-cta');
const hero = document.querySelector('.hero');

if (sticky && document.body.classList.contains('page-bagimlilik')) {
  // Bağımlılık sayfasında sticky tamamen devre dışı
  sticky.classList.remove('visible');
  sticky.style.display = 'none';
} else if (sticky && hero && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sticky.classList.remove('visible');
      } else {
        sticky.classList.add('visible');
      }
    });
  }, { root: null, threshold: 0.05 });
  // Gözlemi kısa bir gecikmeyle başlat (layout otursun)
  setTimeout(() => io.observe(hero), 80);
} else if (sticky && hero) {
  // fallback scroll kontrolü
  const checkSticky = () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom < 0) sticky.classList.add('visible');
    else sticky.classList.remove('visible');
  };
  window.addEventListener('load', () => setTimeout(checkSticky, 120));
  window.addEventListener('scroll', () => requestAnimationFrame(checkSticky), { passive: true });
}
    // observe the hero after a tiny timeout so layout/images settle
    setTimeout(() => io.observe(hero), 80);
  } else if (sticky && hero) {
    const checkSticky = () => {
      const heroBottom = hero.getBoundingClientRect().bottom;
      if (heroBottom < 0) sticky.classList.add('visible');
      else sticky.classList.remove('visible');
    };
    window.addEventListener('load', () => setTimeout(checkSticky, 120));
    window.addEventListener('scroll', () => requestAnimationFrame(checkSticky), { passive: true });
  }

});
