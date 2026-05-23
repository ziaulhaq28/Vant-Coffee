import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Language, ActiveView } from '../types';
import { Menu, X, Languages, ChevronDown, PhoneCall } from 'lucide-react';
import { translations } from '../translations';

interface NavbarProps {
  currentLang: Language;
  onSetLang: (lang: Language) => void;
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  onInquiryClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onSetLang,
  activeView,
  onNavigate,
  onInquiryClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navTranslations = translations[currentLang].nav;

  const menuItems: { id: ActiveView; label: string }[] = [
    { id: 'home', label: navTranslations.home },
    { id: 'about', label: navTranslations.about },
    { id: 'export', label: navTranslations.export },
    { id: 'shop', label: navTranslations.shop },
    { id: 'gallery', label: navTranslations.gallery },
    { id: 'articles', label: navTranslations.articles },
    { id: 'contact', label: navTranslations.contact },
  ];

  const handleLangSelect = (lang: Language) => {
    onSetLang(lang);
    setIsLangDropdownOpen(false);
  };

  const getLangName = (l: Language) => {
    if (l === 'id') return 'Indonesia';
    if (l === 'en') return 'English';
    return '中文';
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#121010]/95 backdrop-blur-md shadow-lg border-b border-[#C59A3D]/15'
          : 'bg-[#121010]/80 backdrop-blur-[10px] border-b border-[#C59A3D]/10'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 h-20 flex items-center justify-between">
        
        {/* Logo brand */}
        <div id="logo-header-trigger" className="select-none">
          <Logo variant="full" onTextClick={() => onNavigate('home')} />
        </div>

        {/* Desktop Link menu */}
        <nav className="hidden lg:flex items-center space-x-1" id="desktop-links">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`px-3 py-2 text-[13px] uppercase tracking-[0.1em] font-sans font-medium transition-colors relative cursor-pointer ${
                activeView === item.id
                  ? 'text-[#C59A3D]'
                  : 'text-[#B7B0A5] hover:text-[#C59A3D]'
              }`}
              id={`nav-item-${item.id}`}
            >
              {item.label}
              {activeView === item.id && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C59A3D] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Right actions: Lang switcher + B2B button */}
        <div className="hidden lg:flex items-center space-x-6" id="heading-actions">
          
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1.5 text-[#B7B0A5] hover:text-[#C59A3D] hover:border-[#C59A3D]/40 transition-colors py-1.5 px-3 border border-[#C59A3D]/10 bg-[#121010]/45 rounded-none text-xs tracking-[0.1em] font-sans font-semibold cursor-pointer focus:outline-none"
              title="Select Language"
            >
              <Languages size={14} className="text-[#C59A3D]" />
              <span className="uppercase">{currentLang}</span>
              <ChevronDown size={11} className="opacity-60" />
            </button>
            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-none bg-[#121010] border border-[#C59A3D]/25 shadow-2xl py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {(['id', 'en', 'zh'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLangSelect(lang)}
                    className={`w-full text-left px-4 py-2 text-xs block hover:bg-[#3B2A24]/40 cursor-pointer ${
                      currentLang === lang ? 'text-[#C59A3D] font-bold' : 'text-[#F5F1EA]'
                    }`}
                  >
                    {getLangName(lang)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Request inquiry CTA button (Gold) */}
          <button
            onClick={onInquiryClick}
            className="px-5 py-2.5 bg-[#C59A3D] text-[#121010] hover:bg-[#F4EFE7] hover:text-[#121010] transition-colors rounded-none text-[11px] uppercase tracking-[0.1em] font-semibold font-sans flex items-center gap-2 shadow-md cursor-pointer"
            id="cta-b2b-inquiry"
          >
            <PhoneCall size={12} />
            <span>{navTranslations.cta}</span>
          </button>
        </div>

        {/* Mobile responsive triggers */}
        <div className="flex lg:hidden items-center space-x-3" id="mobile-control-row">
          {/* Small Quick language selection button */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="p-1 px-2 border border-[#C59A3D]/15 rounded-none text-[#F5F1EA] flex items-center justify-center gap-1 bg-[#121010]/60 cursor-pointer"
              title="Select Language"
            >
              <Languages size={12} className="text-[#C59A3D]" />
              <span className="text-[10px] font-semibold uppercase">{currentLang}</span>
              <ChevronDown size={8} className="opacity-60" />
            </button>
            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-none bg-[#121010] border border-[#C59A3D]/20 shadow-2xl py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {(['id', 'en', 'zh'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLangSelect(lang)}
                    className={`w-full text-left px-4 py-2.5 text-xs block hover:bg-[#3B2A24]/40 cursor-pointer ${
                      currentLang === lang ? 'text-[#C59A3D] font-bold' : 'text-[#F5F1EA]'
                    }`}
                  >
                    {getLangName(lang)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu main trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 border border-[#3B2A24] rounded text-[#F5F1EA] hover:text-[#C59A3D] transition-colors cursor-pointer"
            id="mobile-nav-toggle"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Foldout menu - fixed screen alignment, immune to offset shifts */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed top-20 left-0 right-0 w-full bg-[#121010] border-y border-[#3B2A24]/60 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top duration-300 z-50 shadow-3xl max-h-[calc(100vh-5rem)] overflow-y-auto"
          id="mobile-nav-drawer"
        >
          <div className="flex flex-col space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-3 rounded text-sm uppercase tracking-widest font-sans transition-colors cursor-pointer ${
                  activeView === item.id
                    ? 'bg-[#3B2A24] text-[#C59A3D] font-bold'
                    : 'text-[#F5F1EA] hover:bg-[#3B2A24]/30'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#3B2A24]/60 flex flex-col space-y-3">
            <button
              onClick={() => {
                onInquiryClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-center py-3.5 bg-[#C59A3D] text-[#121010] rounded text-xs uppercase tracking-widest font-bold shadow-lg cursor-pointer"
            >
              {navTranslations.cta}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
