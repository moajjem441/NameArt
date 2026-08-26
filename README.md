# ✨ NameArt

**NameArt** is an interactive Next.js web app where users can type their name and watch each letter appear in pixel-art style. The letters are gradually filled pixel by pixel, then move around in a circular orbit before returning to their original position.

🚀 **Live Demo:** [Vercel Deployment](https://vercel.com/moajjems-projects)  
📦 **Repository:** [GitHub - NameArt](https://github.com/moajjem441/NameArt)

---

## 🎯 Features

- 🟦 **Pixel-Art Letter Rendering**
  - Each letter is rendered using a 5-column pixel grid pattern.
  - Active cells are displayed as individual pixel blocks.

- ✨ **Sequential Fill-Up Animation**
  - Pixels appear one by one.
  - Animation progresses from top-to-bottom and left-to-right.

- 🌈 **Position-Based Gradient**
  - Pixel colors smoothly transition from the top color to the bottom color.
  - Example: Cyan → Purple.

- 💡 **Neon Glow Effect**
  - Active pixels have a subtle dynamic glow using `box-shadow`.
  - Creates a futuristic neon-style appearance.

- 🌀 **Orbit Animation**
  - After the complete name is displayed, each letter moves around a circular orbit.
  - Letters remain upright while orbiting.
  - After the animation finishes, letters return to their original positions.

- ⏱️ **Debounced Input**
  - Animation does not restart while the user is actively typing.
  - Animation starts only after the user stops typing for 500ms.

- 🔁 **Replay Button**
  - Allows users to replay the complete animation sequence with one click.

- ␠ **Space Handling**
  - Supports multi-word names such as `Moajjem Hossain`.
  - Proper spacing is maintained between words.

- 📱 **Fully Responsive**
  - Optimized for mobile, tablet, and desktop screens.
  - Pixel size, spacing, and orbit radius adjust according to screen size.

---

## 🧩 Project Structure

```text
app/
├── page.tsx           # Main Home component and animation logic
├── PixelLetter.tsx    # Renders a single pixel-art letter
├── letters.ts         # A-Z letter patterns using 2D arrays
└── globals.css        # Animation keyframes and custom styles