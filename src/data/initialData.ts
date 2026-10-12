import { HousePlan, BlogPost, SiteSettings, CustomOrder, Inquiry } from '../types';

export const INITIAL_SETTINGS: SiteSettings = {
  whatsappNumber: '+923001234567',
  displayPhone: '+92 300 123 4567',
  email: 'info@planovahouseplans.com',
  officeAddress: 'Suite 402, Architectural Design Tower, Main Boulevard, Phase 5, DHA, Lahore',
  businessHours: 'Mon - Sat: 9:00 AM - 8:00 PM (PKT / GMT+5)',
  announcementText: '🔥 Special Offer: Get 20% OFF on all 5 Marla & 10 Marla complete 2D AutoCAD + 3D elevation design packages this month!',
  announcementActive: true,
  consultationFeeFree: true,
};

export const INITIAL_PLANS: HousePlan[] = [
  {
    id: 'plan-5m-modern-01',
    slug: '5-marla-modern-luxury-residence-25x45',
    title: "5 Marla Modern Luxury Residence (25' × 45')",
    category: '5 Marla',
    subCategory: 'Modern Villas',
    style: 'Modern',
    plotDimensions: { length: 45, width: 25, unit: 'ft', totalSqFt: 1125 },
    plotSizeLabel: "5 Marla (25' × 45')",
    coveredAreaSqFt: 2150,
    coveredAreaLabel: '2,150 sq. ft.',
    bedrooms: 4,
    bathrooms: 4,
    floorsCount: 2,
    floorsLabel: 'Double Storey (G+1)',
    parkingSpaces: 1,
    facing: 'North',
    pricePKR: 35000,
    priceUSD: 145,
    featured: true,
    shortDescription: "Sleek contemporary 5 Marla double storey house plan with double-height lobby, modern louvered elevation, open kitchen, and 4 en-suite bedrooms.",
    fullDescription: "Architecturally engineered for standard 25'×45' residential plots (5 Marla), this signature design balances maximum functional utility with high-end aesthetic luxury. Features an expansive open-concept living area, a dedicated front drawing room, an imported-style open kitchen with breakfast bar, and 4 master bedrooms with attached baths. The front elevation integrates composite wood louvers, fluted concrete finishes, and warm LED strip illumination to give a majestic villa feel on a compact urban lot.",
    keyFeatures: [
      "1 Car Porch with automated rolling gate clearance",
      "Double-height entrance foyer with glass chandelier alcove",
      "Spacious TV Lounge on both Ground & First Floors",
      "Front lawn terrace and rooftop barbecue patio",
      "Independent dirty kitchen / scullery nook",
      "Dedicated powder room for visiting guests",
      "Rear ventilation duct providing cross-air circulation"
    ],
    cadFilesIncluded: [
      "AutoCAD DWG Architecture Drawing (2018+ compatible)",
      "High-Resolution PDF Blueprints (A1 & A3 printable)",
      "Electrical Wiring & Conduit Schematics",
      "Plumbing & Drainage Piping Layout",
      "Structural Foundation & Column Grid Details",
      "High-Resolution 3D Elevation Views (Day & Night)"
    ],
    floorBreakdown: {
      groundFloor: [
        "Car Porch: 14'-0\" × 15'-0\"",
        "Drawing Room: 12'-0\" × 13'-6\"",
        "Powder Bath: 5'-0\" × 4'-6\"",
        "Open TV Lounge & Dining: 18'-0\" × 14'-0\"",
        "Main Kitchen: 9'-0\" × 11'-0\"",
        "Master Bedroom 1: 14'-0\" × 12'-0\" with Attached Bath (7'×6')",
        "Open Ventilation OTS (Open-to-Sky): 4'-6\" × 8'-0\""
      ],
      firstFloor: [
        "Bed 2 (Front Master): 13'-0\" × 13'-0\" with Balcony & Bath",
        "Bed 3: 12'-0\" × 12'-0\" with Attached Bath",
        "Bed 4: 11'-0\" × 11'-6\" with Attached Bath",
        "Upper TV Lounge: 14'-0\" × 12'-0\"",
        "Front Facing Balcony / Terrace: 12'-0\" × 8'-0\""
      ],
      roof: [
        "Stair Mumty Room",
        "Overhead Water Tank with RCC Slab",
        "Open Terraced Roof Garden"
      ]
    },
    rooms: [
      { name: 'Car Porch', dimensions: "14'-0\" × 15'-0\"", floor: 'Ground Floor', description: 'Accommodates 1 SUV / sedan plus motorbike space' },
      { name: 'Drawing Room', dimensions: "12'-0\" × 13'-6\"", floor: 'Ground Floor', description: 'Private guest parlor with powder room access' },
      { name: 'TV Lounge', dimensions: "18'-0\" × 14'-0\"", floor: 'Ground Floor', description: 'Central family living room with media wall niche' },
      { name: 'Master Bedroom 1', dimensions: "14'-0\" × 12'-0\"", floor: 'Ground Floor', description: 'Ground floor suite with wardrobe passage' },
      { name: 'Upper Master Bedroom', dimensions: "13'-0\" × 13'-0\"", floor: 'First Floor', description: 'Floor-to-ceiling glass sliding to front balcony' },
      { name: 'Bedroom 3', dimensions: "12'-0\" × 12'-0\"", floor: 'First Floor', description: 'Kids/guest room with natural light from shaft' },
      { name: 'Bedroom 4', dimensions: "11'-0\" × 11'-6\"", floor: 'First Floor', description: 'Rear bedroom with built-in closet space' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      elevation3d: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      floorPlan2d: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      interiorRenders: [
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80'
      ]
    },
    hasCadDownloadSample: true,
    viewsCount: 1420,
    createdAt: '2026-01-15'
  },
  {
    id: 'plan-5m-spanish-02',
    slug: '5-marla-spanish-elevation-design-25x50',
    title: "5 Marla Spanish Hacienda Villa (25' × 50')",
    category: '5 Marla',
    subCategory: 'Spanish Designs',
    style: 'Spanish',
    plotDimensions: { length: 50, width: 25, unit: 'ft', totalSqFt: 1250 },
    plotSizeLabel: "5 Marla (25' × 50')",
    coveredAreaSqFt: 2280,
    coveredAreaLabel: '2,280 sq. ft.',
    bedrooms: 3,
    bathrooms: 4,
    floorsCount: 2,
    floorsLabel: 'Double Storey (G+1)',
    parkingSpaces: 1,
    facing: 'East',
    pricePKR: 38000,
    priceUSD: 155,
    featured: true,
    shortDescription: "Picturesque Mediterranean Spanish house plan featuring terracotta roof shingles, wrought-iron arch balconies, warm stucco facade and courtyard.",
    fullDescription: "Inspired by Andalusian Spanish architectural traditions adapted for Pakistani 5 Marla housing societies (Bahria Town, DHA, Lake City, etc.). This plan offers three generous executive suites, vaulted ceilings in the drawing room, arched exterior windows with decorative molding, and an open terrace styled with Mediterranean tile work.",
    keyFeatures: [
      "Arched Spanish elevation with authentic terracotta clay tiles",
      "Decorative wrought iron balustrades and carriage lighting",
      "Huge open-concept double-height living room",
      "Spanish courtyard atrium providing natural daylight",
      "Executive walk-in closets in two master bedrooms"
    ],
    cadFilesIncluded: [
      "AutoCAD DWG Architecture File",
      "3D Elevation Renders (Front & Side)",
      "Detailed Working Drawings with Sectional Cuts",
      "Window & Door Schedule with arch radius formulas"
    ],
    floorBreakdown: {
      groundFloor: [
        "Car Porch: 14'-0\" × 16'-0\"",
        "Arch Entrance Veranda: 6'-0\" × 8'-0\"",
        "Drawing Room: 13'-0\" × 14'-0\"",
        "Dining / Living Lounge: 19'-0\" × 15'-0\"",
        "Kitchen: 10'-0\" × 12'-0\"",
        "Master Bedroom: 14'-0\" × 13'-0\" with Attached Bathroom"
      ],
      firstFloor: [
        "Spanish Balcony Suite: 14'-0\" × 13'-6\" with private terrace",
        "Guest Bedroom: 12'-6\" × 13'-0\" with attached bath",
        "Family Sitting Lounge: 14'-0\" × 12'-0\"",
        "Front Spanish Terrace: 14'-0\" × 10'-0\""
      ]
    },
    rooms: [
      { name: 'Car Porch', dimensions: "14'-0\" × 16'-0\"", floor: 'Ground Floor' },
      { name: 'Drawing Room', dimensions: "13'-0\" × 14'-0\"", floor: 'Ground Floor' },
      { name: 'Living Lounge', dimensions: "19'-0\" × 15'-0\"", floor: 'Ground Floor' },
      { name: 'Master Bed 1', dimensions: "14'-0\" × 13'-0\"", floor: 'Ground Floor' },
      { name: 'Master Bed 2', dimensions: "14'-0\" × 13'-6\"", floor: 'First Floor' },
      { name: 'Bedroom 3', dimensions: "12'-6\" × 13'-0\"", floor: 'First Floor' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      elevation3d: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      floorPlan2d: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      interiorRenders: [
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80'
      ]
    },
    hasCadDownloadSample: true,
    viewsCount: 980,
    createdAt: '2026-02-01'
  },
  {
    id: 'plan-10m-modern-03',
    slug: '10-marla-modern-executive-villa-35x65',
    title: "10 Marla Modern Executive Villa (35' × 65')",
    category: '10 Marla',
    subCategory: 'Executive Mansions',
    style: 'Modern',
    plotDimensions: { length: 65, width: 35, unit: 'ft', totalSqFt: 2275 },
    plotSizeLabel: "10 Marla (35' × 65')",
    coveredAreaSqFt: 4350,
    coveredAreaLabel: '4,350 sq. ft.',
    bedrooms: 5,
    bathrooms: 6,
    floorsCount: 2,
    floorsLabel: 'Double Storey (G+1)',
    parkingSpaces: 2,
    facing: 'Corner',
    pricePKR: 65000,
    priceUSD: 260,
    featured: true,
    shortDescription: "Prestigious 10 Marla double-storey corner residence featuring double car parking, 5 en-suite bedrooms, home theatre, dirty kitchen, and servant room.",
    fullDescription: "A masterpiece of modern residential architecture designed for 35'×65' plots (10 Marla). Boasting dual side facades for corner or standard plots, 2 dedicated car parking bays, a grand double-height foyer, separated clean and grease kitchens, two master bedrooms on the ground floor, and an executive penthouse floor setup on the upper story.",
    keyFeatures: [
      "Large 2 SUV Car Porch with cobblestone pavers",
      "Double-height entrance foyer with floating cantilever stairs",
      "Dual Kitchen setup: Modern Show Kitchen + Heavy Dirty Kitchen",
      "5 Executive Bedrooms all with en-suite luxury bathrooms and dressing rooms",
      "Servant quarter with separate external spiral staircase access",
      "Dedicated powder room and guest wardrobe",
      "Upper level sun deck with pergola roofing"
    ],
    cadFilesIncluded: [
      "Complete AutoCAD DWG Architectural Package",
      "Full MEP (Mechanical, Electrical, Plumbing) Schematics",
      "RCC Structural Detailing (Footings, Columns, Slabs)",
      "3D Exterior Views in 4K resolution (Front, Corner, Dusk)",
      "Interior 3D Concept Moodboards"
    ],
    floorBreakdown: {
      groundFloor: [
        "Double Car Porch: 21'-0\" × 17'-0\"",
        "Formal Drawing Room: 15'-0\" × 16'-0\"",
        "Dining Hall: 13'-0\" × 14'-0\"",
        "Main Lounge: 22'-0\" × 16'-6\"",
        "Show Kitchen: 12'-0\" × 14'-0\"",
        "Dirty Kitchen: 8'-0\" × 11'-0\"",
        "Master Bed 1: 15'-0\" × 14'-0\" with Dress (7'×8') & Bath (8'×9')",
        "Bed 2: 13'-0\" × 14'-0\" with Attached Bath"
      ],
      firstFloor: [
        "Upper Living Hall: 18'-0\" × 15'-0\"",
        "Master Bed 3: 16'-0\" × 14'-0\" with Balcony, Walk-in Closet & Jacuzzi Bath",
        "Bed 4: 14'-0\" × 13'-6\" with Attached Bath",
        "Bed 5: 13'-0\" × 13'-0\" with Attached Bath",
        "Study / Home Office: 10'-0\" × 10'-0\"",
        "Front Terrace with modern glass railing: 16'-0\" × 12'-0\""
      ]
    },
    rooms: [
      { name: 'Car Porch', dimensions: "21'-0\" × 17'-0\"", floor: 'Ground Floor' },
      { name: 'Drawing Room', dimensions: "15'-0\" × 16'-0\"", floor: 'Ground Floor' },
      { name: 'Family Lounge', dimensions: "22'-0\" × 16'-6\"", floor: 'Ground Floor' },
      { name: 'Ground Master Bed', dimensions: "15'-0\" × 14'-0\"", floor: 'Ground Floor' },
      { name: 'First Floor Master Bed', dimensions: "16'-0\" × 14'-0\"", floor: 'First Floor' },
      { name: 'Home Office / Study', dimensions: "10'-0\" × 10'-0\"", floor: 'First Floor' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      elevation3d: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      floorPlan2d: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      interiorRenders: [
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1000&q=80'
      ]
    },
    hasCadDownloadSample: true,
    viewsCount: 2150,
    createdAt: '2026-01-20'
  },
  {
    id: 'plan-10m-classical-04',
    slug: '10-marla-neo-classical-manor-35x70',
    title: "10 Marla Neo-Classical Manor (35' × 70')",
    category: '10 Marla',
    subCategory: 'Classical Mansions',
    style: 'Neo-Classical',
    plotDimensions: { length: 70, width: 35, unit: 'ft', totalSqFt: 2450 },
    plotSizeLabel: "10 Marla (35' × 70')",
    coveredAreaSqFt: 4600,
    coveredAreaLabel: '4,600 sq. ft.',
    bedrooms: 5,
    bathrooms: 6,
    floorsCount: 2,
    floorsLabel: 'Double Storey (G+1)',
    parkingSpaces: 2,
    facing: 'North-East',
    pricePKR: 68000,
    priceUSD: 275,
    featured: false,
    shortDescription: "Timeless Roman Corinthian pillars, ornate moldings, symmetrical facade, double porch, and opulent living spaces.",
    fullDescription: "Embodying royal classicism, this 10 Marla house design is designed with fluted Roman columns, grand arched pediments, dentil cornices, and high ceilings. Perfect for homeowners seeking timeless grandeur.",
    keyFeatures: [
      "Neo-Classical facade with Roman columns and dentil moldings",
      "Grand entry portico with dual car space",
      "Dedicated formal dining room connected to drawing room",
      "5 Deluxe bedrooms with imported sanitary fittings layout",
      "Rooftop entertaining deck with gazebo structure"
    ],
    cadFilesIncluded: [
      "DWG AutoCAD Drawings",
      "Cornice & Plaster Mold Detail Cad Sheets",
      "Complete Electrical & Plumbing Blueprints"
    ],
    floorBreakdown: {
      groundFloor: [
        "Portico Car Porch: 20'-0\" × 18'-0\"",
        "Drawing Room: 16'-0\" × 16'-0\"",
        "Dining Room: 12'-0\" × 14'-0\"",
        "Grand Hall: 20'-0\" × 17'-0\"",
        "Kitchen: 12'-0\" × 14'-0\"",
        "Master Bed: 16'-0\" × 14'-0\" with Dress & Bath"
      ],
      firstFloor: [
        "Bed 2, 3, 4 with attached baths",
        "Balcony portico facing street",
        "Family lounge"
      ]
    },
    rooms: [
      { name: 'Car Porch', dimensions: "20'-0\" × 18'-0\"", floor: 'Ground Floor' },
      { name: 'Drawing Room', dimensions: "16'-0\" × 16'-0\"", floor: 'Ground Floor' },
      { name: 'Living Lounge', dimensions: "20'-0\" × 17'-0\"", floor: 'Ground Floor' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      elevation3d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      floorPlan2d: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      interiorRenders: [
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80'
      ]
    },
    hasCadDownloadSample: true,
    viewsCount: 1100,
    createdAt: '2026-02-10'
  },
  {
    id: 'plan-1k-luxury-05',
    slug: '1-kanal-contemporary-palatial-villa-50x90',
    title: "1 Kanal Contemporary Palatial Villa (50' × 90')",
    category: '1 Kanal',
    subCategory: 'Palatial Luxury',
    style: 'Contemporary',
    plotDimensions: { length: 90, width: 50, unit: 'ft', totalSqFt: 4500 },
    plotSizeLabel: "1 Kanal (50' × 90')",
    coveredAreaSqFt: 7200,
    coveredAreaLabel: '7,200 sq. ft.',
    bedrooms: 6,
    bathrooms: 7,
    floorsCount: 2,
    floorsLabel: 'Double Storey (G+1)',
    parkingSpaces: 4,
    facing: 'South',
    pricePKR: 110000,
    priceUSD: 440,
    featured: true,
    shortDescription: "Ultra-luxury 1 Kanal estate design featuring 4-car porch, double-height atrium, swimming pool patio, elevator provision, and 6 master suites.",
    fullDescription: "Representing the pinnacle of Pakistani luxury residential design, this 1 Kanal (50'×90' / 500 Sq Yards) architectural layout delivers unmatched prestige. Designed with an impressive 4-car porch, front manicured lawn, grand 24-foot double-height living foyer, private glass elevator shaft, swimming pool / water feature court, dual servant quarters with dedicated rear access, and 6 expansive bedrooms with walk-in wardrobes and spa bathrooms.",
    keyFeatures: [
      "Accommodates up to 4 full-size SUVs in covered porch",
      "Private swimming pool court with outdoor shower & barbecue pavilion",
      "Integrated home lift / elevator shaft design",
      "State-of-the-art 8-seater Home Theatre room",
      "Separate Servant Quarter & Driver's Room with private baths",
      "Triple kitchen layout (Show Kitchen, Grease Kitchen, Pantry)",
      "High-security safe room / panic room integration in Master Suite"
    ],
    cadFilesIncluded: [
      "Complete Master Architectural DWG Set",
      "Complete Structural Engineering Drawings (RCC Frame, Footings, Slabs)",
      "Plumbing, HVAC & Electrical Conduit Layouts",
      "Interior Elevations for Kitchens, Wardrobes, & Media Walls",
      "3D Exterior Daylight, Dusk & Night Architectural Renders (8K Quality)"
    ],
    floorBreakdown: {
      groundFloor: [
        "Grand 4-Car Porch: 28'-0\" × 20'-0\"",
        "Front Lawn: 20'-0\" × 22'-0\"",
        "Royal Drawing Room: 18'-0\" × 20'-0\"",
        "Dining Hall: 14'-0\" × 18'-0\"",
        "Double Height Main Lounge: 26'-0\" × 22'-0\"",
        "Designer Show Kitchen: 14'-0\" × 16'-0\"",
        "Grease / Dirty Kitchen: 10'-0\" × 14'-0\"",
        "Master Bed 1 (Ground): 18'-0\" × 16'-0\" with Spa Bath & Dressing",
        "Bed 2: 15'-0\" × 16'-0\" with Attached Bath",
        "Swimming Pool Court: 16'-0\" × 22'-0\""
      ],
      firstFloor: [
        "Executive Master Suite 3: 20'-0\" × 17'-0\" with Private Terrace & Jacuzzi",
        "Bed 4: 16'-0\" × 15'-0\" with Attached Bath",
        "Bed 5: 15'-0\" × 16'-0\" with Attached Bath",
        "Bed 6: 14'-0\" × 15'-0\" with Attached Bath",
        "Home Cinema / Media Room: 16'-0\" × 14'-0\"",
        "Upper Family Sitting: 22'-0\" × 16'-0\"",
        "Barbecue Terrace: 18'-0\" × 14'-0\""
      ]
    },
    rooms: [
      { name: '4-Car Porch', dimensions: "28'-0\" × 20'-0\"", floor: 'Ground Floor' },
      { name: 'Royal Drawing Room', dimensions: "18'-0\" × 20'-0\"", floor: 'Ground Floor' },
      { name: 'Double Height Lounge', dimensions: "26'-0\" × 22'-0\"", floor: 'Ground Floor' },
      { name: 'Ground Master Bed', dimensions: "18'-0\" × 16'-0\"", floor: 'Ground Floor' },
      { name: 'Executive Master Suite', dimensions: "20'-0\" × 17'-0\"", floor: 'First Floor' },
      { name: 'Home Cinema', dimensions: "16'-0\" × 14'-0\"", floor: 'First Floor' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      elevation3d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      floorPlan2d: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      interiorRenders: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80'
      ]
    },
    hasCadDownloadSample: true,
    viewsCount: 3410,
    createdAt: '2026-01-10'
  },
  {
    id: 'plan-1k-spanish-06',
    slug: '1-kanal-mediterranean-spanish-castle-50x90',
    title: "1 Kanal Mediterranean Spanish Castle (50' × 90')",
    category: '1 Kanal',
    subCategory: 'Spanish Mansions',
    style: 'Spanish',
    plotDimensions: { length: 90, width: 50, unit: 'ft', totalSqFt: 4500 },
    plotSizeLabel: "1 Kanal (50' × 90')",
    coveredAreaSqFt: 7000,
    coveredAreaLabel: '7,000 sq. ft.',
    bedrooms: 5,
    bathrooms: 6,
    floorsCount: 2,
    floorsLabel: 'Double Storey (G+1)',
    parkingSpaces: 3,
    facing: 'West',
    pricePKR: 115000,
    priceUSD: 460,
    featured: false,
    shortDescription: "Spanish colonial charm with terracotta barrel tiles, central fountain courtyard, arched porticoes, and grand stone masonry.",
    fullDescription: "Custom-crafted for luxury 50'×90' plots, this Spanish hacienda blends Mediterranean grandeur with modern livability. Features a central fountain courtyard, clay roof tiles, exposed timber rafters, warm travertine stone finishes, and 5 expansive bedroom suites.",
    keyFeatures: [
      "3-Car Spanish portico with rustic stone cladding",
      "Courtyard with Spanish tile fountain and lemon tree arbor",
      "Vaulted ceiling dining and drawing rooms",
      "5 Deluxe bedrooms with rustic terracotta and marble finishes"
    ],
    cadFilesIncluded: [
      "AutoCAD DWG Architecture File",
      "Stone Cladding & Arch Masonry Working Drawings",
      "Electrical & Plumbing Detail Sheets"
    ],
    floorBreakdown: {
      groundFloor: [
        "3-Car Porch: 24'-0\" × 20'-0\"",
        "Drawing Room: 18'-0\" × 18'-0\"",
        "Courtyard: 16'-0\" × 16'-0\"",
        "Living Lounge: 24'-0\" × 20'-0\"",
        "Kitchen: 14'-0\" × 16'-0\"",
        "Master Bed 1: 18'-0\" × 15'-0\""
      ],
      firstFloor: [
        "4 Bedrooms with baths",
        "Spanish Roof Terrace with Pergola"
      ]
    },
    rooms: [
      { name: 'Car Porch', dimensions: "24'-0\" × 20'-0\"", floor: 'Ground Floor' },
      { name: 'Drawing Room', dimensions: "18'-0\" × 18'-0\"", floor: 'Ground Floor' },
      { name: 'Central Courtyard', dimensions: "16'-0\" × 16'-0\"", floor: 'Ground Floor' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      elevation3d: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      floorPlan2d: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      interiorRenders: [
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80'
      ]
    },
    hasCadDownloadSample: true,
    viewsCount: 1640,
    createdAt: '2026-02-14'
  },
  {
    id: 'plan-cad-working-07',
    slug: '2d-autocad-complete-working-drawing-set-30x60',
    title: "2D AutoCAD Full Working Blueprint Set (30' × 60')",
    category: '2D AutoCAD',
    subCategory: 'AutoCAD Working Plans',
    style: 'Modern',
    plotDimensions: { length: 60, width: 30, unit: 'ft', totalSqFt: 1800 },
    plotSizeLabel: "7 Marla (30' × 60')",
    coveredAreaSqFt: 3400,
    coveredAreaLabel: '3,400 sq. ft.',
    bedrooms: 4,
    bathrooms: 5,
    floorsCount: 2,
    floorsLabel: 'Double Storey (G+1)',
    parkingSpaces: 2,
    facing: 'North',
    pricePKR: 45000,
    priceUSD: 180,
    featured: true,
    shortDescription: "Complete production-ready AutoCAD DWG blueprint set including furniture plan, column layout, plumbing, electrical, and sectional elevations.",
    fullDescription: "Contractor-ready AutoCAD technical package designed for 30'×60' (7 to 8 Marla) plots. Includes clean DXF/DWG vector layers, structural foundation layout, door/window schedules, plumbing isometric diagrams, and electrical switchboard conduits. Directly usable by municipal development authorities and civil contractors.",
    keyFeatures: [
      "Layer-separated AutoCAD DWG files (Walls, Doors, Windows, Text, Dimensions, Electrical, Plumbing)",
      "Accurate municipal authority submission drawings",
      "Beam and slab reinforcement structural details",
      "Boundary wall and gate fabrication details"
    ],
    cadFilesIncluded: [
      "Master DWG Architectural Floor Plans (Ground & 1st)",
      "Section A-A & Section B-B CAD details",
      "Plumbing Sewerage & Drainage Piping Sheets",
      "Electrical Wiring, Light Points & DB Box Schematics",
      "Door, Window & Ventilator Manufacturing Schedules"
    ],
    floorBreakdown: {
      groundFloor: [
        "Car Porch: 16'-0\" × 16'-0\"",
        "Drawing Room: 14'-0\" × 15'-0\"",
        "Living Lounge: 19'-0\" × 15'-0\"",
        "Kitchen: 10'-0\" × 12'-0\"",
        "Master Bed 1: 14'-0\" × 13'-0\" with Attached Bath"
      ],
      firstFloor: [
        "Bed 2, 3, 4 with attached baths",
        "Upper TV Lounge",
        "Front Balcony"
      ]
    },
    rooms: [
      { name: 'Car Porch', dimensions: "16'-0\" × 16'-0\"", floor: 'Ground Floor' },
      { name: 'Drawing Room', dimensions: "14'-0\" × 15'-0\"", floor: 'Ground Floor' },
      { name: 'Living Hall', dimensions: "19'-0\" × 15'-0\"", floor: 'Ground Floor' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      elevation3d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      floorPlan2d: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      interiorRenders: [
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80'
      ]
    },
    hasCadDownloadSample: true,
    viewsCount: 2890,
    createdAt: '2026-02-05'
  },
  {
    id: 'plan-3d-lumion-08',
    slug: '3d-contemporary-glass-cube-elevation-design',
    title: "3D Photorealistic Glass Cube Elevation Design (35' × 70')",
    category: '3D House Designs',
    subCategory: 'Modern 3D Elevations',
    style: 'Contemporary',
    plotDimensions: { length: 70, width: 35, unit: 'ft', totalSqFt: 2450 },
    plotSizeLabel: "10 Marla (35' × 70')",
    coveredAreaSqFt: 4500,
    coveredAreaLabel: '4,500 sq. ft.',
    bedrooms: 5,
    bathrooms: 5,
    floorsCount: 2,
    floorsLabel: 'Double Storey (G+1)',
    parkingSpaces: 2,
    facing: 'North',
    pricePKR: 55000,
    priceUSD: 220,
    featured: true,
    shortDescription: "Ultra-modern 3D front elevation design with double-glazed low-E curtain walls, architectural metal fins, dark porcelain tiles, and warm twilight lighting.",
    fullDescription: "A striking exterior design incorporating cantilevered geometric boxes, wood-plastic composite (WPC) vertical louvers, textured slate cladding, and integrated linear LED channel lighting. Delivered with daylight, dusk, and night 4K photorealistic renders alongside precise elevation dimension drawings.",
    keyFeatures: [
      "4K Photorealistic daylight and night renders",
      "Material specifications: Porcelain slabs, WPC louvers, textured rockwall",
      "Complete exterior lighting layout with fixture recommendations",
      "Full elevation AutoCAD working drawings with mm/inch dimensions"
    ],
    cadFilesIncluded: [
      "3D Model File (SKP / 3DS / FBX compatible)",
      "High-Resolution 4K Render Pack (5 Camera Angles)",
      "2D AutoCAD Front & Side Elevation CAD Drawings"
    ],
    floorBreakdown: {
      groundFloor: ["2-Car Porch", "Double Height Entry", "Drawing Room", "Lounge", "Bed 1", "Bed 2"],
      firstFloor: ["Upper Lounge", "Master Bed 3 with cantilever glass cube", "Bed 4", "Bed 5", "Front Terrace"]
    },
    rooms: [
      { name: 'Living Room', dimensions: "20'-0\" × 16'-0\"", floor: 'Ground Floor' },
      { name: 'Cantilever Master Suite', dimensions: "16'-0\" × 15'-0\"", floor: 'First Floor' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      elevation3d: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      floorPlan2d: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      interiorRenders: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80'
      ]
    },
    hasCadDownloadSample: true,
    viewsCount: 3820,
    createdAt: '2026-02-18'
  },
  {
    id: 'plan-double-storey-09',
    slug: 'double-storey-smart-family-house-plan-25x50',
    title: "Double Storey Smart Family House Plan (25' × 50')",
    category: 'Double Storey',
    subCategory: 'Double Storey Family Homes',
    style: 'Modern',
    plotDimensions: { length: 50, width: 25, unit: 'ft', totalSqFt: 1250 },
    plotSizeLabel: "5 Marla (25' × 50')",
    coveredAreaSqFt: 2350,
    coveredAreaLabel: '2,350 sq. ft.',
    bedrooms: 4,
    bathrooms: 5,
    floorsCount: 2,
    floorsLabel: 'Double Storey (G+1)',
    parkingSpaces: 1,
    facing: 'East',
    pricePKR: 36000,
    priceUSD: 145,
    featured: true,
    shortDescription: "Optimal dual-family or growing family double storey layout with 2 master bedrooms on ground floor, 2 on first floor, and independent laundry area.",
    fullDescription: "Tailored specifically for 25'×50' plots, this double-storey plan solves the common challenge of accommodating two generations under one roof. Offers independent access possibilities, double kitchens, separate electrical conduits for dual meters, and maximum usable floor efficiency.",
    keyFeatures: [
      "Separate meter room and dual distribution board setup",
      "Dual kitchens (Ground floor main kitchen + 1st floor kitchenette)",
      "Skylit central light-well ensuring bright interiors",
      "Covered car porch with anti-skid granite tiles"
    ],
    cadFilesIncluded: [
      "AutoCAD DWG Architecture File",
      "Staircase structural sectional cut and reinforcement",
      "Complete electrical and plumbing diagrams"
    ],
    floorBreakdown: {
      groundFloor: ["Porch: 14'×15'", "Drawing: 12'×13'", "Lounge: 16'×14'", "Kitchen: 9'×12'", "Bed 1: 13'×12'", "Bed 2: 11'×12'"],
      firstFloor: ["Kitchenette: 8'×10'", "Upper Lounge: 15'×13'", "Bed 3: 13'×12'", "Bed 4: 12'×12'", "Terrace: 12'×10'"]
    },
    rooms: [
      { name: 'Car Porch', dimensions: "14'-0\" × 15'-0\"", floor: 'Ground Floor' },
      { name: 'Ground Lounge', dimensions: "16'-0\" × 14'-0\"", floor: 'Ground Floor' },
      { name: 'Upper Lounge', dimensions: "15'-0\" × 13'-0\"", floor: 'First Floor' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      elevation3d: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      floorPlan2d: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      interiorRenders: [
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80'
      ]
    },
    hasCadDownloadSample: true,
    viewsCount: 1940,
    createdAt: '2026-02-22'
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-01',
    slug: '5-marla-house-construction-cost-breakdown-2026',
    title: '5 Marla House Construction Cost in Pakistan (2026 Complete Breakdown)',
    excerpt: 'Detailed item-by-item calculation of grey structure and finishing costs for a standard 25x45 / 25x50 5 Marla house in 2026.',
    content: `Building a 5 Marla house (approx 1,125 to 1,250 square feet plot) requires meticulous budget planning. In 2026, construction costs depend heavily on the grade of steel (Grade 60), cement, sanitary fittings, and electrical switchgear chosen.

### 1. Grey Structure Cost (Ground + First Floor)
For an average covered area of 2,150 sq. ft:
- Bricks: Approx. 45,000 to 50,000 bricks @ Rs. 14.5/brick = Rs. 650,000 - 720,000
- Cement (approx. 550 bags @ Rs. 1,300/bag): Rs. 715,000
- Steel reinforcement (Grade 60, approx. 3.2 tons): Rs. 860,000
- Crushed stone (Bajri) & Ravi/Chenab sand: Rs. 380,000
- Plumbing & Electrical grey piping: Rs. 320,000
- Labor contractor rate (Rs. 480 - 550 / sq. ft.): Rs. 1,050,000 - 1,180,000

Total Grey Structure Cost: Approximately **Rs. 4.2 Million to Rs. 4.8 Million PKR**.

### 2. Premium Finishing Cost
- Floor Tiles (Porcelain 24"x48"): Rs. 850,000
- Bath Tiles & Imported Sanitaryware: Rs. 650,000
- Solid Ashwood / Semi-solid Doors: Rs. 480,000
- Kitchen Cabinets (UV / Acrylic sheets) & Quartz Countertops: Rs. 550,000
- False Ceiling (Gypsum board & ambient LED lights): Rs. 320,000
- Paint & Exterior Rockwall / Graffiato: Rs. 420,000
- Aluminum & Tempered Glass Windows (1.6mm): Rs. 480,000

Total Premium Finishing Cost: Approximately **Rs. 4.5 Million to Rs. 5.5 Million PKR**.

### Key Takeaway:
Having a well-documented 2D AutoCAD floor plan and structural layout saves up to 15% in material wastage and avoids expensive demolition during execution.`,
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    author: 'Engr. Tariq Mehmood, Chief Architect',
    publishDate: '2026-03-01',
    readTime: '6 min read',
    tags: ['5 Marla', 'Construction Cost', 'Budgeting', 'AutoCAD Plans'],
    category: 'Cost Estimation'
  },
  {
    id: 'blog-02',
    slug: 'top-7-mistakes-in-residential-autocad-floor-plans',
    title: 'Top 7 Mistakes Homeowners Make When Finalizing House Plans',
    excerpt: 'Avoid poor cross-ventilation, clumsy door swings, undersized car porches, and costly spatial errors with these architectural tips.',
    content: `When designing your dream home, minor oversights on paper become permanent concrete headaches once built. Here are the top seven mistakes we see homeowners make before engaging professional architects:

1. **Undersizing the Car Porch**: Modern SUVs (like Fortuner, Sportage, or Revo) require at least 14 feet width and 16 feet depth. Designing a 12'x14' porch often means struggling to open car doors or close the front sliding gate.
2. **Ignoring Cross-Ventilation (OTS - Open to Sky)**: Deep narrow plots (such as 25'x50' or 35'x65') will have dark, humid bathrooms and stuffy middle bedrooms if a proper ventilation shaft is not calculated.
3. **Overcrowding Bedrooms at the Expense of Living Space**: A cramped 10'x10' bedroom with poor closet clearance reduces daily quality of life far more than a spacious 13'x14' bedroom.
4. **Neglecting the "Dirty Kitchen" in Subcontinental Cooking**: High-heat frying, spices, and heavy steam can damage delicate open-concept cabinetry. A separate scullery or wet kitchen is indispensable.
5. **Awkward Door Swings**: Doors opening against closet doors or blocking light switches.
6. **Skipping Structural Column Grid Verification**: Designing expansive 25-foot spans without columns leads to costly steel beams or sagging slabs.
7. **Neglecting Sun Path Orientation**: West-facing bedrooms absorb scorching afternoon heat; appropriate vertical louvers or overhangs are essential.`,
    coverImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    author: 'Arch. Zunaira Khan',
    publishDate: '2026-02-18',
    readTime: '5 min read',
    tags: ['AutoCAD Tips', 'House Planning', 'Ventilation', 'Architecture'],
    category: 'Architectural Guide'
  },
  {
    id: 'blog-03',
    slug: 'modern-vs-spanish-elevation-which-is-best-for-your-plot',
    title: 'Modern Minimalist vs Spanish Elevation: Which Design Style Suits Your Plot?',
    excerpt: 'Comparing upfront construction cost, long-term maintenance, societal resale value, and architectural appeal.',
    content: `Two architectural styles dominate contemporary residential developments today: Ultra-Modern Minimalist and Classic Spanish Mediterranean.

### Modern Minimalist Elevation
- **Visual Hallmarks**: Clean orthogonal lines, geometric cantilevers, large glass panels, metal slats, porcelain tile cladding, monochromatic palette.
- **Cost Factor**: High upfront cost on quality tempered glass, aluminum profiles, and stone tile adhesives.
- **Maintenance**: Moderate to low; smooth surfaces are easy to wash.
- **Best Suited For**: Corner plots, North/East facing orientations where heat gain through glass is manageable.

### Spanish Mediterranean Elevation
- **Visual Hallmarks**: Terracotta clay roof shingles, round arches, wrought iron ornamental railings, warm earthy stucco, carved corbels.
- **Cost Factor**: Higher carpentry and specialist artisan plaster molding labor.
- **Maintenance**: Clay tiles require inspection every few years; textured stucco requires fresh paint periodically.
- **Best Suited For**: Residential communities with green surroundings and homeowners who love warm, nostalgic estates.`,
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    author: 'Hamza Farooq, Senior 3D Visualizer',
    publishDate: '2026-01-28',
    readTime: '4 min read',
    tags: ['3D Elevation', 'Spanish House', 'Modern Villa', 'Design Trends'],
    category: 'Interior & Exterior'
  }
];

export const INITIAL_ORDERS: CustomOrder[] = [
  {
    id: 'ord-101',
    createdAt: '2026-03-08T10:15:00Z',
    customerName: 'Muhammad Salman',
    whatsappNumber: '+923004567890',
    email: 'salman.eng@gmail.com',
    plotCategory: '5 Marla',
    plotWidthFt: 25,
    plotLengthFt: 50,
    plotFacing: 'East',
    floors: 'Double Storey',
    bedroomsCount: 4,
    bathroomsCount: 4,
    carParking: 1,
    designStyle: 'Modern',
    desiredServices: ['2D AutoCAD Floor Plans', '3D Front Elevation', 'Complete Structural & MEP'],
    specialRequirements: 'Need double height entrance lobby, open kitchen with breakfast counter, and one bedroom on ground floor for elderly parents. East facing with good morning sunlight.',
    cityOrCountry: 'Lahore, Pakistan (DHA Phase 7)',
    budgetPKR: 'Rs. 50,000 package budget',
    estimatedAreaSqFt: 2250,
    status: 'In Discussion',
    adminNotes: 'Sent initial 2D conceptual layout via WhatsApp on March 9th. Client requested minor tweak in kitchen placement.'
  },
  {
    id: 'ord-102',
    createdAt: '2026-03-10T14:30:00Z',
    customerName: 'Dr. Ayesha Malik',
    whatsappNumber: '+923219876543',
    email: 'ayesha.malik.doc@yahoo.com',
    plotCategory: '10 Marla',
    plotWidthFt: 35,
    plotLengthFt: 65,
    plotFacing: 'Corner',
    floors: 'Double Storey',
    bedroomsCount: 5,
    bathroomsCount: 6,
    carParking: 2,
    designStyle: 'Contemporary',
    desiredServices: ['2D AutoCAD Floor Plans', '3D Front Elevation', 'Interior 3D Renders'],
    specialRequirements: 'Corner plot with dual road access. Want servant room with separate external access. Big walk-in closet for master bed on first floor. Swimming pool court in rear if possible.',
    cityOrCountry: 'Islamabad (Gulberg Greens)',
    budgetPKR: 'Rs. 85,000 design package',
    estimatedAreaSqFt: 4200,
    status: 'New',
    adminNotes: 'New inquiry received. Needs call scheduling tomorrow at 4 PM.'
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-201',
    createdAt: '2026-03-11T09:10:00Z',
    name: 'Kamran Ashraf',
    whatsapp: '+923335551234',
    email: 'kamran@ashraftraders.com',
    planId: 'plan-5m-modern-01',
    planTitle: "5 Marla Modern Luxury Residence (25' × 45')",
    message: 'Salam, can this 5 Marla plan be modified for a 25x50 plot instead of 25x45? Also what is the delivery timeline for AutoCAD source DWG?',
    status: 'Replied',
    sourcePage: '5 Marla House Plans',
    adminNotes: 'Informed client that 25x50 adaptation takes only 48 hours. Follow up on WhatsApp.'
  },
  {
    id: 'inq-202',
    createdAt: '2026-03-12T08:00:00Z',
    name: 'Bilal Hassan',
    whatsapp: '+971501234567',
    email: 'bilal.hassan@dubaiholdings.ae',
    planId: 'plan-1k-luxury-05',
    planTitle: "1 Kanal Contemporary Palatial Villa (50' × 90')",
    message: 'Overseas Pakistani living in Dubai. Building in DHA Multan. Need complete turnkey architecture package with structural engineering stamp.',
    status: 'In Progress',
    sourcePage: '1 Kanal House Plans',
    adminNotes: 'Sent quotation for full Turnkey Architectural & Engineering file via WhatsApp.'
  }
];
