(() => {
  const MUSIC_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  const POSITION_KEY = "do-you-love-me-music-position";
  const audio = document.createElement("audio");
  const button = document.createElement("button");

  audio.src = MUSIC_URL;
  audio.loop = true;
  audio.preload = "auto";
  audio.setAttribute("aria-label", "Background music");
  audio.volume = 0.35;
  document.body.appendChild(audio);

  button.type = "button";
  button.textContent = "🎵 Play music";
  button.setAttribute("aria-label", "Play or pause background music");
  button.style.cssText = "position:fixed;right:1rem;bottom:1rem;z-index:10;border:0;border-radius:999px;padding:.7rem 1rem;background:#fff;color:#d63384;box-shadow:0 2px 10px #0002;cursor:pointer;font:inherit;";
  document.body.appendChild(button);

  const savedPosition = Number.parseFloat(localStorage.getItem(POSITION_KEY));
  if (Number.isFinite(savedPosition)) {
    audio.addEventListener("loadedmetadata", () => {
      audio.currentTime = Math.min(savedPosition, Math.max(0, audio.duration - 0.1));
    }, { once: true });
  }

  const playMusic = () => audio.play().then(() => {
    button.textContent = "🔊 Pause music";
  }).catch(() => {
    button.textContent = "🎵 Play music";
  });

  button.addEventListener("click", () => {
    if (audio.paused) playMusic();
    else {
      audio.pause();
      button.textContent = "🎵 Play music";
    }
  });

  // Browsers block autoplay until the visitor interacts with the page.
  ["pointerdown", "keydown", "touchstart"].forEach((eventName) => {
    window.addEventListener(eventName, playMusic, { once: true, passive: true });
  });

  audio.addEventListener("play", () => { button.textContent = "🔊 Pause music"; });
  audio.addEventListener("pause", () => { button.textContent = "🎵 Play music"; });
  setInterval(() => {
    if (!audio.paused && Number.isFinite(audio.currentTime)) {
      localStorage.setItem(POSITION_KEY, String(audio.currentTime));
    }
  }, 1000);
  window.addEventListener("pagehide", () => {
    localStorage.setItem(POSITION_KEY, String(audio.currentTime || 0));
  });

  playMusic();
})();
