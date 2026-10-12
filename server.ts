import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_PLANS, INITIAL_BLOGS, INITIAL_SETTINGS, INITIAL_ORDERS, INITIAL_INQUIRIES } from './src/data/initialData.ts';
import { HousePlan, BlogPost, SiteSettings, CustomOrder, Inquiry } from './src/types/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Persistent file database path
const DATA_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

interface DatabaseSchema {
  plans: HousePlan[];
  blogs: BlogPost[];
  settings: SiteSettings;
  orders: CustomOrder[];
  inquiries: Inquiry[];
  adminToken: string;
}

const DEFAULT_ADMIN_TOKEN = 'planova_adm_token_sec786';

function initDatabase(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const data = JSON.parse(raw);
      // Ensure all arrays exist
      return {
        plans: data.plans || INITIAL_PLANS,
        blogs: data.blogs || INITIAL_BLOGS,
        settings: data.settings || INITIAL_SETTINGS,
        orders: data.orders || INITIAL_ORDERS,
        inquiries: data.inquiries || INITIAL_INQUIRIES,
        adminToken: data.adminToken || DEFAULT_ADMIN_TOKEN
      };
    } catch (e) {
      console.error('Error reading db.json, reinitializing:', e);
    }
  }

  const initialDb: DatabaseSchema = {
    plans: INITIAL_PLANS,
    blogs: INITIAL_BLOGS,
    settings: INITIAL_SETTINGS,
    orders: INITIAL_ORDERS,
    inquiries: INITIAL_INQUIRIES,
    adminToken: DEFAULT_ADMIN_TOKEN
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
  return initialDb;
}

let db = initDatabase();

function saveDatabase() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write db file:', err);
  }
}

// Admin Auth Middleware
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'PlanovaAdmin2026!';

function verifyAdmin(req: Request, res: Response, next: () => void) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. Admin credentials required.' });
  }
  const token = authHeader.split(' ')[1];
  if (token !== db.adminToken && token !== DEFAULT_ADMIN_TOKEN) {
    return res.status(403).json({ error: 'Invalid or expired admin session token.' });
  }
  next();
}

// ======================== API ROUTES ======================== //

// --- Auth Routes ---
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }
  if (password === ADMIN_PASSWORD) {
    return res.json({
      success: true,
      token: db.adminToken,
      user: { role: 'admin', email: db.settings.email }
    });
  }
  return res.status(401).json({ error: 'Invalid admin password' });
});

app.get('/api/auth/verify', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.json({ authenticated: false });
  }
  const token = authHeader.split(' ')[1];
  if (token === db.adminToken || token === DEFAULT_ADMIN_TOKEN) {
    return res.json({ authenticated: true, user: { role: 'admin', email: db.settings.email } });
  }
  return res.json({ authenticated: false });
});

// --- Settings Routes ---
app.get('/api/settings', (_req: Request, res: Response) => {
  res.json(db.settings);
});

app.put('/api/settings', verifyAdmin, (req: Request, res: Response) => {
  db.settings = { ...db.settings, ...req.body };
  saveDatabase();
  res.json({ success: true, settings: db.settings });
});

// --- Plans Routes ---
app.get('/api/plans', (req: Request, res: Response) => {
  const { category, style, bedrooms, floors, search } = req.query;
  let results = [...db.plans];

  if (category && typeof category === 'string' && category !== 'All') {
    results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  if (style && typeof style === 'string' && style !== 'All') {
    results = results.filter(p => p.style.toLowerCase() === style.toLowerCase());
  }
  if (bedrooms && typeof bedrooms === 'string' && bedrooms !== 'All') {
    const beds = parseInt(bedrooms);
    if (!isNaN(beds)) {
      results = results.filter(p => p.bedrooms >= beds);
    }
  }
  if (floors && typeof floors === 'string' && floors !== 'All') {
    const f = parseInt(floors);
    if (!isNaN(f)) {
      results = results.filter(p => p.floorsCount === f);
    }
  }
  if (search && typeof search === 'string') {
    const q = search.toLowerCase().trim();
    results = results.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.plotSizeLabel.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.style.toLowerCase().includes(q) ||
      p.keyFeatures.some(f => f.toLowerCase().includes(q))
    );
  }

  res.json(results);
});

