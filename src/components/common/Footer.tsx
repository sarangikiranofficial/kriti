import React from 'react';
import { Link } from 'react-router-dom';
import { BorderBand, OrnamentalDivider } from './Motifs';
import { APP_CONFIG } from '../../config/appConfig';
import { ShieldCheck, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-oxblood text-ivory border-t border-turmeric/30 mt-auto pt-0 pb-10 relative overflow-hidden">
      {/* Fine Single-Colour Jaali Lattice Band */}
      <BorderBand className="w-full h-1.5 opacity-60 mb-10" tone="gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 text-center md:text-left">
          {/* Large Wordmark & Mission Line */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-baseline justify-center md:justify-start gap-3">
              <span className="font-display text-4xl sm:text-5xl font-normal text-ivory tracking-tight">
                {APP_CONFIG.name}
              </span>
              <span className="font-hi text-lg font-medium text-turmeric">
                कृति
              </span>
            </div>
            <p className="font-serif italic text-clay text-sm sm:text-base leading-relaxed max-w-md mx-auto md:mx-0">
              {APP_CONFIG.tagline}
            </p>
            <p className="text-xs text-ivory/70 leading-relaxed max-w-sm mx-auto md:mx-0">
              A dignified, open digital archive and direct connection platform for India's generational craft masters. Zero commission, 100% artist ownership.
            </p>
          </div>

          {/* Cultural Fidelity & Ethics */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="font-serif text-sm uppercase tracking-widest text-turmeric font-semibold flex items-center justify-center md:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-leaf-green" />
              <span>Cultural Charter</span>
            </h4>
            <p className="text-xs text-ivory/75 leading-relaxed">
              Traditional artisans retain 100% intellectual property of their artwork and sacred stories. Cultural context travels with every share. Abstract geometric motifs only; zero AI alteration of sacred lineages.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start space-y-2.5">
            <h4 className="font-serif text-sm uppercase tracking-widest text-turmeric font-semibold mb-1">
              Navigation
            </h4>
            <Link to="/" className="text-xs uppercase tracking-wider text-ivory/80 hover:text-turmeric transition-colors">
              Explore Traditional Masters
            </Link>
            <Link to="/about" className="text-xs uppercase tracking-wider text-ivory/80 hover:text-turmeric transition-colors">
              About &amp; Cultural Ethics
            </Link>
            <Link to="/login" className="text-xs uppercase tracking-wider text-ivory/80 hover:text-turmeric transition-colors">
              Artisan Studio Sign In
            </Link>
          </div>
        </div>

        <OrnamentalDivider className="my-6 opacity-75" />

        {/* Bottom Bar: ART//CODE Hackathon Attribution & Copyright */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/65 gap-3 border-t border-turmeric/15">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>© {new Date().getFullYear()} {APP_CONFIG.name} (कृति). Released under MIT License.</span>
            <span className="hidden sm:inline text-turmeric/40">•</span>
            <span className="text-clay font-medium">Made for ART//CODE Hackathon ("From Craft to Click – Artist Visibility")</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-turmeric/90 font-medium">
            <HeartHandshake className="w-3.5 h-3.5 text-leaf-green" />
            <span>Fair Trade • Zero Middleman • Living Heritage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
