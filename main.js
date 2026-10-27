
const welcome = document.getElementById("welcome");
const surprise = document.getElementById("surprise");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const ambient = document.getElementById("ambient");
const confettiLayer = document.getElementById("confetti");

const gift = document.getElementById("gift");
const giftReveal = document.getElementById("giftReveal");
const giftHint = document.getElementById("giftHint");

const wishButton = document.getElementById("wishButton");
const wishMessage = document.getElementById("wishMessage");
const letterModal = document.getElementById("letterModal");
const openLetter = document.getElementById("openLetter");
const closeLetter = document.querySelector(".close-letter");

const secretEnvelope = document.getElementById("secretEnvelope");
const secretNote = document.getElementById("secretNote");
const closeNote = document.querySelector(".close-note");

const photoModal = document.getElementById("photoModal");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

const musicControl = document.getElementById("musicControl");
const musicLabel = document.getElementById("musicLabel");
const birthdayMusic = document.getElementById("birthdayMusic");
const musicVolume = document.getElementById("musicVolume");
const birthdayVideo = document.getElementById("birthdayVideo");
const backgroundVideo = document.getElementById("backgroundVideo");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

backgroundVideo.muted = true;
backgroundVideo.play().catch((error) => {
  console.error("የጀርባ ቪዲዮው በራሱ ማጫወት አልቻለም።", error);
});

function resetSurpriseState() {
  wishButton.disabled = false;
  wishButton.innerHTML = 'ምኞት ተመኚ <span aria-hidden="true">✨</span>';
  wishMessage.textContent = "";
  document.querySelectorAll(".candle i").forEach((flame) => flame.classList.remove("is-out"));

  gift.classList.remove("is-open");
  gift.setAttribute("aria-expanded", "false");
  giftReveal.classList.remove("is-open");
  giftReveal.setAttribute("aria-hidden", "true");
  giftHint.textContent = "ስጦታውን ለመክፈት ንኪው";

  if (letterModal.open) letterModal.close();
  openLetter.setAttribute("aria-expanded", "false");

  secretEnvelope.classList.remove("is-open");
  secretEnvelope.setAttribute("aria-expanded", "false");
  secretNote.classList.remove("is-open");
  secretNote.setAttribute("aria-hidden", "true");

  if (photoModal.open) photoModal.close();

  if (!birthdayVideo.paused) birthdayVideo.pause();

  confettiLayer.innerHTML = "";
  document.body.classList.remove("surprise-started");
}

