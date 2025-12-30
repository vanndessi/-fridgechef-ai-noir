
import React, { useState, useEffect } from 'react';
import { ChefHat, UtensilsCrossed, Flame, Soup } from 'lucide-react';

const CookingLoader: React.FC = () => {
  const [step, setStep] = useState(0);
  const messages = [
    "Sourcing the finest data...",
    "Curating the flavor profile...",
    "Infusing with intelligence...",
    "Perfecting the presentation...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-32 animate-in fade-in duration-1000">
      <div className="relative w-32 h-32 mb-12">
        <div className="absolute inset-0 bg-blue-600/10 rounded-full animate-ping opacity-20"></div>
        <div className="absolute inset-4 bg-cyan-500/5 rounded-full border border-cyan-500/20 animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center text-cyan-400">
           {step % 4 === 0 && <ChefHat size={56} className="animate-bounce" />}
           {step % 4 === 1 && <UtensilsCrossed size={56} className="animate-pulse" />}
           {step % 4 === 2 && <Flame size={56} className="animate-pulse text-blue-500" />}
           {step % 4 === 3 && <Soup size={56} className="animate-bounce" />}
        </div>
      </div>
      <h3 className="text-3xl font-serif font-bold text-white mb-4 tracking-tight">
        Developing your palate...
      </h3>
      <p className="text-zinc-500 animate-pulse font-medium tracking-widest uppercase text-xs">
        {messages[step]}
      </p>
    </div>
  );
};

export default CookingLoader;
