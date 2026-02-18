import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '../public');
const size = 512;

const logo = await sharp(join(publicDir, 'logo.jpg'))
  .resize(size, size)
  .ensureAlpha()
  .raw();

const { data, info } = await logo.toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const center = size / 2;
const radius = center - 1;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const dx = x - center;
    const dy = y - center;
    if (dx * dx + dy * dy > radius * radius) {
      const idx = (y * width + x) * channels;
      data[idx] = 0;
      data[idx + 1] = 0;
      data[idx + 2] = 0;
      data[idx + 3] = 0;
    }
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(join(publicDir, 'favicon.png'));

console.log('Favicon arrondi créé : public/favicon.png');
