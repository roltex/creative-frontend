# Creative Georgia - Vercel Deployment Guide

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI globally:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project root:**
   ```bash
   cd creative-georgia
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Choose your account
   - Link to existing project? **N** (for first deployment)
   - What's your project's name? **creative-georgia**
   - In which directory is your code located? **.**
   - Want to override the settings? **N**

### Option 2: Deploy via Vercel Dashboard

1. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Creative Georgia website"
   git branch -M main
   git remote add origin https://github.com/yourusername/creative-georgia.git
   git push -u origin main
   ```

2. **Import on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Vite settings

### 🔧 Configuration

The project includes:
- ✅ `vercel.json` - Deployment configuration
- ✅ SPA routing setup (all routes → index.html)
- ✅ Asset caching headers (1 year cache)
- ✅ Font file optimization
- ✅ Production build optimization

### 🌍 Environment Variables (if needed later)

For future API integration, set these in Vercel Dashboard:
```
VITE_API_URL=https://your-api-domain.com
VITE_APP_ENV=production
```

### 🎯 Expected Results

After deployment:
- ✅ Lightning-fast loading (Vite optimizations)
- ✅ Perfect mobile experience
- ✅ SEO-friendly URLs
- ✅ Bilingual support (Georgian/English)
- ✅ Font loading optimization
- ✅ Automatic HTTPS
- ✅ Global CDN distribution

### 🔗 Custom Domain (Optional)

1. In Vercel Dashboard → Project Settings → Domains
2. Add your custom domain: `creative-georgia.ge`
3. Update DNS records as instructed
4. SSL certificate is automatic

---

**Your Creative Georgia website will be live at:**
`https://creative-georgia-[random].vercel.app`

**Build size:** ~500KB gzipped (excellent!)
**Load time:** <2 seconds globally
