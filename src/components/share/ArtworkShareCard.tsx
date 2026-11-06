import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Share2, Copy, Check, MessageCircle, X } from 'lucide-react';
import { useToast } from '../common/Toast';
import { BrandLogo, CornerOrnament } from '../common/Motifs';
import { APP_CONFIG } from '../../config/appConfig';
import type { Artwork, Artist } from '../../types/database.types';

interface ArtworkShareCardProps {
  artwork: Artwork;
  artist: Artist;
  onClose?: () => void;
}

export const ArtworkShareCard: React.FC<ArtworkShareCardProps> = ({
  artwork,
  artist,
  onClose,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const shareUrl = `${window.location.origin}/a/${artist.slug}#artwork-${artwork.id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      showToast('Artwork link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast('Failed to copy link.', 'error');
    }
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 0.95,
        pixelRatio: 2, // High resolution for crisp sharing
      });

      const link = document.createElement('a');
      link.download = `${artwork.title.toLowerCase().replace(/\s+/g, '-')}-kala-katha.png`;
      link.href = dataUrl;
      link.click();
      showToast('Share card image downloaded!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to export image.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🎨 *${artwork.title}* by *${artist.name}* (${artist.art_form})\n\n` +
      `"${artwork.cultural_context.substring(0, 160)}${artwork.cultural_context.length > 160 ? '...' : ''}"\n\n` +
      `📍 ${artist.location_state}, India\n` +
      `Explore story & portfolio: ${shareUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${artwork.title} by ${artist.name}`,
          text: `"${artwork.cultural_context.substring(0, 140)}..." Explore traditional ${artist.art_form} on Kala Katha:`,
          url: shareUrl,
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          showToast('Sharing failed.', 'error');
        }
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-ink/65 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-warm-ivory border border-terracotta/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl my-8">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-charcoal/60 hover:text-charcoal hover:bg-paper-cream transition"
            aria-label="Close share card"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <h3 className="font-serif text-xl font-bold text-indigo-ink mb-1">
          Shareable Artwork Card
        </h3>
        <p className="text-xs text-charcoal/70 mb-4">
          Download as an image or share directly with cultural context preserved.
        </p>

        {/* The Designed Printable Card */}
        <div
          ref={cardRef}
          className="relative bg-paper-cream border-2 border-terracotta/40 rounded-xl p-5 shadow-md overflow-hidden"
          style={{ backgroundColor: '#F6EEDC' }}
        >
          <CornerOrnament className="absolute top-2 left-2 w-5 h-5 opacity-50" />
          <CornerOrnament className="absolute bottom-2 right-2 w-5 h-5 rotate-180 opacity-50" />

          {/* Artwork Image */}
          <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-terracotta/25 bg-warm-ivory mb-4 shadow-2xs">
            <img
              src={artwork.image_url}
              alt={artwork.image_alt}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          </div>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-serif text-xl font-bold text-indigo-ink leading-tight">
                  {artwork.title}
                </h4>
                {artwork.title_regional && (
                  <p className="text-xs text-terracotta font-semibold">
                    {artwork.title_regional}
                  </p>
                )}
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal/80 bg-warm-ivory border border-terracotta/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                {artist.art_form}
              </span>
            </div>

            <p className="text-xs font-medium text-charcoal/90">
              By <strong className="text-indigo-ink">{artist.name}</strong> • {artist.location_state}, India
            </p>

            {/* Cultural Context Snippet */}
            <div className="p-2.5 rounded-lg bg-warm-ivory/80 border border-terracotta/20 text-xs text-charcoal/85 italic leading-relaxed">
              "{artwork.cultural_context.length > 200
                ? `${artwork.cultural_context.substring(0, 200)}...`
                : artwork.cultural_context}"
            </div>

            {/* Card Branding Footer */}
            <div className="pt-2 border-t border-terracotta/20 flex items-center justify-between text-[11px] text-charcoal/70">
              <div className="flex items-center gap-1.5 font-semibold text-indigo-ink">
                <BrandLogo className="w-4 h-4" />
                <span>{APP_CONFIG.name}</span>
              </div>
              <span className="font-mono text-[10px] text-terracotta truncate max-w-[180px]">
                /a/{artist.slug}
              </span>
            </div>
          </div>
        </div>

        {/* Share Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
          <button
            onClick={handleDownloadImage}
            disabled={isExporting}
            className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-madder-red text-warm-ivory hover:bg-madder-red/90 transition text-xs font-semibold shadow-2xs touch-target cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4 mb-1" />
            <span>{isExporting ? 'Saving...' : 'Download'}</span>
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-[#25D366] text-white hover:bg-[#20ba59] transition text-xs font-semibold shadow-2xs touch-target cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 mb-1" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex flex-col items-center justify-center p-2.5 rounded-lg border border-terracotta/30 text-indigo-ink hover:bg-paper-cream transition text-xs font-semibold touch-target cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 mb-1 text-leaf-green" /> : <Copy className="w-4 h-4 mb-1" />}
            <span>{copied ? 'Copied' : 'Copy Link'}</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="flex flex-col items-center justify-center p-2.5 rounded-lg border border-terracotta/30 text-indigo-ink hover:bg-paper-cream transition text-xs font-semibold touch-target cursor-pointer"
          >
            <Share2 className="w-4 h-4 mb-1" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};
