import React, { useState } from 'react';
import { BlogPost, SiteSettings } from '../types';
import { SEOHead } from '../components/SEOHead';
import { BookOpen, ArrowRight, User, Calendar, Clock, Tag } from 'lucide-react';

interface BlogPageProps {
  blogs: BlogPost[];
  onSelectBlog: (blog: BlogPost) => void;
  onNavigate: (path: string) => void;
}

export function BlogPage({ blogs, onSelectBlog, onNavigate }: BlogPageProps) {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [search, setSearch] = useState('');

  const allTags = ['All', ...Array.from(new Set(blogs.flatMap(b => b.tags)))];

  const filteredBlogs = blogs.filter(b => {
    if (selectedTag !== 'All' && !b.tags.includes(selectedTag)) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <SEOHead
        title="House Construction & Architectural Blog – Planova House Plans"
        description="Comprehensive guides on 5 Marla house construction costs in 2026, AutoCAD floor plan mistakes, Spanish vs modern elevations, and building bylaws."
        keywords="house construction cost 2026, 5 Marla cost Pakistan, AutoCAD floor plan guide, 3D house design blog"
        canonicalPath="/blog"
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181D26] border border-[#272F40] text-xs font-mono-cad text-[#C5A059]">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Architectural Knowledge Base</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
          House Construction Costs & Architectural Guides
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed font-light">
          Engineering insights, 2026 material price breakdowns, AutoCAD drafting tips, and elevation guides straight from certified architects.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#121620] border border-[#212738]">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-cad whitespace-nowrap transition-colors ${
                selectedTag === t
                  ? 'bg-[#C5A059] text-black font-semibold'
                  : 'bg-[#181C26] text-slate-300 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full px-3 py-1.5 bg-[#0C0F14] border border-[#242A38] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A059]"
          />
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
          <article
            key={blog.id}
            onClick={() => onSelectBlog(blog)}
            className="rounded-2xl bg-[#121620] border border-[#212736] overflow-hidden hover:border-[#C5A059]/60 transition-all cursor-pointer group flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono-cad text-[#D4AF37]">
                  {blog.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-[11px] font-mono-cad text-slate-400 mb-2.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#C5A059]" />
                    {blog.publishDate}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#C5A059]" />
                    {blog.readTime}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#C5A059] transition-colors leading-snug">
                  {blog.title}
                </h3>

                <p className="text-xs text-slate-400 mt-2.5 line-clamp-3 leading-relaxed font-light">
                  {blog.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-[#1C212E] mt-4 flex items-center justify-between text-xs font-mono-cad text-[#C5A059]">
              <span className="text-slate-400">{blog.author.split(',')[0]}</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
