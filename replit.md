# First State Auctions - Next.js Static Site

## Overview
A Next.js 14 static site that replicates the UI/UX of a luxury auction website (First State Auctions). The application features fine jewellery, Swiss watches, and designer bags with a beautiful, responsive design. Built for static hosting deployment (IIS, Netlify, Vercel, etc.).

## Tech Stack
- **Framework**: Next.js 14 with App Router and TypeScript
- **Rendering**: Static Site Generation (SSG) with Static Export
- **Styling**: Tailwind CSS with custom design tokens (gold/black/white luxury theme)
- **CMS**: Tina CMS (configured, ready for content management)
- **UI Components**: Shadcn UI components
- **Fonts**: Inter (sans-serif), Playfair Display (serif for headings)

## Project Structure
```
app/
├── layout.tsx              # Root layout with Header/Footer
├── page.tsx                # Home page
├── auctions/
│   ├── page.tsx            # Auction listing
│   └── [id]/page.tsx       # Auction detail with catalogue
├── products/
│   ├── page.tsx            # Product listing
│   └── [id]/page.tsx       # Product detail with bidding UI
├── categories/
│   └── [slug]/page.tsx     # Category listing
├── about/page.tsx          # About page
├── contact/page.tsx        # Contact form
├── selling/page.tsx        # Sell your items page
└── past-sales/page.tsx     # Past auction results

components/
├── layout/
│   ├── Header.tsx          # Site header with navigation
│   └── Footer.tsx          # Site footer
├── common/
│   ├── HeroCarousel.tsx    # Hero image carousel
│   └── CountdownTimer.tsx  # Auction countdown
└── ui/                     # Shadcn UI components

lib/
├── data.ts                 # Static data for SSG
├── types.ts                # TypeScript interfaces
└── utils.ts                # Utility functions

tina/
└── config.ts               # Tina CMS configuration

content/                    # Tina CMS content directory
├── auctions/
├── products/
├── categories/
├── pages/
└── settings/
```

## Key Features
- **Static Site Generation**: All pages pre-rendered at build time
- **SEO Optimized**: Proper metadata, Open Graph tags, semantic HTML
- **Responsive Design**: Mobile-first approach with luxury aesthetics
- **Image Optimization**: Unsplash images with Next.js Image component
- **Client Interactivity**: Hero carousel, countdown timers, image galleries

## Design System
- **Primary Color**: Gold (#D4A843) - HSL: 43 74% 49%
- **Foreground**: Near black for text
- **Background**: White/light gray
- **Font**: Inter (sans-serif), Playfair Display (serif for headings)
- **Border Radius**: Small (6px) for consistent styling

## Pages
- `/` - Home page with hero carousel, current auctions, featured items, categories
- `/auctions` - All auctions with status filtering (Open, Upcoming, Closed)
- `/auctions/:id` - Auction detail with catalogue
- `/products` - All products with category filtering
- `/products/:id` - Product detail with bidding interface
- `/categories/:slug` - Category listing
- `/about` - About page
- `/contact` - Contact form
- `/selling` - Sell your items page
- `/past-sales` - Past auction results

## Development Commands
```bash
# Start development server (Next.js)
npx next dev -p 5000

# Build static site
npx next build

# Export static site (outputs to 'out' directory)
npx next build  # output: export is configured in next.config.js

# Run with Tina CMS
npx tinacms dev -c "next dev -p 5000"
```

## Deployment
The site is configured for static export. After running `npx next build`, the static files will be in the `out` directory, ready for deployment to any static hosting service:
- IIS (Windows Server)
- Netlify
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront
- GitHub Pages

## Tina CMS Integration
Tina CMS is configured with schemas for:
- **Auctions**: Title, description, dates, status, image
- **Products**: Title, description, images, estimates, specifications
- **Categories**: Name, slug, description, image
- **Pages**: General page content
- **Settings**: Site-wide settings

To use Tina CMS:
1. Run `npx tinacms dev -c "next dev -p 5000"`
2. Access admin panel at `/admin`
3. Edit content visually
4. Changes are saved to markdown/JSON in `content/` directory

## Future BidPath/SoldIT Integration
The static data layer in `lib/data.ts` can be replaced with:
1. Server-side data fetching from BidPath API
2. Build-time data fetching for static generation
3. Client-side updates for real-time bid information

## Recent Changes
- January 21, 2026: Migrated to Next.js 14 with Static Site Generation
  - Converted all pages to Next.js App Router
  - Implemented static data layer for SSG
  - Added Tina CMS configuration
  - Set up static export for IIS deployment
  - Maintained luxury theme and responsive design
