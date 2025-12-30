
export type MealType = 'Salad' | 'Main Meal' | 'Appetizer';

export interface Ingredient {
  item: string;
  amount: string;
}

export interface Recipe {
  title: string;
  estimatedTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: Ingredient[];
  instructions: string[];
  chefTip?: string;
  imageUrl?: string;
}

export interface AppState {
  ingredients: string[];
  mealType: MealType;
  recipe: Recipe | null;
  isLoading: boolean;
  isImageLoading: boolean;
  error: string | null;
}
