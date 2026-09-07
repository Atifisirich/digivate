import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS, formatPostDate } from '../config/blog';
import { PAGE_SEO } from '../config/seo';
import { PageBreadcrumb, Seo } from '../components/Seo';

export const BlogPage: React.FC = () => (
  <div className="pt-24 pb-20">
    <Seo page={PAGE_SEO.blog} />
    <section className="py-16 sm:py-20 bg-white border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-5">
          {PAGE_SEO.blog.breadcrumbs ? <PageBreadcrumb items={PAGE_SEO.blog.breadcrumbs} /> : null}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider">
            <span>Writing</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0f131a] font-display tracking-tight leading-tight">
            Blog
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed">
            Practical notes from Digivate on converting websites, AI workflows and CRM, SEO and ads, and whether to build a website or an app first.
          </p>
        </div>
      </div>
    </section>

    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group rounded-3xl border border-black/[0.08] bg-white p-7 sm:p-8 hover:border-blue-600/40 hover:shadow-lg transition-all flex flex-col"
            >
              <div className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
                <span>{post.category}</span>
                <span className="text-zinc-300">·</span>
                <span className="text-zinc-500">{post.readMinutes} min read</span>
              </div>
              <h2 className="mt-4 text-2xl font-display font-bold tracking-tight text-[#0f131a] group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed flex-grow">
                {post.description}
              </p>
              <div className="mt-6 flex items-center justify-between text-sm font-semibold">
                <span className="text-zinc-500">{formatPostDate(post.date)}</span>
                <span className="inline-flex items-center gap-1.5 text-blue-600">
                  Read
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </div>
);
