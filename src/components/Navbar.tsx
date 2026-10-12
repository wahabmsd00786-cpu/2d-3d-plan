import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  MessageSquare, 
  Layers, 
  Box, 
  Home as HomeIcon,
  Sparkles,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { SiteSettings } from '../types';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  settings: SiteSettings;
  onOpenSearch: () => void;
}

export function Navbar({ currentPath, onNavigate, settings, onOpenSearch }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [plansDropdownOpen, setPlansDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9+]/g, '');
  const defaultWhatsAppUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent("Salam Planova Architecture Team, I would like to inquire about house design services.")}`;

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setPlansDropdownOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (path: string) => currentPath === path;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0D0F12]/95 backdrop-blur-md border-b border-[#222730]">
      {/* Top Architectural Announcement Bar */}
      {settings.announcementActive && (
        <div className="bg-[#14171E] border-b border-[#232936] text-xs py-2 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[#C5A059]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-medium text-[#E2E8F0]">{settings.announcementText}</span>
            </div>
            <div className="flex items-center gap-5 text-slate-400">
              <span className="hidden sm:inline-flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-[#C5A059]" />
                {settings.displayPhone}
              </span>
              <a 
                href={defaultWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#C5A059] hover:text-[#E5C07B] font-semibold transition-colors"
              >
                <MessageSquare className="w-3 h-3 text-[#25D366]" />
                WhatsApp: {settings.whatsappNumber}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 text-left group transition-transform focus:outline-none"
          >
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#1C212B] to-[#12151B] border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] shadow-lg shadow-black/40 group-hover:border-[#C5A059] transition-all">
              <Compass className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-2xl font-bold tracking-wider text-white">PLANOVA</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
              </div>
              <span className="text-[10px] tracking-[0.22em] uppercase font-mono-cad text-slate-400 block -mt-1 font-semibold">
                House Plans & Architecture
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => handleNav('/')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/') ? 'text-[#C5A059] font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Home
            </button>

            {/* Plans by Size Dropdown */}
            <div className="relative" onMouseLeave={() => setPlansDropdownOpen(false)}>
              <button
                onClick={() => setPlansDropdownOpen(!plansDropdownOpen)}
                onMouseEnter={() => setPlansDropdownOpen(true)}
                className={`px-3 py-2 text-sm font-medium inline-flex items-center gap-1 transition-colors ${
                  ['/5-marla-plans', '/10-marla-plans', '/1-kanal-plans', '/double-storey-plans'].includes(currentPath)
                    ? 'text-[#C5A059]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>House Plans</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {plansDropdownOpen && (
                <div 
                  className="absolute left-0 mt-1 w-64 rounded-xl bg-[#141820] border border-[#262C38] shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseEnter={() => setPlansDropdownOpen(true)}
                >
                  <button
                    onClick={() => handleNav('/5-marla-plans')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-[#C5A059] hover:bg-[#1D222E] flex items-center gap-2.5 transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-[#C5A059]" />
                    <div>
                      <div className="font-medium text-white">5 Marla House Plans</div>
                      <div className="text-xs text-slate-400">25'×45' & 25'×50' layouts</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('/10-marla-plans')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-[#C5A059] hover:bg-[#1D222E] flex items-center gap-2.5 transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-[#C5A059]" />
                    <div>
                      <div className="font-medium text-white">10 Marla House Plans</div>
                      <div className="text-xs text-slate-400">35'×65' & 35'×70' villas</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('/1-kanal-plans')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-[#C5A059] hover:bg-[#1D222E] flex items-center gap-2.5 transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-[#C5A059]" />
                    <div>
                      <div className="font-medium text-white">1 Kanal House Plans</div>
                      <div className="text-xs text-slate-400">50'×90' luxury estates</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('/double-storey-plans')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-[#C5A059] hover:bg-[#1D222E] flex items-center gap-2.5 transition-colors"
                  >
                    <Layers className="w-4 h-4 text-[#C5A059]" />
                    <div>
                      <div className="font-medium text-white">Double Storey Plans</div>
                      <div className="text-xs text-slate-400">Complete G+1 drawings</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Design Services Dropdown */}
            <div className="relative" onMouseLeave={() => setServicesDropdownOpen(false)}>
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className={`px-3 py-2 text-sm font-medium inline-flex items-center gap-1 transition-colors ${
                  ['/autocad-plans', '/3d-designs', '/floor-plans-gallery', '/interior-design', '/exterior-design'].includes(currentPath)
                    ? 'text-[#C5A059]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>CAD & 3D Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {servicesDropdownOpen && (
                <div 
                  className="absolute left-0 mt-1 w-64 rounded-xl bg-[#141820] border border-[#262C38] shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                >
                  <button
                    onClick={() => handleNav('/autocad-plans')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-[#C5A059] hover:bg-[#1D222E] flex items-center gap-2.5 transition-colors"
                  >
                    <Layers className="w-4 h-4 text-[#C5A059]" />
                    <div>
                      <div className="font-medium text-white">2D AutoCAD House Plans</div>
                      <div className="text-xs text-slate-400">Source DWG blueprints</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('/3d-designs')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-[#C5A059] hover:bg-[#1D222E] flex items-center gap-2.5 transition-colors"
                  >
                    <Box className="w-4 h-4 text-[#C5A059]" />
                    <div>
                      <div className="font-medium text-white">3D House Designs</div>
                      <div className="text-xs text-slate-400">4K exterior elevations</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('/floor-plans-gallery')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-[#C5A059] hover:bg-[#1D222E] flex items-center gap-2.5 transition-colors"
                  >
                    <HomeIcon className="w-4 h-4 text-[#C5A059]" />
                    <div>
                      <div className="font-medium text-white">Floor Plans Gallery</div>
                      <div className="text-xs text-slate-400">High-resolution layouts</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('/interior-design')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-[#C5A059] hover:bg-[#1D222E] flex items-center gap-2.5 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <div>
                      <div className="font-medium text-white">Interior Design</div>
                      <div className="text-xs text-slate-400">Kitchens, bedrooms & lounges</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('/exterior-design')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-[#C5A059] hover:bg-[#1D222E] flex items-center gap-2.5 transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-[#C5A059]" />
                    <div>
                      <div className="font-medium text-white">Exterior Design</div>
                      <div className="text-xs text-slate-400">Front facades & boundary walls</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('/custom-order')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/custom-order') ? 'text-[#C5A059] font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Custom Orders
            </button>

            <button
              onClick={() => handleNav('/blog')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/blog') ? 'text-[#C5A059] font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Blog
            </button>

            <button
              onClick={() => handleNav('/about')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-[#C5A059] font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => handleNav('/contact')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-[#C5A059] font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Action CTAs: Search + WhatsApp + Admin */}
          <div className="flex items-center gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-lg bg-[#141820] border border-[#252A36] text-slate-400 hover:text-white hover:border-[#C5A059]/50 transition-colors"
              title="Search plans by plot size, bedrooms, style"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Custom Design Order CTA */}
            <button
              onClick={() => handleNav('/custom-order')}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C5A059] hover:bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-md shadow-[#C5A059]/10"
            >
              <span>Order Custom Plan</span>
            </button>

            {/* Direct WhatsApp Button */}
            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-medium text-xs tracking-wide transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-[#25D366]" />
              <span>WhatsApp Us</span>
            </a>

            {/* Admin Key */}
            <button
              onClick={() => handleNav('/admin')}
              className={`p-2.5 rounded-lg transition-colors ${
                isActive('/admin') 
                  ? 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-lg bg-[#141820] border border-[#262B37] text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0F1218] border-b border-[#252A36] px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto">
          <div className="space-y-1 mb-4">
            <button
              onClick={() => handleNav('/')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                isActive('/') ? 'bg-[#C5A059]/15 text-[#C5A059]' : 'text-slate-300 hover:bg-[#171B24]'
              }`}
            >
              Home
            </button>

            {/* Category Section */}
            <div className="pt-2 pb-1 px-3 text-[11px] font-mono-cad uppercase text-slate-500 tracking-wider">
              House Plans By Size
            </div>
            <button
              onClick={() => handleNav('/5-marla-plans')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-[#171B24] flex items-center justify-between"
            >
              <span>5 Marla House Plans (25'×45', 25'×50')</span>
              <span className="text-xs text-[#C5A059]">Popular</span>
            </button>
            <button
              onClick={() => handleNav('/10-marla-plans')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-[#171B24]"
            >
              10 Marla House Plans (35'×65')
            </button>
            <button
              onClick={() => handleNav('/1-kanal-plans')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-[#171B24]"
            >
              1 Kanal House Plans (50'×90')
            </button>
            <button
              onClick={() => handleNav('/double-storey-plans')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-[#171B24]"
            >
              Double Storey House Plans
            </button>

            {/* Design Services */}
            <div className="pt-3 pb-1 px-3 text-[11px] font-mono-cad uppercase text-slate-500 tracking-wider">
              Architectural & CAD Services
            </div>
            <button
              onClick={() => handleNav('/autocad-plans')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-[#171B24]"
            >
              2D AutoCAD House Plans & DWG
            </button>
            <button
              onClick={() => handleNav('/3d-designs')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-[#171B24]"
            >
              3D House Designs & Elevations
            </button>
            <button
              onClick={() => handleNav('/floor-plans-gallery')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-[#171B24]"
            >
              Floor Plans Gallery
            </button>
            <button
              onClick={() => handleNav('/interior-design')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-[#171B24]"
            >
              Interior Design
            </button>
            <button
              onClick={() => handleNav('/exterior-design')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-[#171B24]"
            >
              Exterior Design
            </button>

            {/* General Pages */}
            <div className="pt-3 pb-1 px-3 text-[11px] font-mono-cad uppercase text-slate-500 tracking-wider">
              Studio & Custom Orders
            </div>
            <button
              onClick={() => handleNav('/custom-order')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#C5A059] font-medium bg-[#C5A059]/10"
            >
              ✨ Custom House Design Orders
            </button>
            <button
              onClick={() => handleNav('/blog')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-[#171B24]"
            >
              Architectural Blog & Guides
            </button>
            <button
              onClick={() => handleNav('/about')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-[#171B24]"
            >
              About Planova
            </button>
            <button
              onClick={() => handleNav('/contact')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-[#171B24]"
            >
              Contact Us
            </button>
            <button
              onClick={() => handleNav('/admin')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-[#171B24] flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Admin Dashboard</span>
            </button>
          </div>

          <div className="pt-3 border-t border-[#252A36] flex flex-col gap-2">
            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-lg bg-[#25D366] text-black font-semibold text-sm flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp ({settings.whatsappNumber})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
