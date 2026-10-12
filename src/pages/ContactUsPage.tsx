import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  HelpCircle,
  Building2
} from 'lucide-react';
import { SiteSettings } from '../types';
import { api } from '../services/api';
import { SEOHead } from '../components/SEOHead';

interface ContactUsPageProps {
  settings: SiteSettings;
  onNavigate: (path: string) => void;
}

const FAQS = [
  {
    q: 'What CAD file formats do I receive upon ordering a plan?',
    a: 'You receive full editable AutoCAD DWG source files (compatible with AutoCAD 2018 up to the latest version), high-resolution vector PDF blueprints formatted for A1 and A3 plotters, and DXF files. If you ordered a 3D package, you also receive 4K photorealistic JPG/PNG renders and 3D SketchUp/3ds Max source files.'
  },
  {
    q: 'Can a catalog plan be adjusted for my specific plot dimensions?',
    a: 'Yes, absolutely! Virtually every society has minor setback or dimension variations (e.g. 25x45 vs 25x50). Our architects can customize any existing plan or reconfigure bedroom numbers, car porch depth, and staircase positions within 24 to 48 hours.'
  },
  {
    q: 'Do your blueprints get approved by DHA, Bahria Town, CDA, and LDA?',
    a: 'Yes. All our architectural blueprints are prepared strictly in compliance with compulsory open space (COS), maximum ground coverage limits, front/rear setback rules, and mumty height regulations across all major housing societies.'
  },
  {
    q: 'I am an overseas Pakistani / international client. How do we communicate?',
    a: 'Over 40% of our residential clients are overseas Pakistanis living in the UAE, UK, USA, Canada, and Saudi Arabia. We communicate seamlessly via WhatsApp, sharing PDF drafts, 3D video walk-through concepts, and video calls at hours convenient for your time zone.'
  },
  {
    q: 'How many revision rounds are included in custom design orders?',
    a: 'Every custom house design order includes up to 3 comprehensive design revision cycles at the conceptual 2D stage. We only proceed to structural and MEP engineering once you are 100% satisfied with the spatial room layout.'
  }
];

