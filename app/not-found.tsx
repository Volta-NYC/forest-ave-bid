import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="text-center max-w-md">
        <p className="font-headline font-black text-8xl text-[var(--brand-secondary)]">404</p>
        <h1 className="mt-4 font-headline font-bold text-3xl text-[var(--brand-primary)]">
          Page not found
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-colors hover:opacity-90"
            style={{ background: "var(--brand-primary)" }}
          >
            Go home
          </Link>
          <Link
            href="/our-businesses"
            className="px-5 py-2.5 rounded-lg font-semibold text-sm border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white transition-colors"
          >
            Browse businesses
          </Link>
        </div>
      </div>
    </div>
  );
}
