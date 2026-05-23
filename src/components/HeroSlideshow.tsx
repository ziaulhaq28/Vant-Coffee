import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Language } from '../types';

interface HeroSlideshowProps {
  lang: Language;
  onExplore: () => void;
  onInquire: () => void;
}

interface Slide {
  id: number;
  image: string;
  labels: {
    en: { titleFirstLine: string; titleSecondLine: string; subtitle: string; stage: string };
    id: { titleFirstLine: string; titleSecondLine: string; subtitle: string; stage: string };
    zh: { titleFirstLine: string; titleSecondLine: string; subtitle: string; stage: string };
  };
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1600',
    labels: {
      en: {
        titleFirstLine: 'Rooted in Lampung.',
        titleSecondLine: 'Crafted for the World.',
        subtitle: 'Nestled on Mount Tanggamus slopes with rich volcanic soil under shade canopies.',
        stage: 'Stage 01: Volcanic Terroir',
      },
      id: {
        titleFirstLine: 'Tumbuh di Lampung.',
        titleSecondLine: 'Dirancang untuk Dunia.',
        subtitle: 'Tumbuh subur di lereng Gunung Tanggamus berselimut tanah vulkanis kaya mineral.',
        stage: 'Tahap 01: Terroir Gunung Berapi',
      },
      zh: {
        titleFirstLine: '深厚楠榜底蕴。',
        titleSecondLine: '匠造全球品质。',
        subtitle: '坐落于唐加穆斯火山山麓，得天独厚的高海拔火山灰沃土滋养。',
        stage: '第一步：火山风土起源',
      },
    },
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=1600',
    labels: {
      en: {
        titleFirstLine: 'Pure Robusta.',
        titleSecondLine: 'Bold Character.',
        subtitle: 'Single-estate premium robusta seedlings nurtured with natural microclimate biodiversity.',
        stage: 'Stage 02: Cultivation & Care',
      },
      id: {
        titleFirstLine: 'Robusta Murni.',
        titleSecondLine: 'Karakter Tangguh.',
        subtitle: 'Pilihan perkebunan tunggal premium yang dirawat prima di bawah keselarasan ekosistem.',
        stage: 'Tahap 02: Pembibitan & Pelestarian',
      },
      zh: {
        titleFirstLine: '纯正罗布斯塔。',
        titleSecondLine: '大器沉稳性格。',
        subtitle: '精心繁育单源优质树苗，遮阴乔木郁郁葱葱，守护多样生态气候。',
        stage: '第二步：珍稀苗木繁育',
      },
    },
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1600',
    labels: {
      en: {
        titleFirstLine: 'Professionally Grown.',
        titleSecondLine: 'Consistently Delivered.',
        subtitle: 'Guarantees the highest trade grade through selective 100% red cherry picking and meticulous sorting.',
        stage: 'Stage 03: Selective Harvest',
      },
      id: {
        titleFirstLine: 'Ditanam Profesional.',
        titleSecondLine: 'Pengiriman Konsisten.',
        subtitle: 'Memastikan standar perdagangan utama melalui panen selektif ceri merah dan pengerjaan mekanis presisi.',
        stage: 'Tahap 03: Panen Cerdas Terseleksi',
      },
      zh: {
        titleFirstLine: '科学专业种植。',
        titleSecondLine: '稳定安心交付。',
        subtitle: '全手工分批复选，只采收100%饱满深红樱桃，筑就大宗稳定品级保障。',
        stage: '第三步：红果手工采收',
      },
    },
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=1600',
    labels: {
      en: {
        titleFirstLine: 'From Our Farm',
        titleSecondLine: 'to Your Cup.',
        subtitle: 'Directly sourced green coffee and freshly roasted beans from origin estate directly to global port logisitics.',
        stage: 'Stage 04: Standardized Drying',
      },
      id: {
        titleFirstLine: 'Dari Kebun Kami',
        titleSecondLine: 'ke Cangkir Anda.',
        subtitle: 'Kopi hijau mentah dan biji matang langsung dari tanah Lampung siap menuju gerbang pelabuhan dunia.',
        stage: 'Tahap 04: Penjemuran Higienis',
      },
      zh: {
        titleFirstLine: '自营原生态庄园',
        titleSecondLine: '直达大宗杯盏。',
        subtitle: '省去所有中间经销渠道，原产地直发物流，高效率对接到全球港口商务。',
        stage: '第四步：自营出口直发',
      },
    },
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=1600',
    labels: {
      en: {
        titleFirstLine: 'Indonesian Heritage,',
        titleSecondLine: 'International Standard.',
        subtitle: 'Blending Sumatra robusta classic depth with modern quality control for heavy body and rich cacao finishing.',
        stage: 'Stage 05: Export Specifications',
      },
      id: {
        titleFirstLine: 'Warisan Indonesia,',
        titleSecondLine: 'Standar Internasional.',
        subtitle: 'Melestarikan tradisi cita rasa Lampung klasik bernilai warisan dengan kendali mutu ekspor global.',
        stage: 'Tahap 05: Kualitas Berskala Global',
      },
      zh: {
        titleFirstLine: '印度尼西亚印记传承，',
        titleSecondLine: '铸就国际卓越标准。',
        subtitle: '保留传统的印尼风味厚重香气，同时融入现代大宗出口级别质检，香甜黑可可。',
        stage: '第五步：黄金卓越杯测',
      },
    },
  },
];

