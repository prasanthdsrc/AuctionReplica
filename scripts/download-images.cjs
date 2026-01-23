const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const PRODUCTS_DIR = 'content/products';
const IMAGES_DIR = 'public/images/products';

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Timeout'));
    }, 10000);
    
    const protocol = url.startsWith('https') ? https : http;
    
    const file = fs.createWriteStream(filepath);
    protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    }, (response) => {
      clearTimeout(timeout);
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        fs.unlink(filepath, () => {});
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      clearTimeout(timeout);
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadMissingImages() {
  const productFiles = fs.readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.json'));
  console.log(`Found ${productFiles.length} products`);
  
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;
  
  for (const file of productFiles) {
    const product = JSON.parse(fs.readFileSync(path.join(PRODUCTS_DIR, file)));
    const productId = file.replace('prod-', '').replace('.json', '');
    
    const newImages = [];
    
    for (let i = 0; i < product.images.length; i++) {
      const imageUrl = product.images[i];
      
      if (!imageUrl.startsWith('http')) {
        newImages.push(imageUrl);
        continue;
      }
      
      const ext = path.extname(imageUrl.split('?')[0]) || '.jpg';
      const imageName = `${productId}_${i}${ext}`;
      const imagePath = path.join(IMAGES_DIR, imageName);
      
      if (fs.existsSync(imagePath)) {
        newImages.push(`/images/products/${imageName}`);
        skipped++;
        continue;
      }
      
      try {
        await downloadImage(imageUrl, imagePath);
        newImages.push(`/images/products/${imageName}`);
        downloaded++;
        if (downloaded % 50 === 0) {
          console.log(`Downloaded ${downloaded} images...`);
        }
      } catch (err) {
        newImages.push(imageUrl);
        failed++;
      }
    }
    
    product.images = newImages;
    fs.writeFileSync(path.join(PRODUCTS_DIR, file), JSON.stringify(product, null, 2));
  }
  
  console.log(`\nComplete! Downloaded: ${downloaded}, Skipped: ${skipped}, Failed: ${failed}`);
}

downloadMissingImages().catch(console.error);
