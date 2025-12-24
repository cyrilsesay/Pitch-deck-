
import React from 'react';
import { PitchDeckInput } from '../types';
import { Send, Loader2 } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: PitchDeckInput) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<PitchDeckInput>({
    startupName: '',
    problem: '',
    solution: '',
    targetMarket: '',
    businessModel: '',
    uvp: '',
    technology: '',
    competitiveAdvantage: '',
    team: '',
    fundingAsk: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-800 placeholder:text-slate-400";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className={labelClasses}>Project / Startup Name*</label>
          <input
            required
            name="startupName"
            value={formData.startupName}
            onChange={handleChange}
            placeholder="e.g. EcoSphere Labs"
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Problem Statement*</label>
          <textarea
            required
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            placeholder="What pain point are you solving?"
            rows={3}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Solution Description*</label>
          <textarea
            required
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            placeholder="How does your idea solve it?"
            rows={3}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Target Market*</label>
          <input
            required
            name="targetMarket"
            value={formData.targetMarket}
            onChange={handleChange}
            placeholder="Who are your users?"
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Business Model*</label>
          <input
            required
            name="businessModel"
            value={formData.businessModel}
            onChange={handleChange}
            placeholder="How will you make money?"
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Unique Value Proposition*</label>
          <input
            required
            name="uvp"
            value={formData.uvp}
            onChange={handleChange}
            placeholder="Your one-sentence superpower"
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Technology / Innovation Used*</label>
          <input
            required
            name="technology"
            value={formData.technology}
            onChange={handleChange}
            placeholder="AI, Blockchain, Hardware, etc."
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Competitive Advantage*</label>
          <input
            required
            name="competitiveAdvantage"
            value={formData.competitiveAdvantage}
            onChange={handleChange}
            placeholder="Why can't others copy you easily?"
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Team (Optional)</label>
          <input
            name="team"
            value={formData.team}
            onChange={handleChange}
            placeholder="Who is behind the idea?"
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Funding Ask (Optional)</label>
          <input
            name="fundingAsk"
            value={formData.fundingAsk}
            onChange={handleChange}
            placeholder="What support do you need?"
            className={inputClasses}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        )}
        {isLoading ? "Generating Your Deck..." : "Generate Pitch Deck"}
      </button>
      <p className="text-center text-xs text-slate-400">
        Takes about 10-20 seconds to craft your professional story.
      </p>
    </form>
  );
};

export default InputForm;
