
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import InputForm from './components/InputForm';
import SlidePreview from './components/SlidePreview';
import { PitchDeckInput, GeneratedDeck } from './types';
import { generatePitchDeck } from './geminiService';
import { Sparkles, ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedDeck, setGeneratedDeck] = useState<GeneratedDeck | null>(null);

  const handleGenerate = async (input: PitchDeckInput) => {
    setIsLoading(true);
    try {
      const deck = await generatePitchDeck(input);
      setGeneratedDeck(deck);
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error generating deck:', error);
      alert('Failed to generate your pitch deck. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure? Your current deck content will be lost.')) {
      setGeneratedDeck(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!generatedDeck ? (
          <>
            <Hero />
            <div className="max-w-4xl mx-auto mb-20">
              <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
            </div>
            
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className="p-6 bg-white rounded-2xl border border-slate-200">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">AI Content Crafting</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Our AI analyzes your business idea and generates investor-standard copy tailored for each slide.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-200">
                <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="font-bold">10</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Perfect 10-Slide Structure</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Follow the time-tested deck formula used by the world's most successful startups (Airbnb, Uber, etc).</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-200">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Instant PDF Export</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Download a high-resolution landscape PDF that is ready to be shared with investors or presented on stage.</p>
              </div>
            </section>
          </>
        ) : (
          <div className="pt-12">
            <button 
              onClick={handleReset}
              className="mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Start
            </button>
            <SlidePreview deck={generatedDeck} />
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-slate-500 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-indigo-600 p-1 rounded">
              <span className="text-white text-xs font-bold">CPD</span>
            </div>
            <span className="font-bold text-white">Cyril Pitch Deck</span>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Cyril Pitch Deck. Build Pitch Decks Faster. Smarter.</p>
          <div className="flex justify-center gap-6 mt-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
