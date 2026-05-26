# 🍳 RecipeHub - Tarif & Yemek Planlayıcı

React Native ve Expo kullanılarak geliştirilmiş, useReducer state yönetimi, Context API mimarisi ve gelişmiş optimizasyon teknikleri barındıran çok ekranlı bir Tarif & Yemek Planlayıcı uygulamasıdır.

---

## 🛠️ Kurulum ve Çalıştırma Adımları

Uygulamayı yerel ortamınızda çalıştırmak için aşağıdaki adımları sırasıyla takip edin:

1. **Depoyu Klonlayın:**
   ```bash
   git clone [https://github.com/iremsilaboyraz/RecipeHub.git](https://github.com/iremsilaboyraz/RecipeHub.git)
   cd RecipeHub


2. **Bağımlılıkları Yükleyin:

npm install

3.Uygulamayı Başlatın (Metro Cache Temizleyerek):

npx expo start -c  (Fiziksel cihazınızdan Expo Go uygulaması ile QR kodu taratarak projeyi anlık olarak test edebilirsiniz.)

🔐 Test Kullanıcı Bilgileri
Projede DummyJSON kimlik doğrulama altyapısı entegre edilmiştir. Giriş ekranında aşağıdaki test kullanıcısını kullanabilirsiniz:

Kullanıcı Adı: emilys

Şifre: emilyspass

💾 AsyncStorage Anahtar Listesi
Uygulama genelinde kalıcı hale getirilen (persist edilen) veri anahtarları ve tipleri:
Anahtar,Değer Tipi,Açıklama
@auth_token,string (JWT),Oturum açan kullanıcının kimlik doğrulama tokenı
@auth_user,JSON (Object),Oturum açan kullanıcının profil detayları
@recipe_favorites,JSON (Array),Favorilere eklenen tarif ID listesi
@recipe_liked,JSON (Array),Beğenilen tariflerin ID listesi
@planner_weekly,JSON (Object),Haftalık yemek planı slot verileri (Pzt-Paz)
@app_theme,string ('light'/'dark'),Uygulama geneli aktif tema tercihi

🗺️ Klasör Yapısı
Proje mimarisi hocanın gereksinim duyduğu modüler standartlara göre tasarlanmıştır:
/src
 ├── /components     # Ortak bileşenler (RecipeCard, StepIndicator, vb.)
 ├── /constants      # COLORS, SPACING, ACTION_TYPES, vb. sabitler
 ├── /context        # Auth, Recipe, Planner ve Theme Context dosyaları
 ├── /hooks          # Custom hook'lar (useOptimistic, useAuth, vb.)
 ├── /navigation     # Stack ve Tab Navigator rotaları
 ├── /reducers       # useReducer iş mantığı (recipeReducer, plannerReducer)
 ├── /screens        # Ekran bileşenleri (Sadece layout ve context bağlantısı)
 ├── /services       # API istekleri ve fetch servisleri
 ├── /utils          # Saf yardımcı fonksiyonlar (deriveShoppingList, vb.)

 🔄 Context & Reducer Akış Diyagramı
 [Uygulama Başlangıcı] 
       │
       ▼
[AsyncStorage Kontrolü] ──(Veri Varsa)──► [LOAD_FROM_STORAGE Action] ──► [State Güncellenir]
       │
       ▼
 [Kullanıcı Etkileşimi] (Örn: Beğeni / Tarif Ekleme)
       │
       ├──► 1. [Generic useOptimistic Hook] ──► UI Anında Güncellenir (Hızlı Tepki)
       ├──► 2. [Reducer Dispatch] ────────────► Context State Yönetimi Tetiklenir
       └──► 3. [API Servis Çağrısı] ──────────► (Hata Olursa Rollback Tetiklenir)


👥 Proje Ekibi ve Rol Dağılımı
Melike (Kişi A): Giriş Ekranı, 3-Adımlı Form Yapısı (CreateRecipe), Ayarlar Ekranı, ThemeContext ve Reducer Altyapısı.

İrem (Kişi B): Feed Ekranı, Yemek Planlayıcı (Yemek Planı), Alışveriş Listesi (Alışveriş Listesi - Türetilmiş Durum).

Batın (Kişi C): RecipeDetail (Tarif Detay), Keşfet/Kategori Listeleme Ekranları ve Profil Sayfası Yönetimi.
