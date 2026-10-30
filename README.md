# A Romantic Surprise for Anjella ❤️

A personalized, romantic proposal web application designed exclusively for **Anjella**.

---

## ✨ Features & Sequence

### 💌 Step 1: Heart-Shaped QR Code Card
- Real working QR code with customized pink modules and a heart badge at the center.
- Printable white luxury card with soft pink drop-shadows and the exact message:
  > “Hey Anjella ❤️”  
  > “Scan this little surprise…”  
  > “Open when you are alone 💗”  
- Live URL input to regenerate the code with your live deployed URL (Vercel/Netlify).
- 1-Click **"Download Card (PNG)"** and **"Print Card"** buttons.

### 🐰 Step 2: The Surprise & Cute Bunny Character
- Original white-and-pink animated vector kawaii bunny with a purple bow on its right ear.
- Gentle breathing, ear twitching, eye blinking every few seconds, blushing pink cheeks.
- Holding a beating little pink heart.
- Shimmering **“Open your surprise 💌”** button.

### 📸 Step 3: Our Memories & Polaroid Photo Gallery
- Realistic Polaroid-style photo frames with subtle rotation tilts, washi tape pin, and soft pink shadows.
- Displays real uploaded photos of you and Anjella together.
- Captions such as:
  - *“My favourite memories ❤️”*
  - *“You and me 🫂”*
  - *“My favourite person 💖”*
- Dual modes: **Interactive Slideshow** and **View All Grid**.
- Built-in **Photo Manager** allowing you to upload, reorder, delete, and replace photos anytime. Stored safely in browser IndexedDB.

### 💍 Step 4: The Proposal Popup
- The bunny peeks holding a love letter with a heart wax seal.
- Animated popup card with the authentic **dashed pink-and-blue border** from the reference video.
- Proposal message:
  > “Dear Anjella ❤️  
  >  
  > You make my world more beautiful.  
  > Every little moment with you means so much to me.  
  >  
  > I have a little question for you…  
  >  
  > Will you be mine? 🥺💗”  
- **❤️ YES Button**: Glowing heartbeat pulse effect, expands and sparkles.
- **💙 NO Button**: Playfully dodges and leaps away on hover or touch, displaying teasing messages (*“Wait, think again! 🥺”*, *“Look to the left! 👉❤️”*, *“Bunny will cry! 🐰💔”*), making YES irresistible!

### 🎉 Step 5: Final Celebration
- Massive confetti explosion and heart fireworks.
- The bunny enters an ecstatic celebration state: jumping with joy, heart eyes, hands in the air with flower sparkles!
- Celebration headings:
  - *“Anjella Said YES! ❤️”*
  - *“Yayyyyy! 🥹🫂❤️”*
  - *“You’re my favourite person, and I’m so lucky to have you.”*
  - *“Forever starts with a little YES. 💗”*
- Romantic slideshow with Ken Burns zoom effect and celebration action buttons.

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in your browser
http://localhost:5173
```

---

## 🌐 Deploying to Vercel or Netlify (100% Free)

### Option A: Vercel (Recommended)
1. Push this folder to a GitHub repository:
   ```bash
   git remote add origin https://github.com/<your-username>/anjella-proposal.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `anjella-proposal` repository.
4. Framework Preset: **Vite** (detected automatically).
5. Click **Deploy**!
6. Once deployed, copy your URL (e.g. `https://anjella-surprise.vercel.app`), open **Step 1: QR Card** on the site, paste your URL, and click **Download Card (PNG)**!

### Option B: Netlify
1. Go to [netlify.com](https://netlify.com).
2. Connect your GitHub repository or run `npm run build` and drag & drop the `dist/` folder into the Netlify Drop dashboard.
3. It deploys instantly!
