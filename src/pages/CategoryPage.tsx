import React, { useState } from 'react';
import { HousePlan, SiteSettings } from '../types';
import { PlanCard } from '../components/PlanCard';
import { SearchFilterBar } from '../components/SearchFilterBar';
import { SEOHead } from '../components/SEOHead';
import { Building2, Layers, Box, Compass, Sparkles, MessageSquare } from 'lucide-react';

interface CategoryConfig {
  title: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  canonicalPath: string;
  categoryFilter?: string;
  subtitle: string;
  editorialGuide: {
    heading: string;
    paragraphs: string[];
    specsHighlight: { label: string; value: string }[];
  };
}

interface CategoryPageProps {
  pageType: 
    | 'autocad-plans'
    | '3d-designs'
    | '5-marla-plans'
    | '10-marla-plans'
    | '1-kanal-plans'
    | 'double-storey-plans'
    | 'floor-plans-gallery'
    | 'interior-design'
    | 'exterior-design';
  plans: HousePlan[];
  settings: SiteSettings;
  onSelectPlan: (plan: HousePlan) => void;
  onNavigate: (path: string) => void;
  onOpenInquiry: (plan?: HousePlan) => void;
}

const CATEGORY_CONFIGS: Record<string, CategoryConfig> = {
  'autocad-plans': {
    title: '2D AutoCAD House Plans & DWG Blueprints',
    seoTitle: '2D AutoCAD House Plans – Editable DWG Blueprints & CAD Files',
    seoDescription: 'Download and order professional 2D AutoCAD house plans with source DWG drawings, structural columns, plumbing, electrical circuits, and municipal approvals.',
    keywords: 'AutoCAD house plans, 2D house plans, DWG house plans, architectural working drawings, AutoCAD blueprints',
    canonicalPath: '/autocad-plans',
    categoryFilter: '2D AutoCAD',
    subtitle: 'Production-ready DWG working drawings, door/window schedules, and structural details for civil contractors.',
    editorialGuide: {
      heading: 'Why Architects & Builders Require 2D AutoCAD DWG Source Files',
      paragraphs: [
        "A proper 2D AutoCAD blueprint is the legal and technical backbone of any construction project. Without detailed dimensioned drawings, contractors make ad-hoc decisions on site, causing structural deficiencies, door misalignments, and plumbing conflicts.",
        "Planova's AutoCAD house plans are drafted on precision vector layers: structural columns, masonry brickwork, door swings, electrical switchboard conduits, and drainage layouts. All drawings strictly conform to local development authorities (DHA, LDA, CDA, Bahria Town)."
      ],
      specsHighlight: [
        { label: 'File Formats', value: 'AutoCAD DWG (2018+), Vector PDF, DXF' },
        { label: 'Layering', value: 'Clean CAD Layers for Walls, Doors, Text' },
        { label: 'Dimensions', value: 'Feet-Inches & Metric Dual Markings' }
      ]
    }
  },
  '3d-designs': {
    title: '3D House Designs & Photorealistic Elevations',
    seoTitle: '3D House Designs – Modern Front Elevations & Exterior Renders',
    seoDescription: 'Explore modern 3D house designs, front elevations, dusk illumination, and realistic exterior architectural renders for 5 Marla, 10 Marla, and 1 Kanal villas.',
    keywords: '3D house designs, 3D front elevations, modern house elevations, Spanish elevations, architectural 3D renders',
    canonicalPath: '/3d-designs',
    categoryFilter: '3D House Designs',
    subtitle: 'Photorealistic 4K exterior front elevations, daylight & night lighting concepts, and real material finishes.',
    editorialGuide: {
      heading: 'Translating Architectural Ideas into 3D Reality',
      paragraphs: [
        "A 3D elevation is more than a pretty picture—it is a material specification guide. Our 3D visualization studio renders realistic textures including grooved concrete rockwall, WPC wood louvers, Italian porcelain slabs, and double-glazed low-E glass.",
        "See exactly how street light, dusk ambient lighting, and boundary wall lamps interact with the facade before pouring a single drop of concrete."
      ],
      specsHighlight: [
        { label: 'Render Resolution', value: '4K Ultra High Definition (3840×2160)' },
        { label: 'Lighting Modes', value: 'Daylight Ambient, Sunset Dusk & Night LED' },
        { label: 'Material Guide', value: 'Full Tile, Glass & Paint Color Code Spec' }
      ]
    }
  },
  '5-marla-plans': {
    title: '5 Marla House Plans (25\' × 45\' & 25\' × 50\')',
    seoTitle: '5 Marla House Plans – Modern 25x45 & 25x50 2D/3D House Designs',
    seoDescription: 'Browse the best 5 Marla house plans (25x45 and 25x50). Explore modern 3-bed and 4-bed double storey designs with car porches, open kitchens, and AutoCAD DWG files.',
    keywords: '5 Marla house plans, 25x45 house design, 25x50 house plans, 5 Marla double storey, modern 5 Marla house plans',
    canonicalPath: '/5-marla-plans',
    categoryFilter: '5 Marla',
    subtitle: 'The most popular urban residential size. Maximized spatial efficiency with up to 4 bedrooms and SUV parking.',
    editorialGuide: {
      heading: 'Smart Planning for 5 Marla Residential Plots',
      paragraphs: [
        "A standard 5 Marla plot measures 25 feet width by 45 or 50 feet depth (approx 1,125 to 1,250 sq. ft.). In modern societies like DHA and Bahria Town, homeowners demand 3 to 4 bedrooms, an attached bathroom for each, and a dedicated SUV car porch.",
        "Our 5 Marla floor plans solve the tight-space puzzle through double-height entry foyers, open-concept TV lounges, and strategically placed OTS (Open to Sky) ducts that bring continuous natural sunlight into interior rooms."
      ],
      specsHighlight: [
        { label: 'Plot Dimensions', value: "25'-0\" × 45'-0\" or 25'-0\" × 50'-0\"" },
        { label: 'Average Covered Area', value: '2,100 to 2,400 sq. ft. (Double Storey)' },
        { label: 'Bedrooms Capacity', value: '3 to 4 En-Suite Bedrooms' }
      ]
    }
  },
  '10-marla-plans': {
    title: '10 Marla House Plans (35\' × 65\' & 35\' × 70\')',
    seoTitle: '10 Marla House Plans – Luxury 35x65 & 35x70 Villa Designs',
    seoDescription: 'Exclusive 10 Marla house plans (35x65). Modern double storey 5-bed villas with double car porch, double height lobbies, dirty kitchen, and servant quarters.',
    keywords: '10 Marla house plans, 35x65 house plans, 10 Marla modern house design, 10 Marla Spanish house plans, luxury 10 Marla',
    canonicalPath: '/10-marla-plans',
    categoryFilter: '10 Marla',
    subtitle: 'Prestigious executive family residences featuring 5 en-suite bedrooms, dual kitchens, and two-car garages.',
    editorialGuide: {
      heading: 'Executive Living on 10 Marla Plots',
      paragraphs: [
        "Measuring 35 feet wide by 65 or 70 feet long (approx. 2,275 to 2,450 sq. ft.), a 10 Marla plot allows generous architectural breathing room. Key hallmarks include double car porches, a formal drawing and dining wing, two bedrooms on the ground floor, and three on the first floor.",
        "We integrate a separate dirty kitchen (wet scullery), servant quarters with private spiral stairs, and rooftop recreational terraces."
      ],
      specsHighlight: [
        { label: 'Plot Dimensions', value: "35'-0\" × 65'-0\" or 35'-0\" × 70'-0\"" },
        { label: 'Average Covered Area', value: '4,200 to 4,800 sq. ft.' },
        { label: 'Car Parking', value: '2 Full-Size SUVs Under Covered Porch' }
      ]
    }
  },
  '1-kanal-plans': {
    title: '1 Kanal House Plans (50\' × 90\')',
    seoTitle: '1 Kanal House Plans – 50x90 Palatial Mansions & Luxury Blueprints',
    seoDescription: 'Palatial 1 Kanal house plans (50x90). Ultra-luxury double storey and basement designs with swimming pool courts, 4-car porch, home cinema, and master suites.',
    keywords: '1 Kanal house plans, 50x90 house plans, 1 Kanal luxury mansion, 1 Kanal modern villa, 1 Kanal floor plans AutoCAD',
    canonicalPath: '/1-kanal-plans',
    categoryFilter: '1 Kanal',
    subtitle: 'Grand 500 sq. yard palatial estates with swimming pools, home cinemas, basements, and 4-car porches.',
    editorialGuide: {
      heading: 'The Pinnacle of Residential Luxury: 1 Kanal Architecture',
      paragraphs: [
        "A 1 Kanal plot (50'×90' / 4,500 sq. ft.) represents the highest tier of private suburban residence. Spatial zoning is paramount: creating distinct private family zones and magnificent formal entertainment pavilions.",
        "Planova's 1 Kanal portfolio features 24-foot double-height central atriums, residential elevator provisions, swimming pool courtyards, triple kitchens, and independent driver and maid suites."
      ],
      specsHighlight: [
        { label: 'Plot Dimensions', value: "50'-0\" × 90'-0\" (approx. 500 Sq. Yards)" },
        { label: 'Average Covered Area', value: '6,800 to 8,500 sq. ft.' },
        { label: 'Bedrooms Capacity', value: '5 to 7 Executive Luxury Suites' }
      ]
    }
  },
  'double-storey-plans': {
    title: 'Double Storey House Plans',
    seoTitle: 'Double Storey House Plans – Complete Ground & First Floor Blueprints',
    seoDescription: 'Explore modern double storey house plans (G+1). Designed with separate family living floors, double kitchens, private balconies, and AutoCAD DWG sets.',
    keywords: 'double storey house plans, two storey house designs, G+1 house plans, duplex house plans, modern double storey',
    canonicalPath: '/double-storey-plans',
    categoryFilter: 'Double Storey',
    subtitle: 'Optimal multi-generational or dual-family layouts with independent floor living and staircase zoning.',
    editorialGuide: {
      heading: 'Mastering the Double Storey Vertical Layout',
      paragraphs: [
        "Double storey construction doubles your usable square footage while occupying the exact same foundation footprint. The key to a successful double storey layout is staircase positioning: placing it near the front foyer allows upper floor privacy or separate rental options.",
        "All our double storey blueprints include full Ground Floor, First Floor, and Stair Mumty/Rooftop drawings."
      ],
      specsHighlight: [
        { label: 'Configuration', value: 'Ground Floor + First Floor + Rooftop Mumty' },
        { label: 'Privacy Design', value: 'Front Staircase Allows Independent Access' },
        { label: 'Kitchen Setup', value: 'Main Kitchen Ground + Kitchenette 1st Floor' }
      ]
    }
  },
  'floor-plans-gallery': {
    title: 'Floor Plans Gallery',
    seoTitle: 'Floor Plans Gallery – 2D Architectural Floor Plans & Blueprints',
    seoDescription: 'Complete gallery of modern floor plans. Filter by plot size (5 Marla, 10 Marla, 1 Kanal), bedrooms, and architectural style.',
    keywords: 'floor plans gallery, house blueprints, residential floor plans, architectural layout drawings',
    canonicalPath: '/floor-plans-gallery',
    subtitle: 'Browse our entire library of modern, Spanish, and contemporary floor plans with dimensioned AutoCAD drawings.',
    editorialGuide: {
      heading: 'How to Choose the Right Floor Plan',
      paragraphs: [
        "Your floor plan determines the daily rhythm of your home. Consider sunlight direction (North-facing living rooms receive soft, glare-free light), cross-ventilation, and family privacy.",
        "Use the search and filter bar below to explore plans matching your plot width, depth, and bedroom requirements."
      ],
      specsHighlight: [
        { label: 'Interactive Viewer', value: 'Real-time Vector CAD Dimension Inspection' },
        { label: 'Downloadable Specs', value: 'Printable Room Dimension Schedules' },
        { label: 'Customization', value: '100% Adaptable to Any Society Bylaws' }
      ]
    }
  },
  'interior-design': {
    title: 'Interior Design Services & 3D Renders',
    seoTitle: 'Interior Design Services – Modern Drawing Rooms, Kitchens & Bedrooms',
    seoDescription: 'Transform your residence with Planova Interior Design. Modern open kitchens, false ceiling concepts, luxury master bedrooms, and media wall woodwork.',
    keywords: 'interior design, modern kitchen design, luxury bedroom interior, drawing room design, false ceiling designs',
    canonicalPath: '/interior-design',
    subtitle: 'Bespoke residential interior architecture: false ceilings, media walls, custom kitchens, and lighting moodboards.',
    editorialGuide: {
      heading: 'Harmonizing Structure & Interior Space',
      paragraphs: [
        "Great interior design begins during architectural planning, not after plastering is done. By integrating electrical conduit locations, false ceiling recesses, and wardrobe niches early, you save thousands in rework.",
        "Planova delivers 3D interior renders with full carpentry working drawings for cabinetry, quartz kitchen countertops, and sanitary layouts."
      ],
      specsHighlight: [
        { label: 'Spaces Covered', value: 'Living, Kitchen, Master Suites, Drawing Room' },
        { label: 'Deliverables', value: '3D Photorealistic Views + Carpentry DWGs' },
        { label: 'Lighting Layout', value: 'Cove Lights, Spotlights, Ambient LED Channels' }
      ]
    }
  },
  'exterior-design': {
    title: 'Exterior Design & Front Elevation Facades',
    seoTitle: 'Exterior Design & Front Elevation Facades – Modern & Spanish Styles',
    seoDescription: 'Bespoke exterior design and front elevations. Architectural boundary walls, main gates, porcelain facade cladding, and ambient lighting.',
    keywords: 'exterior design, front elevation design, house facades, boundary wall design, modern house elevation',
    canonicalPath: '/exterior-design',
    subtitle: 'Transform your street presence with distinctive architectural facades, boundary walls, and outdoor lighting.',
    editorialGuide: {
      heading: 'Crafting an Unforgettable Facade Presence',
      paragraphs: [
        "The exterior of your house is the first impression visitors and passersby experience. Whether you favor the crisp, orthogonal geometry of contemporary glass cubes or the warm, arched romanticism of a Spanish hacienda, we craft elevations with timeless proportions.",
        "We specify durable exterior materials suited to the local climate, ensuring your house facade looks as majestic ten years from now as it does on move-in day."
      ],
      specsHighlight: [
        { label: 'Architectural Styles', value: 'Modern Minimalist, Spanish, Contemporary' },
        { label: 'Boundary Wall', value: 'Coordinated Main Gate & Boundary Wall DWG' },
        { label: 'Dusk Perspectives', value: 'Night Facade Illumination Plans Included' }
      ]
    }
  }
};

