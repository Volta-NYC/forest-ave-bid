import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import AccessibleAccordion from "@/components/AccessibleAccordion";
import CTAButton from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Forest Avenue Business Improvement District—our mission, history, and how we work to strengthen the Forest Avenue commercial corridor in Staten Island.",
};

const bidFaqs = [
  {
    question: "What is a Business Improvement District (BID)?",
    answer:
      "A Business Improvement District (BID) is a public-private partnership in which property and business owners elect to make a collective contribution to the maintenance, development, and promotion of their commercial district. BIDs are authorized by New York State law and governed by an elected board of directors made up of property owners, commercial tenants, and community representatives.",
  },
  {
    question: "How is the Forest Avenue BID funded?",
    answer:
      "The BID is funded primarily through a special assessment levied on commercial properties within the district boundary. Assessment amounts are based on property size and type. These funds are supplemented by grants from the City of New York, NYC Small Business Services, and private foundations. The BID is a 501(c)(6) nonprofit organization.",
  },
  {
    question: "What is the BID's service area?",
    answer:
      "The Forest Avenue BID serves the commercial strip along Forest Avenue on Staten Island's North Shore. The district runs approximately from Jewett Avenue to Bard Avenue, encompassing more than 200 businesses across a vibrant mix of retail, food service, professional services, and community institutions.",
  },
  {
    question: "Who governs the BID?",
    answer:
      "The BID is governed by a volunteer Board of Directors elected by district stakeholders—including property owners, commercial tenants, and public members. Day-to-day operations are managed by an Executive Director who works under the direction of the Board. Annual meetings are open to all stakeholders in the district.",
  },
  {
    question: "How can my business benefit from the BID?",
    answer:
      "BID member businesses benefit from district-wide marketing and events, technical assistance and grant navigation, streetscape improvements, enhanced sanitation and beautification, and a collective voice on policy issues affecting the corridor. Contact us to learn more about programs available to Forest Avenue businesses.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="Who we are"
        title="About the Forest Avenue BID"
        subtitle="We're a public-private partnership dedicated to making Forest Avenue one of Staten Island's most vibrant commercial corridors."
      />

      {/* Mission section */}
      <section className="section-padding bg-white" aria-labelledby="mission-heading">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <SectionHeading
                eyebrow="Our mission"
                title="Building a stronger Forest Avenue, block by block"
              />
              <div className="mt-6 space-y-4 text-[var(--muted)] leading-relaxed">
                <p>
                  The Forest Avenue Business Improvement District was established
                  to support the economic vitality and physical character of
                  Staten Island's Forest Avenue commercial corridor. We are a
                  community-driven organization that works alongside property
                  owners, business operators, residents, and city agencies to
                  create a cleaner, safer, and more welcoming neighborhood for
                  everyone.
                </p>
                <p>
                  Our work spans three core areas: <strong className="text-[var(--text)]">small business support</strong>,{" "}
                  <strong className="text-[var(--text)]">commercial revitalization</strong>, and{" "}
                  <strong className="text-[var(--text)]">community programming</strong>. Through these
                  efforts we invest in the people, places, and programs that
                  define Forest Avenue's character and strengthen its future.
                </p>
                <p>
                  Forest Avenue has long been the commercial heart of Staten
                  Island's North Shore—a place where immigrant entrepreneurs
                  built businesses, families found everything they needed, and
                  community relationships were formed. The BID exists to honor
                  and build on that legacy.
                </p>
              </div>
              <div className="mt-8 flex gap-4 flex-wrap">
                <CTAButton href="/services">Our programs & services</CTAButton>
                <CTAButton href="/contact" variant="outline">Contact us</CTAButton>
              </div>
            </div>

            {/* Value pillars */}
            <div className="space-y-5">
              {[
                {
                  num: "01",
                  title: "Community First",
                  body: "Every program we run and every dollar we spend is in service of the people and businesses that make Forest Avenue home.",
                },
                {
                  num: "02",
                  title: "Collaboration",
                  body: "We work in partnership with local government, community organizations, business associations, and residents to multiply our impact.",
                },
                {
                  num: "03",
                  title: "Economic Vitality",
                  body: "A thriving commercial district means good jobs, strong businesses, and a tax base that supports the entire community.",
                },
                {
                  num: "04",
                  title: "Accessible & Welcoming",
                  body: "Forest Avenue should be a place where all of Staten Island's diverse communities feel welcome to shop, dine, work, and gather.",
                },
              ].map((v) => (
                <div
                  key={v.num}
                  className="flex gap-5 p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg)]"
                >
                  <span className="font-headline font-black text-3xl text-[var(--brand-secondary)] flex-shrink-0 leading-none">
                    {v.num}
                  </span>
                  <div>
                    <h3 className="font-headline font-bold text-lg text-[var(--brand-primary)]">
                      {v.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)] mt-1 leading-relaxed">
                      {v.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What is a BID + FAQ */}
      <section className="section-padding bg-[var(--bg)]" aria-labelledby="faq-heading">
        <div className="container-narrow">
          <SectionHeading
            eyebrow="BID 101"
            title="What is a Business Improvement District?"
            description="New to the concept? Here's what you need to know about how BIDs work and what makes ours tick."
          />
          <div className="mt-10">
            <AccessibleAccordion items={bidFaqs} id="bid-faq" />
          </div>
        </div>
      </section>

      {/* How we operate */}
      <section className="section-padding bg-white" aria-labelledby="operations-heading">
        <div className="container-wide max-w-4xl">
          <SectionHeading
            eyebrow="Operations"
            title="How the BID operates"
            description="Transparency and accountability are central to everything we do."
          />
          <div className="mt-10 prose max-w-none text-[var(--muted)]">
            <p>
              The Forest Avenue BID operates under a annually approved work plan
              and budget that is reviewed by the Board of Directors and submitted
              to the NYC Department of Small Business Services (SBS). Our
              financial records are subject to independent audit, and annual
              reports are made available to district stakeholders.
            </p>
            <p>
              Board meetings are held monthly and are open to all district
              stakeholders. Major program decisions are made collectively by the
              full Board. The Executive Director manages day-to-day operations,
              vendor relationships, and program delivery under Board direction.
            </p>
            <p>
              We collaborate closely with NYC SBS, the Staten Island Borough
              President's office, our local City Council representatives, and the
              community board to ensure BID programs align with broader
              neighborhood priorities.
            </p>
          </div>
          <div className="mt-8">
            <CTAButton href="/team" variant="outline">Meet the board of directors</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
