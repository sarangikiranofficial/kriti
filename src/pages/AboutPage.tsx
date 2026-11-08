import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, HeartHandshake, BookOpen, Scale } from 'lucide-react';
import { BrandLogo, CornerOrnament, GeometricDivider, JharokhaArch } from '../components/common/Motifs';
import { APP_CONFIG } from '../config/appConfig';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-2">
          <JharokhaArch className="w-24 h-8 text-antique-gold" />
        </div>
        <BrandLogo className="w-16 h-16 mx-auto mb-4 drop-shadow-sm" />
        <span className="text-xs uppercase tracking-widest font-semibold text-terracotta">
          Philosophy &amp; Cultural Charter
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-normal text-oxblood mt-2">
          About {APP_CONFIG.name} (कृति)
        </h1>
        <p className="text-charcoal/80 text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
          Bridging the gap between the rural studio and the global patron — ensuring cultural context travels with every piece of traditional Indian art.
        </p>
      </motion.div>

      <div className="space-y-8">
        {/* Core Mission */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="bg-warm-ivory border border-antique-gold/30 rounded-2xl p-6 sm:p-8 relative shadow-xs"
        >
          <CornerOrnament className="absolute top-2 left-2 w-5 h-5 opacity-40" />
          <CornerOrnament className="absolute bottom-2 right-2 w-5 h-5 rotate-180 opacity-40" />

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-rice-paper text-oxblood border border-antique-gold/30 flex-shrink-0">
              <BookOpen className="w-6 h-6 text-oxblood" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-oxblood mb-2">
                From Craft to Click: The Mission of Kriti
              </h2>
              <p className="text-charcoal/80 text-sm leading-relaxed">
                In classical Sanskrit and across Indian languages, <strong>Kriti (कृति)</strong> signifies an inspired creation, a masterwork born of sacred devotion and ancestral technique. India is home to hundreds of millennia-old living traditions: Madhubani, Warli, Pattachitra, Kerala Mural, Gond, Kalamkari, Tanjore, and many more. While modern digital marketplaces reduce these sacred traditions to mere commodities, <strong>{APP_CONFIG.name}</strong> places the artisan's voice, heritage, and lineage at the center. An artwork is not just a visual object; it carries prayers, seasonal songs, generational wisdom, and natural pigments prepared from stone, bark, and leaves.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Ethical Tenets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-ivory border border-turmeric/35 rounded-xl p-6 shadow-xs hover:border-oxblood/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3 text-oxblood">
              <Scale className="w-5 h-5 text-oxblood" />
              <h3 className="font-serif text-lg font-bold text-oxblood">
                100% Artisan Ownership
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
              Every master retains complete copyright and intellectual property rights over their paintings, sculptures, and written narratives. We take zero commission, impose no exclusivity, and display clear attribution on every card and shared image.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-ivory border border-turmeric/35 rounded-xl p-6 shadow-xs hover:border-oxblood/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3 text-leaf-green">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="font-serif text-lg font-bold text-oxblood">
                No AI Alteration of Sacred Iconography
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
              Traditional art forms encode sacred geometry, mudras, deity iconography, and ritual purity. Our platform strictly prohibits generating, altering, or synthesizing sacred icons via AI or filters. What you see is hand-drawn truth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-ivory border border-turmeric/35 rounded-xl p-6 shadow-xs hover:border-oxblood/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3 text-terracotta">
              <HeartHandshake className="w-5 h-5" />
              <h3 className="font-serif text-lg font-bold text-oxblood">
                Direct Connection &amp; Fair Trade
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
              Patrons and collectors connect directly through WhatsApp and email enquiries. No middlemen extracting margins. The artist sets their own prices, accepts custom commissions, and coordinates workshops directly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-ivory border border-turmeric/35 rounded-xl p-6 shadow-xs hover:border-oxblood/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3 text-antique-gold">
              <Sparkles className="w-5 h-5 text-antique-gold" />
              <h3 className="font-serif text-lg font-bold text-oxblood">
                Mother Tongue Inclusion
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
              English is never a barrier to visibility. Artisans can voice-record their story in Malayalam, Hindi, or Tamil, display their names in regional scripts, and share multilingual caption cards crafted for their community.
            </p>
          </motion.div>
        </div>

        <GeometricDivider className="my-8" />

        <div className="text-center text-xs text-charcoal/70 bg-rice-paper p-4 rounded-xl border border-antique-gold/25">
          <p>
            Have questions or want to partner with grassroots craft clusters? Reach out to us at{' '}
            <a href={`mailto:${APP_CONFIG.contactEmail}`} className="text-oxblood underline font-semibold">
              {APP_CONFIG.contactEmail}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
