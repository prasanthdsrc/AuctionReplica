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
├── content.ts              # Tina CMS content fetcher (reads JSON files at build time)
├── types.ts                # TypeScript interfaces
└── utils.ts                # Utility functions

tina/
└── config.ts               # Tina CMS configuration

content/                    # Tina CMS content directory (ALL DATA COMES FROM HERE)
├── auctions/               # 3 auction JSON files
├── products/               # 10 product JSON files
├── categories/             # 6 category JSON files
├── pages/
└── settings/
    └── site.json           # Site settings including hero slides
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

## Tina CMS Integration (FULLY INTEGRATED)
All content is managed through Tina CMS JSON files in the `/content` directory:

**Content Structure:**
- **Auctions** (`/content/auctions/*.json`): Title, description, dates, status, image, lots, buyers premium
- **Products** (`/content/products/*.json`): Title, description, images, estimates, specifications, category
- **Categories** (`/content/categories/*.json`): Name, slug, description, image (productCount calculated dynamically)
- **Settings** (`/content/settings/site.json`): Site name, contact info, hero slides

**How Content is Loaded:**
- `lib/content.ts` reads JSON files from `/content` directory at build time
- All pages import from `lib/content.ts` instead of static data
- Product counts per category are calculated dynamically from actual product data
- Static pages are generated using `generateStaticParams()` from CMS content

**To Edit Content:**
1. Run `npx tinacms dev -c "next dev -p 5000"`
2. Access admin panel at `/admin`
3. Edit content visually
4. Changes are saved to JSON files in `content/` directory
5. Rebuild to update static pages: `npx next build`

**Or edit JSON files directly** in `/content` directory.

## Recent Changes
- January 21, 2026: Full Tina CMS Integration
  - Created content files for all auctions, products, categories, and hero slides
  - Built `lib/content.ts` to read CMS content at build time
  - Updated all pages to fetch from Tina CMS instead of static data
  - Static build generates 29 pages from CMS content
  
- January 21, 2026: Migrated to Next.js 14 with Static Site Generation
  - Converted all pages to Next.js App Router
  - Implemented static data layer for SSG
  - Added Tina CMS configuration
  - Set up static export for IIS deployment
  - Maintained luxury theme and responsive design
