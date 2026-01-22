# Vintage Arcade Portfolio - Development Instructions

## Project Overview
A retro arcade-themed portfolio SPA built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS for retro effects
- **Animations**: Framer Motion
- **Audio**: Howler.js
- **Fonts**: Press Start 2P (Google Fonts)

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Arcade Cabinet Lobby (Homepage)
│   ├── select/            # Game Select (Projects)
│   ├── project/[id]/      # Individual Project Pages
│   └── profile/           # Player One Profile (About Me)
├── components/
│   ├── arcade/            # Arcade-specific components
│   ├── ui/                # Reusable UI components
│   └── layout/            # Layout components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── data/                  # Static data (projects, skills)
└── styles/                # Global styles and CSS
```

## Coding Standards
- Use TypeScript strict mode
- Follow React best practices with functional components
- Use Framer Motion for all animations
- Implement keyboard navigation for arcade feel
- Ensure accessibility with ARIA attributes

## Retro Design Guidelines
- Use pixelated fonts (Press Start 2P)
- Implement CRT scanline effects
- Use neon color palette (cyan, magenta, yellow, green)
- Add screen flicker and glow effects
- Include satisfying click sounds for interactions
