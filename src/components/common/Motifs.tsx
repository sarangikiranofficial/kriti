import React from 'react';

/**
 * Abstract Geometric Cultural Motifs
 * Inspired by traditional Indian block-print, Kolam geometry, and Warli border patterns.
 * Note: Purely abstract and geometric motifs; no sacred iconography, deity figures, or mudras.
 */

export const BrandLogo: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Kala Katha Emblem"
  >
    <rect width="64" height="64" rx="14" fill="#A63D2F" />
    <path
      d="M32 10C32 10 39 21 39 26C39 29.866 35.866 33 32 33C28.134 33 25 29.866 25 26C25 21 32 10 32 10Z"
      fill="#E0A526"
    />
    <path
      d="M14 36C14 45 22 51 32 51C42 51 50 45 50 36C50 35 49 34 47 34H17C15 34 14 35 14 36Z"
      fill="#F6EEDC"
    />
    <path d="M22 51L20 54H44L42 51" stroke="#F6EEDC" strokeWidth="2" strokeLinecap="round" />
    <circle cx="32" cy="24" r="2.5" fill="#FBF6EA" />
  </svg>
);

export const GeometricDivider: React.FC<{ className?: string }> = ({ className = 'w-full py-4' }) => (
  <div className={`flex items-center justify-center gap-2 overflow-hidden ${className}`} aria-hidden="true">
    <div className="h-px bg-terracotta/30 flex-1 max-w-xs" />
    <div className="flex items-center gap-1.5 text-madder-red">
      <span className="w-1.5 h-1.5 rotate-45 bg-madder-red inline-block" />
      <span className="w-2.5 h-2.5 rotate-45 border-2 border-turmeric bg-warm-ivory inline-block" />
      <span className="w-1.5 h-1.5 rotate-45 bg-madder-red inline-block" />
    </div>
    <div className="h-px bg-terracotta/30 flex-1 max-w-xs" />
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
      <pattern id="blockprint-pattern" width="16" height="8" patternUnits="userSpaceOnUse">
        <path d="M0 4L4 0L8 4L4 8L0 4Z" fill="#A63D2F" />
        <path d="M8 4L12 0L16 4L12 8L8 4Z" fill="#E0A526" />
        <circle cx="4" cy="4" r="1" fill="#FBF6EA" />
        <circle cx="12" cy="4" r="1" fill="#1F2A44" />
      </pattern>
    </defs>
    <rect width="100%" height="8" fill="url(#blockprint-pattern)" />
  </svg>
);

export const CornerOrnament: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`text-madder-red ${className}`}
    aria-hidden="true"
  >
    <path d="M2 22V6C2 3.79086 3.79086 2 6 2H22" stroke="currentColor" strokeWidth="2" />
    <circle cx="6" cy="6" r="2" fill="#E0A526" />
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
      <pattern id="kolam-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="1.5" fill="#C8683F" fillOpacity="0.3" />
        <path d="M0 20 Q10 10 20 20 Q30 30 40 20" stroke="#E0A526" strokeWidth="0.8" fill="none" strokeOpacity="0.25" />
        <path d="M20 0 Q10 10 20 20 Q30 30 20 40" stroke="#A63D2F" strokeWidth="0.8" fill="none" strokeOpacity="0.25" />
      </pattern>
      <linearGradient id="hero-fade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F6EEDC" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#FBF6EA" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#F6EEDC" stopOpacity="1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="#FBF6EA" />
    <rect width="100%" height="100%" fill="url(#kolam-grid)" />
    <rect width="100%" height="100%" fill="url(#hero-fade)" />
  </svg>
);
