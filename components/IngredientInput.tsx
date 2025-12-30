
import React, { useState, KeyboardEvent } from 'react';
import { X, Plus, Utensils } from 'lucide-react';

interface Props {
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
}

const IngredientInput: React.FC<Props> = ({ ingredients, setIngredients }) => {
  const [inputValue, setInputValue] = useState('');

  const addIngredient = () => {
    const trimmed = inputValue.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addIngredient();
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-2">
        <Utensils size={14} className="text-cyan-500" />
        Inventory
      </label>
      
      <div className="relative group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add an ingredient..."
          className="w-full px-5 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all outline-none text-white placeholder:text-zinc-600"
        />
        <button
          onClick={addIngredient}
          className="absolute right-3 top-3 p-2 bg-cyan-950 text-cyan-400 rounded-xl hover:bg-cyan-900 transition-colors border border-cyan-800/30"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        {ingredients.map((ingredient, index) => (
          <span
            key={index}
            className="flex items-center gap-2 px-4 py-2 bg-blue-950/40 text-cyan-100 rounded-full text-sm font-medium border border-cyan-900/50 animate-in fade-in zoom-in duration-300 shadow-[0_0_15px_rgba(8,145,178,0.1)]"
          >
            {ingredient}
            <button
              onClick={() => removeIngredient(index)}
              className="text-cyan-700 hover:text-cyan-400 transition-colors"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        {ingredients.length === 0 && (
          <p className="text-zinc-700 text-sm italic py-2">The fridge is empty...</p>
        )}
      </div>
    </div>
  );
};

export default IngredientInput;
