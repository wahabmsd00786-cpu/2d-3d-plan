import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Layers, 
  MessageSquare, 
  Settings, 
  BookOpen, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  ExternalLink, 
  Download, 
  RefreshCw, 
  Server, 
  Globe, 
  Phone, 
  FileText,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { HousePlan, SiteSettings, CustomOrder, Inquiry, BlogPost } from '../types';
import { api } from '../services/api';
import { SEOHead } from '../components/SEOHead';

interface AdminDashboardProps {
  plans: HousePlan[];
  settings: SiteSettings;
  onRefreshData: () => Promise<void>;
  onNavigate: (path: string) => void;
}

export function AdminDashboard({ plans, settings, onRefreshData, onNavigate }: AdminDashboardProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'plans' | 'inquiries' | 'orders' | 'settings' | 'deployment'>('overview');

  // Local Data States
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [orders, setOrders] = useState<CustomOrder[]>([]);
  const [editableSettings, setEditableSettings] = useState<SiteSettings>(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Plan Management Modal State
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<HousePlan | null>(null);
  const [planForm, setPlanForm] = useState<Partial<HousePlan>>({
    title: '',
    category: '5 Marla',
    style: 'Modern',
    plotSizeLabel: "5 Marla (25' × 50')",
    plotDimensions: { length: 50, width: 25, unit: 'ft', totalSqFt: 1250 },
    coveredAreaLabel: '2,200 sq. ft.',
    coveredAreaSqFt: 2200,
    bedrooms: 4,
    bathrooms: 4,
    floorsCount: 2,
    floorsLabel: 'Double Storey (G+1)',
    parkingSpaces: 1,
    facing: 'North',
    pricePKR: 35000,
    priceUSD: 140,
    featured: true,
    shortDescription: '',
    fullDescription: '',
    keyFeatures: ['1 Car Porch', 'Double Height Foyer', 'Open Kitchen', 'Terrace'],
    cadFilesIncluded: ['AutoCAD DWG Architecture File', 'High-Res PDF Blueprints', 'Electrical & Plumbing Layouts'],
    floorBreakdown: { groundFloor: ["Car Porch: 14'×15'", "Drawing: 12'×13'"], firstFloor: ["Bed 2, 3 with baths"] },
    rooms: [
      { name: 'Car Porch', dimensions: "14' × 15'", floor: 'Ground Floor' },
      { name: 'Drawing Room', dimensions: "12' × 13'", floor: 'Ground Floor' },
      { name: 'Master Bedroom', dimensions: "14' × 12'", floor: 'Ground Floor' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      elevation3d: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      floorPlan2d: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      interiorRenders: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80']
    }
  });

  // Verify Auth on mount
  useEffect(() => {
    async function checkSession() {
      setLoadingAuth(true);
      const authed = await api.verifyAuth();
      setIsAuthenticated(authed);
      setLoadingAuth(false);
      if (authed) {
        fetchDashboardData();
      }
    }
    checkSession();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [inq, ord, set] = await Promise.all([
        api.getInquiries(),
        api.getCustomOrders(),
        api.getSettings()
      ]);
      setInquiries(inq);
      setOrders(ord);
      setEditableSettings(set);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const success = await api.login(passwordInput);
    if (success) {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      setAuthError('Invalid Admin Password. Please try again.');
    }
  };

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
  };

  // Plan CRUD
  const handleOpenNewPlan = () => {
    setEditingPlan(null);
    setPlanForm({
      title: '',
      category: '5 Marla',
      style: 'Modern',
      plotSizeLabel: "5 Marla (25' × 50')",
      plotDimensions: { length: 50, width: 25, unit: 'ft', totalSqFt: 1250 },
      coveredAreaLabel: '2,200 sq. ft.',
      coveredAreaSqFt: 2200,
      bedrooms: 4,
      bathrooms: 4,
      floorsCount: 2,
      floorsLabel: 'Double Storey (G+1)',
      parkingSpaces: 1,
      facing: 'North',
      pricePKR: 35000,
      priceUSD: 140,
      featured: true,
      shortDescription: 'Modern double storey house plan with spacious bedrooms and car porch.',
      fullDescription: 'Complete AutoCAD working drawings with detailed elevation and foundation calculations.',
      keyFeatures: ['1 Car Porch', 'Double Height Foyer', 'Open Kitchen', 'Terrace'],
      cadFilesIncluded: ['AutoCAD DWG Architecture File', 'High-Res PDF Blueprints', 'Electrical & Plumbing Layouts'],
      floorBreakdown: { groundFloor: ["Car Porch: 14'×15'", "Drawing: 12'×13'"], firstFloor: ["Bed 2, 3 with baths"] },
      rooms: [
        { name: 'Car Porch', dimensions: "14' × 15'", floor: 'Ground Floor' },
        { name: 'Drawing Room', dimensions: "12' × 13'", floor: 'Ground Floor' }
      ],
      images: {
        hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        elevation3d: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        floorPlan2d: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        interiorRenders: []
      }
    });
    setIsPlanModalOpen(true);
  };

  const handleEditPlan = (plan: HousePlan) => {
    setEditingPlan(plan);
    setPlanForm(plan);
    setIsPlanModalOpen(true);
  };

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPlan) {
        await api.updatePlan(editingPlan.id, planForm);
      } else {
        await api.createPlan(planForm as HousePlan);
      }
      setIsPlanModalOpen(false);
      await onRefreshData();
    } catch (err: any) {
      alert(err.message || 'Error saving plan');
    }
  };

  const handleDeletePlan = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to permanently delete plan "${title}"?`)) {
      await api.deletePlan(id);
      await onRefreshData();
    }
  };

  // Inquiry Status Update
  const handleUpdateInquiryStatus = async (id: string, status: Inquiry['status']) => {
    await api.updateInquiry(id, { status });
    setInquiries(inquiries.map(i => i.id === id ? { ...i, status } : i));
  };

  const handleDeleteInquiry = async (id: string) => {
    if (confirm('Delete this inquiry record?')) {
      await api.deleteInquiry(id);
      setInquiries(inquiries.filter(i => i.id !== id));
    }
  };

  // Order Status Update
  const handleUpdateOrderStatus = async (id: string, status: CustomOrder['status']) => {
    await api.updateCustomOrder(id, { status });
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  const handleDeleteOrder = async (id: string) => {
    if (confirm('Delete this custom order record?')) {
      await api.deleteCustomOrder(id);
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await api.updateSettings(editableSettings);
      setEditableSettings(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      await onRefreshData();
    } catch (err: any) {
      alert(err.message || 'Error saving settings');
    }
  };

  // 1. Loading Screen
  if (loadingAuth) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-[#C5A059] animate-spin mx-auto" />
          <p className="text-xs font-mono-cad text-slate-400">Verifying Admin Credentials...</p>
        </div>
      </div>
    );
  }

  // 2. Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <SEOHead
          title="Admin Login – Planova House Plans"
          description="Administrative control portal for Planova House Plans."
          canonicalPath="/admin"
        />

        <div className="w-full max-w-md bg-[#121620] border border-[#272F40] rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center mx-auto border border-[#C5A059]/40">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-white">Planova Admin Portal</h1>
            <p className="text-xs text-slate-400">
              Enter password to access CAD plans catalog, customer inquiries, and settings.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                Admin Master Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full px-4 py-2.5 bg-[#0C0F14] border border-[#242A38] rounded-xl text-sm text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
            >
              Sign In to Admin
            </button>
          </form>

          <div className="pt-2 text-center">
            <div className="text-[11px] text-slate-400 bg-[#161B25] p-3 rounded-xl border border-[#242A38] font-mono-cad">
              <div>Default Password: <span className="text-[#C5A059] font-bold">PlanovaAdmin2026!</span></div>
              <button
                type="button"
                onClick={() => setPasswordInput('PlanovaAdmin2026!')}
                className="text-xs text-[#C5A059] underline mt-1 hover:text-white"
              >
                Autofill Password
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Dashboard
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <SEOHead
        title="Admin Control Dashboard – Planova House Plans"
        description="Administrative management portal for house plans, inquiries, orders, and content."
        canonicalPath="/admin"
      />

      {/* Top Header & Logout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#212738] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-cad text-[#C5A059] mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>AUTHENTICATED SECURE SESSION</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white">Planova Admin Control Studio</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/')}
            className="px-4 py-2 rounded-xl bg-[#151922] border border-[#252C3D] text-slate-300 hover:text-white text-xs font-mono-cad"
          >
            Preview Live Site
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-mono-cad transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Top Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto p-1 bg-[#121620] border border-[#222838] rounded-2xl scrollbar-none">
        {[
          { id: 'overview', label: 'Overview Metrics', icon: RefreshCw },
          { id: 'plans', label: `House Plans (${plans.length})`, icon: Layers },
          { id: 'inquiries', label: `Inquiries (${inquiries.length})`, icon: MessageSquare },
          { id: 'orders', label: `Custom Orders (${orders.length})`, icon: FileText },
          { id: 'settings', label: 'Website Settings', icon: Settings },
          { id: 'deployment', label: 'Custom Domain & Deploy', icon: Globe }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-[#C5A059] text-black font-semibold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-[#181D26]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#121620] border border-[#222838] space-y-1">
              <div className="text-xs font-mono-cad text-slate-400">Total House Plans</div>
              <div className="text-3xl font-bold font-mono-cad text-white">{plans.length}</div>
              <div className="text-[11px] text-[#C5A059]">Active AutoCAD/3D Catalog</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#121620] border border-[#222838] space-y-1">
              <div className="text-xs font-mono-cad text-slate-400">Customer Inquiries</div>
              <div className="text-3xl font-bold font-mono-cad text-white">{inquiries.length}</div>
              <div className="text-[11px] text-emerald-400">
                {inquiries.filter(i => i.status === 'New').length} Pending Review
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#121620] border border-[#222838] space-y-1">
              <div className="text-xs font-mono-cad text-slate-400">Custom Design Orders</div>
              <div className="text-3xl font-bold font-mono-cad text-white">{orders.length}</div>
              <div className="text-[11px] text-amber-400">
                {orders.filter(o => o.status === 'New').length} New Plots Submitted
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#121620] border border-[#222838] space-y-1">
              <div className="text-xs font-mono-cad text-slate-400">Live WhatsApp Number</div>
              <div className="text-lg font-bold font-mono-cad text-[#E5C07B] truncate">
                {settings.whatsappNumber}
              </div>
              <div className="text-[11px] text-slate-400">Synchronized site-wide</div>
            </div>
          </div>

          {/* Recent Inquiries Quick View */}
          <div className="p-6 rounded-2xl bg-[#121620] border border-[#222838] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-white">Recent Customer Inquiries</h3>
              <button
                onClick={() => setActiveTab('inquiries')}
                className="text-xs font-mono-cad text-[#C5A059] hover:underline"
              >
                View All Inquiries →
              </button>
            </div>

            <div className="divide-y divide-[#1E2432]">
              {inquiries.slice(0, 4).map((inq) => (
                <div key={inq.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="font-semibold text-white">{inq.name} ({inq.whatsapp})</div>
                    <div className="text-slate-400 truncate max-w-md">{inq.message}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono-cad ${
                      inq.status === 'New' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {inq.status}
                    </span>
                    <a
                      href={`https://wa.me/${inq.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30"
                      title="Reply on WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PLANS MANAGER */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-heading text-xl font-bold text-white">Catalog Plans Manager</h3>
              <p className="text-xs text-slate-400">Add, edit, modify pricing, or delete house plans.</p>
            </div>
            <button
              onClick={handleOpenNewPlan}
              className="px-4 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Plan</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div key={p.id} className="rounded-2xl bg-[#121620] border border-[#222838] overflow-hidden flex flex-col justify-between">
                <div>
                  <img src={p.images.hero} alt={p.title} className="w-full aspect-[16/9] object-cover" />
                  <div className="p-5">
                    <div className="flex justify-between items-center text-xs font-mono-cad text-[#C5A059] mb-1">
                      <span>{p.category}</span>
                      <span>{p.plotSizeLabel}</span>
                    </div>
                    <h4 className="font-heading text-base font-bold text-white line-clamp-1">{p.title}</h4>
                    <div className="text-xs text-slate-400 mt-2 font-mono-cad">
                      {p.bedrooms} Beds · {p.bathrooms} Baths · {p.coveredAreaLabel}
                    </div>
                    <div className="text-sm font-bold font-mono-cad text-[#E5C07B] mt-2">
                      Rs. {p.pricePKR.toLocaleString()} (${p.priceUSD})
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#0F1218] border-t border-[#1E2432] flex items-center justify-between">
                  <span className="text-[11px] font-mono-cad text-slate-400">
                    {p.featured ? '★ Featured' : 'Standard'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditPlan(p)}
                      className="p-2 rounded-lg bg-[#191E2B] text-slate-300 hover:text-white"
                      title="Edit Plan"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePlan(p.id, p.title)}
                      className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                      title="Delete Plan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: INQUIRIES MANAGER */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-heading text-xl font-bold text-white">Customer Inquiries Management</h3>
            <p className="text-xs text-slate-400">Manage inquiries received from plan pages and contact form.</p>
          </div>

          <div className="rounded-2xl bg-[#121620] border border-[#222838] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#0E1116] border-b border-[#212736] text-[10px] font-mono-cad text-slate-400 uppercase">
                  <tr>
                    <th className="p-4">Customer Details</th>
                    <th className="p-4">Associated Plan</th>
                    <th className="p-4">Message / Requirements</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1D2230]">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-[#161B25]">
                      <td className="p-4">
                        <div className="font-semibold text-white">{inq.name}</div>
                        <div className="text-[11px] font-mono-cad text-[#C5A059]">{inq.whatsapp}</div>
                        {inq.email && <div className="text-[10px] text-slate-400">{inq.email}</div>}
                      </td>
                      <td className="p-4 font-mono-cad text-xs">
                        {inq.planTitle || 'General Architectural Inquiry'}
                      </td>
                      <td className="p-4 max-w-xs text-slate-300">
                        {inq.message}
                      </td>
                      <td className="p-4">
                        <select
                          value={inq.status}
                          onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                          className="bg-[#0C0F14] border border-[#242A38] rounded-lg px-2.5 py-1 text-xs text-slate-200"
                        >
                          <option value="New">New</option>
                          <option value="Replied">Replied</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <a
                          href={`https://wa.me/${inq.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Salam ${inq.name}, regarding your inquiry for ${inq.planTitle || 'house design'}...`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#25D366] text-black font-semibold text-[11px]"
                        >
                          <MessageSquare className="w-3 h-3 fill-black" />
                          <span>WhatsApp</span>
                        </a>
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CUSTOM ORDERS MANAGER */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-heading text-xl font-bold text-white">Custom House Design Orders</h3>
            <p className="text-xs text-slate-400">Custom plot sizes submitted by clients via Custom Order Studio.</p>
          </div>

          <div className="space-y-4">
            {orders.map((ord) => (
              <div key={ord.id} className="p-6 rounded-2xl bg-[#121620] border border-[#222838] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E2432] pb-3">
                  <div>
                    <div className="text-xs font-mono-cad text-[#C5A059] font-bold">
                      Order ID: {ord.id} · {new Date(ord.createdAt).toLocaleDateString()}
                    </div>
                    <h4 className="font-heading text-lg font-bold text-white">
                      {ord.customerName} ({ord.cityOrCountry || 'City not specified'})
                    </h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={ord.status}
                      onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as any)}
                      className="bg-[#0C0F14] border border-[#242A38] rounded-lg px-3 py-1.5 text-xs text-white"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Discussion">In Discussion</option>
                      <option value="Designing">Designing</option>
                      <option value="Completed">Completed</option>
                    </select>

                    <button
                      onClick={() => handleDeleteOrder(ord.id)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Plot Specs Scorecard */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono-cad">
                  <div className="p-3 rounded-xl bg-[#171C26]">
                    <div className="text-slate-400 text-[10px]">PLOT DIMENSIONS</div>
                    <div className="text-white font-bold">{ord.plotWidthFt}' × {ord.plotLengthFt}' ({ord.plotCategory})</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#171C26]">
                    <div className="text-slate-400 text-[10px]">STOREYS / CONFIG</div>
                    <div className="text-white font-bold">{ord.floors} ({ord.bedroomsCount} Bed, {ord.bathroomsCount} Bath)</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#171C26]">
                    <div className="text-slate-400 text-[10px]">STYLE / ORIENTATION</div>
                    <div className="text-white font-bold">{ord.designStyle} · {ord.plotFacing} Facing</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#171C26]">
                    <div className="text-slate-400 text-[10px]">EST. COVERED AREA</div>
                    <div className="text-[#E5C07B] font-bold">~{ord.estimatedAreaSqFt.toLocaleString()} sq. ft.</div>
                  </div>
                </div>

                <div className="text-xs text-slate-300">
                  <span className="text-slate-400 font-mono-cad">Requirements: </span>
                  {ord.specialRequirements}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/${ord.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Salam ${ord.customerName}, this is Planova Architecture. Regarding your custom order for ${ord.plotWidthFt}x${ord.plotLengthFt} (${ord.plotCategory})...`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-black font-semibold text-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-black" />
                    <span>WhatsApp Client ({ord.whatsappNumber})</span>
                  </a>
                  {ord.email && (
                    <a
                      href={`mailto:${ord.email}`}
                      className="px-4 py-2 rounded-xl bg-[#171C26] text-slate-300 hover:text-white text-xs font-mono-cad"
                    >
                      Email Client
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: WEBSITE SETTINGS */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl bg-[#121620] border border-[#222838] rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-heading text-xl font-bold text-white">Website & Contact Settings</h3>
            <p className="text-xs text-slate-400">
              Changes updated here immediately take effect across the entire website and all WhatsApp CTA buttons.
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                Primary WhatsApp Number (e.g. +923001234567) *
              </label>
              <input
                type="text"
                required
                value={editableSettings.whatsappNumber}
                onChange={(e) => setEditableSettings({ ...editableSettings, whatsappNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0C0F14] border border-[#242A38] rounded-xl text-sm text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                Display Phone Number (e.g. +92 300 123 4567)
              </label>
              <input
                type="text"
                value={editableSettings.displayPhone}
                onChange={(e) => setEditableSettings({ ...editableSettings, displayPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0C0F14] border border-[#242A38] rounded-xl text-sm text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                Official Studio Email
              </label>
              <input
                type="email"
                value={editableSettings.email}
                onChange={(e) => setEditableSettings({ ...editableSettings, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0C0F14] border border-[#242A38] rounded-xl text-sm text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                Physical Office Address
              </label>
              <textarea
                rows={2}
                value={editableSettings.officeAddress}
                onChange={(e) => setEditableSettings({ ...editableSettings, officeAddress: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0C0F14] border border-[#242A38] rounded-xl text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-cad text-slate-300 mb-1">
                Header Announcement Notice
              </label>
              <input
                type="text"
                value={editableSettings.announcementText}
                onChange={(e) => setEditableSettings({ ...editableSettings, announcementText: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0C0F14] border border-[#242A38] rounded-xl text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="annActive"
                checked={editableSettings.announcementActive}
                onChange={(e) => setEditableSettings({ ...editableSettings, announcementActive: e.target.checked })}
                className="w-4 h-4 accent-[#C5A059]"
              />
              <label htmlFor="annActive" className="text-xs text-slate-300">
                Display top announcement banner on website
              </label>
            </div>

            {saveSuccess && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Settings saved and updated successfully!</span>
              </div>
            )}

            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Save Website Settings
            </button>
          </form>
        </div>
      )}

      {/* TAB 6: CUSTOM DOMAIN & DEPLOYMENT GUIDE */}
      {activeTab === 'deployment' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-heading text-xl font-bold text-white">Production Deployment & Custom Domain Guide</h3>
            <p className="text-xs text-slate-400">
              Clear, step-by-step instructions to deploy Planova House Plans on a public hosting service with your custom domain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Guide 1: Custom Domain DNS Setup */}
            <div className="p-6 rounded-2xl bg-[#121620] border border-[#222838] space-y-4">
              <div className="flex items-center gap-2 font-heading font-bold text-white text-base">
                <Globe className="w-5 h-5 text-[#C5A059]" />
                <span>1. Connect Custom Domain (e.g. planovahouseplans.com)</span>
              </div>

              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <p>
                  In your domain registrar (GoDaddy, Namecheap, Cloudflare, Google Domains):
                </p>
                <div className="bg-[#0C0F14] p-3 rounded-xl border border-[#242A38] font-mono-cad space-y-1">
                  <div>Type: <span className="text-[#C5A059]">A</span> | Name: <span className="text-white">@</span> | Value: <span className="text-emerald-400">&lt;Your Server IP / Hosting IP&gt;</span></div>
                  <div>Type: <span className="text-[#C5A059]">CNAME</span> | Name: <span className="text-white">www</span> | Value: <span className="text-emerald-400">planovahouseplans.com</span></div>
                </div>
                <p className="text-slate-400 text-[11px]">
                  SSL certificates are issued automatically by Cloudflare, Render, Railway, or Let's Encrypt.
                </p>
              </div>
            </div>

            {/* Guide 2: Deploying to Cloud Run / Render / Railway */}
            <div className="p-6 rounded-2xl bg-[#121620] border border-[#222838] space-y-4">
              <div className="flex items-center gap-2 font-heading font-bold text-white text-base">
                <Server className="w-5 h-5 text-[#C5A059]" />
                <span>2. Node.js Full-Stack Deployment</span>
              </div>

              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <p>
                  Planova is equipped with a production-ready Express backend and Vite frontend build.
                </p>
                <div className="bg-[#0C0F14] p-3 rounded-xl border border-[#242A38] font-mono-cad space-y-1 text-[11px]">
                  <div className="text-slate-400"># 1. Build the production assets:</div>
                  <div className="text-white">npm run build</div>
                  <div className="text-slate-400 mt-1"># 2. Start the full-stack server:</div>
                  <div className="text-white">npm start</div>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Set environment variables: <code className="text-[#C5A059]">PORT=3000</code>, <code className="text-[#C5A059]">NODE_ENV=production</code>, <code className="text-[#C5A059]">APP_URL=https://yourdomain.com</code>.
                </p>
              </div>
            </div>

            {/* Guide 3: Static Jamstack Export (Vercel / Netlify) */}
            <div className="p-6 rounded-2xl bg-[#121620] border border-[#222838] space-y-4">
              <div className="flex items-center gap-2 font-heading font-bold text-white text-base">
                <Layers className="w-5 h-5 text-[#C5A059]" />
                <span>3. Vercel / Netlify Static Deploy</span>
              </div>

              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <p>
                  If you prefer static CDN hosting on Vercel or Netlify:
                </p>
                <div className="bg-[#0C0F14] p-3 rounded-xl border border-[#242A38] font-mono-cad space-y-1 text-[11px]">
                  <div>Build Command: <span className="text-white">npm run build</span></div>
                  <div>Publish Directory: <span className="text-[#C5A059]">dist</span></div>
                </div>
                <p className="text-slate-400 text-[11px]">
                  The application features client-side caching fallbacks so all catalog search, custom design calculators, and WhatsApp links work flawlessly on serverless CDNs.
                </p>
              </div>
            </div>

            {/* Guide 4: SEO & Verification */}
            <div className="p-6 rounded-2xl bg-[#121620] border border-[#222838] space-y-4">
              <div className="flex items-center gap-2 font-heading font-bold text-white text-base">
                <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
                <span>4. Google Search Console & Sitemap</span>
              </div>

              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <p>
                  Submit your sitemap directly to Google Search Console:
                </p>
                <div className="bg-[#0C0F14] p-3 rounded-xl border border-[#242A38] font-mono-cad space-y-1 text-[11px]">
                  <div>Sitemap URL: <span className="text-[#C5A059]">https://yourdomain.com/sitemap.xml</span></div>
                  <div>Robots URL: <span className="text-white">https://yourdomain.com/robots.txt</span></div>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Rich Schema.org structured data for ArchitecturalService and Product is automatically indexed.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* PLAN ADD / EDIT MODAL */}
      {isPlanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-[#121620] border border-[#2B3448] rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setIsPlanModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-[#181D28] text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading text-xl font-bold text-white mb-4">
              {editingPlan ? 'Edit House Plan' : 'Add New House Plan'}
            </h3>

            <form onSubmit={handleSavePlan} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-cad text-slate-300 mb-1">Plan Title *</label>
                  <input
                    type="text"
                    required
                    value={planForm.title || ''}
                    onChange={(e) => setPlanForm({ ...planForm, title: e.target.value })}
                    placeholder="e.g. 5 Marla Modern Luxury Villa (25' × 45')"
                    className="w-full px-3 py-2 bg-[#0C0F14] border border-[#242A38] rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-cad text-slate-300 mb-1">Category *</label>
                  <select
                    value={planForm.category || '5 Marla'}
                    onChange={(e) => setPlanForm({ ...planForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#0C0F14] border border-[#242A38] rounded-xl text-xs text-white"
                  >
                    <option value="5 Marla">5 Marla</option>
                    <option value="10 Marla">10 Marla</option>
                    <option value="1 Kanal">1 Kanal</option>
                    <option value="Double Storey">Double Storey</option>
                    <option value="2D AutoCAD">2D AutoCAD</option>
                    <option value="3D House Designs">3D House Designs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono-cad text-slate-300 mb-1">Plot Size Label</label>
                  <input
                    type="text"
                    value={planForm.plotSizeLabel || ''}
                    onChange={(e) => setPlanForm({ ...planForm, plotSizeLabel: e.target.value })}
                    placeholder="5 Marla (25' × 50')"
                    className="w-full px-3 py-2 bg-[#0C0F14] border border-[#242A38] rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-cad text-slate-300 mb-1">Covered Area Label</label>
                  <input
                    type="text"
                    value={planForm.coveredAreaLabel || ''}
                    onChange={(e) => setPlanForm({ ...planForm, coveredAreaLabel: e.target.value })}
                    placeholder="2,250 sq. ft."
                    className="w-full px-3 py-2 bg-[#0C0F14] border border-[#242A38] rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-cad text-slate-300 mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={planForm.bedrooms || 4}
                    onChange={(e) => setPlanForm({ ...planForm, bedrooms: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#0C0F14] border border-[#242A38] rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-cad text-slate-300 mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={planForm.bathrooms || 4}
                    onChange={(e) => setPlanForm({ ...planForm, bathrooms: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#0C0F14] border border-[#242A38] rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-cad text-slate-300 mb-1">Price in PKR</label>
                  <input
                    type="number"
                    value={planForm.pricePKR || 35000}
                    onChange={(e) => setPlanForm({ ...planForm, pricePKR: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#0C0F14] border border-[#242A38] rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-cad text-slate-300 mb-1">Primary Image URL</label>
                  <input
                    type="text"
                    value={planForm.images?.hero || ''}
                    onChange={(e) => setPlanForm({ 
                      ...planForm, 
                      images: { ...planForm.images!, hero: e.target.value } 
                    })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-[#0C0F14] border border-[#242A38] rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-cad text-slate-300 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={planForm.shortDescription || ''}
                  onChange={(e) => setPlanForm({ ...planForm, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0C0F14] border border-[#242A38] rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-cad text-slate-300 mb-1">Full Architectural Description</label>
                <textarea
                  rows={3}
                  value={planForm.fullDescription || ''}
                  onChange={(e) => setPlanForm({ ...planForm, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0C0F14] border border-[#242A38] rounded-xl text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredPlan"
                  checked={planForm.featured || false}
                  onChange={(e) => setPlanForm({ ...planForm, featured: e.target.checked })}
                  className="w-4 h-4 accent-[#C5A059]"
                />
                <label htmlFor="featuredPlan" className="text-xs text-slate-300 font-mono-cad">
                  Feature this plan on homepage
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlanModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#1C212D] text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C5A059] text-black font-semibold text-xs uppercase tracking-wider"
                >
                  Save Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
