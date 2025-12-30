
import React from 'react';
import { ChefHat } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center justify-center py-16 px-4">
      <div className="flex items-center gap-4 mb-3">
        <div className="bg-blue-900 p-3 rounded-2xl text-cyan-400 shadow-lg shadow-cyan-900/20 border border-cyan-800/30">
          <ChefHat size={36} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          FridgeChef <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">AI</span>
        </h1>
      </div>
      <p className="text-zinc-500 text-lg max-w-md text-center font-light tracking-wide">
        Elevated culinary intelligence for the modern kitchen.
      </p>
    </header>
  );
};

export default Header;
