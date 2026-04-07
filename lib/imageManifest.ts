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
  siteLogo: "https://forestavenuebid.com/wp-content/uploads/2024/02/cropped-cropped-FABID-New-Logo-300x147.jpg",
  eventsMuralHero: "https://lh3.googleusercontent.com/p/AF1QipM_9i5ctygf63bw9ek66uNP1LEL2IcNRvImM5A7=s1360-w1360-h1020-rw",

  heroSides: {
    left: "https://forestavenuebid.com/wp-content/uploads/2024/02/Girl-Scout-Troop-5184-caroling-at-Pastosas-1024x768.jpg",
    right: "https://forestavenuebid.com/wp-content/uploads/2024/02/Gifted-1024x768.jpg",
  } as const,

  headerMurals: {
    home: "https://forestavenuebid.com/wp-content/uploads/2024/02/Forest-Ave-Planter-Volunteers-4.30.2016-1-scaled.jpg",
    about: "https://forestavenuebid.com/wp-content/uploads/2024/02/BID-Meeting.jpg",
    services: "https://forestavenuebid.com/wp-content/uploads/2024/02/Forest-Ave-Planter-Volunteers-Jeans-Fine-Wines-4.30.2016-1024x613.jpg",
    contact: "https://forestavenuebid.com/wp-content/uploads/2024/02/Gifted-1024x768.jpg",
    team: "https://forestavenuebid.com/wp-content/uploads/2024/02/Girl-Scout-Troop-5184-caroling-at-Pastosas-1024x768.jpg",
    businesses: "https://forestavenuebid.com/wp-content/uploads/2024/02/Forest-Ave-Planter-Volunteers-4.30.2016-1-scaled.jpg",
    map: "https://lh3.googleusercontent.com/p/AF1QipM_9i5ctygf63bw9ek66uNP1LEL2IcNRvImM5A7=s1360-w1360-h1020-rw",
    events: "https://lh3.googleusercontent.com/p/AF1QipM_9i5ctygf63bw9ek66uNP1LEL2IcNRvImM5A7=s1360-w1360-h1020-rw",
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
    "https://forestavenuebid.com/wp-content/uploads/2024/02/Pastosa-Mozzarella-making-class.jpg",
    "https://forestavenuebid.com/wp-content/uploads/2024/02/BID-Meeting.jpg",
    "https://forestavenuebid.com/wp-content/uploads/2024/02/Forest-Ave-Planter-Volunteers-4.30.2016-1-scaled.jpg",
  ],

  eventThumbnail: "/placeholders/event-thumbnail.jpg",
  fallback:       "/placeholders/fallback.jpg",

  services: {
    "small-business": "https://forestavenuebid.com/wp-content/uploads/2024/02/Gifted-1024x768.jpg",
    "revitalization": "https://forestavenuebid.com/wp-content/uploads/2024/02/Forest-Ave-Planter-Volunteers-Jeans-Fine-Wines-4.30.2016-1024x613.jpg",
    "community": "https://forestavenuebid.com/wp-content/uploads/2024/02/Girl-Scout-Troop-5184-caroling-at-Pastosas-1024x768.jpg",
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
  aboutMissionImage:   "/placeholders/about-mission.jpg",
  aboutOperateImage:   "/placeholders/about-operate.jpg",
} as const;
