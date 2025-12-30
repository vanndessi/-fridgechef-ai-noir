
import React from 'react';
import { Clock, ChefHat, Lightbulb, Share2, ImageIcon } from 'lucide-react';
import { Recipe } from '../types';

interface Props {
  recipe: Recipe;
  isImageLoading?: boolean;
}

const RecipeCard: React.FC<Props> = ({ recipe, isImageLoading }) => {
  return (
    <div className="bg-zinc-950 rounded-[2.5rem] border border-zinc-800 shadow-2xl shadow-cyan-900/10 overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-700">
      {/* Visual Recipe Image */}
      <div className="relative w-full aspect-video bg-zinc-900 flex items-center justify-center overflow-hidden">
        {recipe.imageUrl ? (
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full h-full object-cover animate-in fade-in duration-1000"
          />
        ) : isImageLoading ? (
          <div className="flex flex-col items-center gap-4 text-cyan-500/50">
            <div className="w-12 h-12 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
            <span className="text-xs font-black uppercase tracking-widest animate-pulse">Visualizing Dish...</span>
          </div>
        ) : (
          <div className="text-zinc-800 flex flex-col items-center gap-2">
            <ImageIcon size={48} />
            <span className="text-xs uppercase tracking-widest font-bold">Image Unavailable</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
      </div>

      {/* Premium Dark Header */}
      <div className="bg-gradient-to-br from-blue-900 to-black px-8 py-12 text-white relative border-b border-zinc-800">
        <div className="absolute top-6 right-8 opacity-5 text-cyan-400">
          <ChefHat size={140} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
              Chef de Cuisine AI
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-serif leading-tight tracking-tight text-white">
            {recipe.title}
          </h2>
          
          <div className="flex flex-wrap gap-8 text-sm font-medium text-zinc-400">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-cyan-500" />
              <span>{recipe.estimatedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat size={18} className="text-cyan-500" />
              <span className="capitalize">{recipe.difficulty} Level</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-12 space-y-16">
        {/* Ingredients Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white font-serif flex items-center gap-3">
              Mise en Place
            </h3>
            <div className="h-[1px] flex-grow ml-6 bg-zinc-800" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipe.ingredients.map((ing, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800/50 group hover:border-cyan-900/50 transition-colors">
                <span className="font-medium text-zinc-300 group-hover:text-white transition-colors">{ing.item}</span>
                <span className="text-cyan-400 font-bold bg-zinc-950 px-3 py-1 rounded-xl border border-zinc-800 text-xs">
                  {ing.amount}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Instructions Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white font-serif flex items-center gap-3">
              The Process
            </h3>
            <div className="h-[1px] flex-grow ml-6 bg-zinc-800" />
          </div>
          <div className="space-y-8">
            {recipe.instructions.map((step, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-zinc-900 text-cyan-400 flex items-center justify-center font-black text-sm border border-zinc-800 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-500 shadow-lg">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-zinc-400 leading-relaxed pt-2 group-hover:text-zinc-200 transition-colors duration-500">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Chef Tip */}
        {recipe.chefTip && (
          <div className="bg-blue-950/20 rounded-[2rem] p-8 border border-blue-900/30 flex gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] -mr-16 -mt-16" />
            <Lightbulb className="text-cyan-400 flex-shrink-0" size={28} />
            <div className="relative z-10">
              <h4 className="font-black text-cyan-500 text-xs mb-2 uppercase tracking-[0.2em]">Gastronomy Note</h4>
              <p className="text-zinc-300 text-lg italic font-serif leading-relaxed">{recipe.chefTip}</p>
            </div>
          </div>
        )}

        <div className="flex justify-center pt-8">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 text-zinc-600 hover:text-cyan-400 transition-all text-sm font-bold uppercase tracking-widest px-6 py-3 border border-zinc-900 rounded-full hover:border-cyan-900"
          >
            <Share2 size={16} />
            Capture Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
