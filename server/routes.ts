import type { Express } from "express";
import { createServer, type Server } from "http";
import * as fs from "fs";
import * as path from "path";

// Load products from content/products directory
function loadProductsFromContent(): any[] {
  const productsDir = path.join(process.cwd(), 'content', 'products');
  const products: any[] = [];
  
  try {
    if (fs.existsSync(productsDir)) {
      const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.json'));
      for (const file of files) {
        const filePath = path.join(productsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const product = JSON.parse(content);
        // Extract ID from filename (e.g., prod-76328.json -> prod-76328)
        if (!product.id) {
          product.id = file.replace('.json', '');
        }
        products.push(product);
      }
    }
  } catch (error) {
    console.error('Error loading products from content:', error);
  }
  
  return products;
}

// Load products at startup
const loadedProducts = loadProductsFromContent();
console.log(`Loaded ${loadedProducts.length} products from content directory`);

const heroSlides = [
  {
    id: '1',
    title: 'Authenticity Fully Guaranteed',
    subtitle: 'First State Auctions guarantees authenticity of every item, ensuring you buy with confidence',
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80',
    linkUrl: '/auctions',
    linkText: 'View Current Auctions'
  },
  {
    id: '2',
    title: 'Buy the Jewellery You Love For Less',
    subtitle: 'Check out the current catalogue - Engagement rings, pearl necklaces, diamond studs at bargain prices',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&q=80',
    linkUrl: '/auctions',
    linkText: 'Browse Catalogue'
  },
  {
    id: '3',
    title: 'Record Breaking Swiss Watches',
    subtitle: "Discover our extensive collection of luxury timepieces from the world's most prestigious brands",
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1920&q=80',
    linkUrl: '/categories/swiss-watches',
    linkText: 'View Watches'
  },
  {
    id: '4',
    title: 'Designer Bags Collection',
    subtitle: 'Authenticated luxury bags from Hermès, Chanel, Louis Vuitton, and more',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1920&q=80',
    linkUrl: '/categories/designer-bags',
    linkText: 'Shop Designer Bags'
  }
];

const auctions = [
  {
    id: 'auction-1',
    title: 'Australia Day LIQUIDATION Auction: Fine Jewellery, Swiss Watches & Designer Bags',
    description: 'Our flagship auction featuring an exceptional collection of fine jewellery, Swiss watches, and designer bags.',
    imageUrl: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80',
    startDate: '2026-01-18T08:15:00',
    endDate: '2026-01-26T08:00:00',
    isOnline: true,
    numberOfLots: 428,
    buyersPremium: 20,
    status: 'open',
    catalogueUrl: '/auctions/auction-1/catalogue'
  },
  {
    id: 'auction-2',
    title: 'February Fine Jewellery Auction',
    description: 'An exquisite selection of diamonds, gemstones, and precious metals.',
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
    startDate: '2026-02-01T08:00:00',
    endDate: '2026-02-08T20:00:00',
    isOnline: true,
    numberOfLots: 312,
    buyersPremium: 20,
    status: 'upcoming'
  },
  {
    id: 'auction-3',
    title: 'Luxury Watch Collection Sale',
    description: 'Featuring rare Rolex, Patek Philippe, Audemars Piguet, and more.',
    imageUrl: 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=800&q=80',
    startDate: '2026-02-15T10:00:00',
    endDate: '2026-02-22T20:00:00',
    isOnline: true,
    numberOfLots: 156,
    buyersPremium: 18,
    status: 'upcoming'
  }
];

const products = [
  {
    id: 'prod-1',
    auctionId: 'auction-1',
    title: 'Rolex Yacht Master Mens Watch 116622',
    description: 'Stunning Rolex Yacht-Master with platinum bezel. This timepiece features the iconic Rolesium combination.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80',
      'https://images.unsplash.com/photo-1526045431048-f857369baa09?w=600&q=80',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80'
    ],
    lotNumber: 1,
    estimateLow: 17000,
    estimateHigh: 18000,
    currentBid: 15500,
    bidsCount: 12,
    category: 'swiss-watches',
    subcategory: 'rolex',
    featured: true,
    specifications: { 'Brand': 'Rolex', 'Model': 'Yacht Master', 'Reference': '116622' }
  },
  {
    id: 'prod-2',
    auctionId: 'auction-1',
    title: '4.57ct Diamond Bangle',
    description: 'Exquisite 18k white gold bangle set with 4.57 carats of brilliant cut diamonds.',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80',
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80'
    ],
    lotNumber: 2,
    estimateLow: 6800,
    estimateHigh: 9300,
    currentBid: 5200,
    bidsCount: 8,
    category: 'bracelets',
    featured: true,
    specifications: { 'Metal': '18k White Gold', 'Diamond Weight': '4.57ct', 'Diamond Quality': 'VS Clarity' }
  },
  {
    id: 'prod-3',
    auctionId: 'auction-1',
    title: 'Christian Dior Small 30 Montaigne Avenue Bag',
    description: 'The iconic 30 Montaigne bag in pristine condition. Features signature CD clasp.',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&q=80'
    ],
    lotNumber: 3,
    estimateLow: 2000,
    estimateHigh: 2500,
    currentBid: 1800,
    bidsCount: 15,
    category: 'designer-bags',
    subcategory: 'dior',
    featured: true,
    specifications: { 'Brand': 'Christian Dior', 'Model': '30 Montaigne', 'Size': 'Small' }
  },
  {
    id: 'prod-4',
    auctionId: 'auction-1',
    title: '1.36ct Sapphire & Diamond Earrings',
    description: 'Beautiful sapphire and diamond drop earrings in 18k white gold.',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80',
      'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80'
    ],
    lotNumber: 4,
    estimateLow: 2500,
    estimateHigh: 2700,
    currentBid: 2100,
    bidsCount: 6,
    category: 'earrings',
    featured: true,
    specifications: { 'Gemstone': 'Sapphire', 'Weight': '1.36ct', 'Metal': '18k White Gold' }
  },
  {
    id: 'prod-5',
    auctionId: 'auction-1',
    title: 'Van Cleef & Arpels 2014 Holiday Pendant',
    description: "Limited edition holiday pendant from Van Cleef & Arpels. Rare collector's item.",
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80'
    ],
    lotNumber: 5,
    estimateLow: 6000,
    estimateHigh: 7000,
    currentBid: 5500,
    bidsCount: 9,
    category: 'necklaces',
    subcategory: 'designer',
    featured: true,
    specifications: { 'Brand': 'Van Cleef & Arpels', 'Year': '2014', 'Edition': 'Holiday Limited' }
  },
  {
    id: 'prod-6',
    auctionId: 'auction-1',
    title: 'Cartier Love Bracelet 18k Rose Gold',
    description: 'The iconic Cartier Love bracelet in 18k rose gold. Complete with box and papers.',
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80'
    ],
    lotNumber: 6,
    estimateLow: 5500,
    estimateHigh: 6500,
    currentBid: 4800,
    bidsCount: 11,
    category: 'bracelets',
    subcategory: 'cartier',
    featured: false,
    specifications: { 'Brand': 'Cartier', 'Model': 'Love', 'Metal': '18k Rose Gold' }
  },
  {
    id: 'prod-7',
    auctionId: 'auction-1',
    title: '2.01ct Loose Diamond GIA F VS2',
    description: 'GIA certified 2.01 carat round brilliant diamond. F color, VS2 clarity.',
    images: [
      'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=600&q=80',
      'https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=600&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80'
    ],
    lotNumber: 7,
    estimateLow: 12000,
    estimateHigh: 15000,
    currentBid: 10500,
    bidsCount: 7,
    category: 'loose-gemstones',
    featured: false,
    specifications: { 'Carat': '2.01', 'Color': 'F', 'Clarity': 'VS2', 'Certification': 'GIA' }
  },
  {
    id: 'prod-8',
    auctionId: 'auction-1',
    title: 'Hermès Birkin 30 Togo Leather',
    description: 'Hermès Birkin 30 in Togo leather. Gold hardware. Excellent condition.',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&q=80'
    ],
    lotNumber: 8,
    estimateLow: 15000,
    estimateHigh: 18000,
    currentBid: 14000,
    bidsCount: 18,
    category: 'designer-bags',
    subcategory: 'hermes',
    featured: false,
    specifications: { 'Brand': 'Hermès', 'Model': 'Birkin 30', 'Material': 'Togo Leather' }
  },
  {
    id: 'prod-9',
    auctionId: 'auction-1',
    title: 'Patek Philippe Nautilus 5711',
    description: 'The legendary Patek Philippe Nautilus 5711/1A-010. Blue dial, stainless steel.',
    images: [
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
      'https://images.unsplash.com/photo-1526045431048-f857369baa09?w=600&q=80',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80'
    ],
    lotNumber: 9,
    estimateLow: 85000,
    estimateHigh: 95000,
    currentBid: 78000,
    bidsCount: 22,
    category: 'swiss-watches',
    subcategory: 'patek-philippe',
    featured: false,
    specifications: { 'Brand': 'Patek Philippe', 'Model': 'Nautilus', 'Reference': '5711/1A-010' }
  },
  {
    id: 'prod-10',
    auctionId: 'auction-1',
    title: 'South Sea Pearl & Diamond Ring',
    description: '12.7mm South Sea pearl surrounded by brilliant diamonds in 18k white gold.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80'
    ],
    lotNumber: 10,
    estimateLow: 3500,
    estimateHigh: 4500,
    currentBid: 3000,
    bidsCount: 5,
    category: 'rings',
    subcategory: 'pearl',
    featured: false,
    specifications: { 'Pearl Size': '12.7mm', 'Pearl Type': 'South Sea', 'Metal': '18k White Gold' }
  }
];

