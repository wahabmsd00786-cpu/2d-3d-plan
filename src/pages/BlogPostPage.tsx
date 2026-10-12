import React from 'react';
import { BlogPost, SiteSettings } from '../types';
import { SEOHead } from '../components/SEOHead';
import { ArrowLeft, Calendar, Clock, User, MessageSquare, Share2, Sparkles } from 'lucide-react';

interface BlogPostPageProps {
  blog: BlogPost;
  allBlogs: BlogPost[];
  settings: SiteSettings;
  onNavigate: (path: string) => void;
  onSelectBlog: (blog: BlogPost) => void;
}

export function BlogPostPage({
  blog,
  allBlogs,
  settings,
  onNavigate,
  onSelectBlog
}: BlogPostPageProps) {
  const cleanPhone = settings.whatsappNumber.replace(/[^0-9+]/g, '').replace('+', '');
  const whatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Salam Planova Team, I just read your article "${blog.title}" and would like to ask some questions regarding house design.`
  )}`;

  const related = allBlogs.filter(b => b.id !== blog.id).slice(0, 2);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <SEOHead
        title={`${blog.title} – Planova Architectural Blog`}
        description={blog.excerpt}
        keywords={blog.tags.join(', ')}
        canonicalPath={`/blog/${blog.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": blog.title,
          "image": blog.coverImage,
          "datePublished": blog.publishDate,
          "author": {
            "@type": "Person",
            "name": blog.author
          },
          "description": blog.excerpt
        }}
      />

      {/* Back button */}
      <button
        onClick={() => onNavigate('/blog')}
        className="inline-flex items-center gap-2 text-xs font-mono-cad text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Architectural Guides</span>
      </button>

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono-cad text-[#C5A059]">
          <span>{blog.category}</span>
          <span>·</span>
          <span>{blog.readTime}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          {blog.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono-cad text-slate-400 border-y border-[#202636] py-3">
          <span className="flex items-center gap-1.5 text-slate-300">
            <User className="w-3.5 h-3.5 text-[#C5A059]" />
            {blog.author}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
            {blog.publishDate}
          </span>
        </div>
      </header>

      {/* Cover Image */}
      <div className="rounded-2xl overflow-hidden border border-[#242B3A] aspect-[16/9] shadow-2xl">
        <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="prose prose-invert max-w-none text-slate-300 font-light leading-relaxed space-y-4 text-sm sm:text-base">
        {blog.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="font-heading text-xl sm:text-2xl font-bold text-white pt-4">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('- ')) {
            return (
              <ul key={idx} className="list-disc pl-5 space-y-1.5 text-slate-300">
                {paragraph.split('\n').map((li, lIdx) => (
                  <li key={lIdx}>{li.replace('- ', '')}</li>
                ))}
              </ul>
            );
          }
          if (paragraph.match(/^\d+\.\s/)) {
            return (
              <ol key={idx} className="list-decimal pl-5 space-y-1.5 text-slate-300">
                {paragraph.split('\n').map((li, lIdx) => (
                  <li key={lIdx}>{li.replace(/^\d+\.\s/, '')}</li>
                ))}
              </ol>
            );
          }
          return (
            <p key={idx} className="text-slate-300 leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Tags */}
      <div className="pt-6 border-t border-[#202636] flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono-cad text-slate-500 mr-2">Tags:</span>
        {blog.tags.map((t, idx) => (
          <span key={idx} className="px-3 py-1 rounded-lg bg-[#141822] border border-[#252C3D] text-xs font-mono-cad text-slate-300">
            #{t}
          </span>
        ))}
      </div>

      {/* WhatsApp Consultation Banner */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-[#171D27] to-[#121620] border border-[#283142] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="font-heading text-xl font-bold text-white">
            Need Expert Architectural Guidance for Your Plot?
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Send your plot size to our senior architects for an immediate review.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-[#25D366] text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 fill-black" />
            <span>Chat on WhatsApp</span>
          </a>
          <button
            onClick={() => onNavigate('/custom-order')}
            className="px-5 py-3 rounded-xl bg-[#C5A059] text-black font-semibold text-xs tracking-wider uppercase"
          >
            Order Custom Plan
          </button>
        </div>
      </div>

      {/* Related Blogs */}
      {related.length > 0 && (
        <div className="pt-8 border-t border-[#202636] space-y-4">
          <h3 className="font-heading text-xl font-bold text-white">Related Architectural Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectBlog(rel)}
                className="p-4 rounded-xl bg-[#121620] border border-[#212738] hover:border-[#C5A059] cursor-pointer transition-colors"
              >
                <div className="text-[11px] font-mono-cad text-[#C5A059] mb-1">{rel.category}</div>
                <h4 className="font-heading text-sm font-bold text-white">{rel.title}</h4>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
