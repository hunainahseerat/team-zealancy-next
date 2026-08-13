# Team Zealancy — Asset Guide & Directory Structure

Place all media and static assets into the subdirectories under `public/assets/` as outlined below. All components are pre-configured to automatically render these files once they exist in their specified locations.

---

## 📁 Directory Overview

```
public/assets/
├── images/
│   ├── why-we-exist-bg.jpg    <-- "Why We Exist" background image
├── videos/
│   ├── team-voices.mp4                 <-- Team Voices video feature
│   ├── we-are-equal-game-district.mp4  <-- Featured Work / Game District video
├── team/
│   ├── afraz-chaudry.jpg               <-- Leadership: Afraz Chaudry
│   ├── shehroz-khan.jpg                <-- Leadership: Shehroz Khan
│   ├── aribah-siddiqui.jpg             <-- Leadership: Aribah Siddiqui
│   ├── kamal-ahmed.jpg                 <-- Leadership: Kamal Ahmed
├── icons/                              <-- Custom icons & vector assets
└── logo/                               <-- Official logo assets
```

---

## 🖼️ Required Asset Details

### 1. Leadership Photos (`public/assets/team/`)
- **Afraz Chaudry**: `afraz-chaudry.jpg` (or update path in `src/components/Leadership.tsx`)
- **Shehroz Khan**: `shehroz-khan.jpg`
- **Aribah Siddiqui**: `aribah-siddiqui.jpg`
- **Kamal Ahmed**: `kamal-ahmed.jpg`
- *Current Status*: Using SVGs `placeholder-1.svg` through `placeholder-4.svg`. To update, replace `avatarUrl` in `DEFAULT_LEADERS` in `src/components/Leadership.tsx` or overwrite files.

### 2. Videos (`public/assets/videos/`)
- **Team Voices Video**: `team-voices.mp4` (Referenced in `src/components/TeamVoices.tsx`)
- **We Are Equal / Game District Showcase**: `we-are-equal-game-district.mp4` (Referenced in `src/components/WorkSection.tsx`)

### 3. Background Images (`public/assets/images/`)
- **Why We Exist Section Background**: `why-we-exist-bg.jpg` (Referenced in `src/components/WhyWeExist.tsx`)

---

## ⚡ Notes
- The components inspect and render these files directly.
- Video players include automatic fallback handling if files have not yet been placed in `public/assets/videos/`.
