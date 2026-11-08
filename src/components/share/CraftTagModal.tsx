import React, { useRef, useState, useEffect } from 'react';
import { toPng } from 'html-to-image';
import QRCode from 'qrcode';
import { Download, Copy, Check, Printer, X, Tag } from 'lucide-react';
import { useToast } from '../common/Toast';
import { BrandLogo, CornerOrnament } from '../common/Motifs';
import { APP_CONFIG } from '../../config/appConfig';
import type { Artwork, Artist } from '../../types/database.types';
 
interface CraftTagModalProps {
  artwork: Artwork;
  artist: Artist;
  onClose: () => void;
}
 
export const CraftTagModal: React.FC<CraftTagModalProps> = ({
  artwork,
  artist,
  onClose,
}) => {
  const tagRef = useRef<HTMLDivElement | null>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();
 
  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
 
  const artworkUrl = `${window.location.origin}/a/${artist.slug}#artwork-${artwork.id}`;
 
  useEffect(() => {
    if (qrCanvasRef.current) {
      QRCode.toCanvas(
        qrCanvasRef.current,
        artworkUrl,
        {
          width: 140,
          margin: 2,
          color: {
            dark: '#1F2A44', // Indigo Ink for high-contrast scanning
            light: '#FAF6F0', // Rice paper background
          },
        },
        (error) => {
          if (error) console.error('Failed to generate Craft Tag QR code', error);
        }
      );
    }
  }, [artworkUrl]);
 
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(artworkUrl);
      setCopied(true);
      showToast('Artwork story link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast('Failed to copy link.', 'error');
    }
  };
 
  const handleDownloadPNG = async () => {
    if (!tagRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(tagRef.current, {
        cacheBust: true,
        quality: 0.98,
        pixelRatio: 2.5, // Crisp print resolution
      });
 
      const link = document.createElement('a');
      link.download = `${artwork.title.toLowerCase().replace(/\s+/g, '-')}-craft-tag.png`;
      link.href = dataUrl;
      link.click();
      showToast('Craft Tag image downloaded! Ready for printing.', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to export Craft Tag image.', 'error');
    } finally {
      setIsExporting(false);
    }
  };
 
  const handlePrint = () => {
    window.print();
  };
 
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-oxblood/65 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="relative bg-warm-ivory border border-antique-gold/30 rounded-2xl max-w-md w-full p-6 shadow-2xl my-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-paper-cream border border-terracotta/30 text-oxblood hover:bg-white transition cursor-pointer"
          aria-label="Close craft tag"
        >
          <X className="w-5 h-5" />
        </button>
 
        <div className="flex items-center gap-2 mb-1 text-oxblood">
          <Tag className="w-5 h-5" />
          <h3 className="font-serif text-xl font-bold text-oxblood">
            Physical Craft Tag &amp; QR
          </h3>
        </div>
        <p className="text-xs text-charcoal/75 mb-4">
          Print and tie this authenticity tag to your handmade craft or exhibition piece so patrons can scan to discover its sacred story.
        </p>
 
        {/* The Designed Printable Physical Craft Tag */}
        <div
          ref={tagRef}
          className="relative bg-rice-paper border-2 border-dashed border-oxblood/50 rounded-2xl p-6 shadow-md overflow-hidden text-center mx-auto max-w-[320px]"
          style={{ backgroundColor: '#FAF6F0' }}
        >
          {/* Punched hole indicator for jute thread */}
          <div className="w-4 h-4 rounded-full border-2 border-oxblood/60 bg-warm-ivory mx-auto mb-3 shadow-inner" />
 
          {/* Corner ornaments */}
          <CornerOrnament className="absolute top-3 left-3 w-5 h-5 opacity-40 text-antique-gold" />
          <CornerOrnament className="absolute bottom-3 right-3 w-5 h-5 rotate-180 opacity-40 text-antique-gold" />
 
          {/* Header Branding */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-oxblood tracking-wider uppercase mb-2">
            <BrandLogo className="w-4 h-4" />
            <span>{APP_CONFIG.name} Authentic Craft</span>
          </div>
 
          <div className="border-t border-b border-antique-gold/40 py-2.5 my-2">
            <h4 className="font-serif text-lg font-bold text-oxblood leading-tight">
              {artwork.title}
            </h4>
            {artwork.title_regional && (
              <p className="text-xs text-terracotta font-medium mt-0.5">
                {artwork.title_regional}
              </p>
            )}
            <p className="text-[11px] font-medium text-charcoal/90 mt-1">
              By <strong className="text-oxblood">{artist.name}</strong> • {artist.art_form}
            </p>
            <p className="text-[10px] text-charcoal/70">
              {artist.location_state}, India
            </p>
          </div>
 
          {/* QR Code Canvas */}
          <div className="my-3 inline-block p-2 bg-rice-paper rounded-xl border border-antique-gold/40 shadow-xs">
            <canvas ref={qrCanvasRef} className="mx-auto rounded" />
          </div>
 
          {/* Craft Specifications */}
          <div className="text-[11px] text-charcoal/85 space-y-1 mb-3">
            <p className="font-medium text-terracotta">
              Medium: {artwork.medium}
            </p>
            {artwork.dimensions && (
              <p className="text-[10px] text-charcoal/70">
                Dimensions: {artwork.dimensions}
              </p>
            )}
          </div>
 
          {/* Cultural Context Narrative Snippet */}
          <div className="p-2.5 rounded-lg bg-warm-ivory border border-antique-gold/25 text-[10px] text-charcoal/85 italic leading-relaxed text-left">
            "{artwork.cultural_context.length > 140
              ? `${artwork.cultural_context.substring(0, 140)}...`
              : artwork.cultural_context}"
          </div>
 
          {/* Footer instruction */}
          <p className="text-[9px] uppercase tracking-wider text-charcoal/60 mt-3 font-semibold">
            Scan to view sacred story &amp; verify artisan authenticity
          </p>
        </div>
 
        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 mt-5">
          <button
            onClick={handleDownloadPNG}
            disabled={isExporting}
            className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-oxblood text-rice-paper hover:bg-oxblood/90 transition text-xs font-semibold shadow-2xs touch-target cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4 mb-1" />
            <span>{isExporting ? 'Saving...' : 'Download'}</span>
          </button>
 
          <button
            onClick={handlePrint}
            className="flex flex-col items-center justify-center p-2.5 rounded-lg border border-antique-gold/40 text-oxblood hover:bg-paper-cream transition text-xs font-semibold shadow-2xs touch-target cursor-pointer"
          >
            <Printer className="w-4 h-4 mb-1 text-oxblood" />
            <span>Print Tag</span>
          </button>
 
          <button
            onClick={handleCopyLink}
            className="flex flex-col items-center justify-center p-2.5 rounded-lg border border-antique-gold/40 text-oxblood hover:bg-paper-cream transition text-xs font-semibold touch-target cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 mb-1 text-leaf-green" /> : <Copy className="w-4 h-4 mb-1" />}
            <span>{copied ? 'Copied' : 'Copy Link'}</span>
          </button>
        </div>
 
        <button
          type="button"
          onClick={onClose}
          className="w-full mt-3 py-2.5 rounded-lg border border-terracotta/30 text-oxblood text-xs font-semibold hover:bg-paper-cream transition cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};