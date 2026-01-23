const fs = require('fs');
const path = require('path');
const https = require('https');

const productsDir = path.join(process.cwd(), 'content', 'products');
const imagesDir = path.join(process.cwd(), 'public', 'images', 'products');

function downloadImage(url, destPath, retries = 3) {
  return new Promise((resolve) => {
    const attempt = (attemptsLeft) => {
      const file = fs.createWriteStream(destPath);
      
      const req = https.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': 'https://www.solditonline.com.au/'
        },
        timeout: 15000
      }, (response) => {
        if (response.statusCode === 200 && response.headers['content-type']?.includes('image')) {
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            const stats = fs.statSync(destPath);
            if (stats.size > 1000) {
              resolve(true);
            } else {
              fs.unlinkSync(destPath);
              resolve(false);
            }
          });
        } else if (response.statusCode === 302 || response.statusCode === 301) {
          file.close();
          fs.unlinkSync(destPath);
          // Follow redirect
          downloadImage(response.headers.location, destPath, attemptsLeft).then(resolve);
        } else {
          file.close();
          if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
          if (attemptsLeft > 1) {
            setTimeout(() => attempt(attemptsLeft - 1), 1000);
          } else {
            resolve(false);
          }
        }
      });
      
      req.on('error', () => {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        if (attemptsLeft > 1) {
          setTimeout(() => attempt(attemptsLeft - 1), 1000);
        } else {
          resolve(false);
        }
      });
      
      req.on('timeout', () => {
        req.destroy();
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        if (attemptsLeft > 1) {
          setTimeout(() => attempt(attemptsLeft - 1), 1000);
        } else {
          resolve(false);
        }
      });
    };
    
    attempt(retries);
  });
}

async function processProducts() {
  const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.json'));
  let downloadedCount = 0;
  let failedCount = 0;
  let skippedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(productsDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const productId = file.replace('prod-', '').replace('.json', '');
    
    // Only process products that still have external URLs
    if (content.images && content.images[0] && content.images[0].includes('solditonline.com.au')) {
      const localPath = path.join(imagesDir, `${productId}_0.jpg`);
      
      // Skip if we already have local image
      if (fs.existsSync(localPath)) {
        skippedCount++;
        continue;
      }
      
      console.log(`Downloading: ${content.images[0]}`);
      const success = await downloadImage(content.images[0], localPath);
      
      if (success) {
        // Download remaining images
        const newImages = [`/images/products/${productId}_0.jpg`];
        for (let i = 1; i < Math.min(content.images.length, 4); i++) {
          const imgPath = path.join(imagesDir, `${productId}_${i}.jpg`);
          if (content.images[i] && content.images[i].includes('solditonline.com.au')) {
            const imgSuccess = await downloadImage(content.images[i], imgPath);
            if (imgSuccess) {
              newImages.push(`/images/products/${productId}_${i}.jpg`);
            }
          }
        }
        content.images = newImages;
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        downloadedCount++;
        console.log(`  Success: ${file}`);
      } else {
        failedCount++;
        console.log(`  Failed: ${file}`);
      }
      
      // Small delay between products
      await new Promise(r => setTimeout(r, 500));
    }
  }
  
  console.log(`\nResults:`);
  console.log(`  Downloaded: ${downloadedCount}`);
  console.log(`  Failed: ${failedCount}`);
  console.log(`  Skipped (already have): ${skippedCount}`);
}

processProducts().catch(console.error);
