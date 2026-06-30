(function () {
  const canvas = document.getElementById("ascii-background");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const sourceFolder = canvas.dataset.sourceFolder || "assets/ilustraciones/";
  const illustrationFiles = [
    "basket.png",
    "dogger.png",
    "Ilustración_sin_título 79.png",
    "Ilustración_sin_título 80.png",
    "Ilustración_sin_título 81.png",
    "Ilustración_sin_título 86.png",
    "Ilustración_sin_título 87.png",
    "Ilustración_sin_título 88.png",
    "Ilustración_sin_título 89.png",
    "Recurso 11.png",
    "Recurso 12.png",
    "Recurso 13.png",
    "Recurso 14.png",
    "Recurso 15.png",
    "Recurso 16.png",
    "Recurso 17.png",
    "Recurso 18.png",
    "Recurso 19.png",
    "Recurso 20.png",
    "Recurso 21.png",
    "Recurso 22.png",
    "Recurso 23.png",
    "Recurso 24.png",
    "Recurso 25.png",
    "Recurso 26.png",
    "salchi_trompeta.png",
    "skater 2.png",
    "skater.png"
  ];
  const density = " .,:;i!lI?xvYVOM8B@";
  const glyphs = "/\\|_-+=<>ivx.,'`";
  const loadedImages = [];
  const sprites = [];
  const maxSprites = 14;
  const frameMs = 1000 / 30;

  let dpr = 1;
  let lastFrame = 0;
  let spawnTimer = 0;
  let running = false;
  let settledImages = 0;

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.ceil(window.innerWidth * dpr);
    canvas.height = Math.ceil(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeAsciiSprite(image, width, cellSize) {
    const ratio = image.height / image.width;
    const height = width * ratio;
    const cols = Math.max(10, Math.round(width / cellSize));
    const rows = Math.max(10, Math.round(height / cellSize));
    const sample = document.createElement("canvas");
    const sampleCtx = sample.getContext("2d", { willReadFrequently: true });
    const sprite = document.createElement("canvas");
    const spriteCtx = sprite.getContext("2d");

    sample.width = cols;
    sample.height = rows;
    sprite.width = Math.ceil(cols * cellSize);
    sprite.height = Math.ceil(rows * cellSize);

    sampleCtx.clearRect(0, 0, cols, rows);
    sampleCtx.drawImage(image, 0, 0, cols, rows);

    const pixels = sampleCtx.getImageData(0, 0, cols, rows).data;
    spriteCtx.clearRect(0, 0, sprite.width, sprite.height);
    spriteCtx.font = `${cellSize * 1.22}px "Courier New", Courier, monospace`;
    spriteCtx.textBaseline = "top";

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const index = (y * cols + x) * 4;
        const r = pixels[index];
        const g = pixels[index + 1];
        const b = pixels[index + 2];
        const a = pixels[index + 3];

        if (a < 36) continue;

        const luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
        const glyphIndex = Math.floor((1 - luminance) * (density.length - 1));
        const useDirectionalGlyph = Math.random() > 0.78;
        const char = useDirectionalGlyph
          ? glyphs[(x + y + glyphIndex) % glyphs.length]
          : density[glyphIndex];

        spriteCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(0.9, a / 255)})`;
        spriteCtx.fillText(char, x * cellSize, y * cellSize);
      }
    }

    return sprite;
  }

  function getSpriteBounds(x, y, width, height, scale) {
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;
    const padding = window.innerWidth < 700 ? 12 : 22;

    return {
      left: x + (width - scaledWidth) / 2 - padding,
      right: x + (width + scaledWidth) / 2 + padding,
      top: y + (height - scaledHeight) / 2 - padding,
      bottom: y + (height + scaledHeight) / 2 + padding
    };
  }

  function boundsOverlap(a, b) {
    return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  }

  function pickAvailableImage() {
    const activeSources = new Set(sprites.map((sprite) => sprite.source));
    const availableImages = loadedImages.filter((item) => !activeSources.has(item.source));
    if (!availableImages.length) return null;
    return availableImages[Math.floor(Math.random() * availableImages.length)];
  }

  function findOpenPosition(spriteImage, scale) {
    const margin = Math.max(spriteImage.width, spriteImage.height) * 0.18;

    for (let i = 0; i < 90; i++) {
      const x = randomBetween(-margin, window.innerWidth - spriteImage.width + margin);
      const y = randomBetween(-margin, window.innerHeight - spriteImage.height + margin);
      const bounds = getSpriteBounds(x, y, spriteImage.width, spriteImage.height, scale);
      const isOpen = sprites.every((sprite) => !boundsOverlap(bounds, sprite.bounds));

      if (isOpen) return { x, y, bounds };
    }

    return null;
  }

  function spawnSprite(initial) {
    if (!loadedImages.length) return;

    const sourceImage = pickAvailableImage();
    if (!sourceImage) return;

    const isMobile = window.innerWidth < 700;
    const width = randomBetween(isMobile ? 72 : 110, isMobile ? 260 : 560);
    const cellSize = randomBetween(isMobile ? 5 : 6, isMobile ? 12 : 15);
    const spriteImage = makeAsciiSprite(sourceImage.image, width, cellSize);
    const startScale = randomBetween(0.82, 0.94);
    const scale = randomBetween(0.98, 1.12);
    const placement = findOpenPosition(spriteImage, scale);

    if (!placement) return;

    sprites.push({
      image: spriteImage,
      source: sourceImage.source,
      x: placement.x,
      y: placement.y,
      bounds: placement.bounds,
      vx: randomBetween(-1.4, 1.4),
      vy: randomBetween(-1.1, 1.1),
      scale,
      startScale,
      age: initial ? randomBetween(0, 9000) : 0,
      duration: randomBetween(5200, 10500),
      alpha: randomBetween(0.86, 1)
    });

    if (sprites.length > maxSprites) sprites.shift();
  }

  function drawFrame(timestamp) {
    if (!lastFrame) lastFrame = timestamp;
    const delta = Math.min(80, timestamp - lastFrame);

    if (delta < frameMs) {
      requestAnimationFrame(drawFrame);
      return;
    }

    lastFrame = timestamp;
    spawnTimer += delta;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if (spawnTimer > 720) {
      spawnSprite(false);
      spawnTimer = 0;
    }

    for (let i = sprites.length - 1; i >= 0; i--) {
      const sprite = sprites[i];
      const previousX = sprite.x;
      const previousY = sprite.y;

      sprite.age += delta;
      sprite.x += sprite.vx * (delta / 1000);
      sprite.y += sprite.vy * (delta / 1000);

      let nextBounds = getSpriteBounds(
        sprite.x,
        sprite.y,
        sprite.image.width,
        sprite.image.height,
        sprite.scale
      );
      const collides = sprites.some(function (otherSprite, otherIndex) {
        return otherIndex !== i && boundsOverlap(nextBounds, otherSprite.bounds);
      });

      if (collides) {
        sprite.x = previousX;
        sprite.y = previousY;
        sprite.vx *= -0.72;
        sprite.vy *= -0.72;
        nextBounds = getSpriteBounds(
          sprite.x,
          sprite.y,
          sprite.image.width,
          sprite.image.height,
          sprite.scale
        );
      }

      sprite.bounds = nextBounds;

      const enterProgress = Math.min(1, sprite.age / 280);
      const fadeIn = sprite.age < 80 ? 0 : 1;
      const fadeOut = Math.min(1, (sprite.duration - sprite.age) / 900);
      const alpha = Math.max(0, Math.min(fadeIn, fadeOut)) * sprite.alpha;
      const snap = enterProgress < 1 ? 1 - Math.pow(1 - enterProgress, 3) : 1;
      const scale = sprite.startScale + (sprite.scale - sprite.startScale) * snap;

      if (sprite.age > sprite.duration) {
        sprites.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(sprite.x + sprite.image.width / 2, sprite.y + sprite.image.height / 2);
      ctx.scale(scale, scale);
      ctx.drawImage(sprite.image, -sprite.image.width / 2, -sprite.image.height / 2);
      ctx.restore();
    }

    requestAnimationFrame(drawFrame);
  }

  function start() {
    if (running) return;
    running = true;
    resizeCanvas();
    for (let i = 0; i < maxSprites; i++) spawnSprite(true);
    requestAnimationFrame(drawFrame);
  }

  illustrationFiles.forEach(function (filename) {
    const image = new Image();
    image.onload = function () {
      loadedImages.push({
        image,
        source: filename
      });
      settledImages++;
      if (settledImages === illustrationFiles.length) start();
    };
    image.onerror = function () {
      settledImages++;
      if (settledImages === illustrationFiles.length) start();
    };
    image.src = sourceFolder + filename;
  });

  window.addEventListener("resize", resizeCanvas);
})();
