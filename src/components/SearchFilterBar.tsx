import React from 'react';
import { Search, RotateCcw, Filter, Building2, SlidersHorizontal } from 'lucide-react';

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedStyle: string;
  onStyleChange: (style: string) => void;
  selectedBedrooms: string;
  onBedroomsChange: (beds: string) => void;
  selectedFloors: string;
  onFloorsChange: (floors: string) => void;
  onReset: () => void;
  totalResults: number;
}

const CATEGORIES = [
  'All',
  '5 Marla',
  '10 Marla',
  '1 Kanal',
  'Double Storey',
  '2D AutoCAD',
  '3D House Designs'
];

const STYLES = ['All', 'Modern', 'Contemporary', 'Spanish', 'Neo-Classical'];
const BEDROOMS = ['All', '3', '4', '5', '6'];
const FLOORS = ['All', '1', '2'];

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStyle,
  onStyleChange,
  selectedBedrooms,
  onBedroomsChange,
  selectedFloors,
  onFloorsChange,
  onReset,
  totalResults
}: SearchFilterBarProps) {
  const isFiltered = 
    searchQuery !== '' || 
    selectedCategory !== 'All' || 
    selectedStyle !== 'All' || 
    selectedBedrooms !== 'All' || 
    selectedFloors !== 'All';

  return (
    <div className="bg-[#12151B] border border-[#232936] rounded-2xl p-5 shadow-xl space-y-4">
      {/* Top Search Input & Results Indicator */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by plot size (25x45, 35x65), keyword, bedrooms, style..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#0D0F13] border border-[#252B38] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A059] transition-colors font-sans"
          />
        </div>

        <div className="flex items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 font-mono-cad flex items-center gap-1.5">
            <span className="text-[#C5A059] font-bold">{totalResults}</span>
            <span>plans matching</span>
          </div>

          {isFiltered && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1 px-3 py-2 bg-[#1C212B] hover:bg-[#252C3A] text-slate-300 rounded-lg transition-colors text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Segmented Controls (Functional tabs allowed by frontend design skills) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] font-mono-cad uppercase text-slate-500 mr-1 shrink-0 flex items-center gap-1">
          <Building2 className="w-3.5 h-3.5" />
          Plot Size:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-[#C5A059] text-black font-semibold shadow'
                : 'bg-[#181C24] text-slate-300 hover:text-white hover:bg-[#202531]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Advanced Select Filters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#1C212B]">
        {/* Style Select */}
        <div>
          <label className="block text-[11px] uppercase font-mono-cad text-slate-400 mb-1">
            Design Style
          </label>
          <select
            value={selectedStyle}
            onChange={(e) => onStyleChange(e.target.value)}
            className="w-full bg-[#0E1116] border border-[#252B38] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#C5A059]"
          >
            {STYLES.map((st) => (
              <option key={st} value={st}>
                {st === 'All' ? 'All Architectural Styles' : `${st} Design`}
              </option>
            ))}
          </select>
        </div>

        {/* Bedrooms Select */}
        <div>
          <label className="block text-[11px] uppercase font-mono-cad text-slate-400 mb-1">
            Bedrooms
          </label>
          <select
            value={selectedBedrooms}
            onChange={(e) => onBedroomsChange(e.target.value)}
            className="w-full bg-[#0E1116] border border-[#252B38] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#C5A059]"
          >
            {BEDROOMS.map((bed) => (
              <option key={bed} value={bed}>
                {bed === 'All' ? 'Any Bedrooms' : `${bed}+ Bedrooms`}
              </option>
            ))}
          </select>
        </div>

        {/* Floors Select */}
        <div>
          <label className="block text-[11px] uppercase font-mono-cad text-slate-400 mb-1">
            Storeys / Floors
          </label>
          <select
            value={selectedFloors}
            onChange={(e) => onFloorsChange(e.target.value)}
            className="w-full bg-[#0E1116] border border-[#252B38] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#C5A059]"
          >
            {FLOORS.map((fl) => (
              <option key={fl} value={fl}>
                {fl === 'All' ? 'Any Number of Floors' : fl === '1' ? 'Single Storey' : 'Double Storey'}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
