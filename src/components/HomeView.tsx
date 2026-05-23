import React from 'react';
import { Language, Product } from '../types';
import { translations, productsList } from '../translations';
import {
  TreePine,
  ShieldAlert,
  Layers,
  Award,
  BadgeCent,
  ArrowRight,
  Quote,
  Activity,
  Milestone,
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  lang: Language;
  onNavigate: (view: any) => void;
  onInquiryClick: (productName?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ lang, onNavigate, onInquiryClick }) => {
  const t = translations[lang];
  const commonAbout = t.aboutSection;
  const commonReady = t.exportReady;
  const whyT = t.whyVant;

  const whyCards = [
    {
      icon: <TreePine className="text-[#C59A3D]" size={24} />,
      title: whyT.card1Title,
      desc: whyT.card1Desc,
    },
    {
      icon: <Layers className="text-[#C59A3D]" size={24} />,
      title: whyT.card2Title,
      desc: whyT.card2Desc,
    },
    {
      icon: <Award className="text-[#C59A3D]" size={24} />,
      title: whyT.card3Title,
      desc: whyT.card3Desc,
    },
    {
      icon: <Milestone className="text-[#C59A3D]" size={24} />,
      title: whyT.card4Title,
      desc: whyT.card4Desc,
    },
    {
      icon: <BadgeCent className="text-[#C59A3D]" size={24} />,
      title: whyT.card5Title,
      desc: whyT.card5Desc,
    },
  ];

  return (
    <div className="w-full bg-[#121010]" id="home-view-sections">
      
      {/* Section 1: About Vant (Split layout) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#3B2A24]/20" id="home-sec-about">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left" id="home-about-copy-block">
            <span className="font-mono text-xs text-[#C59A3D] uppercase tracking-widest font-bold">
              {commonAbout.title}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F1EA] tracking-tight leading-tight">
              {lang === 'en' ? 'Fine Indonesian Coffee Roots.' : lang === 'id' ? 'Akar Sejati Kopi Robusta Nusantara.' : '源自苏门答腊最纯正的咖啡之魂'}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#B7B0A5] leading-relaxed font-light">
              {commonAbout.p1}
            </p>
            <p className="font-sans text-sm sm:text-base text-[#B7B0A5] leading-relaxed font-light">
              {commonAbout.p2}
            </p>
            
            <div className="pt-4">
              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3 bg-[#3B2A24] text-[#C59A3D] border border-[#C59A3D]/30 hover:bg-[#C59A3D] hover:text-[#121010] hover:scale-[1.01] transition-all rounded text-xs uppercase tracking-widest font-semibold flex items-center gap-2 cursor-pointer"
                id="btn-about-story-home"
              >
                <span>Read Our Full Philosophy</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative" id="home-about-media-block">
            <div className="aspect-[4/3] rounded overflow-hidden border border-[#3B2A24] relative shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800"
                alt="Vant Coffee Farm Seedling Hands"
                className="object-cover w-full h-full brightness-90 hover:scale-103 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121010]/80 via-transparent to-transparent pointer-events-none" />
            </div>
            {/* Visual bottom frame accent */}
            <div className="absolute -inset-2 border border-[#C59A3D]/10 rounded -z-10" />
          </div>

        </div>
      </section>

      {/* Section 2: Origin Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1c1918] border-y border-[#3B2A24]/30" id="home-sec-origin">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="relative group overflow-hidden rounded border border-[#3B2A24]/60 order-last lg:order-first" id="home-origin-image-container">
              <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=900"
                alt="Sumatra Volcano Misty Hills"
                className="object-cover w-full aspect-video sm:aspect-[4/3] brightness-85 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-radial from-transparent to-black/60 pointer-events-none" />
            </div>

            <div className="space-y-6 text-left" id="home-origin-copy-container">
              <span className="font-mono text-xs text-[#C59A3D] uppercase tracking-widest font-bold">
                {t.originStory.title}
              </span>
              
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F1EA] tracking-tight">
                {t.originStory.subtitle}
              </h2>

              <p className="font-sans text-sm sm:text-base text-[#B7B0A5]/90 leading-relaxed font-light">
                {t.originStory.description1}
              </p>

              <div className="grid sm:grid-cols-3 gap-4 pt-4" id="home-origin-checks">
                <div className="p-4 bg-[#121010] rounded border border-[#3B2A24] text-left">
                  <span className="text-[#C59A3D] font-serif font-bold text-sm block">{t.originStory.terroir}</span>
                  <span className="text-[10px] sm:text-xs text-[#B7B0A5] font-sans mt-1 block">800 - 1200m Elevation</span>
                </div>
                <div className="p-4 bg-[#121010] rounded border border-[#3B2A24] text-left">
                  <span className="text-[#C59A3D] font-serif font-bold text-sm block">{t.originStory.cultivation}</span>
                  <span className="text-[10px] sm:text-xs text-[#B7B0A5] font-sans mt-1 block">100% Shade Canopy</span>
                </div>
                <div className="p-4 bg-[#121010] rounded border border-[#3B2A24] text-left">
                  <span className="text-[#C59A3D] font-serif font-bold text-sm block">{t.originStory.processing}</span>
                  <span className="text-[10px] sm:text-xs text-[#B7B0A5] font-sans mt-1 block">SGS Certified Grading</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('origin-farm')}
                  className="px-6 py-3 border border-[#C59A3D] text-[#C59A3D] hover:bg-[#C59A3D] hover:text-[#121010] transition-all rounded text-xs uppercase tracking-widest font-semibold cursor-pointer"
                  id="btn-origin-page-home"
                >
                  Explore Farm Microclimate
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Why Vant Coffee (Cards) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="home-sec-why">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-[#C59A3D] uppercase tracking-widest font-bold">
            {lang === 'en' ? 'OUR VALUE PROPOSITION' : lang === 'id' ? 'PROPOSISI NILAI UTAMA' : '万特庄园贸易核心支柱'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F1EA] mt-2">
            {whyT.title}
          </h2>
          <p className="font-sans text-sm text-[#B7B0A5] mt-3 font-light">
            {whyT.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6" id="why-cards-grid">
          {whyCards.map((card, i) => (
            <div
              key={i}
              className="bg-[#1c1918] p-6 rounded border border-[#3B2A24]/40 hover:border-[#C59A3D] hover:translate-y-[-2px] transition-all duration-300 text-left flex flex-col justify-between"
              id={`why-card-element-${i}`}
            >
              <div className="space-y-4">
                <div className="p-2.5 bg-[#3B2A24]/50 w-fit rounded text-[#C59A3D]">
                  {card.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#F5F1EA] leading-snug">
                  {card.title}
                </h3>
                <p className="font-sans text-xs text-[#B7B0A5] leading-relaxed font-light">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Product Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1c1918] border-y border-[#3B2A24]/30" id="home-sec-products">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          
          <div className="max-w-2xl mx-auto">
            <span className="font-mono text-xs text-[#C59A3D] uppercase tracking-widest font-bold">
              ESTATE GRADES SPECIMENS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F1EA] mt-1">
              {lang === 'en' ? 'Premium Trade Selections' : lang === 'id' ? 'Pilihan Produk Utama' : '万特经典规格'}
            </h2>
            <div className="w-12 h-0.5 bg-[#C59A3D] mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {productsList.map((p) => {
              const label = t.productSpecs[p.nameKey as keyof typeof t.productSpecs] || p.nameKey;
              return (
                <div
                  key={p.id}
                  className="bg-[#121010] rounded-lg border border-[#3B2A24]/50 overflow-hidden flex flex-col justify-between text-left hover:border-[#C59A3D]/40 transition-colors"
                  id={`home-product-card-${p.id}`}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={p.image}
                      alt={label}
                      className="object-cover w-full h-full brightness-90"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#C59A3D] text-[#121010] font-mono text-[9px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded">
                      {p.category}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-serif text-lg font-bold text-[#F5F1EA]">
                        {label}
                      </h3>
                      <p className="font-sans text-xs text-[#B7B0A5]/80 font-light line-clamp-2">
                        {p.notesKey}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#3B2A24]/40 flex items-center justify-between text-xs">
                      <button
                        onClick={() => onNavigate('products')}
                        className="text-[#C59A3D] font-semibold flex items-center gap-1 group cursor-pointer"
                      >
                        <span>View Technical Spec</span>
                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </button>
                      <span className="font-mono text-[#B7B0A5]/40">{p.elevationKey}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Section 5: Export Ready */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="home-sec-export">
        <div className="bg-gradient-to-t from-[#1c1918] to-[#121010] border border-[#3B2A24] p-8 sm:p-12 rounded-lg relative overflow-hidden text-left">
          
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-5 hidden lg:block" id="export-watermark">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#C59A3D]" fill="currentColor">
              <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" />
            </svg>
          </div>

          <div className="max-w-2xl space-y-6 relative z-10">
            <span className="p-1 px-3 bg-[#3B2A24] text-[#C59A3D] rounded-full text-[10px] font-mono uppercase tracking-widest font-semibold">
              B2B CONTAINER INTEGRITY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F1EA] tracking-tight leading-tight">
              {commonReady.title}
            </h2>
            <p className="font-sans text-sm text-[#B7B0A5] font-light leading-relaxed">
              We coordinate container shipments out of Panjang Port, Lampung, backed by phytosanitary, quarantine clearance, and double mechanical density sorting procedures.
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#B7B0A5] font-light" id="home-export-check-list">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59A3D]" />
                <span>Screen 16-18 premium sizing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59A3D]" />
                <span>SGS & Surveyor certification ready</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59A3D]" />
                <span>FOB, CIF ocean logistics</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59A3D]" />
                <span>Waterproof bulk packaging specifications</span>
              </li>
            </ul>

            <div className="pt-4 flex flex-wrap gap-4" id="home-export-btn-panel">
              <button
                onClick={() => onNavigate('export')}
                className="px-6 py-3.5 bg-[#C59A3D] text-[#121010] hover:bg-[#F4EFE7] hover:scale-[1.01] transition-all rounded text-xs uppercase tracking-widest font-bold cursor-pointer"
              >
                Request Export Inquiry
              </button>
              <button
                onClick={() => onNavigate('export')}
                className="px-6 py-3.5 border border-[#3B2A24] text-[#F5F1EA] hover:border-[#C59A3D] transition-colors rounded text-xs uppercase tracking-widest font-medium cursor-pointer"
              >
                {commonReady.ctaSecondary}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Direct Shop Preview */}
      <section className="py-20 px-4 bg-[#1c1918] border-t border-[#3B2A24]/30" id="home-sec-shop-preview">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6 text-left" id="home-shop-brief">
              <span className="font-mono text-xs text-[#C59A3D] uppercase tracking-widest font-bold">
                BOUTIQUE DIRECT ACQUISITION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F1EA] tracking-tight">
                {t.shopPreview.title}
              </h2>
              <p className="font-sans text-sm text-[#B7B0A5]/90 leading-relaxed font-light">
                {t.shopPreview.desc}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-8 py-3.5 bg-[#C59A3D] text-[#121010] hover:bg-[#F4EFE7] transition-all rounded text-xs uppercase tracking-widest font-bold flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-[#C59A3D]/10"
                >
                  <span>{t.shopPreview.cta}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6" id="home-shop-visuals">
              {productsList.slice(1, 3).map((item) => {
                const itemLabel = t.productSpecs[item.nameKey as keyof typeof t.productSpecs] || item.nameKey;
                return (
                  <div
                    key={item.id}
                    className="bg-[#121010] p-4 rounded border border-[#3B2A24]/50 text-left space-y-3 hover:border-[#C59A3D]/25 transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={itemLabel}
                      className="aspect-square w-full object-cover rounded border border-[#3B2A24]/40"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-serif text-[#F5F1EA] font-semibold block line-clamp-1">{itemLabel}</span>
                      <span className="font-mono text-[#C59A3D] shrink-0">IDR {item.price.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Section 7: Testimonial & Brand Reflection */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center" id="home-sec-testimonial">
        <div className="space-y-6 relative">
          {/* Big quotes icon background */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[#C59A3D]/5 pointer-events-none select-none">
            <Quote size={80} />
          </div>

          <span className="font-mono text-xs text-[#C59A3D] uppercase tracking-widest font-bold block">
            {t.testimonial.title}
          </span>

          <blockquote className="font-serif text-lg sm:text-2xl md:text-3xl italic text-[#F5F1EA] max-w-3xl mx-auto leading-relaxed font-light">
            {t.testimonial.quote}
          </blockquote>

          <div className="space-y-1">
            <cite className="font-sans text-xs sm:text-sm font-semibold text-[#F5F1EA] block not-italic">
              {t.testimonial.author}
            </cite>
            <span className="font-sans text-[10px] sm:text-xs text-[#B7B0A5]/80 block">
              {t.testimonial.role}
            </span>
          </div>
        </div>
      </section>

    </div>
  );
};
