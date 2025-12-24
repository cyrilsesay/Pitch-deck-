
import React from 'react';
import { Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="pt-16 pb-12 text-center bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          <span>New: AI-Powered Pitch Generation</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
          Turn Your Startup Ideas into <span className="text-indigo-600">Powerful Pitch Decks</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          The simplest way for founders, students, and NGOs to generate professional 10-slide investor decks in minutes.
        </p>
      </div>
    </section>
  );
};

export default Hero;
