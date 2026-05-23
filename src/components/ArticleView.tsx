import React, { useState } from 'react';
import { Language, Article } from '../types';
import { translations, articlesList } from '../translations';
import { BookOpen, Calendar, Clock, X, ArrowUpRight, Share2, CornerDownRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ArticleViewProps {
  lang: Language;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ lang }) => {
  const t = translations[lang];
  const pageT = t.articlesPage;

  const [readingArticle, setReadingArticle] = useState<Article | null>(null);

  const triggerSocialShare = (article: Article) => {
    alert(
      lang === 'id'
        ? `Tautan artikel "${article.titleKey}" berhasil disalin ke papan klip!`
        : `Share link for article "${article.titleKey}" copied successfully!`
    );
  };

  return (
    <div className="pt-24 min-h-screen bg-[#121010]" id="robusta-magazine-view">
      
      {/* Editorial Title with premium background */}
      <section className="relative py-20 px-4 text-center border-b border-[#3B2A24]/30 overflow-hidden">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=1600"
            alt="Vant Journal & Intellect"
            className="w-full h-full object-cover opacity-[0.15] brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121010]/95 via-transparent to-[#121010]" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="font-mono text-xs text-[#C59A3D] uppercase tracking-widest font-bold">
            {lang === 'en' ? 'VANT COFFEE INTELLECT' : lang === 'id' ? 'RUANG BACA & RISET VANT' : '万特学术研究与期刊中心'}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#F5F1EA] mt-2 tracking-tight">
            {pageT.title}
          </h1>
          <p className="font-sans text-sm text-[#B7B0A5]/80 max-w-xl mx-auto mt-3 font-light leading-relaxed">
            {pageT.sub}
          </p>
          <div className="w-12 h-0.5 bg-[#C59A3D] mx-auto mt-5" />
        </div>
      </section>

      {/* Featured Big Article Hero row */}
      {articlesList.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="featured-editorial-row">
          {(() => {
            const featured = articlesList[0];
            return (
              <div className="grid lg:grid-cols-12 gap-8 bg-[#1c1918] p-6 sm:p-8 rounded border border-[#3B2A24]/40 items-center justify-between text-left">
                <div className="lg:col-span-6 relative aspect-video w-full overflow-hidden rounded border border-[#3B2A24]/45">
                  <img
                    src={featured.image}
                    alt={featured.titleKey}
                    className="object-cover w-full h-full brightness-85 hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="lg:col-span-6 space-y-4" id="magazine-featured-brief">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#B7B0A5]/80 font-mono">
                    <span className="p-1 px-2.5 bg-[#3B2A24] text-[#C59A3D] rounded uppercase text-[10px] tracking-wider font-bold">
                      {featured.categoryKey}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {featured.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {featured.readTimeKey}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F1EA] leading-snug hover:text-[#C59A3D] transition-colors cursor-pointer" onClick={() => setReadingArticle(featured)}>
                    {featured.titleKey}
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-[#B7B0A5] leading-relaxed font-light">
                    {featured.excerptKey}
                  </p>

                  <div className="pt-2 flex items-center gap-4">
                    <button
                      onClick={() => setReadingArticle(featured)}
                      className="px-5 py-2.5 bg-[#3B2A24] text-[#C59A3D] border border-[#C59A3D]/30 hover:bg-[#C59A3D] hover:text-[#121010] rounded text-xs uppercase tracking-wider font-semibold font-sans flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>{pageT.readMore}</span>
                      <ArrowUpRight size={13} />
                    </button>
                    <button
                      onClick={() => triggerSocialShare(featured)}
                      className="p-2.5 rounded border border-[#3B2A24] text-[#B7B0A5] hover:text-[#C59A3D] hover:border-[#C59A3D]/40 transition-colors"
                      title="Share Article"
                    >
                      <Share2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>
      )}

      {/* Grid List Articles row */}
      <section className="py-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="magazine-articles-grid-row">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articlesList.slice(1).map((article) => (
            <div
              key={article.id}
              className="bg-[#1c1918] rounded border border-[#3B2A24]/40 overflow-hidden flex flex-col justify-between text-left hover:border-[#C59A3D]/25 transition-colors"
              id={`magazine-card-${article.id}`}
            >
              <div className="aspect-video w-full overflow-hidden bg-neutral-900">
                <img
                  src={article.image}
                  alt={article.titleKey}
                  className="object-cover w-full h-full brightness-90 hover:brightness-100"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#B7B0A5] uppercase">
                    <span className="text-[#C59A3D]">{article.categoryKey}</span>
                    <span>•</span>
                    <span>{article.readTimeKey}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#F5F1EA] hover:text-[#C59A3D] cursor-pointer" onClick={() => setReadingArticle(article)}>
                    {article.titleKey}
                  </h3>
                  <p className="font-sans text-xs text-[#B7B0A5] font-light leading-relaxed line-clamp-3">
                    {article.excerptKey}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-[#3B2A24]/30 text-xs">
                  <button
                    onClick={() => setReadingArticle(article)}
                    className="text-[#C59A3D] font-semibold flex items-center gap-1 group cursor-pointer"
                  >
                    <span>Read Article</span>
                    <CornerDownRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <span className="text-[#B7B0A5]/50 font-mono text-[10px]">{article.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full length Reader Drawer */}
      {readingArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
          id="reader-modal-overlay"
          onClick={() => setReadingArticle(null)}
        >
          <div
            className="w-full max-w-2xl h-full bg-[#121010] border-l border-[#C59A3D]/30 shadow-2xl overflow-y-auto p-6 sm:p-10 text-left relative flex flex-col justify-between"
            id="reader-modal-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer top close button */}
            <div className="flex justify-between items-center border-b border-[#3B2A24]/40 pb-4">
              <span className="font-mono text-xs text-[#C59A3D] uppercase tracking-widest font-semibold">{readingArticle.categoryKey}</span>
              <button
                onClick={() => setReadingArticle(null)}
                className="p-2 border border-[#3B2A24] rounded-full text-[#B7B0A5] hover:text-[#C59A3D] transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Middle body article content */}
            <div className="flex-1 py-8 space-y-6">
              <div className="flex items-center gap-4 text-xs font-mono text-[#B7B0A5]/80">
                <span className="flex items-center gap-1"><Calendar size={12} /> {readingArticle.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {readingArticle.readTimeKey}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F1EA] tracking-tight leading-tight">
                {readingArticle.titleKey}
              </h2>

              <div className="aspect-[4/3] w-full overflow-hidden rounded border border-[#3B2A24] bg-neutral-900">
                <img
                  src={readingArticle.image}
                  alt={readingArticle.titleKey}
                  className="object-cover w-full h-full"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Author tagline */}
              <div className="p-3 bg-[#1c1918] rounded border border-[#3B2A24]/45 text-xs text-[#C59A3D] font-sans italic flex items-center gap-1.5">
                <BookOpen size={12} />
                <span>{pageT.author}</span>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#B7B0A5] font-light leading-relaxed font-sans pb-8">
                {/* Divide contents into real paragraph styles */}
                <p>{readingArticle.contentKey}</p>
                <p>
                  Our trade researchers consistently audit moisture profiles, density ratings, soil nutrient indexes, and screen variances. Understanding the complex biochemical reaction patterns of volcanic microclimates helps our family roasters design tailor-made, clean temperature curves that preserve trace origin markers flawlessly.
                </p>
                <p>
                  As an independent Lampung operator, we guarantee fully integrated crop oversight from our family slopes straight to Panjand custom maritime containers, bringing Indonesian excellence to our trading allies.
                </p>
              </div>
            </div>

            {/* Bottom Actions footer */}
            <div className="pt-4 border-t border-[#3B2A24]/30 flex justify-between items-center">
              <button
                onClick={() => triggerSocialShare(readingArticle)}
                className="flex items-center gap-1.5 text-xs text-[#B7B0A5] hover:text-[#C59A3D] transition-colors cursor-pointer"
              >
                <Share2 size={13} />
                <span>Copy Share link</span>
              </button>
              
              <button
                onClick={() => setReadingArticle(null)}
                className="text-xs uppercase tracking-widest font-mono text-[#C59A3D] hover:underline"
              >
                Back to Journals
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
