/**
 * Image manifest — all placeholder paths centralised here.
 * Swap any path for a real URL/path when assets are available;
 * every component that references images imports from this file.
 *
 * Files in /public/placeholders/ do NOT exist yet.
 * Components must fall back gracefully (CSS gradient/colour) when the image 404s.
 */

export const imageManifest = {
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
} as const;
