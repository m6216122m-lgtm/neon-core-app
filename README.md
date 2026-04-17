# 🎮 Neon Core — GitHub Actions ile APK/AAB Build

**Bilgisayar olmadan, sadece telefon ve GitHub kullanarak Android oyunu derleme.**

---

## 📦 Bu Repoda Ne Var?

```
neon-core-repo/
├── www/
│   ├── index.html          ← Oyun
│   └── config.js           ← AdMob ID'leri (DÜZENLE)
├── .github/workflows/
│   └── build-android.yml   ← Otomatik build sistemi
├── package.json            ← Capacitor bağımlılıkları
├── capacitor.config.json   ← Paket adı buradan değişir
└── README.md               ← Bu dosya
```

---

## 🚀 KURULUM — Adım Adım (sıfırdan)

### Adım 1: GitHub Hesabı Aç (5 dk)

1. Telefondan **github.com**'a git
2. **Sign up** → Gmail ile kayıt ol
3. Mail doğrula

### Adım 2: Yeni Repository Oluştur (3 dk)

1. Sağ üst **+** → **New repository**
2. Repository name: `neon-core-app`
3. **Public** seç (Actions ücretsiz)
4. **Create repository**

### Adım 3: Dosyaları Yükle (10 dk)

**Telefon tarayıcısından** repo sayfasında:

1. **Add file → Upload files**
2. Sana verdiğim **tüm dosyaları aynı klasör yapısıyla** yükle:
   - `www/index.html`
   - `www/config.js`
   - `package.json`
   - `capacitor.config.json`
   - `.gitignore`
   - `.github/workflows/build-android.yml`
3. **Commit changes**

> **İpucu:** Telefondan klasör yapısı yüklemek zor olabilir. Bunun için en kolay yol: **Termux** kur, `git clone` ile bilgisayardan oluşturulmuş yapıyı klonla. Ya da **GitHub mobile app** (Play Store'dan indir) ile dosyaları sırayla ekle.

### Adım 4: AdMob ID'lerini Gir (5 dk)

1. Repo'da `www/config.js` dosyasına tıkla
2. Sağ üstte ✏️ (kalem) ikonu ile düzenle
3. Aşağıdaki 3 satırı **kendi AdMob ID'lerinle** değiştir:
```javascript
appId: 'ca-app-pub-SENİN_ID~XXXX',
interstitialId: 'ca-app-pub-SENİN_ID/XXXX',
rewardedId: 'ca-app-pub-SENİN_ID/XXXX',
```
4. Sayfa altında **Commit changes**

### Adım 5: Paket Adını Değiştir (3 dk)

1. `capacitor.config.json` dosyasına tıkla → düzenle
2. `"appId": "com.mustafa.neoncore"` satırındaki **`mustafa`** kısmını kendi adın/markanla değiştir
3. **Commit changes**

> **⚠️ ÖNEMLİ:** Bu paket adı bir kez Play Store'a yüklenince **asla değişmez**. Düşünerek seç.

### Adım 6: İlk Build'i Çalıştır (debug APK için)

1. Repo'nun üstünde **Actions** sekmesi
2. Sol menüde **Build Android APK & AAB**
3. Sağda **Run workflow** → **Run workflow** (yeşil buton)
4. Yaklaşık **5-8 dakika** sürer
5. Yeşil ✓ olunca workflow'a tıkla
6. En altta **Artifacts** → **neon-core-debug-apk** indir
7. Telefonuna kur, AdMob test reklamları görmeli!

---

## 🔑 RELEASE AAB için (Play Store'a yüklenecek imzalı sürüm)

Debug APK çalışıyorsa şimdi **gerçek release AAB** üretelim.

### Adım 7: Keystore Oluştur (sadece bir kez!)

Bu adım için bir bilgisayara veya **Termux**'a ihtiyacın var. Termux ile:

```bash
# Termux'ta
pkg install openjdk-17
keytool -genkey -v \
  -keystore release.jks \
  -keyalg RSA -keysize 2048 \
  -validity 10000 \
  -alias neoncore
```

Sorulara cevap ver:
- Password (parola): **kaydet, kaybetme**
- İsim, şehir, ülke (TR)

### Adım 8: Keystore'u Base64'e Çevir

```bash
base64 release.jks > release.jks.base64
cat release.jks.base64
```
Çıkan uzun metni **kopyala**.

### Adım 9: GitHub Secrets'a Ekle

Repo'da:
1. **Settings → Secrets and variables → Actions**
2. **New repository secret** ile dört tane secret ekle:

| Secret name | Değer |
|-------------|-------|
| `KEYSTORE_BASE64` | Adım 8'de kopyaladığın base64 metni |
| `KEYSTORE_PASSWORD` | keystore parolası |
| `KEY_ALIAS` | `neoncore` |
| `KEY_PASSWORD` | key parolası (genelde keystore ile aynı) |

3. **Add secret**

### Adım 10: Release AAB Build

1. **Actions → Build Android APK & AAB → Run workflow**
2. 5-8 dk sonra **Artifacts → neon-core-release-aab** indir
3. Bu **.aab** dosyasını Google Play Console'a yükle 🎉

---

## 🔄 Güncelleme Yapma (yayından sonra)

1. `www/index.html` veya `config.js`'i düzenle
2. `capacitor.config.json` içindeki versiyonu artır (yoksa `android/app/build.gradle` içinde versionCode'u artır)
3. **Commit changes**
4. Otomatik build başlar
5. Yeni AAB'yi Play Console'a yükle

---

## ❓ Sorun Çözme

### Build başarısız (kırmızı X)
- **Actions → workflow'a tıkla → loglara bak**
- En sık hata: `package.json` dependency sürümleri uyuşmazlığı
- Düzeltme: README'deki sürümleri olduğu gibi koru

### "AdMob App ID not found" hatası
- `config.js`'deki appId'nin başında `ca-app-pub-` olduğundan ve `~` içerdiğinden emin ol

### APK kuruldu ama reklam gelmiyor
- **Test ID'leri ile** "Test Ad" yazısı görünmeli — bu normal
- Gerçek ID'lerle ilk 24-48 saat reklam dolu kalmayabilir, AdMob hesabını ısıtması gerek

### "Workflow won't run"
- Repo Public mi kontrol et (Private repo'larda Actions limiti var)
- Settings → Actions → "Allow all actions" aktif mi

---

## 📞 Yardım

Her adımda takılırsan adım numarasıyla sor.
