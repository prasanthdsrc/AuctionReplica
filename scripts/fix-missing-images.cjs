const fs = require('fs');
const path = require('path');

const productsDir = path.join(process.cwd(), 'content', 'products');
const imagesDir = path.join(process.cwd(), 'public', 'images', 'products');

// Placeholder images by category
const placeholders = {
  'watches-mens': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
  'watches-ladies': 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=600&q=80',
  'watches-midsize': 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80',
  'diamond': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
  'designer-bags': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
  'default': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80'
};

const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.json'));
let fixedCount = 0;

for (const file of files) {
  const filePath = path.join(productsDir, file);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const productId = file.replace('prod-', '').replace('.json', '');
  
  // Check if first image exists locally or is a working URL
  const firstImage = content.images && content.images[0];
  
  if (firstImage) {
    if (firstImage.startsWith('/images/products/')) {
      // Check if local file exists
      const localPath = path.join(process.cwd(), 'public', firstImage);
      if (!fs.existsSync(localPath)) {
        // Local image missing, use placeholder
        const placeholder = placeholders[content.category] || placeholders.default;
        content.images = [placeholder];
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        console.log(`Fixed ${file} - missing local image`);
        fixedCount++;
      }
    } else if (firstImage.includes('solditonline.com.au')) {
      // External URL that likely won't load, check if we have local version
      const localCheck = path.join(imagesDir, `${productId}_0.jpg`);
      if (fs.existsSync(localCheck)) {
        // We have local images, update to use them
        const newImages = [];
        for (let i = 0; i < 4; i++) {
          const imgPath = path.join(imagesDir, `${productId}_${i}.jpg`);
          if (fs.existsSync(imgPath)) {
            newImages.push(`/images/products/${productId}_${i}.jpg`);
          }
        }
        if (newImages.length > 0) {
          content.images = newImages;
          fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
          console.log(`Updated ${file} to use local images`);
          fixedCount++;
        }
      } else {
        // No local version, use placeholder
        const placeholder = placeholders[content.category] || placeholders.default;
        content.images = [placeholder];
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        console.log(`Fixed ${file} - external URL replaced with placeholder`);
        fixedCount++;
      }
    }
  }
}

console.log(`Fixed ${fixedCount} products`);
