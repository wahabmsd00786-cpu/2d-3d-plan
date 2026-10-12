/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SearchModal } from './components/SearchModal';
import { InquiryModal } from './components/InquiryModal';

// Pages
import { Home } from './pages/Home';
import { CategoryPage } from './pages/CategoryPage';
import { CustomOrderPage } from './pages/CustomOrderPage';
import { PlanDetailPage } from './pages/PlanDetailPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { LegalPages } from './pages/LegalPages';

// Types & API
import { HousePlan, SiteSettings, BlogPost } from './types';
import { api } from './services/api';
import { INITIAL_PLANS, INITIAL_SETTINGS, INITIAL_BLOGS } from './data/initialData';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname || '/' : '/'
  );
  const [plans, setPlans] = useState<HousePlan[]>(INITIAL_PLANS);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [selectedPlan, setSelectedPlan] = useState<HousePlan | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryTargetPlan, setInquiryTargetPlan] = useState<HousePlan | null>(null);

  // Sync state with URL
  const refreshAppData = async () => {
    try {
      const [fetchedPlans, fetchedSettings, fetchedBlogs] = await Promise.all([
        api.getPlans(),
        api.getSettings(),
        api.getBlogs()
      ]);
      setPlans(fetchedPlans);
      setSettings(fetchedSettings);
      setBlogs(fetchedBlogs);
    } catch (e) {
      console.warn('Using local cached architectural data', e);
    }
  };

  useEffect(() => {
    refreshAppData();
  }, []);

  // Listen to browser popstate (back / forward button support)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
      resolveRoute(path);
    };

    window.addEventListener('popstate', handlePopState);
    resolveRoute(currentPath);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const resolveRoute = (path: string) => {
    if (path.startsWith('/plan/')) {
      const slug = path.replace('/plan/', '');
      const plan = plans.find(p => p.slug === slug || p.id === slug);
      if (plan) setSelectedPlan(plan);
    } else if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      const blog = blogs.find(b => b.slug === slug || b.id === slug);
      if (blog) setSelectedBlog(blog);
    }
  };

  const navigateTo = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      resolveRoute(path);
    }
  };

  const handleSelectPlan = (plan: HousePlan) => {
    setSelectedPlan(plan);
    navigateTo(`/plan/${plan.slug}`);
  };

  const handleSelectBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
    navigateTo(`/blog/${blog.slug}`);
  };

  const handleOpenInquiry = (plan?: HousePlan) => {
    setInquiryTargetPlan(plan || null);
    setIsInquiryModalOpen(true);
  };

  // Render correct page view
  const renderCurrentPage = () => {
    // 1. House Plan Detail Route
    if (currentPath.startsWith('/plan/')) {
      const slug = currentPath.replace('/plan/', '');
      const plan = selectedPlan || plans.find(p => p.slug === slug || p.id === slug) || plans[0];
      return (
        <PlanDetailPage
          plan={plan}
          allPlans={plans}
          settings={settings}
          onNavigate={navigateTo}
          onSelectPlan={handleSelectPlan}
          onOpenInquiry={handleOpenInquiry}
        />
      );
    }

    // 2. Individual Blog Post Route
    if (currentPath.startsWith('/blog/') && currentPath !== '/blog') {
      const slug = currentPath.replace('/blog/', '');
      const blog = selectedBlog || blogs.find(b => b.slug === slug || b.id === slug) || blogs[0];
      return (
        <BlogPostPage
          blog={blog}
          allBlogs={blogs}
          settings={settings}
          onNavigate={navigateTo}
          onSelectBlog={handleSelectBlog}
        />
      );
    }

    // 3. Category & Architectural Pages
    switch (currentPath) {
      case '/autocad-plans':
      case '/3d-designs':
      case '/5-marla-plans':
      case '/10-marla-plans':
      case '/1-kanal-plans':
      case '/double-storey-plans':
      case '/floor-plans-gallery':
      case '/interior-design':
      case '/exterior-design':
        return (
          <CategoryPage
            pageType={currentPath.replace('/', '') as any}
            plans={plans}
            settings={settings}
            onSelectPlan={handleSelectPlan}
            onNavigate={navigateTo}
            onOpenInquiry={handleOpenInquiry}
          />
        );

      case '/custom-order':
        return (
          <CustomOrderPage
            settings={settings}
            onNavigate={navigateTo}
          />
        );

      case '/about':
        return (
          <AboutUsPage
            settings={settings}
            onNavigate={navigateTo}
          />
        );

      case '/contact':
        return (
          <ContactUsPage
            settings={settings}
            onNavigate={navigateTo}
          />
        );

      case '/blog':
        return (
          <BlogPage
            blogs={blogs}
            onSelectBlog={handleSelectBlog}
            onNavigate={navigateTo}
          />
        );

      case '/admin':
        return (
          <AdminDashboard
            plans={plans}
            settings={settings}
            onRefreshData={refreshAppData}
            onNavigate={navigateTo}
          />
        );

      case '/privacy-policy':
        return <LegalPages type="privacy" onNavigate={navigateTo} />;

      case '/terms-and-conditions':
        return <LegalPages type="terms" onNavigate={navigateTo} />;

      case '/':
      default:
        return (
          <Home
            plans={plans}
            settings={settings}
            blogs={blogs}
            onSelectPlan={handleSelectPlan}
            onNavigate={navigateTo}
            onOpenInquiry={handleOpenInquiry}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0F12] text-[#F3F4F6]">
      {/* Navigation Bar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        settings={settings}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        settings={settings}
      />

      {/* Floating WhatsApp Contact Widget */}
      <FloatingWhatsApp
        whatsappNumber={settings.whatsappNumber}
      />

      {/* Global Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        plans={plans}
        onSelectPlan={handleSelectPlan}
        onNavigate={navigateTo}
      />

      {/* Global Plan Inquiry Modal */}
      <InquiryModal
        plan={inquiryTargetPlan}
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        settings={settings}
        sourcePage={currentPath}
      />
    </div>
  );
}
