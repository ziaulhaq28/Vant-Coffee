import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Send, Map } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactViewProps {
  lang: Language;
}

export const ContactView: React.FC<ContactViewProps> = ({ lang }) => {
  const t = translations[lang];
  const contactT = t.contactPage;

  return (
    <div className="pt-24 min-h-screen bg-[#121010]" id="contact-us-view">
      
      {/* Page Title with premium background */}
      <section className="relative py-20 px-4 text-center border-b border-[#3B2A24]/30 overflow-hidden">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1600"
            alt="Correspondence Desk"
            className="w-full h-full object-cover opacity-[0.14] brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121010]/95 via-transparent to-[#121010]" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="font-mono text-xs text-[#C59A3D] uppercase tracking-widest font-bold">
            {lang === 'en' ? 'CORRESPONDENCE DESK' : lang === 'id' ? 'DESK SURAT-MENYURAT' : '万特楠榜全球业务联络处'}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#F5F1EA] mt-2 tracking-tight">
            {contactT.title}
          </h1>
          <p className="font-sans text-sm text-[#B7B0A5]/80 max-w-xl mx-auto mt-3 font-light">
            {contactT.sub}
          </p>
          <div className="w-12 h-0.5 bg-[#C59A3D] mx-auto mt-5" />
        </div>
      </section>

      {/* Main split row layout */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="contact-details-row">
        <div className="grid lg:grid-cols-2 gap-12 text-left">
          
          {/* Left Column: Direct office elements */}
          <div className="space-y-8" id="office-listings-block">
            
            {/* Office 1: Roastery & warehouse */}
            <div className="bg-[#1c1918] p-6 sm:p-8 rounded border border-[#3B2A24]/40 hover:border-[#C59A3D]/25 transition-colors space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#3B2A24]/50 text-[#C59A3D] rounded">
                  <MapPin size={20} />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F5F1EA]">
                  {contactT.headquarters}
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#B7B0A5] leading-relaxed font-light">
                {contactT.headquartersAddr}
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-[#C59A3D]">
                <Clock size={12} />
                <span>GMT+7, Mon - Sat (08:00 - 17:00)</span>
              </div>
            </div>

            {/* Office 2: Panjang Seaport */}
            <div className="bg-[#1c1918] p-6 sm:p-8 rounded border border-[#3B2A24]/40 hover:border-[#C59A3D]/25 transition-colors space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#3B2A24]/50 text-[#C59A3D] rounded">
                  <MapPin size={20} />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F5F1EA]">
                  {contactT.portOffice}
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#B7B0A5] leading-relaxed font-light">
                {contactT.portOfficeAddr}
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-[#C59A3D]">
                <Clock size={12} />
                <span>GMT+7, Mon - Fri (09:00 - 18:00)</span>
              </div>
            </div>

            {/* Inquire touchpoints */}
            <div className="space-y-3" id="quick-touchpoints-block">
              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/6287826749023"
                target="_blank"
                rel="noreferrer"
                className="w-full p-4 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded font-semibold font-sans uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone size={14} />
                <span>{contactT.chatWA}</span>
              </a>

              {/* Email CTA */}
              <a
                href="mailto:trade@vantcoffee.com"
                className="w-full p-4 bg-[#C59A3D]/10 text-[#C59A3D] hover:bg-[#C59A3D]/20 border border-[#C59A3D]/30 rounded font-semibold font-sans uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail size={14} />
                <span>{contactT.emailUs} — trade@vantcoffee.com</span>
              </a>
            </div>

            {/* Social touch */}
            <div className="space-y-2 pt-2" id="contact-socials-wrapper">
              <span className="font-sans text-[10px] text-[#B7B0A5] uppercase tracking-wider font-semibold block">
                {contactT.socialTitle}
              </span>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-[#1c1918] rounded border border-[#3B2A24] text-[#B7B0A5] hover:text-[#C59A3D] hover:border-[#C59A3D]/40 transition-colors cursor-pointer"
                >
                  <Instagram size={15} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-[#1c1918] rounded border border-[#3B2A24] text-[#B7B0A5] hover:text-[#C59A3D] hover:border-[#C59A3D]/40 transition-colors cursor-pointer"
                >
                  <Facebook size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Breathtaking geographical locator vector representation */}
          <div className="bg-[#1c1918] border border-[#3B2A24] rounded-lg p-6 sm:p-8 flex flex-col justify-between" id="geolocator-visual-map">
            <div className="space-y-2 mb-6">
              <span className="font-mono text-xs text-[#C59A3D] uppercase font-bold flex items-center gap-1">
                <Map size={13} />
                <span>SUMATRA REGIONAL COORDINATES</span>
              </span>
              <h3 className="font-serif text-xl font-bold text-[#F5F1EA]">
                Traceable Direct Transit Map
              </h3>
              <p className="font-sans text-xs text-[#B7B0A5] font-light">
                Our operations bridge Kalianda (Mount Tanggamus family plantation & sorting roastery) and Panjang deepwater sea terminal directly, ensuring an uninterrupted custody chain.
              </p>
            </div>

            {/* Decorative Vector Map drawing */}
            <div className="relative border border-[#3B2A24]/60 bg-[#121010] h-64 rounded overflow-hidden flex items-center justify-center p-4">
              
              {/* Map drawing grid */}
              <div className="absolute inset-0 opacity-15 border-2 border-dashed border-[#3B2A24] bg-[linear-gradient(to_right,#3B2A24_1px,transparent_1px),linear-gradient(to_bottom,#3B2A24_1px,transparent_1px)] bg-[size:24px_24px]" />

              {/* Visual topography vectors representing Sumatra Coast */}
              <svg className="absolute inset-0 w-full h-full text-[#3B2A24]/30 pointer-events-none select-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Coastal silhouette */}
                <path d="M 0 40 Q 30 50 45 70 T 80 85 T 100 95 L 100 100 L 0 100 Z" fill="currentColor" />
              </svg>

              {/* Geographic labels inside container */}
              <div className="relative z-10 w-full h-full font-mono text-[9px] text-[#B7B0A5] flex flex-col justify-between p-4">
                
                {/* Mount Tanggamus Plantation Coordinate */}
                <div className="absolute top-1/4 left-1/4 flex gap-2 items-center" id="map-pin-tanggamus">
                  <div className="relative">
                    <span className="absolute inline-flex h-3 w-3 rounded-full bg-[#C59A3D] opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C59A3D]" />
                  </div>
                  <div className="text-left bg-[#1c1918] px-2 py-1 rounded border border-[#3B2A24] space-y-0.5">
                    <span className="text-[#F5F1EA] font-serif block font-bold leading-none">Vant Estate</span>
                    <span className="text-[8px] text-[#B7B0A5] block">Tanggamus, 1100m</span>
                  </div>
                </div>

                {/* Panjang Seaport Dispatch Coordinate */}
                <div className="absolute bottom-1/3 right-1/4 flex gap-2 items-center" id="map-pin-panjang">
                  <div className="relative">
                    <span className="absolute inline-flex h-3 w-3 rounded-full bg-[#C59A3D] opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C59A3D]" />
                  </div>
                  <div className="text-left bg-[#1c1918] px-2 py-1 rounded border border-[#3B2A24] space-y-0.5">
                    <span className="text-[#F5F1EA] font-serif block font-bold leading-none">Panjang Harbor</span>
                    <span className="text-[8px] text-[#B7B0A5] block">Customs Clearance</span>
                  </div>
                </div>

                {/* Logistics line between them */}
                <svg className="absolute inset-0 w-full h-full text-[#C59A3D]/40 pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="33" y1="36" x2="68" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
                </svg>

                <div className="absolute top-4 right-4 bg-[#121010]/95 p-1 px-2 rounded border border-[#3B2A24] text-[8px] text-[#C59A3D]" id="map-port-badge">
                  SEA ROUTE DISPATCH TO PORT
                </div>

              </div>
            </div>

            <div className="mt-4 text-[10px] font-mono text-[#B7B0A5]/60 text-center uppercase tracking-widest leading-none">
              Coordinates: Southern Lampung Ridge (5.42° S, 104.72° E)
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
