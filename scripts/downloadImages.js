const fs = require('fs');
const https = require('https');
const path = require('path');

const destinations = [
  {
    name: 'benidorm',
    card: 'https://images.unsplash.com/photo-1563464839523-e89ba020c9ae',
    bg: 'https://images.unsplash.com/photo-1563464839523-e89ba020c9ae'
  },
  {
    name: 'alicante',
    card: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e',
    bg: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e'
  },
  {
    name: 'valencia',
    card: 'https://images.unsplash.com/photo-1599302592205-d7d683c83eea',
    bg: 'https://images.unsplash.com/photo-1599302592205-d7d683c83eea'
  },
  {
    name: 'torrevieja',
    card: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6',
    bg: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6'
  }
];

const destinationDir = path.join(process.cwd(), 'public', 'images', 'destinations');

// Create directories if they don't exist
if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir, { recursive: true });
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };
    
    const fullUrl = `${url}?q=80&w=2070&auto=format&fit=crop`;
    console.log(`Downloading from: ${fullUrl}`);
    
    https.get(fullUrl, options, response => {
      if (response.statusCode === 403) {
        reject(new Error('Access forbidden - 403 error'));
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP error! status: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        // Check if the file was actually created and has content
        fs.stat(filename, (err, stats) => {
          if (err || stats.size === 0) {
            fs.unlink(filename, () => {});
            reject(new Error('File was not created properly'));
          } else {
            resolve();
          }
        });
      });
    }).on('error', err => {
      fs.unlink(filename, () => {});
      reject(err);
    });
  });
}

async function downloadAllImages() {
  for (const dest of destinations) {
    const cardPath = path.join(destinationDir, `${dest.name}.jpg`);
    const bgPath = path.join(destinationDir, `${dest.name}-bg.jpg`);
    
    console.log(`Downloading images for ${dest.name}...`);
    
    try {
      await downloadImage(dest.card, cardPath);
      await downloadImage(dest.bg, bgPath);
      console.log(`Successfully downloaded images for ${dest.name}`);
    } catch (error) {
      console.error(`Error downloading images for ${dest.name}:`, error);
    }
  }
}

downloadAllImages().then(() => {
  console.log('All images downloaded successfully!');
}).catch(error => {
  console.error('Error downloading images:', error);
}); 