```markdown
# KontrolSende

KontrolSende, okul öğrencilerine yönelik bağımlılık farkındalığı, destek kaynakları ve etkinlik duyuruları sunan sade bir statik web sitesidir. İçerikler eğitim amaçlıdır; tıbbi teşhis yerine geçmez.

## Özellikler
- Ana sayfa, etkinlikler sayfası ve bağımlılık kütüphanesi gibi bilgi odaklı sayfalar
- Dinamik etkinlik önizlemeleri (data/events.json'dan yüklenir)
- Her etkinlik için detay sayfası (event-detail.html?slug=...)
- Kısa farkındalık testi (quiz)
- Mobil uyumlu, basit ve erişilebilir tasarım

## Hızlı Başlangıç (yerel geliştirme)
1. Depoyu klonlayın:
```bash
git clone https://github.com/AYEXdws/kontrol-sende2.git
cd kontrol-sende2
```

2. Basit bir yerel sunucu ile çalıştırın:
- Python 3:
```bash
python -m http.server 8000
```
- Node (http-server):
```bash
npx http-server -c-1
```

3. Tarayıcıda açın:
```
http://localhost:8000
```

Not: Dosyaları doğrudan file:// ile açmak bazı tarayıcı kısıtlamaları nedeniyle fetch ile yüklenen verileri (ör. data/events.json) engelleyebilir; bu yüzden HTTP sunucu önerilir.

## Proje yapısı (önemli dosyalar)
- index.html — Ana sayfa
- etkinlikler.html — Tüm etkinlikler listesi
- bagimlilik-bilgi.html — Bağımlılık kütüphanesi / içerik sayfası
- event-detail.html — Etkinlik detay sayfası
- data/events.json — Etkinlik verileri (JSON dizi)
- js/main.js — Site davranışını kontrol eden ana JS dosyası
- css/style.css — Stil dosyası
- LICENSE — MIT lisansı

## Etkinlik ekleme / güncelleme
Etkinlikler `data/events.json` içinde bir dizi (array) olarak tutulur. Basit bir örnek:
```json
{
  "slug": "tiyatro-perde",
  "title": "Perde Tiyatro Oyunu",
  "cover": "https://example.com/cover.jpg",
  "date": "2025-11-05T18:00:00Z",
  "excerpt": "Bağımlılık hakkında farkındalık etkinliği.",
  "content": "<p>Detaylı içerik burada yer alır.</p>",
  "gallery": [
    "https://example.com/img1.jpg",
    "https://example.com/img2.jpg"
  ]
}
```

- `slug`: detay sayfasına bağlantı için benzersiz kısa anahtar
- `date`: ISO 8601 formatlı tarih (isteğe bağlı; sıralama için kullanılır)
- `cover`, `gallery`: görüntü URL'leri
- `content`: HTML içeriği (güvenlik/escape politikanızı göz önünde bulundurun)

## Katkıda Bulunma
- Hataları/istekleri GitHub Issues olarak açın.
- Küçük düzeltmeler için fork → branch → PR workflow'ını kullanın.

## Lisans
Bu proje MIT lisansı altındadır — ayrıntılar LICENSE dosyasında yer almaktadır.

---
```
