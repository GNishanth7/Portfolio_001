# 🕹️ Vintage Arcade Portfolio

A retro arcade-themed portfolio SPA that transforms your work showcase into an immersive gaming experience. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

![Arcade Portfolio](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ Features

- **🏠 Arcade Cabinet Lobby** - Immersive homepage with "Insert Coin" interaction
- **🎮 Game Select Screen** - Browse projects as game cartridges in a carousel
- **📺 CRT Screen Effects** - Authentic scanlines, flicker, and vignette effects
- **👤 Player Profile** - RPG-style character sheet for your about page
- **🎵 Retro Sound Effects** - Arcade sounds using Howler.js
- **⌨️ Keyboard Navigation** - Full arcade-style keyboard/gamepad support
- **📱 Responsive Design** - Works on all devices
- **⚡ Blazing Fast** - Static site generation with Next.js

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/arcade-portfolio.git
cd arcade-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Arcade Cabinet Lobby (Homepage)
│   ├── select/            # Game Select (Projects)
│   ├── project/[id]/      # Individual Project Pages
│   └── profile/           # Player One Profile (About Me)
├── components/
│   ├── arcade/            # Arcade-specific components
│   │   ├── CRTScreen.tsx  # CRT monitor effect wrapper
│   │   ├── ArcadeButton.tsx
│   │   ├── GameCartridge.tsx
│   │   ├── HighScoreTable.tsx
│   │   ├── LoadingBar.tsx
│   │   └── Marquee.tsx
│   ├── ui/                # Reusable UI components
│   └── layout/            # Layout components
├── hooks/                 # Custom React hooks
│   ├── useAudio.tsx       # Audio context and sound effects
│   └── useKeyboardNavigation.ts
├── data/                  # Static data
│   └── projects.ts        # Projects, skills, and profile data
└── styles/                # Global styles
```

## 🎨 Customization

### Adding Your Projects

Edit `src/data/projects.ts` to add your own projects:

```typescript
export const projects: Project[] = [
  {
    id: "my-project",
    title: "My Awesome Project",
    genre: "RPG: Full-Stack Dev",
    description: "A brief description",
    longDescription: "Detailed project description...",
    technologies: ["React", "Node.js", "PostgreSQL"],
    challenges: ["Challenge 1", "Challenge 2"],
    outcomes: ["Result 1", "Result 2"],
    color: "#00ffff",
    // ... more fields
  }
];
```

### Updating Your Profile

Edit the `profile` object in `src/data/projects.ts`:

```typescript
export const profile = {
  name: "Your Name",
  title: "Your Title",
  bio: "Your story...",
  // ... customize stats, equipment, achievements
};
```

### Adding Sound Effects

Place your sound files in `public/sounds/`:
- `coin.mp3` - Coin insertion
- `select.mp3` - Navigation
- `confirm.mp3` - Confirmation
- `hover.mp3` - Button hover

## 🎮 Keyboard Controls

| Key | Action |
|-----|--------|
| `←` `→` | Navigate between items |
| `Enter` / `Space` | Select / Confirm |
| `Escape` | Go back |

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
npm run build
npx vercel
```

### Deploy to Netlify

```bash
npm run build
npx netlify deploy --prod --dir=.next
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Audio**: Howler.js
- **Font**: Press Start 2P (Google Fonts)

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 🙏 Credits

- Pixel art inspiration from classic arcade games
- Sound effects can be generated using [BFXR](https://www.bfxr.net/)
- Font: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P)

---

**INSERT COIN TO BEGIN YOUR ADVENTURE** 🪙

