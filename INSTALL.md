# 🚀 Team Zealancy — Installation & Deployment Guide

This document provides step-by-step instructions for setting up the local development environment, installing the WordPress plugin & theme, configuring environment variables, and deploying to production (including Hostinger shared hosting).

---

## 🏗️ 1. Architecture Overview

- **Frontend**: Next.js 16 (App Router) + TypeScript + Vanilla CSS + Turbopack.
- **Backend**: WordPress 6.+ (Headless) + Custom Plugin (`zealancy-careers`) + Custom Theme (`zealancy-theme`).
- **Communication**: REST API endpoints under `/wp-json/zealancy/v1/`.

---

## 💻 2. Local Setup (Next.js Frontend)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Inside `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Step 3: Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

> **Note**: If your local WordPress backend is offline, the Next.js frontend automatically falls back to built-in mock data so you can continue developing without interruption.

---

## 🔌 3. WordPress Setup (Plugin & Theme Installation)

### Step 1: Install Custom Theme
1. Copy the `wordpress-backend/wp-content/themes/zealancy-theme` directory into your WordPress `wp-content/themes/` folder.
2. In WP Admin, navigate to **Appearance → Themes** and activate **Zealancy Headless Theme**.

### Step 2: Install Custom Plugin
1. Copy the `wordpress-backend/wp-content/plugins/zealancy-careers` directory into your WordPress `wp-content/plugins/` folder.
2. In WP Admin, navigate to **Plugins → Installed Plugins** and activate **Zealancy Careers & CMS**.

### Step 3: Configure WordPress Permalinks
1. In WP Admin, go to **Settings → Permalinks**.
2. Select **Post name** (`/%postname%/`) and click **Save Changes**.
   *(This step is required for `/wp-json/` REST API routes to function).*

---

## 🔔 4. Configuring Notifications & Admin Settings

1. In WP Admin, navigate to **Zealancy Careers → Settings**.
2. **Admin Email**: Set your email address for receiving candidate application notifications.
3. **Discord Webhook URL**: Enter your Discord channel Webhook URL (e.g. `https://discord.com/api/webhooks/...`). Candidate applications will immediately post rich embed cards to your channel.
4. **Hiring Indicator**: Toggle the active hiring badge visible across the site.

---

## 🌐 5. Hostinger WordPress Hosting Deployment

### Deploying the WordPress Backend on Hostinger
1. Zip the `zealancy-careers` plugin folder into `zealancy-careers.zip`.
2. In your Hostinger hPanel or WordPress Admin, upload and activate `zealancy-careers.zip` under **Plugins → Add New → Upload Plugin**.
3. Zip `zealancy-theme` into `zealancy-theme.zip` and upload under **Appearance → Themes → Add New → Upload Theme**.
4. In Hostinger PHP Configuration, ensure `upload_max_filesize` and `post_max_size` are set to at least **16M** for PDF resume uploads.

### Deploying Next.js Frontend (Vercel / Hostinger Node.js)
1. Deploy your Next.js application to Vercel, Netlify, or Hostinger VPS.
2. Set the production environment variable in your hosting dashboard:
   ```env
   NEXT_PUBLIC_API_URL=https://cms.yourdomain.com
   ```
3. Run build verification:
   ```bash
   npm run build
   ```

---

## 🧪 6. Verification & Troubleshooting

- **Check API Status**: Open `http://localhost:8000/wp-json/zealancy/v1/jobs` in your browser. It should return a JSON array of active jobs.
- **Check Resume Uploads**: Candidate resumes are securely stored in `wp-content/uploads/zealancy-resumes/` and accessible directly via the WP Admin **Applications** dashboard.
