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
const [_header, ...rows] = lines;

const businesses = rows.map(line => {
  const [name, category, address, phone] = parseCsvLine(line);
  if (!name || !category) return null;
  return {
    name,
    slug: toSlug(name),
    category,
    address: address ? address + ', Staten Island, NY' : '',
    phone: phone || '',
    website: '',
    lat: null,
    lng: null,
    image: '',
    notes: ''
  };
}).filter(Boolean);

fs.writeFileSync(outPath, JSON.stringify(businesses, null, 2) + '\n');
console.log('Wrote ' + businesses.length + ' businesses to ' + outPath);
console.log('Categories: ' + [...new Set(businesses.map(b => b.category))].sort().join(', '));
