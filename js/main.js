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
            progressBar.style.width = `${progress}%`;

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

        function showResults() {
            quizContainer.style.display = 'none';
            resultContainer.style.display = 'block';
            let resultHTML = '';

            if (userScore <= 4) {
                 resultHTML = `
                    <h2>Dengeli ve Farkında Bir Yaklaşım</h2>
                    <p>Harika! Alışkanlıkların ve duygusal ihtiyaçların arasında sağlıklı bir denge kurmuş görünüyorsun. Kendi değerinin farkındasın ve ilişkilerini bu temel üzerine inşa ediyorsun. Bu farkındalığını korumak ve çevrendekilere de ilham vermek çok değerli.</p>
                    <a href="etkinlikler.html" class="cta-button">Projelerimize Göz At</a>
                `;
            } else if (userScore <= 9) {
                resultHTML = `
                    <h2>Güçlü Bağlar ve Arayışlar</h2>
                    <p>İnsanlarla derin bağlar kurmayı ve seni heyecanlandıran dünyalara dalmayı seviyorsun. Bu, harika bir özellik! Bazen bu arayışta dengeyi kaçırdığını hissedebilirsin. Hangi davranışının hangi ihtiyacını karşıladığını fark etmek, kontrolü elinde tutmanın ilk adımıdır.</p>
                    <a href="yardim.html" class="cta-button">Destek Noktaları</a>
                `;
            } else {
                resultHTML = `
                    <h2>Yoğun Duygular ve Yüksek Beklentiler</h2>
                    <p>Duyguları yoğun yaşayan ve ilişkilerinde yüksek bir bağlılık arayan bir yapın var. Bu durum, bazen kendini veya sorumluluklarını ihmal etmene neden olabilir. Unutma, en önemli ilişki kendinle kurduğun ilişkidir. Kendine şefkat göstermek ve destek aramak, seni daha da güçlendirir.</p>
                    <a href="yardim.html" class="cta-button secondary">Yalnız Değilsin, Destek Al</a>
                `;
            }
            resultContainer.innerHTML = resultHTML;
        }

        nextBtn.addEventListener('click', () => {
            const selectedOption = document.querySelector('.option.selected');
            if (!selectedOption) {
                alert('Lütfen bir seçenek belirleyin.');
                return;
            }

            userScore += parseInt(selectedOption.dataset.score);
            currentQuestionIndex++;

            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                showResults();
            }
        });

        displayQuestion();
    }
});
/* ====  ETKİNLİK VERİLERİ (statik)  ==== */
window.EVENTS = [
  {
    slug: "afis-tasarim",
    title: "Afiş Tasarım Yarışması",
    cover: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=1200",
    excerpt: "Öğrencilerimizin gözünden bağımlılık temasını işleyen yaratıcı afişler.",
    // Detay sayfasında kullanılacak içerik:
    content: `
      <p>Okul çapında düzenlediğimiz afiş yarışmasında, bağımlılık ve farkındalık teması yaratıcı biçimde işlendi.</p>
      <p>Jüri değerlendirmesi sonucunda ilk 10 çalışma sergilenmiştir. Bu çalışmalar, okul koridorlarında ve panolarda yer aldı.</p>
    `,
    gallery: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200"
    ]
  },
  {
    slug: "yesilay-seminer",
    title: "Yeşilay ile Seminer",
    cover: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200",
    excerpt: "Uzmanlar eşliğinde bilinçlendirici ve interaktif bir seminer.",
    content: `
      <p>Yeşilay uzmanları ile yaptığımız seminerde, tütün, alkol ve dijital bağımlılığın temel mekanizmaları anlatıldı.</p>
      <p>Öğrenciler soru-cevap bölümünde aktif şekilde katkı sundu.</p>
    `,
    gallery: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200"
    ]
  },
  {
    slug: "tiyatro-perde",
    title: "“Perde” Tiyatro Oyunu",
    cover: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200",
    excerpt: "Bağımlılığın sosyal etkilerini konu alan sahne performansı.",
    content: `
      <p>Okul tiyatro kulübümüzün hazırladığı “Perde” oyunu yoğun ilgi gördü.</p>
      <p>Oyun, bir gencin içsel yolculuğunu ve akran etkisini ele aldı.</p>
    `,
    gallery: [
      "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?w=1200"
    ]
  }
     {
    slug: "tiyatro-perde",
    title: "“deneme” denme",
    cover: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200",
    excerpt: "deneme uzun metin.",
    content: `
      <p>paragraf 1 deneme.</p>
      <p>paragraf 2 deneme.</p>
    `,
    gallery: [
      "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?w=1200"
    ]
  }
];

/* ====  ETKİNLİKLER SAYFASI: kartları üret  ==== */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.activities-grid[data-source="events"]');
  if (!grid || !Array.isArray(window.EVENTS)) return;

  grid.innerHTML = window.EVENTS.map(ev => `
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

/* ====  DETAY SAYFASI: içeriği doldur  ==== */
document.addEventListener('DOMContentLoaded', () => {
  const detailRoot = document.getElementById('event-detail-root');
  if (!detailRoot) return;

  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  const ev = (window.EVENTS || []).find(x => x.slug === slug);

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
});