export function ContactUsPage({ settings, onNavigate }: ContactUsPageProps) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('New House Plan Inquiry');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9+]/g, '').replace('+', '');
  const directWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Salam Planova Team,\nName: ${name || 'Prospective Client'}\nMessage: ${message || 'I would like to inquire about house design services.'}`
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !whatsapp) return;

    setSubmitting(true);
    try {
      await api.submitInquiry({
        name,
        whatsapp,
        email,
        planTitle: subject,
        message,
        sourcePage: 'Contact Us'
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <SEOHead
        title="Contact Us – Planova House Plans Studio"
        description="Get in touch with Planova House Plans. WhatsApp consultation, phone, email, and office address for 2D AutoCAD and 3D house designs."
        keywords="contact Planova, architect phone number, AutoCAD house plans WhatsApp, house design consultation Lahore"
        canonicalPath="/contact"
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs font-mono-cad uppercase text-[#C5A059] font-bold">
          Get In Touch
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Consult With Our Architectural Engineers
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed font-light">
          Have questions regarding plot setbacks, AutoCAD DWG source files, or 3D elevation renders? Our architects are available 6 days a week via WhatsApp and in-person studio consultations.
        </p>
      </div>

      {/* Top Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-[#121620] border border-[#212736] space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center mb-4">
            <MessageSquare className="w-5 h-5 fill-[#25D366]" />
          </div>
          <div className="text-xs font-mono-cad text-slate-400 uppercase">Instant WhatsApp</div>
          <div className="text-white font-bold text-sm">{settings.whatsappNumber}</div>
          <div className="text-[11px] text-emerald-400">Available 9 AM - 8 PM PKT</div>
        </div>

        <div className="p-6 rounded-2xl bg-[#121620] border border-[#212736] space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center mb-4">
            <Phone className="w-5 h-5" />
          </div>
          <div className="text-xs font-mono-cad text-slate-400 uppercase">Phone Call</div>
          <div className="text-white font-bold text-sm">{settings.displayPhone}</div>
          <div className="text-[11px] text-slate-400">Direct Office Desk</div>
        </div>

        <div className="p-6 rounded-2xl bg-[#121620] border border-[#212736] space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center mb-4">
            <Mail className="w-5 h-5" />
          </div>
          <div className="text-xs font-mono-cad text-slate-400 uppercase">Email Blueprints</div>
          <div className="text-white font-bold text-sm truncate">{settings.email}</div>
          <div className="text-[11px] text-slate-400">Replies within 2 hours</div>
        </div>

        <div className="p-6 rounded-2xl bg-[#121620] border border-[#212736] space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center mb-4">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-xs font-mono-cad text-slate-400 uppercase">Office Hours</div>
          <div className="text-white font-bold text-sm">Mon - Sat: 9 AM - 8 PM</div>
          <div className="text-[11px] text-slate-400">Sunday by Appointment</div>
        </div>
      </div>

      {/* Main Grid: Form + Office Location & WhatsApp Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Form on Left */}
        <div className="lg:col-span-7 bg-[#121620] border border-[#222838] rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="mb-6">
            <h3 className="font-heading text-xl font-bold text-white">Send Us a Direct Message</h3>
            <p className="text-xs text-slate-400 mt-1">
              Fill out the form below. We will follow up via WhatsApp or email with recommendations.
            </p>
          </div>

          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-heading text-xl font-bold text-white">Message Dispatched!</h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you {name}. Our architectural engineering team will reply directly to your WhatsApp number ({whatsapp}) shortly.
              </p>
              <div className="pt-2">
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-black font-semibold text-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp Directly</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Asim Rauf"
                    className="w-full px-3.5 py-2.5 bg-[#0C0F14] border border-[#242A38] rounded-xl text-sm text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full px-3.5 py-2.5 bg-[#0C0F14] border border-[#242A38] rounded-xl text-sm text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="asim@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#0C0F14] border border-[#242A38] rounded-xl text-sm text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0C0F14] border border-[#242A38] rounded-xl text-xs text-white focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="5 Marla House Plan Inquiry">5 Marla House Plan Inquiry</option>
                    <option value="10 Marla House Plan Inquiry">10 Marla House Plan Inquiry</option>
                    <option value="1 Kanal House Plan Inquiry">1 Kanal House Plan Inquiry</option>
                    <option value="2D AutoCAD DWG Modification">2D AutoCAD DWG Modification</option>
                    <option value="3D Front Elevation Order">3D Front Elevation Order</option>
                    <option value="Turnkey Custom Architecture">Turnkey Custom Architecture</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                  Plot Dimensions & Specific Requirements
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your plot size (length x width), number of bedrooms, desired design style, or any specific questions..."
                  className="w-full px-4 py-2.5 bg-[#0C0F14] border border-[#242A38] rounded-xl text-xs text-white focus:outline-none focus:border-[#C5A059] resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting...' : 'Send Inquiry Message'}</span>
                </button>

                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>

        {/* Right Info Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#121620] border border-[#212738] space-y-5">
            <div className="flex items-center gap-2 text-white font-heading font-bold text-lg">
              <Building2 className="w-5 h-5 text-[#C5A059]" />
              <span>Studio Physical Address</span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed font-light">
              <div className="font-semibold text-white mb-1">Planova House Plans & Architectural Studio</div>
              {settings.officeAddress}
            </div>

            <div className="p-4 rounded-xl bg-[#171C26] border border-[#242A38] text-xs text-slate-400 space-y-2">
              <div className="text-[#C5A059] font-bold font-mono-cad text-[11px] uppercase">
                Visiting our Studio:
              </div>
              <p>
                In-person meetings are held Monday through Saturday. We encourage scheduling via WhatsApp beforehand so our senior architect can have sample drawings for your plot size ready.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-black" />
                <span>Schedule WhatsApp Consultation</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="pt-8 border-t border-[#1F2532] space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="text-xs font-mono-cad uppercase text-[#C5A059] font-bold flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>Architectural FAQs</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-[#121620] border border-[#212736] overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-[#C5A059] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#C5A059] transition-transform duration-200 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed font-light border-t border-[#1C212E] pt-3 animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
