# Kriti (कृति) — From Craft to Click

A mobile-first, lightweight web application empowering traditional Indian folk, tribal, and classical artisans to build professional digital portfolios, preserve the living cultural context behind their work, and connect directly with global patrons without complex digital skills.

Built for the **ART//CODE Hackathon** (03–08 November 2026) | Problem Statement: *"From Craft to Click – Artist Visibility"*.

---

### Project Links & Submission Deliverables
- **Live Application URL**: `[Insert Vercel / Deployed App URL here]`
- **Demo Video (3–5 mins)**: `[Insert YouTube or Google Drive Video URL here]`
- **Google Drive Submission Folder**: `[Insert Google Drive folder link containing Video MP4, Presentation PDF, and Assets here]`
- **GitHub Repository**: `[Insert Public GitHub Repository URL here]`

---

## 1. Project Overview

**Kriti** (from Sanskrit *कृति*, meaning a consecrated creation, work of art, or masterwork) is an authentic, dignified digital platform created for grassroots Indian craftspeople—masters of Madhubani, Warli, Kerala Mural, Pattachitra, Gond, Kalamkari, Tanjore, and other generational craft lineages.

Unlike conventional e-commerce marketplaces that commodify sacred and traditional arts and extract heavy fees, Kriti ensures that **cultural context travels with every share**. It provides voice-driven storytelling in regional mother tongues (Malayalam, Hindi, Tamil), client-side image compression for low-bandwidth rural connections, downloadable mounted-print share cards, bilingual social caption templates, printable exhibition stall QR codes, and direct buyer/commission enquiries with zero middlemen or commission fees.

Strict quality standard: **Zero fake or hardcoded artist data in production code**. All artist profiles, artworks, cultural stories, and enquiries are rendered dynamically from real Supabase Postgres records with tasteful empty states. Sample profiles used for demonstrations are clearly labelled as **"Sample profile"** in the UI.

---

## 2. Problem Statement

Traditional Indian artisans face severe structural barriers in the modern digital economy:

1. **The Digital Literacy Divide**: Many master artisans speak and think in their regional mother tongues (Malayalam, Hindi, Tamil, Odia) but find typing complex marketing copy or product listings in English intimidating.
2. **Loss of Cultural Context**: When photos of sacred paintings, handloom weaves, or tribal crafts are circulated online, the lineage, natural mineral pigments, sacred iconography, and guru-shishya heritage are stripped away.
3. **Exploitative Intermediaries**: Commercial marketplaces often take 30% to 50% commission margins and obscure the artist's contact details, preventing direct patronage and generational sustainability.
4. **Bandwidth & Device Constraints**: High-resolution mobile camera photos fail to upload over 2G/3G/4G connections without fast client-side image optimization.

**Kriti addresses this** by making the creation of a professional digital portfolio as simple as speaking into a phone microphone, generating shareable cards with cultural narratives embedded, and connecting patrons directly to the artisan's studio.

---

## 3. Key Features

1. **Voice-First Storytelling ("Tell Your Story")**:
   - Native Web Speech API integration (`SpeechRecognition`) with zero paid third-party APIs or LLM runtime dependencies.
   - Regional speech recognition language selector (`ml-IN` Malayalam, `hi-IN` Hindi, `ta-IN` Tamil, `en-IN` English).
   - 3 Guided Storytelling Prompts:
     - *(a) "What is this artwork and what does it show?"*
     - *(b) "Who taught you, and how is it made?"*
     - *(c) "What does it mean in your tradition?"*
   - Real-time listening pulse, continuous keyboard editing fallback, and browser compatibility handling.

2. **Artist Profile & Identity**:
   - Passwordless, barrier-free login via Supabase Email Magic Links.
   - Dual-script support: artist name in Latin script and optional mother-tongue script (`name_regional`, e.g., in Malayalam, Devanagari, or Tamil).
   - Profile with art form, Indian state and district, biography, languages spoken, portrait upload, and direct WhatsApp/phone contact channels.
   - Automatic unique slug generation (e.g. `/a/narayan-marar-kerala-mural`).

3. **Artwork Gallery Manager**:
   - Client-side image compression (`<= 5MB`, HTML5 Canvas WebP/JPEG) optimized for mobile connections.
   - Core fields: Title, regional title, medium/materials, year, dimensions, price (or "Price on Request" toggle), availability status (`available`, `reserved`, `sold`, `archived`).
   - First-class **Cultural Context / Narrative** story field.
   - Mandatory ethical declaration checkbox: *"This work is mine, or I have the artist's permission to share it."*
   - Responsive grid, uncropped lightbox view, edit, and delete controls for the authenticated artist.

