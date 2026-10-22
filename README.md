# Nikhil Kumar — Personal Portfolio & Research Showcase

An award-winning, futuristic, animation-rich personal portfolio website built for **Nikhil Kumar** — Computer Science & Cybersecurity undergraduate at SRM University–AP (2023–2027), software developer, AI/ML researcher, and agentic AI engineer.

Designed with a high-tech dark aesthetic: near-black canvas, electric violet, cyan neon glows, glassmorphism, fluid micro-interactions, and verified technical credentials.

---

## 🌟 Key Highlights & Features

- **Cinematic Introductions**: Custom animated monogram (`NK.`), cybernetic orbital loader, and smooth entrance transitions.
- **Hero & Dynamic Portrait**: Prominent professional photo frame with violet/cyan animated glow, live availability badge, and fallback to an elegant cyber monogram avatar if `public/images/profile.jpg` is not yet supplied.
- **Interactive Visual Comparison Area**: Medical image segmentation viewer showcasing SAM-ViT-B fine-tuning results against ground truth and original axial MRI scans (Dice: 0.9864, IoU: 0.9733, Pixel Accuracy: 99.93%).
- **Interactive Meeting Scheduler**: Integrated Calendly booking modal supporting both 15-minute introductory syncs and 30-minute technical discussions, with an automated email proposal fallback and confetti celebrations.
- **Live GitHub REST API Integration**: Real-time repository synchronization for `@nikhilkumar1920` with graceful rate-limit fallbacks and language filtering.
- **LeetCode Engineering Profile**: Problem distribution (Easy / Medium / Hard) breakdown, acceptance rate, and verified profile link.
- **Scholarly Publications**: Features Nikhil's research paper *"Domain-Aware Adaptation of the Segment Anything Model for Robust Brain Tumor Segmentation in MRI"* accepted at **Springer CVR 2026**.
- **Career & Achievements Timeline**: Detailed internship logs (Edunet Foundation/Microsoft & SRM University–AP) and honors (Amazon ML Summer School 2026, NULLPOINT CTF 3rd Runner-Up).
- **Direct Contact Channel & Mailto Fallback**: Fully validated interactive form with clipboard copy shortcuts and zero-config email routing.
- **Centralized Data Architecture**: All titles, biographies, projects, metrics, social links, and credentials reside in `src/data/portfolio.ts` with strict TypeScript types for instantaneous updates.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Motion & Dynamics**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom High-Fidelity SVG Brand Icons
- **Interactive FX**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Deployment**: Configured for [Vercel](https://vercel.com/) with native SPA rewrites in `vercel.json`

---

## 📁 Project Directory Structure

```text
portfolio/
├── public/
│   ├── favicon.svg                     # Custom futuristic "NK" monogram favicon
│   ├── robots.txt                      # Search engine crawler permissions
│   ├── sitemap.xml                     # XML sitemap for SEO discovery
│   ├── resume.pdf                      # Downloadable CV document (PDF format)
│   └── images/
│       ├── profile.jpg                 # [PUT YOUR PHOTO HERE]
│       └── projects/
│           ├── mri-original.svg        # Axial MRI input scan
│           ├── mri-groundtruth.svg     # Radiologist ground truth annotation
│           └── mri-predicted.svg       # SAM-ViT-B predicted tumor contour
├── src/
│   ├── data/
│   │   └── portfolio.ts                # ★ CENTRALIZED CONFIGURATION FILE ★
│   ├── hooks/
│   │   └── useTheme.ts                 # Theme mode controller (Dark / Light)
│   ├── components/
│   │   ├── Navbar.tsx                  # Sticky glass navigation bar + drawer
│   │   ├── Hero.tsx                    # Two-column hero + tech ticker
│   │   ├── About.tsx                   # Narrative + Build/Research/Secure cards
│   │   ├── Skills.tsx                  # Categorized skills matrix with filters
│   │   ├── Projects.tsx                # Featured project cards
│   │   ├── ProjectModal.tsx            # Full architecture deep-dive dialog
│   │   ├── VisualComparisonViewer.tsx  # MRI SAM vs Ground-Truth viewer
│   │   ├── GitHubProjects.tsx          # GitHub REST API live feed
│   │   ├── LeetCodeStats.tsx           # LeetCode statistics & difficulty bar
│   │   ├── Research.tsx                # Springer CVR 2026 publication card
│   │   ├── Experience.tsx              # Interactive timeline
│   │   ├── Achievements.tsx            # Amazon ML & CTF awards + education
│   │   ├── Contact.tsx                 # Contact form + copy-to-clipboard
│   │   ├── MeetingSchedulerModal.tsx   # Calendly integration modal
│   │   ├── SocialIcons.tsx             # Crisp SVG icons for GitHub & LinkedIn
│   │   ├── CustomCursor.tsx            # Desktop magnetic glowing cursor
│   │   ├── PageLoader.tsx              # Cinematic monogram boot animation
│   │   └── Footer.tsx                  # Back-to-top & copyright footer
│   ├── App.tsx                         # Main composition root
│   ├── index.css                       # Design tokens, gradients, utilities
│   └── main.tsx                        # React application bootstrap
├── .env.example                        # Environment variables template
├── tailwind.config.js                  # Tailwind theme and custom keyframes
├── vercel.json                         # Vercel SPA routing and security headers
└── package.json
```

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and **npm** installed on your machine.

### 2. Installation
Clone or navigate to the project directory and install the dependencies:
```bash
npm install
```

### 3. Running Locally in Development Mode
Launch the local development server:
```bash
npm run dev
```
Open your browser and navigate to `http://127.0.0.1:5173/` or `http://localhost:5173/`.

### 4. Production Build
Verify the production bundle compiles smoothly:
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## ⚙️ Customization & Personalization Guide

### 1. Centralized Data (`src/data/portfolio.ts`)
To update your biography, titles, project descriptions, skills, or metrics, simply edit `src/data/portfolio.ts`. You do not need to modify individual component files:
- `personal.name`, `personal.titles`, `personal.availability`
- `personal.socials` (GitHub, LinkedIn, LeetCode, email, phone)
- `projects` (add/remove projects, change tags, metrics, or GitHub URLs)
- `publication` (update Springer paper DOI URL when published)
- `leetcode` (update total solved, easy, medium, hard counts)

### 2. How to Add Your Professional Portrait Photo
1. Prepare your headshot or professional portrait (square or 4:5 aspect ratio works best).
2. Save it as `profile.jpg`.
3. Place it inside the `public/images/` directory:
   ```text
   public/images/profile.jpg
   ```
4. Refresh your browser! The website will automatically display your photograph inside the glowing gradient portrait frame with interactive tilt and floating cards.
*(If no image is added, the site gracefully displays the futuristic holographic "NK" monogram avatar).*

### 3. How to Replace Your Resume PDF
1. Export your latest resume as a PDF file named `resume.pdf`.
2. Place it in the `public/` directory, overwriting the placeholder:
   ```text
   public/resume.pdf
   ```
3. The "Download Resume" buttons in the navigation bar, hero section, and mobile drawer will immediately download your file.

### 4. Configuring Calendly for the Meeting Scheduler
To embed your real Calendly booking widget inside the scheduler modal:
1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```
2. Replace `YOUR_USERNAME` with your real Calendly link or event type:
   ```env
   VITE_CALENDLY_URL=https://calendly.com/your-username/introductory-meeting
   ```
3. Restart your dev server or redeploy. The modal will automatically load your live Calendly scheduler!

### 5. Configuring Contact Form Delivery
- **Default Behavior**: If no backend endpoint is configured, clicking "Send Message" automatically constructs a pre-formatted email in the visitor's default email client (`mailto:nikhilkumar20aug@gmail.com`).
- **Custom API / Serverless Function**: If you wish to use Resend, EmailJS, Formspree, or a Cloudflare Worker, set your endpoint in `.env`:
  ```env
  VITE_CONTACT_ENDPOINT=https://your-api.com/api/contact
  ```
  The contact form will then `POST` a JSON payload (`{ name, email, subject, message }`) and display verified success feedback.

---

## 🚢 Deployment to Vercel

The project includes `vercel.json` configured with SPA fallback rewrites and security headers.

### Deploy via Vercel CLI:
```bash
npm install -g vercel
vercel
```

### Deploy via GitHub:
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit of Nikhil Kumar portfolio"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Set the Build Command to `npm run build` and Output Directory to `dist`.
5. Under **Environment Variables**, add:
   - `VITE_CALENDLY_URL` = `https://calendly.com/your-username/introductory-meeting`
   - `VITE_CONTACT_ENDPOINT` *(optional)*
6. Click **Deploy**. Your portfolio will be live worldwide in seconds!

---

## 📄 License & Attribution

Designed and engineered with curiosity for **Nikhil Kumar**. All rights reserved.
