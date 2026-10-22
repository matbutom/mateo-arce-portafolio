#!/usr/bin/env node
// Genera un preview estático (preview.jpg) para cada sketch exportado.
//
// Corre cada sketch localmente en Chromium headless, espera a que dibuje y
// captura solo el canvas. Así la galería muestra imágenes en vez de ejecutar
// 13 sketches a la vez.
//
// Requiere Playwright: npm i -g playwright && npx playwright install chromium
// Uso: node scripts/capture-p5-previews.mjs            (solo los que no tienen preview)
//      node scripts/capture-p5-previews.mjs --all      (todos)
//      node scripts/capture-p5-previews.mjs slug ...   (los indicados)

import { createServer } from "node:http";
import { access, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKETCHES = join(ROOT, "assets", "p5-sketches");
const WAIT_MS = 3000;

// Busca Playwright en PLAYWRIGHT_PATH, en el proyecto o en la instalación global.
function loadPlaywright() {
  const require = createRequire(import.meta.url);
  const candidates = [
    process.env.PLAYWRIGHT_PATH,
    "playwright",
    join(execSync("npm root -g").toString().trim(), "playwright")
  ].filter(Boolean);
  for (const candidate of candidates) {
    try {
      return require(candidate);
    } catch {}
  }
  throw new Error("No encontré Playwright. Instálalo o define PLAYWRIGHT_PATH=/ruta/a/node_modules/playwright");
}

// ¿El canvas 2D sigue de un solo color? (sketches que esperan al mouse)
function isBlank(canvas) {
  return canvas.evaluate((source) => {
    if (!(window.drawingContext instanceof CanvasRenderingContext2D)) return false;
    const probe = document.createElement("canvas");
    probe.width = probe.height = 64;
    const context = probe.getContext("2d");
    context.drawImage(source, 0, 0, 64, 64);
    const data = context.getImageData(0, 0, 64, 64).data;
    for (let i = 4; i < data.length; i++) if (data[i] !== data[i % 4]) return false;
    return true;
  });
}

// Algunos sketches solo dibujan al arrastrar o mover el mouse: recorremos una
// curva en S primero arrastrando y luego solo moviendo, igual que una persona.
async function interact(page, box) {
  const point = (t) => [
    box.x + box.width * (0.15 + 0.7 * t),
    box.y + box.height * (0.5 + 0.28 * Math.sin(t * Math.PI * 2))
  ];
  await page.mouse.move(...point(0));
  await page.mouse.down();
  for (let i = 1; i <= 40; i++) await page.mouse.move(...point(i / 40), { steps: 2 });
  await page.mouse.up();
  for (let i = 40; i >= 0; i--) await page.mouse.move(...point(i / 40).map((v, k) => v + (k ? 40 : 0)), { steps: 2 });
}

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".ttf": "font/ttf",
  ".stl": "model/stl"
};

const server = createServer(async (request, response) => {
  const path = normalize(decodeURIComponent(new URL(request.url, "http://x").pathname));
  try {
    const body = await readFile(join(ROOT, path));
    response.writeHead(200, { "Content-Type": types[extname(path)] || "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404).end();
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;

const { chromium } = loadPlaywright();
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const manifest = JSON.parse(await readFile(join(SKETCHES, "sketches.json"), "utf8"));
const args = process.argv.slice(2);
const captureAll = args.includes("--all");
const only = args.filter((arg) => !arg.startsWith("--"));
const hasPreview = (sketch) =>
  access(join(SKETCHES, sketch.slug, "preview.jpg")).then(() => true, () => false);
let failures = 0;

for (const sketch of manifest.sketches) {
  if (only.length ? !only.includes(sketch.slug) : !captureAll && (await hasPreview(sketch))) continue;
  const page = await browser.newPage({ viewport: { width: 420, height: 420 }, deviceScaleFactor: 2 });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  try {
    await page.goto(`${origin}/assets/p5-sketches/${sketch.slug}/index.html`, { waitUntil: "networkidle" });
    // El canvas principal es el canvas p5 visible (createGraphics y WEBGL
    // crean otros ocultos).
    const canvas = await page.waitForSelector("canvas.p5Canvas:visible", { timeout: 20000 });
    await page.waitForTimeout(WAIT_MS);
    if (await isBlank(canvas)) {
      await interact(page, await canvas.boundingBox());
      await page.waitForTimeout(1000);
    }
    if (errors.length) throw new Error(errors.join(" | "));
    await canvas.screenshot({ path: join(SKETCHES, sketch.slug, "preview.jpg"), type: "jpeg", quality: 86 });
    console.log(`✓ ${sketch.name}`);
  } catch (error) {
    failures++;
    console.error(`✗ ${sketch.name}: ${error.message}`);
  }
  await page.close();
}

await browser.close();
server.close();
process.exitCode = failures ? 1 : 0;
