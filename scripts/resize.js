
const sharp = require('sharp');

async function processImage() {
  const input = 'public/social-image.jpg';
  const output = 'public/social-image.png';

  // Read the top-left pixel to get the exact background color
  const { data, info } = await sharp(input)
    .extract({ left: 0, top: 0, width: 1, height: 1 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const r = data[0];
  const g = data[1];
  const b = data[2];
  
  console.log(`Detected background: rgba(${r}, ${g}, ${b}, 1)`);

  await sharp(input)
    .resize(1200, 630, {
      fit: 'contain',
      background: { r, g, b, alpha: 1 }
    })
    .toFile(output);
    
  console.log('Successfully generated social-image.png with perfect padding');
}

processImage().catch(console.error);
