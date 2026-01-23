const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const productsDir = path.join(process.cwd(), 'content', 'products');
const imagesDir = path.join(process.cwd(), 'public', 'images', 'products');

// Ensure images directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);
    
    protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else {
        file.close();
        fs.unlinkSync(destPath);
        resolve(false);
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      resolve(false);
    });
  });
}

async function processProducts() {
  const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.json'));
  let downloadCount = 0;
  let updateCount = 0;
  
  for (const file of files) {
    const filePath = path.join(productsDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const productId = file.replace('prod-', '').replace('.json', '');
    
    // Check if first image is external URL
    if (content.images && content.images[0] && content.images[0].startsWith('http')) {
      const newImages = [];
      let needsUpdate = false;
      
      for (let i = 0; i < content.images.length; i++) {
        const imgUrl = content.images[i];
        const localPath = `/images/products/${productId}_${i}.jpg`;
        const fullPath = path.join(imagesDir, `${productId}_${i}.jpg`);
        
        if (fs.existsSync(fullPath)) {
          // Local file already exists
          newImages.push(localPath);
          needsUpdate = true;
        } else if (imgUrl.startsWith('http')) {
          // Try to download
          console.log(`Downloading: ${imgUrl}`);
          const success = await downloadImage(imgUrl, fullPath);
          if (success) {
            newImages.push(localPath);
            downloadCount++;
            needsUpdate = true;
          } else {
            // Keep external URL as fallback
            newImages.push(imgUrl);
          }
        } else {
          newImages.push(imgUrl);
        }
      }
      
      if (needsUpdate) {
        content.images = newImages;
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        updateCount++;
      }
    }
  }
  
  console.log(`Downloaded ${downloadCount} images`);
  console.log(`Updated ${updateCount} product files`);
}

processProducts().catch(console.error);
