# Wubalem Birthday Surprise

A complete, offline-friendly birthday website made for Wubalem by her best friend Habtam.

## Files

- `index.html` — page structure and all editable text
- `style.css` — visual design and responsive layout
- `main.js` — welcome gate, cake, gift, letter, secret note, gallery, confetti, and media controls
- `assets/images/` — individual and friendship photos
- `assets/music/background.mp4` — personal video and its soundtrack

## Add photos / ፎቶዎችን ለመጨመር

- Add Wubalem's individual photo as `assets/images/bcha.jpg`.
- The featured portrait uses `assets/images/bcha.jpg`.
- The gallery uses `assets/images/withbegena.jpg` and `assets/images/without begena huletachn.jpg` for photos together.
- Keep real photos private and share only through a trusted link.

## Video / ቪዲዮ

The project video is `assets/music/background.mp4`. It plays muted, loops, and covers the screen as a background. A separate video section after the photo gallery lets visitors play the same clip with native video and volume controls. To use a different clip, replace the MP4 at that path or update both video source paths in `index.html`.

## Background music / ሙዚቃ

The music player uses the soundtrack included in `assets/music/background.mp4`. Music does not autoplay: visitors can press **Play music** and adjust the volume with the slider. Starting the video section pauses the separate music player. Music keeps its position while browsing the page and is not reset when visitors choose **Read the surprise again**.

የሙዚቃ ማጫወቻው በ`assets/music/background.mp4` ውስጥ ያለውን የድምፅ ትራክ ይጠቀማል። ሙዚቃው በራሱ አይጀምርም፤ ለማጫወት **Play music** ይጫኑ፣ ድምፁንም በስላይደሩ ያስተካክሉ። ቪዲዮውን ወይም ሙዚቃውን ሲጀምሩ ሌላው ይቆማል።
## Test locally / በኮምፒዩተር ላይ ለመሞከር

Open the project folder in VS Code, then start a local server. In PowerShell:

```powershell
cd "C:\Users\hermi\Desktop\HBD"
python -m http.server 5500
```

Visit `http://127.0.0.1:5500`. You can also open `index.html` directly, although a small local server is recommended for music and predictable browser behavior.

## Publish / ለማተም

Upload the entire folder to one of these static hosts:

- GitHub Pages
- Netlify Drop
- Cloudflare Pages

Keep `index.html`, `style.css`, `main.js`, and the `assets` folder together in the published folder. Do not upload the README unless you want it visible.

## Edit text / ጽሁፍን ለመቀየር

All visible wording is in `index.html`. Habtam can edit the greeting, memory titles, gallery captions, letter, secret note, and final message directly in that file. The letter and secret note intentionally celebrate friendship and sisterhood.

## Interaction checklist

- [ ] Start button opens the surprise and hides the welcome screen.
- [ ] Make a Wish changes the button, candle flames, message, and confetti.
- [ ] Gift box lid and bow animate open; tapping again closes it.
- [ ] Birthday letter opens in a smooth full-screen dialog and closes with × or backdrop.
- [ ] Envelope opens the secret note and the secret note closes with ×.
- [ ] Every gallery photo opens in the full-screen viewer and closes with × or backdrop.
- [ ] Background music only starts after the play button is pressed; pause and volume controls work.
- [ ] The responsive video plays with its native controls and does not play over the background music.
- [ ] Read the surprise again returns to the beginning.
- [ ] Layout has no horizontal overflow on Android, iPhone, tablet, and desktop sizes.
