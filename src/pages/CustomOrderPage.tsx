import React, { useState } from 'react';
import { 
  Compass, 
  Layers, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  FileText, 
  Calculator,
  User,
  Phone,
  Mail,
  MapPin,
  Building
} from 'lucide-react';
import { SiteSettings } from '../types';
import { api } from '../services/api';
import { SEOHead } from '../components/SEOHead';

interface CustomOrderPageProps {
  settings: SiteSettings;
  onNavigate: (path: string) => void;
}

export function CustomOrderPage({ settings, onNavigate }: CustomOrderPageProps) {
  // Step / Form State
  const [customerName, setCustomerName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [cityOrCountry, setCityOrCountry] = useState('Lahore, Pakistan');

  const [plotCategory, setPlotCategory] = useState<'5 Marla' | '7 Marla' | '10 Marla' | '1 Kanal' | '2 Kanal' | 'Custom Size'>('5 Marla');
  const [plotWidthFt, setPlotWidthFt] = useState<number>(25);
  const [plotLengthFt, setPlotLengthFt] = useState<number>(50);
  const [plotFacing, setPlotFacing] = useState<'North' | 'South' | 'East' | 'West' | 'Corner' | 'Park Facing'>('North');

  const [floors, setFloors] = useState<'Single Storey' | 'Double Storey' | 'Triple Storey' | 'With Basement'>('Double Storey');
  const [bedroomsCount, setBedroomsCount] = useState<number>(4);
  const [bathroomsCount, setBathroomsCount] = useState<number>(4);
  const [carParking, setCarParking] = useState<number>(1);
  const [designStyle, setDesignStyle] = useState<'Modern' | 'Contemporary' | 'Spanish' | 'Classical' | 'Minimalist'>('Modern');

  const [desiredServices, setDesiredServices] = useState<string[]>([
    '2D AutoCAD Floor Plans',
    '3D Front Elevation'
  ]);
  const [specialRequirements, setSpecialRequirements] = useState(
    'Need double height entrance lobby, open kitchen with dirty kitchen nook, and drawing room with powder bath.'
  );

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastOrderId, setLastOrderId] = useState('');

  // Quick preset updater
  const handlePresetChange = (preset: typeof plotCategory) => {
    setPlotCategory(preset);
    if (preset === '5 Marla') {
      setPlotWidthFt(25);
      setPlotLengthFt(50);
      setBedroomsCount(4);
      setCarParking(1);
    } else if (preset === '7 Marla') {
      setPlotWidthFt(30);
      setPlotLengthFt(60);
      setBedroomsCount(4);
      setCarParking(2);
    } else if (preset === '10 Marla') {
      setPlotWidthFt(35);
      setPlotLengthFt(65);
      setBedroomsCount(5);
      setCarParking(2);
    } else if (preset === '1 Kanal') {
      setPlotWidthFt(50);
      setPlotLengthFt(90);
      setBedroomsCount(6);
      setCarParking(3);
    } else if (preset === '2 Kanal') {
      setPlotWidthFt(75);
      setPlotLengthFt(120);
      setBedroomsCount(7);
      setCarParking(4);
    }
  };

  const toggleService = (srv: string) => {
    if (desiredServices.includes(srv)) {
      setDesiredServices(desiredServices.filter(s => s !== srv));
    } else {
      setDesiredServices([...desiredServices, srv]);
    }
  };

  // Calculations
  const plotAreaSqFt = plotWidthFt * plotLengthFt;
  const floorMultiplier = floors === 'Single Storey' ? 0.9 : floors === 'Double Storey' ? 1.8 : floors === 'Triple Storey' ? 2.6 : 2.5;
  const estimatedCoveredArea = Math.round(plotAreaSqFt * floorMultiplier);

  // Approximate package estimation
  const baseRatePerSqFt = desiredServices.length * 7 + 10;
  const estimatedDesignCostPKR = Math.max(25000, Math.round(estimatedCoveredArea * baseRatePerSqFt));
  const estimatedCostUSD = Math.round(estimatedDesignCostPKR / 280);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !whatsappNumber) return;

    setSubmitting(true);
    try {
      const order = await api.submitCustomOrder({
        customerName,
        whatsappNumber,
        email,
        cityOrCountry,
        plotCategory,
        plotWidthFt,
        plotLengthFt,
        plotFacing,
        floors,
        bedroomsCount,
        bathroomsCount,
        carParking,
        designStyle,
        desiredServices: desiredServices as any,
        specialRequirements,
        estimatedAreaSqFt: estimatedCoveredArea,
        budgetPKR: `Rs. ${estimatedDesignCostPKR.toLocaleString()}`
      });
      setLastOrderId(order.id);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9+]/g, '').replace('+', '');
  const whatsAppSummaryText = encodeURIComponent(
    `*Salam Planova Architects - Custom House Design Order*
Client: ${customerName || 'Prospective Homeowner'}
WhatsApp: ${whatsappNumber}
Location: ${cityOrCountry}
Plot Size: ${plotWidthFt}' × ${plotLengthFt}' (${plotCategory}, ~${plotAreaSqFt} sq. ft.)
Facing: ${plotFacing}
Storeys: ${floors}
Bedrooms: ${bedroomsCount} | Baths: ${bathroomsCount} | Cars: ${carParking}
Style: ${designStyle}
Services: ${desiredServices.join(', ')}
Covered Area: ~${estimatedCoveredArea.toLocaleString()} sq. ft.
Requirements: ${specialRequirements}`
  );

  const directWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${whatsAppSummaryText}`;

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="Custom House Design Orders – Planova Architectural Studio"
        description="Submit your custom plot dimensions (length x width, floors, bedrooms) to order bespoke 2D AutoCAD house plans, 3D elevations, and engineering blueprints."
        keywords="custom house plans, order house design, 2D AutoCAD design order, architectural blueprint order, 5 Marla custom plan"
        canonicalPath="/custom-order"
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181D26] border border-[#2A3140] text-xs font-mono-cad text-[#C5A059]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bespoke Residential Architecture Studio</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Custom House Design Order Studio
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed font-light">
          Have unique plot dimensions, corner setbacks, or specific family room requirements? Fill in your specifications below for an instant preliminary estimate and direct architectural WhatsApp review.
        </p>
      </div>

      {submitted ? (
        <div className="max-w-2xl mx-auto bg-[#121620] border border-[#2B3448] rounded-2xl p-8 sm:p-10 text-center shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-white">
            Custom Order Received!
          </h2>
          <div className="bg-[#171C26] p-4 rounded-xl text-xs font-mono-cad text-slate-300 space-y-1 text-left">
            <div className="text-[#C5A059] font-bold">Order ID: {lastOrderId || 'ORD-PLANOVA-NEW'}</div>
            <div>Client: {customerName} ({whatsappNumber})</div>
            <div>Plot: {plotWidthFt}' × {plotLengthFt}' ({plotCategory}) · {floors}</div>
            <div>Est. Covered Area: ~{estimatedCoveredArea.toLocaleString()} sq. ft.</div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our Senior Architectural Engineer will review your plot dimensions and reply on WhatsApp within 30 minutes with preliminary zoning recommendations.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>Transmit Details on WhatsApp Now</span>
            </a>
            <button
              onClick={() => { setSubmitted(false); }}
              className="px-5 py-3.5 rounded-xl bg-[#1C222E] hover:bg-[#252C3D] text-slate-300 text-xs transition-colors"
            >
              Submit Another Plot
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form on Left */}
          <div className="lg:col-span-8 bg-[#121620] border border-[#222836] rounded-2xl p-6 sm:p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Section 1: Plot Category & Dimensions */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-heading font-bold text-white border-b border-[#212736] pb-2">
                  <Compass className="w-4 h-4 text-[#C5A059]" />
                  <span>Step 1: Plot Specifications & Dimensions</span>
                </div>

                {/* Preset Category Buttons */}
                <div>
                  <label className="block text-xs font-mono-cad text-slate-400 mb-2">
                    Quick Plot Preset:
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {(['5 Marla', '7 Marla', '10 Marla', '1 Kanal', '2 Kanal', 'Custom Size'] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handlePresetChange(cat)}
                        className={`py-2 px-2 rounded-lg text-xs font-mono-cad font-medium transition-colors ${
                          plotCategory === cat
                            ? 'bg-[#C5A059] text-black font-semibold'
                            : 'bg-[#181C26] text-slate-300 hover:text-white border border-[#252C3A]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Width & Length Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                      Plot Width (Frontage in Feet) *
                    </label>
                    <input
                      type="number"
                      required
                      min={10}
                      max={300}
                      value={plotWidthFt}
                      onChange={(e) => setPlotWidthFt(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-[#0C0F14] border border-[#252C3D] rounded-xl text-white font-mono-cad text-sm focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                      Plot Length / Depth (Feet) *
                    </label>
                    <input
                      type="number"
                      required
                      min={10}
                      max={500}
                      value={plotLengthFt}
                      onChange={(e) => setPlotLengthFt(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-[#0C0F14] border border-[#252C3D] rounded-xl text-white font-mono-cad text-sm focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                      Plot Orientation / Facing
                    </label>
                    <select
                      value={plotFacing}
                      onChange={(e) => setPlotFacing(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-[#0C0F14] border border-[#252C3D] rounded-xl text-white text-xs focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="North">North Facing (Cool & Glare-free)</option>
                      <option value="South">South Facing (Maximum Winter Sun)</option>
                      <option value="East">East Facing (Morning Sunlight)</option>
                      <option value="West">West Facing (Sunset View)</option>
                      <option value="Corner">Corner Plot (Dual Road Access)</option>
                      <option value="Park Facing">Park Facing Frontage</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Storeys & Room Requirements */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-heading font-bold text-white border-b border-[#212736] pb-2">
                  <Layers className="w-4 h-4 text-[#C5A059]" />
                  <span>Step 2: House Configuration & Storeys</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                      Floors / Storeys
                    </label>
                    <select
                      value={floors}
                      onChange={(e) => setFloors(e.target.value as any)}
                      className="w-full px-3 py-2.5 bg-[#0C0F14] border border-[#252C3D] rounded-xl text-white text-xs focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="Single Storey">Single Storey (Ground Only)</option>
                      <option value="Double Storey">Double Storey (G + 1st)</option>
                      <option value="Triple Storey">Triple Storey (G + 1 + 2)</option>
                      <option value="With Basement">Basement + Ground + 1st</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                      Bedrooms Count
                    </label>
                    <select
                      value={bedroomsCount}
                      onChange={(e) => setBedroomsCount(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-[#0C0F14] border border-[#252C3D] rounded-xl text-white text-xs focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value={2}>2 Bedrooms</option>
                      <option value={3}>3 Bedrooms</option>
                      <option value={4}>4 Bedrooms</option>
                      <option value={5}>5 Bedrooms</option>
                      <option value={6}>6 Bedrooms</option>
                      <option value={7}>7+ Bedrooms</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                      Bathrooms Count
                    </label>
                    <select
                      value={bathroomsCount}
                      onChange={(e) => setBathroomsCount(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-[#0C0F14] border border-[#252C3D] rounded-xl text-white text-xs focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value={2}>2 Bathrooms</option>
                      <option value={3}>3 Bathrooms</option>
                      <option value={4}>4 Bathrooms</option>
                      <option value={5}>5 Bathrooms</option>
                      <option value={6}>6 Bathrooms</option>
                      <option value={7}>7+ Bathrooms</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                      Car Parking Space
                    </label>
                    <select
                      value={carParking}
                      onChange={(e) => setCarParking(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-[#0C0F14] border border-[#252C3D] rounded-xl text-white text-xs focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value={1}>1 Car Porch</option>
                      <option value={2}>2 Cars Porch</option>
                      <option value={3}>3 Cars Porch</option>
                      <option value={4}>4+ Cars Garage</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                    Architectural Design Style
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {(['Modern', 'Contemporary', 'Spanish', 'Classical', 'Minimalist'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setDesignStyle(st)}
                        className={`py-2 px-2 rounded-lg text-xs font-medium transition-colors ${
                          designStyle === st
                            ? 'bg-[#C5A059] text-black font-semibold'
                            : 'bg-[#181C26] text-slate-300 hover:text-white border border-[#252C3A]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 3: Desired Services */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-heading font-bold text-white border-b border-[#212736] pb-2">
                  <FileText className="w-4 h-4 text-[#C5A059]" />
                  <span>Step 3: Required Engineering Deliverables</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    '2D AutoCAD Floor Plans',
                    '3D Front Elevation',
                    'Complete Structural & MEP',
                    'Interior 3D Renders'
                  ].map((srv) => {
                    const isChecked = desiredServices.includes(srv);
                    return (
                      <div
                        key={srv}
                        onClick={() => toggleService(srv)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                          isChecked
                            ? 'bg-[#C5A059]/15 border-[#C5A059] text-white font-medium'
                            : 'bg-[#161B25] border-[#252C3B] text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span>{srv}</span>
                        <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                          isChecked ? 'bg-[#C5A059] text-black font-bold' : 'border border-slate-600'
                        }`}>
                          {isChecked ? '✓' : ''}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                    Special Requirements & Notes (Dirty kitchen, servant quarter, swimming pool, open patio, etc.)
                  </label>
                  <textarea
                    rows={3}
                    value={specialRequirements}
                    onChange={(e) => setSpecialRequirements(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#0C0F14] border border-[#242A38] rounded-xl text-xs text-white focus:outline-none focus:border-[#C5A059] resize-none"
                  />
                </div>
              </div>

              {/* Section 4: Contact Info & WhatsApp */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-heading font-bold text-white border-b border-[#212736] pb-2">
                  <User className="w-4 h-4 text-[#C5A059]" />
                  <span>Step 4: Contact Information</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Engr. Salman Tariq"
                      className="w-full px-3.5 py-2.5 bg-[#0C0F14] border border-[#242A38] rounded-xl text-sm text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                      WhatsApp Number (with Country Code) *
                    </label>
                    <input
                      type="text"
                      required
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full px-3.5 py-2.5 bg-[#0C0F14] border border-[#242A38] rounded-xl text-sm text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="salman@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-[#0C0F14] border border-[#242A38] rounded-xl text-sm text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                      City & Housing Society (e.g. DHA Phase 6 Lahore, Bahria Town)
                    </label>
                    <input
                      type="text"
                      value={cityOrCountry}
                      onChange={(e) => setCityOrCountry(e.target.value)}
                      placeholder="City / Society Name"
                      className="w-full px-3.5 py-2.5 bg-[#0C0F14] border border-[#242A38] rounded-xl text-sm text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-[#C5A059]/10"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting Specifications...' : 'Submit Custom Plan Order'}</span>
                </button>

                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  <span>Send via WhatsApp</span>
                </a>
              </div>

            </form>
          </div>

          {/* Real-Time Live Architectural Scorecard on Right */}
          <div className="lg:col-span-4 sticky top-28 space-y-5">
            <div className="rounded-2xl bg-[#121620] border border-[#283142] p-6 shadow-xl space-y-5 gold-glow">
              <div className="flex items-center justify-between pb-3 border-b border-[#222838]">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#C5A059]" />
                  <h3 className="font-heading text-base font-bold text-white">Live Plan Estimation</h3>
                </div>
                <span className="text-[10px] font-mono-cad text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded">
                  Instant
                </span>
              </div>

              {/* Metrics */}
              <div className="space-y-3 text-xs font-mono-cad">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Total Plot Area:</span>
                  <span className="text-white font-bold">{plotAreaSqFt.toLocaleString()} sq. ft.</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Category Size:</span>
                  <span className="text-[#C5A059] font-bold">{plotCategory}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Estimated Covered Area:</span>
                  <span className="text-white font-bold">~{estimatedCoveredArea.toLocaleString()} sq. ft.</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Orientation:</span>
                  <span className="text-slate-200">{plotFacing}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Storey Setup:</span>
                  <span className="text-slate-200">{floors}</span>
                </div>
              </div>

              {/* Price Estimation */}
              <div className="p-4 rounded-xl bg-[#171C26] border border-[#242A38] space-y-1">
                <div className="text-[10px] uppercase font-mono-cad text-slate-400">
                  Estimated Design Package Quote
                </div>
                <div className="text-2xl font-bold font-mono-cad text-[#E5C07B]">
                  Rs. {estimatedDesignCostPKR.toLocaleString()}
                  <span className="text-xs font-normal text-slate-400 ml-2">(${estimatedCostUSD} USD)</span>
                </div>
                <div className="text-[10px] text-emerald-400">
                  Includes full AutoCAD source files & revisions
                </div>
              </div>

              {/* Included Guarantee */}
              <div className="space-y-2 text-xs text-slate-400 pt-1">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>100% compliance with local society development bylaws.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Up to 3 design revision cycles included.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>DWG file compatibility with all AutoCAD versions (2018+).</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
