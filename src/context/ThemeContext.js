import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOGGLE_THEME, SET_THEME, THEME_LOAD_STORAGE } from '../constants/actionTypes';

// ─── Storage Key ─────────────────────────────────────────────────────────────
const THEME_KEY = '@app_theme';

// ─── Theme Palettes ──────────────────────────────────────────────────────────
export const lightTheme = {
  mode: 'light',
  background: '#F9F5F0',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  primary: '#E8563A',
  secondary: '#F5A623',
  text: '#1A1A1A',
  textSecondary: '#6B6B6B',
  border: '#E5E0D8',
  inputBg: '#F0EBE3',
  placeholder: '#AAAAAA',
  shadow: '#00000020',
  success: '#27AE60',
  error: '#E74C3C',
  tabBar: '#FFFFFF',
  tabBarBorder: '#E5E0D8',
};

export const darkTheme = {
  mode: 'dark',
  background: '#121212',
  surface: '#1E1E1E',
  card: '#252525',
  primary: '#FF6B4A',
  secondary: '#F5A623',
  text: '#F0F0F0',
  textSecondary: '#A0A0A0',
  border: '#2E2E2E',
  inputBg: '#2A2A2A',
  placeholder: '#666666',
  shadow: '#00000060',
  success: '#2ECC71',
  error: '#E74C3C',
  tabBar: '#1A1A1A',
  tabBarBorder: '#2E2E2E',
};

// ─── Initial State ───────────────────────────────────────────────────────────
const initialState = {
  isDark: false,
  theme: lightTheme,
};

// ─── Reducer ─────────────────────────────────────────────────────────────────
const themeReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_THEME: {
      const isDark = !state.isDark;
      return { isDark, theme: isDark ? darkTheme : lightTheme };
    }
    case SET_THEME: {
      const isDark = action.payload === 'dark';
      return { isDark, theme: isDark ? darkTheme : lightTheme };
    }
    case THEME_LOAD_STORAGE: {
      const isDark = action.payload === 'dark';
      return { isDark, theme: isDark ? darkTheme : lightTheme };
    }
    default:
      return state;
  }
};

// ─── Context ─────────────────────────────────────────────────────────────────
const ThemeContext = createContext(null);

// ─── Provider ────────────────────────────────────────────────────────────────
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Load saved theme on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_KEY);
        if (saved) {
          dispatch({ type: THEME_LOAD_STORAGE, payload: saved });
        }
      } catch (e) {
        console.warn('ThemeContext load error:', e);
      }
    };
    loadTheme();
  }, []);

  // Persist theme whenever it changes
  useEffect(() => {
    const persist = async () => {
      try {
        await AsyncStorage.setItem(THEME_KEY, state.isDark ? 'dark' : 'light');
      } catch (e) {
        console.warn('ThemeContext persist error:', e);
      }
    };
    persist();
  }, [state.isDark]);

  const toggleTheme = useCallback(() => {
    dispatch({ type: TOGGLE_THEME });
  }, []);

  const setTheme = useCallback((mode) => {
    dispatch({ type: SET_THEME, payload: mode });
  }, []);

  const value = {
    ...state,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
};

export default ThemeContext;