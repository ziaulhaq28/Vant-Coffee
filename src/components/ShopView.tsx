import React, { useState } from 'react';
import { Language, Product, CartItem } from '../types';
import { translations, productsList } from '../translations';
import { ShoppingCart, Heart, Trash2, Check, ArrowRight, Minus, Plus, CreditCard, ChevronRight } from 'lucide-react';

interface ShopViewProps {
  lang: Language;
  cart: CartItem[];
  onAddToCart: (product: Product, grindSize: string, qty: number) => void;
  onRemoveFromCart: (productId: string, grindSize?: string) => void;
  onUpdateQty: (productId: string, qty: number, grindSize?: string) => void;
  onClearCart: () => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  lang,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onUpdateQty,
  onClearCart,
}) => {
  const t = translations[lang];
  const shopT = t.shopPage;
  const productSpecsT = t.productSpecs;

  const [selectedGrinds, setSelectedGrinds] = useState<Record<string, string>>({
    'vant-green-bean': 'Whole Roasted Beans',
    'vant-roasted-bean': 'Whole Roasted Beans',
    'vant-ground-coffee': 'Medium (Pour-Over / Drip)',
  });

  const [quantities, setQuantities] = useState<Record<string, number>>({
    'vant-green-bean': 1,
    'vant-roasted-bean': 1,
    'vant-ground-coffee': 1,
  });

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [successAdd, setSuccessAdd] = useState<string | null>(null);

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutStepSuccess, setCheckoutStepSuccess] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('BCA Transfer');

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  const handleGrindChange = (productId: string, grind: string) => {
    setSelectedGrinds((prev) => ({ ...prev, [productId]: grind }));
  };

  const handleQtyChange = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const handleAddToCart = (product: Product) => {
    const grind = selectedGrinds[product.id] || 'Whole Roasted Beans';
    const qty = quantities[product.id] || 1;
    onAddToCart(product, grind, qty);

    setSuccessAdd(product.id);
    setTimeout(() => {
      setSuccessAdd(null);
    }, 1800);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Compile and formulate WhatsApp message exactly as requested
    const formattedPhone = "6287826749023"; // Indonesia prefix format for 087826749023
    const productSpecsT = t.productSpecs;
    const itemsListText = cart.map(item => {
      const pName = productSpecsT[item.product.nameKey as keyof typeof productSpecsT] || item.product.nameKey;
      return `- ${pName} (${item.grindSize || "Biji Utuh"}) x ${item.quantity} = IDR ${(item.product.price * item.quantity).toLocaleString("id-ID")}`;
    }).join("\n");

    const messageText = `Halo Vant Coffee, saya ingin memesan kopi asli Lampung! Berikut detail pesanan saya:

*INFORMASI PELANGGAN*
- Nama: ${shippingInfo.name}
- Email: ${shippingInfo.email}
- No. WhatsApp/Telp: ${shippingInfo.phone}
- Alamat Pengiriman: ${shippingInfo.address}

*METODE PEMBAYARAN*
- Pilihan: ${selectedPaymentMethod}

*DAFTAR DETAIL PESANAN*
${itemsListText}

*TOTAL PEMBAYARAN*: IDR ${calculateTotal().toLocaleString("id-ID")}

Mohon dikonfirmasi rincian rekening transfer/instruksi pembayaran selanjutnya. Terima kasih!`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodedMessage}`;
    
    // Open in a new tab/window safely so user is not redirected away from our app
    window.open(whatsappUrl, '_blank');

    setCheckoutStepSuccess(true);
    setTimeout(() => {
      setCheckoutStepSuccess(false);
      setShowCheckoutModal(false);
      onClearCart();
    }, 3000);
  };

  return (
    <div className="pt-24 min-h-screen bg-[#121010]" id="direct-shop-view">
      
      {/* Editorial Header with premium background */}
      <section className="relative py-20 px-4 text-center border-b border-[#3B2A24]/30 overflow-hidden">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=1600"
            alt="Vant Coffee Marketplace"
            className="w-full h-full object-cover opacity-[0.12] brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121010]/95 via-transparent to-[#121010]" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="font-mono text-xs text-[#C59A3D] uppercase tracking-widest font-bold">
            {lang === 'en' ? 'Vant Specialty Boutique' : lang === 'id' ? 'Butik Kopi Istimewa Vant' : '万特庄园精品熟豆直邮'}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#F5F1EA] mt-2 tracking-tight">
            {t.shopPreview.title}
          </h1>
          <p className="font-sans text-sm text-[#B7B0A5]/80 max-w-xl mx-auto mt-3 font-light">
            {t.shopPreview.desc}
          </p>
          <div className="w-12 h-0.5 bg-[#C59A3D] mx-auto mt-5" />
        </div>
      </section>

      {/* Main product display blocks + cart sidebar block */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Shop items Catalog (9 columns) */}
          <div className="lg:col-span-8 space-y-8" id="shop-catalog-products-col">
            <div className="grid md:grid-cols-2 gap-6">
              {productsList.map((product) => {
                const label = productSpecsT[product.nameKey as keyof typeof productSpecsT] || product.nameKey;
                const isSaved = wishlist.includes(product.id);
                const itemQty = quantities[product.id] || 1;

                return (
                  <div
                    key={product.id}
                    className="bg-[#1c1918] rounded border border-[#3B2A24]/50 overflow-hidden hover:border-[#C59A3D]/40 transition-all duration-300 flex flex-col justify-between text-left"
                    id={`shop-product-card-${product.id}`}
                  >
                    
                    {/* Thumbnail Display */}
                    <div className="aspect-[4/3] w-full overflow-hidden relative bg-neutral-900">
                      <img
                        src={product.image}
                        alt={label}
                        className="object-cover w-full h-full"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Wishlist Heart overlay */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-[#121010]/85 text-[#F5F1EA] border border-[#3B2A24] hover:text-[#C59A3D] transition-colors cursor-pointer"
                        title={shopT.wishlist}
                      >
                        <Heart size={15} className={isSaved ? 'fill-[#C59A3D] text-[#C59A3D]' : ''} />
                      </button>

                      <div className="absolute bottom-3 left-3 bg-[#121010]/90 px-3 py-1 rounded text-xs font-serif text-[#C59A3D] tracking-wider border border-[#C59A3D]/25">
                        IDR {product.price.toLocaleString('id-ID')} <span className="text-[10px] text-[#B7B0A5] font-sans">/ unit</span>
                      </div>
                    </div>

                    {/* Meta Card Info */}
                    <div className="p-5 flex-1 flex flex-col justify-between" id="shop-card-content">
                      <div className="space-y-3">
                        <h3 className="font-serif text-lg font-bold text-[#F5F1EA] leading-snug">
                          {label}
                        </h3>
                        <p className="font-sans text-xs text-[#B7B0A5]/80 font-light line-clamp-2">
                          {productSpecsT[`${product.id.replace(/-/g, '_')}_desc` as keyof typeof productSpecsT] || productSpecsT[`${product.category}_bean_desc` as keyof typeof productSpecsT]}
                        </p>

                        <div className="text-[11px] font-mono text-[#C59A3D] border-y border-[#3B2A24]/40 py-1.5 flex justify-between">
                          <span>{product.processKey}</span>
                          <span>{product.elevationKey}</span>
                        </div>

                        {/* Grind size dropdown if applicable (only roasted beans or ground) */}
                        {product.category !== 'green' && (
                          <div className="space-y-1 block pt-1.5">
                            <span className="font-sans text-[10px] text-[#B7B0A5] uppercase tracking-wider font-semibold block">
                              {shopT.grindSize}
                            </span>
                            <select
                              value={selectedGrinds[product.id]}
                              onChange={(e) => handleGrindChange(product.id, e.target.value)}
                              className="w-full bg-[#121010] border border-[#3B2A24] rounded px-2.5 py-1.5 text-xs text-[#F5F1EA] outline-none"
                            >
                              <option value="Whole Roasted Beans">{shopT.grindWhole}</option>
                              <option value="Fine Grind (Espresso)">{shopT.grindFine}</option>
                              <option value="Medium Grind (Filter)">{shopT.grindMedium}</option>
                              <option value="Coarse Grind (French Press)">{shopT.grindCoarse}</option>
                            </select>
                          </div>
                        )}
                      </div>

                      {/* Quantity & Add button */}
                      <div className="mt-5 pt-4 border-t border-[#3B2A24]/40 flex items-center justify-between" id="shop-card-actions-wrapper">
                        
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#3B2A24] rounded bg-[#121010]" id="counter-block">
                          <button
                            onClick={() => handleQtyChange(product.id, -1)}
                            className="p-1.5 px-2.5 text-[#B7B0A5] hover:text-[#C59A3D] cursor-pointer"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="px-3 text-xs font-mono text-[#F5F1EA] font-semibold">{itemQty}</span>
                          <button
                            onClick={() => handleQtyChange(product.id, 1)}
                            className="p-1.5 px-2.5 text-[#B7B0A5] hover:text-[#C59A3D] cursor-pointer"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        {/* Add button */}
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="px-4 py-2 bg-[#C59A3D] hover:bg-[#F4EFE7] text-[#121010] rounded text-xs uppercase tracking-widest font-bold flex items-center gap-1.5 cursor-pointer max-w-[130px] w-full justify-center transition-colors"
                        >
                          {successAdd === product.id ? <Check size={12} /> : <ShoppingCart size={11} />}
                          <span>{successAdd === product.id ? 'Added!' : shopT.add}</span>
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cart summary column (4 columns) */}
          <div className="lg:col-span-4 bg-[#1c1918] p-6 rounded border border-[#3B2A24] text-left" id="sidebar-cart-col">
            <h3 className="font-serif text-xl font-bold text-[#F5F1EA] flex items-center gap-2 border-b border-[#3B2A24]/55 pb-4">
              <ShoppingCart className="text-[#C59A3D]" size={18} />
              <span>{t.shopPreview.cartText} ({cart.length})</span>
            </h3>

            {cart.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#B7B0A5] space-y-4" id="cart-empty-fallback">
                <p>{shopT.cartEmpty}</p>
                <div className="w-12 h-0.5 bg-[#3B2A24] mx-auto" />
              </div>
            ) : (
              <div className="flex flex-col justify-between min-h-[300px] h-full" id="sidebar-active-cart">
                
                {/* Cart list */}
                <div className="divide-y divide-[#3B2A24]/40 overflow-y-auto max-h-[340px] pr-1 space-y-3 pt-3">
                  {cart.map((item, idx) => {
                    const itemLabel = productSpecsT[item.product.nameKey as keyof typeof productSpecsT] || item.product.nameKey;
                    return (
                      <div key={idx} className="py-3 flex items-start gap-3 text-xs" id={`cart-detail-row-${idx}`}>
                        <img
                          src={item.product.image}
                          alt={itemLabel}
                          className="w-12 h-12 object-cover rounded border border-[#3B2A24] shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between font-serif text-[#F5F1EA] font-semibold leading-tight">
                            <span className="line-clamp-1">{itemLabel}</span>
                            <button
                              onClick={() => onRemoveFromCart(item.product.id, item.grindSize)}
                              className="text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                          
                          {item.grindSize && (
                            <div className="text-[10px] text-[#C59A3D] font-mono uppercase tracking-wider">
                              {item.grindSize}
                            </div>
                          )}

                          <div className="flex justify-between items-center pt-1">
                            <div className="flex items-center border border-[#3B2A24] rounded bg-[#121010]" id="mini-counter">
                              <button
                                onClick={() => onUpdateQty(item.product.id, item.quantity - 1, item.grindSize)}
                                className="px-1 text-[#B7B0A5]"
                              >
                                <Minus size={9} />
                              </button>
                              <span className="px-2 font-mono text-[10px] text-[#F5F1EA]">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQty(item.product.id, item.quantity + 1, item.grindSize)}
                                className="px-1 text-[#B7B0A5]"
                              >
                                <Plus size={9} />
                              </button>
                            </div>
                            <span className="font-mono text-[#B7B0A5] text-[11px]">
                              IDR {(item.product.price * item.quantity).toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pricing totals & Checkout button */}
                <div className="pt-4 border-t border-[#3B2A24] space-y-4">
                  <div className="flex justify-between font-mono text-sm">
                    <span className="text-[#B7B0A5] uppercase tracking-wider text-xs">Subtotal</span>
                    <span className="text-[#C59A3D] font-bold">
                      IDR {calculateTotal().toLocaleString('id-ID')}
                    </span>
                  </div>

                  <button
                    onClick={() => setShowCheckoutModal(true)}
                    className="w-full py-3 bg-[#C59A3D] text-[#121010] hover:bg-[#F4EFE7] transition-all rounded text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                    id="btn-trigger-checkout"
                  >
                    <span>{t.shopPreview.checkoutBtn}</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </section>

      {/* Checkout Inquiry Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-300" id="checkout-modal-backdrop">
          <div className="bg-[#1c1918] border border-[#C59A3D]/40 max-w-lg w-full rounded-lg overflow-hidden relative shadow-2xl p-6 sm:p-8 text-left" id="checkout-modal-panel">
            
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 p-2 text-[#B7B0A5] hover:text-[#C59A3D] transition-colors cursor-pointer"
            >
              ✕
            </button>

            {checkoutStepSuccess ? (
              <div className="text-center py-8 space-y-4" id="checkout-panel-success">
                <Check className="text-[#C59A3D] mx-auto p-2 border border-[#C59A3D] rounded-full animate-pulse" size={48} strokeWidth={3} />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1EA]">
                  {lang === 'en' ? 'Direct Checkout Requested' : lang === 'id' ? 'Pesanan Pemesanan Diterima!' : '结算直营意向提交成功'}
                </h3>
                <p className="font-sans text-xs text-[#B7B0A5]">
                  {shopT.successOrder}
                </p>
                <div className="w-12 h-1 bg-[#C59A3D] mx-auto mt-4" />
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4" id="checkout-billing-form">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F5F1EA]">
                    {shopT.checkoutTitle}
                  </h3>
                  <p className="font-sans text-xs text-[#B7B0A5] mt-1">
                    {shopT.checkoutSub}
                  </p>
                </div>

                <div className="space-y-3 text-left pt-2 font-sans text-xs">
                  {/* Name field */}
                  <div className="space-y-1 mt-1">
                    <label className="text-[10px] text-[#B7B0A5] uppercase tracking-wider font-semibold">
                      {lang === 'en' ? 'Your Name' : lang === 'id' ? 'Nama Anda' : '您的尊称'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.name}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                      placeholder="e.g. Robert Van"
                      className="w-full bg-[#121010] border border-[#3B2A24] rounded px-3 py-2 text-xs text-[#F5F1EA] focus:border-[#C59A3D] outline-none"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1 mt-1">
                    <label className="text-[10px] text-[#B7B0A5] uppercase tracking-wider font-semibold">
                      {lang === 'en' ? 'Email Address' : lang === 'id' ? 'Alamat Email' : '电子邮箱'} *
                    </label>
                    <input
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      placeholder="e.g. robert@mail.com"
                      className="w-full bg-[#121010] border border-[#3B2A24] rounded px-3 py-2 text-xs text-[#F5F1EA] focus:border-[#C59A3D] outline-none"
                    />
                  </div>

                  {/* Address field */}
                  <div className="space-y-1 mt-1">
                    <label className="text-[10px] text-[#B7B0A5] uppercase tracking-wider font-semibold">
                      {lang === 'en' ? 'Freight Destination Address' : lang === 'id' ? 'Alamat Pengiriman Tujuan' : '目的目的地货运地址'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      placeholder="Specific street name, regional province, zip code"
                      className="w-full bg-[#121010] border border-[#3B2A24] rounded px-3 py-2 text-xs text-[#F5F1EA] focus:border-[#C59A3D] outline-none"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1 mt-1">
                    <label className="text-[10px] text-[#B7B0A5] uppercase tracking-wider font-semibold">
                      {lang === 'en' ? 'WhatsApp Phone number' : lang === 'id' ? 'Nomor Telepon WA' : '联系电话'} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      placeholder="e.g. +62 812-3456-7890"
                      className="w-full bg-[#121010] border border-[#3B2A24] rounded px-3 py-2 text-xs text-[#F5F1EA] focus:border-[#C59A3D] outline-none"
                    />
                  </div>

                  {/* Payment Method Selector Grid */}
                  <div className="space-y-1 mt-2">
                    <label className="text-[10px] text-[#B7B0A5] uppercase tracking-wider font-semibold block">
                      {lang === 'en' ? 'Indonesian Payment Method' : lang === 'id' ? 'Pilihan Metode Pembayaran (Bank & E-Wallet)' : '支付方式 (印度尼西亚银行和电子钱包)'} *
                    </label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {[
                        { id: 'bca', label: 'BCA Transfer', desc: 'Bank BCA' },
                        { id: 'mandiri', label: 'Mandiri Transfer', desc: 'Bank Mandiri' },
                        { id: 'bri', label: 'BRI Transfer', desc: 'Bank BRI' },
                        { id: 'bni', label: 'BNI Transfer', desc: 'Bank BNI' },
                        { id: 'gopay', label: 'GoPay', desc: 'Indonesian E-Wallet' },
                        { id: 'ovo', label: 'OVO', desc: 'Indonesian E-Wallet' },
                        { id: 'dana', label: 'DANA', desc: 'Indonesian E-Wallet' },
                        { id: 'linkaja', label: 'LinkAja', desc: 'Indonesian E-Wallet' },
                      ].map((pay) => (
                        <div
                          key={pay.id}
                          onClick={() => setSelectedPaymentMethod(pay.label)}
                          className={`p-2 border rounded text-left cursor-pointer transition-all ${
                            selectedPaymentMethod === pay.label
                              ? 'border-[#C59A3D] bg-[#3B2A24]/30 text-[#F5F1EA]'
                              : 'border-[#3B2A24] bg-[#121010]/80 text-[#B7B0A5] hover:border-[#C59A3D]/40'
                          }`}
                        >
                          <div className="font-serif text-[11px] font-bold">{pay.label}</div>
                          <div className="text-[8px] opacity-70 font-sans mt-0.5">{pay.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Subtotal preview */}
                <div className="bg-[#121010] p-3 rounded border border-[#3B2A24]/40 flex justify-between items-center text-xs">
                  <span className="text-[#B7B0A5] font-sans">Payment Amount:</span>
                  <span className="font-mono text-[#C59A3D] font-bold">
                    IDR {calculateTotal().toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C59A3D] text-[#121010] hover:bg-[#F4EFE7] transition-all rounded text-xs uppercase tracking-widest font-bold font-sans flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  id="checkout-finalize-btn"
                >
                  <CreditCard size={14} />
                  <span>{lang === 'id' ? 'BUAT PESANAN' : lang === 'en' ? 'BUAT PESANAN (CONFIRM ORDER)' : 'BUAT PESANAN (确认订单)'}</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
