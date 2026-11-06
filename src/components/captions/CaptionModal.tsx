import React, { useState, useEffect } from 'react';
import { Copy, Check, X, Sparkles, AlertCircle } from 'lucide-react';
import {
  generateCaption,
  CAPTION_LANGUAGES,
  CAPTION_TONES,
  type CaptionLanguage,
  type CaptionTone,
} from '../../lib/captions';
import { useToast } from '../common/Toast';
import type { Artwork, Artist } from '../../types/database.types';

interface CaptionModalProps {
  artwork: Artwork;
  artist: Artist;
  onClose: () => void;
}

export const CaptionModal: React.FC<CaptionModalProps> = ({
  artwork,
  artist,
  onClose,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<CaptionLanguage>('ml'); // Malayalam is default
  const [selectedTone, setSelectedTone] = useState<CaptionTone>('story');
  const [editableCaption, setEditableCaption] = useState('');
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const generated = generateCaption({
      language: selectedLanguage,
      tone: selectedTone,
      artwork,
      artist,
    });
    setEditableCaption(generated);
  }, [selectedLanguage, selectedTone, artwork, artist]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editableCaption);
      setCopied(true);
      showToast('Caption copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast('Failed to copy caption.', 'error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-ink/65 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-warm-ivory border border-terracotta/30 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-charcoal/60 hover:text-charcoal hover:bg-paper-cream transition"
          aria-label="Close caption generator"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-madder-red" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-indigo-ink">
            Social Media Caption Generator
          </h3>
        </div>
        <p className="text-xs text-charcoal/70 mb-5">
          Generate ready-to-post Instagram, Facebook, and WhatsApp captions with cultural context.
        </p>

        {/* Language Selector */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-indigo-ink mb-1.5">
            Select Language
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CAPTION_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition touch-target ${
                  selectedLanguage === lang.code
                    ? 'bg-madder-red text-warm-ivory border-madder-red shadow-2xs'
                    : 'bg-paper-cream border-terracotta/25 text-charcoal hover:bg-warm-ivory'
                }`}
              >
                {lang.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Tone Selector */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-indigo-ink mb-1.5">
            Caption Tone
          </label>
          <div className="grid grid-cols-3 gap-2">
            {CAPTION_TONES.map((tone) => (
              <button
                key={tone.code}
                onClick={() => setSelectedTone(tone.code)}
                className={`py-2 px-2 rounded-lg text-xs font-medium border text-center transition touch-target ${
                  selectedTone === tone.code
                    ? 'bg-indigo-ink text-warm-ivory border-indigo-ink shadow-2xs'
                    : 'bg-paper-cream border-terracotta/25 text-charcoal hover:bg-warm-ivory'
                }`}
              >
                {tone.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visible Native-Speaker Review Notice (strict requirement) */}
        <div className="mb-3 p-3 rounded-lg bg-turmeric/15 border border-turmeric/40 flex items-start gap-2 text-[11px] text-charcoal/80 leading-relaxed">
          <AlertCircle className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
          <span>
            <strong>Please review the caption before posting:</strong> Regional language templates provide a cultural foundation; feel free to edit or personalize the sentences below.
          </span>
        </div>

        {/* Editable Caption Textarea */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-indigo-ink mb-1">
            Caption Preview (Editable)
          </label>
          <textarea
            rows={7}
            value={editableCaption}
            onChange={(e) => setEditableCaption(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-terracotta/30 bg-paper-cream text-charcoal text-xs sm:text-sm font-sans focus:bg-warm-ivory focus:ring-2 focus:ring-madder-red outline-none leading-relaxed transition"
          />
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] text-charcoal/60">
            {editableCaption.length} characters
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-terracotta/30 text-xs font-semibold text-charcoal hover:bg-paper-cream transition"
            >
              Done
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-madder-red text-warm-ivory text-xs font-semibold hover:bg-madder-red/90 transition shadow-xs touch-target cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-leaf-green" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Caption'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
