# Kriti (कृति) — 4-Minute Hackathon Demonstration Script
**Theme / Problem Statement**: "From Craft to Click – Artist Visibility" (ART//CODE Hackathon)

---

## ⏱️ Minute 0:00 – 0:30 | The Problem & Cultural Context
- **Presenter**: *"Namaskaram. India has over 3,000 years of living art traditions—from Kerala Murals and Madhubani to Warli and Pattachitra. But when traditional artisans try to share their work online, they face a severe digital barrier. Modern e-commerce strips away the sacred meaning, requires fluent English typing, and turns sacred heritage into mere commodities."*
- **Action**: Open the Kriti Home Page (`/`). Point to the authentic heritage motifs, rice-paper texture, terracotta and deep maroon palette, and dignified hero statement: *"From Craft to Click — The Living Heritage of Indian Art."*
- **Key Message**: Cultural context must travel with every share.

---

## ⏱️ Minute 0:30 – 1:30 | Artist Onboarding & Voice Biography
- **Presenter**: *"Traditional artists shouldn't need digital marketing skills or English proficiency. Let's sign in to the Artist Studio with a passwordless 1-click magic link."*
- **Action**:
  1. Click **"Artist Sign In"**, enter email, and navigate to the **Dashboard**.
  2. In the **Profile Editor**, point out the **Name in Regional Script** field (`നാരായണൻ മാരാർ`).
  3. Under **Artist Biography**, click the **Voice "Tell Your Story"** microphone button.
  4. Select **മലയാളം (Malayalam)** and speak: *"ഞാൻ തൃശൂർ സ്വദേശിയാണ്, പരമ്പരാഗത ചുവർചിത്ര രചനയിൽ 20 വർഷത്തെ അനുഭവമുണ്ട്..."*
  5. Show how the native Web Speech API transcribes speech into text without any paid API or LLM call, remaining fully keyboard-editable.
  6. Click **Save Profile**. Show the generated public slug `/a/narayan-marar-kerala-mural`.

---

## ⏱️ Minute 1:30 – 2:30 | Artwork Upload & Guided Cultural Story
- **Presenter**: *"Now, let's exhibit a traditional masterpiece in the Artwork Gallery."*
- **Action**:
  1. Click **"Add Artwork"**. Select an artwork image.
  2. Point out that the image is **automatically compressed client-side** using HTML5 Canvas to under 1-2 MB, ensuring lightning-fast uploads on 3G/4G rural mobile connections.
  3. Fill title: *"Tree of Life"*, medium: *"Natural vegetable dyes on handmade canvas"*.
  4. Scroll to **Cultural Context / Story**. Show the 3 guided prompts:
     - *(a) "What is this artwork and what does it show?"*
     - *(b) "Who taught you, and how is it made?"*
     - *(c) "What does it mean in your tradition?"*
  5. Highlight the mandatory **Ethical Ownership Declaration Checkbox**: *"This work is mine, or I have the artist's permission to share it. No AI alteration of sacred iconography."*
  6. Click **Upload Artwork**. The artwork is saved directly to Supabase Postgres & Storage.

---

## ⏱️ Minute 2:30 – 3:15 | Shareable Artwork Card & Multilingual Captions
- **Presenter**: *"How does the artist reach patrons on social media without writing marketing copy?"*
- **Action**:
  1. Open the public portfolio at `/a/:slug`.
  2. Click **"Share"** on the artwork to open the **Artwork Share Card**. Show the mounted-print design with the artist's name, cultural snippet, and portfolio link.
  3. Click **"Download"**—demonstrate that `html-to-image` generates a crisp 2x resolution PNG ready for Instagram.
  4. Click **"WhatsApp"**—show the pre-filled `wa.me` message with cultural context snippet.
  5. Open **"Captions"** (Caption Generator). Toggle between **Malayalam (default)**, **English**, **Hindi**, and **Tamil**. Switch tones between *Story*, *Fresh Creation*, and *Commission Open*.
  6. Point out the visible notice: *"Please review the caption before posting"* and click **Copy Caption**.

---

## ⏱️ Minute 3:15 – 3:45 | Portfolio QR Code & Buyer Enquiry Flow
- **Presenter**: *"When an artisan exhibits at physical craft fairs or temple festivals, how do visitors connect?"*
- **Action**:
  1. Click **"Share & QR Code"**. Show the high-contrast downloadable QR code branded with the artist's name and art form, ready to print for stall counters.
  2. Switch to an art patron's perspective. Click **"Enquire / Commission"** on the artwork.
  3. Fill in buyer name (*Radhika*), contact (*+91 98765 43210*), type (*Buy Artwork*), and submit.
  4. Note the invisible **honeypot spam defense** preventing bot abuse.
  5. Return to the artist's **Dashboard > Enquiries Tab**. Show the new inquiry appearing in real time, with 1-click **WhatsApp Reply** and **Email Reply** shortcuts!

---

## ⏱️ Minute 3:45 – 4:00 | Ethics & Future Roadmap
- **Presenter**:
  - *"Zero fake data: every portfolio, artwork, and enquiry comes directly from real database records."*
  - *"Zero paid APIs: completely free for grassroots artisans."*
  - *"Full IP ownership: artists own 100% of their images and words."*
  - *"Future scope: offline PWA sync, escrow buyer payments, and verified guild badges."*
  - *"Thank you! Nandri, Dhanyavad, and Namaskaram."*
