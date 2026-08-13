const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ffmpegPath = require('ffmpeg-static');

const projectRoot = path.join(__dirname, '..');
const videosDir = path.join(projectRoot, 'public', 'assets', 'videos');
const backupDir = path.join(projectRoot, 'video_backups');

console.log('=== Team Zealancy Video Optimizer ===');
console.log('Using ffmpeg from:', ffmpegPath);

// Step 1: Ensure backup folder exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log('Created backup directory:', backupDir);
}

const files = [
  'team-voice-01.mp4',
  'team-voice-02.mp4',
  'team-voice-03.mp4',
  'team-voice-04.mp4',
  'team-voice-05.mp4',
  'team-voice-06.mp4',
  'team-voice-07.mp4',
  'team-voice-08.mp4',
  'team-voice-09.mp4',
  'team-voice-10.mp4',
  'team-voice-11.mp4',
  'team-voice-12.mp4',
];

// Step 2: Backup original files
console.log('\n--- Step 1: Backing up original videos ---');
for (const file of files) {
  const srcPath = path.join(videosDir, file);
  const backupPath = path.join(backupDir, file);

  if (!fs.existsSync(srcPath)) {
    console.error(`ERROR: Source video missing: ${srcPath}`);
    process.exit(1);
  }

  if (!fs.existsSync(backupPath)) {
    console.log(`Backing up ${file}...`);
    fs.copyFileSync(srcPath, backupPath);
  } else {
    console.log(`Backup already exists for ${file}`);
  }
}
console.log('All 12 video backups confirmed safely in video_backups/');

// Step 3: Compress videos
console.log('\n--- Step 2: Optimizing videos for web delivery ---');
let initialTotal = 0;
let finalTotal = 0;

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const srcPath = path.join(backupDir, file);
  const destPath = path.join(videosDir, file);
  const tempPath = path.join(videosDir, `temp_${file}`);

  const origSize = fs.statSync(srcPath).size;
  initialTotal += origSize;
  const origMB = (origSize / (1024 * 1024)).toFixed(2);

  console.log(`\n[${i + 1}/${files.length}] Compressing ${file} (Original: ${origMB} MB)...`);

  // ffmpeg command: H.264, 720p height scale (-2 maintains aspect ratio, even dimensions), CRF 25, FastStart for fast web streaming
  const cmd = `"${ffmpegPath}" -y -i "${srcPath}" -c:v libx264 -preset medium -crf 25 -vf "scale='min(720,iw)':-2" -c:a aac -b:a 128k -movflags +faststart "${tempPath}"`;

  try {
    execSync(cmd, { stdio: 'inherit' });

    // Swap temp to dest
    if (fs.existsSync(tempPath)) {
      fs.renameSync(tempPath, destPath);
      const newSize = fs.statSync(destPath).size;
      finalTotal += newSize;
      const newMB = (newSize / (1024 * 1024)).toFixed(2);
      const reduction = (((origSize - newSize) / origSize) * 100).toFixed(1);
      console.log(`✓ Finished ${file}: ${origMB} MB -> ${newMB} MB (${reduction}% reduction)`);
    } else {
      console.error(`Error: Output temp file not found for ${file}`);
    }
  } catch (err) {
    console.error(`Error compressing ${file}:`, err.message);
  }
}

const origTotalMB = (initialTotal / (1024 * 1024)).toFixed(2);
const finalTotalMB = (finalTotal / (1024 * 1024)).toFixed(2);
const totalReduction = (((initialTotal - finalTotal) / initialTotal) * 100).toFixed(1);

console.log('\n==================================================');
console.log('FINAL OPTIMIZATION SUMMARY');
console.log('==================================================');
console.log(`Original Total Size: ${origTotalMB} MB (${(initialTotal / (1024 * 1024 * 1024)).toFixed(2)} GB)`);
console.log(`Optimized Total Size: ${finalTotalMB} MB (${(finalTotal / (1024 * 1024 * 1024)).toFixed(2)} GB)`);
console.log(`Total Space Saved: ${totalReduction}%`);
console.log('==================================================\n');
