import React, { useState } from 'react';
import { BLOG_POSTS } from '../config/siteConfig';
import { BlogPost } from '../types';
import { Search, Sparkles, Clock, ArrowRight, Share2, Copy, Check } from 'lucide-react';

interface BlogPageProps {
  onOpenTrialModal: (source?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenTrialModal }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [copied, setCopied] = useState(false);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchCat = category === 'all' || post.category === category;
    const matchSearch =
      search.trim() === '' ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden text-right">
      {/* Blog Article Detail View */}
      {selectedPost ? (
        <div className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <button
              onClick={() => setSelectedPost(null)}
              className="text-xs font-bold text-[#118F86] hover:underline mb-6 flex items-center gap-1"
            >
              <ArrowRight size={14} />
              <span>رجوع لقائمة المقالات</span>
            </button>

            <div className="space-y-4 mb-8 pb-6 border-b border-slate-200">
              <span className="text-xs font-bold text-[#118F86] bg-[#E8F5F4] px-2.5 py-1 rounded-full inline-block">
                {selectedPost.category === 'for-parents' ? 'للأهل' : 'محادثة وتطوير اللغة'}
              </span>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#16344B] leading-tight">
                {selectedPost.title}
              </h1>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={13} />
                  <span>{selectedPost.readTimeMinutes} دقائق قراءة</span>
                </span>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-6 text-sm text-[#16344B] leading-relaxed mb-10">
              {selectedPost.sections.map((sec, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#16344B]">{sec.heading}</h3>
                  <p className="text-[#566974] leading-relaxed">{sec.body}</p>
                </div>
              ))}
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 mb-8">
              <span className="text-xs font-bold text-slate-700">مشاركة المقال مع الأصدقاء:</span>
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center gap-1"
                >
                  {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  <span>{copied ? 'تم نسخ الرابط' : 'نسخ الرابط'}</span>
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(selectedPost.title + ' ' + window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 flex items-center gap-1"
                >
                  <span>واتساب</span>
                </a>
              </div>
            </div>

            {/* In-article CTA */}
            <div className="bg-[#E8F5F4] p-6 rounded-2xl border border-[#118F86]/20 text-center space-y-3">
              <h4 className="font-bold text-base text-[#16344B]">
                الحصة الفردية 25 دقيقة بتعطي طفلك مساحة آمنة ليحكي بدون خوف
              </h4>
              <p className="text-xs text-[#566974] max-w-md mx-auto">
                جرّبوا طريقة الشرح وتعرّفوا على المدرس بحصة تجريبية مجانية كاملة.
              </p>
              <button
                onClick={() => onOpenTrialModal(`blog-post-${selectedPost.slug}`)}
                className="px-6 py-2.5 bg-[#118F86] hover:bg-[#0E736C] text-white text-xs font-bold rounded-xl"
              >
                {selectedPost.relatedCta}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Blog Index */
        <div>
          <section className="pt-12 pb-14 bg-[#F7F9F6] border-b border-slate-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5F4] text-[#118F86] text-xs font-bold">
                <Sparkles size={14} />
                <span>أفكار وتجارب عملية</span>
              </span>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#16344B]">
                مساحة صغيرة لأفكار تساعدك تتعلّم
              </h1>

              <p className="text-sm sm:text-base text-[#566974] max-w-xl mx-auto leading-relaxed">
                نصائح للأهالي والشباب عن المحادثة، الثقة، وتطوير اللغة في الحياة اليومية بدون تعقيد.
              </p>

              {/* Search & Filter */}
              <div className="pt-4 max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="دوّر على موضوع..."
                    className="w-full p-2.5 pr-9 text-xs rounded-xl border border-slate-200 text-right focus:border-[#118F86] focus:ring-1 focus:ring-[#118F86]"
                  />
                  <Search size={16} className="absolute top-3 right-3 text-slate-400" />
                </div>
              </div>
            </div>
          </section>

          {/* Posts Grid */}
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <div
                    key={post.slug}
                    className="bg-[#F7F9F6] p-6 rounded-2xl border border-slate-200 shadow-soft text-right flex flex-col justify-between hover:border-[#118F86] transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
                        <span className="text-[#118F86] font-bold">
                          {post.category === 'for-parents' ? 'للأهل' : 'محادثة'}
                        </span>
                        <span>{post.date}</span>
                      </div>

                      <h3 className="font-bold text-base text-[#16344B] mb-2 leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-xs text-[#566974] leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedPost(post)}
                      className="pt-3 border-t border-slate-200 text-xs font-bold text-[#118F86] flex items-center justify-between w-full hover:underline"
                    >
                      <span>اقرأ المقال بالكامل</span>
                      <ArrowRight size={14} className="rotate-180" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

