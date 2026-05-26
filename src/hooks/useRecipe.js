import { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

/**
 * Custom hook to access RecipeContext
 */
const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipe must be used within RecipeProvider');
  }
  return context;
};

export default useRecipe;