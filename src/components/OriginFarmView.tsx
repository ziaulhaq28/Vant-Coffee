import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Shovel, Sun, RefreshCw, Milestone, MapPin, Orbit } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OriginFarmViewProps {
  lang: Language;
}

export const OriginFarmView: React.FC<OriginFarmViewProps> = ({ lang }) => {
  const t = translations[lang];
  const pageT = t.originPage;
  const originalStoryT = t.originStory;

  const steps = [
    {
      id: 1,
      icon: <Shovel className="text-[#C59A3D]" size={28} />,
      title: pageT.step1Title,
      desc: pageT.step1Desc,
    },
    {
      id: 2,
      icon: <RefreshCw className="text-[#C59A3D]" size={28} />,
      title: pageT.step2Title,
      desc: pageT.step2Desc,
    },
    {
      id: 3,
      icon: <Sun className="text-[#C59A3D]" size={28} />,
      title: pageT.step3Title,
      desc: pageT.step3Desc,
    },
    {
      id: 4,
      icon: <Orbit className="text-[#C59A3D]" size={28} />,
      title: pageT.step4Title,
      desc: pageT.step4Desc,
    },
  ];

  const metrics = [
    { value: '800m - 1200m', label: lang === 'en' ? 'Sought Elevation' : lang === 'id' ? 'Ketinggian Pegunungan' : '海拔高度高度高度' },
    { value: 'Mount Tanggamus', label: lang === 'en' ? 'Active Volcanic Soil' : lang === 'id' ? 'Lereng Tanah Vulkanik' : '火山山脉核心产区' },
    { value: '21°C - 26°C', label: lang === 'en' ? 'Average Temp' : lang === 'id' ? 'Suhu Udara Rata-rata' : '适宜年均气温' },
    { value: '92%', label: lang === 'en' ? 'Humidity Protection' : lang === 'id' ? 'Kelembaban Atmosfer Khas' : '大气高山微潮湿湿度' },
  ];

  return (
    <div className="pt-24 min-h-screen bg-[#121010]" id="origin-farm-view">
      
      {/* Editorial Header with premium background */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 text-center border-b border-[#3B2A24]/30 overflow-hidden">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1524350309062-2787a6a78211?auto=format&fit=crop&q=80&w=1600"
            alt="Origin & Farm"
            className="w-full h-full object-cover opacity-[0.15] brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121010]/95 via-transparent to-[#121010]" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="font-mono text-xs text-[#C59A3D] uppercase tracking-widest font-bold">
            {originalStoryT.title}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#F5F1EA] mt-3 tracking-tight">
            {originalStoryT.subtitle}
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#B7B0A5] max-w-2xl mx-auto mt-4 font-light leading-relaxed">
            {originalStoryT.description1}
          </p>
          <div className="w-16 h-1 bg-[#C59A3D] mx-auto mt-6" />
        </div>
      </section>

      {/* Terroir & Map Presentation */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="origin-terroir-detail">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Landscape Image */}
          <div className="relative group overflow-hidden rounded border border-[#3B2A24]" id="origin-landscape-media">
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1000"
              alt="Lampung Mount Tanggamus Misty Fields"
              className="object-cover w-full aspect-[4/3] brightness-90 transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Visual geographic pin indicator */}
            <div className="absolute top-1/2 left-1/3 p-2 bg-[#C59A3D] text-[#121010] rounded-full animate-bounce shadow-xl">
              <MapPin size={16} />
            </div>
            <div className="absolute bottom-4 left-4 bg-[#121010]/95 px-3 py-1.5 rounded border border-[#C59A3D]/40 text-xs text-[#C59A3D] font-mono uppercase tracking-widest flex items-center gap-1">
              <span>●</span> Sumatra, Indonesia
            </div>
          </div>

          {/* Terroir Copy block */}
          <div className="space-y-6 text-left" id="origin-geographical-story">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#F5F1EA] tracking-tight">
              {pageT.sec1Title}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#B7B0A5] leading-relaxed font-light">
              {pageT.sec1P}
            </p>
            <p className="font-sans text-sm sm:text-base text-[#B7B0A5] leading-relaxed font-light">
              {originalStoryT.description2}
            </p>

            {/* Microclimate KPIs Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4" id="origin-kpi-grid">
              {metrics.map((m, idx) => (
                <div key={idx} className="bg-[#1c1918] p-4 rounded border border-[#3B2A24]/30">
                  <div className="font-serif text-base sm:text-lg font-bold text-[#C59A3D]">{m.value}</div>
                  <div className="font-sans text-[10px] text-[#B7B0A5] uppercase tracking-wider mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Modern Journey (B2B Processing Steps) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1c1918] border-y border-[#3B2A24]/30" id="origin-processing-flow">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs text-[#C59A3D] uppercase tracking-widest font-semibold">
              {lang === 'en' ? 'Quality Operations' : lang === 'id' ? 'Tata Kelola Mutu' : '原产地标准工序'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F1EA] mt-2">
              {pageT.processTitle}
            </h2>
            <div className="w-12 h-0.5 bg-[#C59A3D] mx-auto mt-4" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div
                key={step.id}
                className="bg-[#121010] p-6 rounded border border-[#3B2A24]/40 hover:border-[#C59A3D] transition-all duration-300 relative group"
                id={`processing-step-card-${step.id}`}
              >
                {/* Large translucent number in backgrounds */}
                <div className="absolute top-4 right-4 font-serif text-5xl font-black text-[#C59A3D]/5 select-none transition-all duration-300 group-hover:text-[#C59A3D]/10">
                  {`0${step.id}`}
                </div>

                <div className="p-3 bg-[#3B2A24]/40 w-fit rounded-lg mb-6 group-hover:bg-[#C59A3D]/10 transition-colors">
                  {step.icon}
                </div>

                <h3 className="font-serif text-lg font-semibold text-[#F5F1EA] mb-3 group-hover:text-[#C59A3D] transition-colors">
                  {step.title}
                </h3>
                
                <p className="font-sans text-xs sm:text-sm text-[#B7B0A5] leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Sustainable Shade Canopy section with warm callout */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-left" id="sustainability-creed">
            <span className="p-1 px-3 bg-[#3B2A24]/40 text-[#C59A3D] rounded-full text-[10px] font-semibold uppercase tracking-widest block w-fit">
              {lang === 'en' ? 'Sustainable Forestry' : lang === 'id' ? 'Kelestarian Lingkungan Hutan Tanggamus' : '生态森林共生'}
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#F5F1EA]">
              {lang === 'en' ? 'Under the Shade Canopy of Native Forest trees' : lang === 'id' ? 'Dinaungi Rimba Asli Lampung yang Lestari' : '林木遮阴，守护自然微生态'}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#B7B0A5] leading-relaxed font-light">
              {lang === 'en'
                ? 'By planting coffee beneath native forest shade trees, we slow crop maturation naturally. This delays bean ripening, accumulating superior lipid profiles while preserving South Sumatran rainforest wildlife, including endangered pollinators.'
                : lang === 'id'
                ? 'Dengan menanam kopi di bawah tajuk naungan pohon hutan liar asli, kami menunda pematangan buah secara alamiah. Hal ini mengondensasikan minyak esensial biji kopi, sekaligus melestarikan habitat satwa liar Sumatra bagian selatan.'
                : '通过在天然森林的遮阴树下种植咖啡，我们极为自然地延缓了浆果成熟节奏。这让更多的糖类化合物富集在咖啡豆质深处，且坚守了南苏门答腊雨林栖息的多态生物群。'}
            </p>
          </div>

          <div className="lg:col-span-6 relative" id="sustainability-media">
            <div className="aspect-video overflow-hidden rounded border border-[#3B2A24] relative shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=1000"
                alt=" Lampung Coffee Forest Nursery"
                className="object-cover w-full h-full brightness-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121010]/80 via-transparent to-transparent pointer-events-none" />
            </div>
            {/* Visual Gold Bracket overlay */}
            <div className="absolute -bottom-4 -left-4 w-12 h-12 border-l-2 border-b-2 border-[#C59A3D]/40 rounded-bl" />
            <div className="absolute -top-4 -right-4 w-12 h-12 border-r-2 border-t-2 border-[#C59A3D]/40 rounded-tr" />
          </div>

        </div>
      </section>
    </div>
  );
};
