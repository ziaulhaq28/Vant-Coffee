import React, { useState } from 'react';
import { Language, InquiryFormState } from '../types';
import { translations } from '../translations';
import { ShieldCheck, FileCheck, Award, FileSpreadsheet, Ship, CheckCircle, Scale } from 'lucide-react';
import { motion } from 'motion/react';

interface ExportViewProps {
  lang: Language;
  initialProductInterest?: string;
  onSubmitted?: () => void;
}

export const ExportView: React.FC<ExportViewProps> = ({
  lang,
  initialProductInterest = '',
  onSubmitted,
}) => {
  const t = translations[lang];
  const pageT = t.exportPage;
  const commonReady = t.exportReady;

  const [formState, setFormState] = useState<InquiryFormState>({
    companyName: '',
    fullName: '',
    email: '',
    phone: '',
    country: '',
    businessType: 'importer',
    productInterest: initialProductInterest || 'vant-green-bean',
    volumeRequirement: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [inquiryId, setInquiryId] = useState('');

  const [dlState, setDlState] = useState(false);

  const accreditations = [
    { label: pageT.doc1, authority: 'Ministry of Trade Indonesian Gov' },
    { label: pageT.doc2, authority: 'Agricultural Quarantine Agency' },
    { label: pageT.doc3, authority: 'Majelis Ulama Indonesia' },
    { label: pageT.doc4, authority: 'SGS International Laboratories' },
    { label: pageT.doc5, authority: 'Port Authority of Panjang South Sumatra' },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate professional trading API dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      const generatedId = `VNT-${Math.floor(100000 + Math.random() * 900000)}-EXP`;
      setInquiryId(generatedId);
      if (onSubmitted) {
        onSubmitted();
      }
    }, 1800);
  };

  const triggerProfileDownload = () => {
    setDlState(true);
    // Simulate a secure PDF file generate flow
    setTimeout(() => {
      setDlState(false);
      alert(
        lang === 'id'
          ? 'Company Profile PDF Vant Coffee berhasil disiapkan & diunduh (Simulasi File Ekspor)'
          : 'Vant Coffee Trade Profile PDF successfully prepared & dispatched for download.'
      );
    }, 1500);
  };

  return (
    <div className="pt-24 min-h-screen bg-[#121010]" id="export-support-view">
      
      {/* Editorial Title with premium background */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 text-center border-b border-[#3B2A24]/30 overflow-hidden">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600"
            alt="Global Export Logistics"
            className="w-full h-full object-cover opacity-[0.15] brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121010]/95 via-transparent to-[#121010]" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="font-mono text-xs text-[#C59A3D] uppercase tracking-widest font-bold">
            B2B GLOBAL SHIPMENT READY
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#F5F1EA] mt-3 tracking-tight">
            {pageT.topTitle}
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#B7B0A5] max-w-2xl mx-auto mt-4 font-light leading-relaxed">
            {pageT.topSub}
          </p>
          <div className="w-16 h-1 bg-[#C59A3D] mx-auto mt-6" />
        </div>
      </section>

      {/* Two-Column split: Accreditations on left, Form on Right */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Certifications & Checklist */}
          <div className="lg:col-span-5 space-y-8 text-left" id="export-trade-standards-brief">
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#C59A3D] uppercase tracking-wider font-semibold block">
                {lang === 'en' ? 'Trading Security Standards' : lang === 'id' ? 'Legalitas Penjamin Mutu Kontainer' : '进出口资质信誉担保'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F1EA] tracking-tight">
                {commonReady.title}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#B7B0A5] leading-relaxed font-light">
                {commonReady.subtitle}
              </p>
            </div>

            {/* Custom check indicators */}
            <ul className="space-y-3 font-sans text-xs sm:text-sm text-[#B7B0A5] font-light" id="export-bullet-metrics">
              <li className="flex items-start gap-2.5">
                <ShieldCheck size={18} className="text-[#C59A3D] shrink-0 mt-0.5" />
                <span>{commonReady.bullet1}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck size={18} className="text-[#C59A3D] shrink-0 mt-0.5" />
                <span>{commonReady.bullet2}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck size={18} className="text-[#C59A3D] shrink-0 mt-0.5" />
                <span>{commonReady.bullet3}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck size={18} className="text-[#C59A3D] shrink-0 mt-0.5" />
                <span>{commonReady.bullet4}</span>
              </li>
            </ul>

            {/* Accreditations Badge card */}
            <div className="bg-[#1c1918] p-6 rounded border border-[#3B2A24]/40 space-y-4" id="accreditation-badges-card">
              <h3 className="font-serif text-base font-bold text-[#F5F1EA] flex items-center gap-2">
                <Award className="text-[#C59A3D]" size={18} />
                <span>{pageT.docsTitle}</span>
              </h3>
              
              <div className="divide-y divide-[#3B2A24]/40">
                {accreditations.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs" id={`badge-item-${idx}`}>
                    <span className="font-sans text-[#F4EFE7] font-medium">{item.label}</span>
                    <span className="font-mono text-[9px] text-[#B7B0A5] bg-[#121010] p-1 px-2 rounded border border-[#3B2A24]/30 uppercase">
                      {item.authority}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Profile PDF button */}
            <div className="pt-2">
              <button
                onClick={triggerProfileDownload}
                className={`w-full py-4 bg-[#3B2A24] text-[#C59A3D] hover:bg-[#C59A3D] hover:text-[#121010] border border-[#C59A3D]/40 rounded font-semibold font-sans uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  dlState ? 'opacity-50' : ''
                }`}
                disabled={dlState}
                id="btn-download-company-profile"
              >
                <FileSpreadsheet size={16} />
                <span>{dlState ? 'Compiling PDF File...' : commonReady.cta}</span>
              </button>
            </div>
          </div>

          {/* Right: Submission Inquiry Form */}
          <div className="lg:col-span-7 bg-[#1c1918] p-6 sm:p-10 rounded-lg border border-[#3B2A24]" id="export-form-block">
            {submitSuccess ? (
              <div className="space-y-6 text-center py-10" id="form-success-wrapper">
                <CheckCircle className="text-[#C59A3D] mx-auto animate-bounce" size={48} />
                <h3 className="font-serif text-2xl font-bold text-[#F5F1EA]">
                  {lang === 'en'
                    ? 'Inquiry Dispatched Successfully'
                    : lang === 'id'
                    ? 'Permintaan Ekspor Terkirim Resmi'
                    : '向出口代表发送官方询价函成功'}
                </h3>
                
                {/* Custom structured receipt details */}
                <div className="bg-[#121010] max-w-sm mx-auto p-4 rounded border border-[#C59A3D]/40 text-left space-y-3">
                  <div className="flex justify-between text-[11px] font-mono border-b border-[#3B2A24] pb-2">
                    <span className="text-[#B7B0A5]">INQUIRY REF NO</span>
                    <span className="text-[#C59A3D] font-bold">{inquiryId}</span>
                  </div>
                  <div className="flex justify-between text-xs font-sans">
                    <span className="text-[#B7B0A5]">Company:</span>
                    <span className="text-[#F5F1EA] font-semibold">{formState.companyName}</span>
                  </div>
                  <div className="flex justify-between text-xs font-sans">
                    <span className="text-[#B7B0A5]">Representative:</span>
                    <span className="text-[#F5F1EA] font-semibold">{formState.fullName}</span>
                  </div>
                  <div className="flex justify-between text-xs font-sans">
                    <span className="text-[#B7B0A5]">Est. Volume:</span>
                    <span className="text-[#F5F1EA] font-semibold">{formState.volumeRequirement || 'Not Specified'}</span>
                  </div>
                </div>

                <p className="font-sans text-xs text-[#B7B0A5] max-w-md mx-auto leading-relaxed">
                  {lang === 'en'
                    ? 'Our South Sumatra maritime logistics desk will review your requirements and follow up with detailed FOB/CIF pricing schedules via the provided email.'
                    : lang === 'id'
                    ? 'Petugas logistik pelabuhan laut kami di Panjang akan langsung memeriksa kelembaban tanah dan ketersediaan batch untuk menyampaikan prospektus FOB/CIF resmi.'
                    : '万特楠榜海运物流事务代表将在12小时内，根据植物检验规范和实时班让现货指数向您的邮箱发出形式合同以及正式报价单。'}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
                  <a
                    href={`https://wa.me/6287826749023?text=${encodeURIComponent(
                      `Halo Vant Coffee, saya ingin mengajukan B2B ekspor:\n` +
                      `*Ref No:* ${inquiryId}\n` +
                      `*Perusahaan:* ${formState.companyName}\n` +
                      `*Nama:* ${formState.fullName}\n` +
                      `*Email:* ${formState.email}\n` +
                      `*Kebutuhan Volume:* ${formState.volumeRequirement || 'Tidak ditentukan'}\n` +
                      `*Negara Tujuan:* ${formState.country}\n` +
                      `*Produk:* ${formState.productInterest}\n` +
                      `*Pesan:* ${formState.message || '-'}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#25D366] text-black rounded text-xs uppercase tracking-widest font-bold font-sans flex items-center justify-center gap-2 cursor-pointer hover:bg-[#25D366]/80 transition-colors"
                  >
                    <span>{lang === 'en' ? 'Chat Export Support' : lang === 'id' ? 'Hubungi Penjualan Ekspor' : '联系出口代表'}</span>
                  </a>

                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setFormState({
                        companyName: '',
                        fullName: '',
                        email: '',
                        phone: '',
                        country: '',
                        businessType: 'importer',
                        productInterest: 'vant-green-bean',
                        volumeRequirement: '',
                        message: '',
                      });
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#C59A3D]/20 text-[#C59A3D] border border-[#C59A3D]/40 rounded text-xs uppercase tracking-widest font-bold font-sans cursor-pointer hover:bg-[#C59A3D]/30 transition-colors"
                  >
                    {lang === 'en' ? 'Submit Another Specification' : lang === 'id' ? 'Ajukan Dokumen Baru' : '再次提交询价'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5" id="export-interactive-form">
                <div className="text-left">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F5F1EA]">
                    {pageT.formTitle}
                  </h3>
                  <p className="font-sans text-xs text-[#B7B0A5] mt-1 font-light">
                    {pageT.formSub}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-left" id="export-form-inputs">
                  
                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] text-[#B7B0A5] uppercase tracking-wider font-semibold block">
                      {pageT.fieldCompany} *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      value={formState.companyName}
                      onChange={handleInputChange}
                      placeholder="e.g. Alliance Specialty Roasters Ltd"
                      className="w-full bg-[#121010] border border-[#3B2A24] rounded px-3 py-2.5 text-xs text-[#F5F1EA] focus:border-[#C59A3D] focus:outline-none"
                    />
                  </div>

                  {/* Representative Full Name */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] text-[#B7B0A5] uppercase tracking-wider font-semibold block">
                      {lang === 'en' ? 'Contact Full name' : lang === 'id' ? 'Lengkap Perwakilan' : '业务代表姓名'} *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formState.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Jean-Laurent Dubois"
                      className="w-full bg-[#121010] border border-[#3B2A24] rounded px-3 py-2.5 text-xs text-[#F5F1EA] focus:border-[#C59A3D] focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] text-[#B7B0A5] uppercase tracking-wider font-semibold block">
                      {lang === 'en' ? 'Professional Email' : lang === 'id' ? 'Surat Elektronik (Email)' : '工作邮箱'} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="procurement@company.com"
                      className="w-full bg-[#121010] border border-[#3B2A24] rounded px-3 py-2.5 text-xs text-[#F5F1EA] focus:border-[#C59A3D] focus:outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] text-[#B7B0A5] uppercase tracking-wider font-semibold block">
                      {lang === 'en' ? 'Telephone / WhatsApp' : lang === 'id' ? 'Nomor Telepon / WA' : '联系电话 / WhatsApp'} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formState.phone}
                      onChange={handleInputChange}
                      placeholder="+41 22 789 4433"
                      className="w-full bg-[#121010] border border-[#3B2A24] rounded px-3 py-2.5 text-xs text-[#F5F1EA] focus:border-[#C59A3D] focus:outline-none"
                    />
                  </div>

                  {/* Destination Country */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] text-[#B7B0A5] uppercase tracking-wider font-semibold block">
                      {pageT.fieldCountry} *
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formState.country}
                      onChange={handleInputChange}
                      placeholder="e.g. Switzerland / Geneva Port"
                      className="w-full bg-[#121010] border border-[#3B2A24] rounded px-3 py-2.5 text-xs text-[#F5F1EA] focus:border-[#C59A3D] focus:outline-none"
                    />
                  </div>

                  {/* Type of Business Select */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] text-[#B7B0A5] uppercase tracking-wider font-semibold block">
                      {pageT.fieldType} *
                    </label>
                    <select
                      name="businessType"
                      value={formState.businessType}
                      onChange={handleInputChange}
                      className="w-full bg-[#121010] border border-[#3B2A24] rounded px-3 py-2.5 text-xs text-[#F5F1EA] focus:border-[#C59A3D] focus:outline-none"
                    >
                      <option value="importer">Importer / Green Bean Broker</option>
                      <option value="roaster">Commercial / Specialty Roastery</option>
                      <option value="distributor">Wholesaler & Foodservice Distributor</option>
                      <option value="retailer">Cafe Chain or Gourmet Shop</option>
                    </select>
                  </div>

                  {/* Target Product spec */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] text-[#B7B0A5] uppercase tracking-wider font-semibold block">
                      {pageT.fieldProduct} *
                    </label>
                    <select
                      name="productInterest"
                      value={formState.productInterest}
                      onChange={handleInputChange}
                      className="w-full bg-[#121010] border border-[#3B2A24] rounded px-3 py-2.5 text-xs text-[#F5F1EA] focus:border-[#C59A3D] focus:outline-none"
                    >
                      <option value="vant-green-bean">Premium Green Bean Robusta Lampung (FCL / LCL Bags)</option>
                      <option value="vant-roasted-bean">Single-Origin Roasted (Medium-Dark / Cafe standard)</option>
                      <option value="vant-ground-coffee">Fine-Ground Fine Robusta (Traditional Pack / Retail)</option>
                    </select>
                  </div>

                  {/* Volume requirements */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] text-[#B7B0A5] uppercase tracking-wider font-semibold block">
                      {pageT.fieldVolume} *
                    </label>
                    <input
                      type="text"
                      name="volumeRequirement"
                      required
                      value={formState.volumeRequirement}
                      onChange={handleInputChange}
                      placeholder="e.g. 19 Metric Tons (1 Full FCL)"
                      className="w-full bg-[#121010] border border-[#3B2A24] rounded px-3 py-2.5 text-xs text-[#F5F1EA] focus:border-[#C59A3D] focus:outline-none"
                    />
                  </div>

                  {/* Custom Message input */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-sans text-[10px] text-[#B7B0A5] uppercase tracking-wider font-semibold block">
                      {pageT.fieldMessage}
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder="Enter specific screen sizes, moisture limits, shipping lines preference, or sample shipment addresses..."
                      className="w-full bg-[#121010] border border-[#3B2A24] rounded px-3 py-2.5 text-xs text-[#F5F1EA] focus:border-[#C59A3D] focus:outline-none resize-none"
                    />
                  </div>

                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 bg-[#C59A3D] text-[#121010] hover:bg-[#F4EFE7] disabled:opacity-50 transition-colors rounded text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer ${
                    isSubmitting ? 'opacity-50' : ''
                  }`}
                  id="btn-submit-export-form"
                >
                  <Ship size={14} className={isSubmitting ? 'animate-spin' : ''} />
                  <span>{isSubmitting ? 'Initiating Port Terminal Clearance...' : pageT.btnSubmit}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Shipping terms diagram */}
      <section className="py-20 px-4 bg-[#1c1918] border-t border-[#3B2A24]/30" id="incoterms-framework">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F1EA]">
              {lang === 'en' ? 'Flexible Marine Freight Terms' : lang === 'id' ? 'Sistem Pengapalan Ekspor Pelabuhan' : '灵活海运到港条款'}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#B7B0A5] mt-2 font-light">
              We process ocean containers out of the Panjang Seaport terminal (Bandar Lampung), South Sumatra, under international Standard Shipping Protocols.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 text-left" id="incoterms-card-row">
            <div className="bg-[#121010] p-6 rounded border border-[#3B2A24]/40">
              <span className="font-mono text-xs text-[#C59A3D] font-bold">FOB PANJANG PORT</span>
              <h3 className="font-serif text-lg text-[#F5F1EA] mt-1">Free On Board</h3>
              <p className="font-sans text-xs text-[#B7B0A5] mt-2 leading-relaxed font-light">
                Vant Coffee clears customs at South Lampung and deposits the cargo over the maritime carrier ship rail. Liability transfers immediately after ship-rail embarkation.
              </p>
            </div>
            
            <div className="bg-[#121010] p-6 rounded border border-[#3B2A24]/40">
              <span className="font-mono text-xs text-[#C59A3D] font-bold">CIF TERM DELIVERY</span>
              <h3 className="font-serif text-lg text-[#F5F1EA] mt-1">Cost, Insurance & Freight</h3>
              <p className="font-sans text-xs text-[#B7B0A5] mt-2 leading-relaxed font-light">
                Vant handles all ocean passage rates and marine transit damage insurance to your custom port of destination (e.g. Rotterdam, Tokyo, Los Angeles).
              </p>
            </div>

            <div className="bg-[#121010] p-6 rounded border border-[#3B2A24]/40">
              <span className="font-mono text-xs text-[#C59A3D] font-bold">CUSTOM LCL SAMPLES</span>
              <h3 className="font-serif text-lg text-[#F5F1EA] mt-1">Less-than-Container Load</h3>
              <p className="font-sans text-xs text-[#B7B0A5] mt-2 leading-relaxed font-light">
                To run initial roaster trial runs, we export smaller palletized 20-bag or 10-bag wooden crate deliveries directly to boutique facilities worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
