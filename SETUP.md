# Setup & Deployment Guide — Kriti

Follow this step-by-step guide to configure the Supabase backend, run the project locally, and deploy to Vercel.

---

## 1. Prerequisites
- **Node.js**: v18.0.0 or later (v24 LTS recommended)
- **npm**: v9.0.0 or later
- A free **Supabase** account ([supabase.com](https://supabase.com))
- A free **Vercel** account ([vercel.com](https://vercel.com))

---

## 2. Setting Up Supabase Backend

### Step 2.1: Create a Supabase Project
1. Log in to your [Supabase Dashboard](https://app.supabase.com).
2. Click **New Project**, select an organization, and choose a name (e.g. `kriti-art`).
3. Set a strong database password and choose your nearest region (e.g., `South Asia (Mumbai)`).
4. Click **Create new project** and wait ~2 minutes for provisioning.

### Step 2.2: Run the Database Schema & Policies
1. In your Supabase project dashboard, navigate to the **SQL Editor** (icon on the left navigation bar).
2. Click **New query**.
3. Open `supabase/schema.sql` from this repository, copy its entire contents, and paste it into the SQL Editor.
4. Click **Run** (or press `Ctrl+Enter` / `Cmd+Enter`).
5. Verify in the output table that the following tables and policies were created successfully:
   - `public.artists`
   - `public.artworks`
   - `public.enquiries`
   - Row Level Security (RLS) policies for all three tables
   - `artworks` public storage bucket and storage policies

### Step 2.3: Configure Storage (Automatic via schema.sql)
The SQL script creates the `artworks` bucket with:
- Public read enabled (so public portfolios can render artwork images).
- 5 MB file size limit.
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`.
- RLS policies ensuring artists can only upload into their own folder.
*To verify:* Go to **Storage** in the Supabase sidebar and confirm that the `artworks` bucket exists with the **Public** badge.

### Step 2.4: Configure Email Magic Link Authentication
1. Go to **Authentication** > **Providers** > **Email**.
2. Ensure **Email provider** is **Enabled**.
3. Under **Sign In / Sign Up**, ensure **Confirm email** is set according to your preference (for frictionless testing, disabling email confirmation or setting redirect URL is standard).
4. In **Authentication** > **URL Configuration**, set:
   - **Site URL**: `http://localhost:5173` (during local development) or your Vercel domain (in production).
   - **Redirect URLs**: Add both `http://localhost:5173/**` and `https://your-app.vercel.app/**`.

---

## 3. Local Environment Configuration

1. In the root directory of this repository, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. In Supabase Dashboard, go to **Project Settings** (gear icon) > **API**.
3. Copy the **Project URL** and the **anon public key**.
4. Open `.env` and fill in the values:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
> [!CAUTION]
> **Never commit `.env` or paste the `service_role` secret key!** Only the `anon` public key should ever be placed in `VITE_SUPABASE_ANON_KEY`.

---

## 4. Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 5. Running Tests

Run the Vitest test suite for slug and multilingual caption generation:
```bash
npm test
# or run in headless single-run mode:
npx vitest run
```

---

## 6. Deploying to Vercel

### Option A: Via Vercel Web Dashboard (Recommended)
1. Push your repository to GitHub.
2. In [Vercel Dashboard](https://vercel.com/dashboard), click **Add New...** > **Project**.
3. Import your GitHub repository.
4. Framework Preset will automatically detect **Vite**.
5. Expand **Environment Variables** and add:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon public key
6. Click **Deploy**.
7. Once deployed, copy your production domain (e.g., `https://kala-katha.vercel.app`) and add it to your Supabase project's **Redirect URLs** in **Authentication** > **URL Configuration**.

### Option B: Via Vercel CLI
```bash
npx vercel
# Follow the interactive prompts, then set environment variables:
npx vercel env add VITE_SUPABASE_URL
npx vercel env add VITE_SUPABASE_ANON_KEY
npx vercel --prod
```

The included `vercel.json` ensures all client-side routes (`/a/:slug`, `/dashboard`, etc.) resolve seamlessly to `/index.html`.
