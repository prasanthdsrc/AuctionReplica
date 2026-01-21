# First State Auctions - Static React Application

## Overview
A static React application that replicates the UI/UX of a luxury auction website (First State Auctions). The application features fine jewellery, Swiss watches, and designer bags with a beautiful, responsive design.

## Tech Stack
- **Frontend**: React 18 with TypeScript, Wouter for routing
- **Styling**: Tailwind CSS with custom design tokens (gold/black/white luxury theme)
- **Backend**: Express.js serving static data via REST API
- **State Management**: React Query for data fetching
- **UI Components**: Shadcn UI components

## Project Structure
```
client/
├── src/
│   ├── api/                 # API service layer (abstracted data access)
│   │   ├── auctions.ts      # Auction API functions
│   │   ├── products.ts      # Product API functions
│   │   ├── categories.ts    # Category API functions
│   │   └── index.ts         # API exports
│   ├── components/
│   │   ├── auction/         # Auction-specific components
│   │   │   └── AuctionCard.tsx
│   │   ├── common/          # Shared components
│   │   │   ├── CategoryCard.tsx
│   │   │   ├── CountdownTimer.tsx
│   │   │   ├── FAQAccordion.tsx
│   │   │   ├── HeroCarousel.tsx
│   │   │   └── SearchFilters.tsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── product/         # Product-specific components
│   │   │   └── ProductCard.tsx
│   │   └── ui/              # Shadcn UI components
│   ├── lib/
│   │   ├── data.ts          # Static mock data
│   │   ├── types.ts         # TypeScript interfaces
│   │   ├── utils.ts         # Utility functions
│   │   └── queryClient.ts   # React Query setup
│   └── pages/
│       ├── Home.tsx         # Landing page
│       ├── AuctionListing.tsx
│       ├── AuctionDetail.tsx
│       ├── ProductListing.tsx
│       ├── ProductDetail.tsx
│       ├── CategoryListing.tsx
│       ├── About.tsx
│       ├── Contact.tsx
│       ├── Selling.tsx
│       └── PastSales.tsx
server/
├── routes.ts               # API routes with static data
└── ...
```

## Design System
- **Primary Color**: Gold (#D4A843) - HSL: 43 74% 49%
- **Foreground**: Near black for text
- **Background**: White/light gray
- **Font**: Inter (sans-serif), Playfair Display (serif for headings)
- **Border Radius**: Small (6px) for consistent styling

## API Architecture (API-Ready)
The application is designed with a clean separation between UI and data:

1. **Data Layer** (`client/src/lib/data.ts`): Static mock data
2. **API Services** (`client/src/api/`): Abstracted functions like `getAuctions()`, `getProductById()`
3. **Backend Routes** (`server/routes.ts`): REST API endpoints

To switch from static to real API:
1. Update the API service functions to use actual endpoints
2. Remove fallback to static data
3. No changes needed in UI components

## Pages
- `/` - Home page with hero carousel, current auctions, featured items
- `/auctions` - All auctions with filtering by status
- `/auctions/:id` - Auction detail with catalogue
- `/products` - All products with search/filter
- `/products/:id` - Product detail with bidding
- `/categories/:slug` - Category listing
- `/about` - About page
- `/contact` - Contact form
- `/selling` - Sell your items page
- `/past-sales` - Past auction results

## Running the Application
```bash
npm run dev
```
The application runs on port 5000.

## Recent Changes
- January 21, 2026: Initial implementation of static auction website
  - Created all pages and components
  - Implemented API-ready architecture
  - Added responsive design with mobile support