function enterSurprise() {
  welcome.classList.add("is-leaving");
  surprise.classList.remove("is-locked");
  document.body.classList.add("surprise-started");
  window.setTimeout(() => {
    welcome.hidden = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, prefersReducedMotion.matches ? 0 : 700);
}

startButton.addEventListener("click", enterSurprise);

restartButton.addEventListener("click", () => {
  resetSurpriseState();
  surprise.classList.add("is-locked");
  welcome.hidden = false;
  window.requestAnimationFrame(() => {
    welcome.classList.remove("is-leaving");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

function makeConfetti(count = 110) {
  for (let index = 0; index < count; index += 1) {
    const piece = document.createElement("i");
    const size = 5 + Math.random() * 8;
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.width = `${size}px`;
    piece.style.height = `${size * (Math.random() > 0.6 ? 1 : 2)}px`;
    piece.style.background = ["#4B244A", "#C8A2C8", "#F0E6F6", "#FFF9F5", "#35213A"][index % 5];
    piece.style.animationDuration = `${2.2 + Math.random() * 2.8}s`;
    piece.style.animationDelay = `${Math.random() * 0.35}s`;
    piece.style.setProperty("--drift", `${-120 + Math.random() * 240}px`);
    confettiLayer.appendChild(piece);
    window.setTimeout(() => piece.remove(), 5600);
  }
}

wishButton.addEventListener("click", () => {
  wishButton.disabled = true;
  wishButton.innerHTML = 'ምኞት ተመኝተሻል <span aria-hidden="true">💗</span>';
  wishMessage.textContent = "ውብ ምኞቶችሽ ሁሉ እውን ይሁኑ።";
  document.querySelectorAll(".candle i").forEach((flame) => flame.classList.add("is-out"));
  makeConfetti();
});

function toggleGift() {
  const isOpen = gift.classList.toggle("is-open");
  gift.setAttribute("aria-expanded", String(isOpen));
  giftReveal.classList.toggle("is-open", isOpen);
  giftReveal.setAttribute("aria-hidden", String(!isOpen));
  giftHint.textContent = isOpen ? "ሁሌም ለአንቺ 💗" : "ስጦታውን ለመክፈት ንኪው";
  if (isOpen) makeConfetti(45);
}

gift.addEventListener("click", toggleGift);

openLetter.addEventListener("click", () => {
  openLetter.setAttribute("aria-expanded", "true");
  letterModal.showModal();
  closeLetter.focus();
});

closeLetter.addEventListener("click", () => letterModal.close());

letterModal.addEventListener("close", () => openLetter.setAttribute("aria-expanded", "false"));
letterModal.addEventListener("click", (event) => {
  if (event.target === letterModal) letterModal.close();
});

function toggleSecretNote() {
  const isOpen = secretEnvelope.classList.toggle("is-open");
  secretEnvelope.setAttribute("aria-expanded", String(isOpen));
  secretNote.classList.toggle("is-open", isOpen);
  secretNote.setAttribute("aria-hidden", String(!isOpen));
}

secretEnvelope.addEventListener("click", toggleSecretNote);
closeNote.addEventListener("click", () => {
  secretEnvelope.classList.remove("is-open");
  secretEnvelope.setAttribute("aria-expanded", "false");
  secretNote.classList.remove("is-open");
  secretNote.setAttribute("aria-hidden", "true");
  secretEnvelope.focus();
});

function openPhoto(photo) {
  const image = photo.querySelector("img");
  const caption = photo.querySelector("figcaption")?.textContent || "ውብ ትዝታ";
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = caption;
  photoModal.showModal();
}

document.querySelectorAll(".photo-trigger").forEach((photo) => {
  photo.addEventListener("click", () => openPhoto(photo));
  photo.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPhoto(photo);
    }
  });
});

document.querySelector(".close-photo").addEventListener("click", () => photoModal.close());
photoModal.addEventListener("click", (event) => {
  if (event.target === photoModal) photoModal.close();
});

function updateMusicControl(isPlaying) {
  musicControl.setAttribute("aria-pressed", String(isPlaying));
  musicControl.setAttribute("aria-label", isPlaying ? "የልደት ሙዚቃን አቁም" : "የልደት ሙዚቃን አጫውት");
  musicLabel.textContent = isPlaying ? "ሙዚቃ አቁም" : "ሙዚቃ አጫውት";
}

birthdayMusic.volume = Number(musicVolume.value);
musicVolume.addEventListener("input", () => {
  birthdayMusic.volume = Number(musicVolume.value);
});

birthdayMusic.addEventListener("play", () => updateMusicControl(true));
birthdayMusic.addEventListener("pause", () => updateMusicControl(false));
birthdayMusic.addEventListener("error", () => {
  musicControl.disabled = true;
  musicVolume.disabled = true;
  musicLabel.textContent = "የሙዚቃ ፋይል ጨምሪ";
  musicControl.setAttribute("aria-label", "ሙዚቃን ለማጫወት የሙዚቃ ፋይል ጨምሪ");
});

birthdayVideo.addEventListener("play", () => birthdayMusic.pause());

musicControl.addEventListener("click", async () => {
  try {
    if (birthdayMusic.paused) {
      birthdayVideo.pause();
      await birthdayMusic.play();
    } else {
      birthdayMusic.pause();
    }
  } catch (error) {
    musicLabel.textContent = birthdayMusic.error ? "የሙዚቃ ፋይል ጨምሪ" : "ሙዚቃውን ማጫወት አልተቻለም";
    console.error("የጀርባ ሙዚቃውን ማጫወት አልተቻለም።", error);
  }
});

function createAmbientPiece(index) {
  const piece = document.createElement("span");
  piece.className = index % 3 === 0 ? "ambient-heart" : "ambient-spark";
  piece.textContent = index % 3 === 0 ? ["♡", "♥"][index % 2] : "✦";
  piece.style.left = `${Math.random() * 100}%`;
  piece.style.animationDuration = `${8 + Math.random() * 9}s`;
  piece.style.animationDelay = `${Math.random() * -12}s`;
  piece.style.setProperty("--size", `${10 + Math.random() * 18}px`);
  ambient.appendChild(piece);
}

for (let index = 0; index < 22; index += 1) createAmbientPiece(index);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach((section) => revealObserver.observe(section));
