import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

interface FloatingWhatsAppProps {
  whatsappNumber: string;
}

export function FloatingWhatsApp({ whatsappNumber }: FloatingWhatsAppProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState('Salam Planova team, I want to inquire about house design plans.');

  const cleanPhone = whatsappNumber.replace(/[^0-9+]/g, '').replace('+', '');

  const handleSend = () => {
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(quickMsg)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-80 bg-[#121620] border border-[#2B3345] rounded-2xl shadow-2xl p-4 text-white animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-3 border-b border-[#222938]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-black font-bold text-xs">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Planova Architects</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online on WhatsApp
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-slate-300">
            Have questions about plot dimensions, AutoCAD DWG files, or 3D elevations? Send a direct WhatsApp message!
          </div>

          <div className="space-y-2">
            <textarea
              rows={2}
              value={quickMsg}
              onChange={(e) => setQuickMsg(e.target.value)}
              className="w-full bg-[#0C0E14] border border-[#252B38] rounded-lg p-2.5 text-xs text-white resize-none focus:outline-none focus:border-[#25D366]"
            />
            <button
              onClick={handleSend}
              className="w-full py-2.5 px-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-black flex items-center justify-center shadow-xl hover:scale-105 transition-transform hover:shadow-2xl hover:shadow-[#25D366]/30 border-2 border-white/20"
        title="Chat with Planova Architects on WhatsApp"
        aria-label="WhatsApp Contact"
      >
        {isOpen ? <X className="w-6 h-6 stroke-[2.5]" /> : <MessageSquare className="w-7 h-7 fill-black stroke-[1.5]" />}
      </button>
    </div>
  );
}
