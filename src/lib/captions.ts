import { APP_CONFIG } from '../config/appConfig';
import type { Artwork, Artist } from '../types/database.types';

export type CaptionLanguage = 'ml' | 'en' | 'hi' | 'ta';
export type CaptionTone = 'story' | 'announcement' | 'commission';

export interface CaptionOptions {
  language: CaptionLanguage;
  tone: CaptionTone;
  artwork: Artwork;
  artist: Artist;
  portfolioUrl?: string;
}

export const CAPTION_LANGUAGES: { code: CaptionLanguage; label: string; scriptClass: string }[] = [
  { code: 'ml', label: 'മലയാളം (Malayalam - Default)', scriptClass: 'font-ml-sans' },
  { code: 'en', label: 'English', scriptClass: 'font-sans' },
  { code: 'hi', label: 'हिन्दी (Hindi)', scriptClass: 'font-hi' },
  { code: 'ta', label: 'தமிழ் (Tamil)', scriptClass: 'font-ta' },
];

export const CAPTION_TONES: { code: CaptionTone; label: string; description: string }[] = [
  { code: 'story', label: 'Story & Lineage', description: 'Deep cultural narrative, traditional materials, and sacred heritage' },
  { code: 'announcement', label: 'Fresh Creation', description: 'Studio update announcing a newly completed piece' },
  { code: 'commission', label: 'Commission Open', description: 'Inviting patrons for custom orders, workshops, and collaborations' },
];

