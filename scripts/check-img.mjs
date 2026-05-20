import fs from 'fs';

// Read the first few bytes of the JPG to get dimensions
const buffer = fs.readFileSync('public/social-image.jpg');
// Very naive JPEG dimension parser just to get the width and height
let i = 0;
if (buffer[i] === 0xFF && buffer[i+1] === 0xD8) {
  i += 2;
  while (i < buffer.length) {
    if (buffer[i] !== 0xFF) break;
    const marker = buffer[i+1];
    const length = (buffer[i+2] << 8) + buffer[i+3];
    if (marker === 0xC0 || marker === 0xC1 || marker === 0xC2) {
      const height = (buffer[i+5] << 8) + buffer[i+6];
      const width = (buffer[i+7] << 8) + buffer[i+8];
      console.log(`Dimensions: ${width}x${height}`);
      break;
    }
    i += length + 2;
  }
} else {
  console.log("Not a valid JPG");
}
