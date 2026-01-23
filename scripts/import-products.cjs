const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const CSV_FILE = 'attached_assets/auction_export_2021_20260108_110308_1769149613496.csv';
const PRODUCTS_DIR = 'content/products';
const IMAGES_DIR = 'public/images/products';

const categoryMap = {
  'Diamond': 'diamond',
  'Sapphire': 'sapphire',
  'Ruby': 'ruby',
  'Emerald': 'emerald',
  'Pearl': 'pearl',
  'Aquamarine': 'aquamarine',
  'Tanzanite': 'tanzanite',
  'Opal': 'opal',
  'Tourmaline': 'tourmaline',
  'Topaz': 'topaz',
  'Jade': 'jade',
  'Gold Jewellery': 'gold-jewellery',
  'Watches Mens': 'watches-mens',
  'Watches Ladies': 'watches-ladies',
  'Watches Mid-size': 'watches-midsize',
  'Accessories': 'designer-bags',
  'Miscellaneous': 'miscellaneous',
  'Miscellaneous Gemstones': 'miscellaneous',
  'Mens Rings': 'rings',
  'Morganite': 'miscellaneous',
  'Citrine': 'miscellaneous',
  'Amethyst': 'miscellaneous',
  'Quartz': 'miscellaneous',
  'Ametrine': 'miscellaneous',
  'Alexandrite': 'miscellaneous',
  'Turquoise': 'miscellaneous',
  'Tsavorite': 'miscellaneous',
};

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const file = fs.createWriteStream(filepath);
    protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
}

async function processProducts() {
  console.log('Reading CSV file...');
  const csvContent = fs.readFileSync(CSV_FILE, 'utf8');
  const lines = csvContent.split('\n');
  
  const headers = parseCSVLine(lines[0]);
  console.log('Headers:', headers.slice(0, 10));
  
  const itemNumberIdx = headers.indexOf('ItemFullNumber');
  const lotNumberIdx = headers.indexOf('LotFullNumber');
  const categoryIdx = headers.indexOf('LotCategory');
  const nameIdx = headers.indexOf('LotName*');
  const descriptionIdx = headers.indexOf('LotDescription');
  const imageIdx = headers.indexOf('LotImage');
  const lowEstimateIdx = headers.indexOf('LowEstimate');
  const highEstimateIdx = headers.indexOf('HighEstimate');
  const brandIdx = headers.indexOf('Brand');
  
  console.log('Column indices:', { itemNumberIdx, categoryIdx, nameIdx, imageIdx });
  
  const products = [];
  let currentProduct = null;
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const fields = parseCSVLine(line);
    
    if (fields[0] && /^\d+$/.test(fields[0])) {
      if (currentProduct) {
        products.push(currentProduct);
      }
      
      const itemNumber = fields[itemNumberIdx] || '';
      const lotNumber = fields[lotNumberIdx] || '';
      const category = fields[categoryIdx] || '';
      const name = fields[nameIdx] || '';
      const description = fields[descriptionIdx] || '';
      const imageUrls = fields[imageIdx] || '';
      const lowEstimate = parseFloat(fields[lowEstimateIdx]) || 0;
      const highEstimate = parseFloat(fields[highEstimateIdx]) || 0;
      const brand = fields[brandIdx] || '';
      
      if (!name || !categoryMap[category]) {
        currentProduct = null;
        continue;
      }
      
      currentProduct = {
        id: itemNumber,
        lotNumber: parseInt(lotNumber) || i,
        category: categoryMap[category] || 'miscellaneous',
        name: name,
        description: description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(),
        images: imageUrls.split('|').filter(url => url.startsWith('http')),
        lowEstimate,
        highEstimate,
        brand
      };
    }
  }
  
  if (currentProduct) {
    products.push(currentProduct);
  }
  
  console.log(`Found ${products.length} valid products`);
  
  if (!fs.existsSync(PRODUCTS_DIR)) {
    fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
  }
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }
  
  let processed = 0;
  let imageDownloaded = 0;
  
  for (const product of products) {
    const productId = `prod-${product.id}`;
    const localImages = [];
    
    for (let j = 0; j < Math.min(product.images.length, 4); j++) {
      const imageUrl = product.images[j];
      const ext = path.extname(imageUrl.split('?')[0]) || '.jpg';
      const imageName = `${product.id}_${j}${ext}`;
      const imagePath = path.join(IMAGES_DIR, imageName);
      
      if (!fs.existsSync(imagePath)) {
        try {
          await downloadImage(imageUrl, imagePath);
          imageDownloaded++;
          console.log(`Downloaded image ${imageDownloaded}: ${imageName}`);
        } catch (err) {
          console.log(`Failed to download ${imageUrl}: ${err.message}`);
          localImages.push(imageUrl);
          continue;
        }
      }
      localImages.push(`/images/products/${imageName}`);
    }
    
    if (localImages.length === 0 && product.images.length > 0) {
      localImages.push(product.images[0]);
    }
    
    const productJson = {
      title: product.name,
      description: product.description.substring(0, 500),
      auctionId: 'auction-1',
      lotNumber: product.lotNumber,
      category: product.category,
      images: localImages,
      estimateLow: product.lowEstimate,
      estimateHigh: product.highEstimate,
      currentBid: Math.round(product.lowEstimate * 0.8),
      bidsCount: Math.floor(Math.random() * 20),
      featured: processed < 20,
      specifications: []
    };
    
    if (product.brand) {
      productJson.specifications.push({ key: 'Brand', value: product.brand });
    }
    
    fs.writeFileSync(
      path.join(PRODUCTS_DIR, `${productId}.json`),
      JSON.stringify(productJson, null, 2)
    );
    
    processed++;
    if (processed % 50 === 0) {
      console.log(`Processed ${processed}/${products.length} products, ${imageDownloaded} images downloaded`);
    }
  }
  
  console.log(`\nComplete! Processed ${processed} products, downloaded ${imageDownloaded} images`);
}

processProducts().catch(console.error);
