import type { Express } from "express";
import { createServer, type Server } from "http";

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
  {
    id: 'cat-1',
    name: 'Swiss Watches',
    slug: 'swiss-watches',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    description: "Luxury timepieces from the world's most prestigious brands",
    productCount: 45
  },
  {
    id: 'cat-2',
    name: 'Certified Natural Diamonds',
    slug: 'certified-diamonds',
    imageUrl: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&q=80',
    description: 'GIA and IGI certified loose diamonds',
    productCount: 32
  },
  {
    id: 'cat-3',
    name: 'Designer Bags',
    slug: 'designer-bags',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
    description: 'Authenticated luxury bags from top designers',
    productCount: 28
  },
  {
    id: 'cat-4',
    name: 'Earrings',
    slug: 'earrings',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80',
    description: 'Diamond, gemstone, and pearl earrings',
    productCount: 56
  },
  {
    id: 'cat-5',
    name: 'Rings',
    slug: 'rings',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80',
    description: 'Engagement rings, dress rings, and eternity bands',
    productCount: 89
  },
  {
    id: 'cat-6',
    name: 'Pearl Jewellery',
    slug: 'pearl-jewellery',
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80',
    description: 'South Sea, Tahitian, and Akoya pearls',
    productCount: 34
  },
  {
    id: 'cat-7',
    name: 'Natural Loose Gems',
    slug: 'loose-gemstones',
    imageUrl: 'https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=400&q=80',
    description: 'Certified loose gemstones for collectors',
    productCount: 67
  },
  {
    id: 'cat-8',
    name: 'Bracelets',
    slug: 'bracelets',
    imageUrl: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&q=80',
    description: 'Tennis bracelets, bangles, and charm bracelets',
    productCount: 41
  },
  {
    id: 'cat-9',
    name: 'Designer Jewellery',
    slug: 'designer-jewellery',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80',
    description: 'Cartier, Tiffany, Van Cleef & Arpels',
    productCount: 38
  },
  {
    id: 'cat-10',
    name: 'Ruby Jewellery',
    slug: 'ruby-jewellery',
    imageUrl: 'https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=400&q=80',
    description: 'Natural ruby rings, earrings, and pendants',
    productCount: 23
  }
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
    const auctionProducts = products.filter((p) => p.auctionId === req.params.id);
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
    const result = products.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
    res.json(result);
  });

  app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p.id === req.params.id);
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

  app.get('/api/categories/:slug/products', (req, res) => {
    const categoryProducts = products.filter((p) => p.category === req.params.slug);
    res.json(categoryProducts);
  });

  return httpServer;
}
