import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, MessageCircle, Sparkles, MapPin, MessageSquare, FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { updateMetaTags } from '../lib/metaTags';
import { EmptyState } from '../components/common/EmptyState';
import { ArtworkShareCard } from '../components/share/ArtworkShareCard';
import { CaptionModal } from '../components/captions/CaptionModal';
import { EnquiryModal } from '../components/enquiries/EnquiryModal';
import type { Artist, Artwork } from '../types/database.types';

export const ArtworkDetailPage: React.FC = () => {
  const { slug, artworkId } = useParams<{ slug: string; artworkId: string }>();

  const [artist, setArtist] = useState<Artist | null>(null);
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCaptionModalOpen, setIsCaptionModalOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  useEffect(() => {
    const fetchArtworkAndArtist = async () => {
      if (!slug || !artworkId) return;

      try {
        setLoading(true);
        // 1. Fetch artist by slug
        const { data: artistData, error: artistError } = await supabase
          .from('artists')
          .select('*')
          .eq('slug', slug)
          .single();

        if (artistError || !artistData) {
          setArtist(null);
          return;
        }

        const currentArtist = artistData as Artist;
        setArtist(currentArtist);

        // 2. Fetch artwork
        const { data: artworkData, error: artworkError } = await supabase
          .from('artworks')
          .select('*')
          .eq('id', artworkId)
          .eq('artist_id', currentArtist.id)
          .single();

        if (artworkError || !artworkData) {
          setArtwork(null);
          return;
        }

        const currentArtwork = artworkData as Artwork;
        setArtwork(currentArtwork);

        // 3. Update Open Graph meta tags for rich social sharing
        updateMetaTags({
          title: `${currentArtwork.title} by ${currentArtist.name} | Kriti`,
          description: currentArtwork.cultural_context.substring(0, 160),
          image: currentArtwork.image_url,
          url: `${window.location.origin}/a/${currentArtist.slug}/artwork/${currentArtwork.id}`,
        });
      } catch (err) {
        console.error('Error fetching artwork details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworkAndArtist();
  }, [slug, artworkId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-charcoal/60 text-sm">
        Loading artwork...
      </div>
    );
  }

  if (!artist || !artwork) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <EmptyState
          title="Artwork Not Found"
          description="The artwork you are looking for does not exist or may have been unlisted."
          actionText="Explore Artisans"
          onAction={() => (window.location.href = '/')}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      {/* Back to Portfolio Breadcrumb */}
      <div className="mb-6">
        <Link
          to={`/a/${artist.slug}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-charcoal/80 hover:text-deep-maroon transition"
        >
          <ArrowLeft className="w-4 h-4 text-deep-maroon" />
          <span>Back to {artist.name}'s Portfolio</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Artwork Image Frame */}
        <div className="bg-rice-paper border border-antique-gold/35 rounded-2xl overflow-hidden p-2 shadow-md">
          <div className="rounded-xl overflow-hidden bg-warm-ivory flex items-center justify-center">
            <img
              src={artwork.image_url}
              alt={artwork.image_alt}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </div>
          <p className="text-[11px] text-charcoal/60 text-center py-2 italic">
            Attribution: Created by {artist.name} ({artist.art_form})
          </p>
        </div>

        {/* Artwork Narrative & Specifications */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-warm-ivory border border-antique-gold/30 text-deep-maroon">
                {artist.art_form}
              </span>
              <span className="text-xs text-charcoal/70 capitalize">
                {artwork.availability}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-deep-maroon">
              {artwork.title}
            </h1>
            {artwork.title_regional && (
              <p className="font-ml-serif text-lg text-terracotta font-medium mt-1">
                {artwork.title_regional}
              </p>
            )}

            <div className="mt-3 flex items-center gap-3">
              <Link
                to={`/a/${artist.slug}`}
                className="font-semibold text-sm text-deep-maroon hover:text-terracotta transition flex items-center gap-1.5"
              >
                <span>By {artist.name}</span>
              </Link>
              <span className="text-charcoal/40">•</span>
              <span className="text-xs text-charcoal/70 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-terracotta" />
                {artist.location_state}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="p-4 bg-warm-ivory border border-antique-gold/25 rounded-xl flex items-center justify-between">
            <span className="text-xs text-charcoal/70 uppercase tracking-wider font-semibold">
              Valuation
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-deep-maroon">
              {artwork.is_price_on_request || artwork.price === null
                ? 'Price on Request'
                : `₹${artwork.price.toLocaleString('en-IN')}`}
            </span>
          </div>

          {/* Cultural Context / Story */}
          <div>
            <h3 className="font-serif text-base font-bold text-deep-maroon mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-antique-gold" />
              <span>Cultural Context &amp; Significance</span>
            </h3>
            <div className="p-5 bg-rice-paper rounded-xl border border-antique-gold/25 text-sm text-charcoal/90 leading-relaxed italic whitespace-pre-line">
              "{artwork.cultural_context}"
            </div>
          </div>

          {/* Technical Specs */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-warm-ivory p-4 rounded-xl border border-antique-gold/20">
            <div>
              <span className="text-charcoal/60 block">Medium / Materials</span>
              <span className="font-semibold text-charcoal">{artwork.medium}</span>
            </div>
            {artwork.dimensions && (
              <div>
                <span className="text-charcoal/60 block">Dimensions</span>
                <span className="font-semibold text-charcoal">{artwork.dimensions}</span>
              </div>
            )}
            {artwork.year && (
              <div>
                <span className="text-charcoal/60 block">Year</span>
                <span className="font-semibold text-charcoal">{artwork.year}</span>
              </div>
            )}
            <div>
              <span className="text-charcoal/60 block">Authenticity</span>
              <span className="font-semibold text-leaf-green">Handmade Original</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-deep-maroon text-rice-paper text-xs font-semibold hover:bg-deep-maroon/90 border border-antique-gold/30 transition shadow-sm touch-target cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-antique-gold" />
              <span>Send Enquiry</span>
            </button>

            {artist.whatsapp_number && (
              <a
                href={`https://wa.me/${artist.whatsapp_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Namaskaram ${artist.name}, I am enquiring about your artwork "${artwork.title}" featured on Kriti.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba59] transition shadow-sm touch-target"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            )}

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl border border-antique-gold/30 text-indigo-ink text-xs font-semibold hover:bg-warm-ivory transition touch-target cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-deep-maroon" />
              <span>Share Card</span>
            </button>

            <button
              onClick={() => setIsCaptionModalOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl border border-antique-gold/30 text-indigo-ink text-xs font-semibold hover:bg-warm-ivory transition touch-target cursor-pointer"
            >
              <FileText className="w-4 h-4 text-terracotta" />
              <span>Captions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <ArtworkShareCard
          artwork={artwork}
          artist={artist}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}

      {/* Caption Modal */}
      {isCaptionModalOpen && (
        <CaptionModal
          artwork={artwork}
          artist={artist}
          onClose={() => setIsCaptionModalOpen(false)}
        />
      )}

      {/* Enquiry Modal */}
      {isEnquiryModalOpen && (
        <EnquiryModal
          artist={artist}
          artwork={artwork}
          onClose={() => setIsEnquiryModalOpen(false)}
        />
      )}
    </motion.div>
  );
};
