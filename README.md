Markdown
# 🎨 NameArt

An interactive Next.js web application where names come to life in a glowing pixel-art style. Letters fill up sequentially pixel-by-pixel, smoothly transition through vibrant gradients, and perform a synchronized 3D circular orbit before settling into place.

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19+-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

---

## 🚀 Live Demo & Preview

- **Live URL:** [name-art.vercel.app](https://your-vercel-link.vercel.app)
- **Repository:** [github.com/moajjem441/NameArt](https://github.com/moajjem441/NameArt)

<!-- Add your demo gif / screenshot here -->
<!-- ![NameArt Preview](./public/preview.gif) -->

---

## 🎯 Key Features

- 🟦 **5x5 Pixel Grid Rendering:** Letters are constructed using custom 2D binary matrix arrays (`0` for empty, `1` for active pixels).
- ✨ **Sequential Fill Animation:** Cascading top-to-bottom, left-to-right pixel appearance with dynamic timing calculations.
- 🌈 **Dynamic Color Gradients:** Smooth vertical gradient transitions (e.g., Neon Cyan $\rightarrow$ Purple).
- 💡 **Neon Glow FX:** Subtle CSS `box-shadow` layers delivering a clean cyberpunk aesthetic.
- 🌀 **Synchronized Orbit Physics:** Letters travel along a circular trajectory while counter-rotating to remain upright (`rotate` $\rightarrow$ `translateX` $\rightarrow$ `rotate(-angle)`).
- ⏱️ **Debounced Input (500ms):** Smooth typing experience without animation interruption mid-word.
- ␠ **Full Multi-Word Support:** Clean spacing algorithms for first, middle, and last names.
- 📱 **Responsive Viewport Scaling:** Dynamic CSS variables (`--orbit-radius`, pixel size, and spacing) adapting seamlessly across mobile, tablet, and desktop screens.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & Vanilla CSS Animations
- **Icons:** Lucide React
- **Deployment:** Vercel

---

## 🧩 Project Structure

```text
app/
├── globals.css        # CSS keyframes, neon glow utilities & orbit math
├── layout.tsx         # Root application layout & metadata
├── letters.ts         # A-Z 2D binary matrix letter definitions
├── page.tsx           # State management, debouncing & phase orchestration
└── PixelLetter.tsx    # Letter component & gradient calculation logic
⚙️ How It Works
1. Matrix Grid Pattern (letters.ts)
Each character is stored as a 5-column binary matrix:

TypeScript
M: [
  [1, 0, 0, 0, 1],
  [1, 1, 0, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
],
2. State & Phase Pipeline
The animation engine transitions through strict chronological phases:

Plaintext
[ Typing Name ]
       │ (500ms Debounce)
       ▼
    [ IDLE ] ──► [ FILLING ] ──► [ WAITING ] ──► [ ORBITING ] ──► [ SETTLED ]
3. Upright Orbit Calculation
To prevent letters from flipping upside down during circular movement, a reverse angle counter-rotation is applied:

CSS
transform: rotate(var(--start-angle)) translateX(var(--orbit-radius)) rotate(calc(-1 * var(--start-angle)));
💻 Getting Started Locally
Prerequisites
Node.js 18.x or later

npm, pnpm, or yarn

Installation
Clone the repository:

Bash
git clone [https://github.com/moajjem441/NameArt.git](https://github.com/moajjem441/NameArt.git)
cd NameArt
Install dependencies:

Bash
npm install
Run development server:

Bash
npm run dev
Open http://localhost:3000 in your browser.

👨‍💻 Author
Moajjem Hossain

GitHub: @moajjem441