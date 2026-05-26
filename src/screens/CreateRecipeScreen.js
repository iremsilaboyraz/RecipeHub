import React, { useReducer, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useRecipe } from '../context/RecipeContext';
import StepIndicator from '../components/StepIndicator';
import SPACING from '../constants/spacing';
import {
  FORM_SET_FIELD,
  FORM_NEXT_STEP,
  FORM_PREV_STEP,
  FORM_ADD_INGREDIENT,
  FORM_REMOVE_INGREDIENT,
  FORM_ADD_STEP,
  FORM_REMOVE_STEP,
  FORM_RESET,
  FORM_SUBMIT_START,
  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_FAILURE,
} from '../constants/actionTypes';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Form State & Reducer ─────────────────────────────────────────────────────
const initialFormState = {
  currentStep: 1,
  totalSteps: 3,
  isSubmitting: false,
  submitError: null,
  title: '',
  category: 'Kahvaltı',
  difficulty: 'Orta',
  servings: 4,
  prepTime: '',
  cookTime: '',
  calories: '',
  ingredients: [{ amount: '', name: '' }, { amount: '', name: '' }, { amount: '', name: '' }],
  steps: [''],
};

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_SET_FIELD:
      return { ...state, [action.payload.field]: action.payload.value };
    case FORM_NEXT_STEP:
      if (state.currentStep >= state.totalSteps) return state;
      return { ...state, currentStep: state.currentStep + 1 };
    case FORM_PREV_STEP:
      if (state.currentStep <= 1) return state;
      return { ...state, currentStep: state.currentStep - 1 };
    case FORM_ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, { amount: '', name: '' }] };
    case FORM_REMOVE_INGREDIENT:
      if (state.ingredients.length <= 1) return state;
      return { ...state, ingredients: state.ingredients.filter((_, i) => i !== action.payload) };
    case FORM_ADD_STEP:
      return { ...state, steps: [...state.steps, ''] };
    case FORM_REMOVE_STEP:
      if (state.steps.length <= 1) return state;
      return { ...state, steps: state.steps.filter((_, i) => i !== action.payload) };
    case FORM_SUBMIT_START:
      return { ...state, isSubmitting: true, submitError: null };
    case FORM_SUBMIT_SUCCESS:
      return { ...initialFormState };
    case FORM_SUBMIT_FAILURE:
      return { ...state, isSubmitting: false, submitError: action.payload };
    case FORM_RESET:
      return { ...initialFormState };
    default:
      return state;
  }
};

// ─── Validation (Yukarı Taşındı ki ReferenceError Çıkmasın!) ──────────────────
const validateStep = (step, state) => {
  if (step === 1) {
    if (!state.title.trim()) {
      Alert.alert('Eksik Alan', 'Tarif başlığı boş bırakılamaz.');
      return false;
    }
  }
  if (step === 2) {
    const hasIngredient = state.ingredients.some((i) => i.name.trim());
    if (!hasIngredient) {
      Alert.alert('Eksik Alan', 'En az bir malzeme girmelisin.');
      return false;
    }
  }
  if (step === 3) {
    const hasStep = state.steps.some((s) => s.trim());
    if (!hasStep) {
      Alert.alert('Eksik Alan', 'En az bir talimat adımı girmelisin.');
      return false;
    }
  }
  return true;
};

