import React from 'react';
import { Compass, Phone, Mail, MapPin, MessageSquare, ArrowUpRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SiteSettings } from '../types';

interface FooterProps {
  onNavigate: (path: string) => void;
  settings: SiteSettings;
}

export function Footer({ onNavigate, settings }: FooterProps) {
  const cleanPhone = settings.whatsappNumber.replace(/[^0-9+]/g, '');
  const whatsAppUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent("Salam Planova Team, I want to discuss a house design plan.")}`;

  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090B0E] border-t border-[#1C212B] text-slate-300">
      {/* Top Value Banner */}
      <div className="border-b border-[#1A1F29] bg-[#0E1116] py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">100% AutoCAD Source Files</h4>
              <p className="text-xs text-slate-400 mt-0.5">Editable DWG, high-res PDF blueprints ready for civil contractors.</p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Society Bylaws Compliant</h4>
              <p className="text-xs text-slate-400 mt-0.5">Engineered to pass DHA, Bahria Town, CDA & LDA submission guidelines.</p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">4K Photorealistic 3D Renders</h4>
              <p className="text-xs text-slate-400 mt-0.5">Daylight, dusk, and night lighting perspectives with real materials.</p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Instant WhatsApp Consultation</h4>
              <p className="text-xs text-slate-400 mt-0.5">Direct chat with certified architectural engineers for modifications.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#141820] border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading text-xl font-bold tracking-wider text-white">PLANOVA</span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-mono-cad text-slate-400 block -mt-1 font-semibold">
                  HOUSE PLANS & ARCHITECTURE
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Planova House Plans is a premier architectural studio specializing in 2D AutoCAD house plans, 3D house designs, structural engineering, and customized residential layouts for 5 Marla, 10 Marla, 1 Kanal, and modern estates.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{settings.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{settings.displayPhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{settings.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] text-black font-semibold text-xs tracking-wide hover:bg-[#20bd5a] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Architect on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Plans by Plot Size */}
          <div>
            <h4 className="text-xs font-mono-cad uppercase tracking-wider text-[#C5A059] font-bold mb-4">
              House Plans By Size
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('/5-marla-plans')} className="text-slate-400 hover:text-white transition-colors">
                  5 Marla House Plans (25'×45')
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/10-marla-plans')} className="text-slate-400 hover:text-white transition-colors">
                  10 Marla House Plans (35'×65')
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/1-kanal-plans')} className="text-slate-400 hover:text-white transition-colors">
                  1 Kanal House Plans (50'×90')
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/double-storey-plans')} className="text-slate-400 hover:text-white transition-colors">
                  Double Storey House Plans
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/floor-plans-gallery')} className="text-slate-400 hover:text-white transition-colors">
                  Floor Plans Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Architectural Services */}
          <div>
            <h4 className="text-xs font-mono-cad uppercase tracking-wider text-[#C5A059] font-bold mb-4">
              Design & Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('/autocad-plans')} className="text-slate-400 hover:text-white transition-colors">
                  2D AutoCAD House Plans
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/3d-designs')} className="text-slate-400 hover:text-white transition-colors">
                  3D House Designs & Elevations
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/interior-design')} className="text-slate-400 hover:text-white transition-colors">
                  Interior Design Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/exterior-design')} className="text-slate-400 hover:text-white transition-colors">
                  Exterior Front Elevations
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/custom-order')} className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-[#C5A059]">
                  <span>Custom Design Order</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & Legal */}
          <div>
            <h4 className="text-xs font-mono-cad uppercase tracking-wider text-[#C5A059] font-bold mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('/about')} className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/contact')} className="text-slate-400 hover:text-white transition-colors">
                  Contact Us & FAQ
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/blog')} className="text-slate-400 hover:text-white transition-colors">
                  Architectural Blog
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/privacy-policy')} className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/terms-and-conditions')} className="text-slate-400 hover:text-white transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/admin')} className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Admin Dashboard</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* SEO Tag Cloud / Search Terms */}
        <div className="mt-12 pt-8 border-t border-[#1C212B]">
          <div className="text-xs text-slate-500 font-mono-cad uppercase mb-3 font-semibold">
            Target Architectural Searches & Plot Sizes:
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
            <span onClick={() => handleNav('/autocad-plans')} className="hover:text-[#C5A059] cursor-pointer">AutoCAD house plans</span>
            <span>·</span>
            <span onClick={() => handleNav('/autocad-plans')} className="hover:text-[#C5A059] cursor-pointer">2D house plans</span>
            <span>·</span>
            <span onClick={() => handleNav('/3d-designs')} className="hover:text-[#C5A059] cursor-pointer">3D house designs</span>
            <span>·</span>
            <span onClick={() => handleNav('/5-marla-plans')} className="hover:text-[#C5A059] cursor-pointer">5 Marla house plans</span>
            <span>·</span>
            <span onClick={() => handleNav('/10-marla-plans')} className="hover:text-[#C5A059] cursor-pointer">10 Marla house plans</span>
            <span>·</span>
            <span onClick={() => handleNav('/1-kanal-plans')} className="hover:text-[#C5A059] cursor-pointer">1 Kanal house plans</span>
            <span>·</span>
            <span onClick={() => handleNav('/double-storey-plans')} className="hover:text-[#C5A059] cursor-pointer">Double storey house plans</span>
            <span>·</span>
            <span onClick={() => handleNav('/5-marla-plans')} className="hover:text-[#C5A059] cursor-pointer">25x45 house design</span>
            <span>·</span>
            <span onClick={() => handleNav('/5-marla-plans')} className="hover:text-[#C5A059] cursor-pointer">25x50 house design</span>
            <span>·</span>
            <span onClick={() => handleNav('/10-marla-plans')} className="hover:text-[#C5A059] cursor-pointer">35x65 modern villa</span>
            <span>·</span>
            <span onClick={() => handleNav('/1-kanal-plans')} className="hover:text-[#C5A059] cursor-pointer">50x90 mansion blueprints</span>
            <span>·</span>
            <span onClick={() => handleNav('/floor-plans-gallery')} className="hover:text-[#C5A059] cursor-pointer">Modern residential blueprints</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-[#161B23] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Planova House Plans. All architectural rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('/privacy-policy')} className="hover:text-slate-300">Privacy Policy</button>
            <button onClick={() => handleNav('/terms-and-conditions')} className="hover:text-slate-300">Terms of Service</button>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">sitemap.xml</a>
            <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">robots.txt</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
