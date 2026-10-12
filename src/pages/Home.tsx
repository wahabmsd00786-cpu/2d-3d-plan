import React, { useState } from 'react';
import { 
  Compass, 
  Layers, 
  Box, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  Building2, 
  Star, 
  FileCode2, 
  Sparkles, 
  ShieldCheck, 
  PhoneCall,
  Search,
  ExternalLink
} from 'lucide-react';
import { HousePlan, SiteSettings, BlogPost } from '../types';
import { PlanCard } from '../components/PlanCard';
import { InteractiveFloorPlanViewer } from '../components/InteractiveFloorPlanViewer';
import { SEOHead } from '../components/SEOHead';

interface HomeProps {
  plans: HousePlan[];
  settings: SiteSettings;
  blogs: BlogPost[];
  onSelectPlan: (plan: HousePlan) => void;
  onNavigate: (path: string) => void;
  onOpenInquiry: (plan?: HousePlan) => void;
}

export function Home({
  plans,
  settings,
  blogs,
  onSelectPlan,
  onNavigate,
  onOpenInquiry
}: HomeProps) {
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'All' | '5 Marla' | '10 Marla' | '1 Kanal' | '3D House Designs'>('All');
  const [quickWidth, setQuickWidth] = useState('25');
  const [quickLength, setQuickLength] = useState('45');

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9+]/g, '').replace('+', '');
  const whatsAppGeneralUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Salam Planova Team, I want to discuss a new house design plan.")}`;

  const featuredPlans = plans.filter(p => {
    if (selectedCategoryTab === 'All') return p.featured;
    return p.category === selectedCategoryTab;
  });

  const handleQuickDimensionsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('/custom-order');
  };

  const sampleInteractivePlan = plans.find(p => p.id === 'plan-5m-modern-01') || plans[0];

  return (
    <div>
      <SEOHead
        title="Planova House Plans – 2D AutoCAD House Plans & 3D House Designs"
        description="Premium residential house plans, 2D AutoCAD source DWG blueprints, 3D elevations, 5 Marla, 10 Marla, 1 Kanal and custom house orders in Pakistan & worldwide."
        keywords="AutoCAD house plans, 2D house plans, 3D house designs, modern house plans, 5 Marla house plans, 10 Marla house plans, 1 Kanal house plans, double storey house plans"
        canonicalPath="/"
      />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[#0B0D11] bg-blueprint-grid overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-[#1A1F29]">
        {/* Soft atmospheric radial gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#C5A059]/10 blur-[130px] rounded-full pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Brand Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181D26] border border-[#2D3545] text-xs font-mono-cad text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
              <span>Accredited Architectural House Plans & DWG Source Files</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] tracking-tight">
              Designing <span className="text-gold-gradient">Masterpiece</span> 2D AutoCAD & 3D House Plans.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-light">
              From compact 5 Marla (25'×45') modern residences to sprawling 1 Kanal (50'×90') luxury villas. Get engineer-certified AutoCAD blueprints, 4K photorealistic 3D elevations, and turnkey custom architecture.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onNavigate('/custom-order')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-sm tracking-wide uppercase transition-all shadow-xl shadow-[#C5A059]/20 flex items-center justify-center gap-2 group"
              >
                <span>Order Custom Plan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('/floor-plans-gallery')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#151922] hover:bg-[#1E2430] border border-[#2A3140] text-white font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4 text-[#C5A059]" />
                <span>Explore Plan Gallery</span>
              </button>

              <a
                href={whatsAppGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-[#25D366]" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-[#1C212C] grid grid-cols-3 gap-4 text-xs text-slate-400 font-mono-cad text-center lg:text-left">
              <div>
                <div className="text-white font-bold text-base font-heading">500+</div>
                <div>Approved Blueprints</div>
              </div>
              <div>
                <div className="text-white font-bold text-base font-heading">100%</div>
                <div>AutoCAD DWG Accuracy</div>
              </div>
              <div>
                <div className="text-white font-bold text-base font-heading">24/7</div>
                <div>WhatsApp Architectural Support</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Quick Plot Dimension Calculator / Finder */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#121620] border border-[#283042] p-6 sm:p-8 shadow-2xl gold-glow">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#212736]">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#C5A059]" />
                  <h3 className="font-heading text-lg font-bold text-white">Find or Design Your Plot</h3>
                </div>
                <span className="text-[10px] font-mono-cad text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded border border-[#C5A059]/30">
                  Instant Estimate
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                Enter your residential plot length and width to view matching pre-drawn AutoCAD plans or request custom blueprints.
              </p>

              <form onSubmit={handleQuickDimensionsSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                      Plot Width (ft)
                    </label>
                    <input
                      type="number"
                      value={quickWidth}
                      onChange={(e) => setQuickWidth(e.target.value)}
                      placeholder="e.g. 25"
                      className="w-full px-3.5 py-2.5 bg-[#0A0D12] border border-[#252C3D] rounded-xl text-white font-mono-cad text-sm focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                      Plot Length (ft)
                    </label>
                    <input
                      type="number"
                      value={quickLength}
                      onChange={(e) => setQuickLength(e.target.value)}
                      placeholder="e.g. 45"
                      className="w-full px-3.5 py-2.5 bg-[#0A0D12] border border-[#252C3D] rounded-xl text-white font-mono-cad text-sm focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                {/* Instant Area Calculation Preview */}
                <div className="p-3 rounded-xl bg-[#171C26] border border-[#242A38] text-xs font-mono-cad space-y-1.5">
                  <div className="flex justify-between text-slate-300">
                    <span>Plot Area:</span>
                    <span className="text-white font-bold">
                      {(Number(quickWidth) * Number(quickLength)).toLocaleString()} sq. ft.
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Approx. Marla Equivalent:</span>
                    <span className="text-[#C5A059] font-bold">
                      {((Number(quickWidth) * Number(quickLength)) / 225).toFixed(1)} Marla
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Standard Double Storey Covered Area:</span>
                    <span>~{(Number(quickWidth) * Number(quickLength) * 1.85).toLocaleString()} sq. ft.</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Proceed to Custom Order Studio</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('/5-marla-plans')}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#1B212D] hover:bg-[#252C3D] text-slate-300 text-xs transition-colors"
                  >
                    Browse Standard 25'×45' Plans →
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Architectural Pillars / Core Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-mono-cad uppercase text-[#C5A059] tracking-widest font-bold">
            Comprehensive Architectural Solutions
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Everything Required to Build Your Luxury Residence
          </h2>
          <p className="text-sm text-slate-400">
            From the initial 2D conceptual layout to municipal approvals, structural beam calculations, and photorealistic 3D elevations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Pillar 1: 2D AutoCAD House Plans */}
          <div 
            onClick={() => onNavigate('/autocad-plans')}
            className="group p-8 rounded-2xl bg-[#121620] border border-[#212736] hover:border-[#C5A059] transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileCode2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#C5A059] transition-colors mb-2">
                2D AutoCAD House Plans
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Clean, layer-separated DWG source files with room dimensions, door/window schedules, wall thicknesses, cross-sections, and municipal submission drawings.
              </p>
            </div>
            <div className="text-xs font-mono-cad text-[#C5A059] flex items-center gap-1">
              <span>Explore 2D Plans</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 2: 3D House Designs & Elevations */}
          <div 
            onClick={() => onNavigate('/3d-designs')}
            className="group p-8 rounded-2xl bg-[#121620] border border-[#212736] hover:border-[#C5A059] transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#C5A059] transition-colors mb-2">
                3D House Designs & Elevations
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Photorealistic 4K front elevations, dusk lighting perspectives, material finishes (porcelain tiles, WPC louvers, travertine, grooved rockwall).
              </p>
            </div>
            <div className="text-xs font-mono-cad text-[#C5A059] flex items-center gap-1">
              <span>View 3D Designs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 3: Structural & MEP Engineering */}
          <div 
            onClick={() => onNavigate('/custom-order')}
            className="group p-8 rounded-2xl bg-[#121620] border border-[#212736] hover:border-[#C5A059] transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#C5A059] transition-colors mb-2">
                Structural, Plumbing & Electrical
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Earthquake-resistant RCC column and beam engineering, foundation details, sanitary sewerage piping diagrams, and circuit conduits.
              </p>
            </div>
            <div className="text-xs font-mono-cad text-[#C5A059] flex items-center gap-1">
              <span>Order Turnkey Package</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* Featured Plans Showcase Section */}
      <section className="py-16 bg-[#0E1116] border-y border-[#1A1F29] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs font-mono-cad uppercase text-[#C5A059] font-bold tracking-wider">
                Curated Catalog
              </div>
              <h2 className="font-heading text-3xl font-bold text-white mt-1">
                Featured Residential House Plans
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Engineered for maximum room utility, daylight orientation, and aesthetic appeal.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-[#151922] rounded-xl border border-[#242A38]">
              {(['All', '5 Marla', '10 Marla', '1 Kanal', '3D House Designs'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedCategoryTab(tab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategoryTab === tab
                      ? 'bg-[#C5A059] text-black font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlans.slice(0, 6).map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onSelect={onSelectPlan}
                whatsappNumber={settings.whatsappNumber}
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('/floor-plans-gallery')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#171B24] hover:bg-[#202633] text-white border border-[#283040] text-sm font-semibold transition-colors"
            >
              <span>View All House Plans & Blueprints</span>
              <ArrowRight className="w-4 h-4 text-[#C5A059]" />
            </button>
          </div>

        </div>
      </section>

      {/* Interactive Blueprint Inspection Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-4 space-y-5">
            <div className="text-xs font-mono-cad uppercase text-[#C5A059] font-bold tracking-widest">
              Live Architectural Technology
            </div>
            <h2 className="font-heading text-3xl font-bold text-white">
              Interactive 2D AutoCAD Blueprint Viewer
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              We don't just sell vague floor plans. Experience the level of AutoCAD drafting precision Planova delivers. Toggle grid lines, inspect room dimensions, switch storeys, and check door clearances directly on your screen.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Hover or click any room to inspect exact dimensions</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Switch between Ground Floor and First Floor drawings</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Instant exportable architectural specification sheets</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onOpenInquiry(sampleInteractivePlan)}
                className="px-5 py-3 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquire About This Plan</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <InteractiveFloorPlanViewer
              plan={sampleInteractivePlan}
              onInquire={() => onOpenInquiry(sampleInteractivePlan)}
            />
          </div>

        </div>
      </section>

      {/* Why Planova Section */}
      <section className="py-16 bg-[#0E1116] border-y border-[#1A1F29] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-mono-cad uppercase text-[#C5A059] font-bold">
              Engineering Excellence
            </div>
            <h2 className="font-heading text-3xl font-bold text-white mt-1">
              Why Homeowners Choose Planova Over Ordinary Draftsmen
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#121620] border border-[#212736]">
              <div className="text-[#C5A059] font-mono-cad text-lg font-bold mb-2">01. Bylaws Approval</div>
              <h4 className="text-white font-semibold text-base mb-2">Guaranteed Society Sanction</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                All plans adhere to setback rules, compulsory open spaces (COS), covered area ratios, and mumty height regulations across DHA, Bahria, LDA, and CDA.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121620] border border-[#212736]">
              <div className="text-[#C5A059] font-mono-cad text-lg font-bold mb-2">02. Zero Dead Space</div>
              <h4 className="text-white font-semibold text-base mb-2">Maximized Spatial Efficiency</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Intelligently located staircase shafts, open-concept living zones, and seamless circulation eliminate dark hallways and cramped rooms.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121620] border border-[#212736]">
              <div className="text-[#C5A059] font-mono-cad text-lg font-bold mb-2">03. Fast DWG Delivery</div>
              <h4 className="text-white font-semibold text-base mb-2">Instant WhatsApp Delivery</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive editable AutoCAD DWG source files and printable high-res PDFs within 24 to 48 hours for immediate contractor mobilization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Articles */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="text-xs font-mono-cad uppercase text-[#C5A059] font-bold">
              Architectural Knowledge Base
            </div>
            <h2 className="font-heading text-3xl font-bold text-white mt-1">
              Latest Building Guides & Tips
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/blog')}
            className="text-xs font-mono-cad text-[#C5A059] hover:underline hidden sm:inline-flex items-center gap-1"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((blog) => (
            <div
              key={blog.id}
              onClick={() => onNavigate(`/blog/${blog.slug}`)}
              className="rounded-xl bg-[#121620] border border-[#212736] overflow-hidden hover:border-[#C5A059]/60 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono-cad mb-2">
                    <span>{blog.category}</span>
                    <span>·</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-white group-hover:text-[#C5A059] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-0 text-xs font-mono-cad text-[#C5A059] flex items-center gap-1">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-r from-[#171D27] via-[#121620] to-[#171D27] border-t border-[#232B3A] py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Have a Specific Plot Size or Custom Design in Mind?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Send your plot dimensions, street orientation, and bedroom requirements to our senior architectural team for a complimentary layout consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('/custom-order')}
              className="px-7 py-3.5 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Start Custom Design Order
            </button>
            <a
              href={whatsAppGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
