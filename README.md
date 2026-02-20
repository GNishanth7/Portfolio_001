# Vintage Arcade Portfolio

Interactive portfolio website built with a retro arcade style.

## Stack
- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion
- Howler.js (audio effects)

## Run locally
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build for production
```bash
npm run lint
npm run build
npm start
```

## How to use the site

### Home (`/`)
- Landing screen with `INSERT COIN`.
- Press `Enter` or `Space` to start quickly.

### Project select (`/select`)
- Browse project cards.
- Open individual project details.

### Project details (`/project/[id]`)
- View:
  - project summary
  - technologies
  - challenges
  - outcomes

### Profile (`/profile`)
- Shows bio, strengths, stack, and achievements.

### Resume (`/resume`)
- Resume-focused page with downloadable resume.

### Contact (`/contact`)
- Contact links and profile links.

### Play (`/play`)
- Retro pinball mini-game page.

## Keyboard controls
- `Enter` / `Space`: confirm actions on key screens.
- Arrow keys: navigation on supported screens.
- `Escape`: back/navigation on supported screens.

## Where to edit content

### Projects and profile data
Edit:
- `src/data/projects.ts`

### Home page flow
Edit:
- `src/app/page.tsx`

### Project detail page
Edit:
- `src/app/project/[id]/page.tsx`

### Global styles
Edit:
- `src/app/globals.css`

### Sound files
Place/update files in:
- `public/sounds/`

Expected sound names:
- `coin.mp3`
- `select.mp3`
- `confirm.mp3`
- `start.mp3`
- `achievement.mp3`

## Project structure (high level)
```text
src/
  app/
    page.tsx
    select/
    project/[id]/
    profile/
    resume/
    contact/
    play/
  components/
    arcade/
    layout/
    effects/
    ui/
  data/
    projects.ts
  hooks/
    useAudio.tsx
    useKeyboardNavigation.ts
```

## Notes
- This repo is currently an arcade-style portfolio.
- If you want, next step is converting this same repo to the VS Code/terminal portfolio design.
