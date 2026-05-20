import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      alert('Lütfen tüm alanları doldurun kanka!');
      return;
    }
    alert(`Giriş Başarılı! Hoş geldin, ${username}!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Şef Şapkası Logosu */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/icon.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        
        {/* Başlıklar */}
        <Text style={styles.title}>Lezzetli Tarifler</Text>
        <Text style={styles.subtitle}>keşfet, pişir, paylaş</Text>

        {/* Input Alanları */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Kullanıcı Adı</Text>
          <TextInput 
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Kullanıcı adınızı girin"
            placeholderTextColor="#999"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Şifre</Text>
          <TextInput 
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Şifrenizi girin"
            placeholderTextColor="#999"
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        {/* Giriş Butonu */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>

        {/* Kayıt Ol Linki */}
        <TouchableOpacity style={styles.registerLink}>
          <Text style={styles.registerText}>
            Hesabınız yok mu? <Text style={styles.registerHighlight}>Kayıt Ol</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Figma'daki o tatlı krem/beyaz arka plan
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  logoContainer: {
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 35,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
    color: '#333',
    // Hafif gölge efekti (Figma'daki gibi temiz dursun diye)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#E64A19', // O meşhur iştah açıcı Figma turuncusu
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    // Buton gölgesi
    shadowColor: '#E64A19',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 25,
    padding: 10,
  },
  registerText: {
    fontSize: 15,
    color: '#555',
  },
  registerHighlight: {
    color: '#E64A19',
    fontWeight: 'bold',
  },
});