4. **Shareable Artwork Cards**:
   - Designed mounted-print card featuring artwork image, title, artist name, location, art form, cultural context narrative snippet, and portfolio URL.
   - **Download as Image**: Exports crisp 2x resolution PNG using `html-to-image`.
   - **Share via WhatsApp**: Direct `wa.me` link pre-filled with formatted title, artist, story snippet, and URL.
   - **Copy Link & Native Share Sheet**: Full clipboard and Web Share API support.
   - Dynamic Open Graph meta tags (`og:title`, `og:description`, `og:image`, `og:url`) for rich social link previews.

5. **Multilingual Social Media Caption Templates**:
   - Generates social captions in **Malayalam (Default)**, **English**, **Hindi**, and **Tamil**.
   - 4 Curated Tones:
     - *Storyteller*: Highlights lineage, natural mineral pigments, and cultural heritage.
     - *Festive / Exhibition*: Studio announcement for upcoming melas and exhibitions.
     - *Collector / Patron*: Detailed artistic specifications for art collectors.
     - *Minimal*: Clean caption with attribution and portfolio link.
   - Live editable textarea preview + one-click copy button.
   - Visible native-speaker review recommendation notice.

6. **Direct Patron Enquiry / Commission Workflow**:
   - Embedded on all artist portfolios and artwork detail pages.
   - Fields: Name, contact (email or phone), message, enquiry type (*Buy / Commission / Collaboration / Workshop*), optional budget.
   - **Honeypot Spam Defense**: Invisible honeypot field dropping bot submissions without blocking genuine patrons.
   - Private Artist Dashboard Inbox: Received enquiries with read/unread status toggle, 1-click **WhatsApp Reply** and **Email Reply** shortcuts.

7. **Public Mobile Portfolio & Printable Craft Tag QR Codes**:
   - Public mobile-first URL at `/a/:slug` (optimized for 375px+ viewports).
   - High-contrast downloadable QR code (PNG, via `qrcode`) with the artist's name and art form branded for physical craft exhibitions, visiting cards, and parcel tags.
   - Printable **Craft Tag** physical certificate modal for packaging.

8. **Discovery & Search Engine**:
   - Home page dynamically discovers registered artisans from Supabase Postgres.
   - Multi-parameter live search: free-text keyword search across names, regional scripts, crafts, locations, and bios.
   - Reactive filters: Art Form, Indian State, and Spoken Language.
   - Authentic empty states with handloom weave textures.

---

## 4. Technology Stack

- **Frontend Framework**: React 19 + TypeScript + Vite 8
- **Routing**: React Router 7 (`react-router-dom`)
- **Styling & Design System**: Tailwind CSS v4 (`@tailwindcss/vite`) with custom authentic Indian heritage tokens:
  - *Deep Oxblood / Walnut* (`#3A1D18`), *Charcoal* (`#2B2622`), *Paper* (`#F6EEDC`), *Ivory* (`#FBF6EA`), *Madder Red* (`#A63D2F`), *Turmeric Gold* (`#E0A526`), *Terracotta* (`#C8683F`), *Leaf Green* (`#4F6B3A`), *Sage* (`#8A9A78`), *Soft Clay* (`#E7CDB4`).
- **Typography (Google Fonts / OFL)**:
  - Display Wordmarks & Headlines: *Rozha One* & *Fraunces*
  - Body & Labels: *Mukta*
  - Malayalam: *Noto Serif Malayalam* & *Noto Sans Malayalam*
  - Devanagari & Tamil: *Noto Sans Devanagari* & *Noto Sans Tamil*
- **Animation**: Framer Motion (respects `prefers-reduced-motion`)
- **Backend & Database**: Supabase (PostgreSQL with Row Level Security, Supabase Auth via Email Magic Links, Supabase Storage)
- **Client Utilities**:
  - `qrcode`: Client-side QR generation for physical craft stalls.
  - `html-to-image`: Client-side rendering of shareable artwork cards and craft tags to high-resolution PNG.
  - `lucide-react`: Lightweight, accessible icon set.
  - HTML5 Canvas: Client-side image compression (`<= 5MB`, WebP/JPEG).
  - Web Speech API: Native voice-to-text input with regional locale support.
- **Unit Testing**: Vitest 5
- **Deployment**: Vercel (configured with `vercel.json` SPA routing rewrites)

---

## 5. System Architecture

