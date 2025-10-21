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

  // --- Farkındalık Testi Mantığı (mevcut quiz kodu korunuyor) ---
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

      // render fonksiyonu (grid elemanını doldur)
      const renderGrid = (grid, list) => {
        if (!grid) return;
        if (!list || !list.length) {
          grid.innerHTML = `<div class="card" style="padding:20px;border-radius:10px;background:var(--white);box-shadow:0 6px 18px rgba(0,0,0,0.04)"><p class="muted">Henüz planlı bir etkinlik yok. Takipte kalın.</p></div>`;
          return;
        }

        // preview için limit (örnek: 3); istersen grid.dataset.limit ile dinamik yapabilirsin
        const limit = grid.classList.contains('preview') ? 3 : list.length;

        grid.innerHTML = list.slice(0, limit).map(ev => {
          const dt = parseDate(ev.date);
          const dateStr = dt ? dt.toLocaleString('tr-TR', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '';
          const cover = ev.cover || 'https://via.placeholder.com/600x400?text=Etkinlik';
          const excerpt = ev.excerpt ? ev.excerpt : '';
          const slug = ev.slug ? encodeURIComponent(ev.slug) : '';
          return `
            <article class="activity-card">
              <img src="${cover}" alt="${ev.title || 'Etkinlik'}">
              <div class="activity-content">
                <h3>${ev.title || 'Başlık yok'}</h3>
                ${dateStr ? `<small style="color:#777;margin-bottom:6px;display:block">${dateStr}</small>` : ''}
                <p>${excerpt}</p>
                <div style="margin-top:auto"><a href="${slug ? 'event-detail.html?slug='+slug : 'etkinlikler.html'}">Detayları Gör</a></div>
              </div>
            </article>
          `;
        }).join('');

        // Eğer preview ve daha fazla etkinlik varsa "Tüm Etkinlikler" butonu ekle
        if (grid.classList.contains('preview') && list.length > limit) {
          grid.insertAdjacentHTML('afterend', `<div style="text-align:center;margin-top:14px"><a href="etkinlikler.html" class="cta-button">Tüm Etkinlikler</a></div>`);
        }
      };

      // Tüm hedef grid'leri doldur
      document.querySelectorAll('.activities-grid[data-source="events"], .activities-grid.preview').forEach(grid => {
        renderGrid(grid, events);
      });

    } catch (err) {
      console.error('Etkinlik yükleme hatası:', err);
      // fallback: tüm hedef grid'lere hata mesajı koy
      document.querySelectorAll('.activities-grid[data-source="events"], .activities-grid.preview').forEach(grid => {
        grid.innerHTML = `<div class="card" style="padding:20px;border-radius:10px;background:var(--white);box-shadow:0 6px 18px rgba(0,0,0,0.04)"><p class="muted">Etkinlik verisi yüklenirken bir hata oluştu.</p></div>`;
      });
    }
  }

  loadAndRenderEvents();

  // Sticky CTA davranışı: hero'dan aşağı inince mobilde göster (opsiyonel)
  const sticky = document.getElementById('sticky-cta');
  const hero = document.querySelector('.hero');
  if (sticky && hero) {
    const checkSticky = () => {
      const heroBottom = hero.getBoundingClientRect().bottom;
      if (heroBottom < 0) {
        sticky.classList.add('visible');
      } else {
        sticky.classList.remove('visible');
      }
    };
    checkSticky();
    window.addEventListener('scroll', () => {
      requestAnimationFrame(checkSticky);
    }, { passive: true });
  }
});
