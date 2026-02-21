# Business Directory Import Pipeline

## Background

The full Forest Avenue BID business directory (~153 businesses) is published as a
Canva presentation embedded on https://forestavenuebid.com/our-businesses/ and cannot
be programmatically scraped. This document explains how to import it into
`content/businesses.json`.

## Step 1 — Export the Canva directory as PDF

1. Open the Canva embed from the BID's businesses page (forestavenuebid.com/our-businesses/).
2. In Canva, click **Share → Download → PDF (standard)**.
3. Save the file as `scripts/source/fabid-businesses.pdf`.

There are two embeds:
- **"Automotive"** — automotive businesses only
- **"Forest Avenue BID Businesses"** — full general directory

Download both. Combine or process them separately.

## Step 2 — Run the extraction script

```bash
npx ts-node scripts/parse-canva-directory.ts
```

This script (see `parse-canva-directory.ts`) reads the PDF, extracts text
per page/slide, and outputs structured JSON to stdout which you can redirect:

```bash
npx ts-node scripts/parse-canva-directory.ts > content/businesses-raw.json
```

## Step 3 — Review and merge

1. Open `content/businesses-raw.json` and spot-check at least 10 random entries
   against the Canva PDF.
2. Ensure each entry has at minimum: `name`, `category`.
3. Remove any entries that are headers, decorative text, or duplicates.
4. Move the reviewed file to `content/businesses.json`, replacing the current
   partial list.

## Step 4 — Verify counts

The official page shows **153 businesses**. After import, run:

```bash
node -e "const b=require('./content/businesses.json'); console.log(b.length)"
```

The count should be close to 153.

## Data model

Each business entry follows this TypeScript interface (see `lib/types.ts`):

```ts
interface Business {
  name: string;       // required — from directory
  slug: string;       // required — auto-generated from name (kebab-case)
  category: string;   // required — from directory slide heading/grouping
  address?: string;   // only if listed in directory
  phone?: string;     // only if listed in directory
  website?: string;   // only if listed in directory
  description?: string; // only if listed in directory; do NOT invent
}
```

**Do not invent, assume, or look up any fields not present in the official Canva export.**

## Current status

`content/businesses.json` currently contains **12 confirmed businesses** sourced
from these real site pages:
- forestavenuebid.com/team/ (board member business affiliations)
- forestavenuebid.com/spring-stroll-2024/ (participating businesses list)
- forestavenuebid.com/the-forest-ave-bid-20th-anniversary-gala/ (venue)

These 12 should remain after the full import (merged/deduplicated).
