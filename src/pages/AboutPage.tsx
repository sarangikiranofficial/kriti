import React from 'react';
import { ShieldCheck, Sparkles, HeartHandshake, BookOpen, Scale } from 'lucide-react';
import { BrandLogo, CornerOrnament, GeometricDivider } from '../components/common/Motifs';
import { APP_CONFIG } from '../config/appConfig';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center mb-12">
        <BrandLogo className="w-16 h-16 mx-auto mb-4" />
        <span className="text-xs uppercase tracking-wider font-semibold text-terracotta">
          Philosophy &amp; Cultural Charter
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-indigo-ink mt-2">
          About {APP_CONFIG.name}
        </h1>
        <p className="text-charcoal/80 text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
          Bridging the gap between the rural studio and the global audience — ensuring cultural context travels with every piece of traditional Indian art.
        </p>
      </div>

      <div className="space-y-8">
        {/* Core Mission */}
        <section className="bg-warm-ivory border border-terracotta/25 rounded-2xl p-6 sm:p-8 relative shadow-xs">
          <CornerOrnament className="absolute top-2 left-2 w-5 h-5 opacity-40" />
          <CornerOrnament className="absolute bottom-2 right-2 w-5 h-5 rotate-180 opacity-40" />

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-paper-cream text-madder-red border border-terracotta/25 flex-shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-indigo-ink mb-2">
                From Craft to Click: The Mission
              </h2>
              <p className="text-charcoal/80 text-sm leading-relaxed">
                India is home to hundreds of millennia-old living art traditions: Madhubani, Warli, Pattachitra, Kerala Mural, Gond, Kalamkari, Tanjore, and many more. While modern digital marketplaces reduce these sacred traditions to mere commodities, <strong>{APP_CONFIG.name}</strong> places the artist's voice and heritage at the center. An artwork is not just a visual object; it carries prayers, seasonal songs, generational wisdom, and natural pigments prepared from stone, bark, and leaves.
              </p>
            </div>
          </div>
        </section>

        {/* Ethical Tenets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-warm-ivory border border-terracotta/25 rounded-xl p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-3 text-madder-red">
              <Scale className="w-5 h-5" />
              <h3 className="font-serif text-lg font-bold text-indigo-ink">
                100% Artist Ownership
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
              Every artist retains complete copyright and intellectual property rights over their paintings, sculptures, and written narratives. We take zero commission, impose no exclusivity, and display clear attribution on every card and shared image.
            </p>
          </div>

          <div className="bg-warm-ivory border border-terracotta/25 rounded-xl p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-3 text-leaf-green">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="font-serif text-lg font-bold text-indigo-ink">
                No AI Alteration of Sacred Iconography
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
              Traditional art forms often encode sacred geometry, mudras, deity iconography, and ritual purity. Our platform strictly prohibits generating, altering, or synthesizing sacred icons via AI or filters. What you see is hand-drawn truth.
            </p>
          </div>

          <div className="bg-warm-ivory border border-terracotta/25 rounded-xl p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-3 text-terracotta">
              <HeartHandshake className="w-5 h-5" />
              <h3 className="font-serif text-lg font-bold text-indigo-ink">
                Direct Connection &amp; Fair Trade
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
              Patrons and collectors connect directly through WhatsApp and email enquiries. No middlemen extracting margins. The artist sets their own prices, accepts custom commissions, and coordinates workshops directly.
            </p>
          </div>

          <div className="bg-warm-ivory border border-terracotta/25 rounded-xl p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-3 text-indigo-ink">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-serif text-lg font-bold text-indigo-ink">
                Mother Tongue Inclusion
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
              English should not be a barrier to visibility. Artists can voice-record their story in Malayalam, Hindi, or Tamil, display their names in regional scripts, and share multilingual caption cards crafted for their community.
            </p>
          </div>
        </div>

        <GeometricDivider className="my-8" />

        <div className="text-center text-xs text-charcoal/70 bg-paper-cream p-4 rounded-xl border border-terracotta/20">
          <p>
            Have questions or want to partner with grassroots craft clusters? Reach out to us at{' '}
            <a href={`mailto:${APP_CONFIG.contactEmail}`} className="text-madder-red underline font-medium">
              {APP_CONFIG.contactEmail}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
