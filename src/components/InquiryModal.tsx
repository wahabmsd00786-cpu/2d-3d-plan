import React, { useState } from 'react';
import { X, MessageSquare, Send, CheckCircle2, Phone, Mail, User } from 'lucide-react';
import { HousePlan, SiteSettings } from '../types';
import { api } from '../services/api';

interface InquiryModalProps {
  plan?: HousePlan | null;
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
  sourcePage?: string;
}

export function InquiryModal({ plan, isOpen, onClose, settings, sourcePage = 'Website' }: InquiryModalProps) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(
    plan 
      ? `Salam Planova, I am interested in "${plan.title}" (${plan.plotSizeLabel}). Please send detailed AutoCAD DWG inclusions, timeline, and pricing.`
      : 'Salam Planova, I would like to inquire about house design and 2D/3D architectural plans.'
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;

    setSubmitting(true);
    try {
      await api.submitInquiry({
        name,
        whatsapp,
        email,
        planId: plan?.id,
        planTitle: plan?.title,
        message,
        sourcePage
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true); // show confirmation
    } finally {
      setSubmitting(false);
    }
  };

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9+]/g, '').replace('+', '');
  const encodedText = encodeURIComponent(
    `Salam Planova Team,\nName: ${name || 'Prospective Client'}\nPhone: ${whatsapp}\n${plan ? `Plan: ${plan.title} (${plan.plotSizeLabel})\n` : ''}Message: ${message}`
  );
  const directWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#121620] border border-[#2B3345] rounded-2xl p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#1B212D] text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white">Inquiry Received!</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              Thank you {name}. Our chief architectural engineer has received your inquiry and will contact you via WhatsApp shortly.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-black font-semibold text-sm hover:bg-[#20bd5a] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open in WhatsApp Now</span>
              </a>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#1E2432] text-slate-300 hover:text-white text-sm"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="text-[11px] font-mono-cad uppercase text-[#C5A059] tracking-wider font-semibold">
                Architectural Consultation
              </div>
              <h3 className="font-heading text-xl font-bold text-white mt-1">
                {plan ? `Inquire About: ${plan.title}` : 'Inquire About House Design'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your WhatsApp details. We reply within 15–30 minutes with plan modifications and pricing.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-cad text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0C0F14] border border-[#242A38] rounded-xl text-sm text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono-cad text-slate-300 mb-1.5">
                    WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#0C0F14] border border-[#242A38] rounded-xl text-sm text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-cad text-slate-300 mb-1.5">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#0C0F14] border border-[#242A38] rounded-xl text-sm text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-cad text-slate-300 mb-1.5">
                  Requirements & Message
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0C0F14] border border-[#242A38] rounded-xl text-sm text-white focus:outline-none focus:border-[#C5A059] resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 px-5 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-black font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting...' : 'Submit Inquiry'}</span>
                </button>

                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  <span>Send on WhatsApp</span>
                </a>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
