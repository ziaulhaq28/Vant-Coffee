import React from 'react';
import { Language, Product } from '../types';
import { translations } from '../translations';
import { TreePine, Layers, Award, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';
import { OriginFarmView } from './OriginFarmView';
import { ProductsView } from './ProductsView';

interface AboutViewProps {
  lang: Language;
  activeSubTab: 'kisah' | 'kebun' | 'produk';
  setActiveSubTab: (tab: 'kisah' | 'kebun' | 'produk') => void;
  onInquiryClick: (productName: string) => void;
  onOrderSampleClick: (prd: Product) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  lang,
  activeSubTab,
  setActiveSubTab,
  onInquiryClick,
  onOrderSampleClick,
}) => {
  const t = translations[lang];
  const pageT = t.aboutPage;
  const commonAbout = t.aboutSection;

  const tabLabels = {
    en: {
      kisah: 'The Vant Story',
      kebun: 'Estate & Process',
      produk: 'B2B Export Specs',
    },
    id: {
      kisah: 'Kisah Vant',
      kebun: 'Kebun & Pengolahan',
      produk: 'Katalog Dagang B2B',
    },
    zh: {
      kisah: '关于万特',
      kebun: '原产庄园',
      produk: '大宗规格目录',
    },
  }[lang];

  const cards = [
    {
      icon: <TreePine className="text-[#C59A3D]" size={32} />,
      title: lang === 'en' ? 'Volcanic Terroir' : lang === 'id' ? 'Terroir Vulkanik' : '火山特殊风土',
      text: lang === 'en' ? 'Our trees grow on Mount Tanggamus, flourishing in mineral-dense volcanic soils and moist elevations.' : lang === 'id' ? 'Tanaman kami dibesarkan di lereng Tanggamus, tumbuh subur di tanah vulkanis padat nutrisi.' : '庄园位于唐加穆斯山，盛产高浓度火山酸和有机活性成分。',
    },
    {
      icon: <Layers className="text-[#C59A3D]" size={32} />,
      title: lang === 'en' ? 'Traceable Wet Processing' : lang === 'id' ? 'Proses Basah Terlacak' : '湿法洗涤全流程',
      text: lang === 'en' ? 'Double fermentation and slow sun drying in customized solar greenhouses ensure defect reduction and cleanliness.' : lang === 'id' ? 'Fermentasi gajah ganda & penjemuran dalam kubah solar menjamin kebersihan dari jamur tanah.' : '两次浸洗发酵及恒温日光房晾晒，完全隔绝土壤杂味，实现超群洁净。',
    },
    {
      icon: <Award className="text-[#C59A3D]" size={32} />,
      title: lang === 'en' ? 'Export Spec Grading' : lang === 'id' ? 'Standarisasi Mutu Ekspor' : '精细出口等级物理分级',
      text: lang === 'en' ? 'Physical density separator processing and multi-tier manual defect extraction provide consistent premium grade robusta.' : lang === 'id' ? 'Pemisahan fisik massa jenis dan penyortiran tangan ganda mengeluarkan biji kopi bebas cacat rasa.' : '严格控制物理密度，结合全手工剔除碎角与破损豆，维持1级高含豆量。',
    },
  ];

  return (
    <div className="pt-20 min-h-screen bg-[#121010]" id="about-us-view">
      
      {/* Sub tabs navigation */}
      <div className="sticky top-20 z-40 bg-[#121010]/95 backdrop-blur-md border-b border-[#3B2A24]/40 py-3 px-4">
        <div className="max-w-3xl mx-auto flex justify-center gap-1 sm:gap-4 md:gap-8">
          {(['kisah', 'kebun', 'produk'] as const).map((tab) => {
            const isActive = activeSubTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveSubTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 sm:px-6 py-2 text-xs sm:text-sm uppercase tracking-wider font-sans font-semibold transition-all duration-300 relative cursor-pointer ${
                  isActive
                    ? 'text-[#C59A3D]'
                    : 'text-[#B7B0A5] hover:text-[#C59A3D]'
                }`}
              >
                {tabLabels[tab]}
                {isActive && (
                  <motion.span
                    layoutId="aboutActiveTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C59A3D] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {activeSubTab === 'kisah' && (
        <div className="animate-in fade-in duration-500">
          {/* Editorial Header with premium background */}
          <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#3B2A24]/30">
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=1600"
                alt="About Vant"
                className="w-full h-full object-cover opacity-[0.15] brightness-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#121010]/95 via-transparent to-[#121010]" />
            </div>
            <div className="max-w-5xl mx-auto text-center relative z-10">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-xs text-[#C59A3D] uppercase tracking-widest font-bold"
              >
                {commonAbout.title}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#F5F1EA] mt-3 tracking-tight"
              >
                {commonAbout.subtitle}
              </motion.h1>
              <div className="w-16 h-1 bg-[#C59A3D] mx-auto mt-6" />
            </div>
          </section>

          {/* Split Block: Heritage Story */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-left" id="about-heritage-details">
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F5F1EA] tracking-tight">
                  {lang === 'en'
                    ? 'Three Generations of Robusta Stewardship'
                    : lang === 'id'
                    ? 'Tiga Generasi Penjaga Warisan Kopi Lampung'
                    : '历经三代人坚守的罗布斯塔种植情怀'}
                </h2>
                <p className="font-sans text-sm sm:text-base text-[#B7B0A5] leading-relaxed font-light">
                  {commonAbout.p1}
                </p>
                <p className="font-sans text-sm sm:text-base text-[#B7B0A5] leading-relaxed font-light">
                  {commonAbout.p2}
                </p>
                
                {/* Quick Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6" id="about-metrics-row">
                  <div className="bg-[#1c1918]/60 p-4 rounded-none border border-[#C59A3D]/15">
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C59A3D]">{commonAbout.stat1Num}</div>
                    <div className="font-sans text-[10px] sm:text-xs text-[#B7B0A5] uppercase tracking-wider mt-1">{commonAbout.stat1Label}</div>
                  </div>
                  <div className="bg-[#1c1918]/60 p-4 rounded-none border border-[#C59A3D]/15">
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C59A3D]">{commonAbout.stat2Num}</div>
                    <div className="font-sans text-[10px] sm:text-xs text-[#B7B0A5] uppercase tracking-wider mt-1">{commonAbout.stat2Label}</div>
                  </div>
                  <div className="bg-[#1c1918]/60 p-4 rounded-none border border-[#C59A3D]/15">
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C59A3D]">{commonAbout.stat3Num}</div>
                    <div className="font-sans text-[10px] sm:text-xs text-[#B7B0A5] uppercase tracking-wider mt-1">{commonAbout.stat3Label}</div>
                  </div>
                  <div className="bg-[#1c1918]/60 p-4 rounded-none border border-[#C59A3D]/15">
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C59A3D]">{commonAbout.stat4Num}</div>
                    <div className="font-sans text-[10px] sm:text-xs text-[#B7B0A5] uppercase tracking-wider mt-1">{commonAbout.stat4Label}</div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-5 relative" id="about-media-wrapper">
                <div className="aspect-[4/5] overflow-hidden rounded-none shadow-2xl border border-[#C59A3D]/25 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800"
                    alt=" Lampung Coffee Farmers"
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-left">
                    <span className="font-mono text-[10px] text-[#C59A3D] uppercase tracking-wider font-semibold">Tanggamus Mountain Ridge</span>
                    <p className="font-serif text-lg text-[#F5F1EA] mt-1 font-semibold">{lang === 'en' ? 'Our Family Farm Plantation' : lang === 'id' ? 'Kebun Mandiri Keluarga Vant' : '万特家族核心高山庄园'}</p>
                  </div>
                </div>
                {/* Soft decorative golden frame */}
                <div className="absolute -inset-2 border border-[#C59A3D]/15 rounded-none -z-10 pointer-events-none" />
              </div>
            </div>
          </section>

          {/* Core Values / Cards */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1c1918] border-y border-[#C59A3D]/10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="font-serif text-3xl font-bold text-[#F5F1EA]">
                  {lang === 'en' ? 'Built Uniquely on Integrity' : lang === 'id' ? 'Dibangun Atas Integritas yang Kuat' : '依托全链条诚信优势'}
                </h2>
                <p className="font-sans text-sm text-[#B7B0A5] mt-3">
                  {lang === 'en'
                    ? 'How Vant guarantees true trading consistency across shipping cycles.'
                    : lang === 'id'
                    ? 'Bagaimana Vant menjaga mutu pasokan kopi yang stabil sepanjang tahun.'
                    : '万特咖啡如何克服产季波动，保障大宗国际海运贸易稳定性。'}
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {cards.map((card, i) => (
                  <div key={i} className="bg-[#121010]/95 p-8 rounded-none border border-[#C59A3D]/15 hover:border-[#C59A3D] transition-all duration-300" id={`about-value-card-${i}`}>
                    <div className="p-3 bg-[#3B2A24]/40 w-fit rounded-none mb-6">{card.icon}</div>
                    <h3 className="font-serif text-xl font-semibold text-[#F5F1EA] mb-3">{card.title}</h3>
                    <p className="font-sans text-xs sm:text-sm text-[#B7B0A5] leading-relaxed font-light">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-left" id="about-timeline-section">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-mono text-xs text-[#C59A3D] uppercase tracking-widest font-semibold">
                {lang === 'en' ? 'Our Milestones' : lang === 'id' ? 'Catatan Perjalanan Kami' : '发展史诗'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F1EA] mt-2">
                {pageT.timelineTitle}
              </h2>
              <p className="font-sans text-sm text-[#B7B0A5] mt-3 font-light">
                {pageT.timelineSubtitle}
              </p>
            </div>

            {/* Timeline Path */}
            <div className="relative border-l border-[#C59A3D]/40 pl-6 space-y-12 ml-4">
              <div className="relative">
                <span className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-[#C59A3D] border-4 border-[#121010]" />
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#C59A3D]">{pageT.t1Date}</h3>
                <p className="font-sans text-sm text-[#B7B0A5] mt-2 leading-relaxed font-light">{pageT.t1Text}</p>
              </div>
              
              <div className="relative">
                <span className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-[#3B2A24] border-4 border-[#121010] hover:bg-[#C59A3D] transition-colors" />
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F4EFE7]">{pageT.t2Date}</h3>
                <p className="font-sans text-sm text-[#B7B0A5] mt-2 leading-relaxed font-light">{pageT.t2Text}</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-[#3B2A24] border-4 border-[#121010] hover:bg-[#C59A3D] transition-colors" />
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F4EFE7]">{pageT.t3Date}</h3>
                <p className="font-sans text-sm text-[#B7B0A5] mt-2 leading-relaxed font-light">{pageT.t3Text}</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-[#C59A3D] border-4 border-[#121010] animate-pulse" />
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#C59A3D]">{pageT.t4Date}</h3>
                <p className="font-sans text-sm text-[#B7B0A5] mt-2 leading-relaxed font-light">{pageT.t4Text}</p>
              </div>
            </div>
          </section>

          {/* Sustainable Commitment Block */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-[#121010] to-[#1c1918]">
            <div className="max-w-4xl mx-auto bg-[#3B2A24]/20 border border-[#3B2A24]/60 p-8 sm:p-12 rounded relative overflow-hidden text-center" id="sustainable-commitment-badge">
              <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#C59A3D]" />
              <HeartHandshake className="text-[#C59A3D] mx-auto mb-6" size={40} />
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F1EA] mb-4">{pageT.commitmentTitle}</h2>
              <p className="font-sans text-sm sm:text-base text-[#B7B0A5] leading-relaxed max-w-2xl mx-auto font-light">
                {pageT.commitmentP1}
              </p>
            </div>
          </section>
        </div>
      )}

      {activeSubTab === 'kebun' && (
        <div className="animate-in fade-in duration-500 -mt-24 pointer-events-auto">
          <OriginFarmView lang={lang} />
        </div>
      )}

      {activeSubTab === 'produk' && (
        <div className="animate-in fade-in duration-500 -mt-24 pointer-events-auto">
          <ProductsView
            lang={lang}
            onInquiryClick={onInquiryClick}
            onOrderSampleClick={onOrderSampleClick}
          />
        </div>
      )}

    </div>
  );
};
