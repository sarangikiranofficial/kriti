import React from 'react';

/**
 * Authentic Traditional Indian Heritage Motifs for Kriti (कृति)
 * Bold Editorial "Handmade India" Visual Identity
 * Palette Tokens: Oxblood (#3A1D18), Charcoal (#2B2622), Paper (#F6EEDC),
 * Ivory (#FBF6EA), Madder Red (#A63D2F), Turmeric (#E0A526), Terracotta (#C8683F),
 * Leaf Green (#4F6B3A), Sage (#8A9A78), Soft Clay (#E7CDB4).
 * Note: Purely abstract, geometric, and decorative motifs; no sacred iconography, deity figures or mudras.
 */

export const BrandLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Kriti Emblem"
  >
    {/* Deep Oxblood Foundation */}
    <rect width="64" height="64" rx="14" fill="#3A1D18" />

    {/* Turmeric Concentric Fine Filigree Border */}
    <circle cx="32" cy="32" r="26" stroke="#E0A526" strokeWidth="1" strokeDasharray="2 3" opacity="0.8" />
    <circle cx="32" cy="32" r="23" stroke="#E0A526" strokeWidth="0.75" opacity="0.6" />

    {/* Abstract Botanical / Diya Flame Geometry */}
    <path
      d="M32 10C32 10 39 21 39 27C39 30.866 35.866 34 32 34C28.134 34 25 30.866 25 27C25 21 32 10 32 10Z"
      fill="#E0A526"
    />

    {/* Earthen Paper Base */}
    <path
      d="M15 37C15 46 22.5 51 32 51C41.5 51 49 46 49 37C49 35.5 48 34.5 46 34.5H18C16 34.5 15 35.5 15 37Z"
      fill="#FBF6EA"
    />

    {/* Terracotta / Turmeric Pedestal */}
    <path d="M22 51L20 54H44L42 51" stroke="#E0A526" strokeWidth="1.75" strokeLinecap="round" />

    {/* Center Bindus */}
    <circle cx="32" cy="25" r="2.2" fill="#3A1D18" />
    <circle cx="32" cy="42" r="1.8" fill="#A63D2F" />
  </svg>
);

export const TraditionalLogoBadge: React.FC<{
  className?: string;
  isLight?: boolean;
  size?: 'sm' | 'md' | 'lg';
}> = ({
  className = '',
  isLight = false,
  size = 'md',
}) => {
  const markSize = size === 'lg' ? 'w-11 h-11' : size === 'sm' ? 'w-7 h-7' : 'w-9 h-9';
  const titleSize = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-lg' : 'text-2xl';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <BrandLogo className={`${markSize} flex-shrink-0 drop-shadow-sm`} />
      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <span
            className={`font-display font-normal tracking-tight ${titleSize} ${
              isLight ? 'text-ivory' : 'text-oxblood'
            }`}
          >
            Kriti
          </span>
          <span
            className={`font-hi text-xs font-semibold tracking-wider ${
              isLight ? 'text-turmeric' : 'text-terracotta'
            }`}
          >
            कृति
          </span>
        </div>
        <span
          className={`text-[9px] font-medium tracking-[0.2em] uppercase -mt-0.5 ${
            isLight ? 'text-clay/80' : 'text-charcoal/70'
          }`}
        >
          Living Heritage
        </span>
      </div>
    </div>
  );
};

/**
 * Reusable Arch Frame for traditional architectural portrait/hero presentation
 */
export const ArchFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  hasTurmericTrim?: boolean;
}> = ({
  children,
  className = '',
  innerClassName = '',
  hasTurmericTrim = true,
}) => (
  <div
    className={`relative overflow-hidden ${
      hasTurmericTrim
        ? 'p-1.5 bg-gradient-to-b from-turmeric via-terracotta/40 to-oxblood/60 shadow-md'
        : ''
    } ${className}`}
    style={{
      borderRadius: '50% 50% 16px 16px / 32% 32% 16px 16px',
    }}
  >
    <div
      className={`w-full h-full overflow-hidden ${innerClassName}`}
      style={{
        borderRadius: '50% 50% 12px 12px / 30% 30% 12px 12px',
      }}
    >
      {children}
    </div>
  </div>
);

/**
 * Single-Colour Tone-on-Tone Jaali Lattice Border Band
 * Replaces alternating diamond pattern with a clean, dignified lattice double-rule.
 */
export const BorderBand: React.FC<{
  className?: string;
  tone?: 'gold' | 'oxblood' | 'clay';
}> = ({
  className = 'w-full h-2',
  tone = 'gold',
}) => {
  const strokeColor = tone === 'oxblood' ? '#3A1D18' : tone === 'clay' ? '#E7CDB4' : '#E0A526';
  return (
    <svg
      className={className}
      preserveAspectRatio="none"
      viewBox="0 0 100 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id={`jaali-line-${tone}`} width="24" height="6" patternUnits="userSpaceOnUse">
          {/* Subtle double line with diamond jaali dot in single tone */}
          <line x1="0" y1="1" x2="24" y2="1" stroke={strokeColor} strokeWidth="0.75" strokeOpacity="0.45" />
          <line x1="0" y1="5" x2="24" y2="5" stroke={strokeColor} strokeWidth="0.75" strokeOpacity="0.45" />
          <circle cx="12" cy="3" r="1.1" fill={strokeColor} fillOpacity="0.8" />
          <path d="M4 3L6 1.8L8 3L6 4.2Z" fill={strokeColor} fillOpacity="0.3" />
          <path d="M16 3L18 1.8L20 3L18 4.2Z" fill={strokeColor} fillOpacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="6" fill={`url(#jaali-line-${tone})`} />
    </svg>
  );
};

