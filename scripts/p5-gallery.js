// Galería de sketches p5.js (mateoArce_mam_*).
//
// El código y los recursos vienen de assets/p5-sketches/, exportados desde
// editor.p5js.org con scripts/export-p5-sketches.mjs (la API del editor no se
// puede consultar desde el navegador por CORS). Los previews son imágenes
// estáticas generadas con scripts/capture-p5-previews.mjs, así que solo corre
// un sketch a la vez: el que está abierto en el editor.

const SKETCHES_DIR = "assets/p5-sketches";

let sketches = [];
let previewVersion = "";
let current = null; // { sketch, original, indexHtml }
let selectionRequest = 0;
let runId = 0;
let stageWatch = null;

const gallery = document.querySelector("#gallery-view");
const grid = document.querySelector("#gallery-grid");
const galleryStatus = document.querySelector("#gallery-status");
const editor = document.querySelector("#editor-view");
const title = document.querySelector("#editor-title");
const textarea = document.querySelector("#code-editor");
const numbers = document.querySelector("#line-numbers");
const codeLabel = document.querySelector("#code-label");
const editorStatus = document.querySelector("#editor-status");
const runButton = document.querySelector("#run-button");
const resetButton = document.querySelector("#reset-button");
const openOriginal = document.querySelector("#editor-open-original");
const stage = document.querySelector("#render-stage");
const renderLabel = document.querySelector("#render-label");
const renderMessage = document.querySelector("#render-message");

function sketchDir(sketch) {
  return `${SKETCHES_DIR}/${sketch.slug}`;
}

async function getText(url) {
  const response = await fetch(url, { cache: "no-cache" });
  if (!response.ok) throw new Error(`${url} respondió HTTP ${response.status}`);
  return response.text();
}

function setEditorStatus(text, isError = false) {
  editorStatus.textContent = text;
  editorStatus.classList.toggle("is-error", isError);
}

function setRenderMessage(text, isError = false) {
  renderMessage.hidden = !text;
  renderMessage.textContent = text || "";
  renderMessage.classList.toggle("is-error", isError);
}

/* ---------- galería ---------- */

async function loadSketches() {
  galleryStatus.textContent = "Cargando sketches…";
  try {
    const manifest = JSON.parse(await getText(`${SKETCHES_DIR}/sketches.json`));
    // El manifiesto viene del más nuevo al más antiguo; la galería parte en 001.
    sketches = [...manifest.sketches].sort((a, b) => a.name.localeCompare(b.name, "es", { numeric: true }));
    previewVersion = manifest.exportedAt || "";
    galleryStatus.textContent = "";
  } catch (error) {
    const hint =
      location.protocol === "file:" ? " Abre el sitio desde un servidor local (por ejemplo Live Server)." : "";
    galleryStatus.textContent = `No pude cargar la lista de sketches: ${error.message}.${hint}`;
    galleryStatus.classList.add("is-error");
    return;
  }
  drawGallery();
  routeFromHash();
}

function drawGallery() {
  grid.replaceChildren();

  // Todos en una sola página; la última fila incompleta queda centrada (ver
  // .gallery-grid en el CSS).
  sketches.forEach((sketch, index) => {
    const card = document.createElement("a");
    card.className = "gallery-card";
    card.href = `#${sketch.slug}`;
    card.setAttribute("aria-label", `Abrir ${sketch.name}`);

    const preview = document.createElement("span");
    preview.className = "gallery-preview";
    const placeholder = document.createElement("span");
    placeholder.className = "preview-placeholder";
    placeholder.textContent = "cargando…";
    const image = document.createElement("img");
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("load", () => preview.classList.add("is-loaded"));
    image.addEventListener("error", () => {
      image.remove();
      placeholder.textContent = "sin preview";
    });
    const previewUrl = `${sketchDir(sketch)}/preview.jpg`;
    image.src = previewVersion ? `${previewUrl}?v=${encodeURIComponent(previewVersion)}` : previewUrl;
    preview.append(placeholder, image);

    const label = document.createElement("span");
    label.className = "gallery-name";
    const name = document.createElement("span");
    name.textContent = sketch.name;
    const itemNumber = document.createElement("span");
    itemNumber.className = "gallery-number";
    itemNumber.textContent = String(index + 1).padStart(2, "0");
    label.append(name, itemNumber);

    card.append(preview, label);
    card.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey) return;
      event.preventDefault();
      history.pushState({ slug: sketch.slug }, "", `#${sketch.slug}`);
      openEditor(sketch);
    });
    grid.append(card);
  });

}

/* ---------- editor ---------- */

