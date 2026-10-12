export interface PlotDimensions {
  length: number;
  width: number;
  unit: 'ft' | 'm';
  totalSqFt: number;
}

export interface RoomDetail {
  name: string;
  dimensions: string; // e.g. "14' - 0\" × 12' - 6\""
  floor: 'Ground Floor' | 'First Floor' | 'Basement' | 'Rooftop';
  description?: string;
}

export interface CADLayer {
  name: string;
  color: string;
  visible: boolean;
}

export interface HousePlan {
  id: string;
  slug: string;
  title: string;
  category: '5 Marla' | '10 Marla' | '1 Kanal' | '2D AutoCAD' | '3D House Designs' | 'Double Storey';
  subCategory?: string;
  style: 'Modern' | 'Contemporary' | 'Spanish' | 'Neo-Classical' | 'Minimalist' | 'Victorian';
  plotDimensions: PlotDimensions;
  plotSizeLabel: string; // e.g. "5 Marla (25' × 45')"
  coveredAreaSqFt: number;
  coveredAreaLabel: string; // e.g. "2,150 sq. ft."
  bedrooms: number;
  bathrooms: number;
  floorsCount: number;
  floorsLabel: string; // e.g. "Double Storey (G+1)"
  parkingSpaces: number;
  facing: 'North' | 'South' | 'East' | 'West' | 'Corner' | 'North-East';
  pricePKR: number;
  priceUSD: number;
  featured: boolean;
  shortDescription: string;
  fullDescription: string;
  keyFeatures: string[];
  cadFilesIncluded: string[];
  floorBreakdown: {
    groundFloor: string[];
    firstFloor?: string[];
    basement?: string[];
    roof?: string[];
  };
  rooms: RoomDetail[];
  images: {
    hero: string;
    elevation3d: string;
    floorPlan2d: string;
    interiorRenders: string[];
  };
  hasCadDownloadSample?: boolean;
  viewsCount?: number;
  createdAt: string;
}

export interface CustomOrder {
  id: string;
  createdAt: string;
  customerName: string;
  whatsappNumber: string;
  email?: string;
  plotCategory: '5 Marla' | '7 Marla' | '10 Marla' | '1 Kanal' | '2 Kanal' | 'Custom Size';
  plotWidthFt: number;
  plotLengthFt: number;
  plotFacing: 'North' | 'South' | 'East' | 'West' | 'Corner' | 'Park Facing';
  floors: 'Single Storey' | 'Double Storey' | 'Triple Storey' | 'With Basement';
  bedroomsCount: number;
  bathroomsCount: number;
  carParking: number;
  designStyle: 'Modern' | 'Contemporary' | 'Spanish' | 'Classical' | 'Minimalist';
  desiredServices: ('2D AutoCAD Floor Plans' | '3D Front Elevation' | 'Complete Structural & MEP' | 'Interior 3D Renders')[];
  specialRequirements: string;
  cityOrCountry: string;
  budgetPKR?: string;
  estimatedAreaSqFt: number;
  status: 'New' | 'Contacted' | 'In Discussion' | 'Designing' | 'Completed';
  adminNotes?: string;
}

export interface Inquiry {
  id: string;
  createdAt: string;
  name: string;
  whatsapp: string;
  email?: string;
  planId?: string;
  planTitle?: string;
  message: string;
  status: 'New' | 'Replied' | 'In Progress' | 'Closed';
  sourcePage: string;
  adminNotes?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishDate: string;
  readTime: string;
  tags: string[];
  category: 'Architectural Guide' | 'AutoCAD & Plans' | 'Cost Estimation' | 'Interior & Exterior';
}

export interface SiteSettings {
  whatsappNumber: string;
  displayPhone: string;
  email: string;
  officeAddress: string;
  businessHours: string;
  announcementText: string;
  announcementActive: boolean;
  consultationFeeFree: boolean;
}
