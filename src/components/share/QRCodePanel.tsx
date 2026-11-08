import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Copy, Check, QrCode as QrIcon } from 'lucide-react';
import { useToast } from '../common/Toast';
import { APP_CONFIG } from '../../config/appConfig';

interface QRCodePanelProps {
  portfolioUrl: string;
  artistName: string;
  artForm: string;
}

export const QRCodePanel: React.FC<QRCodePanelProps> = ({
  portfolioUrl,
  artistName,
  artForm,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        portfolioUrl,
        {
          width: 220,
          margin: 2,
          color: {
            dark: '#1F2A44', // Indigo Ink for high contrast
            light: '#FAF6F0', // Rice paper background
          },
        },
        (error) => {
          if (error) console.error('Failed to generate QR code', error);
        }
      );
    }
  }, [portfolioUrl]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      setCopied(true);
      showToast('Portfolio link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast('Failed to copy link.', 'error');
    }
  };

  const handleDownloadQR = () => {
    const qrCanvas = canvasRef.current;
    if (!qrCanvas) return;

    // Create a branded canvas with the artist's name beneath the QR code
    const brandedCanvas = document.createElement('canvas');
    const ctx = brandedCanvas.getContext('2d');
    if (!ctx) return;

    const width = 360;
    const height = 440;
    brandedCanvas.width = width;
    brandedCanvas.height = height;

    // Background
    ctx.fillStyle = '#FAF6F0';
    ctx.fillRect(0, 0, width, height);

    // Border
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Header branding
    ctx.fillStyle = '#8B0000';
    ctx.font = 'bold 16px serif';
    ctx.textAlign = 'center';
    ctx.fillText(APP_CONFIG.name.toUpperCase(), width / 2, 42);

    // Draw QR canvas centered
    const qrSize = 220;
    ctx.drawImage(qrCanvas, (width - qrSize) / 2, 60, qrSize, qrSize);

    // Artist details
    ctx.fillStyle = '#1F2A44';
    ctx.font = 'bold 18px serif';
    ctx.fillText(artistName, width / 2, 320);

    ctx.fillStyle = '#C8683F';
    ctx.font = '500 13px sans-serif';
    ctx.fillText(artForm, width / 2, 345);

    // Instructions
    ctx.fillStyle = '#2B2622';
    ctx.font = '11px sans-serif';
    ctx.fillText('Scan with phone camera to view portfolio & stories', width / 2, 385);

    // Export PNG
    const link = document.createElement('a');
    link.download = `${artistName.toLowerCase().replace(/\s+/g, '-')}-kriti-qr.png`;
    link.href = brandedCanvas.toDataURL('image/png');
    link.click();
    showToast('Branded QR code downloaded!', 'success');
  };

  return (
    <div className="bg-warm-ivory border border-terracotta/30 rounded-2xl p-6 text-center shadow-xs">
      <div className="flex items-center justify-center gap-2 mb-3 text-madder-red">
        <QrIcon className="w-5 h-5" />
        <h3 className="font-serif text-lg font-bold text-indigo-ink">
          Scan &amp; Share Portfolio
        </h3>
      </div>
      <p className="text-xs text-charcoal/70 mb-4 max-w-xs mx-auto">
        Display this QR code at craft exhibitions, art stalls, or on your visiting card.
      </p>

      {/* QR Code Canvas */}
      <div className="inline-block p-3 bg-warm-ivory rounded-xl border border-terracotta/20 shadow-xs mb-3">
        <canvas ref={canvasRef} className="mx-auto rounded" />
      </div>

      <div className="mb-4">
        <div className="font-serif font-bold text-base text-indigo-ink">
          {artistName}
        </div>
        <div className="text-xs text-terracotta font-medium">
          {artForm}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
        <button
          onClick={handleCopyLink}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-terracotta/30 text-xs font-semibold text-indigo-ink hover:bg-paper-cream transition touch-target"
        >
          {copied ? <Check className="w-4 h-4 text-leaf-green" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
        </button>

        <button
          onClick={handleDownloadQR}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-madder-red text-warm-ivory text-xs font-semibold hover:bg-madder-red/90 transition shadow-xs touch-target"
        >
          <Download className="w-4 h-4" />
          <span>Download QR (PNG)</span>
        </button>
      </div>
    </div>
  );
};
