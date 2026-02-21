import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import { imageManifest } from "@/lib/imageManifest";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the Forest Avenue BID's Board of Directors — business owners, property owners, city officials, and local leaders who guide the district.",
};

// Source: forestavenuebid.com/team/
// Roles and affiliations are verbatim from the real site.
const boardIntro =
  "Our Board is comprised of individuals with a deep love, involvement, and understanding of the Forest Ave BID community. We have a variety of stakeholders; from business owners, property owners, employees, City officials, and local leaders.";

interface BoardMember {
  name: string;
  role: string;
  affiliation: string;
  isOfficer?: boolean;
  isPublicOfficial?: boolean;
  isEmeritus?: boolean;
}

// Source: forestavenuebid.com/team/
const boardMembers: BoardMember[] = [
  // Officers
  { name: "Megan Coppola", role: "Chair", affiliation: "Owner of Beans and Leaves Cafe", isOfficer: true },
  { name: "Kim Beckett", role: "Vice Chair", affiliation: "Owner of Burrito Bar", isOfficer: true },
  { name: "Gary LiGreci", role: "Treasurer", affiliation: "Owner of LiGreci's Staaten", isOfficer: true },
  { name: "Laura Volsario", role: "Secretary", affiliation: "Owner of Gateway Arms Realty", isOfficer: true },
  // Directors
  { name: "Donald Bentson", role: "Board Member", affiliation: "Owner of Bentson & Company" },
  { name: "Jean Daggan", role: "Board Member", affiliation: "Property Owner" },
  { name: "Rachel Fundaro", role: "Board Member", affiliation: "Paralegal at Thompson Law, PLLC" },
  { name: "Andrea S. Morse, Esq.", role: "Board Member", affiliation: "Owner of Law Office of Andrea Morse" },
  { name: "Eddie Donovan", role: "Board Member", affiliation: "Owner of Duffy's" },
  { name: "Christina Saez", role: "Board Member", affiliation: "Manager of Panini Grill" },
  // Emeritus
  { name: "Vincent D'Antuono", role: "Board Member Emeritus", affiliation: "Owner of Pastosa Ravioli & Cheese Inc.", isEmeritus: true },
  // Public officials
  { name: "Vito Fossella", role: "Borough President", affiliation: "Borough President of Staten Island", isPublicOfficial: true },
  { name: "Kamilliah Hanks", role: "Councilwoman", affiliation: "Councilwoman", isPublicOfficial: true },
  { name: "Brad Lander", role: "Comptroller", affiliation: "NYC Comptroller", isPublicOfficial: true },
  { name: "Eric Adams", role: "NYC Mayor", affiliation: "NYC Mayor", isPublicOfficial: true },
];

// Source: forestavenuebid.com/team/
const staffMembers = [
  { name: "Nina Flores", title: "Executive Director" },
];

