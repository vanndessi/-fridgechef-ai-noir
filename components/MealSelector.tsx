
import React from 'react';
import { MealType } from '../types';

interface Props {
  selected: MealType;
  onChange: (type: MealType) => void;
}

const MealSelector: React.FC<Props> = ({ selected, onChange }) => {
  const types: MealType[] = ['Salad', 'Main Meal', 'Appetizer'];

  return (
    <div className="space-y-4">
      <span className="block text-xs font-bold text-zinc-400 uppercase tracking-widest">Cuisine Type</span>
      <div className="grid grid-cols-3 gap-4">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={`
              py-4 px-2 rounded-2xl text-sm font-semibold transition-all duration-300 border
              ${selected === type 
                ? 'bg-blue-600 text-white border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]' 
                : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300'}
            `}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MealSelector;
