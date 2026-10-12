import React, { useState } from 'react';
import { 
  Compass, 
  Bed, 
  Bath, 
  Layers, 
  Car, 
  Compass as FacingIcon, 
  FileCode2, 
  Download, 
  MessageSquare, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles,
  Printer,
  Share2
} from 'lucide-react';
import { HousePlan, SiteSettings } from '../types';
import { InteractiveFloorPlanViewer } from '../components/InteractiveFloorPlanViewer';
import { PlanCard } from '../components/PlanCard';
import { SEOHead } from '../components/SEOHead';

interface PlanDetailProps {
  plan: HousePlan;
  allPlans: HousePlan[];
  settings: SiteSettings;
  onNavigate: (path: string) => void;
  onSelectPlan: (plan: HousePlan) => void;
  onOpenInquiry: (plan: HousePlan) => void;
}

export function PlanDetailPage({
  plan,
  allPlans,
  settings,
  onNavigate,
  onSelectPlan,
  onOpenInquiry
}: PlanDetailProps) {
  const [selectedImage, setSelectedImage] = useState(plan.images.hero);
  const [activeTab, setActiveTab] = useState<'overview' | 'cad-viewer' | 'specs'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9+]/g, '').replace('+', '');
  const directWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Salam Planova Team, I want to inquire about purchasing / modifying the plan "${plan.title}" (${plan.plotSizeLabel}). Please share details.`
  )}`;

  const relatedPlans = allPlans
    .filter(p => p.id !== plan.id && (p.category === plan.category || p.bedrooms === plan.bedrooms))
    .slice(0, 3);

  const allImages = [
    plan.images.hero,
    plan.images.elevation3d,
    plan.images.floorPlan2d,
    ...(plan.images.interiorRenders || [])
  ];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEOHead
        title={`${plan.title} – 2D AutoCAD House Plan & 3D Design`}
        description={`${plan.shortDescription} Includes AutoCAD DWG source files, 3D elevations, room dimensions, and covered area of ${plan.coveredAreaLabel}.`}
        keywords={`${plan.category} house plan, ${plan.plotSizeLabel}, ${plan.style} house design, AutoCAD DWG, floor plan`}
        canonicalPath={`/plan/${plan.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": plan.title,
          "image": plan.images.hero,
          "description": plan.fullDescription,
          "offers": {
            "@type": "Offer",
            "price": plan.priceUSD,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        }}
      />

      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6 text-xs font-mono-cad text-slate-400">
        <button
          onClick={() => onNavigate('/floor-plans-gallery')}
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Plans Gallery</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-lg bg-[#151922] border border-[#262C3A] hover:text-white transition-colors"
            title="Share Plan Link"
          >
            <Share2 className="w-3.5 h-3.5 text-[#C5A059]" />
          </button>
          {copiedLink && (
            <span className="text-emerald-400 text-xs">Link copied!</span>
          )}
          <button
            onClick={handlePrint}
            className="p-2 rounded-lg bg-[#151922] border border-[#262C3A] hover:text-white transition-colors hidden sm:block"
            title="Print Specification"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Plan Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono-cad text-[#C5A059] mb-2">
          <span>{plan.category}</span>
          <span>·</span>
          <span>{plan.style} Architectural Style</span>
          <span>·</span>
          <span>Orientation: {plan.facing}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          {plan.title}
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          {plan.shortDescription}
        </p>
      </div>

      {/* Top Grid: Gallery on Left + Architectural Metrics on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* Gallery Section */}
        <div className="lg:col-span-8 space-y-4">
          {/* Main Hero Preview */}
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#121620] border border-[#242B3A] shadow-xl">
            <img
              src={selectedImage}
              alt={plan.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-mono-cad text-white">
              Plot: {plan.plotDimensions.width}' × {plan.plotDimensions.length}' ({plan.plotSizeLabel})
            </div>
          </div>

          {/* Thumbnails row */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  selectedImage === img
                    ? 'border-[#C5A059] scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Specifications & Inquiry Panel */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="rounded-2xl bg-[#121620] border border-[#252C3D] p-6 shadow-xl space-y-5">
            
            <div className="border-b border-[#202636] pb-4">
              <div className="text-[11px] uppercase font-mono-cad text-slate-400">Design Package Price</div>
              <div className="text-2xl font-bold font-mono-cad text-[#E5C07B] mt-0.5">
                Rs. {plan.pricePKR.toLocaleString()} 
                <span className="text-sm font-normal text-slate-400 ml-2">(${plan.priceUSD} USD)</span>
              </div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Full DWG AutoCAD + 3D Elevation Included</span>
              </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono-cad">
              <div className="p-2.5 rounded-xl bg-[#171C26] border border-[#222838]">
                <div className="text-slate-400 text-[10px]">COVERED AREA</div>
                <div className="text-white font-bold text-sm mt-0.5">{plan.coveredAreaLabel}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#171C26] border border-[#222838]">
                <div className="text-slate-400 text-[10px]">PLOT DIMENSIONS</div>
                <div className="text-white font-bold text-sm mt-0.5">{plan.plotDimensions.width}' × {plan.plotDimensions.length}'</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#171C26] border border-[#222838]">
                <div className="text-slate-400 text-[10px]">BEDROOMS</div>
                <div className="text-white font-bold text-sm mt-0.5">{plan.bedrooms} En-Suite</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#171C26] border border-[#222838]">
                <div className="text-slate-400 text-[10px]">BATHROOMS</div>
                <div className="text-white font-bold text-sm mt-0.5">{plan.bathrooms} Baths</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#171C26] border border-[#222838]">
                <div className="text-slate-400 text-[10px]">FLOORS</div>
                <div className="text-white font-bold text-sm mt-0.5">{plan.floorsLabel}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#171C26] border border-[#222838]">
                <div className="text-slate-400 text-[10px]">PARKING</div>
                <div className="text-white font-bold text-sm mt-0.5">{plan.parkingSpaces} Vehicle Porch</div>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="space-y-2.5 pt-2">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/10"
              >
                <MessageSquare className="w-4 h-4 fill-black" />
                <span>Inquire on WhatsApp Now</span>
              </a>

              <button
                onClick={() => onOpenInquiry(plan)}
                className="w-full py-3 px-4 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <span>Request Custom Modification</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-400 text-center leading-relaxed">
              Need to adjust plot width/length for your specific society bylaws? We customize any plan within 48 hours.
            </div>

          </div>
        </div>

      </div>

      {/* Content Tabs: Interactive CAD Blueprint, Room Breakdown, Technical Inclusions */}
      <div className="mb-14">
        <div className="flex items-center gap-2 border-b border-[#212734] mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#C5A059] text-[#C5A059]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Detailed Architecture & Inclusions
          </button>
          <button
            onClick={() => setActiveTab('cad-viewer')}
            className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${
              activeTab === 'cad-viewer'
                ? 'border-[#C5A059] text-[#C5A059]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Interactive AutoCAD Blueprint
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${
              activeTab === 'specs'
                ? 'border-[#C5A059] text-[#C5A059]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Room Dimensions Schedule
          </button>
        </div>

        {/* Tab 1: Detailed Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <div>
                <h3 className="font-heading text-2xl font-bold text-white mb-3">Architectural Concept & Spatial Zoning</h3>
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line font-light">
                  {plan.fullDescription}
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl font-bold text-white mb-4">Key Architectural Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {plan.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#141822] border border-[#212838] text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-[#121620] border border-[#252C3D] space-y-4">
                <div className="flex items-center gap-2 text-white font-heading font-bold text-base">
                  <FileCode2 className="w-5 h-5 text-[#C5A059]" />
                  <span>CAD Deliverables Included</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  {plan.cadFilesIncluded.map((cad, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-[#C5A059] font-bold">✓</span>
                      <span>{cad}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive CAD Blueprint Viewer */}
        {activeTab === 'cad-viewer' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400 font-mono-cad">
              Interact with the vector blueprint below to see live room dimensions and floor storeys:
            </div>
            <InteractiveFloorPlanViewer
              plan={plan}
              onInquire={() => onOpenInquiry(plan)}
            />
          </div>
        )}

        {/* Tab 3: Room Schedule */}
        {activeTab === 'specs' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ground Floor */}
              <div className="p-6 rounded-2xl bg-[#121620] border border-[#212738]">
                <h4 className="font-heading text-lg font-bold text-white mb-4 flex items-center justify-between">
                  <span>Ground Floor Plan Schedule</span>
                  <span className="text-xs font-mono-cad text-[#C5A059]">Level: ±0.00'</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300 divide-y divide-[#1D2330]">
                  {plan.floorBreakdown.groundFloor.map((item, idx) => (
                    <li key={idx} className="pt-2 flex justify-between items-center">
                      <span>{item.split(':')[0]}</span>
                      <span className="font-mono-cad text-[#E5C07B] font-semibold">{item.split(':')[1] || ''}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* First Floor */}
              {plan.floorBreakdown.firstFloor && (
                <div className="p-6 rounded-2xl bg-[#121620] border border-[#212738]">
                  <h4 className="font-heading text-lg font-bold text-white mb-4 flex items-center justify-between">
                    <span>First Floor Plan Schedule</span>
                    <span className="text-xs font-mono-cad text-[#C5A059]">Level: +11.50'</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300 divide-y divide-[#1D2330]">
                    {plan.floorBreakdown.firstFloor.map((item, idx) => (
                      <li key={idx} className="pt-2 flex justify-between items-center">
                        <span>{item.split(':')[0]}</span>
                        <span className="font-mono-cad text-[#E5C07B] font-semibold">{item.split(':')[1] || ''}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Related House Plans Section */}
      {relatedPlans.length > 0 && (
        <div className="pt-12 border-t border-[#1F2532]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-heading text-2xl font-bold text-white">
              Similar {plan.category} House Plans
            </h3>
            <button
              onClick={() => onNavigate('/floor-plans-gallery')}
              className="text-xs font-mono-cad text-[#C5A059] hover:underline"
            >
              View More Plans →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPlans.map((relPlan) => (
              <PlanCard
                key={relPlan.id}
                plan={relPlan}
                onSelect={onSelectPlan}
                whatsappNumber={settings.whatsappNumber}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
