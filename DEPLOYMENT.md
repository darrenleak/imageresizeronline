# Deployment Guide - GitHub Pages

## Quick Setup (5 minutes)

### Step 1: Update `next.config.ts` for Your Repo

**If your repo is:** `https://github.com/yourusername/imageresizeronline`

And will be deployed to: `https://yourusername.github.io/imageresizeronline`

Then you need to set the `basePath` in `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/imageresizeronline', // <-- Add this line with your repo name
};
```

**If your repo is:** `https://github.com/yourusername/yourusername.github.io`

And will be deployed to: `https://yourusername.github.io`

Then leave `basePath` commented out (no basePath needed):

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // basePath not needed for username.github.io repos
};
```

---

### Step 2: Enable GitHub Pages in Your Repo

1. Go to your GitHub repo
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - Source: **GitHub Actions** (important!)
   - Don't select "Deploy from a branch"

---

### Step 3: Push Your Code

```bash
git add .
git commit -m "Set up GitHub Pages deployment"
git push origin main
```

(Use `master` instead of `main` if that's your default branch)

---

### Step 4: Watch It Deploy! 🚀

1. Go to the **Actions** tab in your GitHub repo
2. You'll see "Deploy to GitHub Pages" running
3. Wait 2-3 minutes for it to complete
4. Your site will be live at:
   - `https://yourusername.github.io` (if username.github.io repo)
   - `https://yourusername.github.io/reponame` (if other repo)

---

## How It Works

### On Every Push to `main`:
1. GitHub Actions triggers automatically
2. Installs Node.js and dependencies
3. Runs `npm run build` (creates static files in `/out`)
4. Deploys the `/out` folder to GitHub Pages
5. Your site updates automatically! 🎉

### Local Testing

Test the production build locally:

```bash
# Build static files
npm run build

# The output is in the /out folder
# You can serve it with any static server:
npx serve out
```

---

## Troubleshooting

### 404 on Assets/CSS?
- Check that `basePath` in `next.config.ts` matches your repo name
- Make sure you're using the correct repo type (username.github.io vs regular repo)

### Build Fails?
- Check the Actions tab for error messages
- Make sure all dependencies are in `package.json` (not just devDependencies)
- Test locally with `npm run build` first

### Changes Not Showing?
- Wait 2-3 minutes after push (GitHub Pages caching)
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Check if Actions workflow completed successfully

---

## Adding New Blog Posts

Just add markdown files to `/posts/` and push:

```bash
# Create new post
echo "---
title: My New Post
date: 2025-10-28
categories: [Tutorial]
tags: [resize]
---

# Content here!" > posts/my-new-post.md

# Push to trigger deployment
git add posts/my-new-post.md
git commit -m "Add new blog post"
git push
```

GitHub Actions will automatically rebuild and deploy! 🚀

---

## Custom Domain (Optional)

Want to use your own domain? (e.g., `imageresizer.com`)

1. Add a file called `CNAME` to `/public/` with your domain:
   ```
   imageresizer.com
   ```

2. In your domain registrar, add DNS records:
   ```
   A     @     185.199.108.153
   A     @     185.199.109.153
   A     @     185.199.110.153
   A     @     185.199.111.153
   CNAME www   yourusername.github.io
   ```

3. In GitHub Settings → Pages, add your custom domain

4. Push and deploy!

---

## Summary

✅ **Automatic deployment** - Just push to main/master  
✅ **Free hosting** - GitHub Pages is free  
✅ **Fast builds** - 2-3 minutes from push to live  
✅ **Static site** - Super fast, great SEO  
✅ **Blog posts** - Just add markdown files  

You're all set! 🎉

