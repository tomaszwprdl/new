const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

async function optimizeImages() {
  // Get all image files
  const imageFiles = glob.sync('public/**/*.{png,jpg,jpeg}', {
    ignore: ['public/icons/**', 'public/images/og/**'] // Skip already optimized images
  });

  for (const file of imageFiles) {
    const inputPath = path.join(process.cwd(), file);
    const dir = path.dirname(inputPath);
    const filename = path.basename(inputPath, path.extname(inputPath));
    
    try {
      // Get image metadata
      const metadata = await sharp(inputPath).metadata();
      
      // Create WebP version
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(path.join(dir, `${filename}.webp`));

      // Create AVIF version
      await sharp(inputPath)
        .avif({ quality: 65 })
        .toFile(path.join(dir, `${filename}.avif`));

      // If image is larger than 1200px, create responsive versions
      if (metadata.width > 1200) {
        const sizes = [640, 750, 828, 1080, 1200];
        for (const size of sizes) {
          // Skip if target size is larger than original
          if (size >= metadata.width) continue;

          await sharp(inputPath)
            .resize(size, null, { fit: 'inside' })
            .webp({ quality: 75 })
            .toFile(path.join(dir, `${filename}-${size}.webp`));

          await sharp(inputPath)
            .resize(size, null, { fit: 'inside' })
            .avif({ quality: 60 })
            .toFile(path.join(dir, `${filename}-${size}.avif`));
        }
      }

      console.log(`✅ Optimized: ${file}`);
    } catch (error) {
      console.error(`❌ Error optimizing ${file}:`, error);
    }
  }
}

// Run optimization
optimizeImages().then(() => {
  console.log('🎉 Image optimization complete!');
}).catch(error => {
  console.error('Failed to optimize images:', error);
  process.exit(1);
}); 