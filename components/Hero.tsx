import Link from "next/link";

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  pattern?: boolean;
  /**
   * Uses /textures/wood.png with a deep-evergreen overlay.
   * Falls back gracefully to solid evergreen if the image is missing.
   */
  woodTexture?: boolean;
  /**
   * Placeholder path for a photo background (e.g. "/placeholders/hero-home.jpg").
   * Falls back to solid brand-primary if the file 404s.
   */
  backgroundImageUrl?: string;
  /** Opacity of the dark overlay over a photo background (0–1). Default 0.45. */
  overlayStrength?: number;
}

export default function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  pattern = true,
  woodTexture = false,
  backgroundImageUrl,
  overlayStrength = 0.45,
}: HeroProps) {
  const bgStyle = woodTexture
    ? {
        backgroundColor: "var(--evergreen-900)",
        backgroundImage: `linear-gradient(rgba(26,51,17,0.82),rgba(26,51,17,0.82)), url('/textures/wood.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : backgroundImageUrl
    ? {
        backgroundColor: "var(--brand-primary)",
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : { background: "var(--brand-primary)" };

  const hasImage = woodTexture || !!backgroundImageUrl;
  return (
    <section
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
      style={bgStyle}
      aria-labelledby="hero-heading"
    >
      {/* Dark overlay for photo backgrounds only (wood texture uses CSS gradient) */}
      {!woodTexture && backgroundImageUrl && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `rgba(0,0,0,${overlayStrength})` }}
          aria-hidden="true"
        />
      )}

      {/* Decorative pattern (only when no background image/texture) */}
      {pattern && !hasImage && (
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* Gradient fade at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: hasImage
            ? "linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))"
            : "linear-gradient(to bottom, transparent, var(--brand-primary))",
        }}
        aria-hidden="true"
      />

      <div className="container-wide relative">
        {eyebrow && (
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--brand-secondary)]">
            {eyebrow}
          </p>
        )}
        <h1
          id="hero-heading"
          className="font-headline font-black text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl text-balance"
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-wrap gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-white text-[var(--brand-primary)] hover:bg-[var(--bg)] transition-colors duration-150 shadow-sm"
              >
                {primaryCta.label}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-white/40 text-white hover:bg-white/10 transition-colors duration-150"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
