import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

(function () {
  const container = document.getElementById("dvd-model");
  const canvas = document.getElementById("dvd-model-canvas");
  if (!container || !canvas) return;

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  } catch (err) {
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.05, 20);

  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.5));
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
  keyLight.position.set(1.2, 1.6, 1.8);
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
  fillLight.position.set(-1.4, 0.6, -1.2);
  scene.add(fillLight);

  let model = null;
  let size = pickSize();

  function pickSize() {
    return window.matchMedia("(max-width: 760px)").matches ? 110 : 210;
  }

  function setSize(px) {
    size = px;
    renderer.setSize(px, px, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }

  setSize(size);

  new GLTFLoader().load(
    "assets/3dmodel/model.glb",
    function (gltf) {
      model = gltf.scene;

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      const sphere = new THREE.Sphere();
      box.getBoundingSphere(sphere);
      const fitDistance = sphere.radius / Math.sin((Math.PI * camera.fov) / 360);
      camera.position.set(0, 0, fitDistance * 1.12);
      camera.near = fitDistance / 100;
      camera.far = fitDistance * 10;
      camera.updateProjectionMatrix();

      scene.add(model);
      container.classList.add("is-ready");
      startLoop();
    },
    undefined,
    function (err) {
      console.warn("No se pudo cargar el modelo 3D:", err);
    }
  );

  // ----- Bounce state (DVD-logo style, in viewport pixel space) -----
  let x = Math.random() * Math.max(0, window.innerWidth - size);
  let y = Math.random() * Math.max(0, window.innerHeight - size);
  const startAngle = Math.random() * Math.PI * 2;
  const speed = 145; // px/second
  let vx = Math.cos(startAngle) * speed;
  let vy = Math.sin(startAngle) * speed;

  // Free continuous spin only around the vertical axis (the model's "own axis").
  // Pitch/roll stay as small bounded wobbles so the scan never tumbles into its
  // unscanned top/chin, which have no real geometry/texture.
  let rotSpeedY = (Math.random() * 0.9 + 0.35) * (Math.random() < 0.5 ? -1 : 1);
  let pitchAmp = 0.05 + Math.random() * 0.05;
  let pitchFreq = 0.5 + Math.random() * 0.4;
  let pitchPhase = Math.random() * Math.PI * 2;
  let rollAmp = 0.06 + Math.random() * 0.06;
  let rollFreq = 0.4 + Math.random() * 0.4;
  let rollPhase = Math.random() * Math.PI * 2;
  let elapsed = 0;

  function randomizeSpin() {
    rotSpeedY = (Math.random() * 0.9 + 0.35) * (Math.random() < 0.5 ? -1 : 1);
    pitchAmp = 0.05 + Math.random() * 0.05;
    pitchFreq = 0.5 + Math.random() * 0.4;
    rollAmp = 0.06 + Math.random() * 0.06;
    rollFreq = 0.4 + Math.random() * 0.4;
  }

  function jitterVelocity() {
    const jitter = Math.random() * 0.5 - 0.25;
    const angle = Math.atan2(vy, vx) + jitter;
    const s = Math.hypot(vx, vy);
    vx = Math.cos(angle) * s;
    vy = Math.sin(angle) * s;
  }

  // ----- Cursor as a physical obstacle -----
  const CURSOR_RADIUS = 22;
  let cursorX = -9999;
  let cursorY = -9999;
  let cursorHit = false;

  function updateCursor(e) {
    cursorX = e.clientX;
    cursorY = e.clientY;
  }

  window.addEventListener("pointermove", updateCursor, { passive: true });
  window.addEventListener("pointerdown", updateCursor, { passive: true });
  document.addEventListener("mouseleave", function () {
    cursorX = -9999;
    cursorY = -9999;
  });

  container.style.transform = "translate3d(" + x + "px," + y + "px,0)";

  let running = false;
  let lastT = 0;
  let rafId = null;

  function step(t) {
    if (!running) return;
    if (!lastT) lastT = t;
    const dt = Math.min((t - lastT) / 1000, 0.05);
    lastT = t;

    const maxX = Math.max(0, window.innerWidth - size);
    const maxY = Math.max(0, window.innerHeight - size);

    x += vx * dt;
    y += vy * dt;

    let bounced = false;
    if (x <= 0) {
      x = 0;
      vx = Math.abs(vx);
      bounced = true;
    } else if (x >= maxX) {
      x = maxX;
      vx = -Math.abs(vx);
      bounced = true;
    }
    if (y <= 0) {
      y = 0;
      vy = Math.abs(vy);
      bounced = true;
    } else if (y >= maxY) {
      y = maxY;
      vy = -Math.abs(vy);
      bounced = true;
    }

    if (bounced) {
      jitterVelocity();
      randomizeSpin();
    }

    const bustRadius = size / 2;
    const cx = x + bustRadius;
    const cy = y + bustRadius;

    // Collide with the cursor like it's a solid ball blocking the way.
    const dx = cx - cursorX;
    const dy = cy - cursorY;
    const dist = Math.hypot(dx, dy);
    const minDist = bustRadius + CURSOR_RADIUS;

    if (dist < minDist) {
      const nx = dist > 0.0001 ? dx / dist : 1;
      const ny = dist > 0.0001 ? dy / dist : 0;

      const overlap = minDist - dist;
      x = Math.min(Math.max(x + nx * overlap, 0), maxX);
      y = Math.min(Math.max(y + ny * overlap, 0), maxY);

      if (!cursorHit) {
        const dot = vx * nx + vy * ny;
        if (dot < 0) {
          vx -= 2 * dot * nx;
          vy -= 2 * dot * ny;
        }
        jitterVelocity();
        randomizeSpin();
        cursorHit = true;
      }
    } else {
      cursorHit = false;
    }

    elapsed += dt;

    if (model) {
      model.rotation.y += rotSpeedY * dt;
      model.rotation.x = Math.sin(elapsed * pitchFreq + pitchPhase) * pitchAmp;
      model.rotation.z = Math.sin(elapsed * rollFreq + rollPhase) * rollAmp;
      renderer.render(scene, camera);
    }

    container.style.transform = "translate3d(" + x + "px," + y + "px,0)";
    rafId = window.requestAnimationFrame(step);
  }

  function startLoop() {
    if (running) return;
    running = true;
    lastT = 0;
    rafId = window.requestAnimationFrame(step);
  }

  function stopLoop() {
    running = false;
    if (rafId) window.cancelAnimationFrame(rafId);
    rafId = null;
  }

  window.addEventListener("resize", function () {
    const next = pickSize();
    if (next !== size) setSize(next);
    x = Math.min(x, Math.max(0, window.innerWidth - size));
    y = Math.min(y, Math.max(0, window.innerHeight - size));
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stopLoop();
    else if (model) startLoop();
  });
})();
