
import React, { useState } from 'react';
import { Sparkles, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import Header from './components/Header';
import IngredientInput from './components/IngredientInput';
import MealSelector from './components/MealSelector';
import RecipeCard from './components/RecipeCard';
import CookingLoader from './components/CookingLoader';
import { AppState, MealType } from './types';
import { generateRecipe, generateRecipeImage } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    ingredients: [],
    mealType: 'Main Meal',
    recipe: null,
    isLoading: false,
    isImageLoading: false,
    error: null,
  });

  const handleGenerate = async () => {
    if (state.ingredients.length === 0) {
      setState(prev => ({ ...prev, error: "Select your ingredients to begin." }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null, recipe: null }));
    
    try {
      const recipe = await generateRecipe(state.ingredients, state.mealType);
      
      setState(prev => ({ 
        ...prev, 
        recipe, 
        isLoading: false, 
        isImageLoading: true 
      }));

      // Fire and forget image generation to show it when ready
      generateRecipeImage(recipe.title, state.ingredients).then((imageUrl) => {
        setState(prev => {
          if (prev.recipe) {
            return {
              ...prev,
              recipe: { ...prev.recipe, imageUrl },
              isImageLoading: false
            };
          }
          return { ...prev, isImageLoading: false };
        });
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isImageLoading: false,
        error: err.message || "The kitchen is currently busy. Please try again." 
      }));
    }
  };

  const resetForm = () => {
    setState(prev => ({
      ...prev,
      recipe: null,
      error: null
    }));
  };

  const updateIngredients = (newIngredients: string[]) => {
    setState(prev => ({ ...prev, ingredients: newIngredients, error: null }));
  };

  const updateMealType = (type: MealType) => {
    setState(prev => ({ ...prev, mealType: type }));
  };

  return (
    <div className="min-h-screen bg-black pb-32 selection:bg-cyan-500 selection:text-black">
      <Header />

      <main className="max-w-3xl mx-auto px-6">
        {state.isLoading ? (
          <CookingLoader />
        ) : state.recipe ? (
          <div className="space-y-10">
            <div className="flex justify-between items-center px-2">
              <button 
                onClick={resetForm}
                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all font-bold text-xs uppercase tracking-widest"
              >
                <ArrowLeft size={16} />
                Edit Inventory
              </button>
              <button 
                onClick={handleGenerate}
                className="flex items-center gap-2 text-cyan-500 hover:text-cyan-300 transition-all font-bold text-xs uppercase tracking-widest"
              >
                <RefreshCw size={16} />
                Regenerate
              </button>
            </div>
            
            <RecipeCard recipe={state.recipe} isImageLoading={state.isImageLoading} />
          </div>
        ) : (
          <div className="bg-zinc-950 rounded-[3rem] p-10 md:p-14 border border-zinc-900 shadow-2xl shadow-blue-900/10 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <IngredientInput 
              ingredients={state.ingredients} 
              setIngredients={updateIngredients} 
            />

            <MealSelector 
              selected={state.mealType} 
              onChange={updateMealType} 
            />

            {state.error && (
              <div className="p-5 bg-red-950/20 border border-red-900/50 text-red-400 rounded-2xl flex items-center gap-3 text-sm font-medium">
                <AlertCircle size={18} />
                {state.error}
              </div>
            )}

            <div className="pt-6">
              <button
                onClick={handleGenerate}
                disabled={state.ingredients.length === 0}
                className={`
                  w-full py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all duration-500
                  ${state.ingredients.length > 0 
                    ? 'bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:scale-[1.02] hover:shadow-cyan-500/20' 
                    : 'bg-zinc-900 text-zinc-700 cursor-not-allowed border border-zinc-800'}
                `}
              >
                <Sparkles size={18} />
                Generate Creation
              </button>
              <p className="text-center text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] mt-8">
                Powered by Gemini 3 Flash • Tailored to your taste
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-3xl mx-auto px-6 mt-32 text-center border-t border-zinc-900 pt-16">
        <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.4em]">
          &copy; {new Date().getFullYear()} FridgeChef AI • Noir Collection
        </p>
      </footer>
    </div>
  );
};

export default App;
