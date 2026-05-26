# 🍳 RecipeHub - Tarif & Yemek Planlayıcı

React Native ve Expo kullanılarak geliştirilmiş, çok ekranlı bir Tarif & Yemek Planlayıcı uygulamasıdır.  
Projede Context API, useReducer state yönetimi ve gelişmiş optimizasyon teknikleri kullanılmıştır.

---

# 🚀 Kurulum ve Çalıştırma

## 1️⃣ Repoyu Klonlayın

```bash
git clone https://github.com/iremsilaboyraz/RecipeHub.git
cd RecipeHub
2️⃣ Bağımlılıkları Yükleyin
npm install
3️⃣ Uygulamayı Başlatın
npx expo start -c

📱 Daha sonra Expo Go uygulaması ile QR kodu okutarak projeyi çalıştırabilirsiniz.

🔐 Test Kullanıcı Bilgileri
Kullanıcı Adı	Şifre
emilys	emilyspass
💾 AsyncStorage Yapısı

Projede kullanılan bazı AsyncStorage anahtarları:

@auth_user_JSON
@recipe_favorites_JSON
@planner_weekly_JSON
@app_theme
📁 Proje Klasör Yapısı
src/
│
├── components/
├── constants/
├── context/
├── hooks/
├── navigation/
├── reducers/
├── screens/
├── services/
└── utils/
🔄 Context & Reducer Akışı
UI İşlemi
   ↓
Custom Hook
   ↓
Reducer Dispatch
   ↓
API Servisi
   ↓
Context Güncellemesi
   ↓
Ekranın Yenilenmesi
👥 Proje Ekibi
👩 Melike
Giriş ekranı
3 adımlı form yapısı
Ayarlar ekranı
ThemeContext ve reducer altyapısı
👩 İrem
Feed ekranı
Yemek planlayıcı
Alışveriş listesi
👨 Batın
RecipeDetail
Keşfet/Kategori ekranları
Profil sayfası

Knk senin şu anki görüntüde en büyük sorunlar:
- Başlık boyutları karışık
- Kod blokları düzgün kapanmamış
- Liste yapıları yok
- Her şey bitişik durmuş
- ` ```bash ` kullanımı eksik bazı yerlerde

Bunu direkt README.md’ye yapıştırırsan çok daha profesyonel görünür ✨
