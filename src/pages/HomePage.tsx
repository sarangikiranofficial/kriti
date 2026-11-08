import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Palette, MapPin, ArrowRight, UserPlus, Search, Filter, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import {
  AbstractHeroPattern,
  CornerOrnament,
  BrandLogo,
  JharokhaArch,
  GeometricDivider,
} from '../components/common/Motifs';
import { EmptyState } from '../components/common/EmptyState';
import { APP_CONFIG } from '../config/appConfig';
import type { Artist } from '../types/database.types';

export const HomePage: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtForm, setSelectedArtForm] = useState('ALL');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedLanguage, setSelectedLanguage] = useState('ALL');

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('artists')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          setArtists(data as Artist[]);
        }
      } catch {
        setArtists([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  // Distinct filter options extracted dynamically from database records
  const distinctArtForms = useMemo(() => {
    const set = new Set<string>();
    artists.forEach((a) => {
      if (a.art_form) set.add(a.art_form.trim());
    });
    return Array.from(set).sort();
  }, [artists]);

  const distinctStates = useMemo(() => {
    const set = new Set<string>();
    artists.forEach((a) => {
      if (a.location_state) set.add(a.location_state.trim());
    });
    return Array.from(set).sort();
  }, [artists]);

  const distinctLanguages = useMemo(() => {
    const set = new Set<string>();
    artists.forEach((a) => {
      if (a.languages_spoken) {
        a.languages_spoken.forEach((l) => set.add(l.trim()));
      }
    });
    return Array.from(set).sort();
  }, [artists]);

  // Reactive Client Filtering
  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      // Free text search matching
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = artist.name.toLowerCase().includes(query);
        const matchesRegional = artist.name_regional?.toLowerCase().includes(query) ?? false;
        const matchesArtForm = artist.art_form.toLowerCase().includes(query);
        const matchesBio = artist.bio.toLowerCase().includes(query);
        const matchesDistrict = artist.location_district?.toLowerCase().includes(query) ?? false;
        const matchesState = artist.location_state.toLowerCase().includes(query);

        if (!matchesName && !matchesRegional && !matchesArtForm && !matchesBio && !matchesDistrict && !matchesState) {
          return false;
        }
      }

      // Art form filter
      if (selectedArtForm !== 'ALL' && artist.art_form.toLowerCase() !== selectedArtForm.toLowerCase()) {
        return false;
      }

      // State filter
      if (selectedState !== 'ALL' && artist.location_state.toLowerCase() !== selectedState.toLowerCase()) {
        return false;
      }

      // Language filter
      if (selectedLanguage !== 'ALL') {
        const hasLang = artist.languages_spoken?.some(
          (l) => l.toLowerCase() === selectedLanguage.toLowerCase()
        );
        if (!hasLang) return false;
      }

      return true;
    });
  }, [artists, searchQuery, selectedArtForm, selectedState, selectedLanguage]);

  const hasActiveFilters = searchQuery !== '' || selectedArtForm !== 'ALL' || selectedState !== 'ALL' || selectedLanguage !== 'ALL';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedArtForm('ALL');
    setSelectedState('ALL');
    setSelectedLanguage('ALL');
  };

  return (
    <div className="space-y-12">
      {/* Authentic Traditional Hero Layout */}
      <section className="relative overflow-hidden bg-rice-paper border-b border-antique-gold/25 py-16 sm:py-24">
        {/* Subtle Heritage Kolam Lattice Pattern */}
        <div className="absolute inset-0 opacity-45 pointer-events-none">
          <AbstractHeroPattern />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Traditional Arch Motif */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex justify-center mb-3"
          >
            <JharokhaArch className="w-28 h-10 text-antique-gold drop-shadow-2xs" />
          </motion.div>

          {/* Traditional Logo Placeholder & Heritage Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-warm-ivory border border-antique-gold/40 text-deep-maroon mb-6 shadow-2xs"
          >
            <BrandLogo className="w-5 h-5 flex-shrink-0" />
            <span className="font-serif tracking-wide">कृति • The Living Heritage of Indian Art</span>
            <Sparkles className="w-3.5 h-3.5 text-antique-gold" />
          </motion.div>

          {/* Hero Headline with Staggered Fade */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-deep-maroon tracking-tight leading-tight"
          >
            Every Sacred Craft <br className="hidden sm:inline" />
            Has a Living Story.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-5 text-base sm:text-xl text-charcoal/85 max-w-2xl mx-auto leading-relaxed"
          >
            {APP_CONFIG.description}
          </motion.p>

          {/* Heritage Craft Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-terracotta"
          >
            {['Pattachitra', 'Warli', 'Madhubani', 'Kerala Mural', 'Gond', 'Kalamkari', 'Tanjore'].map((craft) => (
              <span
                key={craft}
                className="px-3 py-1 rounded-full bg-warm-ivory/80 border border-antique-gold/30 text-charcoal shadow-2xs"
              >
                {craft}
              </span>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-deep-maroon text-rice-paper font-semibold text-sm hover:bg-deep-maroon/90 border border-antique-gold/30 transition shadow-sm touch-target cursor-pointer hover:scale-102"
            >
              <UserPlus className="w-4 h-4 text-antique-gold" />
              <span>Create Your Artisan Portfolio</span>
            </Link>

            <a
              href="#artists-section"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-warm-ivory border border-antique-gold/40 text-deep-maroon font-semibold text-sm hover:border-deep-maroon transition shadow-2xs touch-target cursor-pointer hover:scale-102"
            >
              <Palette className="w-4 h-4 text-terracotta" />
              <span>Explore Master Artisans</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Discovery & Search Section with Scroll Animation */}
      <section id="artists-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-deep-maroon">
            Discover Traditional Indian Masters
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-2">
            Search authentic folk, tribal, and classical artisans by tradition, geography, and native tongue.
          </p>
          <GeometricDivider className="mt-4" />
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-warm-ivory border border-antique-gold/30 rounded-2xl p-4 sm:p-6 mb-10 shadow-xs"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search artisan, craft, or story..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-antique-gold/30 bg-rice-paper text-xs sm:text-sm text-charcoal focus:bg-warm-ivory focus:ring-1 focus:ring-deep-maroon outline-none"
                aria-label="Search traditional artisans"
              />
            </div>

            {/* Art Form Filter */}
            <div>
              <select
                value={selectedArtForm}
                onChange={(e) => setSelectedArtForm(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-antique-gold/30 bg-rice-paper text-xs sm:text-sm text-charcoal focus:bg-warm-ivory focus:ring-1 focus:ring-deep-maroon outline-none"
                aria-label="Filter by Art Form"
              >
                <option value="ALL">All Traditions &amp; Art Forms</option>
                {distinctArtForms.map((af) => (
                  <option key={af} value={af}>
                    {af}
                  </option>
                ))}
              </select>
            </div>

            {/* State Filter */}
            <div>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-antique-gold/30 bg-rice-paper text-xs sm:text-sm text-charcoal focus:bg-warm-ivory focus:ring-1 focus:ring-deep-maroon outline-none"
                aria-label="Filter by State"
              >
                <option value="ALL">All Indian States</option>
                {distinctStates.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-antique-gold/30 bg-rice-paper text-xs sm:text-sm text-charcoal focus:bg-warm-ivory focus:ring-1 focus:ring-deep-maroon outline-none"
                aria-label="Filter by Language"
              >
                <option value="ALL">All Spoken Languages</option>
                {distinctLanguages.map((lg) => (
                  <option key={lg} value={lg}>
                    {lg}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filters summary */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-antique-gold/20 text-xs text-charcoal/70">
              <span>
                Found <strong>{filteredArtists.length}</strong> matching {filteredArtists.length === 1 ? 'artisan' : 'artisans'}
              </span>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-deep-maroon hover:underline font-semibold"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </motion.div>

        {/* Artist Cards Display with Scroll Animation */}
        {loading ? (
          <div className="py-12 text-center text-charcoal/60 text-sm">
            Discovering traditional masters...
          </div>
        ) : artists.length === 0 ? (
          <EmptyState
            title="No Artisans Yet"
            description="Be the first traditional master to create your digital portfolio on Kriti, record your cultural story via voice, and share your craft with patrons worldwide."
            actionText="Create First Portfolio"
            onAction={() => (window.location.href = '/login')}
            icon={<Palette className="w-6 h-6" />}
          />
        ) : filteredArtists.length === 0 ? (
          <EmptyState
            title="No Artisans Match Your Search"
            description="We couldn't find any traditional artisans matching your selected filters. Try searching for a different craft or clearing your filters."
            actionText="Clear All Filters"
            onAction={clearFilters}
            icon={<Filter className="w-6 h-6" />}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              >
                <Link
                  to={`/a/${artist.slug}`}
                  className="group relative bg-warm-ivory border border-antique-gold/30 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full hover:border-deep-maroon/40"
                >
                  <CornerOrnament className="absolute top-2 left-2 w-4 h-4 opacity-30 group-hover:opacity-60 transition-opacity" />
                  <CornerOrnament className="absolute bottom-2 right-2 w-4 h-4 rotate-180 opacity-30 group-hover:opacity-60 transition-opacity" />

                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full border border-antique-gold/40 overflow-hidden bg-rice-paper flex-shrink-0 shadow-2xs">
                        {artist.portrait_url ? (
                          <img
                            src={artist.portrait_url}
                            alt={artist.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-serif font-bold text-lg text-deep-maroon bg-antique-gold/15">
                            {artist.name.charAt(0)}
                          </div>
                        )}
                      </div>

                      <div>
                        <h3 className="font-serif text-lg font-bold text-deep-maroon group-hover:text-terracotta transition">
                          {artist.name}
                        </h3>
                        {artist.name_regional && (
                          <p className="font-ml-serif text-xs text-terracotta font-medium">
                            {artist.name_regional}
                          </p>
                        )}
                        <span className="inline-block mt-1 text-[11px] font-semibold text-charcoal/80 bg-rice-paper border border-antique-gold/30 px-2 py-0.5 rounded-full">
                          {artist.art_form}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-charcoal/75 line-clamp-3 leading-relaxed mb-4">
                      {artist.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-antique-gold/20 flex items-center justify-between text-xs text-charcoal/70">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-deep-maroon" />
                      <span>{artist.location_state}</span>
                    </span>
                    <span className="flex items-center gap-1 text-deep-maroon font-semibold group-hover:translate-x-1 transition-transform">
                      <span>View Portfolio</span>
                      <ArrowRight className="w-3.5 h-3.5 text-antique-gold" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