function initials(name: string) {
  return name
    .replace(/,.*/, "") // strip suffix like ", Esq."
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const roleBadge: Record<string, string> = {
  Chair: "bg-[var(--brand-primary)] text-white",
  "Vice Chair": "bg-[var(--brand-primary)]/80 text-white",
  Treasurer: "bg-[var(--brand-secondary)]/20 text-[var(--brand-primary)]",
  Secretary: "bg-[var(--brand-secondary)]/20 text-[var(--brand-primary)]",
  "Board Member": "bg-[var(--bg)] text-[var(--muted)]",
  "Board Member Emeritus": "bg-[var(--bg)] text-[var(--muted)] italic",
};

/** Rectangular tile with 4:3 image area above name/role. */
function MemberTile({
  name,
  role,
  affiliation,
  isEmeritus = false,
}: {
  name: string;
  role: string;
  affiliation: string;
  isEmeritus?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-[var(--border)] overflow-hidden bg-white flex flex-col${
        isEmeritus ? " opacity-80" : ""
      }`}
    >
      {/* 4:3 image area */}
      <div
        className="aspect-[4/3] relative bg-[var(--wood-50)] flex items-center justify-center overflow-hidden flex-shrink-0"
        aria-hidden="true"
      >
        {/* Large initials — visible when no photo is present */}
        <span className="font-headline font-black text-6xl text-[var(--brand-primary)]/15 select-none">
          {initials(name)}
        </span>
        {/* Photo — covers initials once a real image is supplied */}
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url(${imageManifest.teamMemberFallback})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1">
        <span
          className={`self-start text-xs font-semibold px-2.5 py-0.5 rounded-full border border-transparent ${
            roleBadge[role] ?? roleBadge["Board Member"]
          }`}
        >
          {role}
        </span>
        <h3 className="font-headline font-bold text-base text-[var(--brand-primary)] leading-tight mt-1">
          {name}
        </h3>
        <p className="text-xs text-[var(--muted)]">{affiliation}</p>
        {isEmeritus && (
          <span className="text-xs text-[var(--muted)] italic">Board Member Emeritus</span>
        )}
      </div>
    </div>
  );
}

export default function TeamPage() {
  const officers = boardMembers.filter((m) => m.isOfficer);
  const directors = boardMembers.filter((m) => !m.isOfficer && !m.isPublicOfficial && !m.isEmeritus);
  const emeritus = boardMembers.filter((m) => m.isEmeritus);
  const publicOfficials = boardMembers.filter((m) => m.isPublicOfficial);

  return (
    <>
      <Hero
        eyebrow="Leadership"
        title="Our Team"
        subtitle={boardIntro}
        woodTexture
      />

      {/* Staff */}
      <section className="pt-16 pb-8 bg-white" aria-labelledby="staff-heading">
        <div className="container-wide">
          <SectionHeading eyebrow="Staff" title="BID Staff" />
          {/* Source: forestavenuebid.com/team/ */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {staffMembers.map((s) => (
              <div
                key={s.name}
                className="rounded-2xl border border-[var(--border)] overflow-hidden bg-white flex flex-col"
              >
                {/* 4:3 image area */}
                <div
                  className="aspect-[4/3] relative bg-[var(--wood-50)] flex items-center justify-center overflow-hidden flex-shrink-0"
                  aria-hidden="true"
                >
                  <span className="font-headline font-black text-6xl text-[var(--brand-primary)]/15 select-none">
                    {initials(s.name)}
                  </span>
                  <div
                    className="absolute inset-0 z-10"
                    style={{
                      backgroundImage: `url(${imageManifest.teamMemberFallback})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center top",
                    }}
                  />
                </div>
                <div className="p-4">
                  <p className="font-headline font-bold text-base text-[var(--brand-primary)]">
                    {s.name}
                  </p>
                  <p className="text-xs text-[var(--muted)] mt-0.5">{s.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Officers */}
      <section className="py-12 bg-white" aria-labelledby="officers-heading">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Officers"
            title="Board of Directors — Executive Committee"
          />
          {/* Source: forestavenuebid.com/team/ */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {officers.map((m) => (
              <MemberTile
                key={m.name}
                name={m.name}
                role={m.role}
                affiliation={m.affiliation}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Directors */}
      <section className="py-12 bg-[var(--bg)]" aria-labelledby="directors-heading">
        <div className="container-wide">
          <SectionHeading eyebrow="Directors" title="Board Members" />
          {/* Source: forestavenuebid.com/team/ */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {directors.map((m) => (
              <MemberTile
                key={m.name}
                name={m.name}
                role={m.role}
                affiliation={m.affiliation}
              />
            ))}
            {emeritus.map((m) => (
              <MemberTile
                key={m.name}
                name={m.name}
                role={m.role}
                affiliation={m.affiliation}
                isEmeritus
              />
            ))}
          </div>
        </div>
      </section>

      {/* Public officials */}
      <section className="py-12 bg-white" aria-labelledby="officials-heading">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Government"
            title="City & Borough Officials"
            description="The BID works in partnership with elected officials and government offices who serve the Forest Avenue corridor and Staten Island's North Shore."
          />
          {/* Source: forestavenuebid.com/team/ */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {publicOfficials.map((m) => (
              <MemberTile
                key={m.name}
                name={m.name}
                role={m.role}
                affiliation={m.affiliation}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
