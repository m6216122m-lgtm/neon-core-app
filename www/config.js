// =====================================================
// NEON CORE - CONFIG DOSYASI
// =====================================================
// Bu dosyayı düzenle, index.html'e DOKUNMA
// AdMob ID'lerini ve Play Games leaderboard ID'sini buraya yaz
// =====================================================

window.GAME_CONFIG = {

    // -----------------------------------------------------
    // 1) ADMOB AYARLARI - https://apps.admob.com adresinden al
    // -----------------------------------------------------
    admob: {
        // App ID (genellikle ~ ile biter)
        // Örnek: 'ca-app-pub-1234567890123456~1234567890'
        appId: 'ca-app-pub-7168645524603352~1601734193',

        // Interstitial Ad Unit ID (oyun aralarında gösterilen tam ekran reklam)
        // Örnek: 'ca-app-pub-1234567890123456/9876543210'
        interstitialId: 'ca-app-pub-7168645524603352/4281536729',

        // Rewarded Ad Unit ID (ödüllü reklam - 2x coin, free coin için)
        // Örnek: 'ca-app-pub-1234567890123456/5555555555'
        rewardedId: 'ca-app-pub-7168645524603352/1633523783',

        // Banner Ad Unit ID (şu an kullanılmıyor, opsiyonel)
        bannerId: 'ca-app-pub-7168645524603352/6958002657'
    },

    // -----------------------------------------------------
    // 2) GOOGLE PLAY GAMES SERVICES (Global Leaderboard)
    // -----------------------------------------------------
    // Play Console > Play Games Services > Leaderboards
    // adresinden leaderboard oluşturup ID'yi buraya yapıştır
    playGames: {
        // Açmak istemiyorsan false yap
        enabled: false,

        // Leaderboard ID (örnek: 'CgkI1abc2defgEAIQAQ')
        // Boş bırakırsan global leaderboard çalışmaz
        leaderboardId: ''
    }
};

// =====================================================
// ⚠️ ÖNEMLİ HATIRLATMALAR:
// =====================================================
// 1. Yukarıdaki ID'ler GOOGLE'IN TEST ID'LERİDİR.
//    Yayına almadan önce KENDİ gerçek ID'lerinle DEĞİŞTİR.
//
// 2. Test ID'leri ile yayına alırsan reklam GELİRİ ALAMAZSIN.
//
// 3. Kendi reklamlarına KESİNLİKLE TIKLAMA - AdMob hesabın
//    KALICI BANLANIR.
// =====================================================
