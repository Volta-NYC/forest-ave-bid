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
    "/placeholders/card-small-business.jpg",
    "/placeholders/card-revitalization.jpg",
    "/placeholders/card-events.jpg",
  ],

  eventThumbnail: "/placeholders/event-thumbnail.jpg",
  fallback:       "/placeholders/fallback.jpg",

  services: {
    "small-business": "/placeholders/service-small-business.jpg",
    "revitalization":  "/placeholders/service-revitalization.jpg",
    "community":       "/placeholders/service-community.jpg",
  } as Record<string, string>,

  teamHero:            "/placeholders/hero-team.jpg",
  teamMemberFallback:  "/placeholders/team-member.jpg",

  /** About page content images */
  aboutMissionImage:   "/placeholders/about-mission.jpg",
  aboutOperateImage:   "/placeholders/about-operate.jpg",
} as const;
