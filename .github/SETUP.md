# GitHub Pages Setup Guide

## Quick Setup (2 minutes)

### Step 1: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** (top tab)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select **"GitHub Actions"**
5. Click **Save**

### Step 2: Verify Configuration
Your `astro.config.mjs` should have:
```javascript
export default defineConfig({
  site: 'https://yourusername.github.io/yourrepo', // Update this!
  // ... other config
});
```

For a custom domain:
```javascript
export default defineConfig({
  site: 'https://yourdomain.com',
  // ... other config
});
```

### Step 3: Deploy
Push to the `master` branch and the deployment will start automatically!

## What Happens Next?

1. **Build workflow** runs first (builds your site)
2. **Deploy workflow** runs second (publishes to GitHub Pages)
3. Your site will be available at the URL configured in Step 2

## Troubleshooting

### ❌ "Get Pages site failed"
- You skipped Step 1 above
- Go back and enable GitHub Pages

### ❌ Site shows 404
- Check your `site` URL in `astro.config.mjs`
- Wait a few minutes for DNS propagation

### ❌ Build fails
- Check the Actions tab for error details
- Common issue: merge conflicts in `package.json`

## Alternative: Manual Deployment

If you don't want GitHub Pages:
1. Use the **Build Only** workflow
2. Download the build artifacts
3. Upload the `dist/` folder to your hosting service

---

Need help? Check the full README.md or open an issue!
