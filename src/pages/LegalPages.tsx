import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';

interface LegalProps {
  type: 'privacy' | 'terms';
  onNavigate: (path: string) => void;
}

export function LegalPages({ type, onNavigate }: LegalProps) {
  const isPrivacy = type === 'privacy';

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <SEOHead
        title={isPrivacy ? 'Privacy Policy – Planova House Plans' : 'Terms & Conditions – Planova House Plans'}
        description={isPrivacy ? 'Planova House Plans privacy policy and customer data handling.' : 'Terms of service, AutoCAD DWG licensing, and architectural revision policies.'}
        canonicalPath={isPrivacy ? '/privacy-policy' : '/terms-and-conditions'}
      />

      <button
        onClick={() => onNavigate('/')}
        className="inline-flex items-center gap-2 text-xs font-mono-cad text-slate-400 hover:text-white"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Home</span>
      </button>

      <div className="border-b border-[#202636] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono-cad text-[#C5A059] mb-1">
          {isPrivacy ? <ShieldCheck className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          <span>OFFICIAL ARCHITECTURAL POLICY</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white">
          {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
        </h1>
        <p className="text-xs text-slate-400 font-mono-cad mt-2">
          Effective Date: January 1, 2026 · Planova House Plans Studio
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-6 font-light">
        {isPrivacy ? (
          <>
            <section className="space-y-2">
              <h3 className="text-white font-heading font-bold text-lg">1. Information We Collect</h3>
              <p>
                When you submit an inquiry or place a custom house design order on Planova House Plans, we collect your contact information (name, WhatsApp phone number, email address) and property specifications (plot dimensions, orientation, city/society name).
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-white font-heading font-bold text-lg">2. How We Use Your Architectural Information</h3>
              <p>
                Your plot details are used solely by our certified architectural engineers to calculate covered area ratios, room dimensions, and society bylaws compatibility. We do not sell, rent, or trade your personal data to third-party advertisers.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-white font-heading font-bold text-lg">3. WhatsApp Communication</h3>
              <p>
                By initiating a WhatsApp consultation, you consent to receive design proposals, preliminary floor plan sketches, and revision status updates directly on your messaging app. You may opt out or request data removal at any time.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h3 className="text-white font-heading font-bold text-lg">1. Intellectual Property & AutoCAD Licensing</h3>
              <p>
                All 2D AutoCAD DWG blueprints, 3D renderings, and floor plans provided by Planova House Plans are licensed for the construction of a single residential unit on the specified plot. Re-licensing, mass reselling, or public redistribution of our proprietary DWG vector source files is strictly prohibited.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-white font-heading font-bold text-lg">2. Custom Design Revision Policy</h3>
              <p>
                Custom architectural orders include up to three (3) iterative revisions during the preliminary 2D conceptual phase. Once structural engineering, column schedules, and MEP drawings are locked and rendered, substantial structural dimensional changes may incur nominal drafting adjustment fees.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-white font-heading font-bold text-lg">3. Site Verification & Soil Testing</h3>
              <p>
                While Planova drawings are engineered in accordance with recognized building codes (UBC / ACI / Pakistan Building Code), the civil contractor must verify physical site boundary pegs and local soil bearing capacity before casting foundations.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
