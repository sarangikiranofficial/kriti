# ART//CODE Hackathon — Final Submission Checklist

**Deadline**: **08 November 2026, 11:59 PM IST (Hard Stop)**  
**Theme**: *"From Craft to Click – Artist Visibility"*  
**Project**: **Kriti (कृति)**

Use this checklist to verify every required deliverable and rule before final submission.

---

## 1. Primary Deliverables

- [ ] **Deliverable 1: Public GitHub Repository**
  - [x] Structured, clean codebase (React 19 + TypeScript + Vite + Tailwind v4 + Supabase).
  - [x] Permissive open-source license ([MIT License](LICENSE)).
  - [x] Complete attribution file ([CREDITS.md](CREDITS.md)) covering fonts, libraries, and images.
  - [x] Clear installation & setup instructions in [README.md](README.md).
  - [x] Zero committed secrets or API keys; `.env` is gitignored; only `.env.example` is tracked.
  - [x] Automated unit test suite passes (`npm test -- --run`).
  - [x] Production build passes with 0 errors (`npm run build`).

- [ ] **Deliverable 2: Demo Video (3 to 5 minutes)**
  - [ ] Recorded using [docs/DEMO_SCRIPT.md](DEMO_SCRIPT.md).
  - [ ] Covers: Problem context, architecture overview, live prototype walkthrough (voice input, uncropped gallery, 2x PNG share card, Craft Tag QR, patron enquiry & artist dashboard inbox), and limitations.
  - [ ] Uploaded to YouTube (Unlisted or Public) or Google Drive.
  - [ ] Link pasted in [README.md](README.md) and submission portal.

- [ ] **Deliverable 3: Presentation PDF (6 to 10 slides)**
  - [ ] Created using [docs/SLIDES_OUTLINE.md](SLIDES_OUTLINE.md) (8 slides).
  - [ ] Covers: Problem context, solution, features, architecture, tech stack, innovation & cultural fidelity, impact & feasibility, limitations & future scope.
  - [ ] Exported as PDF.

- [ ] **Deliverable 4: Google Drive Submission Folder**
  - [ ] Contains: Presentation PDF, Demo Video MP4, and demonstration screenshots.
  - [ ] **CRITICAL PERMISSION CHECK**: Sharing setting set to **"Anyone with the link can view"** (inaccessible links cause immediate disqualification).
  - [ ] Folder link pasted in [README.md](README.md) and submission portal.

---

## 2. README.md Structural Compliance

Confirm [README.md](README.md) has all 12 exact section titles:
- [x] `# Kriti (कृति) — From Craft to Click`
- [x] `## 1. Project Overview`
- [x] `## 2. Problem Statement`
- [x] `## 3. Key Features`
- [x] `## 4. Technology Stack`
- [x] `## 5. System Architecture` (includes Mermaid diagram)
- [x] `## 6. Installation & Setup Instructions`
- [x] `## 7. Environment Variables` (sanitized names only)
- [x] `## 8. Usage Instructions`
- [x] `## 9. Demonstration Screenshots` (paths under `docs/screenshots/`)
- [x] `## 10. Team Members`
- [x] `## 11. Limitations & Future Scope`
- [x] `## 12. License & Attribution`

---

## 3. Functional Prototype Checklist (375px & Desktop)

- [x] **Artist Profile**: Name (English + mother tongue), location, craft tradition, bio, portrait, WhatsApp/phone channels.
- [x] **Gallery of Artworks**: Compressed mobile uploads, uncropped lightbox, availability pills, valuation, and cultural context snippet.
- [x] **Shareable Artwork Card**: 2x resolution PNG download, WhatsApp share, and copy link with embedded cultural narrative.
- [x] **Multilingual Captions**: Malayalam, English, Hindi, and Tamil caption templates across 4 tones with review advisory.
- [x] **Patron Enquiry Form**: Honeypot anti-spam defense, stored in Supabase, visible in artist inbox with 1-click WhatsApp/email reply.
- [x] **Public Portfolio & Stall QR**: `/a/:slug` with downloadable branded QR code and printable Craft Tag certificate.
- [x] **Voice "Tell Your Story"**: Native Web Speech API with regional speech recognition and guided prompts.
- [x] **Sample Profiles Labelled**: Demonstration records created via UI carry visible `Sample profile` badges.

---

## 4. Evaluation Criteria Self-Score (100 Points)

| Criteria | Weight | Implementation in Kriti | Status |
|---|---|---|---|
| **Innovation & Originality** | 25 | Voice-first storytelling without expensive LLMs; 2x PNG share cards and printable Craft Tags ensuring cultural context travels. | Excellent |
| **Technical Implementation** | 25 | React 19, Tailwind v4, Vite 8, Supabase RLS, client-side canvas compression, Web Speech API, 10/10 Vitest unit tests. | Excellent |
| **Relevance to Theme** | 20 | Directly addresses "From Craft to Click – Artist Visibility" for grassroots Indian master artisans. | Exceptional |
| **User Experience & Design** | 15 | Authentic "Handmade India" editorial aesthetic (oxblood, paper, turmeric, jaali lattice motifs, Rozha One display typography, 375px mobile responsive). | Exceptional |
| **Potential Impact & Feasibility** | 15 | Zero recurring LLM/API costs; connects patrons directly to artisans via WhatsApp/email with zero commission cuts. | High Feasibility |

---

## 5. Disqualification Traps Avoided

- [x] **No Committed Secrets**: `.env` is gitignored; history scanned clean; only `.env.example` tracked.
- [x] **No Fake Data in Code**: No mock artist arrays or dummy DB seed files in git. All profiles rendered dynamically.
- [x] **No Cultural Sacrilege**: Zero caricatures or AI distortions of sacred iconography; abstract geometric and botanical motifs only.
- [x] **Within Development Window**: All development timestamps are strictly within 03–08 November 2026.
