# Image Resizer Online

A modern, fast, and secure image resizer built with Next.js. Process images entirely in your browser - no uploads needed!

## Features

### Image Resizer
- 🖼️ **Batch Processing** - Upload and process multiple images at once
- 📐 **Flexible Resizing** - Resize by dimensions or percentage
- 🔄 **Rotation** - Rotate images 90°, 180°, or 270°
- 🎨 **Format Conversion** - Convert between JPG, PNG, GIF, WebP, and TIFF
- ⚡ **Quality Control** - Adjustable quality slider for optimal file size
- 🔒 **Privacy First** - All processing happens in your browser
- 💾 **Automatic Download** - Processed images download automatically

### Blog System
- 📝 **Markdown Support** - Write blog posts in markdown
- 🏷️ **Categories & Tags** - Organize posts with categories and tags
- 🎯 **SEO Optimized** - Static generation for best SEO performance
- 📱 **Responsive Design** - Beautiful on all devices

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Markdown**: react-markdown with remark & rehype
- **Image Processing**: HTML5 Canvas API

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── blog/              # Blog pages
│   │   ├── page.tsx       # Blog index
│   │   └── [slug]/        # Individual blog posts
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (resizer)
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── FileUploader.tsx   # Initial upload interface
│   ├── ImageGrid.tsx      # Image preview grid
│   └── SettingsPanel.tsx  # Resize settings
├── lib/                   # Utilities
│   ├── blog.ts           # Blog post utilities
│   ├── imageProcessor.ts # Image processing logic
│   └── types.ts          # TypeScript types
├── posts/                 # Blog posts (markdown)
│   ├── post-1.md
│   └── post-2.md
└── public/               # Static assets
```

## Adding Blog Posts

Create a new markdown file in the `posts/` directory:

```markdown
---
title: "Your Post Title"
date: "2025-10-28"
excerpt: "A short description of your post"
categories: ["Category 1", "Category 2"]
tags: ["tag1", "tag2", "tag3"]
---

# Your Post Title

Your content here...
```

Posts will automatically appear on the blog page and generate individual pages.

## Image Processing Features

### Resize Modes
1. **By Dimensions** - Set exact width and/or height (auto-calculates missing dimension)
2. **By Percentage** - Scale images by percentage (e.g., 50% = half size)

### Rotation Options
- No rotation (0°)
- 90° clockwise
- 180°
- 90° counter-clockwise

### Output Formats
- JPG (image/jpeg)
- PNG (image/png)
- GIF (image/gif)
- WebP (image/webp)
- TIFF (image/tiff)

### Quality Settings
Adjustable from 1-100%, with 70-80% recommended for optimal balance between quality and file size.

## Design Philosophy

- **Minimalist** - Clean, uncluttered interface
- **Colorful** - Vibrant gradients and modern aesthetics
- **Progressive Disclosure** - Simple upload screen, then detailed settings
- **Mobile-First** - Responsive design that works everywhere

## Performance

- ⚡ Static Site Generation for blog posts
- 🚀 Client-side image processing (no server delays)
- 📦 Optimized bundle size with Next.js
- 🎨 Tailwind CSS for minimal CSS footprint

## SEO Strategy

This rebuild is designed for SEO success:
1. Static blog posts for fast loading and crawlability
2. Proper metadata and OpenGraph tags
3. Semantic HTML structure
4. Fast page loads with Next.js optimization
5. Content-rich blog posts targeting image optimization keywords

## Future Enhancements

Ideas for future development:
- [ ] Drag-to-reorder images in grid
- [ ] Preview before/after comparison
- [ ] Bulk rename options
- [ ] Image optimization suggestions
- [ ] EXIF data preservation options
- [ ] Watermark support
- [ ] Crop tool
- [ ] Filter/effects

## License

This project is private and proprietary.

## Contributing

This is a personal project. For questions or suggestions, please contact the owner.

---

Built with ❤️ using Next.js and Tailwind CSS
