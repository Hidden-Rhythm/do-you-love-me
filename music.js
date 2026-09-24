(() => {
  const MUSIC_URL = "https://www.image2url.com/r2/default/audio/1790254745990-b54d30bc-a7ed-4ddc-9ee6-e0a4abfc8a3b.mp3";
  const audio = document.createElement("audio");
  const button = document.createElement("button");

  audio.src = MUSIC_URL;
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0.35;
  audio.crossOrigin = "anonymous";

  button.type = "button";
  button.textContent = "🎵 Play music";
  button.style.cssText = "position:fixed;right:1rem;bottom:1rem;z-index:9999;border:none;border-radius:999px;padding:0.8rem 1rem;background:#fff;color:#d63384;box-shadow:0 4px 18px rgba(0,0,0,.2);cursor:pointer;font-size:1rem;";

  document.body.appendChild(audio);
  document.body.appendChild(button);

  const playMusic = async () => {
    try {
      await audio.play();
      button.textContent = "🔊 Pause music";
    } catch (error) {
      button.textContent = "🎵 Play music";
    }
  };

  button.addEventListener("click", () => {
    if (audio.paused) {
      playMusic();
    } else {
      audio.pause();
      button.textContent = "🎵 Play music";
    }
  });

  ["pointerdown", "keydown", "touchstart"].forEach((eventName) => {
    window.addEventListener(eventName, playMusic, { once: true, passive: true });
  });

  audio.addEventListener("play", () => {
    button.textContent = "🔊 Pause music";
  });

  audio.addEventListener("pause", () => {
    button.textContent = "🎵 Play music";
  });

  playMusic();
})();
