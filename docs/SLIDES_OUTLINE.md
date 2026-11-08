# Kriti (कृति) — Presentation Slides Outline

**Hackathon Track**: ART//CODE Hackathon — *"From Craft to Click – Artist Visibility"*  
**Target Duration**: 8 Slides (Presentation PDF, 6–10 slides guideline)  
**Submission Format**: Export to PDF and place in your Google Drive submission folder.

---

## Slide 1: Problem Context — The Traditional Artisan's Digital Dilemma
- **Title**: From Craft to Click: The Visibility Crisis for India's Traditional Artisans
- **Subtitle**: Millennia-old sacred traditions trapped behind language, bandwidth, and intermediary barriers.
- **Key Points**:
  - Over 7 million traditional Indian artisans preserve rare folk, tribal, and classical arts (Madhubani, Warli, Kerala Mural, Pattachitra, Gond).
  - **The Digital Literacy Divide**: Fluent in mother tongues (Malayalam, Hindi, Tamil), but intimidated by English marketing forms.
  - **The Context Void**: Social media circulates images without lineage, sacred geometry, natural dyes, or cultural context.
  - **Exploitative Middlemen**: Commercial platforms charge 30%–50% commission while completely obscuring the artist's contact details.
- **Visual Cue**: Split visual showing a generational artisan painting natural pigments vs. a sterile e-commerce grid with no attribution.

---

## Slide 2: The Solution — Introducing Kriti (कृति)
- **Title**: Kriti — Preserving the Soul of Indian Art in the Digital Age
- **Subtitle**: A lightweight, mobile-first showcase where cultural context travels with every share.
- **Value Proposition**:
  - **Voice-First Storytelling**: Speak in your native language; structured cultural narratives are generated instantly.
  - **Cultural Context That Travels**: Every shared card, QR code, and caption permanently binds the artisan's name and story to their artwork.
  - **Direct Zero-Commission Patronage**: Direct WhatsApp, phone, and honeypot-protected enquiries connecting patrons straight to rural studios.
  - **Authenticity First**: Zero fake data in production, ethical ownership declarations, and strict respect for sacred iconography.
- **Visual Cue**: The Kriti heritage landing page poster with the "Kriti / कृति" wordmark in Rozha One and handcrafted jaali motifs.

---

## Slide 3: Key Features & Workflows
- **Title**: Core Features Engineered for the Grassroots Artisan
- **Key Points**:
  1. **Voice Storytelling ("Tell Your Story")**: Native Web Speech API with regional speech recognition (`ml-IN`, `hi-IN`, `ta-IN`, `en-IN`) and guided prompts. Zero paid LLMs or API costs.
  2. **Client-Side Compression**: High-res camera photos auto-compressed via HTML5 Canvas (`<= 5MB WebP/JPEG`) for 2G/3G rural networks.
  3. **High-Res Shareable Cards**: 2x resolution PNG cards with artwork, artist name, art form, and embedded cultural narrative (`html-to-image`).
  4. **Bilingual Social Captions**: Instant captions in English, Malayalam, Hindi, and Tamil across 4 distinct tones (*Storyteller, Festive, Collector, Minimal*).
  5. **Physical Craft Tag & QR**: Downloadable high-contrast QR code for stall banners and printable packaging tags.
- **Visual Cue**: Carousel grid of the shareable card, multilingual caption modal, and printable Craft Tag.

---

## Slide 4: System Architecture & Security
- **Title**: Lightweight, Robust & Secure Architecture
- **Key Points**:
  - **Frontend**: React 19 + TypeScript + Vite 8 deployed on Vercel edge network for sub-second global page loads.
  - **Backend**: Supabase Managed PostgreSQL with rigorous Row Level Security (RLS):
    - Public read for published artists and artworks.
    - Owner-only write for studio dashboards.
    - Public insert with honeypot spam protection for patron enquiries.
  - **Zero-Secret Client**: All authentication handled via Supabase passwordless magic links; client only holds public anon keys.
- **Visual Cue**: Embed the Mermaid architecture diagram from README.md showing client, edge router, and database tiers.

---

## Slide 5: Technology Stack & Engineering Excellence
- **Title**: Modern Tech Stack with Zero Runtime Bloat
- **Components**:
  - **React 19 & React Router 7**: Single Page App with fast client routing and dynamic Open Graph SEO meta tags.
  - **Tailwind CSS v4**: Authentic "Handmade India" design system (Oxblood `#3A1D18`, Paper `#F6EEDC`, Turmeric `#E0A526`, Madder `#A63D2F`).
  - **Typography**: Google Fonts OFL (*Rozha One*, *Fraunces*, *Mukta*, *Noto Serif Malayalam*, *Noto Sans Devanagari*, *Noto Sans Tamil*).
  - **Performance**: 100% client-side QR generation (`qrcode`) and PNG card rendering (`html-to-image`).
  - **Testing**: 10/10 automated unit test coverage with Vitest.
- **Visual Cue**: Tech logo badges and a test execution snippet showing clean passes.

---

## Slide 6: Innovation & Cultural Fidelity
- **Title**: Innovation Grounded in Respect for Living Heritage
- **Key Differentiators**:
  - **Voice Without LLM Hallucinations**: Uses browser-native Web Speech API to capture verbatim artist words without generative distortion of sacred narratives.
  - **No Sacred Iconography Alteration**: Strict adherence to geometric and botanical motifs; zero AI tampering with traditional iconography or sacred mudras.
  - **Sovereign Attribution**: Every exported PNG card, QR link, and WhatsApp message embeds the artist's full name, state, and cultural background.
  - **Ethical Safeguard**: Mandatory checkbox asserting ownership or authorized stewardship before any artwork is listed.
- **Visual Cue**: Highlight the exported mounted-print share card and the cultural narrative callout.

---

## Slide 7: Potential Impact & Feasibility
- **Title**: Empowering India's 7+ Million Artisans
- **Feasibility & Economics**:
  - **Zero Operational API Cost**: No recurring OpenAI/LLM subscription fees. The free-tier Supabase and Vercel stack can host thousands of artisan profiles sustainably.
  - **Direct Livelihood Impact**: Eliminating 40% middlemen commissions means 100% of the sale value reaches the artisan family directly.
  - **Exhibition Ready**: Masters at crafts melas (e.g., Surajkund, Dilli Haat, Kochi-Muziris) can print one QR code for stall banners and receive orders 365 days a year.
- **Visual Cue**: Map of India showing key craft clusters (Madhubani in Bihar, Warli in Maharashtra, Pattachitra in Odisha, Kerala Mural in Kerala).

---

## Slide 8: Limitations & Future Scope
- **Title**: Current Limitations & Strategic Roadmap
- **Limitations**:
  - *Browser Speech Support*: Native on Chrome, Edge, and Android Chrome; Safari/Firefox require fallback keyboard typing.
  - *Dialect Nuances*: Regional caption templates require artist review prior to social publishing.
  - *Direct Negotiation*: No in-app payment gateway; payments happen via direct UPI/bank transfer.
- **Future Roadmap**:
  - *PWA Offline Mode*: Offline artwork drafting for remote forest and tribal hamlets.
  - *Govt Craft Board Integration*: Official verification with Development Commissioner for Handicrafts / TRIFED.
  - *Escrow Protection*: Milestone-based UPI escrow for high-value custom commissions.
  - *Audio Narration*: Direct audio playback so patrons hear the master's voice in their ears.
- **Closing Tagline**: *"From Craft to Click — Giving India's generational masters the sovereign stage they deserve."*
