interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  as?: "h2" | "h3";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--brand-secondary)]">
          {eyebrow}
        </p>
      )}
      <Tag className="font-headline font-bold text-3xl md:text-4xl text-[var(--brand-primary)] text-balance">
        {title}
      </Tag>
      {description && (
        <p
          className={`mt-4 text-base md:text-lg text-[var(--muted)] leading-relaxed max-w-2xl ${
            center ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
