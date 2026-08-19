/**
 * Image manifest — all placeholder paths centralised here.
 * Swap any path for a real URL/path when assets are available;
 * every component that references images imports from this file.
 *
 * Files in /public/placeholders/ do NOT exist yet.
 * Components must fall back gracefully (CSS gradient/colour) when the image 404s.
 */

export const imageManifest = {
  /** Single wood-texture image used as the hero/header background on every page. */
  siteHeaderImage: "/textures/wood.png",
  siteLogo: "/icon.jpg",
  eventsMuralHero: "/photos/uploads/Resized_20260414_114601.JPEG",

  heroSides: {
    left: "/photos/uploads/1000002847.jpg",
    right: "/photos/uploads/Resized_20260414_120232.JPEG",
  } as const,

  headerMurals: {
    home: "/photos/uploads/1000002847.jpg",
    about: "/photos/uploads/Resized_20260414_114649.JPEG",
    services: "/photos/uploads/1000002837.jpg",
    contact: "/photos/uploads/Resized_20260414_120232.JPEG",
    team: "/photos/uploads/1000002838.jpg",
    businesses: "/photos/uploads/1000002845.jpg",
    map: "/photos/uploads/Resized_20260414_123207.JPEG",
    events: "/photos/uploads/Resized_20260414_114601.JPEG",
  } as const,

  // Legacy per-page hero keys kept for reference (all pages now use siteHeaderImage via woodTexture prop)
  homeHero:        "/placeholders/hero-home.jpg",
  businessesHero:  "/placeholders/hero-businesses.jpg",
  mapHero:         "/placeholders/hero-map.jpg",
  eventsHero:      "/placeholders/hero-events.jpg",
  aboutHero:       "/placeholders/hero-about.jpg",
  contactHero:     "/placeholders/hero-contact.jpg",
  servicesHero:    "/placeholders/hero-services.jpg",

  categoryImages: {
    "Food & Drink":          "/placeholders/cat-food-drink.jpg",
    "Medical":               "/placeholders/cat-medical.jpg",
    "Neighborhood Amenities":"/placeholders/cat-neighborhood.jpg",
    "Religious Institution": "/placeholders/cat-religious.jpg",
    "Services":              "/placeholders/cat-services.jpg",
    "Shopping":              "/placeholders/cat-shopping.jpg",
  } as Record<string, string>,

  homeCards: [
    "/photos/uploads/1000002837.jpg",
    "/photos/uploads/1000002846.jpg",
    "/photos/uploads/1000002838.jpg",
  ],

  eventThumbnail: "/photos/uploads/1000002846.jpg",
  fallback:       "/photos/business-storefront-placeholder.svg",

  services: {
    "small-business": "/photos/uploads/1000002837.jpg",
    "revitalization": "/photos/uploads/1000002846.jpg",
    "community": "/photos/uploads/1000002838.jpg",
  } as Record<string, string>,

  teamHero:            "/placeholders/hero-team.jpg",
  teamMemberFallback:  "/photos/nina-placeholder.svg",
  cityOfficialLogo:    "/logos/nyc-official.svg",

  /** Partner/organization logos */
  logos: {
    forestAveBid: "/logos/forest-ave-bid.svg",
    siboc: "/logos/siboc.svg",
  } as const,

  /** About page content images */
  aboutMissionImage:   "/photos/uploads/Resized_20260414_114649.JPEG",
  aboutOperateImage:   "/photos/uploads/Resized_20260414_120232.JPEG",
} as const;
