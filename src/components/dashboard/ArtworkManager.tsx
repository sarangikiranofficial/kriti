import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';
import { supabase } from '../../lib/supabase';
import { compressImage } from '../../lib/imageCompressor';
import { EmptyState } from '../common/EmptyState';
import { VoiceInput, ARTWORK_GUIDED_PROMPTS } from '../voice/VoiceInput';
import type { Artwork, AvailabilityStatus } from '../../types/database.types';

export const ArtworkManager: React.FC = () => {
  const { user, artist } = useAuth();
  const { showToast } = useToast();

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);

  const [title, setTitle] = useState('');
  const [titleRegional, setTitleRegional] = useState('');
  const [medium, setMedium] = useState('');
  const [year, setYear] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [price, setPrice] = useState('');
  const [isPriceOnRequest, setIsPriceOnRequest] = useState(false);
  const [availability, setAvailability] = useState<AvailabilityStatus>('available');
  const [culturalContext, setCulturalContext] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ownershipDeclared, setOwnershipDeclared] = useState(false);

  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchArtworks = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('artist_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArtworks((data as Artwork[]) || []);
    } catch (err: any) {
      showToast(err.message || 'Failed to fetch artworks.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, [user]);

  const resetForm = () => {
    setEditingArtwork(null);
    setTitle('');
    setTitleRegional('');
    setMedium('');
    setYear('');
    setDimensions('');
    setPrice('');
    setIsPriceOnRequest(false);
    setAvailability('available');
    setCulturalContext('');
    setImageAlt('');
    setImageUrl('');
    setOwnershipDeclared(false);
  };

  const openAddModal = () => {
    if (!artist) {
      showToast('Please save your artist profile first before adding artworks.', 'error');
      return;
    }
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (artwork: Artwork) => {
    setEditingArtwork(artwork);
    setTitle(artwork.title);
    setTitleRegional(artwork.title_regional || '');
    setMedium(artwork.medium);
    setYear(artwork.year || '');
    setDimensions(artwork.dimensions || '');
    setPrice(artwork.price !== null ? String(artwork.price) : '');
    setIsPriceOnRequest(artwork.is_price_on_request);
    setAvailability(artwork.availability);
    setCulturalContext(artwork.cultural_context);
    setImageAlt(artwork.image_alt);
    setImageUrl(artwork.image_url);
    setOwnershipDeclared(artwork.ownership_declared);
    setIsModalOpen(true);
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setIsCompressing(true);
      const compressed = await compressImage(file, 1600, 0.85);

      const filePath = `${user.id}/artworks/${Date.now()}-${compressed.file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('artworks')
        .upload(filePath, compressed.file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('artworks')
        .getPublicUrl(filePath);

      setImageUrl(publicUrlData.publicUrl);
      if (!imageAlt) {
        setImageAlt(file.name.replace(/\.[^/.]+$/, ''));
      }
      showToast('Artwork image uploaded & compressed successfully!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to upload artwork image.', 'error');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDelete = async (artworkId: string) => {
    if (!window.confirm('Are you sure you want to delete this artwork? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase.from('artworks').delete().eq('id', artworkId);
      if (error) throw error;

      setArtworks((prev) => prev.filter((a) => a.id !== artworkId));
      showToast('Artwork removed.', 'info');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete artwork.', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!imageUrl) {
      showToast('Please upload an artwork image.', 'error');
      return;
    }

    if (!ownershipDeclared) {
      showToast('You must declare ownership or authorization to share this artwork.', 'error');
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        artist_id: user.id,
        title: title.trim(),
        title_regional: titleRegional.trim() || null,
        medium: medium.trim(),
        year: year.trim() || null,
        dimensions: dimensions.trim() || null,
        price: isPriceOnRequest || !price ? null : parseFloat(price),
        is_price_on_request: isPriceOnRequest,
        availability,
        cultural_context: culturalContext.trim(),
        image_url: imageUrl,
        image_alt: imageAlt.trim() || title.trim(),
        ownership_declared: true,
        updated_at: new Date().toISOString(),
      };

      if (editingArtwork) {
        const { error } = await supabase
          .from('artworks')
          .update(payload)
          .eq('id', editingArtwork.id);

        if (error) throw error;
        showToast('Artwork updated successfully!', 'success');
      } else {
        const { error } = await supabase.from('artworks').insert(payload);
        if (error) throw error;
        showToast('Artwork added to your gallery!', 'success');
      }

      setIsModalOpen(false);
      resetForm();
      await fetchArtworks();
    } catch (err: any) {
      showToast(err.message || 'Failed to save artwork.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-indigo-ink">
            Artwork Gallery
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/70">
            Manage your artworks, stories, and cultural contexts.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-madder-red text-warm-ivory font-medium hover:bg-madder-red/90 transition shadow-sm touch-target cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Artwork</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-charcoal/60 text-sm">
          Loading gallery...
        </div>
      ) : artworks.length === 0 ? (
        <EmptyState
          title="Your Gallery is Empty"
          description="You haven't uploaded any artworks yet. Add your first piece along with the cultural story behind it to share with the world."
          actionText="Add First Artwork"
          onAction={openAddModal}
          icon={<ImageIcon className="w-6 h-6" />}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <div
              key={art.id}
              className="group bg-warm-ivory border border-terracotta/20 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col"
            >
              <div className="relative aspect-4/3 bg-paper-cream overflow-hidden">
                <img
                  src={art.image_url}
                  alt={art.image_alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                  loading="lazy"
                />
                <span
                  className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md ${
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

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-indigo-ink">
                    {art.title}
                  </h3>
                  {art.title_regional && (
                    <p className="text-xs text-terracotta font-medium mt-0.5">
                      {art.title_regional}
                    </p>
                  )}
                  <p className="text-xs text-charcoal/70 mt-1 line-clamp-1">
                    {art.medium}
                  </p>
                  <p className="text-xs text-charcoal/80 mt-2 line-clamp-2 italic">
                    "{art.cultural_context}"
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-terracotta/15 flex items-center justify-between text-xs">
                  <span className="font-semibold text-indigo-ink">
                    {art.is_price_on_request || art.price === null
                      ? 'Price on Request'
                      : `₹${art.price.toLocaleString('en-IN')}`}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(art)}
                      className="p-1.5 text-charcoal/70 hover:text-madder-red rounded transition"
                      title="Edit Artwork"
                      aria-label="Edit Artwork"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(art.id)}
                      className="p-1.5 text-charcoal/70 hover:text-madder-red rounded transition"
                      title="Delete Artwork"
                      aria-label="Delete Artwork"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-ink/60 backdrop-blur-xs overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-warm-ivory border border-terracotta/30 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto my-8">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-indigo-ink mb-1">
              {editingArtwork ? 'Edit Artwork' : 'Add New Artwork'}
            </h3>
            <p className="text-xs text-charcoal/70 mb-6">
              Share the physical details and cultural significance of your creation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Image Upload */}
              <div>
                <label className="block text-xs font-semibold text-indigo-ink mb-1.5">
                  Artwork Photo <span className="text-madder-red">*</span>
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-2 border-dashed border-terracotta/30 rounded-xl bg-paper-cream">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Artwork Preview"
                      className="w-24 h-24 object-cover rounded-lg border border-terracotta/20"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-lg bg-warm-ivory flex items-center justify-center text-charcoal/40">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  )}
                  <div className="flex-1 text-center sm:text-left">
                    <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-madder-red text-warm-ivory text-xs font-semibold cursor-pointer hover:bg-madder-red/90 transition">
                      <span>Choose Image (JPG, PNG, WebP)</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageFileChange}
                        disabled={isCompressing}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[11px] text-charcoal/60 mt-1.5">
                      Max 5MB. Automatic client-side compression will optimize size for fast loading.
                    </p>
                    {isCompressing && (
                      <span className="text-xs text-terracotta font-medium animate-pulse block mt-1">
                        Compressing image...
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Title & Regional Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-indigo-ink mb-1">
                    Artwork Title <span className="text-madder-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Tree of Life"
                    className="w-full px-3 py-2 rounded-lg border border-terracotta/30 bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-madder-red outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-indigo-ink mb-1">
                    Title in Regional Script (Optional)
                  </label>
                  <input
                    type="text"
                    value={titleRegional}
                    onChange={(e) => setTitleRegional(e.target.value)}
                    placeholder="e.g. ജീവവൃക്ഷം"
                    className="w-full px-3 py-2 rounded-lg border border-terracotta/30 bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-madder-red outline-none"
                  />
                </div>
              </div>

              {/* Medium & Dimensions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-indigo-ink mb-1">
                    Medium / Materials <span className="text-madder-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                    placeholder="e.g. Natural minerals &amp; vegetable dyes on canvas"
                    className="w-full px-3 py-2 rounded-lg border border-terracotta/30 bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-madder-red outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-indigo-ink mb-1">
                    Dimensions (Optional)
                  </label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    placeholder="e.g. 24 x 36 inches"
                    className="w-full px-3 py-2 rounded-lg border border-terracotta/30 bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-madder-red outline-none"
                  />
                </div>
              </div>

              {/* Year, Price & Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-indigo-ink mb-1">
                    Year of Creation (Optional)
                  </label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="e.g. 2024"
                    className="w-full px-3 py-2 rounded-lg border border-terracotta/30 bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-madder-red outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-indigo-ink mb-1">
                    Price (INR)
                  </label>
                  <input
                    type="number"
                    disabled={isPriceOnRequest}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 15000"
                    className="w-full px-3 py-2 rounded-lg border border-terracotta/30 bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-madder-red outline-none disabled:opacity-50"
                  />
                  <label className="flex items-center gap-1.5 mt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPriceOnRequest}
                      onChange={(e) => setIsPriceOnRequest(e.target.checked)}
                      className="accent-madder-red"
                    />
                    <span className="text-[11px] text-charcoal/70">Price on Request</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-indigo-ink mb-1">
                    Availability Status
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value as AvailabilityStatus)}
                    className="w-full px-3 py-2 rounded-lg border border-terracotta/30 bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-madder-red outline-none"
                  >
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Cultural Context / Story with Voice & Guided Prompts */}
              <div>
                <label className="block text-xs font-semibold text-indigo-ink mb-1">
                  Cultural Context &amp; Story Behind This Piece <span className="text-madder-red">*</span>
                </label>

                {/* Voice Input with 3 Guided Prompts */}
                <VoiceInput
                  fieldLabel="Cultural context"
                  guidedPrompts={ARTWORK_GUIDED_PROMPTS}
                  currentValue={culturalContext}
                  onTranscript={(text) => setCulturalContext(text)}
                />

                <textarea
                  rows={5}
                  required
                  value={culturalContext}
                  onChange={(e) => setCulturalContext(e.target.value)}
                  placeholder="What is the story or mythology behind this piece? What traditional technique or natural pigments did you use? What does it symbolize in your heritage?"
                  className="w-full px-3 py-2 rounded-lg border border-terracotta/30 bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-madder-red outline-none leading-relaxed"
                />
                <span className="text-[11px] text-charcoal/60 mt-1 block">
                  You can use the voice prompts above to speak in your native tongue, and edit with keyboard at any time.
                </span>
              </div>

              {/* Image Alt Text for Accessibility */}
              <div>
                <label className="block text-xs font-semibold text-indigo-ink mb-1">
                  Image Description for Accessibility (Alt Text) <span className="text-madder-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="e.g. Traditional Madhubani painting depicting peacocks and floral motifs in earthen hues"
                  className="w-full px-3 py-2 rounded-lg border border-terracotta/30 bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-madder-red outline-none"
                />
              </div>

              {/* Mandatory Ethics / Ownership Declaration Checkbox */}
              <div className="p-3.5 bg-paper-cream border border-terracotta/30 rounded-lg">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={ownershipDeclared}
                    onChange={(e) => setOwnershipDeclared(e.target.checked)}
                    className="mt-0.5 accent-madder-red w-4 h-4"
                  />
                  <span className="text-xs text-charcoal font-medium leading-relaxed">
                    <strong>Ethical Declaration:</strong> This work is mine, or I have the artist's express permission to share it. I certify that this art does not misuse or disrespect sacred cultural iconography.
                  </span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-terracotta/30 text-charcoal text-xs font-semibold hover:bg-paper-cream transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isCompressing || !ownershipDeclared}
                  className="px-5 py-2 rounded-lg bg-madder-red text-warm-ivory text-xs font-semibold hover:bg-madder-red/90 transition shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Saving...' : editingArtwork ? 'Update Artwork' : 'Upload Artwork'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
