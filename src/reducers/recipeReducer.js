import {
  FETCH_RECIPES_START,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
  LOAD_MORE_SUCCESS,
  LIKE_RECIPE,
  UNLIKE_RECIPE,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  ADD_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  SET_SELECTED_RECIPE,
  RECIPE_LOAD_STORAGE,
} from '../constants/actionTypes';

export const initialRecipeState = {
  recipes: [],
  favorites: [],       // id listesi
  liked: [],           // id listesi
  selectedRecipe: null,
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
};

const recipeReducer = (state, action) => {
  switch (action.type) {

    // ── Fetch ──────────────────────────────────────────────────────────────
    case FETCH_RECIPES_START:
      return { ...state, loading: true, error: null };

    case FETCH_RECIPES_SUCCESS:
      return {
        ...state,
        loading: false,
        recipes: action.payload,
        page: 1,
        hasMore: action.payload.length > 0,
      };

    case FETCH_RECIPES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case LOAD_MORE_SUCCESS: {
      const existingIds = new Set(state.recipes.map((r) => r.id));
      const newRecipes = action.payload.filter((r) => !existingIds.has(r.id));
      return {
        ...state,
        loading: false,
        recipes: [...state.recipes, ...newRecipes],
        page: state.page + 1,
        hasMore: action.payload.length > 0,
      };
    }

    // ── Like / Unlike ──────────────────────────────────────────────────────
    case LIKE_RECIPE:
      if (state.liked.includes(action.payload)) return state;
      return { ...state, liked: [...state.liked, action.payload] };

    case UNLIKE_RECIPE:
      return { ...state, liked: state.liked.filter((id) => id !== action.payload) };

    // ── Favorites ──────────────────────────────────────────────────────────
    case ADD_FAVORITE:
      if (state.favorites.includes(action.payload)) return state;
      return { ...state, favorites: [...state.favorites, action.payload] };

    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((id) => id !== action.payload),
      };

    // ── CRUD ───────────────────────────────────────────────────────────────
    case ADD_RECIPE:
      return { ...state, recipes: [action.payload, ...state.recipes] };

    case UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map((r) =>
          r.id === action.payload.id ? { ...r, ...action.payload } : r
        ),
      };

    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((r) => r.id !== action.payload),
        favorites: state.favorites.filter((id) => id !== action.payload),
        liked: state.liked.filter((id) => id !== action.payload),
      };

    case SET_SELECTED_RECIPE:
      return { ...state, selectedRecipe: action.payload };

    // ── AsyncStorage ───────────────────────────────────────────────────────
    case RECIPE_LOAD_STORAGE:
      return {
        ...state,
        favorites: action.payload.favorites ?? state.favorites,
        liked: action.payload.liked ?? state.liked,
      };

    default:
      return state;
  }
};

export default recipeReducer;