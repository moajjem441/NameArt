NameArt ✨

NameArt ekta interactive Next.js web app jekhane user tar naam type korle, protita letter pixel-art style-e slowly fill-up hoye show hoy, tarpor letters gulo ekta circle-e orbit kore ghurpak khay, ar shesh-e abar original position-e ferot ashe.

🔗 Repo: github.com/moajjem441/NameArt 🚀 Live/Deploy: vercel.com/moajjems-projects

🎯 Features
Pixel-art letter rendering — protita letter 5-column grid pattern diye pixel block hishebe draw kora hoy.
Sequential fill-up animation — protita letter-er block-gulo top-to-bottom, left-to-right order-e ekta-ekta kore fade-in hoy.
Position-based gradient color — protita letter-er upor theke nicher dike color smoothly ekta shade theke onno shade-e transition hoy (jemon cyan → purple).
Neon glow effect — protita active pixel-e subtle glow (box-shadow) thake, jate letters-gulo dekhte premium/futuristic lage.
Orbit animation — pura naam show howar kichukkhon por, protita letter ekta circle-er charidik e ghurte thake, tarpor abar original line-e ferot ashe.
Debounced input — user typing korar shomoy animation restart hoy na; typing thamle (500ms por) tobe animation shuru hoy.
Replay button — animation sequence abar dekhte chaile, ekta click-e replay kora jay.
Space handling — multi-word naam (jemon "Moajjem Hossain") likhle words-er majhe proper gap thake, letters ese pashapashi lege jay na.
Fully responsive — mobile, tablet, ar desktop — sob screen size-e pixel size, spacing, ar orbit radius nijer moton adjust hoy.
🧩 Project Structure
├── page.tsx           # Main Home component — input, state, animation timing logic
├── PixelLetter.tsx    # Ekta single letter-ke pixel grid hishebe render kore
├── letters.ts         # Protita letter-er 5x N pixel pattern (0/1 grid) define kora
└── globals.css        # Sob CSS keyframe animation (fill-up, orbit)
⚙️ Kivabe Kaj Kore
1. Letter Pattern (letters.ts)

Protita letter (A–Z) ekta 2D array (number[][]) hishebe define kora, jekhane 1 mane pixel active thakbe, 0 mane blank thakbe. Example:

ts
M: [
  [1,0,0,0,1],
  [1,1,0,1,1],
  [1,0,1,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
]
2. Pixel Rendering (PixelLetter.tsx)
Pattern-er protita cell-ke ekta div hishebe render kore.
Row position onujayi color interpolate kora hoy (topColor theke bottomColor).
Protita active pixel-e animationDelay set kora hoy, jate order onujayi ekta ekta kore fill-up hoy.
Neon glow-er jonno boxShadow add kora hoy pixel-er nijer color diye.
3. Main Logic (page.tsx)
Debounce: user typing korar shomoy name state update hoy, kintu actual animation committedName state-e chole — 500ms typing na thamle eta update hoy na.
Timing calculation: protita letter-er total pixel count ar fill speed diye calculate kora hoy pura naam kokhon show hoye shesh hobe.
Phase management: idle → orbiting → abar idle — useEffect diye setTimeout chain kore phase change kora hoy.
Orbit positioning: protita letter-ke rotate() → translateX() → rotate(-angle) CSS trick diye circle-er ekta point-e boshano hoy, jate letter nijeই upright thake (ulte jay na).
Responsive radius: window.innerWidth check kore orbit radius chotto/boro screen onujayi set kora hoy.
4. Animations (globals.css)
pixel-fill — protita pixel fade + scale-in howar keyframe.
orbit — CSS custom properties (--start-angle, --orbit-radius) use kore letter-ke circular path-e continuously ghurano hoy.
🎨 Customization
Parameter	Location	Purpose
fillSpeed	PixelLetter.tsx	Protita pixel-er moddhe koto ms gap thakbe (fill-up speed)
topColor / bottomColor	PixelLetter.tsx	Gradient-er color combo
ORBIT_SPIN_TIME	page.tsx	Ekbar full circle ghurte koto second lagbe
ORBIT_HOLD_MS	page.tsx	Koto khon orbit cholbe
WAIT_AFTER_SHOW_MS	page.tsx	Naam show howar por koto wait kore orbit shuru hobe
DEBOUNCE_MS	page.tsx	Typing thamar por koto wait kore animation shuru hobe
🚀 Getting Started
bash
git clone https://github.com/moajjem441/NameArt.git
cd NameArt
npm install
npm run dev

Tarpor browser-e http://localhost:3000 open korle app dekha jabe.

Deployment

Ei project Vercel-e deploy kora — Next.js app hওয়ay Vercel-e deploy kora shobcheye simple: GitHub repo connect korle automatic build/deploy hoye jay protita push-e.

📱 Responsive Behavior
Mobile (< 640px): Chotto pixel size, kom gap, chotto orbit radius (~55px).
Tablet (640–1024px): Medium pixel size, medium orbit radius (~70–90px).
Desktop (> 1024px): Full size pixel, boro orbit radius (~110px).
🔮 Future Improvements (Ideas)
prefers-reduced-motion respect kora accessibility-er jonno
Speed slider / pause-resume control
Color theme picker
Screen reader support (aria-label diye naam text hishebe announce kora)
👤 Author

Moajjem Hossain GitHub: @moajjem441

Built with Next.js, React, TypeScript, and Tailwind CSS.