```mermaid
flowchart TD
    subgraph UserClients ["Patrons & Traditional Artists"]
        MobileClient["Mobile Browser (375px+)<br/>Touch-First Actions & Audio"]
        DesktopClient["Desktop Browser<br/>Studio Dashboard & Discovery"]
    end

    subgraph FrontendApp ["Kriti React Application (Vercel)"]
        Router["React Router v7<br/>(/, /login, /dashboard, /a/:slug, /about)"]
        DesignSys["Tailwind v4 Design System<br/>(Paper Grain, Warm Ivory, Oxblood, Madder)"]
        VoiceModule["Web Speech Engine<br/>(en-IN, ml-IN, hi-IN, ta-IN • Zero LLM)"]
        Compressor["Client Image Compressor<br/>(HTML5 Canvas &lt;= 5MB WebP/JPG)"]
        CardExporter["Share Card &amp; QR Generator<br/>(html-to-image, qrcode)"]
    end

    subgraph SupabasePlatform ["Supabase Backend (Managed Postgres &amp; Auth)"]
        AuthService["Supabase Auth<br/>(Passwordless Magic Link)"]
        RLS["PostgreSQL Row Level Security<br/>(Public Read, Owner Write, Public Enquiry Insert)"]
        StorageBucket["Supabase Storage<br/>('artworks' Bucket)"]
        
        subgraph DatabaseTables ["PostgreSQL Tables"]
            T_Artists[("artists<br/>id, slug, name, bio, portrait_url")]
            T_Artworks[("artworks<br/>id, artist_id, title, cultural_context")]
            T_Enquiries[("enquiries<br/>id, artist_id, sender_contact, message")]
        end
    end

    UserClients --> Router
    Router --> DesignSys
    DesignSys --> VoiceModule
    DesignSys --> Compressor
    DesignSys --> CardExporter
    
    Compressor -->|Upload Compressed Artwork| StorageBucket
    AuthService -->|Session Token| RLS
    Router -->|Authenticate| AuthService
    Router -->|Query &amp; Mutate Data| RLS
    RLS --> T_Artists
    RLS --> T_Artworks
    RLS --> T_Enquiries
```

---

## 6. Installation & Setup Instructions

