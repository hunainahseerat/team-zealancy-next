const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const srcPath = 'C:\\Users\\Adnan LapTop House\\.gemini\\antigravity-ide\\brain\\2db18e2c-ff8f-4eb3-a883-fa7292186355\\media__1786821363112.jpg';
const logoDir = 'C:\\Users\\Adnan LapTop House\\.gemini\\antigravity-ide\\scratch\\team-zealancy-next\\public\\assets\\logo';
const croppedPngPath = path.join(logoDir, 'z-logo-white.png');
const svgPath = path.join(logoDir, 'z-white.svg');
const zBadgePath = path.join(logoDir, 'z-badge.svg');

sharp(srcPath)
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height, channels } = info;
    const outBuffer = Buffer.alloc(width * height * 4);

    let minX = width, maxX = 0, minY = height, maxY = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        const r = data[idx * channels];
        const g = data[idx * channels + 1];
        const b = data[idx * channels + 2];
        const brightness = (r + g + b) / 3;

        if (brightness < 160) {
          const alpha = Math.min(255, Math.max(0, Math.round((160 - brightness) * (255 / 160))));
          outBuffer[idx * 4] = 255;
          outBuffer[idx * 4 + 1] = 255;
          outBuffer[idx * 4 + 2] = 255;
          outBuffer[idx * 4 + 3] = alpha;

          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        } else {
          outBuffer[idx * 4] = 0;
          outBuffer[idx * 4 + 1] = 0;
          outBuffer[idx * 4 + 2] = 0;
          outBuffer[idx * 4 + 3] = 0;
        }
      }
    }

    const pad = 24;
    const cropLeft = Math.max(0, minX - pad);
    const cropTop = Math.max(0, minY - pad);
    const cropWidth = Math.min(width - cropLeft, (maxX - minX) + pad * 2);
    const cropHeight = Math.min(height - cropTop, (maxY - minY) + pad * 2);

    return sharp(outBuffer, { raw: { width, height, channels: 4 } })
      .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
      .png()
      .toFile(croppedPngPath)
      .then(() => {
        const pngBase64 = fs.readFileSync(croppedPngPath).toString('base64');
        const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cropWidth} ${cropHeight}" width="${cropWidth}" height="${cropHeight}">
  <image href="data:image/png;base64,${pngBase64}" width="${cropWidth}" height="${cropHeight}" />
</svg>`;
        fs.writeFileSync(svgPath, svgContent);
        fs.writeFileSync(zBadgePath, svgContent);
        console.log('Saved tightly cropped white logo assets successfully:', { cropWidth, cropHeight });
      });
  })
  .catch(err => console.error(err));
