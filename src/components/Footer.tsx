import React, { useState } from 'react';
import { Logo } from './Logo';
import { Language, ActiveView } from '../types';
import { translations } from '../translations';
import { Send, Check, Mail, Lock } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onNavigate: (view: ActiveView) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onNavigate }) => {
  const t = translations[currentLang];
  const footerT = t.footer;
  const navT = t.nav;

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setSuccess(false), 5000);
    }, 1200);
  };

  const footerLinks: { label: string; view: ActiveView }[] = [
    { label: navT.home, view: 'home' },
    { label: navT.about, view: 'about' },
    { label: navT.export, view: 'export' },
    { label: navT.shop, view: 'shop' },
    { label: navT.gallery, view: 'gallery' },
    { label: navT.articles, view: 'articles' },
    { label: navT.contact, view: 'contact' },
  ];

  return (
    <footer id="main-footer" className="bg-[#121010]/95 border-t border-[#C59A3D]/10 pt-16 pb-12 text-left relative overflow-hidden">
      {/* Background watermark accent */}
      <div className="absolute left-6 bottom-4 text-white/[0.01] pointer-events-none text-9xl font-serif select-none hidden lg:block">
        VANT
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Top footer row: Brand, Quick links, Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-[#C59A3D]/10 pb-12">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4" id="footer-logo-panel">
            <Logo variant="full" />
            <p className="font-sans text-xs sm:text-sm text-[#B7B0A5] leading-relaxed font-light max-w-sm">
              {footerT.desc}
            </p>
            <div className="font-serif text-sm italic text-[#C59A3D]">
              &ldquo;Rooted in Lampung. Crafted for the World.&rdquo;
            </div>
          </div>

          {/* Nav Links (3 cols) */}
          <div className="md:col-span-3 space-y-4" id="footer-links-panel">
            <h4 className="font-serif text-sm tracking-wider text-[#F5F1EA] uppercase font-bold">
              {currentLang === 'en' ? 'Direct Navigation' : currentLang === 'id' ? 'Navigasi Langsung' : '快捷系统导航'}
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2">
              {footerLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate(link.view)}
                  className="text-left text-xs text-[#B7B0A5] hover:text-[#C59A3D] transition-colors leading-none cursor-pointer py-1 block"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter Signup (4 cols) */}
          <div className="md:col-span-4 space-y-4" id="footer-newsletter-panel">
            <div className="space-y-1.5">
              <h4 className="font-serif text-sm tracking-wider text-[#F5F1EA] uppercase font-bold flex items-center gap-1.5">
                <Mail size={14} className="text-[#C59A3D]" />
                <span>{footerT.newsletter}</span>
              </h4>
              <p className="font-sans text-xs text-[#B7B0A5]/80 font-light leading-relaxed">
                {footerT.newsletterSub}
              </p>
            </div>

            {success ? (
              <div className="p-3 bg-[#3B2A24]/50 border border-[#C59A3D]/20 rounded-none text-xs text-[#C59A3D] font-sans flex items-center gap-2 animate-in fade-in duration-300">
                <Check size={14} />
                <span>{footerT.newsletterSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2" id="footer-newsletter-form">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={footerT.newsletterPlaceholder}
                  className="bg-[#1c1918] border border-[#C59A3D]/20 text-xs px-3 py-2.5 rounded-none text-[#F5F1EA] placeholder-[#B7B0A5]/40 flex-1 outline-none focus:border-[#C59A3D]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 bg-[#C59A3D] text-[#121010] hover:bg-[#F4EFE7] font-semibold text-xs rounded-none transition-colors flex items-center justify-center cursor-pointer ${
                    isSubmitting ? 'opacity-50' : ''
                  }`}
                  title="Subscribe"
                >
                  <Send size={13} className={isSubmitting ? 'animate-spin' : ''} />
                </button>
              </form>
            )}

            <div className="flex items-center gap-1.5 text-[10px] text-[#B7B0A5]/50 pt-1">
              <Lock size={9} />
              <span>Conforms to GDPR/Indonesia Maritime Privacy Legislation.</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-[#B7B0A5]/60 gap-4" id="footer-copyright-panel">
          <div>
            &copy; {new Date().getFullYear()} Vant Coffee Lampung. {footerT.rights}
          </div>
          
          <div className="flex gap-4 font-mono text-[9px] uppercase tracking-wider">
            <span>TERMS of TRADE</span>
            <span>•</span>
            <span>PHYTOSANITARY LEGISLATION</span>
            <span>•</span>
            <span>PRIVACY DECK</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
