import React, { useState } from 'react';
import { Search, X, ArrowRight, Building2 } from 'lucide-react';
import { HousePlan } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  plans: HousePlan[];
  onSelectPlan: (plan: HousePlan) => void;
  onNavigate: (path: string) => void;
}

export function SearchModal({ isOpen, onClose, plans, onSelectPlan, onNavigate }: SearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim()
    ? plans.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.plotSizeLabel.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.style.toLowerCase().includes(query.toLowerCase()) ||
        p.keyFeatures.some(f => f.toLowerCase().includes(query.toLowerCase()))
      )
    : plans.slice(0, 4);

  const quickLinks = [
    { label: '5 Marla Plans (25x45)', path: '/5-marla-plans' },
    { label: '10 Marla Plans (35x65)', path: '/10-marla-plans' },
    { label: '1 Kanal Plans (50x90)', path: '/1-kanal-plans' },
    { label: '2D AutoCAD Blueprints', path: '/autocad-plans' },
    { label: '3D House Elevations', path: '/3d-designs' },
    { label: 'Custom House Orders', path: '/custom-order' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#131720] border border-[#2B3346] rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#222836] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C5A059]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type plot size (e.g. 5 Marla, 25x45, 10 Marla), bedrooms, or style..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 text-base focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Tags */}
        <div className="px-4 py-3 bg-[#0F1218] border-b border-[#1E2330] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-500 font-mono-cad uppercase text-[10px] shrink-0">Popular:</span>
          {quickLinks.map((ql, idx) => (
            <button
              key={idx}
              onClick={() => { onNavigate(ql.path); onClose(); }}
              className="px-2.5 py-1 bg-[#1A1F2B] hover:bg-[#C5A059] hover:text-black text-slate-300 rounded-md whitespace-nowrap transition-colors"
            >
              {ql.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-[#1D222F]">
          {filtered.length > 0 ? (
            filtered.map((plan) => (
              <div
                key={plan.id}
                onClick={() => { onSelectPlan(plan); onClose(); }}
                className="py-3 px-3 rounded-xl hover:bg-[#1A1F2C] cursor-pointer flex items-center gap-4 transition-colors group"
              >
                <img
                  src={plan.images.hero}
                  alt={plan.title}
                  className="w-16 h-12 object-cover rounded-lg border border-[#2B3242]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#C5A059] font-mono-cad font-semibold">{plan.plotSizeLabel}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400">{plan.style}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#C5A059] transition-colors truncate">
                    {plan.title}
                  </h4>
                  <div className="text-xs text-slate-400 font-mono-cad">
                    {plan.bedrooms} Beds · {plan.bathrooms} Baths · {plan.coveredAreaLabel}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-400">
              <Building2 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm">No house plans found matching "{query}"</p>
              <button
                onClick={() => { onNavigate('/custom-order'); onClose(); }}
                className="mt-3 text-xs text-[#C5A059] underline hover:text-[#E5C07B]"
              >
                Can't find your dimensions? Order a custom house plan →
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