app.get('/api/plans/:idOrSlug', (req: Request, res: Response) => {
  const { idOrSlug } = req.params;
  const plan = db.plans.find(p => p.id === idOrSlug || p.slug === idOrSlug);
  if (!plan) {
    return res.status(404).json({ error: 'Plan not found' });
  }
  // increment view counter
  plan.viewsCount = (plan.viewsCount || 0) + 1;
  saveDatabase();
  res.json(plan);
});

app.post('/api/plans', verifyAdmin, (req: Request, res: Response) => {
  const planData: HousePlan = req.body;
  if (!planData.title || !planData.category) {
    return res.status(400).json({ error: 'Title and category are required' });
  }
  if (!planData.id) {
    planData.id = 'plan-' + Date.now();
  }
  if (!planData.slug) {
    planData.slug = planData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
  if (!planData.createdAt) {
    planData.createdAt = new Date().toISOString().split('T')[0];
  }
  db.plans.unshift(planData);
  saveDatabase();
  res.status(201).json(planData);
});

app.put('/api/plans/:id', verifyAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = db.plans.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Plan not found' });
  }
  db.plans[index] = { ...db.plans[index], ...req.body, id };
  saveDatabase();
  res.json(db.plans[index]);
});

app.delete('/api/plans/:id', verifyAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = db.plans.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Plan not found' });
  }
  const deleted = db.plans.splice(index, 1);
  saveDatabase();
  res.json({ success: true, deleted: deleted[0] });
});

// --- Inquiries Routes ---
app.get('/api/inquiries', verifyAdmin, (_req: Request, res: Response) => {
  res.json(db.inquiries);
});

app.post('/api/inquiries', (req: Request, res: Response) => {
  const { name, whatsapp, message, planId, planTitle, sourcePage } = req.body;
  if (!name || !whatsapp) {
    return res.status(400).json({ error: 'Name and WhatsApp number are required' });
  }
  const newInquiry: Inquiry = {
    id: 'inq-' + Date.now(),
    createdAt: new Date().toISOString(),
    name,
    whatsapp,
    email: req.body.email || '',
    planId,
    planTitle,
    message: message || 'Interested in this plan details.',
    status: 'New',
    sourcePage: sourcePage || 'Website'
  };
  db.inquiries.unshift(newInquiry);
  saveDatabase();
  res.status(201).json({ success: true, inquiry: newInquiry });
});

app.patch('/api/inquiries/:id', verifyAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const inquiry = db.inquiries.find(i => i.id === id);
  if (!inquiry) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }
  if (req.body.status) inquiry.status = req.body.status;
  if (req.body.adminNotes !== undefined) inquiry.adminNotes = req.body.adminNotes;
  saveDatabase();
  res.json(inquiry);
});

app.delete('/api/inquiries/:id', verifyAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = db.inquiries.findIndex(i => i.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }
  db.inquiries.splice(idx, 1);
  saveDatabase();
  res.json({ success: true });
});

// --- Custom Orders Routes ---
app.get('/api/custom-orders', verifyAdmin, (_req: Request, res: Response) => {
  res.json(db.orders);
});

