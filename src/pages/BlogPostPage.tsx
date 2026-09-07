import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { BLOG_POSTS, formatPostDate, getPostBySlug } from '../config/blog';
import { blogPostSeo } from '../config/seo';
import { PageBreadcrumb, Seo } from '../components/Seo';
import { NotFoundPage } from './NotFoundPage';

interface BlogPostPageProps {
  onOpenBooking: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ onOpenBooking }) => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <NotFoundPage />;

  const seo = blogPostSeo(post);
  const related = BLOG_POSTS.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <div className="pt-24 pb-20">
      <Seo page={seo} />
      <article>
        <section className="py-16 sm:py-20 bg-white border-b border-black/[0.06]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
            {seo.breadcrumbs ? <PageBreadcrumb items={seo.breadcrumbs} /> : null}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
              <span>{post.category}</span>
              <span className="text-zinc-300">·</span>
              <span className="text-zinc-500">{formatPostDate(post.date)}</span>
              <span className="text-zinc-300">·</span>
              <span className="text-zinc-500">{post.readMinutes} min read</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0f131a] font-display tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed">
              {post.description}
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {post.sections.map((section, index) => (
              <div key={`${post.slug}-${index}`} className="space-y-3">
                {section.heading ? (
                  <h2 className="text-2xl font-display font-bold tracking-tight text-[#0f131a]">
                    {section.heading}
                  </h2>
                ) : null}
                <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">{section.body}</p>
              </div>
            ))}

            <div className="rounded-3xl bg-[#0f131a] text-white p-7 sm:p-8 space-y-4">
              <h2 className="text-2xl font-display font-bold tracking-tight">Want this built for your business?</h2>
              <p className="text-zinc-300 leading-relaxed">
                Digivate plans websites, apps, AI workflows, and marketing as one system. Book a call and we’ll tell you the first move.
              </p>
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-white text-[#0f131a] hover:bg-blue-500 hover:text-white font-bold text-sm transition-all"
              >
                <Calendar className="w-4 h-4" />
                Book an appointment
              </button>
            </div>
          </div>
        </section>
      </article>

      {related.length ? (
        <section className="pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
            <h2 className="text-xl font-display font-bold tracking-tight text-[#0f131a]">More from the blog</h2>
            <ul className="space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/blog/${item.slug}`}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-black/[0.08] bg-white px-5 py-4 hover:border-blue-600/40 transition-colors"
                  >
                    <span className="font-semibold text-[#0f131a]">{item.title}</span>
                    <ArrowRight className="w-4 h-4 text-blue-600 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </div>
  );
};