const categories = [
  // Jewellery Collections
  { id: 'cat-certified-diamonds', name: 'Certified Diamonds', slug: 'certified-diamonds', imageUrl: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&q=80', description: 'GIA and IGI certified loose diamonds', productCount: 45 },
  { id: 'cat-designer-jewellery', name: 'Designer Jewellery', slug: 'designer-jewellery', imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80', description: 'Cartier, Tiffany, Van Cleef & Arpels', productCount: 38 },
  { id: 'cat-loose-diamonds', name: 'Loose Diamonds', slug: 'loose-diamonds', imageUrl: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&q=80', description: 'Natural loose diamonds for custom settings', productCount: 32 },
  { id: 'cat-engagement-rings', name: 'Engagement Rings', slug: 'engagement-rings', imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80', description: 'Beautiful engagement ring collection', productCount: 56 },
  { id: 'cat-diamond-dress-rings', name: 'Diamond Dress Rings', slug: 'diamond-dress-rings', imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80', description: 'Diamond cocktail and dress rings', productCount: 42 },
  { id: 'cat-fancy-colour-diamonds', name: 'Fancy Colour Diamonds', slug: 'fancy-colour-diamonds', imageUrl: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&q=80', description: 'Pink, yellow, blue and other fancy diamonds', productCount: 18 },
  { id: 'cat-tennis-bracelets', name: 'Tennis Bracelets', slug: 'tennis-bracelets', imageUrl: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&q=80', description: 'Classic diamond tennis bracelets', productCount: 24 },
  { id: 'cat-diamond-studs', name: 'Diamond Studs', slug: 'diamond-studs', imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80', description: 'Diamond stud earrings', productCount: 35 },
  { id: 'cat-diamond-eternity-rings', name: 'Diamond Eternity Rings', slug: 'diamond-eternity-rings', imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80', description: 'Full and half eternity bands', productCount: 28 },
  { id: 'cat-diamond-earrings', name: 'Diamond Earrings', slug: 'diamond-earrings', imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80', description: 'Diamond drop and hoop earrings', productCount: 48 },
  // Watch Categories
  { id: 'cat-swiss-watches', name: 'Swiss Watches', slug: 'swiss-watches', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', description: 'Luxury Swiss timepieces', productCount: 65 },
  { id: 'cat-rolex-watches', name: 'Rolex Watches', slug: 'rolex-watches', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', description: 'Pre-owned Rolex watches', productCount: 28 },
  { id: 'cat-omega-watches', name: 'Omega Watches', slug: 'omega-watches', imageUrl: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80', description: 'Omega Seamaster and Speedmaster', productCount: 22 },
  { id: 'cat-cartier-watches', name: 'Cartier Watches', slug: 'cartier-watches', imageUrl: 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=400&q=80', description: 'Cartier Tank and Santos', productCount: 15 },
  { id: 'cat-tag-heuer-watches', name: 'Tag Heuer Watches', slug: 'tag-heuer-watches', imageUrl: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80', description: 'Tag Heuer Carrera and Monaco', productCount: 18 },
  { id: 'cat-iwc-watches', name: 'IWC Schaffhausen Watches', slug: 'iwc-watches', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', description: 'IWC Portugieser and Pilot watches', productCount: 12 },
  { id: 'cat-breitling-watches', name: 'Breitling Watches', slug: 'breitling-watches', imageUrl: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80', description: 'Breitling Navitimer and Superocean', productCount: 14 },
  { id: 'cat-raymond-weil-watches', name: 'Raymond Weil Watches', slug: 'raymond-weil-watches', imageUrl: 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=400&q=80', description: 'Raymond Weil luxury timepieces', productCount: 10 },
  { id: 'cat-mens-watches', name: "Men's Watches", slug: 'mens-watches', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', description: 'Luxury mens watches', productCount: 45 },
  { id: 'cat-ladies-watches', name: "Ladies' Watches", slug: 'ladies-watches', imageUrl: 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=400&q=80', description: 'Elegant ladies timepieces', productCount: 32 },
  { id: 'cat-midsize-watches', name: 'Mid-Size Watches', slug: 'midsize-watches', imageUrl: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80', description: 'Versatile midsize watches', productCount: 18 },
  // Other Categories
  { id: 'cat-designer-bags', name: 'Designer Bags', slug: 'designer-bags', imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80', description: 'Authenticated luxury bags', productCount: 28 }
];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get('/api/hero-slides', (_req, res) => {
    res.json(heroSlides);
  });

  app.get('/api/auctions', (req, res) => {
    let result = [...auctions];
    const status = req.query.status as string | string[] | undefined;
    
    if (status) {
      const statuses = Array.isArray(status) ? status : [status];
      result = result.filter((a) => statuses.includes(a.status));
    }
    
    res.json(result);
  });

  app.get('/api/auctions/:id', (req, res) => {
    const auction = auctions.find((a) => a.id === req.params.id);
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }
    res.json(auction);
  });

  app.get('/api/auctions/:id/products', (req, res) => {
    const allProducts = loadedProducts.length > 0 ? loadedProducts : products;
    const auctionProducts = allProducts.filter((p: any) => p.auctionId === req.params.id);
    res.json(auctionProducts);
  });

  app.get('/api/products', (req, res) => {
    let result = [...products];
    const { query, category, priceMin, priceMax, sortBy, featured } = req.query;

    if (featured === 'true') {
      result = result.filter((p) => p.featured);
    }

    if (query) {
      const q = (query as string).toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    if (priceMin) {
      result = result.filter((p) => p.estimateLow >= parseInt(priceMin as string));
    }

    if (priceMax) {
      result = result.filter((p) => p.estimateHigh <= parseInt(priceMax as string));
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.estimateLow - b.estimateLow);
        break;
      case 'price-high':
        result.sort((a, b) => b.estimateHigh - a.estimateHigh);
        break;
      case 'newest':
        result.sort((a, b) => b.lotNumber - a.lotNumber);
        break;
      case 'ending-soon':
        result.sort((a, b) => a.lotNumber - b.lotNumber);
        break;
    }

    res.json(result);
  });

  app.get('/api/products/search', (req, res) => {
    const query = (req.query.q as string || '').toLowerCase();
    const allProducts = loadedProducts.length > 0 ? loadedProducts : products;
    const result = allProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
    res.json(result);
  });

  app.get('/api/products/:id', (req, res) => {
    const allProducts = loadedProducts.length > 0 ? loadedProducts : products;
    const product = allProducts.find((p: any) => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  });

  app.get('/api/categories', (req, res) => {
    let result = [...categories];
    const { limit, sort } = req.query;

    if (sort === 'popular') {
      result.sort((a, b) => b.productCount - a.productCount);
    }

    if (limit) {
      result = result.slice(0, parseInt(limit as string));
    }

    res.json(result);
  });

  app.get('/api/categories/:slug', (req, res) => {
    const category = categories.find((c) => c.slug === req.params.slug);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  });

  // Category slug to product filter mapping
  // Maps new navigation slugs to product filtering logic
  const categoryMapping: Record<string, (p: any) => boolean> = {
    // Jewellery Collections - map to diamond category and filter by title/description
    'certified-diamonds': (p) => p.category === 'diamond' && (p.title.toLowerCase().includes('certified') || p.title.toLowerCase().includes('gia') || p.title.toLowerCase().includes('igi')),
    'designer-jewellery': (p) => p.title.toLowerCase().includes('cartier') || p.title.toLowerCase().includes('tiffany') || p.title.toLowerCase().includes('van cleef') || p.title.toLowerCase().includes('bulgari'),
    'loose-diamonds': (p) => p.category === 'diamond' && p.title.toLowerCase().includes('loose'),
    'engagement-rings': (p) => (p.category === 'diamond' || p.category === 'rings') && p.title.toLowerCase().includes('engagement'),
    'diamond-dress-rings': (p) => (p.category === 'diamond' || p.category === 'rings') && (p.title.toLowerCase().includes('dress ring') || p.title.toLowerCase().includes('cocktail')),
    'fancy-colour-diamonds': (p) => p.category === 'diamond' && (p.title.toLowerCase().includes('fancy') || p.title.toLowerCase().includes('pink') || p.title.toLowerCase().includes('yellow') || p.title.toLowerCase().includes('blue diamond')),
    'tennis-bracelets': (p) => p.title.toLowerCase().includes('tennis bracelet'),
    'diamond-studs': (p) => p.category === 'diamond' && p.title.toLowerCase().includes('stud'),
    'diamond-eternity-rings': (p) => p.category === 'diamond' && p.title.toLowerCase().includes('eternity'),
    'diamond-earrings': (p) => p.category === 'diamond' && (p.title.toLowerCase().includes('earring') || p.title.toLowerCase().includes('drop') || p.title.toLowerCase().includes('hoop')),
    // Watch brand categories
    'swiss-watches': (p) => p.category === 'watches-mens' || p.category === 'watches-ladies' || p.category === 'watches-midsize',
    'rolex-watches': (p) => (p.category === 'watches-mens' || p.category === 'watches-ladies' || p.category === 'watches-midsize') && p.title.toLowerCase().includes('rolex'),
    'omega-watches': (p) => (p.category === 'watches-mens' || p.category === 'watches-ladies' || p.category === 'watches-midsize') && p.title.toLowerCase().includes('omega'),
    'cartier-watches': (p) => (p.category === 'watches-mens' || p.category === 'watches-ladies' || p.category === 'watches-midsize') && p.title.toLowerCase().includes('cartier'),
    'tag-heuer-watches': (p) => (p.category === 'watches-mens' || p.category === 'watches-ladies' || p.category === 'watches-midsize') && (p.title.toLowerCase().includes('tag heuer') || p.title.toLowerCase().includes('tag-heuer')),
    'iwc-watches': (p) => (p.category === 'watches-mens' || p.category === 'watches-ladies' || p.category === 'watches-midsize') && p.title.toLowerCase().includes('iwc'),
    'breitling-watches': (p) => (p.category === 'watches-mens' || p.category === 'watches-ladies' || p.category === 'watches-midsize') && p.title.toLowerCase().includes('breitling'),
    'raymond-weil-watches': (p) => (p.category === 'watches-mens' || p.category === 'watches-ladies' || p.category === 'watches-midsize') && p.title.toLowerCase().includes('raymond weil'),
    'mens-watches': (p) => p.category === 'watches-mens',
    'ladies-watches': (p) => p.category === 'watches-ladies',
    'midsize-watches': (p) => p.category === 'watches-midsize',
    // Other categories - direct match
    'designer-bags': (p) => p.category === 'designer-bags',
  };

  app.get('/api/categories/:slug/products', (req, res) => {
    const slug = req.params.slug;
    const filterFn = categoryMapping[slug];
    
    // Use loaded products from content directory
    const allProducts = loadedProducts.length > 0 ? loadedProducts : products;
    
    let categoryProducts;
    if (filterFn) {
      categoryProducts = allProducts.filter(filterFn);
    } else {
      // Fallback to direct category match for any unmapped categories
      categoryProducts = allProducts.filter((p: any) => p.category === slug);
    }
    
    res.json(categoryProducts);
  });

  return httpServer;
}