export function generateCaption({
  language,
  tone,
  artwork,
  artist,
  portfolioUrl,
}: CaptionOptions): string {
  const url = portfolioUrl || `${window.location.origin}/a/${artist.slug}#artwork-${artwork.id}`;
  const hashtags = APP_CONFIG.socialShareHashtags.join(' ');
  const title = artwork.title_regional && language === 'ml' ? `${artwork.title} (${artwork.title_regional})` : artwork.title;
  const artistName = artist.name_regional && language === 'ml' ? `${artist.name} (${artist.name_regional})` : artist.name;
  const location = `${artist.location_district ? `${artist.location_district}, ` : ''}${artist.location_state}`;
  const storySnippet = artwork.cultural_context.trim();

  switch (language) {
    case 'ml': // Malayalam (Default)
      if (tone === 'story') {
        return (
          `പരമ്പരാഗത കലയുടെ ജീവസ്സുറ്റ പാരമ്പര്യം പങ്കുവെക്കുന്നു: "${title}"\n\n` +
          `കലാകാരൻ: ${artistName} (${artist.art_form}, ${location})\n` +
          `മാധ്യമം: ${artwork.medium}\n\n` +
          `സാംസ്കാരിക കഥയും പശ്ചാത്തലവും:\n"${storySnippet}"\n\n` +
          `കൂടുതൽ വിവരങ്ങൾക്കും കലാകാരന്റെ പോർട്ട്ഫോളിയോ സന്ദർശിക്കാനും:\n${url}\n\n` +
          `${hashtags} #KeralaArt #MalayalamArt #TraditionalIndianArt`
        );
      }
      if (tone === 'announcement') {
        return (
          `സ്റ്റുഡിയോയിൽ നിന്ന് പുതിയ പരമ്പരാഗത സൃഷ്ടി: "${title}"\n\n` +
          `രചന: ${artistName} | ${artist.art_form}\n` +
          `മാധ്യമം: ${artwork.medium}${artwork.dimensions ? ` | അളവ്: ${artwork.dimensions}` : ''}\n\n` +
          `സൃഷ്ടിയുടെ സവിശേഷത:\n"${storySnippet}"\n\n` +
          `ഈ സൃഷ്ടി സ്വന്തമാക്കാനും കലാകാരനുമായി നേരിട്ട് ബന്ധപ്പെടാനും താഴെയുള്ള ലിങ്ക് സന്ദർശിക്കുക:\n${url}\n\n` +
          `${hashtags}`
        );
      }
      // commission
      return (
        `പരമ്പരാഗത ${artist.art_form} ശൈലിയിൽ കസ്റ്റം ചിത്രങ്ങൾക്കും പ്രത്യേക ഓർഡറുകൾക്കും ഇപ്പോൾ അവസരമുണ്ട്.\n\n` +
        `കലാകാരൻ: ${artistName} (${location})\n` +
        `പ്രത്യേകത: സ്വാഭാവിക മാധ്യമങ്ങൾ, തലമുറകളായി കൈമാറിവന്ന പാരമ്പര്യം.\n\n` +
        `കലാസൃഷ്ടികൾ കാണാനും അന്വേഷണങ്ങൾ അയക്കാനും:\n${url}\n\n` +
        `${hashtags} #ArtCommission #CustomArt`
      );

    case 'hi': // Hindi
      if (tone === 'story') {
        return (
          `भारतीय पारंपरिक कला की जीवंत धरोहर: "${title}"\n\n` +
          `कलाकार: ${artistName} (${artist.art_form}, ${location})\n` +
          `माध्यम: ${artwork.medium}\n\n` +
          `सांस्कृतिक संदर्भ एवं कथा:\n"${storySnippet}"\n\n` +
          `कलाकृति के बारे में और जानने तथा कलाकार से जुड़ने के लिए:\n${url}\n\n` +
          `${hashtags} #IndianFolkArt #Handmade`
        );
      }
      if (tone === 'announcement') {
        return (
          `पारंपरिक स्टूडियो से नई कलाकृति: "${title}"\n\n` +
          `कलाकार: ${artistName} | कला रूप: ${artist.art_form}\n` +
          `माध्यम: ${artwork.medium}${artwork.dimensions ? ` | आकार: ${artwork.dimensions}` : ''}\n\n` +
          `कलाकृति का विवरण:\n"${storySnippet}"\n\n` +
          `कलाकृति प्राप्त करने अथवा अधिक जानकारी के लिए:\n${url}\n\n` +
          `${hashtags}`
        );
      }
      // commission
      return (
        `पारंपरिक ${artist.art_form} में विशेष कलाकृतियों (कमीशन) हेतु संपर्क करें।\n\n` +
        `कलाकार: ${artistName} (${location})\n` +
        `अपने घर और कार्यालय के लिए प्रामाणिक पारंपरिक कला सीधे कलाकार से प्राप्त करें।\n\n` +
        `पोर्टफोलियो देखें और संपर्क करें:\n${url}\n\n` +
        `${hashtags} #ArtCommission`
      );

    case 'ta': // Tamil
      if (tone === 'story') {
        return (
          `பாரம்பரியக் கலையின் தொன்மை: "${title}"\n\n` +
          `கலைஞர்: ${artistName} (${artist.art_form}, ${location})\n` +
          `ஊடகம்: ${artwork.medium}\n\n` +
          `கலாச்சாரப் பின்னணி மற்றும் கதை:\n"${storySnippet}"\n\n` +
          `கலைஞரின் போர்ட்ஃபோலியோ பார்க்கவும் தொடர்புகொள்ளவும்:\n${url}\n\n` +
          `${hashtags} #TamilArt #IndianCrafts`
        );
      }
      if (tone === 'announcement') {
        return (
          `புதிய கலைப்படைப்பு: "${title}"\n\n` +
          `கலைஞர்: ${artistName} | கலை முறை: ${artist.art_form}\n` +
          `ஊடகம்: ${artwork.medium}${artwork.dimensions ? ` | அளவு: ${artwork.dimensions}` : ''}\n\n` +
          `கலைப் பின்னணி:\n"${storySnippet}"\n\n` +
          `மேலும் அறிய மற்றும் தொடர்புகொள்ள:\n${url}\n\n` +
          `${hashtags}`
        );
      }
      // commission
      return (
        `பாரம்பரிய ${artist.art_form} முறையில் உங்கள் விருப்பத்திற்கேற்ப புதிய ஓவியங்கள் பெற தொடர்புகொள்ளலாம்.\n\n` +
        `கலைஞர்: ${artistName} (${location})\n` +
        `போர்ட்ஃபோலியோ பார்க்க மற்றும் தொடர்பு கொள்ள:\n${url}\n\n` +
        `${hashtags}`
      );

    case 'en': // English
    default:
      if (tone === 'story') {
        return (
          `Preserving centuries of living Indian heritage: "${title}"\n\n` +
          `Artist: ${artistName} (Practicing traditional ${artist.art_form} from ${location}, India)\n` +
          `Medium: ${artwork.medium}${artwork.year ? ` • Created: ${artwork.year}` : ''}\n\n` +
          `The Cultural Story & Sacred Lineage:\n"${storySnippet}"\n\n` +
          `Discover the full narrative and connect with the artist directly on Kala Katha:\n${url}\n\n` +
          `${hashtags} #TraditionalArt #IndigenousArt #IndianHeritage`
        );
      }
      if (tone === 'announcement') {
        return (
          `Fresh from the traditional studio: "${title}"\n\n` +
          `Created by ${artistName} (${artist.art_form})\n` +
          `Materials: ${artwork.medium}${artwork.dimensions ? ` • Size: ${artwork.dimensions}` : ''}\n\n` +
          `Story behind the craft:\n"${storySnippet}"\n\n` +
          `View specifications and enquire directly with the artist:\n${url}\n\n` +
          `${hashtags}`
        );
      }
      // commission
      return (
        `Custom commissions and workshops now open in traditional ${artist.art_form}.\n\n` +
        `Artist: ${artistName} (${location}, India)\n` +
        `Bring the authentic beauty and sacred stories of handmade Indian art into your collection.\n\n` +
        `Explore the digital portfolio & send an enquiry:\n${url}\n\n` +
        `${hashtags} #CustomArt #ArtCollector #FairTradeArt`
      );
  }
}