export function CategoryPage({
  pageType,
  plans,
  settings,
  onSelectPlan,
  onNavigate,
  onOpenInquiry
}: CategoryPageProps) {
  const config = CATEGORY_CONFIGS[pageType] || CATEGORY_CONFIGS['floor-plans-gallery'];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(config.categoryFilter || 'All');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [selectedBedrooms, setSelectedBedrooms] = useState('All');
  const [selectedFloors, setSelectedFloors] = useState('All');

  // Filter plans
  const filteredPlans = plans.filter((p) => {
    // Category match
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    // Style match
    if (selectedStyle !== 'All' && p.style !== selectedStyle) return false;
    // Bedrooms match
    if (selectedBedrooms !== 'All' && p.bedrooms < parseInt(selectedBedrooms)) return false;
    // Floors match
    if (selectedFloors !== 'All' && p.floorsCount !== parseInt(selectedFloors)) return false;
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.plotSizeLabel.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.style.toLowerCase().includes(q) ||
        p.keyFeatures.some((f) => f.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory(config.categoryFilter || 'All');
    setSelectedStyle('All');
    setSelectedBedrooms('All');
    setSelectedFloors('All');
  };

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9+]/g, '').replace('+', '');
  const categoryWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Salam Planova Team, I am browsing "${config.title}" and would like to discuss design options.`
  )}`;

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <SEOHead
        title={config.seoTitle}
        description={config.seoDescription}
        keywords={config.keywords}
        canonicalPath={config.canonicalPath}
      />

      {/* Page Header */}
      <div className="border-b border-[#202636] pb-8">
        <div className="flex items-center gap-2 text-xs font-mono-cad text-[#C5A059] mb-2 uppercase">
          <span>PLANOVA ARCHITECTURAL COLLECTIONS</span>
          <span>·</span>
          <span>{config.canonicalPath.replace('/', '')}</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              {config.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed font-light">
              {config.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={categoryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2 shadow-lg shadow-[#25D366]/10"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>Inquire via WhatsApp</span>
            </a>
            <button
              onClick={() => onNavigate('/custom-order')}
              className="px-5 py-3 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase transition-colors"
            >
              Order Custom Plan
            </button>
          </div>
        </div>
      </div>

      {/* Editorial Guide / Educational Specs Box */}
      <div className="rounded-2xl bg-[#121620] border border-[#232938] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-3">
          <div className="text-xs font-mono-cad uppercase text-[#C5A059] font-bold">
            Architectural Insights & Society Bylaws
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
            {config.editorialGuide.heading}
          </h3>
          {config.editorialGuide.paragraphs.map((p, idx) => (
            <p key={idx} className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              {p}
            </p>
          ))}
        </div>

        <div className="lg:col-span-4 bg-[#171C26] border border-[#272F40] rounded-xl p-5 space-y-3">
          <div className="text-xs font-mono-cad text-[#E5C07B] uppercase font-bold border-b border-[#252C3D] pb-2">
            Technical Standards:
          </div>
          {config.editorialGuide.specsHighlight.map((spec, idx) => (
            <div key={idx} className="text-xs">
              <div className="text-slate-400 font-mono-cad text-[10px] uppercase">{spec.label}</div>
              <div className="text-white font-medium mt-0.5">{spec.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div>
        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStyle={selectedStyle}
          onStyleChange={setSelectedStyle}
          selectedBedrooms={selectedBedrooms}
          onBedroomsChange={setSelectedBedrooms}
          selectedFloors={selectedFloors}
          onFloorsChange={setSelectedFloors}
          onReset={handleReset}
          totalResults={filteredPlans.length}
        />
      </div>

      {/* Plans Grid */}
      {filteredPlans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onSelect={onSelectPlan}
              whatsappNumber={settings.whatsappNumber}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#121620] border border-[#202636] rounded-2xl p-8 space-y-4">
          <Building2 className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="font-heading text-xl font-bold text-white">No Matching Plans in this Category</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            We have not found pre-drawn catalog plans with the exact filter combination selected, but our architects can design this custom layout for you in 3-5 days.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-[#1B212D] text-slate-200 text-xs hover:bg-[#252C3D]"
            >
              Reset Filters
            </button>
            <button
              onClick={() => onNavigate('/custom-order')}
              className="px-5 py-2.5 rounded-lg bg-[#C5A059] text-black font-semibold text-xs hover:bg-[#D4AF37]"
            >
              Order Custom House Plan
            </button>
          </div>
        </div>
      )}

      {/* Bottom Custom Order Banner */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-[#171D27] to-[#121620] border border-[#283142] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="font-heading text-xl font-bold text-white">
            Need a Specific Plot Size or Custom Room Configuration?
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Submit your plot length, width, and requirements in our Custom Order Studio for an instant quote.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/custom-order')}
          className="px-6 py-3 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider shrink-0"
        >
          Open Custom Order Form
        </button>
      </div>

    </div>
  );
}
