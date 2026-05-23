import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'monogram' | 'header';
  size?: number | string;
  onTextClick?: (e: React.MouseEvent) => void;
}

const rawSvgMarkup = `
<svg width="500" height="500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 4L88.1 26V74L50 96L11.9 74V26L50 4Z" stroke="%23C59A3D" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="50" cy="50" r="38" stroke="%233B2A24" stroke-width="1.5" stroke-dasharray="3 3"/>
  <path d="M32 28H43.5L50 63.5L56.5 28H68L56 72H44L32 28Z" fill="%23C59A3D" stroke="%23C59A3D" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M50 32C52 32 54.5 35 54.5 38.5C54.5 42 52 45 50 45C48 45 45.5 42 45.5 38.5C45.5 35 48 32 50 32Z" fill="%233B2A24"/>
  <path d="M47 34C48 36.5 50 37 53 39.5" stroke="%23C59A3D" stroke-width="1" stroke-linecap="round"/>
</svg>
`.trim();

const svgDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(rawSvgMarkup)}`;

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'full', size = 'auto', onTextClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const svgMarkup = () => (
    <svg
      width={variant === 'monogram' ? size : 42}
      height={variant === 'monogram' ? size : 42}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:rotate-6 cursor-pointer"
    >
      <path
        d="M50 4L88.1 26V74L50 96L11.9 74V26L50 4Z"
        stroke="#C59A3D"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="50" r="38" stroke="#3B2A24" strokeWidth="1.5" strokeDasharray="3 3" />
      <path
        d="M32 28H43.5L50 63.5L56.5 28H68L56 72H44L32 28Z"
        fill="#C59A3D"
        stroke="#C59A3D"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M50 32C52 32 54.5 35 54.5 38.5C54.5 42 52 45 50 45C48 45 45.5 42 45.5 38.5C45.5 35 48 32 50 32Z"
        fill="#3B2A24"
      />
      <path
        d="M47 34C48 36.5 50 37 53 39.5"
        stroke="#C59A3D"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <>
      <div 
        className={`flex items-center gap-3 select-none ${className}`} 
        id="vant-coffee-logo"
      >
        {/* Monogram / Icon Iconography Only triggers logo popup */}
        <div onClick={handleLogoClick} className="cursor-pointer hover:scale-105 active:scale-95 transition-transform shrink-0">
          {svgMarkup()}
        </div>

        {/* Typography layout - Clicking text can lead elsewhere e.g. Home */}
        {variant !== 'monogram' && (
          <div 
            className="flex flex-col justify-center leading-none text-left cursor-pointer hover:opacity-80 transition-opacity" 
            id="logo-text-block"
            onClick={onTextClick}
          >
            <span className="font-poppins text-base md:text-lg font-bold tracking-widest text-[#F5F1EA]">
              VANT <span className="text-[#C59A3D]">COFFEE</span>
            </span>
          </div>
        )}
      </div>

      {/* Pop-up HD Image-only overlay (No details / standard long-press download friendly) */}
      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md cursor-zoom-out"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative relative p-4 flex items-center justify-center max-w-full max-h-full pointer-events-none"
            >
              <img
                src={svgDataUrl}
                alt="Vant Coffee Official Logo"
                className="max-w-[75vw] max-h-[75vh] md:max-w-[420px] md:max-h-[420px] object-contain cursor-pointer pointer-events-auto filter drop-shadow-[0_15px_30px_rgba(197,154,61,0.3)] select-all"
                onClick={(e) => e.stopPropagation()} // Stop propagation so it doesn't close on clicking the logo itself
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
