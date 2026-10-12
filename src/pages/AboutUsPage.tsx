import React from 'react';
import { Compass, CheckCircle2, Award, Users, Layers, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';
import { SiteSettings } from '../types';
import { SEOHead } from '../components/SEOHead';

interface AboutUsPageProps {
  settings: SiteSettings;
  onNavigate: (path: string) => void;
}

export function AboutUsPage({ settings, onNavigate }: AboutUsPageProps) {
  const cleanPhone = settings.whatsappNumber.replace(/[^0-9+]/g, '').replace('+', '');
  const whatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Salam Planova Architecture Team, I would like to learn more about your studio services.")}`;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <SEOHead
        title="About Us – Planova House Plans Architectural Studio"
        description="Learn about Planova House Plans. Certified architects and structural engineers designing 2D AutoCAD blueprints, 3D house designs, and modern villas."
        keywords="about Planova, house plan architects, architectural studio, AutoCAD engineers, 3D visualizers Pakistan"
        canonicalPath="/about"
      />

      {/* Hero Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181D26] border border-[#272F40] text-xs font-mono-cad text-[#C5A059]">
          <Compass className="w-3.5 h-3.5" />
          <span>Architectural Studio Excellence</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Where Structural Precision Meets Contemporary Elegance
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          Planova House Plans was founded with a singular conviction: that every residential plot—whether a compact 5 Marla urban plot or an expansive 1 Kanal estate—deserves world-class architectural engineering and bespoke spatial harmony.
        </p>
      </div>

      {/* Grid: Studio Story & Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-light">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Our Architectural Philosophy
          </h2>
          <p>
            Too often in residential construction, homeowners rely on untrained draftsmen who replicate standard templates without understanding ventilation dynamics, natural sun orientations, or structural load paths.
          </p>
          <p>
            At Planova, every line drawn in our 2D AutoCAD files represents deliberate spatial planning. We calculate sun angles to prevent scorching west-facing master bedrooms, design continuous air-circulation shafts (OTS) to keep bathrooms fresh, and ensure car porches comfortably accommodate full-size modern SUVs without obstruction.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-mono-cad">
            <div className="p-3.5 rounded-xl bg-[#121620] border border-[#212738]">
              <div className="text-[#C5A059] font-bold text-xl font-heading">500+</div>
              <div className="text-slate-400 mt-1">Houses Designed & Built</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#121620] border border-[#212738]">
              <div className="text-[#C5A059] font-bold text-xl font-heading">100%</div>
              <div className="text-slate-400 mt-1">Municipal Bylaws Pass Rate</div>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-[#242B3A] shadow-2xl aspect-[4/3]">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Planova Architectural Design Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1116] via-transparent to-transparent opacity-70" />
          <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3.5 rounded-xl text-xs text-slate-300 font-mono-cad border border-white/10">
            DHA Lahore Studio Head Office · Civil & Structural Engineering Team
          </div>
        </div>
      </div>

      {/* Software Proficiency & Standards */}
      <div className="p-8 rounded-2xl bg-[#121620] border border-[#222838] space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="text-xs font-mono-cad uppercase text-[#C5A059] font-bold">Industry Leading Tech Stack</div>
          <h3 className="font-heading text-2xl font-bold text-white">Software Tools We Master</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-[#161B25] border border-[#252C3D]">
            <div className="font-heading font-bold text-base text-white">Autodesk AutoCAD</div>
            <div className="text-xs text-[#C5A059] mt-1 font-mono-cad">2D Working & DWG Blueprints</div>
          </div>
          <div className="p-4 rounded-xl bg-[#161B25] border border-[#252C3D]">
            <div className="font-heading font-bold text-base text-white">3ds Max & V-Ray</div>
            <div className="text-xs text-[#C5A059] mt-1 font-mono-cad">Photorealistic 4K Exterior Renders</div>
          </div>
          <div className="p-4 rounded-xl bg-[#161B25] border border-[#252C3D]">
            <div className="font-heading font-bold text-base text-white">Autodesk Revit BIM</div>
            <div className="text-xs text-[#C5A059] mt-1 font-mono-cad">Parametric Building Modeling</div>
          </div>
          <div className="p-4 rounded-xl bg-[#161B25] border border-[#252C3D]">
            <div className="font-heading font-bold text-base text-white">ETABS & CSI SAFE</div>
            <div className="text-xs text-[#C5A059] mt-1 font-mono-cad">RCC Seismic Structural Calculations</div>
          </div>
        </div>
      </div>

      {/* Team Credentials */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="text-xs font-mono-cad uppercase text-[#C5A059] font-bold">Certified Professionals</div>
          <h3 className="font-heading text-2xl font-bold text-white">Meet Our Architectural Leadership</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#121620] border border-[#222838] text-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-[#1A1F2B] border-2 border-[#C5A059] mx-auto overflow-hidden">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="Lead Architect" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-heading text-base font-bold text-white">Arch. Zunaira Khan</h4>
              <div className="text-xs text-[#C5A059] font-mono-cad">Principal Architect (B.Arch, PCATP)</div>
            </div>
            <p className="text-xs text-slate-400">12+ years experience in modern residential villas and space planning in Bahria & DHA.</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121620] border border-[#222838] text-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-[#1A1F2B] border-2 border-[#C5A059] mx-auto overflow-hidden">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" alt="Chief Structural Engineer" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-heading text-base font-bold text-white">Engr. Tariq Mehmood</h4>
              <div className="text-xs text-[#C5A059] font-mono-cad">Head Structural Engineer (M.Sc. Civil, PEC)</div>
            </div>
            <p className="text-xs text-slate-400">Specialist in earthquake-resistant RCC structural column frames and soil capacity analysis.</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121620] border border-[#222838] text-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-[#1A1F2B] border-2 border-[#C5A059] mx-auto overflow-hidden">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" alt="Lead 3D Visualizer" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-heading text-base font-bold text-white">Hamza Farooq</h4>
              <div className="text-xs text-[#C5A059] font-mono-cad">Lead 3D Visualizer & Elevation Artist</div>
            </div>
            <p className="text-xs text-slate-400">Expert in photorealistic 4K Lumion and 3ds Max daytime and dusk architectural rendering.</p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-[#171D27] to-[#121620] border border-[#283142] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="font-heading text-xl font-bold text-white">
            Ready to Plan Your Dream Residence?
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Connect directly with our architects for advice on your plot.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-[#25D366] text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
          <button
            onClick={() => onNavigate('/custom-order')}
            className="px-5 py-3 rounded-xl bg-[#C5A059] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#D4AF37]"
          >
            Custom Order
          </button>
        </div>
      </div>

    </div>
  );
}
