const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function createPetals(container, count, isForeground) {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < count; index += 1) {
    const petal = document.createElement("span");
    const size = isForeground ? 9 + Math.random() * 13 : 5 + Math.random() * 9;
    const direction = Math.random() > 0.18 ? 1 : -1;
    petal.className = "petal";
    petal.style.setProperty("--size", `${size.toFixed(1)}px`);
    petal.style.setProperty("--duration", `${10 + Math.random() * 12}s`);
    petal.style.setProperty("--delay", `${-Math.random() * 24}s`);
    petal.style.setProperty("--start", `${-8 + Math.random() * 108}vw`);
    petal.style.setProperty("--drift", `${direction * (8 + Math.random() * 24)}vw`);
    fragment.appendChild(petal);
  }
  container.appendChild(fragment);
}

if (!reduceMotion) {
  createPetals(document.querySelector(".petals-back"), 18, false);
  createPetals(document.querySelector(".petals-front"), 12, true);
  let targetWind = 0;
  let currentWind = 0;
  window.addEventListener("pointermove", (event) => {
    const xRatio = event.clientX / window.innerWidth;
    const yRatio = event.clientY / window.innerHeight;
    targetWind = (xRatio - 0.5) * 2;
    root.style.setProperty("--cursor-x", `${(xRatio * 100).toFixed(1)}%`);
    root.style.setProperty("--cursor-y", `${(yRatio * 100).toFixed(1)}%`);
  }, { passive: true });

  function updateWind() {
    currentWind += (targetWind - currentWind) * 0.035;
    root.style.setProperty("--wind", `${(currentWind * 2.6).toFixed(2)}deg`);
    root.style.setProperty("--wind-shift", `${(currentWind * 16).toFixed(2)}px`);
    requestAnimationFrame(updateWind);
  }
  updateWind();
}
