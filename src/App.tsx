import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSlideshow } from './components/HeroSlideshow';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { OriginFarmView } from './components/OriginFarmView';
import { ProductsView } from './components/ProductsView';
import { ExportView } from './components/ExportView';
import { ShopView } from './components/ShopView';
import { GalleryView } from './components/GalleryView';
import { ArticleView } from './components/ArticleView';
import { ContactView } from './components/ContactView';
import { Language, ActiveView, CartItem, Product } from './types';
import { Logo } from './components/Logo';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('vant_coffee_lang');
    return (saved as Language) || 'id';
  });

  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [aboutSubTab, setAboutSubTab] = useState<'kisah' | 'kebun' | 'produk'>('kisah');

  // Auto-fill product choice when navigating to export inquiry
  const [exportProductChoice, setExportProductChoice] = useState<string>('');

  useEffect(() => {
    // Elegant splash glow screen timeout
    const splashTimer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(splashTimer);
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('vant_coffee_lang', newLang);
  };

  const handleNavigate = (view: ActiveView, initialSubTab?: 'kisah' | 'kebun' | 'produk') => {
    if (view === 'origin-farm') {
      setActiveView('about');
      setAboutSubTab('kebun');
    } else if (view === 'products') {
      setActiveView('about');
      setAboutSubTab('produk');
    } else {
      setActiveView(view);
      if (initialSubTab) {
        setAboutSubTab(initialSubTab);
      } else if (view === 'about') {
        setAboutSubTab('kisah');
      }
    }
    // Smooth scroll to top on section transitions
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInquiryRequest = (productName?: string) => {
    if (productName) {
      if (productName.includes('Green') || productName.includes('hijau') || productName.includes('生豆')) {
        setExportProductChoice('vant-green-bean');
      } else if (productName.includes('Roasted') || productName.includes('Sangrai') || productName.includes('熟豆')) {
        setExportProductChoice('vant-roasted-bean');
      } else {
        setExportProductChoice('vant-ground-coffee');
      }
    } else {
      setExportProductChoice('vant-green-bean');
    }
    handleNavigate('export');
  };

  const handleOrderSample = (product: Product) => {
    // Put item in cart and direct them straight to sample boutique checkout
    const grind = product.category === 'green' ? 'Whole Roasted Beans' : 'Whole Roasted Beans';
    handleAddToCart(product, grind, 1);
    handleNavigate('shop');
  };

  // Cart operations
  const handleAddToCart = (product: Product, grindSize: string, qty: number) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.grindSize === grindSize
      );

      if (existingIdx > -1) {
        const nextCart = [...prev];
        nextCart[existingIdx].quantity += qty;
        return nextCart;
      } else {
        return [...prev, { product, quantity: qty, grindSize }];
      }
    });
  };

  const handleRemoveFromCart = (productId: string, grindSize?: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.grindSize === grindSize))
    );
  };

  const handleUpdateQty = (productId: string, qty: number, grindSize?: string) => {
    if (qty <= 0) {
      handleRemoveFromCart(productId, grindSize);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.grindSize === grindSize
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-[#121010] flex flex-col justify-between selection:bg-[#C59A3D]/40 selection:text-[#F4EFE7]">
      
      {/* Animated Glowing Intro Splash Screen */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="vant-splash-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 bg-[#121010] z-[999] flex flex-col items-center justify-center space-y-4"
            id="vant-splash-screen"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center space-y-4"
            >
              <Logo variant="monogram" size={80} />
              
              <div className="space-y-1">
                <h2 className="font-serif text-xl font-bold tracking-widest text-[#F5F1EA]">
                  VANT COFFEE
                </h2>
                <div className="font-mono text-[9px] tracking-[0.3em] text-[#C59A3D] uppercase font-semibold">
                  Lampung Origin • Export Ready
                </div>
              </div>

              {/* Minimalist modern progress loader */}
              <div className="w-24 h-0.5 bg-[#3B2A24] mx-auto rounded overflow-hidden">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                  className="w-full h-full bg-[#C59A3D]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar
        currentLang={lang}
        onSetLang={handleSetLang}
        activeView={activeView}
        onNavigate={handleNavigate}
        onInquiryClick={() => handleInquiryRequest()}
      />

      {/* Main Content Areas with subtle fade motions */}
      <main className="flex-grow z-10" id="vant-root-viewport">
        
        {activeView === 'home' && (
          <div className="animate-in fade-in duration-700">
            <HeroSlideshow
              lang={lang}
              onExplore={() => handleNavigate('origin-farm')}
              onInquire={() => handleInquiryRequest()}
            />
            
            <HomeView
              lang={lang}
              onNavigate={handleNavigate}
              onInquiryClick={handleInquiryRequest}
            />
          </div>
        )}

        {activeView === 'about' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <AboutView
              lang={lang}
              activeSubTab={aboutSubTab}
              setActiveSubTab={setAboutSubTab}
              onInquiryClick={handleInquiryRequest}
              onOrderSampleClick={handleOrderSample}
            />
          </div>
        )}

        {activeView === 'origin-farm' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <AboutView
              lang={lang}
              activeSubTab="kebun"
              setActiveSubTab={setAboutSubTab}
              onInquiryClick={handleInquiryRequest}
              onOrderSampleClick={handleOrderSample}
            />
          </div>
        )}

        {activeView === 'products' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <AboutView
              lang={lang}
              activeSubTab="produk"
              setActiveSubTab={setAboutSubTab}
              onInquiryClick={handleInquiryRequest}
              onOrderSampleClick={handleOrderSample}
            />
          </div>
        )}

        {activeView === 'export' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <ExportView
              lang={lang}
              initialProductInterest={exportProductChoice}
              onSubmitted={() => setExportProductChoice('')}
            />
          </div>
        )}

        {activeView === 'shop' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <ShopView
              lang={lang}
              cart={cart}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              onUpdateQty={handleUpdateQty}
              onClearCart={handleClearCart}
            />
          </div>
        )}

        {activeView === 'gallery' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <GalleryView lang={lang} />
          </div>
        )}

        {activeView === 'articles' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <ArticleView lang={lang} />
          </div>
        )}

        {activeView === 'contact' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <ContactView lang={lang} />
          </div>
        )}

      </main>

      <Footer currentLang={lang} onNavigate={handleNavigate} />
    </div>
  );
}
