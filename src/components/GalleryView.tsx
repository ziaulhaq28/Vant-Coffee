import React, { useState } from 'react';
import { Language, GalleryItem } from '../types';
import { translations, galleryItems } from '../translations';
import { ZoomIn, X, ImageIcon, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryViewProps {
  lang: Language;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ lang }) => {
  const t = translations[lang];
  const galleryT = t.galleryPage;

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: galleryT.catAll },
    { id: 'farm', label: galleryT.catFarm },
    { id: 'harvest', label: galleryT.catHarvest },
    { id: 'processing', label: galleryT.catProcessing },
    { id: 'roasting', label: galleryT.catRoasting },
    { id: 'packaging', label: galleryT.catPackaging },
    { id: 'experience', label: galleryT.catExperience },
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <div className="pt-24 min-h-screen bg-[#121010]" id="documentary-gallery-view">
      
      {/* Editorial Title with premium background */}
      <section className="relative py-20 px-4 text-center border-b border-[#3B2A24]/30 overflow-hidden">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1600"
            alt="Documentary Archives"
            className="w-full h-full object-cover opacity-[0.15] brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121010]/95 via-transparent to-[#121010]" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="font-mono text-xs text-[#C59A3D] uppercase tracking-widest font-bold">
            {lang === 'en' ? 'DOCUMENTARY ARCHIVES' : lang === 'id' ? 'ARSIP DOKUMENTASI' : '万特庄园实地映像档案'}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#F5F1EA] mt-2 tracking-tight">
            {galleryT.title}
          </h1>
          <p className="font-sans text-sm text-[#B7B0A5]/80 max-w-xl mx-auto mt-3 font-light leading-relaxed">
            {galleryT.sub}
          </p>
          <div className="w-12 h-0.5 bg-[#C59A3D] mx-auto mt-5" />
        </div>
      </section>

      {/* Category filters bar */}
      <section className="py-8 px-4 max-w-7xl mx-auto" id="gallery-category-filter">
        <div className="flex flex-wrap items-center justify-center gap-2" id="gallery-pill-row">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded text-xs font-semibold tracking-wider font-sans uppercase transition-all border cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#C59A3D] text-[#121010] border-[#C59A3D]'
                  : 'bg-[#1c1918] text-[#B7B0A5] border-[#3B2A24]/50 hover:border-[#C59A3D]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid Images Gallery Layout */}
      <section className="py-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="gallery-photo-masonry">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group bg-[#1c1918] rounded overflow-hidden border border-[#3B2A24]/40 hover:border-[#C59A3D]/40 transition-all duration-300 relative aspect-video cursor-pointer"
              id={`gallery-item-${item.id}`}
            >
              <img
                src={item.image}
                alt={item.titleKey}
                className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 brightness-90 group-hover:brightness-75"
                referrerPolicy="no-referrer"
              />
              
              {/* Fade hover descriptors layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 text-left">
                <span className="font-mono text-[9px] text-[#C59A3D] uppercase tracking-widest block font-bold">
                  {item.category}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#F5F1EA] mt-1">
                  {item.titleKey}
                </h3>
                <p className="font-sans text-[11px] text-[#B7B0A5] mt-1 line-clamp-1 font-light">
                  {item.descriptionKey}
                </p>
                
                <div className="absolute top-4 right-4 p-2 bg-[#C59A3D] text-[#121010] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                  <ZoomIn size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal overlay view */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300"
          id="lightbox-backdrop"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-[#121010] border border-[#C59A3D]/30 max-w-4xl w-full rounded overflow-hidden relative shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()} // Stop bubble up
            id="lightbox-modal-content"
          >
            {/* Main Picture box */}
            <div className="aspect-video w-full bg-neutral-900 overflow-hidden relative">
              <img
                src={selectedImage.image}
                alt={selectedImage.titleKey}
                className="object-cover w-full h-full"
                referrerPolicy="no-referrer"
              />
              
              {/* Exit button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/80 text-[#F5F1EA] hover:text-[#C59A3D] border border-white/10 transition-colors cursor-pointer"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Bottom annotations block */}
            <div className="p-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="p-1 px-2.5 bg-[#3B2A24] text-[#C59A3D] font-mono text-[9px] uppercase tracking-widest font-bold rounded">
                  {selectedImage.category}
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA]">
                {selectedImage.titleKey}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#B7B0A5] leading-relaxed font-light">
                {selectedImage.descriptionKey}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
