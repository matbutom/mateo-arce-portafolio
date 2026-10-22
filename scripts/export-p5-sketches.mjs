#!/usr/bin/env node
// Exporta los sketches públicos mateoArce_mam_* del editor de p5.js al sitio.
//
// El navegador no puede leer la API del editor por CORS, así que este script
// corre en Node (sin restricciones de CORS) y deja una copia local de cada
// proyecto: index.html, sketch.js, style.css y sus assets binarios.
//
// Uso: node scripts/export-p5-sketches.mjs
// Vuelve a correrlo cada vez que actualices un sketch en editor.p5js.org,
// y luego genera los previews que falten con: node scripts/capture-p5-previews.mjs
// Los previews de sketches que no cambiaron (mismo id y updatedAt) se conservan.

import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const USER = "matbutom";
const PREFIX = "mateoArce_mam_";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "assets", "p5-sketches");

function slugify(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function getJSON(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} → HTTP ${response.status}`);
  return response.json();
}

async function getBuffer(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} → HTTP ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

// Reconstruye las rutas a partir del árbol de archivos del proyecto.
function filePaths(files) {
  const byId = new Map(files.map((file) => [file._id, file]));
  const root = files.find((file) => file.name === "root");
  const paths = [];
  const walk = (folder, prefix) => {
    for (const childId of folder.children || []) {
      const child = byId.get(childId);
      if (!child) continue;
      const path = prefix + child.name;
      if (child.fileType === "folder") walk(child, path + "/");
      else paths.push({ path, file: child });
    }
  };
  walk(root, "");
  return paths;
}

const { projects } = await getJSON(`https://editor.p5js.org/editor/${USER}/projects`);
const sketches = projects
  .filter((project) => project.name.startsWith(PREFIX) && project.visibility === "Public")
  .sort((a, b) => b.name.localeCompare(a.name));

// Previews existentes de sketches sin cambios, para no tener que recapturarlos.
const keptPreviews = new Map();
try {
  const previous = JSON.parse(await readFile(join(OUT, "sketches.json"), "utf8"));
  for (const old of previous.sketches) {
    const project = sketches.find((item) => item._id === old.id && item.updatedAt === old.updatedAt);
    if (!project) continue;
    try {
      keptPreviews.set(project._id, await readFile(join(OUT, old.slug, "preview.jpg")));
    } catch {}
  }
} catch {}

await rm(OUT, { recursive: true, force: true });
const manifest = [];

for (const project of sketches) {
  const slug = slugify(project.name);
  const dir = join(OUT, slug);
  const written = [];

  for (const { path, file } of filePaths(project.files)) {
    const target = join(dir, path);
    await mkdir(dirname(target), { recursive: true });
    if (file.url) {
      await writeFile(target, await getBuffer(file.url));
    } else {
      await writeFile(target, file.content ?? "");
    }
    written.push(path);
  }

  if (!written.includes("sketch.js") || !written.includes("index.html")) {
    throw new Error(`${project.name}: falta sketch.js o index.html`);
  }
  const preview = keptPreviews.get(project._id);
  if (preview) await writeFile(join(dir, "preview.jpg"), preview);

  manifest.push({
    name: project.name,
    id: project._id,
    slug,
    updatedAt: project.updatedAt,
    files: written
  });
  console.log(`✓ ${project.name} (${written.length} archivos${preview ? ", preview conservado" : ", sin preview"})`);
}

await writeFile(
  join(OUT, "sketches.json"),
  JSON.stringify({ user: USER, exportedAt: new Date().toISOString(), sketches: manifest }, null, 2) + "\n"
);
console.log(`\n${manifest.length} sketches exportados en assets/p5-sketches/`);
