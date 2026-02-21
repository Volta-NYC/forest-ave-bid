import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Board of Directors",
  description:
    "Meet the Forest Avenue BID's volunteer Board of Directors—business owners, property owners, and community leaders who guide the district's programs and priorities.",
};

interface BoardMember {
  name: string;
  role: string;
  title?: string;
  bio?: string;
}

const board: BoardMember[] = [
  {
    name: "Maria Gonzalez",
    role: "Chair",
    title: "Owner, Gonzalez Realty Group",
    bio: "Maria has been a property owner on Forest Avenue for over 25 years. She has served on the BID board since its inception and has championed the district's façade improvement and beautification programs.",
  },
  {
    name: "James Trombetta",
    role: "Vice Chair",
    title: "Owner, All-Star Auto Repair",
    bio: "James has operated All-Star Auto Repair on Forest Avenue since 1998. He serves as Vice Chair and leads the BID's small business advocacy committee.",
  },
  {
    name: "Patricia Chen",
    role: "Treasurer",
    title: "Partner, Chen & Associates CPAs",
    bio: "Patricia brings 20 years of nonprofit financial management to her role as Treasurer. She oversees the BID's annual budget, audit process, and financial reporting.",
  },
  {
    name: "Rev. Anthony Williams",
    role: "Secretary",
    title: "Pastor, North Shore Community Church",
    bio: "Reverend Williams has been a community anchor on the North Shore for over 15 years. As Secretary, he ensures the BID's programs remain inclusive and reflect the needs of all residents.",
  },
  {
    name: "Sofia Petrosino",
    role: "Director",
    title: "Owner, Angelina's Bakery",
    bio: "Sofia's family has operated Angelina's Bakery on Forest Avenue for three decades. She co-chairs the BID's events committee and is the driving force behind the Annual Street Fair.",
  },
  {
    name: "David Park",
    role: "Director",
    title: "Property Owner & Developer",
    bio: "David owns several commercial properties in the district. He leads the BID's commercial revitalization committee and has been instrumental in attracting new tenants to vacant storefronts.",
  },
  {
    name: "Linda Okafor",
    role: "Director",
    title: "Owner, Children's Boutique",
    bio: "Linda opened Children's Boutique on Forest Avenue in 2015. She serves on the marketing and communications committee and manages the BID's social media presence.",
  },
  {
    name: "Robert Sanchez",
    role: "Director",
    title: "Public Member, Community Board 1 Liaison",
    bio: "Robert serves as the BID's liaison to Community Board 1 and represents residential stakeholders on the board. He has lived in the Forest Avenue area for over 30 years.",
  },
  {
    name: "Karen Liu",
    role: "Ex-Officio",
    title: "Executive Director, Forest Avenue BID",
    bio: "Karen joined as the BID's first full-time Executive Director in 2018. She holds a master's degree in urban planning from NYU and previously worked at NYC Small Business Services.",
  },
];

const roleColors: Record<string, { bg: string; text: string }> = {
  Chair: { bg: "bg-[#2c541d]", text: "text-white" },
  "Vice Chair": { bg: "bg-[#3a6e26]", text: "text-white" },
  Treasurer: { bg: "bg-[#74a84a]/20", text: "text-[#2c541d]" },
  Secretary: { bg: "bg-[#74a84a]/20", text: "text-[#2c541d]" },
  Director: { bg: "bg-[var(--bg)]", text: "text-[var(--muted)]" },
  "Ex-Officio": { bg: "bg-[var(--bg)]", text: "text-[var(--muted)]" },
};

function RoleBadge({ role }: { role: string }) {
  const c = roleColors[role] ?? roleColors["Director"];
  return (
    <span
      className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full border border-transparent ${c.bg} ${c.text}`}
    >
      {role}
    </span>
  );
}

export default function TeamPage() {
  const officers = board.filter((m) =>
    ["Chair", "Vice Chair", "Treasurer", "Secretary"].includes(m.role)
  );
  const directors = board.filter((m) => m.role === "Director");
  const exOfficio = board.filter((m) => m.role === "Ex-Officio");

  return (
    <>
      <Hero
        eyebrow="Leadership"
        title="Board of Directors"
        subtitle="Our volunteer board is made up of business owners, property owners, and community leaders who give their time to advance Forest Avenue's mission."
      />

      <section className="section-padding bg-white" aria-labelledby="officers-heading">
        <div className="container-wide">
          {/* Officers */}
          <SectionHeading
            eyebrow="Officers"
            title="Executive Committee"
            description="Elected officers who lead the BID's governance and operations."
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {officers.map((member) => (
              <div
                key={member.name}
                className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-6 flex flex-col gap-3"
              >
                {/* Avatar placeholder */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-headline font-black text-xl text-white"
                  style={{ background: "var(--brand-primary)" }}
                  aria-hidden="true"
                >
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <RoleBadge role={member.role} />
                  <h3 className="mt-2 font-headline font-bold text-lg text-[var(--brand-primary)] leading-tight">
                    {member.name}
                  </h3>
                  {member.title && (
                    <p className="text-xs text-[var(--muted)] mt-0.5">{member.title}</p>
                  )}
                </div>
                {member.bio && (
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Directors */}
          <div className="mt-16">
            <SectionHeading
              eyebrow="Directors"
              title="Board Members"
              description="Elected directors representing property owners, commercial tenants, and the broader community."
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {directors.map((member) => (
                <div
                  key={member.name}
                  className="bg-white rounded-2xl border border-[var(--border)] p-6 flex gap-5"
                >
                  <div
                    className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-headline font-bold text-base text-white"
                    style={{ background: "var(--brand-secondary)" }}
                    aria-hidden="true"
                  >
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-headline font-bold text-base text-[var(--brand-primary)] leading-tight truncate">
                      {member.name}
                    </h3>
                    {member.title && (
                      <p className="text-xs text-[var(--muted)] mt-0.5">{member.title}</p>
                    )}
                    {member.bio && (
                      <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Staff */}
          {exOfficio.length > 0 && (
            <div className="mt-16">
              <SectionHeading eyebrow="Staff" title="BID Staff" />
              <div className="mt-8 max-w-xl">
                {exOfficio.map((member) => (
                  <div
                    key={member.name}
                    className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-6 flex gap-5"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-headline font-bold text-base text-white"
                      style={{ background: "var(--brand-accent)" }}
                      aria-hidden="true"
                    >
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-base text-[var(--brand-primary)]">
                        {member.name}
                      </h3>
                      {member.title && (
                        <p className="text-xs text-[var(--muted)] mt-0.5">{member.title}</p>
                      )}
                      {member.bio && (
                        <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Join the board CTA */}
          <div
            className="mt-16 p-10 rounded-3xl text-center"
            style={{ background: "var(--brand-primary)" }}
          >
            <h2 className="font-headline font-black text-3xl text-white">
              Interested in serving on the board?
            </h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto leading-relaxed">
              Board seats are elected annually at the BID's annual meeting. If
              you're a Forest Avenue property owner, commercial tenant, or
              community member who wants to help shape the district's future,
              we'd love to hear from you.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-white text-[var(--brand-primary)] hover:bg-[var(--bg)] transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
