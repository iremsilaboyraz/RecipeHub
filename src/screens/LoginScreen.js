import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import COLORS from '../constants/colors';
import SPACING from '../constants/spacing';

const LoginScreen = () => {
  const { login, isLoading } = useAuth();
  const { theme } = useTheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password) {
      Alert.alert('Hata', 'Kullanıcı adı ve şifre boş bırakılamaz');
      return;
    }

    const result = await login(username.trim(), password);
    if (!result.success) {
      Alert.alert('Giriş Başarısız', result.error || 'Bilgilerinizi kontrol ediniz.');
    }
  };

  const s = makeStyles(theme);

  return (
    <KeyboardAvoidingView
      style={s.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={s.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Brand */}
        <View style={s.brandBlock}>
          <View style={s.logoCircle}>
            <Image 
              source={require('../../assets/chef-hat.png')} 
              style={s.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={s.appName}>Lezzetli Tarifler</Text>
          <Text style={s.tagline}>keşfet, pişir, paylaş</Text>
        </View>

        {/* Form */}
        <View style={s.card}>
          {/* Username - LABEL YOK, PLACEHOLDER İÇERDE */}
          <TextInput
            style={s.input}
            placeholder="Kullanıcı Adı"
            placeholderTextColor={theme.placeholder}
            autoCapitalize="none"
            autoCorrect={false}
            value={username}
            onChangeText={setUsername}
            returnKeyType="next"
          />

          {/* Password - LABEL YOK, İKONLAR VAR */}
          <View style={[s.input, s.passwordRow]}>
            <TextInput
              style={s.passwordInput}
              placeholder="Şifre"
              placeholderTextColor={theme.placeholder}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />
            <TouchableOpacity onPress={() => setShowPassword((v) => !v)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={s.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={[s.btn, isLoading && s.btnDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={s.btnText}>Giriş Yap</Text>
            )}
          </TouchableOpacity>

          {/* Demo hint */}
          <TouchableOpacity style={s.hintBox}>
            <Text style={s.hintText}>
              Hesabınız yok mu? <Text style={s.hintBold}>Kayıt Olun</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const makeStyles = (theme) =>
  StyleSheet.create({
    flex: { flex: 1, backgroundColor: theme.background },
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.xl,
    },
    // Brand
    brandBlock: { alignItems: 'center', marginBottom: SPACING.xl },
    logoCircle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#4CAF50',  // Yeşil arka plan (Figma'daki gibi)
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: SPACING.md,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 8,
    },
    logoImage: {
      width: 60,
      height: 60,
    },
    appName: {
      fontSize: 28,
      fontWeight: '800',
      color: theme.text,
      letterSpacing: 0.5,
    },
    tagline: {
      fontSize: 13,
      color: theme.textSecondary,
      marginTop: 4,
    },
    // Card
    card: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      padding: SPACING.lg,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 4,
      gap: SPACING.md,
    },
    // Input (LABEL YOK ARTIK)
    input: {
      backgroundColor: theme.inputBg,
      borderRadius: 12,
      paddingHorizontal: SPACING.md,
      paddingVertical: Platform.OS === 'ios' ? 14 : 12,
      fontSize: 15,
      color: theme.text,
      borderWidth: 1.5,
      borderColor: 'transparent',
    },
    passwordRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 0,
    },
    passwordInput: {
      flex: 1,
      fontSize: 15,
      color: theme.text,
      paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    },
    eyeIcon: { fontSize: 20, paddingRight: 4 },
    // Button
    btn: {
      backgroundColor: '#FF5722',  // Turuncu buton (Figma'daki gibi)
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: SPACING.xs,
      shadowColor: '#FF5722',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    btnDisabled: { opacity: 0.65 },
    btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: 0.4 },
    // Hint
    hintBox: {
      marginTop: SPACING.xs,
      alignItems: 'center',
    },
    hintText: { fontSize: 13, color: theme.textSecondary },
    hintBold: { fontWeight: '700', color: '#FF5722' },
  });

export default LoginScreen;