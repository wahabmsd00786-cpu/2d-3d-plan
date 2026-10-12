# Planova House Plans – Deployment & Custom Domain Guide

This document provides complete instructions to deploy the **Planova House Plans** website to public hosting providers (Google Cloud Run, Render, Railway, VPS, Vercel, Netlify) and configure a custom domain (e.g. `planovahouseplans.com`).

---

## 1. Quick Overview

- **Stack**: Full-stack Node.js Express server + Vite React 19 SPA with Tailwind CSS v4.
- **Port**: Configurable via `PORT` (defaults to 3000).
- **Database**: Atomic JSON file store in `data/database.json` (auto-created on first run).
- **Admin Password**: Configured via `ADMIN_PASSWORD` (default: `PlanovaAdmin2026!`).

---

## 2. Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Server Port (default: 3000)
PORT=3000

# Node Environment
NODE_ENV=production

# Public canonical URL for your custom domain (used for SEO canonical tags, sitemap.xml, robots.txt)
APP_URL=https://planovahouseplans.com

# Admin Dashboard master password
ADMIN_PASSWORD=PlanovaAdmin2026!
```

---

## 3. Deployment Options

### Option A: Cloud Run / Render / Railway / Docker (Recommended for Full-Stack)

1. **Build the production client assets**:
   ```bash
   npm install
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm start
   ```
   The Express server serves the REST API routes (`/api/*`), sitemap generator (`/sitemap.xml`), and the static files from the `dist/` directory.

3. **Dockerfile** (if deploying via Docker/Container):
   ```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

---

### Option B: Vercel or Netlify (Static Hosting)

The frontend features automatic local caching and client-side fallbacks for standalone static hosting:

1. Connect your GitHub repository to Vercel or Netlify.
2. Set Build Command: `npm run build`
3. Set Output Directory: `dist`
4. For single-page application routing, ensure redirects rewrite `/*` to `/index.html`:
   - **Vercel**: Included in `vercel.json`
   - **Netlify**: Add `/* /index.html 200` in `public/_redirects`

---

## 4. Custom Domain DNS Setup

To link your custom domain (e.g., `planovahouseplans.com`):

1. Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, Google Domains).
2. Add the following DNS Records:
   - **A Record**:
     - Host: `@`
     - Value: `<Your Server IP / Cloud Run or Render IP>`
     - TTL: Auto
   - **CNAME Record**:
     - Host: `www`
     - Value: `planovahouseplans.com`
     - TTL: Auto
3. Enable SSL / HTTPS. Services like Cloudflare, Render, and Railway issue free SSL certificates automatically.

---

## 5. Google Search Console & SEO Verification

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add your property (e.g., `https://planovahouseplans.com`).
3. Submit the sitemap URL: `https://planovahouseplans.com/sitemap.xml`.
4. Robots file is verified at: `https://planovahouseplans.com/robots.txt`.
5. Schema.org structured data for `ArchitecturalService` and `Product` is already embedded.

---

## 6. Admin Dashboard Access

- **URL**: `https://planovahouseplans.com/admin`
- **Default Password**: `PlanovaAdmin2026!`
- **Capabilities**:
  - Add, edit, or delete house plans.
  - Update WhatsApp contact number across the entire site with 1 click.
  - Review customer inquiries and open direct WhatsApp chats with leads.
  - Manage custom plot design orders (dimensions, bedrooms, budget).