export const HeroSlideshow: React.FC<HeroSlideshowProps> = ({ lang, onExplore, onInquire }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000); // Slow 6-second transitions
    return () => clearInterval(timer);
  }, []);

  const currentSlide = slides[currentIndex];
  const t = {
    explore: lang === 'en' ? 'Explore Origin' : lang === 'id' ? 'Telusuri Asal-Usul' : '探索庄园源头',
    cta: lang === 'en' ? 'Export Inquiry' : lang === 'id' ? 'Hubungi Perdagangan Ekspor' : '洽谈出口业务',
  };

  return (
    <div className="relative w-full h-[100vh] overflow-hidden bg-immersive-radial" id="hero-slideshow-container">
      {/* Decorative Orbits / Visual Accent Rings from Immersive UI design mockup */}
      <div className="absolute -top-[10%] right-[10%] w-[500px] h-[500px] border border-[#C59A3D]/5 rounded-full z-10 pointer-events-none" />
      <div className="absolute top-[30%] -right-[5%] w-[300px] h-[300px] border border-[#C59A3D]/5 rounded-full z-10 pointer-events-none" />
      <div className="absolute -bottom-[20%] left-[5%] w-[450px] h-[450px] border border-[#C59A3D]/5 rounded-full z-10 pointer-events-none" />

      {/* Background Images with Cross-Fade AnimatePresence */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.labels['en'].titleFirstLine}
              className="object-cover w-full h-full brightness-55 contrast-110"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121010] via-black/40 to-[#121010]/75 z-10" />
      <div className="absolute inset-0 bg-radial from-transparent to-black/55 z-10" />

      {/* Hero Central Text overlay - Staggered animations */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-7xl mx-auto h-full text-left">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#3B2A24]/70 border border-[#C59A3D]/25 rounded-none w-fit mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C59A3D] animate-ping" />
          <span className="font-mono text-[11px] text-[#C59A3D] tracking-[0.2em] font-bold uppercase">
            {currentSlide.labels[lang].stage}
          </span>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold tracking-tight text-[#F5F1EA] leading-[1.1]">
              {currentSlide.labels['en'].titleFirstLine}<br />
              <span className="italic font-normal font-serif text-[#C59A3D]">
                {currentSlide.labels['en'].titleSecondLine}
              </span>
            </h1>
            <p className="font-sans text-sm sm:text-lg lg:text-[18px] text-[#B7B0A5] max-w-2xl font-light leading-[1.6]">
              {currentSlide.labels[lang].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Active slide progress bar in bottom margins */}
      <div className="absolute bottom-8 left-6 right-6 md:left-16 md:right-16 lg:left-24 lg:right-24 z-20 flex justify-between items-center" id="slideshow-pagination">
        <div className="flex gap-2">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className="group flex items-center justify-center p-2 focus:outline-none"
              title={`View Slide ${slide.id}`}
            >
              <div
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  idx === currentIndex ? 'w-10 bg-[#C59A3D]' : 'w-2 bg-[#B7B0A5]/40 group-hover:bg-[#B7B0A5]'
                }`}
              />
            </button>
          ))}
        </div>
        <div className="font-mono text-xs text-[#B7B0A5]/70 tracking-widest uppercase hidden sm:block">
          {lang === 'en' ? 'Direct Farm Export Traceability' : lang === 'id' ? 'Ketertelusuran Perkebunan Mandiri' : '自营庄园全链条溯源'}
        </div>
      </div>
    </div>
  );
};
