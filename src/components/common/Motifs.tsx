import React from 'react';

/**
 * Authentic Traditional Indian Heritage Motifs for Kriti
 * Inspired by Indian block-prints, temple architecture, Kolam geometry, and Warli borders.
 * Palette: Deep Maroon (#8B0000), Antique Gold (#D4AF37), Terracotta (#C8683F), Rice-Paper (#FAF6F0).
 * Note: Purely abstract, geometric, and decorative motifs; no deity figures or sacred iconography.
 */

export const BrandLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Kriti Traditional Emblem"
  >
    {/* Deep Maroon Foundation */}
    <rect width="64" height="64" rx="16" fill="#8B0000" />
    
    {/* Antique Gold Concentric Kolam / Filigree Border */}
    <circle cx="32" cy="32" r="27" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="3 2" />
    <circle cx="32" cy="32" r="24" stroke="#D4AF37" strokeWidth="0.8" />
    
    {/* Antique Gold Diya / Lotus Flame Geometry */}
    <path
      d="M32 9C32 9 40 21 40 27C40 31.418 36.418 35 32 35C27.582 35 24 31.418 24 27C24 21 32 9 32 9Z"
      fill="#D4AF37"
    />
    
    {/* Rice-Paper Earthen Base */}
    <path
      d="M14 37C14 46.5 22 52 32 52C42 52 50 46.5 50 37C50 35.5 49 34.5 47 34.5H17C15 34.5 14 35.5 14 37Z"
      fill="#FAF6F0"
    />
    
    {/* Terracotta Rim and Pedestal */}
    <path d="M21 52L19 55H45L43 52" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
    
    {/* Antique Gold Center Bindus */}
    <circle cx="32" cy="25" r="2.5" fill="#8B0000" />
    <circle cx="32" cy="43" r="2" fill="#8B0000" />
  </svg>
);

export const TraditionalLogoBadge: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <BrandLogo className="w-10 h-10 flex-shrink-0 drop-shadow-sm" />
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <span className="font-serif text-2xl font-bold tracking-tight text-deep-maroon">
          Kriti
        </span>
        <span className="font-hi text-xs text-antique-gold font-semibold tracking-wider">
          कृति
        </span>
      </div>
      <span className="text-[10px] text-terracotta font-medium tracking-widest uppercase">
        Living Heritage
      </span>
    </div>
  </div>
);

export const GeometricDivider: React.FC<{ className?: string }> = ({ className = 'w-full py-4' }) => (
  <div className={`flex items-center justify-center gap-2 overflow-hidden ${className}`} aria-hidden="true">
    <div className="h-px bg-gradient-to-r from-transparent via-antique-gold/40 to-terracotta/40 flex-1 max-w-xs" />
    <div className="flex items-center gap-1.5 text-deep-maroon">
      <span className="w-1.5 h-1.5 rotate-45 bg-deep-maroon inline-block" />
      <span className="w-2.5 h-2.5 rotate-45 border-2 border-antique-gold bg-rice-paper inline-block shadow-2xs" />
      <span className="w-1.5 h-1.5 rotate-45 bg-deep-maroon inline-block" />
    </div>
    <div className="h-px bg-gradient-to-l from-transparent via-antique-gold/40 to-terracotta/40 flex-1 max-w-xs" />
  </div>
);

export const BorderBand: React.FC<{ className?: string }> = ({ className = 'w-full h-3' }) => (
  <svg
    className={className}
    preserveAspectRatio="none"
    viewBox="0 0 100 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <pattern id="kriti-blockprint" width="16" height="8" patternUnits="userSpaceOnUse">
        <path d="M0 4L4 0L8 4L4 8L0 4Z" fill="#8B0000" />
        <path d="M8 4L12 0L16 4L12 8L8 4Z" fill="#D4AF37" />
        <circle cx="4" cy="4" r="1" fill="#FAF6F0" />
        <circle cx="12" cy="4" r="1" fill="#8B0000" />
      </pattern>
    </defs>
    <rect width="100%" height="8" fill="url(#kriti-blockprint)" />
  </svg>
);

export const CornerOrnament: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`text-deep-maroon ${className}`}
    aria-hidden="true"
  >
    <path d="M2 22V6C2 3.79086 3.79086 2 6 2H22" stroke="currentColor" strokeWidth="2" />
    <circle cx="6" cy="6" r="2.2" fill="#D4AF37" />
    <path d="M2 14C5 14 7 12 7 9" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

export const JharokhaArch: React.FC<{ className?: string }> = ({ className = 'w-24 h-12' }) => (
  <svg
    viewBox="0 0 120 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M10 40V18C10 18 25 18 35 12C45 6 55 2 60 2C65 2 75 6 85 12C95 18 110 18 110 18V40"
      stroke="#D4AF37"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="60" cy="8" r="2" fill="#8B0000" />
  </svg>
);

export const MandalaMotif: React.FC<{ className?: string }> = ({ className = 'w-32 h-32' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="50" cy="50" r="46" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.6" />
    <circle cx="50" cy="50" r="38" stroke="#8B0000" strokeWidth="0.8" opacity="0.4" />
    <circle cx="50" cy="50" r="26" stroke="#D4AF37" strokeWidth="1" opacity="0.7" />
    <path
      d="M50 4L54 24L74 24L58 36L64 56L50 44L36 56L42 36L26 24L46 24Z"
      stroke="#D4AF37"
      strokeWidth="0.8"
      fill="#D4AF37"
      fillOpacity="0.08"
    />
    <circle cx="50" cy="50" r="4" fill="#8B0000" />
  </svg>
);

export const AbstractHeroPattern: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 800 600"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <pattern id="kolam-grid" width="48" height="48" patternUnits="userSpaceOnUse">
        <circle cx="24" cy="24" r="1.5" fill="#D4AF37" fillOpacity="0.45" />
        <path d="M0 24 Q12 12 24 24 Q36 36 48 24" stroke="#D4AF37" strokeWidth="0.8" fill="none" strokeOpacity="0.3" />
        <path d="M24 0 Q12 12 24 24 Q36 36 24 48" stroke="#8B0000" strokeWidth="0.8" fill="none" strokeOpacity="0.25" />
        <circle cx="0" cy="0" r="1" fill="#C8683F" fillOpacity="0.3" />
        <circle cx="48" cy="0" r="1" fill="#C8683F" fillOpacity="0.3" />
      </pattern>
      <linearGradient id="hero-fade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FAF6F0" stopOpacity="0.92" />
        <stop offset="50%" stopColor="#FFFDF9" stopOpacity="0.96" />
        <stop offset="100%" stopColor="#FAF6F0" stopOpacity="1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="#FAF6F0" />
    <rect width="100%" height="100%" fill="url(#kolam-grid)" />
    <rect width="100%" height="100%" fill="url(#hero-fade)" />
  </svg>
);
