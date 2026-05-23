import React, { useState } from 'react';
import { Language, Product } from '../types';
import { translations, productsList } from '../translations';
import { Leaf, Flame, ShieldAlert, BadgeInfo, Eye, Package, Compass } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductsViewProps {
  lang: Language;
  onInquiryClick: (productName: string) => void;
  onOrderSampleClick: (prd: Product) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  lang,
  onInquiryClick,
  onOrderSampleClick,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'green' | 'roasted' | 'ground'>('all');
  const t = translations[lang];
  const specsT = t.productSpecs;

  const filteredProducts = productsList.filter(
    (p) => activeTab === 'all' || p.category === activeTab
  );

  return (
    <div className="pt-24 min-h-screen bg-[#121010]" id="products-catalog-view">
      
      {/* Page Header with premium background */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 text-center border-b border-[#3B2A24]/30 overflow-hidden">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=1600"
            alt="Products Catalog"
            className="w-full h-full object-cover opacity-[0.13] brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121010]/95 via-transparent to-[#121010]" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="font-mono text-xs text-[#C59A3D] uppercase tracking-widest font-bold">
            {lang === 'en' ? 'B2B Trade Catalog' : lang === 'id' ? 'Katalog Dagang Resmi B2B' : '万特B2B大宗产品目录'}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#F5F1EA] mt-3 tracking-tight">
            {lang === 'en' ? 'Our Export Grades' : lang === 'id' ? 'Kualitas Standar Ekspor Kami' : '进出口多档规格供货'}
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#B7B0A5] max-w-2xl mx-auto mt-4 font-light leading-relaxed">
            {lang === 'en'
              ? 'Select from single-origin robusta green bean containers, custom roasted cafe batches, or traditional grounded solutions.'
              : lang === 'id'
              ? 'Silakan lihat spesifikasi lengkap biji kopi hijau curah mentah kontaineran, batch sangrai sedang-gelap, atau kopi bubuk tubruk tradisional.'
              : '万特咖啡提供海运大豆生豆(Green Bean)、高规格定制焙熟豆(Roasted Bean)以及挂耳精筛微粉，满足各种烘焙深浅度偏好。'}
          </p>
          <div className="w-16 h-1 bg-[#C59A3D] mx-auto mt-6" />
        </div>
      </section>

      {/* Tabs Filtering Row */}
      <section className="py-8 px-4 max-w-7xl mx-auto flex justify-center border-b border-[#3B2A24]/20" id="catalog-category-filter">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#1c1918] border border-[#3B2A24]/40 rounded-full max-w-lg w-full">
          {(['all', 'green', 'roasted', 'ground'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs font-semibold tracking-wider font-sans uppercase transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#C59A3D] text-[#121010] shadow-md'
                  : 'text-[#B7B0A5] hover:text-[#F5F1EA]'
              }`}
            >
              {tab === 'all'
                ? lang === 'en'
                  ? 'All Specs'
                  : lang === 'id'
                  ? 'Semua Spek'
                  : '全部规格'
                : tab === 'green'
                ? lang === 'en'
                  ? 'Green Bean'
                  : lang === 'id'
                  ? 'Biji Hijau'
                  : '生豆'
                : tab === 'roasted'
                ? lang === 'en'
                  ? 'Roasted'
                  : lang === 'id'
                  ? 'Biji Sangrai'
                  : '熟豆'
                : lang === 'en'
                ? 'Ground'
                : lang === 'id'
                ? 'Bubuk Kopi'
                : '微磨粉'}
            </button>
          ))}
        </div>
      </section>

      {/* Products list grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="products-interactive-grid">
        <div className="space-y-16">
          {filteredProducts.map((p) => {
            const label = specsT[p.nameKey as keyof typeof specsT] || p.nameKey;
            const desc = specsT[`${p.id.replace(/-/g, '_')}_desc` as keyof typeof specsT] || specsT[`${p.category}_bean_desc` as keyof typeof specsT] || specsT.ground_coffee_desc;

            return (
              <div
                key={p.id}
                className="grid lg:grid-cols-12 gap-12 bg-[#1c1918] p-6 sm:p-10 rounded border border-[#3B2A24]/35 hover:border-[#C59A3D]/50 transition-colors duration-500"
                id={`catalog-card-container-${p.id}`}
              >
                {/* Product display graphics wrapper */}
                <div className="lg:col-span-5 relative" id="catalog-card-image-block">
                  <div className="aspect-square sm:aspect-[4/3] lg:aspect-square overflow-hidden rounded border border-[#3B2A24] bg-neutral-900 group relative">
                    <img
                      src={p.image}
                      alt={label}
                      className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Tiny watermark category tag */}
                    <div className="absolute top-4 left-4 p-1 px-3 bg-[#121010]/95 text-[#C59A3D] text-[10px] font-mono rounded border border-[#C59A3D]/40 uppercase tracking-widest leading-none">
                      {p.category}
                    </div>
                  </div>
                  {/* Visual Gold Bracket overlay details */}
                  <div className="absolute -inset-2 border border-[#C59A3D]/10 rounded -z-10" />
                </div>

                {/* Product Specifications texts */}
                <div className="lg:col-span-7 flex flex-col justify-between text-left" id="catalog-card-details-block">
                  <div className="space-y-4">
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F1EA] tracking-tight leading-snug">
                      {label}
                    </h2>
                    
                    <p className="font-sans text-xs sm:text-sm text-[#B7B0A5]/80 font-light leading-relaxed">
                      {desc}
                    </p>

                    {/* Specifications Properties Grid */}
                    <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-[#3B2A24]/40" id="catalog-card-specs-matrix">
                      <div>
                        <span className="font-sans text-[10px] sm:text-xs text-[#B7B0A5] tracking-wider uppercase font-semibold block">
                          {specsT.elevationLabel}
                        </span>
                        <span className="font-serif text-sm sm:text-base text-[#F4EFE7] font-medium block mt-0.5">
                          {p.elevationKey}
                        </span>
                      </div>
                      
                      <div>
                        <span className="font-sans text-[10px] sm:text-xs text-[#B7B0A5] tracking-wider uppercase font-semibold block">
                          {specsT.processLabel}
                        </span>
                        <span className="font-serif text-sm sm:text-base text-[#F4EFE7] font-medium block mt-0.5">
                          {p.processKey}
                        </span>
                      </div>

                      {p.moistureKey && (
                        <div>
                          <span className="font-sans text-[10px] sm:text-xs text-[#B7B0A5] tracking-wider uppercase font-semibold block">
                            {specsT.moistureLabel}
                          </span>
                          <span className="font-serif text-sm sm:text-base text-[#F4EFE7] font-medium block mt-0.5">
                            {p.moistureKey}
                          </span>
                        </div>
                      )}

                      {p.roastKey && (
                        <div>
                          <span className="font-sans text-[10px] sm:text-xs text-[#B7B0A5] tracking-wider uppercase font-semibold block">
                            {specsT.roastLabel}
                          </span>
                          <span className="font-serif text-sm sm:text-base text-[#F4EFE7] font-medium block mt-0.5">
                            {p.roastKey}
                          </span>
                        </div>
                      )}

                      <div>
                        <span className="font-sans text-[10px] sm:text-xs text-[#B7B0A5] tracking-wider uppercase font-semibold block">
                          {specsT.packagingLabel}
                        </span>
                        <span className="font-serif text-sm sm:text-base text-[#F4EFE7] font-medium block mt-0.5">
                          {p.packagingKey}
                        </span>
                      </div>

                      <div className="sm:col-span-2">
                        <span className="font-sans text-[10px] sm:text-xs text-[#B7B0A5] tracking-wider uppercase font-semibold block">
                          {specsT.notesLabel}
                        </span>
                        <span className="font-sans text-xs sm:text-sm text-[#C59A3D] font-medium block mt-1">
                          {p.notesKey}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions drawer for this catalog item */}
                  <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-[#3B2A24]/40" id="catalog-card-actions">
                    <button
                      onClick={() => onInquiryClick(label)}
                      className="px-6 py-3 bg-[#C59A3D] text-[#121010] hover:bg-[#F4EFE7] hover:text-[#121010] transition-colors rounded text-xs uppercase tracking-widest font-bold cursor-pointer"
                    >
                      {specsT.inquireBtn}
                    </button>
                    <button
                      onClick={() => onOrderSampleClick(p)}
                      className="px-6 py-3 border border-[#3B2A24] text-[#F5F1EA] hover:border-[#C59A3D] hover:text-[#C59A3D] transition-all rounded text-xs uppercase tracking-widest font-medium cursor-pointer"
                    >
                      {lang === 'en'
                        ? 'Request Quick Sample'
                        : lang === 'id'
                        ? 'Pesan Sampel Instan'
                        : '购买直邮微样/大货意向'}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Trust badging elements */}
      <section className="py-16 px-4 bg-[#1c1918] text-center border-t border-[#3B2A24]/30">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <BadgeInfo className="text-[#C59A3D] mb-4" size={32} />
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA]">
            {lang === 'en' ? 'Looking for Custom Chemical Specifications?' : lang === 'id' ? 'Membutuhkan Persyaratan Kimiawi Khusus?' : '寻找定制比例或拼配特性？'}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#B7B0A5] mt-2 max-w-2xl font-light">
            {lang === 'en'
              ? 'Our QC lab conforms screen-size tolerances, moisture ranges from 10.5-13.5%, density curves, and visual counts directly based on target port importation legislation. Contact us for custom certifications.'
              : lang === 'id'
              ? 'Laboratorium pengawasan mutu kami dapat dikonfigurasi untuk menyesuaikan kerapatan jenis, toleransi saringan besar screen 16-18, kadar air 10.5%-13.5%, untuk mempermudah bea cukai impor destinasi.'
              : '万特的原产地实验室能配合目标清关口岸调节生豆筛网大小比重分布、定制含水率以及出具原产化学检测数据。请直接发函咨询进出口处。'}
          </p>
        </div>
      </section>
    </div>
  );
};