async function openEditor(sketch) {
  const requestId = ++selectionRequest;
  current = null;
  gallery.hidden = true;
  editor.classList.add("is-open");
  document.title = `${sketch.name} · p5`;
  title.textContent = sketch.name;
  openOriginal.href = `https://editor.p5js.org/matbutom/sketches/${sketch.id}`;
  textarea.value = "";
  textarea.disabled = true;
  runButton.disabled = true;
  resetButton.disabled = true;
  codeLabel.textContent = "sketch.js";
  renderLabel.textContent = "canvas";
  updateLineNumbers();
  stopSketch();
  setEditorStatus("Cargando código…");
  setRenderMessage("Cargando canvas…");
  window.scrollTo(0, 0);

  try {
    const [original, indexHtml] = await Promise.all([
      getText(`${sketchDir(sketch)}/sketch.js`),
      getText(`${sketchDir(sketch)}/index.html`)
    ]);
    if (requestId !== selectionRequest) return;
    current = { sketch, original, indexHtml };
    textarea.value = original;
    textarea.disabled = false;
    runButton.disabled = false;
    updateLineNumbers();
    updateDirtyState();
    const exportedDate = formatDate(sketch.updatedAt);
    setEditorStatus(`Código de ${sketch.name}${exportedDate ? ` (exportado ${exportedDate})` : ""}. Edita y pulsa ejecutar (⌘/Ctrl + Enter).`);
    runSketch(original, "original");
  } catch (error) {
    if (requestId !== selectionRequest) return;
    setEditorStatus(`No pude cargar el código de este sketch: ${error.message}.`, true);
    setRenderMessage("Sin código no hay canvas que mostrar.", true);
  }
}

function closeEditor() {
  selectionRequest++;
  current = null;
  stopSketch();
  editor.classList.remove("is-open");
  gallery.hidden = false;
  document.title = "mateoArce_mam";
}

function routeFromHash() {
  const slug = decodeURIComponent(location.hash.slice(1));
  const index = sketches.findIndex((sketch) => sketch.slug === slug);
  if (index === -1) {
    if (editor.classList.contains("is-open")) closeEditor();
    return;
  }
  if (current?.sketch.slug !== slug) openEditor(sketches[index]);
}

function goBack() {
  if (history.state?.slug) history.back();
  else {
    history.replaceState(null, "", location.pathname + location.search);
    closeEditor();
  }
}

function formatDate(iso) {
  return iso ? new Date(iso).toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" }) : "";
}

function updateLineNumbers() {
  const lineCount = textarea.value.split("\n").length;
  numbers.textContent = Array.from({ length: lineCount }, (_, index) => index + 1).join("\n");
  numbers.scrollTop = textarea.scrollTop;
}

function updateDirtyState() {
  const dirty = Boolean(current) && textarea.value !== current.original;
  codeLabel.textContent = dirty ? "sketch.js · editado" : "sketch.js";
  resetButton.disabled = !dirty;
}

/* ---------- render ---------- */

// Construye la página del sketch a partir de su index.html exportado: misma
// versión de p5, mismo CSS y mismos recursos (resueltos con <base>), pero con
// sketch.js reemplazado por el código del editor.
function buildDocument(indexHtml, codeUrl, id) {
  const base = new URL(`${sketchDir(current.sketch)}/`, location.href).href;
  const injected =
    `<base href="${base}">` +
    `<style>html,body{overflow:hidden}</style>` +
    `<script>(${frameReporter.toString()})(${id});<\/script>`;
  const sketchTag = /<script\b[^>]*\bsrc=["']?(?:\.\/)?sketch\.js["']?[^>]*>\s*<\/script>/i;
  if (!sketchTag.test(indexHtml)) throw new Error("index.html no incluye sketch.js");
  const withCode = indexHtml.replace(sketchTag, `<script src="${codeUrl}"><\/script>`);
  return /<head[^>]*>/i.test(withCode)
    ? withCode.replace(/<head[^>]*>/i, (head) => head + injected)
    : injected + withCode;
}

// Corre dentro del iframe: avisa a esta página de errores de ejecución, de
// recursos que no cargaron y de los mensajes amigables de p5 (🌸). Iframe y
// página comparten origen, así que se llama directo a la función del padre
// (sin postMessage).
function frameReporter(id) {
  const report = (detail) => {
    try {
      parent.p5GalleryReport(id, detail);
    } catch {}
  };
  // Línea dentro de sketch.js (el código corre desde una URL blob:).
  const lineOf = (error, event) => {
    if (event && event.filename && event.filename.startsWith("blob:")) return event.lineno;
    const match = error && error.stack && /blob:[^)\s]+:(\d+):\d+/.exec(error.stack);
    return match ? Number(match[1]) : 0;
  };
  addEventListener(
    "error",
    (event) => {
      const target = event.target;
      if (target && target !== window) {
        report({ message: `no cargó ${target.src || target.href}` });
      } else {
        report({ message: event.message, line: lineOf(event.error, event) });
      }
    },
    true
  );
  addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    report({ message: (reason && reason.message) || String(reason), line: lineOf(reason) });
  });
  for (const method of ["log", "warn", "error"]) {
    const original = console[method];
    console[method] = function (...args) {
      if (typeof args[0] === "string" && args[0].startsWith("🌸")) {
        report({ message: args[0].replace(/^🌸\s*/, "").split("\n")[0], friendly: true });
      }
      return original.apply(this, args);
    };
  }
}

let runHadError = false;