export const GeometricDivider: React.FC<{ className?: string }> = ({ className = 'w-full py-4' }) => (
  <div className={`flex items-center justify-center gap-2 overflow-hidden ${className}`} aria-hidden="true">
    <div className="h-px bg-gradient-to-r from-transparent via-turmeric/40 to-terracotta/40 flex-1 max-w-xs" />
    <div className="flex items-center gap-1.5 text-oxblood">
      <span className="w-1.5 h-1.5 rotate-45 bg-turmeric inline-block" />
      <span className="w-2.5 h-2.5 rotate-45 border border-turmeric bg-paper inline-block shadow-2xs" />
      <span className="w-1.5 h-1.5 rotate-45 bg-turmeric inline-block" />
    </div>
    <div className="h-px bg-gradient-to-l from-transparent via-turmeric/40 to-terracotta/40 flex-1 max-w-xs" />
  </div>
);

export const OrnamentalDivider: React.FC<{ className?: string }> = ({ className = 'w-full py-6' }) => (
  <div className={`flex items-center justify-center gap-2.5 overflow-hidden ${className}`} aria-hidden="true">
    <div className="h-px bg-gradient-to-r from-transparent via-turmeric/50 to-oxblood/30 flex-1 max-w-xs" />
    <div className="flex items-center gap-2 text-oxblood">
      <span className="w-1.5 h-1.5 rotate-45 bg-turmeric inline-block" />
      <span className="w-2.5 h-2.5 rotate-45 border border-turmeric bg-paper inline-block shadow-2xs" />
      <svg className="w-4 h-4 text-turmeric fill-current inline-block opacity-90" viewBox="0 0 24 24">
        <path d="M12 2C12 2 15 7 15 10C15 11.657 13.657 13 12 13C10.343 13 9 11.657 9 10C9 7 12 2 12 2Z" fill="#E0A526" />
        <path d="M6 14C6 18 8.686 21 12 21C15.314 21 18 18 18 14H6Z" fill="#A63D2F" />
      </svg>
      <span className="w-2.5 h-2.5 rotate-45 border border-turmeric bg-paper inline-block shadow-2xs" />
      <span className="w-1.5 h-1.5 rotate-45 bg-turmeric inline-block" />
    </div>
    <div className="h-px bg-gradient-to-l from-transparent via-turmeric/50 to-oxblood/30 flex-1 max-w-xs" />
  </div>
);

export const CornerOrnament: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`text-turmeric ${className}`}
    aria-hidden="true"
  >
    <path d="M2 22V6C2 3.79086 3.79086 2 6 2H22" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.75" />
    <circle cx="6" cy="6" r="2" fill="#E0A526" />
    <path d="M2 14C5 14 7 12 7 9" stroke="#E0A526" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />
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
      stroke="#E0A526"
      strokeWidth="1.75"
      fill="none"
    />
    <circle cx="60" cy="8" r="1.8" fill="#A63D2F" />
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
        <circle cx="24" cy="24" r="1.2" fill="#E0A526" fillOpacity="0.4" />
        <path d="M0 24 Q12 12 24 24 Q36 36 48 24" stroke="#E0A526" strokeWidth="0.7" fill="none" strokeOpacity="0.25" />
        <path d="M24 0 Q12 12 24 24 Q36 36 24 48" stroke="#3A1D18" strokeWidth="0.7" fill="none" strokeOpacity="0.15" />
        <circle cx="0" cy="0" r="1" fill="#C8683F" fillOpacity="0.2" />
        <circle cx="48" cy="0" r="1" fill="#C8683F" fillOpacity="0.2" />
      </pattern>
      <linearGradient id="hero-fade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F6EEDC" stopOpacity="0.95" />
        <stop offset="50%" stopColor="#FBF6EA" stopOpacity="0.98" />
        <stop offset="100%" stopColor="#F6EEDC" stopOpacity="1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="#F6EEDC" />
    <rect width="100%" height="100%" fill="url(#kolam-grid)" />
    <rect width="100%" height="100%" fill="url(#hero-fade)" />
  </svg>
);

/**
 * Rotating Circular Stamp Badge
 * "Crafted by hand · Shared with the world"
 */
export const RotatingStampBadge: React.FC<{ className?: string }> = ({ className = 'w-28 h-28' }) => (
  <div className={`relative ${className}`} aria-hidden="true">
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full animate-stamp-spin"
      style={{ transformOrigin: 'center center' }}
    >
      <defs>
        <path
          id="stamp-text-circle"
          d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0"
        />
      </defs>
      <circle cx="50" cy="50" r="47" stroke="#E0A526" strokeWidth="1.2" strokeDasharray="3 2" fill="#FBF6EA" fillOpacity="0.96" />
      <circle cx="50" cy="50" r="42" stroke="#3A1D18" strokeWidth="0.75" fill="none" opacity="0.65" />
      <circle cx="50" cy="50" r="23" stroke="#A63D2F" strokeWidth="0.8" fill="#3A1D18" />
      {/* Center geometric star/diya mark */}
      <path d="M50 40 L52.5 47 L58 50 L52.5 53 L50 60 L47.5 53 L42 50 L47.5 47 Z" fill="#E0A526" />
      <circle cx="50" cy="50" r="2" fill="#FBF6EA" />
      <text
        fill="#3A1D18"
        fontSize="7"
        fontWeight="bold"
        letterSpacing="0.12em"
        className="uppercase select-none font-sans"
      >
        <textPath href="#stamp-text-circle" startOffset="0%">
          Crafted by hand · Shared with the world ·
        </textPath>
      </text>
    </svg>
  </div>
);