### Prerequisites
- Node.js (v18.0.0 or later; v20+ recommended)
- npm (v9.0.0 or later)
- A free Supabase account ([supabase.com](https://supabase.com))

### Local Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/artcode.git
   cd artcode
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your Supabase project URL and anon public key (see Section 7).

4. **Initialize Supabase Database & Storage**:
   - Open your project in the [Supabase Dashboard](https://app.supabase.com).
   - Navigate to the **SQL Editor** tab.
   - Copy the entire contents of `supabase/schema.sql` and run it.
   - This creates tables (`artists`, `artworks`, `enquiries`), performance indexes, Row Level Security policies, and the `artworks` storage bucket.

5. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

6. **Run Unit Tests**:
   ```bash
   npm test -- --run
   ```

7. **Production Build**:
   ```bash
   npm run build
   ```

---

## 7. Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```env
# Supabase Project URL (Dashboard > Settings > API > Project URL)
VITE_SUPABASE_URL=your_supabase_project_url_here

# Supabase Anon Public Key (Dashboard > Settings > API > Project API keys > anon public)
VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key_here
```

> [!CAUTION]
> **Security Notice**: Never commit `.env` or expose the `service_role` secret key! Only use `VITE_SUPABASE_ANON_KEY` on the client. `.env` is gitignored by default.

---

## 8. Usage Instructions

### For Traditional Artists
1. **Sign In**: Navigate to `/login`, enter your email, and click the magic link sent to your inbox.
2. **Setup Profile**: In the **Profile & Biography** tab, enter your name, regional script name, art form, location, and bio. Use the **Voice "Tell Your Story"** microphone button to speak your bio in Malayalam, Hindi, Tamil, or English. Upload a portrait and add your WhatsApp contact number.
3. **Upload Artwork**: Switch to the **Artworks Gallery** tab and click **Add Artwork**. Choose an image (auto-compressed), enter dimensions/medium, and use the guided voice prompts to record the cultural story. Tick the ethical ownership declaration and save.
4. **Share**: View your public portfolio at `/a/:slug`. Tap **Share Card** to download an image for Instagram/WhatsApp, or **Share & QR Code** to download a printable stall QR code.
5. **Manage Enquiries**: Check the **Enquiries & Commissions** tab to review messages from art patrons with 1-click WhatsApp and email reply shortcuts.

### For Art Patrons & Collectors
1. **Explore**: Browse living craft traditions on the Home page (`/`) using search keywords or filtering by Art Form, Indian State, or Language.
2. **Read the Story**: Click any artist or artwork to view full-resolution pieces and understand their sacred origin.
3. **Direct Contact**: Click **Enquire / Buy** or **WhatsApp Artist** to negotiate custom commissions or acquire artworks directly without platform fees.

---

## 9. Demonstration Screenshots

Place demonstration screenshots in the `docs/screenshots/` directory:

| Feature | Screenshot Path | Description |
|---|---|---|
| **Discovery & Home Page** | `docs/screenshots/01_home_discovery.png` | Heritage hero section with live multi-parameter search & filters |
| **Artist Studio Onboarding** | `docs/screenshots/02_artist_studio_onboarding.png` | Artist profile editor with voice biography recording |
| **Artwork Upload & Story** | `docs/screenshots/03_artwork_upload_story.png` | Artwork upload with guided voice storytelling prompts & ethical declaration |
| **Public Artist Portfolio** | `docs/screenshots/04_public_portfolio.png` | Mobile-first public portfolio page at `/a/:slug` with artwork grid |
| **Artwork Lightbox View** | `docs/screenshots/05_artwork_lightbox_narrative.png` | Uncropped artwork display with full cultural context narrative |
| **Shareable Artwork Card** | `docs/screenshots/06_shareable_card_export.png` | Designed mounted-print card with 2x PNG export & WhatsApp share |
| **Multilingual Captions** | `docs/screenshots/07_multilingual_captions.png` | Caption generator with Malayalam, English, Hindi, and Tamil tones |
| **Stall QR Code Panel** | `docs/screenshots/08_qr_code_display.png` | Printable branded QR code with artist name and art form |
| **Patron Enquiry Modal** | `docs/screenshots/09_enquiry_modal.png` | Commission form with honeypot bot spam defense |
| **Artist Private Inbox** | `docs/screenshots/10_artist_enquiries_inbox.png` | Received enquiries dashboard with WhatsApp and email reply shortcuts |

---

## 10. Team Members

*(Fill in before submission)*
- **Team Member 1**: `[Your Name]` — `[Role, e.g. Full-Stack Developer & Designer]` — `[GitHub: @username]`
- **Track**: ART//CODE Hackathon — *"From Craft to Click – Artist Visibility"*
- **Date**: 08 November 2026

---

## 11. Limitations & Future Scope

### Current Limitations
1. **Voice Input Browser Support**: The Web Speech API is supported natively on Google Chrome, Microsoft Edge, Chromium-based browsers, and Android Chrome. Apple Safari and desktop Firefox have limited or vendor-flagged support. The app detects this gracefully and provides instant keyboard typing fallback.
2. **Regional Caption Template Validation**: While caption templates have been crafted in authentic Malayalam, Hindi, and Tamil, regional variations and dialects exist across states. Captions include a visible notice advising artists to review text before publishing; formal native-speaker linguistic validation is recommended as new art forms join.
3. **Sample Profiles Labelled**: Demonstration artists created in the database are clearly labelled with a **"Sample profile"** badge in the UI to ensure patrons distinguish test records from live master profiles.
4. **No In-App Payment Gateway**: To preserve 100% fair trade and eliminate transaction commissions, payments and shipping are coordinated directly between patron and artist via WhatsApp and email.
5. **No Automated Content Moderation**: Platform integrity currently relies on the mandatory ethical declaration checkbox. Large-scale public rollouts will benefit from community reporting and artisanal guild verification.

### Future Scope
- **Progressive Web App (PWA) Offline Mode**: Allow artists in remote craft clusters to draft artworks offline and synchronize automatically when connectivity is restored.
- **Master Artisan Verification**: Partner with governmental craft boards (e.g., Development Commissioner for Handicrafts, TRIFED) to provide digital authenticity seals.
- **Escrow-Based Milestone Payments**: Introduce optional UPI-based milestone escrow for high-value commission orders.
- **Audio Storytelling Playback**: Allow patrons to listen directly to the artist's spoken voice narrative while admiring the artwork.

---

## 12. License & Attribution

- **License**: Released under the open-source [MIT License](LICENSE).
- **Fonts & Typography**: Licensed under the [SIL Open Font License](CREDITS.md) (Google Fonts: *Rozha One*, *Fraunces*, *Mukta*, *Noto Serif Malayalam*, *Noto Sans Malayalam*, *Noto Sans Devanagari*, *Noto Sans Tamil*).
- **Libraries**: All open-source dependencies are listed in [CREDITS.md](CREDITS.md).
- **Cultural Attribution**: Traditional art styles, motifs, and sacred geometries belong immutably to the hereditary and indigenous communities of India.
