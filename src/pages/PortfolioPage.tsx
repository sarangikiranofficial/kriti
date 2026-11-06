import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Share2, QrCode as QrIcon, X, Sparkles, MessageSquare, FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { updateMetaTags } from '../lib/metaTags';
import { CornerOrnament } from '../components/common/Motifs';
import { EmptyState } from '../components/common/EmptyState';
import { QRCodePanel } from '../components/share/QRCodePanel';
import { ArtworkShareCard } from '../components/share/ArtworkShareCard';
import { CaptionModal } from '../components/captions/CaptionModal';
import { EnquiryModal } from '../components/enquiries/EnquiryModal';
import type { Artist, Artwork } from '../types/database.types';

export const PortfolioPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [artist, setArtist] = useState<Artist | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals & Panels
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedArtworkForShare, setSelectedArtworkForShare] = useState<Artwork | null>(null);
  const [selectedArtworkForCaption, setSelectedArtworkForCaption] = useState<Artwork | null>(null);
  const [activeLightboxArtwork, setActiveLightboxArtwork] = useState<Artwork | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryArtwork, setEnquiryArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    const fetchArtistData = async () => {
      if (!slug) return;
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

        // 2. Fetch artist's artworks
        const { data: artworksData } = await supabase
          .from('artworks')
          .select('*')
          .eq('artist_id', currentArtist.id)
          .order('created_at', { ascending: false });

        setArtworks((artworksData as Artwork[]) || []);

        // 3. Update dynamic SEO / Open Graph meta tags
        updateMetaTags({
          title: `${currentArtist.name} — ${currentArtist.art_form} Portfolio | Kala Katha`,
          description: currentArtist.bio.substring(0, 160),
          image: currentArtist.portrait_url || (artworksData?.[0]?.image_url ?? null),
          url: `${window.location.origin}/a/${currentArtist.slug}`,
        });
      } catch (err) {
        console.error('Error fetching artist portfolio:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-charcoal/60 text-sm">
        Loading artist portfolio...
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <EmptyState
          title="Artist Not Found"
          description="The portfolio URL you requested does not exist or may have been updated."
          actionText="Explore Artists"
          onAction={() => window.location.href = '/'}
        />
      </div>
    );
  }

  const portfolioUrl = `${window.location.origin}/a/${artist.slug}`;

  const openEnquiry = (art?: Artwork) => {
    setEnquiryArtwork(art || null);
    setIsEnquiryModalOpen(true);
  };

  return (
    <div className="pb-24">
      {/* Artist Profile Header */}
      <section className="relative bg-warm-ivory border-b border-terracotta/25 py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Portrait */}
            <div className="relative group flex-shrink-0">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-2 border-terracotta/40 overflow-hidden bg-paper-cream shadow-md">
                {artist.portrait_url ? (
                  <img
                    src={artist.portrait_url}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-serif text-3xl font-bold text-madder-red bg-terracotta/10">
                    {artist.name.charAt(0)}
                  </div>
                )}
              </div>
              <CornerOrnament className="absolute -bottom-2 -right-2 w-5 h-5 opacity-50" />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-paper-cream border border-terracotta/30 text-madder-red">
                  {artist.art_form}
                </span>
                <span className="flex items-center gap-1 text-xs text-charcoal/80 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-terracotta" />
                  <span>
                    {artist.location_district ? `${artist.location_district}, ` : ''}
                    {artist.location_state}, India
                  </span>
                </span>
              </div>

              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-indigo-ink">
                  {artist.name}
                </h1>
                {artist.name_regional && (
                  <p className="font-ml-serif text-lg text-terracotta font-medium mt-0.5">
                    {artist.name_regional}
                  </p>
                )}
              </div>

              <p className="text-charcoal/85 text-sm sm:text-base leading-relaxed max-w-3xl whitespace-pre-line">
                {artist.bio}
              </p>

              {/* Languages */}
              {artist.languages_spoken && artist.languages_spoken.length > 0 && (
                <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-1.5 text-xs text-charcoal/70">
                  <span className="font-semibold text-charcoal">Languages:</span>
                  {artist.languages_spoken.map((lang) => (
                    <span
                      key={lang}
                      className="px-2 py-0.5 bg-paper-cream rounded text-[11px] border border-terracotta/20"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              )}

              {/* Direct Artist Contacts & Share Panel Button */}
              <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <button
                  onClick={() => openEnquiry()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-madder-red text-warm-ivory text-xs font-semibold hover:bg-madder-red/90 transition shadow-xs touch-target cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire / Commission</span>
                </button>

                {artist.whatsapp_number && (
                  <a
                    href={`https://wa.me/${artist.whatsapp_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Namaskaram ${artist.name}, I discovered your traditional art portfolio on Kala Katha and would like to enquire about your work.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba59] transition shadow-xs touch-target"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                )}

                {artist.phone && (
                  <a
                    href={`tel:${artist.phone}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-terracotta/30 text-indigo-ink text-xs font-semibold hover:bg-paper-cream transition touch-target"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                )}

                <button
                  onClick={() => setIsQRModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-paper-cream border border-terracotta/30 text-indigo-ink text-xs font-semibold hover:border-madder-red transition shadow-xs touch-target cursor-pointer"
                >
                  <QrIcon className="w-3.5 h-3.5 text-madder-red" />
                  <span>Share &amp; QR Code</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artwork Gallery Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-terracotta/20">
          <div>
            <h2 className="font-serif text-2xl font-bold text-indigo-ink">
              Artworks &amp; Cultural Narratives
            </h2>
            <p className="text-xs text-charcoal/70 mt-0.5">
              Each piece carries the lineage, materials, and living story of traditional craft.
            </p>
          </div>
          <span className="text-xs font-bold text-terracotta bg-paper-cream px-3 py-1 rounded-full border border-terracotta/20">
            {artworks.length} {artworks.length === 1 ? 'Artwork' : 'Artworks'}
          </span>
        </div>

        {artworks.length === 0 ? (
          <EmptyState
            title="No Artworks Exhibited Yet"
            description="The artist is currently preparing their creations for display. Please check back soon or send an enquiry directly."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((art) => (
              <div
                key={art.id}
                id={`artwork-${art.id}`}
                className="group relative bg-warm-ivory border border-terracotta/25 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                {/* Artwork Image Frame */}
                <div
                  onClick={() => setActiveLightboxArtwork(art)}
                  className="relative aspect-4/3 bg-paper-cream overflow-hidden cursor-pointer"
                >
                  <img
                    src={art.image_url}
                    alt={art.image_alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                    loading="lazy"
                  />
                  <span
                    className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md ${
                      art.availability === 'available'
                        ? 'bg-leaf-green/90 text-white'
                        : art.availability === 'sold'
                        ? 'bg-charcoal/80 text-white'
                        : 'bg-turmeric/90 text-indigo-ink'
                    }`}
                  >
                    {art.availability}
                  </span>
                </div>

                {/* Artwork Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => setActiveLightboxArtwork(art)}
                      className="font-serif text-lg font-bold text-indigo-ink group-hover:text-madder-red transition cursor-pointer"
                    >
                      {art.title}
                    </h3>
                    {art.title_regional && (
                      <p className="text-xs text-terracotta font-medium mt-0.5">
                        {art.title_regional}
                      </p>
                    )}

                    <p className="text-xs text-charcoal/70 mt-1">
                      {art.medium} {art.year ? `• ${art.year}` : ''}
                    </p>

                    {/* Cultural Context Snippet */}
                    <div className="mt-3 p-3 bg-paper-cream rounded-xl border border-terracotta/15 text-xs text-charcoal/85 italic leading-relaxed line-clamp-3">
                      "{art.cultural_context}"
                    </div>
                  </div>

                  {/* Actions & Price */}
                  <div className="pt-4 mt-4 border-t border-terracotta/15 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-indigo-ink text-sm">
                        {art.is_price_on_request || art.price === null
                          ? 'Price on Request'
                          : `₹${art.price.toLocaleString('en-IN')}`}
                      </span>
                      {art.dimensions && (
                        <span className="block text-[10px] text-charcoal/60">
                          {art.dimensions}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedArtworkForCaption(art)}
                        className="p-1.5 rounded-lg border border-terracotta/30 text-indigo-ink hover:bg-paper-cream transition"
                        title="Generate Social Captions"
                      >
                        <FileText className="w-3.5 h-3.5 text-terracotta" />
                      </button>

                      <button
                        onClick={() => setSelectedArtworkForShare(art)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-terracotta/30 text-indigo-ink font-semibold hover:bg-paper-cream transition"
                        title="Share Artwork Card"
                      >
                        <Share2 className="w-3.5 h-3.5 text-madder-red" />
                        <span>Share</span>
                      </button>

                      <button
                        onClick={() => setActiveLightboxArtwork(art)}
                        className="px-3 py-1.5 rounded-lg bg-madder-red text-warm-ivory font-semibold hover:bg-madder-red/90 transition shadow-2xs cursor-pointer"
                      >
                        View Story
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sticky Mobile Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-warm-ivory/95 backdrop-blur-md border-t border-terracotta/30 p-3 sm:hidden shadow-lg flex items-center justify-around gap-2">
        <button
          onClick={() => openEnquiry()}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-madder-red text-warm-ivory font-semibold text-xs touch-target cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Enquire / Buy</span>
        </button>

        <button
          onClick={() => setIsQRModalOpen(true)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-paper-cream border border-terracotta/30 text-indigo-ink font-semibold text-xs touch-target cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-madder-red" />
          <span>Share Portfolio</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxArtwork && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-ink/80 backdrop-blur-xs overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative bg-warm-ivory border border-terracotta/30 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto my-6">
            <button
              onClick={() => setActiveLightboxArtwork(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-charcoal/60 hover:text-charcoal hover:bg-paper-cream transition"
              aria-label="Close story"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox Artwork Image (uncropped contain) */}
            <div className="w-full max-h-[50vh] bg-paper-cream rounded-xl overflow-hidden border border-terracotta/25 flex items-center justify-center mb-6">
              <img
                src={activeLightboxArtwork.image_url}
                alt={activeLightboxArtwork.image_alt}
                className="max-h-[50vh] w-auto max-w-full object-contain mx-auto"
              />
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-terracotta/20 pb-3">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-indigo-ink">
                    {activeLightboxArtwork.title}
                  </h3>
                  {activeLightboxArtwork.title_regional && (
                    <p className="font-ml-serif text-sm text-terracotta font-medium mt-0.5">
                      {activeLightboxArtwork.title_regional}
                    </p>
                  )}
                  <p className="text-xs text-charcoal/70 mt-1">
                    By <strong className="text-indigo-ink">{artist.name}</strong> • {artist.art_form}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="font-serif text-xl font-bold text-madder-red block">
                    {activeLightboxArtwork.is_price_on_request || activeLightboxArtwork.price === null
                      ? 'Price on Request'
                      : `₹${activeLightboxArtwork.price.toLocaleString('en-IN')}`}
                  </span>
                  <span className="text-xs text-charcoal/60 capitalize">
                    {activeLightboxArtwork.availability}
                  </span>
                </div>
              </div>

              {/* Cultural Context Narrative */}
              <div>
                <h4 className="font-serif text-sm font-bold text-indigo-ink mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-madder-red" />
                  <span>Cultural Context &amp; Sacred Story</span>
                </h4>
                <div className="p-4 bg-paper-cream rounded-xl border border-terracotta/20 text-sm text-charcoal/90 leading-relaxed whitespace-pre-line italic">
                  "{activeLightboxArtwork.cultural_context}"
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-paper-cream/60 p-3.5 rounded-xl border border-terracotta/15">
                <div>
                  <span className="text-charcoal/60 block">Medium / Materials</span>
                  <span className="font-medium text-charcoal">{activeLightboxArtwork.medium}</span>
                </div>
                {activeLightboxArtwork.dimensions && (
                  <div>
                    <span className="text-charcoal/60 block">Dimensions</span>
                    <span className="font-medium text-charcoal">{activeLightboxArtwork.dimensions}</span>
                  </div>
                )}
                {activeLightboxArtwork.year && (
                  <div>
                    <span className="text-charcoal/60 block">Year of Creation</span>
                    <span className="font-medium text-charcoal">{activeLightboxArtwork.year}</span>
                  </div>
                )}
              </div>

              {/* Lightbox Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setSelectedArtworkForCaption(activeLightboxArtwork);
                    setActiveLightboxArtwork(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-terracotta/30 text-indigo-ink text-xs font-semibold hover:bg-paper-cream transition"
                >
                  <FileText className="w-4 h-4 text-terracotta" />
                  <span>Captions</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedArtworkForShare(activeLightboxArtwork);
                    setActiveLightboxArtwork(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-terracotta/30 text-indigo-ink text-xs font-semibold hover:bg-paper-cream transition"
                >
                  <Share2 className="w-4 h-4 text-madder-red" />
                  <span>Share Card</span>
                </button>

                <button
                  onClick={() => {
                    openEnquiry(activeLightboxArtwork);
                    setActiveLightboxArtwork(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-madder-red text-warm-ivory text-xs font-semibold hover:bg-madder-red/90 transition shadow-xs cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Enquiry</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shareable Card Modal */}
      {selectedArtworkForShare && (
        <ArtworkShareCard
          artwork={selectedArtworkForShare}
          artist={artist}
          onClose={() => setSelectedArtworkForShare(null)}
        />
      )}

      {/* Multilingual Caption Generator Modal */}
      {selectedArtworkForCaption && (
        <CaptionModal
          artwork={selectedArtworkForCaption}
          artist={artist}
          onClose={() => setSelectedArtworkForCaption(null)}
        />
      )}

      {/* Public Enquiry / Commission Modal */}
      {isEnquiryModalOpen && (
        <EnquiryModal
          artist={artist}
          artwork={enquiryArtwork}
          onClose={() => {
            setIsEnquiryModalOpen(false);
            setEnquiryArtwork(null);
          }}
        />
      )}

      {/* Portfolio QR Code Modal */}
      {isQRModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-ink/65 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-sm w-full">
            <button
              onClick={() => setIsQRModalOpen(false)}
              className="absolute -top-10 right-0 p-1.5 text-warm-ivory hover:text-white cursor-pointer"
              aria-label="Close QR Modal"
            >
              <X className="w-6 h-6" />
            </button>
            <QRCodePanel
              portfolioUrl={portfolioUrl}
              artistName={artist.name}
              artForm={artist.art_form}
            />
          </div>
        </div>
      )}
    </div>
  );
};
