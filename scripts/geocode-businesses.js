#!/usr/bin/env node
/**
 * scripts/geocode-businesses.js
 *
 * Geocodes businesses in content/businesses.json that are missing lat/lng,
 * using the free Nominatim API (OpenStreetMap). No API key required.
 *
 * Usage:
 *   node scripts/geocode-businesses.js
 *
 * Nominatim usage policy: max 1 request per second, must include User-Agent.
 * https://operations.osmfoundation.org/policies/nominatim/
 *
 * Results are written back to content/businesses.json in-place.
 * Run again anytime — already-geocoded entries are skipped.
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const BUSINESSES_PATH = path.join(
  __dirname,
  "..",
  "content",
  "businesses.json"
);

const USER_AGENT = "ForestAveBID/1.0 (forestavenuebid.com)";
const DELAY_MS = 1100; // > 1 second between requests per Nominatim ToS

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function geocode(address) {
  return new Promise((resolve, reject) => {
    const encoded = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`;
    const options = {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "application/json",
      },
    };
    https
      .get(url, options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const results = JSON.parse(data);
            if (results.length > 0) {
              resolve({
                lat: parseFloat(results[0].lat),
                lng: parseFloat(results[0].lon),
              });
            } else {
              resolve(null);
            }
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", reject);
  });
}

async function main() {
  const businesses = JSON.parse(fs.readFileSync(BUSINESSES_PATH, "utf8"));
  const todo = businesses.filter(
    (b) => b.lat == null || b.lng == null
  );

  if (todo.length === 0) {
    console.log("All businesses already have coordinates. Nothing to do.");
    return;
  }

  console.log(
    `Geocoding ${todo.length} businesses (${
      businesses.length - todo.length
    } already done)…`
  );
  console.log("Rate limit: 1 request per second (Nominatim policy)\n");

  let success = 0;
  let failed = 0;

  for (const b of todo) {
    const query = b.address || `${b.name}, Forest Avenue, Staten Island, NY`;
    process.stdout.write(`  ${b.name}…`);

    try {
      const coords = await geocode(query);
      if (coords) {
        b.lat = coords.lat;
        b.lng = coords.lng;
        process.stdout.write(` ✓ ${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}\n`);
        success++;
      } else {
        process.stdout.write(" — not found\n");
        failed++;
      }
    } catch (err) {
      process.stdout.write(` ✗ error: ${err.message}\n`);
      failed++;
    }

    // Write after each entry so progress is saved if interrupted
    fs.writeFileSync(BUSINESSES_PATH, JSON.stringify(businesses, null, 2));

    await sleep(DELAY_MS);
  }

  console.log(`\nDone. ${success} geocoded, ${failed} not found.`);
  console.log(`Written to ${BUSINESSES_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
