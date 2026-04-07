#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const csvPath = process.argv[2] || path.join(__dirname, '../../../Downloads/forest_ave_bid_businesses.csv');
const outPath = path.join(__dirname, '../content/businesses.json');

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[''`]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function parseCsvLine(line) {
  const fields = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { inQ = !inQ; continue; }
    if (ch === ',' && !inQ) { fields.push(cur.trim()); cur = ''; continue; }
    cur += ch;
  }
  fields.push(cur.trim());
  return fields;
}

const raw = fs.readFileSync(csvPath, 'utf-8');
const lines = raw.split('\n').filter(Boolean);
const headerIndex = lines.findIndex((line) =>
  line.toLowerCase().includes("organization name,business type")
);
const rows = headerIndex >= 0 ? lines.slice(headerIndex + 1) : lines.slice(1);

function normalizeWebsite(website) {
  if (!website || website.toLowerCase() === "n/a") return "";
  if (/^https?:\/\//i.test(website)) return website;
  return `https://${website}`;
}

function imageFromCsv(imageValue, websiteValue) {
  const image = (imageValue || "").trim();
  const website = (websiteValue || "").trim();

  // Keep direct image URLs if they are explicitly present.
  if (/^https?:\/\/\S+\.(jpg|jpeg|png|webp|gif|svg)(\?\S*)?$/i.test(image)) {
    return image;
  }

  // Most rows include website links. Use domain logo URL as image source.
  if (website && website.toLowerCase() !== "n/a") {
    try {
      const host = new URL(normalizeWebsite(website)).hostname.replace(/^www\./i, "");
      if (host) return `https://logo.clearbit.com/${host}`;
    } catch {
      // Ignore malformed website values.
    }
  }

  return "";
}

const businesses = rows.map(line => {
  const [name, category, address, phone, website, image] = parseCsvLine(line);
  if (!name || !category) return null;
  const normalizedWebsite = normalizeWebsite((website || "").trim());
  return {
    name,
    slug: toSlug(name),
    category,
    address: address ? address + ', Staten Island, NY' : '',
    phone: phone || '',
    website: normalizedWebsite,
    lat: null,
    lng: null,
    image: imageFromCsv((image || "").trim(), normalizedWebsite),
    notes: ''
  };
}).filter(Boolean);

fs.writeFileSync(outPath, JSON.stringify(businesses, null, 2) + '\n');
console.log('Wrote ' + businesses.length + ' businesses to ' + outPath);
console.log('Categories: ' + [...new Set(businesses.map(b => b.category))].sort().join(', '));
