import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo, GeometricDivider } from './Motifs';
import { APP_CONFIG } from '../../config/appConfig';
import { Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-warm-ivory border-t border-antique-gold/25 mt-auto pt-10 pb-8 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GeometricDivider className="mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          {/* Brand Info */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-3">
              <BrandLogo className="w-8 h-8" />
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl font-bold text-deep-maroon">
                  {APP_CONFIG.name}
                </span>
                <span className="font-hi text-xs text-antique-gold font-semibold">
                  कृति
                </span>
              </div>
            </div>
            <p className="text-sm text-charcoal/80 leading-relaxed max-w-sm mx-auto md:mx-0">
              {APP_CONFIG.tagline}. Preserving living artisanal traditions for generations to come.
            </p>
          </div>

          {/* Cultural Fidelity & Ethics */}
          <div>
            <h4 className="font-serif text-base font-semibold text-deep-maroon mb-2.5 flex items-center justify-center md:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-leaf-green" />
              <span>Cultural Fidelity &amp; Ethical Charter</span>
            </h4>
            <p className="text-xs text-charcoal/75 leading-relaxed">
              Traditional artisans retain 100% intellectual property of their artwork and narratives. Zero AI alteration of sacred iconography. Cultural context travels with every share.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-sm space-y-2">
            <h4 className="font-serif text-base font-semibold text-deep-maroon mb-1">
              Navigation
            </h4>
            <Link to="/" className="text-charcoal/80 hover:text-deep-maroon transition">
              Explore Traditional Masters
            </Link>
            <Link to="/about" className="text-charcoal/80 hover:text-deep-maroon transition">
              About &amp; Cultural Ethics
            </Link>
            <Link to="/login" className="text-charcoal/80 hover:text-deep-maroon transition">
              Artisan Studio Sign In
            </Link>
          </div>
        </div>

        <div className="pt-6 border-t border-antique-gold/20 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal/60 gap-4">
          <p>© {new Date().getFullYear()} {APP_CONFIG.name}. Built for the ART//CODE Hackathon.</p>
          <p className="flex items-center gap-1">
            Rooted in Indian Heritage <Heart className="w-3.5 h-3.5 text-deep-maroon fill-current" /> Free &amp; Open
          </p>
        </div>
      </div>
    </footer>
  );
};