// ─── Step 1: Temel Bilgiler ───────────────────────────────────────────────────
const StepOne = ({ state, dispatch, theme, goNext }) => {
  const s = stepStyles(theme);
  const difficulties = ['Kolay', 'Orta', 'Zor'];

  const setField = (field, value) =>
    dispatch({ type: FORM_SET_FIELD, payload: { field, value } });

  return (
    <ScrollView style={s.stepScroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <Text style={s.stepIndicatorLabel}>Adım 1 / 3: Temel Bilgiler</Text>

      <TextInput
        style={s.figmaInput}
        placeholder="Tarif Başlığı*"
        placeholderTextColor="#A0A0A0"
        value={state.title}
        onChangeText={(v) => setField('title', v)}
      />
      <Text style={s.figmaSubLabel}>örn: Kremalı Mantarlı Makarna</Text>

      <View style={s.figmaInputWrapper}>
        <TextInput
          style={s.figmaInputInside}
          placeholder="Mutfak Türü*"
          placeholderTextColor="#A0A0A0"
          value={state.category}
          onChangeText={(v) => setField('category', v)}
        />
        <Text style={s.dropdownIcon}>v</Text>
      </View>
      <Text style={s.figmaSubLabel}>seçiniz</Text>

      <Text style={s.sectionLabel}>Zorluk Seviyesi*</Text>
      <View style={s.chipRow}>
        {difficulties.map((d) => (
          <TouchableOpacity
            key={d}
            style={[s.chip, state.difficulty === d && s.chipActive]}
            onPress={() => setField('difficulty', d)}
          >
            <Text style={[s.chipText, state.difficulty === d && s.chipTextActive]}>{d}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={s.row2}>
        <TextInput
          style={[s.figmaInput, s.col]}
          placeholder="Hazırlık Süresi (dk)"
          placeholderTextColor="#A0A0A0"
          value={state.prepTime}
          onChangeText={(v) => setField('prepTime', v)}
          keyboardType="numeric"
        />
        <TextInput
          style={[s.figmaInput, s.col]}
          placeholder="Pişirme Süresi (dk)"
          placeholderTextColor="#A0A0A0"
          value={state.cookTime}
          onChangeText={(v) => setField('cookTime', v)}
          keyboardType="numeric"
        />
      </View>

      <View style={s.row2}>
        <TextInput
          style={[s.figmaInput, s.col]}
          placeholder="Kalori (kcal)"
          placeholderTextColor="#A0A0A0"
          value={state.calories}
          onChangeText={(v) => setField('calories', v)}
          keyboardType="numeric"
        />
        <View style={[s.col, s.stepperContainer]}>
          <Text style={s.stepperLabel}>Porsiyon</Text>
          <View style={s.stepperBox}>
            <TouchableOpacity 
              style={s.stepperBtn} 
              onPress={() => setField('servings', Math.max(1, parseInt(state.servings) - 1))}
            >
              <Text style={s.stepperBtnText}>-</Text>
            </TouchableOpacity>
            <Text style={s.stepperValue}>{state.servings}</Text>
            <TouchableOpacity 
              style={s.stepperBtn} 
              onPress={() => setField('servings', parseInt(state.servings) + 1)}
            >
              <Text style={s.stepperBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity style={s.figmaPrimaryBtn} onPress={goNext}>
        <Text style={s.figmaPrimaryBtnText}>İleri</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// ─── Step 2: Malzemeler ───────────────────────────────────────────────────────
const StepTwo = ({ state, dispatch, theme, goNext, goPrev }) => {
  const s = stepStyles(theme);

  const updateIngredient = (index, field, value) => {
    const updated = state.ingredients.map((ing, i) =>
      i === index ? { ...ing, [field]: value } : ing
    );
    dispatch({ type: FORM_SET_FIELD, payload: { field: 'ingredients', value: updated } });
  };

  return (
    <ScrollView style={s.stepScroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <Text style={s.stepIndicatorLabel}>Adım 2 / 3: Malzemeler</Text>

      <View style={s.ingredientHeader}>
        <Text style={s.ingredientLabelLeft}>Malzeme Adı</Text>
        <Text style={s.ingredientLabelRight}>Miktar</Text>
      </View>

      {state.ingredients.map((ing, idx) => (
        <View key={idx} style={s.ingredientRow}>
          <TextInput
            style={[s.figmaInput, s.ingredientNameInput]}
            value={ing.name}
            onChangeText={(v) => updateIngredient(idx, 'name', v)}
          />
          <TextInput
            style={[s.figmaInput, s.ingredientAmountInput]}
            value={ing.amount}
            onChangeText={(v) => updateIngredient(idx, 'amount', v)}
          />
          {state.ingredients.length > 1 && (
            <TouchableOpacity
              style={s.removeBtnInside}
              onPress={() => dispatch({ type: FORM_REMOVE_INGREDIENT, payload: idx })}
            >
              <Text style={s.removeBtnText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity style={s.addBtn} onPress={() => dispatch({ type: FORM_ADD_INGREDIENT })}>
        <Text style={s.addBtnText}>+ Malzeme Ekle</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.figmaPrimaryBtn} onPress={goNext}>
        <Text style={s.figmaPrimaryBtnText}>İleri</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.figmaSecondaryBtn} onPress={goPrev}>
        <Text style={s.figmaSecondaryBtnText}>Geri</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// ─── Step 3: Talimatlar ───────────────────────────────────────────────────────
const StepThree = ({ state, dispatch, theme, handleSubmit, goPrev }) => {
  const s = stepStyles(theme);

  const updateStep = (index, value) => {
    const updated = state.steps.map((st, i) => (i === index ? value : st));
    dispatch({ type: FORM_SET_FIELD, payload: { field: 'steps', value: updated } });
  };

  return (
    <ScrollView style={s.stepScroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <Text style={s.stepIndicatorLabel}>Adım 3 / 3: Talimatlar</Text>

      {state.steps.map((step, idx) => (
        <View key={idx} style={s.stepRow}>
          <Text style={s.stepNumber}>{idx + 1}</Text>
          <View style={{ flex: 1 }}>
            <TextInput
              style={s.figmaTextArea}
              value={step}
              onChangeText={(v) => updateStep(idx, v)}
              multiline
              textAlignVertical="top"
            />
            <Text style={s.charCounter}>{step.length}/300</Text>
          </View>
          {state.steps.length > 1 && (
            <TouchableOpacity
              style={s.removeBtnInside}
              onPress={() => dispatch({ type: FORM_REMOVE_STEP, payload: idx })}
            >
              <Text style={s.removeBtnText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity style={s.addBtn} onPress={() => dispatch({ type: FORM_ADD_STEP })}>
        <Text style={s.addBtnText}>+ Talimat Ekle</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[s.figmaPrimaryBtn, s.submitBtnColor]} 
        onPress={handleSubmit}
        disabled={state.isSubmitting}
      >
        {state.isSubmitting ? (
          <ActivityIndicator color="#FFF" size="small" />
        ) : (
          <Text style={s.figmaPrimaryBtnText}>Tarifi Yayınla</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={s.figmaSecondaryBtn} onPress={goPrev}>
        <Text style={s.figmaSecondaryBtnText}>Geri</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const CreateRecipeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { addRecipe } = useRecipe();
  const s = makeStyles(theme);

  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const targetX = -(state.currentStep - 1) * SCREEN_WIDTH;
    Animated.spring(slideAnim, {
      toValue: targetX,
      useNativeDriver: true,
      speed: 13,
      bounciness: 3,
    }).start();
  }, [state.currentStep]);

  const goNext = useCallback(() => {
    if (!validateStep(state.currentStep, state)) return;
    dispatch({ type: FORM_NEXT_STEP });
  }, [state]);

  const goPrev = useCallback(() => {
    dispatch({ type: FORM_PREV_STEP });
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!validateStep(3, state)) return;
    dispatch({ type: FORM_SUBMIT_START });

    const recipe = {
      name: state.title,
      category: state.category,
      difficulty: state.difficulty,
      servings: parseInt(state.servings, 10) || 2,
      prepTimeMinutes: parseInt(state.prepTime, 10) || 0,
      cookTimeMinutes: parseInt(state.cookTime, 10) || 0,
      caloriesPerServing: parseInt(state.calories, 10) || 0,
      ingredients: state.ingredients
        .filter((i) => i.name.trim())
        .map((i) => `${i.amount} ${i.name}`.trim()),
      instructions: state.steps.filter((s) => s.trim()),
    };

    try {
      await new Promise((res) => setTimeout(res, 600));
      addRecipe(recipe);
      dispatch({ type: FORM_SUBMIT_SUCCESS });
      Alert.alert('Harika! 🎉', 'Tarifiniz başarıyla eklendi.', [
        { text: 'Tamam', onPress: () => navigation?.goBack?.() },
      ]);
    } catch (e) {
      dispatch({ type: FORM_SUBMIT_FAILURE, payload: e.message });
    }
  }, [state, addRecipe, navigation]);

  const STEP_LABELS = ['Temel Bilgiler', 'Malzemeler', 'Talimatlar'];

  return (
    <KeyboardAvoidingView style={s.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header */}
      <View style={s.header}>
        <View style={{ width: 24 }} />
        <Text style={s.headerTitle}>Tarif Oluştur</Text>
        <TouchableOpacity onPress={() => Alert.alert('Sıfırla', 'Form temizlensin mi?', [{ text: 'İptal' }, { text: 'Evet', onPress: () => dispatch({ type: FORM_RESET }) }])}>
          <Text style={s.resetIcon}>↺</Text>
        </TouchableOpacity>
      </View>

      <StepIndicator currentStep={state.currentStep} totalSteps={state.totalSteps} labels={STEP_LABELS} />

      <Animated.View style={[s.stepsContainer, { width: SCREEN_WIDTH * state.totalSteps, transform: [{ translateX: slideAnim }] }]}>
        <View style={s.stepPanel}>
          <StepOne state={state} dispatch={dispatch} theme={theme} goNext={goNext} />
        </View>
        <View style={s.stepPanel}>
          <StepTwo state={state} dispatch={dispatch} theme={theme} goNext={goNext} goPrev={goPrev} />
        </View>
        <View style={s.stepPanel}>
          <StepThree state={state} dispatch={dispatch} theme={theme} handleSubmit={handleSubmit} goPrev={goPrev} />
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

// ─── Figma Paket Tasarım CSS Dünyası ──────────────────────────────────────────
const stepStyles = (theme) =>
  StyleSheet.create({
    stepScroll: { flex: 1, paddingHorizontal: 24, paddingTop: 10 },
    stepIndicatorLabel: { fontSize: 15, fontWeight: '600', color: '#555', marginBottom: 20 },
    figmaInput: {
      backgroundColor: '#F2F2F2',
      borderRadius: 14,
      paddingHorizontal: 16,
      height: 52,
      fontSize: 15,
      color: '#333',
    },
    figmaInputWrapper: {
      backgroundColor: '#F2F2F2',
      borderRadius: 14,
      height: 52,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    figmaInputInside: { flex: 1, fontSize: 15, color: '#333' },
    dropdownIcon: { color: '#888', fontSize: 14, fontWeight: 'bold' },
    figmaSubLabel: { fontSize: 11, color: '#8A8A8A', paddingLeft: 12, marginTop: 4, marginBottom: 18 },
    sectionLabel: { fontSize: 15, fontWeight: 'bold', color: '#666', marginBottom: 12 },
    chipRow: { flexDirection: 'row', gap: 10, marginBottom: 24, backgroundColor: '#F2F2F2', padding: 4, borderRadius: 14 },
    chip: { flex: 1, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    chipActive: { backgroundColor: '#FFF', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
    chipText: { fontSize: 13, fontWeight: '600', color: '#666' },
    chipTextActive: { color: '#E64A19', fontWeight: 'bold' },
    row2: { flexDirection: 'row', gap: 12, marginBottom: 16 },
    col: { flex: 1 },
    stepperContainer: { alignItems: 'center' },
    stepperLabel: { fontSize: 12, color: '#666', marginBottom: 4 },
    stepperBox: { flexDirection: 'row', backgroundColor: '#F2F2F2', borderRadius: 14, height: 52, alignItems: 'center', paddingHorizontal: 8 },
    stepperBtn: { width: 36, height: 36, backgroundColor: '#E0E0E0', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    stepperBtnText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    stepperValue: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: '#333' },
    ingredientHeader: { flexDirection: 'row', marginBottom: 8 },
    ingredientLabelLeft: { flex: 2, fontSize: 13, fontWeight: '600', color: '#555' },
    ingredientLabelRight: { flex: 1, fontSize: 13, fontWeight: '600', color: '#555', paddingLeft: 10 },
    ingredientRow: { flexDirection: 'row', gap: 12, marginBottom: 12, alignItems: 'center' },
    ingredientNameInput: { flex: 2 },
    ingredientAmountInput: { flex: 1 },
    stepRow: { flexDirection: 'row', gap: 12, marginBottom: 8, alignItems: 'flex-start' },
    stepNumber: { fontSize: 15, fontWeight: 'bold', color: '#333', marginTop: 12 },
    figmaTextArea: { backgroundColor: '#F2F2F2', borderRadius: 14, padding: 16, minHeight: 110, fontSize: 15, color: '#333' },
    charCounter: { fontSize: 11, color: '#888', textAlign: 'right', marginTop: 4, marginRight: 8 },
    removeBtnInside: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#FFCDD2', justifyContent: 'center', alignItems: 'center' },
    removeBtnText: { color: '#B71C1C', fontSize: 11, fontWeight: 'bold' },
    addBtn: { marginVertical: 16, height: 48, borderRadius: 14, borderWidth: 2, borderColor: '#FF7043', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center' },
    addBtnText: { color: '#FF7043', fontWeight: 'bold', fontSize: 14 },
    figmaPrimaryBtn: { backgroundColor: '#FF5722', height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center', marginTop: 24, shadowColor: '#FF5722', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 },
    figmaPrimaryBtnText: { color: '#FFF', fontSize: 17, fontWeight: 'bold' },
    figmaSecondaryBtn: { height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginTop: 12, borderWidth: 1.5, borderColor: '#E0E0E0', backgroundColor: '#FFF' },
    figmaSecondaryBtnText: { color: '#666', fontSize: 15, fontWeight: '600' },
    submitBtnColor: { backgroundColor: '#E64A19' },
  });

const makeStyles = (theme) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: '#FFF' },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingTop: Platform.OS === 'ios' ? 50 : 20,
      paddingBottom: 12,
      backgroundColor: '#FFF',
    },
    headerTitle: { fontSize: 20, fontWeight: '700', color: '#2D2D2D', textAlign: 'center', flex: 1 },
    resetIcon: { fontSize: 22, color: '#888' },
    stepsContainer: { flex: 1, flexDirection: 'row' },
    stepPanel: { width: SCREEN_WIDTH, flex: 1 },
  });

export default CreateRecipeScreen;