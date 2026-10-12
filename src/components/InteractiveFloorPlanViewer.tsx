import React, { useState } from 'react';
import { Layers, Eye, Download, ZoomIn, ZoomOut, RotateCcw, Info, Check } from 'lucide-react';
import { HousePlan, RoomDetail } from '../types';

interface FloorPlanViewerProps {
  plan: HousePlan;
  onInquire?: () => void;
}

export function InteractiveFloorPlanViewer({ plan, onInquire }: FloorPlanViewerProps) {
  const [activeFloor, setActiveFloor] = useState<'ground' | 'first'>('ground');
  const [showGrid, setShowGrid] = useState(true);
  const [showDimensions, setShowDimensions] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<RoomDetail | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const roomsForActiveFloor = plan.rooms.filter(r => 
    activeFloor === 'ground' ? r.floor === 'Ground Floor' : r.floor === 'First Floor'
  );

  const handleDownloadCadSpec = () => {
    // Generate clean text/printable summary
    const content = `======================================================================
PLANOVA HOUSE PLANS - ARCHITECTURAL SPECIFICATION SHEET
======================================================================
Plan: ${plan.title}
Category: ${plan.category} (${plan.plotSizeLabel})
Covered Area: ${plan.coveredAreaLabel}
Bedrooms: ${plan.bedrooms} | Bathrooms: ${plan.bathrooms} | Floors: ${plan.floorsLabel}
Facing: ${plan.facing} | Style: ${plan.style}

PLOT DIMENSIONS:
Width: ${plan.plotDimensions.width} ft | Length: ${plan.plotDimensions.length} ft
Total Plot Area: ${plan.plotDimensions.totalSqFt} sq. ft.

ROOM DIMENSIONS (GROUND FLOOR):
${plan.floorBreakdown.groundFloor.map(item => ` - ${item}`).join('\n')}

${plan.floorBreakdown.firstFloor ? `ROOM DIMENSIONS (FIRST FLOOR):\n${plan.floorBreakdown.firstFloor.map(item => ` - ${item}`).join('\n')}` : ''}

CAD FILES INCLUDED:
${plan.cadFilesIncluded.map(cad => ` [x] ${cad}`).join('\n')}

OFFICIAL CONTACT:
Planova House Plans
Web: https://planovahouseplans.com
WhatsApp: +92 300 1234567 | Email: info@planovahouseplans.com
======================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${plan.slug}-architectural-specs.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="bg-[#101319] border border-[#212734] rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Top Toolbar */}
      <div className="bg-[#141820] border-b border-[#212734] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Floor Switcher */}
        <div className="flex items-center gap-1.5 bg-[#0A0C10] p-1 rounded-lg border border-[#252C3A]">
          <button
            onClick={() => { setActiveFloor('ground'); setSelectedRoom(null); }}
            className={`px-3 py-1.5 rounded-md text-xs font-medium font-mono-cad transition-colors ${
              activeFloor === 'ground'
                ? 'bg-[#C5A059] text-black font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ground Floor (0.00)
          </button>
          {plan.floorsCount > 1 && (
            <button
              onClick={() => { setActiveFloor('first'); setSelectedRoom(null); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium font-mono-cad transition-colors ${
                activeFloor === 'first'
                  ? 'bg-[#C5A059] text-black font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              First Floor (+11.50')
            </button>
          )}
        </div>

        {/* View toggles & CAD layers */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-2.5 py-1.5 rounded-md border font-mono-cad transition-colors ${
              showGrid 
                ? 'bg-[#C5A059]/15 border-[#C5A059]/40 text-[#C5A059]' 
                : 'bg-[#181C26] border-[#262D3C] text-slate-400'
            }`}
          >
            Grid: {showGrid ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => setShowDimensions(!showDimensions)}
            className={`px-2.5 py-1.5 rounded-md border font-mono-cad transition-colors ${
              showDimensions 
                ? 'bg-[#C5A059]/15 border-[#C5A059]/40 text-[#C5A059]' 
                : 'bg-[#181C26] border-[#262D3C] text-slate-400'
            }`}
          >
            Dimensions: {showDimensions ? 'ON' : 'OFF'}
          </button>

          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 bg-[#0A0C10] p-1 rounded-lg border border-[#252C3A]">
            <button 
              onClick={() => setZoomLevel(Math.max(0.8, zoomLevel - 0.15))}
              className="p-1 text-slate-400 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1 text-[11px] font-mono-cad text-slate-400">{Math.round(zoomLevel * 100)}%</span>
            <button 
              onClick={() => setZoomLevel(Math.min(1.5, zoomLevel + 0.15))}
              className="p-1 text-slate-400 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setZoomLevel(1)}
              className="p-1 text-slate-400 hover:text-white"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Download Blueprint Spec */}
          <button
            onClick={handleDownloadCadSpec}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1F2633] hover:bg-[#2A3345] text-slate-200 border border-[#2F3748] transition-colors"
          >
            {downloadSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5 text-[#C5A059]" />}
            <span>{downloadSuccess ? 'Downloaded!' : 'Export Specs'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive CAD Blueprint Canvas */}
      <div className="relative min-h-[440px] md:min-h-[500px] flex items-center justify-center p-6 overflow-hidden bg-[#0A0C10]">
        
        {/* Background Grid Pattern */}
        {showGrid && (
          <div 
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(212, 175, 55, 0.15) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(212, 175, 55, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: '28px 28px'
            }}
          />
        )}

        {/* Blueprint Framing & Coordinate Markings */}
        <div className="absolute top-3 left-4 text-[10px] font-mono-cad text-slate-600">
          PROJ: PLANOVA-{plan.id.toUpperCase()} · SCALE 1:100 (METRIC/IMPERIAL)
        </div>
        <div className="absolute bottom-3 left-4 text-[10px] font-mono-cad text-[#C5A059]/70">
          ● AUTOCAD DWG ACCREDITED DRAFTING · REV 2026.4
        </div>
        <div className="absolute top-3 right-4 text-[10px] font-mono-cad text-slate-600">
          DIM: {plan.plotDimensions.width}'-0" × {plan.plotDimensions.length}'-0"
        </div>

        {/* Scaled Interactive Floor Plan SVG */}
        <div 
          className="transition-transform duration-200 max-w-full"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg 
            viewBox="0 0 600 700" 
            className="w-[340px] sm:w-[440px] md:w-[480px] h-auto drop-shadow-2xl"
          >
            <defs>
              <pattern id="hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Boundary Plot Outline */}
            <rect 
              x="50" y="40" width="500" height="620" 
              fill="#121620" 
              stroke="#D4AF37" 
              strokeWidth="2.5" 
              strokeDasharray="8 4"
            />

            {/* Setback Lines */}
            <rect 
              x="70" y="60" width="460" height="580" 
              fill="#161B26" 
              stroke="#4A5568" 
              strokeWidth="1.5"
            />

            {/* Ground Floor Layout Shapes */}
            {activeFloor === 'ground' ? (
              <g id="ground-layout">
                {/* Car Porch */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedRoom({ name: 'Car Porch', dimensions: "14'-0\" × 15'-0\"", floor: 'Ground Floor', description: 'Porch accommodating 1 large SUV with drainage ramp' })}
                >
                  <rect 
                    x="80" y="440" width="220" height="190" 
                    fill={selectedRoom?.name === 'Car Porch' ? '#232D3F' : '#1C2230'} 
                    stroke="#D4AF37" 
                    strokeWidth="2" 
                    className="hover:fill-[#263145] transition-colors"
                  />
                  <text x="190" y="525" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="monospace">
                    CAR PORCH
                  </text>
                  {showDimensions && (
                    <text x="190" y="545" textAnchor="middle" fill="#D4AF37" fontSize="11" fontFamily="monospace">
                      14'-0" × 15'-0"
                    </text>
                  )}
                  {/* Car icon placeholder line */}
                  <rect x="130" y="470" width="120" height="40" rx="6" fill="none" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
                </g>

                {/* Drawing Room */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedRoom({ name: 'Drawing Room', dimensions: "12'-0\" × 13'-6\"", floor: 'Ground Floor', description: 'Formal guest sitting parlor with direct foyer entry' })}
                >
                  <rect 
                    x="310" y="440" width="210" height="190" 
                    fill={selectedRoom?.name === 'Drawing Room' ? '#232D3F' : '#181E2B'} 
                    stroke="#D4AF37" 
                    strokeWidth="2" 
                    className="hover:fill-[#263145] transition-colors"
                  />
                  <text x="415" y="525" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="monospace">
                    DRAWING ROOM
                  </text>
                  {showDimensions && (
                    <text x="415" y="545" textAnchor="middle" fill="#D4AF37" fontSize="11" fontFamily="monospace">
                      12'-0" × 13'-6"
                    </text>
                  )}
                </g>

                {/* Central TV Lounge & Dining */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedRoom({ name: 'TV Lounge & Dining', dimensions: "18'-0\" × 14'-0\"", floor: 'Ground Floor', description: 'Double height family sitting lounge with media wall' })}
                >
                  <rect 
                    x="80" y="240" width="290" height="190" 
                    fill={selectedRoom?.name === 'TV Lounge & Dining' ? '#232D3F' : '#1A202C'} 
                    stroke="#D4AF37" 
                    strokeWidth="2" 
                    className="hover:fill-[#263145] transition-colors"
                  />
                  <text x="225" y="325" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="monospace">
                    TV LOUNGE & DINING
                  </text>
                  {showDimensions && (
                    <text x="225" y="345" textAnchor="middle" fill="#D4AF37" fontSize="11" fontFamily="monospace">
                      18'-0" × 14'-0"
                    </text>
                  )}
                  {/* Stair symbol */}
                  <path d="M 90 250 L 160 250 L 160 300" stroke="#718096" strokeWidth="1.5" fill="none" />
                  <text x="125" y="275" fill="#718096" fontSize="9" fontFamily="monospace">▲ STAIRS UP</text>
                </g>

                {/* Main Kitchen */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedRoom({ name: 'Kitchen', dimensions: "9'-0\" × 11'-0\"", floor: 'Ground Floor', description: 'Modular kitchen with granite island counter & exhaust' })}
                >
                  <rect 
                    x="380" y="240" width="140" height="190" 
                    fill={selectedRoom?.name === 'Kitchen' ? '#232D3F' : '#171D28'} 
                    stroke="#D4AF37" 
                    strokeWidth="2" 
                    className="hover:fill-[#263145] transition-colors"
                  />
                  <text x="450" y="325" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace">
                    KITCHEN
                  </text>
                  {showDimensions && (
                    <text x="450" y="345" textAnchor="middle" fill="#D4AF37" fontSize="10" fontFamily="monospace">
                      9'-0" × 11'-0"
                    </text>
                  )}
                  {/* Kitchen counter L shape */}
                  <path d="M 390 250 L 510 250 L 510 300" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1.5" fill="none" />
                </g>

                {/* Master Bed 1 */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedRoom({ name: 'Master Bed 1', dimensions: "14'-0\" × 12'-0\"", floor: 'Ground Floor', description: 'Ground floor master bedroom with wardrobe and attached bath' })}
                >
                  <rect 
                    x="80" y="70" width="280" height="160" 
                    fill={selectedRoom?.name === 'Master Bed 1' ? '#232D3F' : '#19202E'} 
                    stroke="#D4AF37" 
                    strokeWidth="2" 
                    className="hover:fill-[#263145] transition-colors"
                  />
                  <text x="220" y="145" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="monospace">
                    MASTER BEDROOM 1
                  </text>
                  {showDimensions && (
                    <text x="220" y="165" textAnchor="middle" fill="#D4AF37" fontSize="11" fontFamily="monospace">
                      14'-0" × 12'-0"
                    </text>
                  )}
                </g>

                {/* Attached Bath & OTS (Open to Sky) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedRoom({ name: 'Attached Bath & Duct', dimensions: "7'-0\" × 6'-0\"", floor: 'Ground Floor', description: 'En-suite bath + rear light ventilation shaft' })}
                >
                  <rect 
                    x="370" y="70" width="150" height="90" 
                    fill="#151A24" 
                    stroke="#4A5568" 
                    strokeWidth="1.5"
                  />
                  <text x="445" y="115" textAnchor="middle" fill="#A0AEC0" fontSize="11" fontFamily="monospace">
                    BATH 7'×6'
                  </text>
                  <rect 
                    x="370" y="165" width="150" height="65" 
                    fill="url(#hatch)" 
                    stroke="#D4AF37" 
                    strokeWidth="1" 
                    strokeDasharray="4 2"
                  />
                  <text x="445" y="202" textAnchor="middle" fill="#D4AF37" fontSize="10" fontFamily="monospace">
                    OTS / DUCT
                  </text>
                </g>
              </g>
            ) : (
              /* First Floor Layout */
              <g id="first-floor-layout">
                {/* Front Balcony & Terrace */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedRoom({ name: 'Front Terrace', dimensions: "14'-0\" × 12'-0\"", floor: 'First Floor', description: 'Open-air front porch terrace with glass railings' })}
                >
                  <rect 
                    x="80" y="440" width="210" height="190" 
                    fill="url(#hatch)" 
                    stroke="#D4AF37" 
                    strokeWidth="2" 
                    className="hover:fill-[#263145] transition-colors"
                  />
                  <text x="185" y="525" textAnchor="middle" fill="#D4AF37" fontSize="13" fontWeight="bold" fontFamily="monospace">
                    FRONT TERRACE
                  </text>
                  {showDimensions && (
                    <text x="185" y="545" textAnchor="middle" fill="#CBD5E0" fontSize="11" fontFamily="monospace">
                      14'-0" × 12'-0"
                    </text>
                  )}
                </g>

                {/* Upper Master Bed 2 */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedRoom({ name: 'Bedroom 2 (Front Suite)', dimensions: "13'-0\" × 13'-0\"", floor: 'First Floor', description: 'Upper master bed with terrace walk-out and attached bath' })}
                >
                  <rect 
                    x="300" y="440" width="220" height="190" 
                    fill={selectedRoom?.name?.includes('Bedroom 2') ? '#232D3F' : '#19202E'} 
                    stroke="#D4AF37" 
                    strokeWidth="2" 
                    className="hover:fill-[#263145] transition-colors"
                  />
                  <text x="410" y="525" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="monospace">
                    BEDROOM 2 (FRONT)
                  </text>
                  {showDimensions && (
                    <text x="410" y="545" textAnchor="middle" fill="#D4AF37" fontSize="11" fontFamily="monospace">
                      13'-0" × 13'-0"
                    </text>
                  )}
                </g>

                {/* Upper Living Lounge */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedRoom({ name: 'Upper TV Lounge', dimensions: "14'-0\" × 12'-0\"", floor: 'First Floor', description: 'First floor informal gathering hall with kitchenette' })}
                >
                  <rect 
                    x="80" y="240" width="440" height="190" 
                    fill={selectedRoom?.name === 'Upper TV Lounge' ? '#232D3F' : '#1A202C'} 
                    stroke="#D4AF37" 
                    strokeWidth="2" 
                    className="hover:fill-[#263145] transition-colors"
                  />
                  <text x="300" y="325" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="monospace">
                    UPPER TV LOUNGE
                  </text>
                  {showDimensions && (
                    <text x="300" y="345" textAnchor="middle" fill="#D4AF37" fontSize="11" fontFamily="monospace">
                      14'-0" × 12'-0" + KITCHENETTE
                    </text>
                  )}
                </g>

                {/* Bedroom 3 & 4 */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedRoom({ name: 'Bedroom 3 & 4 Suites', dimensions: "12' × 12' Each", floor: 'First Floor', description: 'Two rear bedrooms with independent attached bathrooms' })}
                >
                  <rect 
                    x="80" y="70" width="210" height="160" 
                    fill="#181E2B" 
                    stroke="#D4AF37" 
                    strokeWidth="2" 
                  />
                  <text x="185" y="145" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace">
                    BEDROOM 3
                  </text>
                  <text x="185" y="165" textAnchor="middle" fill="#D4AF37" fontSize="10" fontFamily="monospace">
                    12'-0" × 12'-0"
                  </text>

                  <rect 
                    x="300" y="70" width="220" height="160" 
                    fill="#19202E" 
                    stroke="#D4AF37" 
                    strokeWidth="2" 
                  />
                  <text x="410" y="145" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace">
                    BEDROOM 4
                  </text>
                  <text x="410" y="165" textAnchor="middle" fill="#D4AF37" fontSize="10" fontFamily="monospace">
                    11'-0" × 11'-6"
                  </text>
                </g>
              </g>
            )}

            {/* Technical North Arrow symbol */}
            <g transform="translate(520, 60)">
              <circle cx="0" cy="0" r="16" fill="#1A202C" stroke="#D4AF37" strokeWidth="1.5" />
              <polygon points="0,-12 4,6 -4,6" fill="#D4AF37" />
              <text x="0" y="13" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">N</text>
            </g>
          </svg>
        </div>

        {/* Selected Room Overlay Box */}
        {selectedRoom && (
          <div className="absolute bottom-4 right-4 max-w-xs bg-[#141820]/95 backdrop-blur-md border border-[#C5A059] p-3.5 rounded-xl text-xs text-white shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-bold text-[#E5C07B] font-mono-cad">{selectedRoom.name}</span>
              <span className="text-[10px] bg-[#C5A059]/20 text-[#C5A059] px-2 py-0.5 rounded font-mono-cad">{selectedRoom.dimensions}</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {selectedRoom.description || 'Architecturally sized for optimal furniture placement, natural lighting, and cross-ventilation.'}
            </p>
          </div>
        )}

      </div>

      {/* Bottom Room Dimensions Legend */}
      <div className="bg-[#121620] border-t border-[#212734] p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-mono-cad uppercase text-[#C5A059] font-bold flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>Interactive Floor Dimensions ({activeFloor === 'ground' ? 'Ground' : 'First'} Floor):</span>
          </div>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Click any room on the drawing to inspect details
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
          {roomsForActiveFloor.map((room, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedRoom(room)}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                selectedRoom?.name === room.name
                  ? 'bg-[#C5A059]/20 border-[#C5A059] text-white'
                  : 'bg-[#181C26] border-[#252C3A] text-slate-300 hover:border-slate-500'
              }`}
            >
              <div className="font-medium truncate">{room.name}</div>
              <div className="text-[11px] font-mono-cad text-[#D4AF37]">{room.dimensions}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
