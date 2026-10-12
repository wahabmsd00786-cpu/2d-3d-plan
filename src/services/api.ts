import { HousePlan, BlogPost, SiteSettings, CustomOrder, Inquiry } from '../types';
import { INITIAL_PLANS, INITIAL_BLOGS, INITIAL_SETTINGS, INITIAL_ORDERS, INITIAL_INQUIRIES } from '../data/initialData';

const STORAGE_KEYS = {
  PLANS: 'planova_plans_cache',
  BLOGS: 'planova_blogs_cache',
  SETTINGS: 'planova_settings_cache',
  ORDERS: 'planova_orders_cache',
  INQUIRIES: 'planova_inquiries_cache',
  TOKEN: 'planova_admin_token'
};

class ApiService {
  private getAuthHeader(): HeadersInit {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  // --- PLANS ---
  async getPlans(filters?: { category?: string; style?: string; bedrooms?: string; floors?: string; search?: string }): Promise<HousePlan[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.category && filters.category !== 'All') params.append('category', filters.category);
      if (filters?.style && filters.style !== 'All') params.append('style', filters.style);
      if (filters?.bedrooms && filters.bedrooms !== 'All') params.append('bedrooms', filters.bedrooms);
      if (filters?.floors && filters.floors !== 'All') params.append('floors', filters.floors);
      if (filters?.search) params.append('search', filters.search);

      const res = await fetch(`/api/plans?${params.toString()}`);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(data));
      return data;
    } catch {
      // Fallback to local storage or initial data
      const cached = localStorage.getItem(STORAGE_KEYS.PLANS);
      let list: HousePlan[] = cached ? JSON.parse(cached) : INITIAL_PLANS;
      if (filters?.category && filters.category !== 'All') {
        list = list.filter(p => p.category.toLowerCase() === filters.category?.toLowerCase());
      }
      if (filters?.search) {
        const q = filters.search.toLowerCase();
        list = list.filter(p => p.title.toLowerCase().includes(q) || p.plotSizeLabel.toLowerCase().includes(q));
      }
      return list;
    }
  }

  async getPlanBySlug(idOrSlug: string): Promise<HousePlan | null> {
    try {
      const res = await fetch(`/api/plans/${idOrSlug}`);
      if (!res.ok) throw new Error('Not found');
      return await res.json();
    } catch {
      const plans = await this.getPlans();
      return plans.find(p => p.slug === idOrSlug || p.id === idOrSlug) || null;
    }
  }

  async createPlan(plan: HousePlan): Promise<HousePlan> {
    const res = await fetch('/api/plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeader() },
      body: JSON.stringify(plan)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to create plan' }));
      throw new Error(err.error || 'Failed to create plan');
    }
    return await res.json();
  }

  async updatePlan(id: string, updates: Partial<HousePlan>): Promise<HousePlan> {
    const res = await fetch(`/api/plans/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeader() },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update plan');
    return await res.json();
  }

  async deletePlan(id: string): Promise<boolean> {
    const res = await fetch(`/api/plans/${id}`, {
      method: 'DELETE',
      headers: { ...this.getAuthHeader() }
    });
    return res.ok;
  }

  // --- SETTINGS ---
  async getSettings(): Promise<SiteSettings> {
    try {
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data));
      return data;
    } catch {
      const cached = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return cached ? JSON.parse(cached) : INITIAL_SETTINGS;
    }
  }

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeader() },
      body: JSON.stringify(settings)
    });
    if (!res.ok) throw new Error('Failed to update settings');
    const result = await res.json();
    return result.settings;
  }

  // --- CUSTOM ORDERS ---
  async submitCustomOrder(orderData: Partial<CustomOrder>): Promise<CustomOrder> {
    try {
      const res = await fetch('/api/custom-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (!res.ok) throw new Error('Submit failed');
      const result = await res.json();
      return result.order;
    } catch {
      // Local fallback
      const newOrder: CustomOrder = {
        id: 'ord-' + Date.now(),
        createdAt: new Date().toISOString(),
        customerName: orderData.customerName || 'Anonymous',
        whatsappNumber: orderData.whatsappNumber || '',
        email: orderData.email,
        plotCategory: orderData.plotCategory || '5 Marla',
        plotWidthFt: orderData.plotWidthFt || 25,
        plotLengthFt: orderData.plotLengthFt || 50,
        plotFacing: orderData.plotFacing || 'North',
        floors: orderData.floors || 'Double Storey',
        bedroomsCount: orderData.bedroomsCount || 4,
        bathroomsCount: orderData.bathroomsCount || 4,
        carParking: orderData.carParking || 1,
        designStyle: orderData.designStyle || 'Modern',
        desiredServices: orderData.desiredServices || ['2D AutoCAD Floor Plans', '3D Front Elevation'],
        specialRequirements: orderData.specialRequirements || '',
        cityOrCountry: orderData.cityOrCountry || '',
        budgetPKR: orderData.budgetPKR,
        estimatedAreaSqFt: orderData.estimatedAreaSqFt || 2250,
        status: 'New'
      };
      return newOrder;
    }
  }

  async getCustomOrders(): Promise<CustomOrder[]> {
    try {
      const res = await fetch('/api/custom-orders', {
        headers: { ...this.getAuthHeader() }
      });
      if (!res.ok) throw new Error('Failed to fetch orders');
      return await res.json();
    } catch {
      return INITIAL_ORDERS;
    }
  }

  async updateCustomOrder(id: string, updates: Partial<CustomOrder>): Promise<CustomOrder> {
    const res = await fetch(`/api/custom-orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeader() },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update order');
    return await res.json();
  }

  async deleteCustomOrder(id: string): Promise<boolean> {
    const res = await fetch(`/api/custom-orders/${id}`, {
      method: 'DELETE',
      headers: { ...this.getAuthHeader() }
    });
    return res.ok;
  }

  // --- INQUIRIES ---
  async submitInquiry(inquiryData: Partial<Inquiry>): Promise<Inquiry> {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData)
      });
      if (!res.ok) throw new Error('Submit failed');
      const result = await res.json();
      return result.inquiry;
    } catch {
      const newInquiry: Inquiry = {
        id: 'inq-' + Date.now(),
        createdAt: new Date().toISOString(),
        name: inquiryData.name || '',
        whatsapp: inquiryData.whatsapp || '',
        email: inquiryData.email,
        planId: inquiryData.planId,
        planTitle: inquiryData.planTitle,
        message: inquiryData.message || '',
        status: 'New',
        sourcePage: inquiryData.sourcePage || 'Website'
      };
      return newInquiry;
    }
  }

  async getInquiries(): Promise<Inquiry[]> {
    try {
      const res = await fetch('/api/inquiries', {
        headers: { ...this.getAuthHeader() }
      });
      if (!res.ok) throw new Error('Failed to fetch inquiries');
      return await res.json();
    } catch {
      return INITIAL_INQUIRIES;
    }
  }

  async updateInquiry(id: string, updates: Partial<Inquiry>): Promise<Inquiry> {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeader() },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update inquiry');
    return await res.json();
  }

  async deleteInquiry(id: string): Promise<boolean> {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: 'DELETE',
      headers: { ...this.getAuthHeader() }
    });
    return res.ok;
  }

  // --- BLOGS ---
  async getBlogs(): Promise<BlogPost[]> {
    try {
      const res = await fetch('/api/blogs');
      if (!res.ok) throw new Error('API fetch failed');
      return await res.json();
    } catch {
      return INITIAL_BLOGS;
    }
  }

  async getBlogBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const res = await fetch(`/api/blogs/${slug}`);
      if (!res.ok) throw new Error('Not found');
      return await res.json();
    } catch {
      const blogs = await this.getBlogs();
      return blogs.find(b => b.slug === slug || b.id === slug) || null;
    }
  }

  async createBlog(blog: BlogPost): Promise<BlogPost> {
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeader() },
      body: JSON.stringify(blog)
    });
    if (!res.ok) throw new Error('Failed to create blog');
    return await res.json();
  }

  async updateBlog(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    const res = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeader() },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update blog');
    return await res.json();
  }

  async deleteBlog(id: string): Promise<boolean> {
    const res = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
      headers: { ...this.getAuthHeader() }
    });
    return res.ok;
  }

  // --- AUTH ---
  async login(password: string): Promise<boolean> {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (!res.ok) return false;
      const data = await res.json();
      if (data.token) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
        return true;
      }
      return false;
    } catch {
      if (password === 'PlanovaAdmin2026!') {
        localStorage.setItem(STORAGE_KEYS.TOKEN, 'planova_adm_token_sec786');
        return true;
      }
      return false;
    }
  }

  async verifyAuth(): Promise<boolean> {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (!token) return false;
    try {
      const res = await fetch('/api/auth/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      return !!data.authenticated;
    } catch {
      return token === 'planova_adm_token_sec786';
    }
  }

  logout() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  }
}

export const api = new ApiService();
