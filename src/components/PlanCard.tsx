import React from 'react';
import { Bed, Bath, Maximize2, Layers, MessageSquare, ArrowRight, Car } from 'lucide-react';
import { HousePlan } from '../types';

interface PlanCardProps {
  plan: HousePlan;
  onSelect: (plan: HousePlan) => void;
  whatsappNumber: string;
}

export function PlanCard({ plan, onSelect, whatsappNumber }: PlanCardProps) {
  const cleanPhone = whatsappNumber.replace(/[^0-9+]/g, '').replace('+', '');
  const inquiryMessage = encodeURIComponent(
    `Salam Planova Team, I am interested in plan "${plan.title}" (${plan.plotSizeLabel}). Please share details and pricing.`
  );
  const whatsAppUrl = `https://wa.me/${cleanPhone}?text=${inquiryMessage}`;

  return (
    <div className="group rounded-xl bg-[#12151B] border border-[#212631] hover:border-[#C5A059]/60 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#C5A059]/5">
      
      {/* Image Container */}
      <div 
        className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-[#1A1F29]"
        onClick={() => onSelect(plan)}
      >
        <img
          src={plan.images.hero}
          alt={`${plan.title} - 2D AutoCAD House Plan and 3D Elevation`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12151B] via-transparent to-transparent opacity-80" />

        {/* Top Architectural Category & Plot Size Kicker */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
          <span className="font-mono-cad text-[#D4AF37] font-semibold bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded">
            {plan.plotSizeLabel}
          </span>
          <span className="font-mono-cad text-white/90 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-[11px]">
            {plan.style}
          </span>
        </div>

        {/* Bottom image overlay specs */}
        <div className="absolute bottom-3 left-3 text-xs text-white/90 font-mono-cad flex items-center gap-2">
          <span>{plan.coveredAreaLabel}</span>
          <span aria-hidden="true" className="text-white/40">·</span>
          <span>{plan.floorsLabel}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Unboxed Metadata (Frontend Design Skill: No static pill enclosures!) */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono-cad mb-2">
            <span>{plan.category}</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>Facing: {plan.facing}</span>
            {plan.parkingSpaces > 0 && (
              <>
                <span aria-hidden="true" className="text-slate-600">/</span>
                <span className="flex items-center gap-1">
                  <Car className="w-3 h-3 text-slate-400" />
                  {plan.parkingSpaces} Car
                </span>
              </>
            )}
          </div>

          {/* Plan Title */}
          <h3 
            onClick={() => onSelect(plan)}
            className="font-heading text-lg font-bold text-white group-hover:text-[#C5A059] transition-colors cursor-pointer line-clamp-1"
          >
            {plan.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
            {plan.shortDescription}
          </p>

          {/* Key Metric Grid */}
          <div className="grid grid-cols-3 gap-2 py-3.5 my-3.5 border-y border-[#1E232E] text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{plan.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{plan.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{plan.floorsCount} Floors</span>
            </div>
          </div>
        </div>

        {/* Card Footer: Price & Actions */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase font-mono-cad text-slate-500">Design Package</div>
            <div className="text-sm font-bold text-[#E5C07B] font-mono-cad">
              Rs. {plan.pricePKR.toLocaleString()} <span className="text-[11px] text-slate-400 font-normal">(${plan.priceUSD})</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] transition-colors"
              title="Inquire via WhatsApp"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageSquare className="w-4 h-4 fill-[#25D366]" />
            </a>

            <button
              onClick={() => onSelect(plan)}
              className="px-3 py-2 rounded-lg bg-[#1C212C] hover:bg-[#C5A059] text-slate-200 hover:text-black text-xs font-semibold tracking-wider transition-colors inline-flex items-center gap-1"
            >
              <span>View Plan</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