window.p5GalleryReport = (id, detail) => {
  if (id !== runId || !current) return;
  runHadError = true;
  const where = detail.line ? ` (línea ${detail.line})` : "";
  setEditorStatus(`${detail.friendly ? "p5.js" : "Error en el sketch"}${where}: ${detail.message}`, true);
  if (!stage.querySelector("iframe")?.classList.contains("is-ready")) {
    setRenderMessage(`El sketch no pudo dibujar el canvas.\n${detail.message}`, true);
  }
};

function stopSketch() {
  runId++;
  stageWatch?.stop();
  stageWatch = null;
  stage.querySelectorAll("iframe").forEach((frame) => frame.remove());
}

function runSketch(code, mode) {
  if (!current) return;
  stopSketch();
  runHadError = false;
  const id = runId;
  const codeUrl = URL.createObjectURL(new Blob([code], { type: "text/javascript" }));
  let html;
  try {
    html = buildDocument(current.indexHtml, codeUrl, id);
  } catch (error) {
    URL.revokeObjectURL(codeUrl);
    setRenderMessage(error.message, true);
    return;
  }

  // Un iframe nuevo por ejecución: el sketch anterior (y su contexto WebGL)
  // se descarta por completo.
  const frame = document.createElement("iframe");
  frame.title = `Canvas de ${current.sketch.name}`;
  frame.srcdoc = html;
  stage.append(frame);
  renderLabel.textContent = mode === "original" ? "canvas · original" : "canvas · tu versión";
  setRenderMessage("Cargando canvas…");
  if (mode !== "original") setEditorStatus("Ejecutando tu versión…");

  stageWatch = watchFrame(frame, id, () => {
    URL.revokeObjectURL(codeUrl);
    if (mode !== "original" && !runHadError) setEditorStatus("Tu versión está corriendo. “Original” restaura el código exportado.");
  });
}

// Espera el canvas de p5, mide todo lo que dibuja el sketch (canvas y
// controles DOM) y escala el iframe entero para que quepa sin recortes ni
// deformación. Al escalar el iframe, las coordenadas del mouse dentro del
// sketch siguen siendo las originales.
function watchFrame(frame, id, onReady) {
  let timer = 0;
  let observer = null;
  let ready = false;
  const started = performance.now();

  const fit = () => {
    const doc = frame.contentDocument;
    if (!doc?.body) return false;
    let width = 0;
    let height = 0;
    for (const element of doc.body.querySelectorAll("*")) {
      if (element.matches("script, style, link")) continue;
      const rect = element.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) continue;
      width = Math.max(width, rect.right);
      height = Math.max(height, rect.bottom);
    }
    if (!width || !height) return false;
    width = Math.ceil(width);
    height = Math.ceil(height);
    const scale = Math.min(stage.clientWidth / width, stage.clientHeight / height);
    frame.style.width = `${width}px`;
    frame.style.height = `${height}px`;
    frame.style.transform =
      `translate(${(stage.clientWidth - width * scale) / 2}px, ${(stage.clientHeight - height * scale) / 2}px) ` +
      `scale(${scale})`;
    return true;
  };

  const poll = () => {
    if (id !== runId) return;
    const canvas = frame.contentDocument?.querySelector("#defaultCanvas0, canvas.p5Canvas");
    if (canvas && fit()) {
      ready = true;
      frame.classList.add("is-ready");
      setRenderMessage("");
      observer = new MutationObserver(() => requestAnimationFrame(fit));
      observer.observe(frame.contentDocument.body, { childList: true, subtree: true, attributes: true });
      onReady();
      return;
    }
    if (performance.now() - started > 20000) {
      setRenderMessage("El sketch no creó un canvas después de 20 s.", true);
      return;
    }
    timer = setTimeout(poll, 150);
  };

  const resize = new ResizeObserver(() => ready && fit());
  resize.observe(stage);
  frame.addEventListener("load", poll, { once: true });

  return {
    stop() {
      clearTimeout(timer);
      observer?.disconnect();
      resize.disconnect();
    }
  };
}

/* ---------- eventos ---------- */

textarea.addEventListener("input", () => {
  updateLineNumbers();
  updateDirtyState();
});
textarea.addEventListener("scroll", () => {
  numbers.scrollTop = textarea.scrollTop;
});
textarea.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    textarea.setRangeText("  ", textarea.selectionStart, textarea.selectionEnd, "end");
    updateLineNumbers();
    updateDirtyState();
  }
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    runButton.click();
  }
});
runButton.addEventListener("click", () => {
  if (!current || !textarea.value.trim()) return;
  runSketch(textarea.value, textarea.value === current.original ? "original" : "edited");
});
resetButton.addEventListener("click", () => {
  if (!current) return;
  textarea.value = current.original;
  updateLineNumbers();
  updateDirtyState();
  runSketch(current.original, "original");
  setEditorStatus("Código original restaurado.");
});
document.querySelector("#editor-back").addEventListener("click", goBack);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && editor.classList.contains("is-open") && document.activeElement !== textarea) goBack();
});
window.addEventListener("popstate", routeFromHash);

loadSketches();
