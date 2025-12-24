
import React, { useRef } from 'react';
import { GeneratedDeck, SlideContent } from '../types';
import { Download, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface SlidePreviewProps {
  deck: GeneratedDeck;
}

const Slide: React.FC<{ slide: SlideContent; slideIndex: number; total: number; id: string }> = ({ slide, slideIndex, total, id }) => {
  return (
    <div 
      id={id}
      className="bg-white aspect-[16/9] w-full p-12 flex flex-col slide-shadow border border-slate-200 relative overflow-hidden"
    >
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        {slideIndex === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h2 className="text-6xl font-black text-slate-900 mb-4 tracking-tight">{slide.title}</h2>
            {slide.subtitle && <p className="text-2xl text-indigo-600 font-semibold">{slide.subtitle}</p>}
            <div className="mt-12 h-1 w-24 bg-indigo-600"></div>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-2 block">Slide {slideIndex + 1}</span>
              <h3 className="text-4xl font-extrabold text-slate-900">{slide.title}</h3>
            </div>
            
            <div className="flex-1">
              <ul className="space-y-6">
                {slide.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="mt-2.5 w-2 h-2 rounded-full bg-indigo-600 flex-shrink-0"></div>
                    <p className="text-xl text-slate-700 leading-relaxed font-medium">{bullet}</p>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        
        <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center text-slate-400 text-sm italic">
          <span>Cyril Pitch Deck – Turning Ideas into Pitch-Ready Decks</span>
          <span>{slideIndex + 1} / {total}</span>
        </div>
      </div>
    </div>
  );
};

const SlidePreview: React.FC<SlidePreviewProps> = ({ deck }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isExporting, setIsExporting] = React.useState(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    try {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1280, 720]
      });

      for (let i = 0; i < deck.slides.length; i++) {
        const slideEl = document.getElementById(`export-slide-${i}`);
        if (!slideEl) continue;
        
        const canvas = await html2canvas(slideEl, {
          scale: 2, // Higher resolution
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });
        
        const imgData = canvas.toDataURL('image/png');
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, 0, 1280, 720);
      }

      pdf.save(`${deck.startupName.replace(/\s+/g, '_')}_Pitch_Deck.pdf`);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Your Pitch Deck is Ready!</h2>
          <p className="text-slate-500">Preview the generated slides below and download your PDF.</p>
        </div>
        <button
          onClick={handleDownloadPDF}
          disabled={isExporting}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
        >
          {isExporting ? <span className="animate-spin">⌛</span> : <Download className="w-5 h-5" />}
          {isExporting ? "Exporting PDF..." : "Download as PDF"}
        </button>
      </div>

      {/* Slide Viewer */}
      <div className="max-w-5xl mx-auto space-y-4">
        <Slide 
          slide={deck.slides[currentSlide]} 
          slideIndex={currentSlide} 
          total={deck.slides.length} 
          id="preview-display"
        />
        
        <div className="flex items-center justify-center gap-6">
          <button 
            onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            className="p-2 rounded-full border border-slate-200 hover:bg-white transition-colors disabled:opacity-30"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex gap-1.5">
            {deck.slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentSlide ? 'bg-indigo-600 w-8' : 'bg-slate-300'}`}
              />
            ))}
          </div>

          <button 
            onClick={() => setCurrentSlide(prev => Math.min(deck.slides.length - 1, prev + 1))}
            disabled={currentSlide === deck.slides.length - 1}
            className="p-2 rounded-full border border-slate-200 hover:bg-white transition-colors disabled:opacity-30"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Grid Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 opacity-50 hover:opacity-100 transition-opacity">
        {deck.slides.map((slide, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`aspect-video rounded border-2 p-2 text-left bg-white transition-all overflow-hidden ${idx === currentSlide ? 'border-indigo-600 ring-2 ring-indigo-100 ring-offset-2' : 'border-slate-200'}`}
          >
            <span className="text-[8px] font-bold block mb-1 opacity-50 uppercase tracking-tighter">Slide {idx+1}</span>
            <span className="text-[10px] font-bold block leading-none truncate">{slide.title}</span>
          </button>
        ))}
      </div>

      {/* Hidden Export Buffer (to capture all slides at once) */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none">
        {deck.slides.map((slide, idx) => (
          <Slide 
            key={idx} 
            slide={slide} 
            slideIndex={idx} 
            total={deck.slides.length} 
            id={`export-slide-${idx}`} 
          />
        ))}
      </div>

      <div className="bg-slate-900 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-xl font-bold">Pro Tip: Share this deck!</h4>
            <p className="text-slate-400">Exported PDFs are optimized for standard 16:9 presentation screens.</p>
          </div>
        </div>
        <button 
          onClick={handleDownloadPDF}
          className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors"
        >
          Export Presentation
        </button>
      </div>
    </div>
  );
};

export default SlidePreview;
