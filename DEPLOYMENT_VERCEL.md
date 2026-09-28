# Vercel Deployment Guide

This project is fully configured for deployment on **Vercel** with full-stack capabilities (Vite React SPA frontend + Express/Node.js Serverless API functions).

---

## 🚀 Quick Deploy (Option 1: Vercel Dashboard via GitHub)

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your repository.
4. Vercel will automatically detect the settings from `vercel.json`:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. **Environment Variables**:
   Under **Environment Variables**, add:
   - `GEMINI_API_KEY`: Your Google Gemini API Key (get one free at [aistudio.google.com](https://aistudio.google.com/app/apikey))
6. Click **Deploy**.

---

## 💻 Quick Deploy (Option 2: Vercel CLI)

1. Install the Vercel CLI (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. Link and deploy:
   ```bash
   vercel
   ```

3. Set your environment variable:
   ```bash
   vercel env add GEMINI_API_KEY
   ```

4. Deploy to production:
   ```bash
   vercel --prod
   ```

---

## 🛠️ Architecture on Vercel

* **Frontend (`/dist`)**: Static high-performance assets served via Vercel Edge CDN with automatic caching.
* **Backend (`/api/*`)**: Serverless function running via `/api/index.ts` connecting to `server.ts`.
  * `GET /api/college-info`: Institutional dataset for E.G.S. Pillay Engineering College (TNEA 3806).
  * `POST /api/chat`: Gemini 3.8 Flash AI counselor endpoint with conversational memory and instant fallback responses.
  * `POST /api/enquiry`: Admission callback submission endpoint.
* **Routing**: Handled by `vercel.json` with SPA HTML5 fallback (`/index.html`) and direct `/api/*` rewriting.
