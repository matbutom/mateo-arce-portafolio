/* ===== ASCII FADE-IN TRANSITION + LAZY MEDIA LOADER ===== */
(function () {
  // --- ASCII overlay animation ---
  const ASCII_CHARS = "/@#$%&*+=~^!?|\\:;.,`'-_(){}[]<>01";
  const overlay = document.querySelector(".ascii-overlay");
  const grid = document.querySelector(".ascii-grid");

  if (overlay && grid) {
    // Calculate grid size based on viewport
    const charW = window.innerWidth < 600 ? 7 : 9;
    const charH = window.innerWidth < 600 ? 12 : 16;
    const cols = Math.floor(window.innerWidth / charW);
    const rows = Math.floor(window.innerHeight / charH);

    function randomChar() {
      return ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
    }

    function generateFrame(density) {
      let frame = "";
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          frame += Math.random() < density ? randomChar() : " ";
        }
        if (r < rows - 1) frame += "\n";
      }
      return frame;
    }

    // Animate: start dense, get sparser, then fade out
    let density = 0.6;
    let frameCount = 0;
    const totalFrames = 18;
    const interval = setInterval(function () {
      frameCount++;
      density = Math.max(0, 0.6 * (1 - frameCount / totalFrames));
      grid.style.color =
        "rgba(200,200,200," + Math.max(0, 1 - frameCount / totalFrames) + ")";
      grid.textContent = generateFrame(density);

      if (frameCount >= totalFrames) {
        clearInterval(interval);
        overlay.classList.add("fade-out");
        setTimeout(function () {
          overlay.classList.add("hidden");
        }, 700);
      }
    }, 60);
  }

  // --- Lazy fade-in for images and videos ---
  function onMediaReady(el) {
    el.classList.add("loaded");
  }

  var mediaEls = document.querySelectorAll(
    ".gallery img, .gallery video, .project-gallery img, .project-gallery video"
  );

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        observer.unobserve(el);

        if (el.tagName === "IMG") {
          if (el.complete && el.naturalWidth > 0) {
            onMediaReady(el);
          } else {
            el.addEventListener("load", function () {
              onMediaReady(el);
            });
            el.addEventListener("error", function () {
              onMediaReady(el);
            });
          }
        } else if (el.tagName === "VIDEO") {
          if (el.readyState >= 2) {
            onMediaReady(el);
          } else {
            el.addEventListener("loadeddata", function () {
              onMediaReady(el);
            });
            el.addEventListener("error", function () {
              onMediaReady(el);
            });
            // Fallback: if video takes too long, show it anyway
            setTimeout(function () {
              onMediaReady(el);
            }, 3000);
          }
        }
      });
    },
    { rootMargin: "100px" }
  );

  mediaEls.forEach(function (el) {
    observer.observe(el);
  });
})();
