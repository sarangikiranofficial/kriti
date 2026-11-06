import React, { useState, useEffect } from 'react';
import { Camera, Save, ExternalLink, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';
import { supabase } from '../../lib/supabase';
import { generateSlug } from '../../lib/slugify';
import { compressImage } from '../../lib/imageCompressor';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Jammu & Kashmir', 'Ladakh'
];

const AVAILABLE_LANGUAGES = [
  'English', 'Malayalam (മലയാളം)', 'Hindi (हिन्दी)', 'Tamil (தமிழ்)',
  'Telugu (తెలుగు)', 'Kannada (ಕನ್ನಡ)', 'Bengali (বাংলা)', 'Marathi (मराठी)',
  'Odia (ଓଡ଼ିଆ)', 'Gujarati (ગુજરાતી)'
];

export const ProfileEditor: React.FC = () => {
  const { user, artist, refreshArtist } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [nameRegional, setNameRegional] = useState('');
  const [artForm, setArtForm] = useState('');
  const [locationState, setLocationState] = useState('Kerala');
  const [locationDistrict, setLocationDistrict] = useState('');
  const [bio, setBio] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['English', 'Malayalam (മലയാളം)']);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [portraitUrl, setPortraitUrl] = useState<string | null>(null);

  const [isUploadingPortrait, setIsUploadingPortrait] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (artist) {
      setName(artist.name || '');
      setNameRegional(artist.name_regional || '');
      setArtForm(artist.art_form || '');
      setLocationState(artist.location_state || 'Kerala');
      setLocationDistrict(artist.location_district || '');
      setBio(artist.bio || '');
      setSelectedLanguages(artist.languages_spoken || ['English']);
      setWhatsappNumber(artist.whatsapp_number || '');
      setPhone(artist.phone || '');
      setInstagram(artist.instagram || '');
      setPortraitUrl(artist.portrait_url || null);
    }
  }, [artist]);

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handlePortraitUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setIsUploadingPortrait(true);
      const compressed = await compressImage(file, 800, 0.85);

      const filePath = `${user.id}/portrait-${Date.now()}.${compressed.file.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage
        .from('artworks')
        .upload(filePath, compressed.file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('artworks')
        .getPublicUrl(filePath);

      setPortraitUrl(publicUrlData.publicUrl);
      showToast('Portrait image uploaded successfully!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to upload portrait.', 'error');
    } finally {
      setIsUploadingPortrait(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!name.trim() || !artForm.trim() || !bio.trim()) {
      showToast('Please fill in required fields: Name, Art Form, and Biography.', 'error');
      return;
    }

    try {
      setIsSaving(true);
      const slug = artist?.slug || generateSlug(name, artForm);

      const profilePayload = {
        id: user.id,
        slug,
        name: name.trim(),
        name_regional: nameRegional.trim() || null,
        art_form: artForm.trim(),
        location_state: locationState,
        location_district: locationDistrict.trim() || null,
        bio: bio.trim(),
        languages_spoken: selectedLanguages,
        portrait_url: portraitUrl,
        whatsapp_number: whatsappNumber.trim() || null,
        phone: phone.trim() || null,
        instagram: instagram.trim() || null,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('artists')
        .upsert(profilePayload);

      if (error) throw error;

      await refreshArtist();
      showToast('Profile saved successfully!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to save profile.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Live Portfolio Link Banner if artist profile exists */}
      {artist && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-paper-cream border border-terracotta/30 rounded-xl gap-3">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-terracotta block">
              Your Public Portfolio Link
            </span>
            <span className="text-sm font-mono text-indigo-ink font-medium">
              /a/{artist.slug}
            </span>
          </div>
          <a
            href={`/a/${artist.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-warm-ivory border border-terracotta/30 text-xs font-semibold text-madder-red hover:bg-white transition"
          >
            <span>View Public Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Portrait Upload Section */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-warm-ivory border border-terracotta/20 rounded-xl">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-terracotta/40 bg-paper-cream overflow-hidden flex items-center justify-center">
            {portraitUrl ? (
              <img
                src={portraitUrl}
                alt="Artist portrait"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="w-8 h-8 text-charcoal/40" />
            )}
          </div>
          <label className="absolute bottom-0 right-0 p-2 bg-madder-red text-warm-ivory rounded-full shadow-md cursor-pointer hover:bg-madder-red/90 transition">
            <Camera className="w-4 h-4" />
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePortraitUpload}
              disabled={isUploadingPortrait}
              className="hidden"
            />
          </label>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="font-serif text-lg font-bold text-indigo-ink">
            Artist Portrait / Studio Photo
          </h3>
          <p className="text-xs text-charcoal/70 mt-1 max-w-md">
            Upload a clear photo of yourself or your work studio. Images are automatically compressed to ensure fast loading on mobile devices.
          </p>
          {isUploadingPortrait && (
            <span className="text-xs text-terracotta font-medium animate-pulse mt-2 inline-block">
              Compressing &amp; uploading photo...
            </span>
          )}
        </div>
      </div>

      {/* Primary Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-indigo-ink mb-1.5">
            Full Name <span className="text-madder-red">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Narayan Marar"
            className="w-full px-3.5 py-2.5 rounded-lg border border-terracotta/30 bg-warm-ivory focus:ring-2 focus:ring-madder-red outline-none text-sm text-charcoal"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-indigo-ink mb-1.5">
            Name in Regional Script (Optional)
          </label>
          <input
            type="text"
            value={nameRegional}
            onChange={(e) => setNameRegional(e.target.value)}
            placeholder="e.g. നാരായണൻ മാരാർ / नारायण मरार"
            className="w-full px-3.5 py-2.5 rounded-lg border border-terracotta/30 bg-warm-ivory focus:ring-2 focus:ring-madder-red outline-none text-sm text-charcoal"
          />
          <span className="text-[11px] text-charcoal/60 mt-1 block">
            Helps visitors view your name in your mother tongue.
          </span>
        </div>
      </div>

      {/* Art Form & Location */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-indigo-ink mb-1.5">
            Art Form / Tradition <span className="text-madder-red">*</span>
          </label>
          <input
            type="text"
            required
            value={artForm}
            onChange={(e) => setArtForm(e.target.value)}
            placeholder="e.g. Kerala Mural, Warli, Madhubani"
            className="w-full px-3.5 py-2.5 rounded-lg border border-terracotta/30 bg-warm-ivory focus:ring-2 focus:ring-madder-red outline-none text-sm text-charcoal"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-indigo-ink mb-1.5">
            State <span className="text-madder-red">*</span>
          </label>
          <select
            value={locationState}
            onChange={(e) => setLocationState(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-terracotta/30 bg-warm-ivory focus:ring-2 focus:ring-madder-red outline-none text-sm text-charcoal"
          >
            {INDIAN_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-indigo-ink mb-1.5">
            District / Village (Optional)
          </label>
          <input
            type="text"
            value={locationDistrict}
            onChange={(e) => setLocationDistrict(e.target.value)}
            placeholder="e.g. Thrissur / Palakkad"
            className="w-full px-3.5 py-2.5 rounded-lg border border-terracotta/30 bg-warm-ivory focus:ring-2 focus:ring-madder-red outline-none text-sm text-charcoal"
          />
        </div>
      </div>

      {/* Biography */}
      <div>
        <label className="block text-sm font-semibold text-indigo-ink mb-1.5">
          Artist Biography &amp; Heritage <span className="text-madder-red">*</span>
        </label>
        <textarea
          rows={4}
          required
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell visitors about your journey, gurus, lineage, and passion for traditional art..."
          className="w-full px-3.5 py-2.5 rounded-lg border border-terracotta/30 bg-warm-ivory focus:ring-2 focus:ring-madder-red outline-none text-sm text-charcoal leading-relaxed"
        />
        <span className="text-[11px] text-charcoal/60 mt-1 block">
          Tip: You can use the Voice "Tell Your Story" mic feature on artwork cards to speak in your native tongue.
        </span>
      </div>

      {/* Languages Spoken */}
      <div>
        <label className="block text-sm font-semibold text-indigo-ink mb-2">
          Languages Spoken / Understood
        </label>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_LANGUAGES.map((lang) => {
            const isSelected = selectedLanguages.includes(lang);
            return (
              <button
                type="button"
                key={lang}
                onClick={() => toggleLanguage(lang)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition touch-target ${
                  isSelected
                    ? 'bg-madder-red text-warm-ivory shadow-xs'
                    : 'bg-warm-ivory border border-terracotta/30 text-charcoal hover:border-terracotta'
                }`}
              >
                {lang}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contact & Social Information */}
      <div className="p-6 bg-warm-ivory border border-terracotta/20 rounded-xl space-y-4">
        <h4 className="font-serif text-base font-bold text-indigo-ink flex items-center gap-2">
          <Phone className="w-4 h-4 text-madder-red" />
          <span>Contact &amp; Enquiry Channels</span>
        </h4>
        <p className="text-xs text-charcoal/70">
          These allow prospective art patrons and buyers to connect with you directly on your portfolio.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-charcoal mb-1">
              WhatsApp Number (with country code)
            </label>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="e.g. +919876543210"
              className="w-full px-3 py-2 rounded-lg border border-terracotta/30 bg-paper-cream focus:bg-warm-ivory outline-none text-sm text-charcoal"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +919876543210"
              className="w-full px-3 py-2 rounded-lg border border-terracotta/30 bg-paper-cream focus:bg-warm-ivory outline-none text-sm text-charcoal"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal mb-1">
              Instagram Handle
            </label>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="e.g. @traditionalkalamural"
              className="w-full px-3 py-2 rounded-lg border border-terracotta/30 bg-paper-cream focus:bg-warm-ivory outline-none text-sm text-charcoal"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-madder-red text-warm-ivory font-medium hover:bg-madder-red/90 transition shadow-sm touch-target disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving Profile...' : 'Save Profile'}</span>
        </button>
      </div>
    </form>
  );
};
