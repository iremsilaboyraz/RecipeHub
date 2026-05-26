/**
 * Form validation utility functions
 */

// Validate email format
export const validateEmail = (email) => {
  if (!email) return { valid: false, error: 'E-posta boş bırakılamaz' };
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Geçersiz e-posta formatı' };
  }
  
  return { valid: true, error: null };
};

// Validate username
export const validateUsername = (username) => {
  if (!username || !username.trim()) {
    return { valid: false, error: 'Kullanıcı adı boş bırakılamaz' };
  }
  
  if (username.length < 3) {
    return { valid: false, error: 'Kullanıcı adı en az 3 karakter olmalı' };
  }
  
  if (username.length > 20) {
    return { valid: false, error: 'Kullanıcı adı en fazla 20 karakter olabilir' };
  }
  
  return { valid: true, error: null };
};

// Validate password
export const validatePassword = (password) => {
  if (!password) {
    return { valid: false, error: 'Şifre boş bırakılamaz' };
  }
  
  if (password.length < 6) {
    return { valid: false, error: 'Şifre en az 6 karakter olmalı' };
  }
  
  return { valid: true, error: null };
};

// Validate recipe title
export const validateRecipeTitle = (title) => {
  if (!title || !title.trim()) {
    return { valid: false, error: 'Tarif adı boş bırakılamaz' };
  }
  
  if (title.length < 3) {
    return { valid: false, error: 'Tarif adı en az 3 karakter olmalı' };
  }
  
  if (title.length > 100) {
    return { valid: false, error: 'Tarif adı en fazla 100 karakter olabilir' };
  }
  
  return { valid: true, error: null };
};

// Validate ingredients array
export const validateIngredients = (ingredients) => {
  if (!ingredients || !Array.isArray(ingredients)) {
    return { valid: false, error: 'Malzeme listesi geçersiz' };
  }
  
  const nonEmpty = ingredients.filter((ing) => ing && ing.trim());
  if (nonEmpty.length === 0) {
    return { valid: false, error: 'En az bir malzeme girmelisiniz' };
  }
  
  return { valid: true, error: null };
};

// Validate instructions array
export const validateInstructions = (instructions) => {
  if (!instructions || !Array.isArray(instructions)) {
    return { valid: false, error: 'Hazırlanış adımları geçersiz' };
  }
  
  const nonEmpty = instructions.filter((step) => step && step.trim());
  if (nonEmpty.length === 0) {
    return { valid: false, error: 'En az bir hazırlanış adımı girmelisiniz' };
  }
  
  return { valid: true, error: null };
};

// Validate positive number
export const validatePositiveNumber = (value, fieldName = 'Değer') => {
  if (value === null || value === undefined || value === '') {
    return { valid: false, error: `${fieldName} boş bırakılamaz` };
  }
  
  const num = Number(value);
  if (isNaN(num)) {
    return { valid: false, error: `${fieldName} sayı olmalı` };
  }
  
  if (num <= 0) {
    return { valid: false, error: `${fieldName} pozitif olmalı` };
  }
  
  return { valid: true, error: null };
};

// Validate recipe form (all fields)
export const validateRecipeForm = (formData) => {
  const errors = {};
  
  // Title
  const titleValidation = validateRecipeTitle(formData.title);
  if (!titleValidation.valid) errors.title = titleValidation.error;
  
  // Ingredients
  const ingredientsValidation = validateIngredients(formData.ingredients);
  if (!ingredientsValidation.valid) errors.ingredients = ingredientsValidation.error;
  
  // Instructions
  const instructionsValidation = validateInstructions(formData.steps);
  if (!instructionsValidation.valid) errors.instructions = instructionsValidation.error;
  
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};