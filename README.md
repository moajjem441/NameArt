# ✨ NameArt

**NameArt** is an interactive Next.js web app where users can type their name and watch each letter appear in pixel-art style. The letters are gradually filled pixel by pixel, then move around in a circular orbit before returning to their original position.

🚀 **Live Demo:** [Vercel Deployment](https://nameart.vercel.app)  
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




⚙️ How It Works
1. Letter Patterns

Letter patterns are stored in letters.ts as 2D arrays.

Each array contains 0 and 1 values:

1 → Active pixel
0 → Empty space

Example:

M: [
  [1, 0, 0, 0, 1],
  [1, 1, 0, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
],
2. Pixel Rendering

PixelLetter.tsx converts the matrix into visual pixel blocks.

For every cell:

1 → Render pixel
0 → Render empty cell

Each active pixel receives:

A calculated gradient color
An animation delay
A neon glow effect

The animation delay is calculated according to the pixel's position so that the pixels appear sequentially.

3. Main Animation Logic

The main logic is handled inside page.tsx.

The animation flow is:

User types name
      ↓
Debounce 500ms
      ↓
Commit name
      ↓
Pixel-by-pixel fill animation
      ↓
Complete name displayed
      ↓
Wait
      ↓
Letters orbit around a circle
      ↓
Orbit animation finishes
      ↓
Letters return to original position
Debouncing

The user can type normally without restarting the animation on every keystroke.

The name is committed only after the user stops typing for 500ms.

Typing...
  ↓
500ms without typing
  ↓
Start animation
Timing Calculation

The application calculates the total animation duration based on:

Number of letters
Number of active pixels
Pixel fill speed
Animation delays

This allows the orbit animation to start at the correct time.

Phase Management

The animation uses different phases:

idle
 ↓
filling
 ↓
waiting
 ↓
orbiting
 ↓
idle

useEffect and setTimeout are used to control the transitions between these phases.



4. Orbit Animation

The orbit effect is created using CSS transforms.

Each letter receives a different starting angle:

rotate(angle)
  → translateX(orbit-radius)
  → rotate(-angle)

The final rotate(-angle) keeps the letters upright instead of rotating them along with the orbit.

CSS custom properties are used for responsive orbit values:

--start-angle
--orbit-radius


