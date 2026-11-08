import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Palette,
  MapPin,
  ArrowRight,
  UserPlus,
  Search,
  Filter,
  X,
  Mic,
  Share2,
  Mail,
  Sparkles,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import {
  ArchFrame,
  BorderBand,
  CornerOrnament,
  OrnamentalDivider,
} from '../components/common/Motifs';
import { EmptyState } from '../components/common/EmptyState';
import { SampleBadge, isSampleProfile } from '../components/common/SampleBadge';
import { APP_CONFIG } from '../config/appConfig';
import type { Artist } from '../types/database.types';
 
/**
 * AnimatedCounter: Accessible count-up triggered on viewport entry.
 * Strictly displays real database counts; hides when count is 0.
 */
const AnimatedCounter: React.FC<{ value: number; label: string; suffix?: string }> = ({
  value,
  label,
  suffix = '+',
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
 
  useEffect(() => {
    if (!inView || value <= 0) {
      setDisplayValue(0);
      return;
    }
    let start = 0;
    const duration = 1100;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = value / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, value]);
 
  if (value <= 0) return null;
 
  return (
    <div
      ref={ref}
      className="text-center p-6 sm:p-8 bg-ivory rounded-2xl border border-turmeric/35 shadow-xs frame-mat flex flex-col justify-center"
    >
      <div className="font-display text-4xl sm:text-5xl lg:text-6xl text-oxblood font-normal tracking-tight">
        {displayValue}
        <span className="text-turmeric text-3xl sm:text-4xl ml-1">{suffix}</span>
      </div>
      <div className="text-xs sm:text-sm font-semibold tracking-wider text-charcoal/80 uppercase mt-2 font-serif">
        {label}
      </div>
    </div>
  );
};
 
export const HomePage: React.FC = () => {
  const location = useLocation();
 
  // Scroll to the filter area for /#artist-filters, otherwise to the top of the page
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
        return () => clearTimeout(t);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);
 
  const [artists, setArtists] = useState<Artist[]>([]);
  const [artworkCount, setArtworkCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
 
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtForm, setSelectedArtForm] = useState('ALL');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedLanguage, setSelectedLanguage] = useState('ALL');
 
  useEffect(() => {
    const fetchArtistsAndCounts = async () => {
      try {
        setLoading(true);
        // 1. Fetch artists ordered by creation date
        const { data, error } = await supabase
          .from('artists')
          .select('*')
          .order('created_at', { ascending: false });
 
        if (!error && data) {
          setArtists(data as Artist[]);
        }
 
        // 2. Query exact artwork count from database for live numbers
        const { count, error: artworkError } = await supabase
          .from('artworks')
          .select('id', { count: 'exact', head: true });
 
        if (!artworkError && count !== null) {
          setArtworkCount(count);
        }
      } catch {
        setArtists([]);
      } finally {
        setLoading(false);
      }
    };
 
    fetchArtistsAndCounts();
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
 
  // Reactive Client Filtering (Search query + 3 dropdowns)
  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
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
 
      if (selectedArtForm !== 'ALL' && artist.art_form.toLowerCase() !== selectedArtForm.toLowerCase()) {
        return false;
      }
 
      if (selectedState !== 'ALL' && artist.location_state.toLowerCase() !== selectedState.toLowerCase()) {
        return false;
      }
 
      if (selectedLanguage !== 'ALL') {
        const hasLang = artist.languages_spoken?.some(
          (l) => l.toLowerCase() === selectedLanguage.toLowerCase()
        );
        if (!hasLang) return false;
      }
 
      return true;
    });
  }, [artists, searchQuery, selectedArtForm, selectedState, selectedLanguage]);
 
  const hasActiveFilters =
    searchQuery !== '' || selectedArtForm !== 'ALL' || selectedState !== 'ALL' || selectedLanguage !== 'ALL';
 
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedArtForm('ALL');
    setSelectedState('ALL');
    setSelectedLanguage('ALL');
  };
 
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* =========================================================================
          1. HERO SECTION (Desktop 12-Column Magazine Grid / Full Viewport Height)
         ========================================================================= */}
      <section className="relative min-h-[calc(100vh-4.5rem)] flex flex-col justify-center border-b border-turmeric/30 pt-4 pb-12 sm:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Asymmetric Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 7 Columns: Giant Wordmark, Tagline, CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8 text-left">
              {/* Category label with thin heritage rule */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3"
              >
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-terracotta font-serif">
                  The Living Heritage of Indian Art
                </span>
                <span className="h-px bg-turmeric/40 flex-1 max-w-[120px]" />
              </motion.div>
 
              {/* Giant Wordmark: 12-18vw font-display */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="relative"
              >
                <div className="flex items-baseline gap-4 sm:gap-6 flex-wrap">
                  <h1 className="font-display text-[clamp(4.2rem,15vw,11.5rem)] leading-[0.88] text-oxblood font-normal tracking-tight select-none">
                    Kriti
                  </h1>
                  <span className="font-hi text-[clamp(2rem,6vw,4.5rem)] text-turmeric/90 font-semibold tracking-wider">
                    कृति
                  </span>
                </div>
              </motion.div>
 
              {/* Tagline in two lines with Fraunces italic accent word */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="space-y-1.5"
              >
                <p className="font-serif text-xl sm:text-2xl md:text-3xl text-oxblood/90 leading-tight">
                  Every sacred craft holds an ancestral voice.
                </p>
                <p className="text-base sm:text-xl text-charcoal/80 font-serif leading-snug">
                  Stories woven in pigment, clay and loom,{' '}
                  <span className="italic font-serif text-madder-red">shared with patrons worldwide.</span>
                </p>
              </motion.div>
 
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm sm:text-base text-charcoal/75 max-w-xl leading-[1.6]"
              >
                {APP_CONFIG.description}
              </motion.p>
 
              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
              >
                <Link
                  to="/login"
                  className="btn-stitched-madder inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm shadow-md touch-target cursor-pointer transition transform hover:-translate-y-0.5"
                >
                  <UserPlus className="w-4 h-4 text-turmeric" />
                  <span>Create your portfolio</span>
                </Link>
 
                <a
                  href="#artist-filters"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-ivory border border-turmeric/50 text-oxblood font-semibold text-sm hover:border-madder-red hover:bg-paper transition touch-target cursor-pointer shadow-2xs"
                >
                  <Palette className="w-4 h-4 text-terracotta" />
                  <span>Explore artists</span>
                </a>
              </motion.div>
            </div>
 
            {/* Right 5 Columns: Cusped Arch Image Frame with Overlapping Stamp */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-4 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative w-full max-w-md"
              >
                {/* Cusped Jharokha Arch Frame */}
                <ArchFrame
                  className="w-full aspect-3/4 sm:aspect-4/5 shadow-2xl border border-turmeric/60"
                  innerClassName="bg-oxblood"
                >
                  <div className="relative w-full h-full">
                    <img
                      src="/images/hero/traditional-art.jpg"
                      alt="Traditional Indian folk and tribal artwork with natural mineral pigments"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                    {/* Indigo/Oxblood Gradient Overlay behind caption text only */}
                    <div className="absolute inset-0 bg-gradient-to-t from-oxblood/90 via-oxblood/30 to-transparent flex items-end p-5">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-turmeric font-semibold block font-serif">
                          Preserving Living Heritage
                        </span>
                        <p className="text-xs text-ivory/95 font-serif line-clamp-2">
                          Mineral pigments, palm leaves, handspun cotton and ancestral patience.
                        </p>
                      </div>
                    </div>
                  </div>
                </ArchFrame>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
 
      {/* =========================================================================
          2. ART FORM MARQUEE (Dynamic Ticker of Distinct Art Forms from DB)
         ========================================================================= */}
      {distinctArtForms.length > 0 && (
        <section className="relative overflow-hidden py-3 bg-ivory border-y border-turmeric/35 shadow-2xs">
          <div className="animate-marquee whitespace-nowrap">
            {/* Duplicated list to create continuous seamless looping ticker */}
            {[...distinctArtForms, ...distinctArtForms, ...distinctArtForms].map((artForm, idx) => (
              <span
                key={`${artForm}-${idx}`}
                className="inline-flex items-center mx-5 text-xs sm:text-sm font-semibold tracking-wider uppercase font-serif text-oxblood/90 select-none"
              >
                <span>{artForm}</span>
                <span className="ml-5 text-turmeric/80 text-xs">❖</span>
              </span>
            ))}
          </div>
        </section>
      )}
 
      {/* =========================================================================
          3. EDITORIAL COLLAGE: "Stories from the loom, the brush and the lathe"
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Collage Images (Overlapping Arch & Matted Frames) */}
          <div className="lg:col-span-7 relative order-2 lg:order-1">
            <div className="relative h-[380px] sm:h-[480px] w-full max-w-lg mx-auto">
              {/* Image 1: Main Arch Frame (Editorial Textile/Painting) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.7 }}
                className="absolute top-0 left-0 w-[58%] aspect-3/4 z-10 -rotate-2 hover:rotate-0 transition-transform duration-500 shadow-xl"
              >
                <ArchFrame className="w-full h-full border border-turmeric/60">
                  <img
                    src="/images/editorial/editorial-1.jpg"
                    alt="Master artisan handcrafting heritage folk painting"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </ArchFrame>
                <div className="absolute bottom-2 left-3 bg-oxblood/85 backdrop-blur-xs text-ivory text-[10px] px-2.5 py-0.5 rounded font-serif border border-turmeric/40">
                  The Living Brush
                </div>
              </motion.div>
 
              {/* Image 2: Secondary Offset Frame */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="absolute top-10 right-2 w-[52%] aspect-4/5 z-20 rotate-3 hover:rotate-0 transition-transform duration-500 shadow-xl frame-mat"
              >
                <img
                  src="/images/editorial/editorial-2.jpg"
                  alt="Traditional handloom weaving and mineral pigment textile art"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-2 right-3 bg-oxblood/85 backdrop-blur-xs text-ivory text-[10px] px-2.5 py-0.5 rounded font-serif border border-turmeric/40">
                  Rhythms of the Loom
                </div>
              </motion.div>
 
              {/* Image 3: Accent Mat Frame at bottom left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-4 left-[24%] w-[44%] aspect-square z-30 -rotate-1 hover:rotate-0 transition-transform duration-500 shadow-2xl frame-mat border-2 border-turmeric/50"
              >
                <img
                  src="/images/editorial/editorial-3.jpg"
                  alt="Ancestral pottery, woodcraft and metal casting techniques"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 bg-oxblood/90 text-turmeric text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-serif">
                  Craft Lineage
                </div>
              </motion.div>
            </div>
          </div>
 
          {/* Editorial Text & Pull Quote */}
          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-terracotta font-serif">
                01 — The Heritage
              </span>
              <span className="h-px bg-turmeric/35 flex-1 max-w-[80px]" />
            </div>
 
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-oxblood leading-tight tracking-tight">
              Stories from the loom, the brush and the lathe.
            </h2>
 
            {/* Oversized Fraunces Italic Pull Quote (Static UI Copy) */}
            <div className="border-l-2 border-turmeric/70 pl-5 py-2">
              <blockquote className="font-serif italic text-xl sm:text-2xl text-oxblood/85 leading-snug">
                “An authentic Indian craft is never merely an object; it is living geometry, oral memory passed from hand to hand across unbroken centuries.”
              </blockquote>
              <p className="text-xs text-terracotta font-semibold uppercase tracking-wider mt-3 font-serif">
                — Kriti Heritage Charter
              </p>
            </div>
 
            <p className="text-xs sm:text-sm text-charcoal/80 leading-[1.6]">
              Across India&apos;s hamlets, master artisans safeguard rare techniques that machine automation cannot replicate. Kriti bridges this sacred world to modern digital patrons, ensuring every story, symbol, and artisan receives sovereign attribution.
            </p>
          </div>
        </div>
      </section>
 
      {/* =========================================================================
          4. THE IDEA IN 3 STEPS (Big Numerals 01, 02, 03 & Abstract SVG Icons)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-terracotta font-serif">
              02 — The Process
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-oxblood">
            From Living Tradition to Direct Patronage
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/75 mt-3 max-w-lg mx-auto leading-relaxed">
            A frictionless platform built respectfully around the artisan&apos;s natural habits, regional voice, and generational dignity.
          </p>
          <OrnamentalDivider className="mt-4" />
        </div>
 
        {/* 3-Column Desktop Grid / 1-Column Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 01 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5 }}
            className="relative bg-ivory rounded-2xl p-7 border border-turmeric/35 shadow-xs frame-mat flex flex-col justify-between"
          >
            <CornerOrnament className="absolute top-2 left-2 w-4 h-4 opacity-40" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-4xl sm:text-5xl text-turmeric/80 font-normal">
                  01
                </span>
                <div className="w-12 h-12 rounded-xl bg-paper border border-turmeric/40 flex items-center justify-center text-oxblood shadow-2xs">
                  <Mic className="w-5 h-5 text-madder-red" />
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-oxblood mb-2">
                Speak your story
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/75 leading-[1.6]">
                Artisans speak directly in their native tongue—Malayalam, Hindi, Tamil, or English. Kriti automatically generates structured biographies and cultural motifs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-turmeric/20 text-[11px] font-semibold text-terracotta uppercase tracking-wider font-serif">
              Voice-First Storytelling
            </div>
          </motion.div>
 
          {/* Step 02 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative bg-ivory rounded-2xl p-7 border border-turmeric/35 shadow-xs frame-mat flex flex-col justify-between"
          >
            <CornerOrnament className="absolute top-2 left-2 w-4 h-4 opacity-40" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-4xl sm:text-5xl text-turmeric/80 font-normal">
                  02
                </span>
                <div className="w-12 h-12 rounded-xl bg-paper border border-turmeric/40 flex items-center justify-center text-oxblood shadow-2xs">
                  <Share2 className="w-5 h-5 text-terracotta" />
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-oxblood mb-2">
                Share your craft
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/75 leading-[1.6]">
                Generate high-resolution PNG share cards with cultural context, bilingual captions, and printable Craft Tag QR badges for parcel packaging and gallery exhibitions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-turmeric/20 text-[11px] font-semibold text-terracotta uppercase tracking-wider font-serif">
              Craft Tag &amp; Share Cards
            </div>
          </motion.div>
 
          {/* Step 03 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative bg-ivory rounded-2xl p-7 border border-turmeric/35 shadow-xs frame-mat flex flex-col justify-between"
          >
            <CornerOrnament className="absolute top-2 left-2 w-4 h-4 opacity-40" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-4xl sm:text-5xl text-turmeric/80 font-normal">
                  03
                </span>
                <div className="w-12 h-12 rounded-xl bg-paper border border-turmeric/40 flex items-center justify-center text-oxblood shadow-2xs">
                  <Mail className="w-5 h-5 text-oxblood" />
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-oxblood mb-2">
                Be found &amp; contacted
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/75 leading-[1.6]">
                Each artisan receives a permanent public portfolio link (<code className="text-[11px] bg-paper px-1 rounded">/a/:slug</code>) with honeypot-protected direct enquiry channels and zero commission fees.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-turmeric/20 text-[11px] font-semibold text-terracotta uppercase tracking-wider font-serif">
              Zero Intermediary Fees
            </div>
          </motion.div>
        </div>
      </section>
 
      {/* =========================================================================
          5. FEATURED ARTISTS / DISCOVERY (Asymmetric Grid + Hover Lift/Tilt)
         ========================================================================= */}
      <section id="discover-masters" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-terracotta font-serif">
              03 — Discover
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-oxblood">
            Discover Traditional Indian Masters
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/75 mt-2">
            Search authentic folk, tribal, and classical artisans by tradition, geography, and native tongue.
          </p>
          <BorderBand className="w-48 h-2 mx-auto mt-4" tone="gold" />
        </div>
 
        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          id="artist-filters"
          className="scroll-mt-24 bg-ivory border border-turmeric/35 rounded-2xl p-4 sm:p-6 mb-10 shadow-xs frame-mat"
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-turmeric/30 bg-paper text-xs sm:text-sm text-charcoal focus:bg-ivory focus:ring-1 focus:ring-oxblood outline-none touch-target"
                aria-label="Search traditional artisans"
              />
            </div>
 
            {/* Art Form Filter */}
            <div>
              <select
                value={selectedArtForm}
                onChange={(e) => setSelectedArtForm(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-turmeric/30 bg-paper text-xs sm:text-sm text-charcoal focus:bg-ivory focus:ring-1 focus:ring-oxblood outline-none touch-target"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-turmeric/30 bg-paper text-xs sm:text-sm text-charcoal focus:bg-ivory focus:ring-1 focus:ring-oxblood outline-none touch-target"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-turmeric/30 bg-paper text-xs sm:text-sm text-charcoal focus:bg-ivory focus:ring-1 focus:ring-oxblood outline-none touch-target"
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
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-turmeric/20 text-xs text-charcoal/70">
              <span>
                Found <strong>{filteredArtists.length}</strong> matching {filteredArtists.length === 1 ? 'artisan' : 'artisans'}
              </span>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-madder-red hover:underline font-semibold cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </motion.div>
 
        {/* Artist Cards Display */}
        {loading ? (
          <div className="py-16 text-center text-charcoal/70 text-sm font-serif">
            Discovering traditional masters from the database...
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArtists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                className="h-full"
              >
                <Link
                  to={`/a/${artist.slug}`}
                  className="group relative bg-ivory border border-turmeric/35 rounded-2xl p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full hover:border-oxblood/50 hover:-translate-y-1 hover:rotate-[0.3deg] frame-mat touch-target"
                >
                  <CornerOrnament className="absolute top-2 left-2 w-4 h-4 opacity-30 group-hover:opacity-75 transition-opacity" />
                  <CornerOrnament className="absolute bottom-2 right-2 w-4 h-4 rotate-180 opacity-30 group-hover:opacity-75 transition-opacity" />
 
                  <div>
                    {/* Arch Portrait Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-18 h-20 overflow-hidden flex-shrink-0 shadow-sm border border-turmeric/50 rounded-t-full rounded-b-md bg-paper">
                        {artist.portrait_url ? (
                          <img
                            src={artist.portrait_url}
                            alt={artist.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-serif font-bold text-xl text-oxblood bg-turmeric/15">
                            {artist.name.charAt(0)}
                          </div>
                        )}
                      </div>
 
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-oxblood group-hover:text-madder-red transition truncate">
                          {artist.name}
                        </h3>
                        {artist.name_regional && (
                          <p className="font-ml-serif text-xs text-terracotta font-medium truncate">
                            {artist.name_regional}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                          <span className="text-[11px] font-semibold text-oxblood bg-paper border border-turmeric/40 px-2 py-0.5 rounded-full font-serif">
                            {artist.art_form}
                          </span>
                          {isSampleProfile(artist) && <SampleBadge size="sm" />}
                        </div>
                      </div>
                    </div>
 
                    <p className="text-xs text-charcoal/75 line-clamp-3 leading-[1.6] mb-4">
                      {artist.bio}
                    </p>
                  </div>
 
                  <div className="pt-3 border-t border-turmeric/20 flex items-center justify-between text-xs text-charcoal/70">
                    <span className="flex items-center gap-1 truncate font-serif">
                      <MapPin className="w-3.5 h-3.5 text-oxblood flex-shrink-0" />
                      <span className="truncate">{artist.location_state}</span>
                    </span>
                    <span className="flex items-center gap-1 text-oxblood font-semibold group-hover:translate-x-1 transition-transform flex-shrink-0">
                      <span>View Studio</span>
                      <ArrowRight className="w-3.5 h-3.5 text-turmeric" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
 
      {/* =========================================================================
          6. LIVE NUMBERS (Animated Real Database Counts; Hides If Zero)
         ========================================================================= */}
      {(artists.length > 0 || artworkCount > 0 || distinctArtForms.length > 0) && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-terracotta font-serif">
              04 — The Archive
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-oxblood mt-1">
              Preserved in the Digital Studio
            </h2>
          </div>
 
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {artists.length > 0 && (
              <AnimatedCounter value={artists.length} label="Master Artisans" suffix="+" />
            )}
            {artworkCount > 0 && (
              <AnimatedCounter value={artworkCount} label="Documented Artworks" suffix="+" />
            )}
            {distinctArtForms.length > 0 && (
              <AnimatedCounter value={distinctArtForms.length} label="Living Traditions" suffix="" />
            )}
          </div>
        </section>
      )}
 
      {/* =========================================================================
          7. CLOSING CTA BAND (Full-Width Oxblood Band with Jaali Line Motif)
         ========================================================================= */}
      <section className="relative bg-oxblood text-ivory py-16 sm:py-20 overflow-hidden">
        {/* Top Jaali Motif Line */}
        <div className="absolute top-0 left-0 right-0">
          <BorderBand tone="gold" className="w-full h-2.5 opacity-60" />
        </div>
 
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivory/10 border border-turmeric/40 text-turmeric text-xs font-semibold font-serif">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Patronage for India&apos;s Living Heritage</span>
          </div>
 
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory tracking-tight leading-tight">
            Give your generational craft the digital stage it deserves.
          </h2>
 
          <p className="text-sm sm:text-base text-clay/90 max-w-2xl mx-auto leading-relaxed">
            Record your story by voice, export printable Craft Tag QR badges, and receive direct enquiries from patrons with zero platform commission.
          </p>
 
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/login"
              className="btn-stitched-madder w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm shadow-lg touch-target cursor-pointer hover:scale-102"
            >
              <UserPlus className="w-4 h-4 text-turmeric" />
              <span>Create your artisan portfolio</span>
            </Link>
 
            <a
              href="#artist-filters"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-ivory/10 border border-turmeric/40 text-ivory font-semibold text-sm hover:bg-ivory/20 transition touch-target cursor-pointer"
            >
              <Palette className="w-4 h-4 text-turmeric" />
              <span>Explore all artists</span>
            </a>
          </div>
        </div>
 
        {/* Bottom Jaali Motif Line */}
        <div className="absolute bottom-0 left-0 right-0">
          <BorderBand tone="gold" className="w-full h-2.5 opacity-60" />
        </div>
      </section>
    </div>
  );
};