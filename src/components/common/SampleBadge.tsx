import React from 'react';
import { Sparkles } from 'lucide-react';
import type { Artist } from '../../types/database.types';

export function isSampleProfile(artist?: Partial<Artist> | null): boolean {
  if (!artist) return false;
  const combined = `${artist.bio || ''} ${artist.slug || ''} ${artist.name || ''}`.toLowerCase();
  return (
    combined.includes('sample profile') ||
    combined.includes('[sample]') ||
    combined.includes('(sample)') ||
    combined.includes('sample artisan') ||
    artist.slug?.startsWith('sample-') === true
  );
}

interface SampleBadgeProps {
  className?: string;
  size?: 'sm' | 'md';
}

export const SampleBadge: React.FC<SampleBadgeProps> = ({
  className = '',
  size = 'sm',
}) => {
  const sizeClasses =
    size === 'md'
      ? 'px-3 py-1 text-xs gap-1.5'
      : 'px-2 py-0.5 text-[10px] gap-1';

  return (
    <span
      className={`inline-flex items-center font-bold tracking-wider uppercase rounded-full bg-antique-gold/25 text-oxblood border border-antique-gold/50 shadow-2xs ${sizeClasses} ${className}`}
      title="This artist profile was created as an authentic demonstration sample for hackathon review"
    >
      <Sparkles className={size === 'md' ? 'w-3.5 h-3.5 text-oxblood' : 'w-2.5 h-2.5 text-oxblood'} />
      <span>Sample profile</span>
    </span>
  );
};
