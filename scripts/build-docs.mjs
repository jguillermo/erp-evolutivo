#!/usr/bin/env node
// ────────────────────────────────────────────────────────────────────────────
// build-docs.mjs — convierte data/*.json en un único MD humano-legible.
// Camina el shape conocido (canvas, pestel) y degrada con elegancia para
// JSONs nuevos: emite los campos top-level reconocidos y deja pasar el resto.
//
// El output va a public/ por defecto — Angular lo expone como asset estático,
// disponible tanto en `ng serve` (dev) como copiado al dist en `ng build`.
// Encadenado vía los npm hooks `prestart` y `prebuild` en package.json para
// que se regenere automáticamente.
//
// Uso:
//   node scripts/build-docs.mjs [output-dir]
//
//   output-dir → directorio donde se deja erp-evolutivo.md
//                (default: ./public relativo al repo)
// ────────────────────────────────────────────────────────────────────────────

import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR  = resolve(REPO_ROOT, 'data');
const OUT_DIR   = resolve(REPO_ROOT, process.argv[2] ?? 'public');
const OUT_FILE  = join(OUT_DIR, 'erp-evolutivo.md');

// ── Helpers ────────────────────────────────────────────────────────────────

const escapeMd = (s) => String(s).replace(/</g, '&lt;');

function renderItem(item) {
  if (typeof item === 'string') return item;
  if (item == null) return '';
  if (typeof item !== 'object') return String(item);

  const parts = [];
  if (item.tag)   parts.push(`\`${item.tag}\``);
  if (item.label) parts.push(`**${item.label}:**`);
  if (item.text)  parts.push(item.text);
  if (parts.length) return parts.join(' ');
  return JSON.stringify(item);
}

function renderList(items, prefix = '- ') {
  return items.map((it) => prefix + renderItem(it)).join('\n');
}

// ── Bloques tipados (pestel y similares) ───────────────────────────────────

function renderBlock(block) {
  if (!block || typeof block !== 'object') return String(block);
  switch (block.type) {
    case 'paragraph':
      return block.text;
    case 'list': {
      const head = block.label ? `_${block.label}:_\n\n` : '';
      return head + renderList(block.items);
    }
    case 'note':
      return `> **Nota.** ${block.text}`;
    case 'info':
      return `> ℹ️ ${block.text}`;
    case 'implication':
      return `> **${block.title}**\n>\n> ${block.text}`;
    default:
      return '```json\n' + JSON.stringify(block, null, 2) + '\n```';
  }
}

// ── Una sección dentro de un documento ─────────────────────────────────────

function renderSection(section) {
  const out = [];
  const heading = [section.emoji, section.title].filter(Boolean).join(' ');
  if (heading) out.push(`### ${heading}`);
  if (section.question) out.push(`*${section.question}*`);

  // Bloques tipados (pestel)
  if (Array.isArray(section.blocks)) {
    for (const b of section.blocks) out.push(renderBlock(b));
    return out.join('\n\n');
  }

  // Campos heterogéneos (canvas)
  if (section.valueStatement) out.push(`> ${section.valueStatement}`);
  if (section.meta)           out.push(`*${section.meta}*`);

  if (Array.isArray(section.comparisons) && section.comparisons.length) {
    out.push('**Comparaciones**');
    out.push(section.comparisons.map((c) => `- **vs. ${c.competitor}:** ${c.text}`).join('\n'));
  }

  if (section.gameMechanic) {
    out.push(`**${section.gameMechanic.title}**`);
    out.push(section.gameMechanic.text);
  }

  if (section.entryModule) {
    out.push(`**${section.entryModule.title}**`);
    out.push(`- ${section.entryModule.primary}`);
    out.push(`- ${section.entryModule.secondary}`);
  }

  if (section.beachhead) {
    const b = section.beachhead;
    out.push(`**\`${b.badge}\` ${b.label}**`);
    if (b.description) out.push(b.description);
    if (Array.isArray(b.items)) out.push(renderList(b.items));
  }

  if (Array.isArray(section.tiers)) {
    for (const tier of section.tiers) {
      out.push(`**\`${tier.badge}\`** ${tier.description}`);
      if (Array.isArray(tier.items)) out.push(renderList(tier.items));
    }
  }

  if (Array.isArray(section.items)) {
    out.push(renderList(section.items));
  }

  if (section.note) out.push(`> ${section.note}`);

  return out.join('\n\n');
}

// ── Síntesis ejecutiva (pestel) ────────────────────────────────────────────

function renderSynthesis(s) {
  const out = [];
  if (s.title)   out.push(`### ${s.title}`);
  if (s.lead)    out.push(s.lead);
  if (Array.isArray(s.items)) out.push(renderList(s.items));
  if (s.closing) out.push(s.closing);
  return out.join('\n\n');
}

// ── Un documento completo (un JSON) ────────────────────────────────────────

function renderDocument(data) {
  const out = [];
  if (data.title)    out.push(`## ${data.title}`);
  if (data.subtitle) out.push(`*${data.subtitle}*`);
  if (data.backLink) out.push(`[${data.backLink.label}](${data.backLink.route})`);
  if (data.intro)    out.push(`> ${data.intro}`);

  // Colección principal — primer array de objetos top-level.
  const collectionKey = ['cards', 'factors', 'sections'].find(
    (k) => Array.isArray(data[k]) && data[k].length && typeof data[k][0] === 'object'
  );
  if (collectionKey) {
    for (const section of data[collectionKey]) out.push(renderSection(section));
  }

  if (data.synthesis) out.push(renderSynthesis(data.synthesis));

  return out.join('\n\n');
}

// ── Main ───────────────────────────────────────────────────────────────────

const files = readdirSync(DATA_DIR)
  .filter((f) => f.endsWith('.json'))
  .sort();

if (!files.length) {
  console.error(`✗ no hay archivos JSON en ${DATA_DIR}`);
  process.exit(1);
}

const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
const header =
  `# ERP Evolutivo — Documentación\n\n` +
  `> Documento generado automáticamente desde \`data/*.json\` el ${timestamp}.\n` +
  `> Fuente: ${files.length} archivo(s) JSON convertido(s) por \`scripts/build-docs.mjs\`.\n`;

const sections = files.map((f) => {
  const raw = readFileSync(join(DATA_DIR, f), 'utf8');
  const data = JSON.parse(raw);
  return `---\n\n${renderDocument(data)}`;
});

mkdirSync(OUT_DIR, { recursive: true });
const body = header + '\n' + sections.join('\n\n') + '\n';
writeFileSync(OUT_FILE, escapeMd(body));
writeFileSync(join(OUT_DIR, '.nojekyll'), '');

const bytes = body.length;
console.error(`✓ ${OUT_FILE} (${files.length} JSON → ${bytes} bytes)`);
