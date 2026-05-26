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

Bash
npm install

3.Uygulamayı Başlatın (Metro Cache Temizleyerek):

Bash
npx expo start -c  (Fiziksel cihazınızdan Expo Go uygulaması ile QR kodu taratarak projeyi anlık olarak test edebilirsiniz.)

4. **🔐 Test Kullanıcı BilgileriProjede DummyJSON kimlik doğrulama altyapısı entegre edilmiştir. Giriş ekranında aşağıdaki test kullanıcısını kullanabilirsiniz:Kullanıcı Adı: emilysŞifre: emilyspass💾 AsyncStorage Anahtar ListesiUygulama genelinde kalıcı hale getirilen (persist edilen) veri anahtarları ve tipleri:AnahtarDeğer TipiAçıklama@auth_tokenstring (JWT)Oturum açan kullanıcının kimlik doğrulama tokenı@auth_userJSON (Object)Oturum açan kullanıcının profil detayları@recipe_favoritesJSON (Array)Favorilere eklenen tarif ID listesi@recipe_likedJSON (Array)Beğenilen tariflerin ID listesi@planner_weeklyJSON (Object)Haftalık yemek planı slot verileri (Pzt-Paz)@app_themestring ('light'/'dark')Uygulama geneli aktif tema tercihi🗺️ Klasör YapısıProje mimarisi hocanın gereksinim duyduğu modüler standartlara göre tasarlanmıştır:Plaintext/src
 ├── /components     # Ortak bileşenler (RecipeCard, StepIndicator, vb.)
 ├── /constants      # COLORS, SPACING, ACTION_TYPES, vb. sabitler
 ├── /context        # Auth, Recipe, Planner ve Theme Context dosyaları
 ├── /hooks          # Custom hook'lar (useOptimistic, useAuth, vb.)
 ├── /navigation     # Stack ve Tab Navigator rotaları
 ├── /reducers       # useReducer iş mantığı (recipeReducer, plannerReducer)
 ├── /screens        # Ekran bileşenleri (Sadece layout ve context bağlantısı)
 ├── /services       # API istekleri ve fetch servisleri
 ├── /utils          # Saf yardımcı fonksiyonlar (deriveShoppingList, vb.)
🔄 Context & Reducer Akış DiyagramıPlaintext[Uygulama Başlangıcı] 
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
5. **👥 Proje Ekibi ve Rol DağılımıMelike (Kişi A): Giriş Ekranı, 3-Adımlı Form Yapısı (CreateRecipe), Ayarlar Ekranı, ThemeContext ve Reducer Altyapısı.İrem (Kişi B): Feed Ekranı, Yemek Planlayıcı (Yemek Planı), Alışveriş Listesi (Alışveriş Listesi - Türetilmiş Durum).Batın (Kişi C): RecipeDetail (Tarif Detay), Keşfet/Kategori Listeleme Ekranları ve Profil Sayfası Yönetimi.
