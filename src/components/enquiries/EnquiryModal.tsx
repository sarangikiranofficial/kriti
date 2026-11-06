import React, { useState } from 'react';
import { Send, X, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useToast } from '../common/Toast';
import type { Artist, Artwork, EnquiryType } from '../../types/database.types';

interface EnquiryModalProps {
  artist: Artist;
  artwork?: Artwork | null;
  onClose: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  artist,
  artwork,
  onClose,
}) => {
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [enquiryType, setEnquiryType] = useState<EnquiryType>(artwork ? 'Buy' : 'Commission');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState(
    artwork
      ? `Namaskaram ${artist.name}, I am interested in acquiring your artwork "${artwork.title}". Could you please provide more details?`
      : `Namaskaram ${artist.name}, I would like to discuss a custom commission in your traditional ${artist.art_form} style.`
  );

  // Honeypot field for spam bots (must remain empty)
  const [honeypot, setHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot verification: if bot filled this field, silently pretend success
    if (honeypot) {
      console.warn('Bot submission blocked via honeypot field.');
      setSubmitted(true);
      return;
    }

    if (!senderName.trim() || !senderContact.trim() || !message.trim()) {
      showToast('Please fill in your name, contact details, and message.', 'error');
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        artist_id: artist.id,
        artwork_id: artwork ? artwork.id : null,
        sender_name: senderName.trim(),
        sender_contact: senderContact.trim(),
        enquiry_type: enquiryType,
        budget: budget.trim() || null,
        message: message.trim(),
        status: 'unread',
      };

      const { error } = await supabase.from('enquiries').insert(payload);
      if (error) throw error;

      setSubmitted(true);
      showToast('Enquiry sent directly to artist!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to send enquiry. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-ink/65 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-warm-ivory border border-terracotta/30 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-charcoal/60 hover:text-charcoal hover:bg-paper-cream transition"
          aria-label="Close enquiry form"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-leaf-green/15 text-leaf-green flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-indigo-ink">
              Enquiry Received
            </h3>
            <p className="text-sm text-charcoal/80 leading-relaxed max-w-sm mx-auto">
              Your message has been delivered directly to <strong className="text-indigo-ink">{artist.name}</strong>. The artist will reach out via your provided contact details.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg bg-madder-red text-warm-ivory text-xs font-semibold hover:bg-madder-red/90 transition shadow-sm"
              >
                Return to Portfolio
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-1 text-madder-red">
              <MessageSquare className="w-5 h-5" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-indigo-ink">
                Connect with {artist.name}
              </h3>
            </div>
            <p className="text-xs text-charcoal/70 mb-5">
              {artwork
                ? `Enquiring regarding "${artwork.title}" (${artist.art_form})`
                : `Commission or collaboration enquiry for traditional ${artist.art_form}`}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Spam Honeypot Field (Hidden from real human users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website_hp">Leave this empty</label>
                <input
                  id="website_hp"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Name & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-indigo-ink mb-1">
                    Your Name <span className="text-madder-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Radhika Menon"
                    className="w-full px-3 py-2 rounded-lg border border-terracotta/30 bg-paper-cream text-sm text-charcoal focus:bg-warm-ivory focus:ring-2 focus:ring-madder-red outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-indigo-ink mb-1">
                    Email or Phone <span className="text-madder-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={senderContact}
                    onChange={(e) => setSenderContact(e.target.value)}
                    placeholder="e.g. radhika@email.com / +91..."
                    className="w-full px-3 py-2 rounded-lg border border-terracotta/30 bg-paper-cream text-sm text-charcoal focus:bg-warm-ivory focus:ring-2 focus:ring-madder-red outline-none"
                  />
                </div>
              </div>

              {/* Enquiry Type & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-indigo-ink mb-1">
                    Enquiry Purpose
                  </label>
                  <select
                    value={enquiryType}
                    onChange={(e) => setEnquiryType(e.target.value as EnquiryType)}
                    className="w-full px-3 py-2 rounded-lg border border-terracotta/30 bg-paper-cream text-sm text-charcoal focus:bg-warm-ivory focus:ring-2 focus:ring-madder-red outline-none"
                  >
                    <option value="Buy">Buy Existing Artwork</option>
                    <option value="Commission">Custom Commission</option>
                    <option value="Collaboration">Exhibition / Collaboration</option>
                    <option value="Workshop">Craft Workshop</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-indigo-ink mb-1">
                    Estimated Budget (Optional)
                  </label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. ₹10,000 - ₹25,000"
                    className="w-full px-3 py-2 rounded-lg border border-terracotta/30 bg-paper-cream text-sm text-charcoal focus:bg-warm-ivory focus:ring-2 focus:ring-madder-red outline-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-indigo-ink mb-1">
                  Message to Artist <span className="text-madder-red">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details of what you have in mind..."
                  className="w-full px-3 py-2 rounded-lg border border-terracotta/30 bg-paper-cream text-sm text-charcoal focus:bg-warm-ivory focus:ring-2 focus:ring-madder-red outline-none leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-charcoal/70 bg-paper-cream p-2.5 rounded-lg border border-terracotta/15">
                <ShieldCheck className="w-4 h-4 text-leaf-green flex-shrink-0" />
                <span>
                  Direct fair trade: 100% of proceeds go to the traditional artist. No platform commission.
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-terracotta/30 text-xs font-semibold text-charcoal hover:bg-paper-cream transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-madder-red text-warm-ivory text-xs font-semibold hover:bg-madder-red/90 transition shadow-sm touch-target disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Direct Enquiry'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
