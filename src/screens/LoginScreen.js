import React, { useState, useContext } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
// src/context klasörünün yerini tam bulması için iki adım geriye (../) çıkıyoruz
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // AuthContext henüz boş olsa bile kodun kırılmaması için güvenli kontrol ekledik
  const auth = useContext(AuthContext);
  const login = auth?.login;
  const loading = auth?.loading || false;

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Lütfen kullanıcı adı ve şifre girin.');
      return;
    }

    if (login) {
      try {
        setErrorMessage('');
        await login(username, password);
        console.log('Giriş başarılı kanka!');
      } catch (error) {
        setErrorMessage(error.message || 'Bir hata oluştu.');
      }
    } else {
      // Eğer İrem henüz context içini doldurmadıysa test için direkt giriş yaptırsın
      if (username === 'emilys' && password === 'emilyspass') {
        console.log('Test Girişi Başarılı!');
      } else {
        setErrorMessage('Kullanıcı adı veya şifre hatalı!');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.innerContainer}
      >
        {/* Üst Kısım: Logo ve Başlıklar */}
        <View style={styles.headerSection}>
          <Image 
            // src/screens içinden assets/images klasörüne tam erişim yolu kanka
            source={require('../../assets/images/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Lezzetli Tarifler</Text>
          <Text style={styles.subtitle}>keşfet , pişir , paylaş</Text>
        </View>

        {/* Orta Kısım: Form Alanları */}
        <View style={styles.formSection}>
          <Text style={styles.inputLabel}>Kullanıcı Adı</Text>
          <TextInput 
            style={styles.input}
            placeholder="Kullanıcı adınızı girin"
            placeholderTextColor="#9E9E9E"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <Text style={styles.inputLabel}>Şifre</Text>
          <TextInput 
            style={styles.input}
            placeholder="Şifrenizi girin"
            placeholderTextColor="#9E9E9E"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />

          {errorMessage ? (
            <Text style={styles.errorText}>⚠️ {errorMessage}</Text>
          ) : null}

          {/* Giriş Yap Butonu */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Giriş Yap</Text>
            )}
          </TouchableOpacity>

          {/* Alt Link */}
          <TouchableOpacity style={styles.registerLink}>
            <Text style={styles.registerText}>
              Hesabınız yok mu? <Text style={styles.registerTextBold}>Kayıt Olun</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 5,
    textAlign: 'center',
  },
  formSection: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#EEEEEE',
    height: 55,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
  },
  errorText: {
    color: '#E53935',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#E64A19',
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#666666',
  },
  registerTextBold: {
    color: '#E64A19',
    fontWeight: 'bold',
  },
});