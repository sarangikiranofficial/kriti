/**
 * Kriti Application Configuration
 * All product naming, branding, and metadata can be edited here in a single place.
 */

export const APP_CONFIG = {
  name: 'Kriti',
  workingTitle: 'Kriti',
  tagline: 'From Craft to Click — The Living Heritage of Indian Art',
  shortTagline: 'From Craft to Click',
  description:
    'A digital sanctuary empowering traditional Indian folk, tribal, and classical artisans to build professional portfolios, preserve the sacred cultural narratives of their craft, and share their living heritage with the world.',
  socialShareHashtags: ['#IndianArt', '#TraditionalArt', '#Kriti', '#KritiArt', '#HeritageCrafts'],
  contactEmail: 'hello@kriti.art',
  languages: [
    { code: 'en', label: 'English', speechCode: 'en-IN' },
    { code: 'ml', label: 'മലയാളം (Malayalam)', speechCode: 'ml-IN' },
    { code: 'hi', label: 'हिन्दी (Hindi)', speechCode: 'hi-IN' },
    { code: 'ta', label: 'தமிழ் (Tamil)', speechCode: 'ta-IN' },
  ],
  defaultLanguage: 'en',
  defaultSpeechLanguage: 'en-IN',
  maxUploadSizeBytes: 5 * 1024 * 1024, // 5 MB
  acceptedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
};