app.post('/api/custom-orders', (req: Request, res: Response) => {
  const data = req.body;
  if (!data.customerName || !data.whatsappNumber) {
    return res.status(400).json({ error: 'Customer Name and WhatsApp Number are required' });
  }
  const newOrder: CustomOrder = {
    id: 'ord-' + Date.now(),
    createdAt: new Date().toISOString(),
    customerName: data.customerName,
    whatsappNumber: data.whatsappNumber,
    email: data.email || '',
    plotCategory: data.plotCategory || '5 Marla',
    plotWidthFt: Number(data.plotWidthFt) || 25,
    plotLengthFt: Number(data.plotLengthFt) || 50,
    plotFacing: data.plotFacing || 'North',
    floors: data.floors || 'Double Storey',
    bedroomsCount: Number(data.bedroomsCount) || 4,
    bathroomsCount: Number(data.bathroomsCount) || 4,
    carParking: Number(data.carParking) || 1,
    designStyle: data.designStyle || 'Modern',
    desiredServices: data.desiredServices || ['2D AutoCAD Floor Plans', '3D Front Elevation'],
    specialRequirements: data.specialRequirements || 'Standard modern residential layout.',
    cityOrCountry: data.cityOrCountry || '',
    budgetPKR: data.budgetPKR || '',
    estimatedAreaSqFt: Number(data.estimatedAreaSqFt) || (Number(data.plotWidthFt) * Number(data.plotLengthFt) * 1.8),
    status: 'New'
  };
  db.orders.unshift(newOrder);
  saveDatabase();
  res.status(201).json({ success: true, order: newOrder });
});

app.patch('/api/custom-orders/:id', verifyAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const order = db.orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: 'Custom order not found' });
  }
  if (req.body.status) order.status = req.body.status;
  if (req.body.adminNotes !== undefined) order.adminNotes = req.body.adminNotes;
  saveDatabase();
  res.json(order);
});

app.delete('/api/custom-orders/:id', verifyAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = db.orders.findIndex(o => o.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }
  db.orders.splice(idx, 1);
  saveDatabase();
  res.json({ success: true });
});

// --- Blog Routes ---
app.get('/api/blogs', (_req: Request, res: Response) => {
  res.json(db.blogs);
});

app.get('/api/blogs/:idOrSlug', (req: Request, res: Response) => {
  const { idOrSlug } = req.params;
  const blog = db.blogs.find(b => b.id === idOrSlug || b.slug === idOrSlug);
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  res.json(blog);
});

app.post('/api/blogs', verifyAdmin, (req: Request, res: Response) => {
  const blogData: BlogPost = req.body;
  if (!blogData.title || !blogData.content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  if (!blogData.id) blogData.id = 'blog-' + Date.now();
  if (!blogData.slug) blogData.slug = blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  if (!blogData.publishDate) blogData.publishDate = new Date().toISOString().split('T')[0];
  db.blogs.unshift(blogData);
  saveDatabase();
  res.status(201).json(blogData);
});

app.put('/api/blogs/:id', verifyAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = db.blogs.findIndex(b => b.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Blog post not found' });
  }
  db.blogs[idx] = { ...db.blogs[idx], ...req.body, id };
  saveDatabase();
  res.json(db.blogs[idx]);
});

app.delete('/api/blogs/:id', verifyAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = db.blogs.findIndex(b => b.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Blog post not found' });
  }
  db.blogs.splice(idx, 1);
  saveDatabase();
  res.json({ success: true });
});

// --- SEO: Robots.txt & Sitemap.xml ---
app.get('/robots.txt', (_req: Request, res: Response) => {
  const baseUrl = process.env.APP_URL || 'https://planovahouseplans.com';
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;
  res.type('text/plain').send(robots);
});

app.get('/sitemap.xml', (_req: Request, res: Response) => {
  const baseUrl = process.env.APP_URL || 'https://planovahouseplans.com';
  const staticPages = [
    '',
    '/autocad-plans',
    '/3d-designs',
    '/5-marla-plans',
    '/10-marla-plans',
    '/1-kanal-plans',
    '/double-storey-plans',
    '/floor-plans-gallery',
    '/interior-design',
    '/exterior-design',
    '/custom-order',
    '/about',
    '/contact',
    '/blog',
    '/privacy-policy',
    '/terms-and-conditions'
  ];

  const planUrls = db.plans.map(p => `/plan/${p.slug}`);
  const blogUrls = db.blogs.map(b => `/blog/${b.slug}`);

  const allUrls = [...staticPages, ...planUrls, ...blogUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    url => `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${url === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${url === '' ? '1.0' : url.startsWith('/plan') ? '0.9' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.type('application/xml').send(xml);
});

// --- Dev vs Production Setup ---
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Planova House Plans server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
