import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import AccessibleAccordion from "@/components/AccessibleAccordion";
import CTAButton from "@/components/CTAButton";
import { imageManifest } from "@/lib/imageManifest";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Forest Avenue BID's mission is to cultivate strong bonds between local businesses and the community we serve on Staten Island.",
};

// Source: forestavenuebid.com/about/ — verbatim copy
const bidFaqs = [
  {
    question: "What is a Business Improvement District (BID)?",
    // Source: forestavenuebid.com/about/ — "What is a BID?" section
    answer:
      "BIDs create vibrant, clean, and safe districts. They deliver services and improvements above and beyond those typically provided by the City. These services can include street cleaning and maintenance, public safety and hospitality, marketing and events, capital improvements, beautification, advocacy, and business development. BIDs help to brand their districts and market small businesses on their corridor. They facilitate networking among merchants, host community events, and advocate for improvements to the district. BIDs also serve as a liaison between local businesses and stakeholders and the City government. In doing so, BIDs provide a collective voice for the neighborhood and help inform City policy based on their unique local knowledge.",
  },
  {
    question: "Who is the Forest Avenue BID for?",
    // Source: forestavenuebid.com/about/ — "Our Operations" section
    answer:
      "The Forest Ave BID serves merchants and property owners from Hart Blvd to Broadway who choose to be part of a collaborative effort to provide services and sponsor special events. All services provided by the BID are the result of investment by the merchants and property owners within the BID.",
  },
  {
    question: "What services does the BID provide?",
    // Source: forestavenuebid.com/about/ — "Our Operations" list
    answer:
      "BID services include: Sidewalk and Gutter Litter Removal Service, Graffiti Removal, New Trash Receptacles, Advertising and Banners, Holiday Lights, Special Events, and Community Development.",
  },
  {
    question: "How is the Forest Avenue BID organized?",
    // Source: forestavenuebid.com/about/ — "About the BID" section
    answer:
      "The Forest Avenue District Management Association is a NYS registered 501(c)(3) not for profit organization. It is governed by a volunteer Board of Directors and a professional Executive Director.",
  },
  {
    question: "How can I get involved?",
    // Source: forestavenuebid.com/about/ — "Interested?" section
    answer:
      "Are you a business owner or property owner between Hart Blvd and Broadway and want to get involved in the Forest Ave BID? Get in touch with us — we'd love to hear from you.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About us"
        title="About the BID"
        subtitle="The Forest Avenue Business Improvement District — serving the corridor from Hart Blvd to Broadway, Staten Island."
        woodTexture
      />

      {/* Mission — Source: forestavenuebid.com/about/ */}
      <section className="section-padding bg-white" aria-labelledby="mission-heading">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <SectionHeading
                eyebrow="Our mission"
                title="Our Mission"
              />
              {/* Source: forestavenuebid.com/about/ — verbatim */}
              <div className="mt-6 space-y-4 text-[var(--muted)] leading-relaxed">
                <p>
                  Our mission is to cultivate strong bonds between local businesses
                  and the community we serve. Through mutual support, we strive to
                  foster a thriving local economy by encouraging community members
                  to patronize our businesses and utilize the goods and services
                  they offer. We firmly believe that the prosperity of our
                  commercial district relies on the unwavering support of our
                  community.
                </p>
                {/* Source: forestavenuebid.com/about/ */}
                <p className="text-sm">
                  The Forest Avenue District Management Association is a NYS
                  registered{" "}
                  <strong className="text-[var(--text)]">501(c)(3) not for profit organization</strong>.
                </p>
              </div>
              <div className="mt-8 flex gap-4 flex-wrap">
                <CTAButton href="/services">Our services</CTAButton>
                <CTAButton href="/contact" variant="outline">Get in touch</CTAButton>
              </div>

              {/* Mission image placeholder */}
              <div
                className="mt-8 aspect-[16/9] rounded-2xl overflow-hidden bg-[var(--wood-50)] relative"
                aria-hidden="true"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${imageManifest.aboutMissionImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            </div>

            {/* Operations — Source: forestavenuebid.com/about/ */}
            <div>
              <SectionHeading eyebrow="Our operations" title="How we operate" />
              {/* Source: forestavenuebid.com/about/ — verbatim */}
              <p className="mt-4 text-[var(--muted)] leading-relaxed text-sm">
                The Forest Ave merchants and property owners, from Hart Blvd to
                Broadway, choose to be part of a collaborative effort to provide
                services and sponsor special events. This is what unites them as a
                Business Improvement District. All services provided by the BID
                are the result of investment by the merchants and property owners
                within the BID.
              </p>
              {/* Source: forestavenuebid.com/about/ — "Some of these services include" list */}
              <ul className="mt-5 space-y-2.5" role="list">
                {[
                  "Sidewalk and Gutter Litter Removal Service",
                  "Graffiti Removal",
                  "New Trash Receptacles",
                  "Advertising and Banners",
                  "Holiday Lights",
                  "Special Events",
                  "Community Development",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[var(--brand-secondary)] flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-[var(--muted)]">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Operations image placeholder */}
              <div
                className="mt-8 aspect-[16/9] rounded-2xl overflow-hidden bg-[var(--wood-50)] relative"
                aria-hidden="true"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${imageManifest.aboutOperateImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is a BID FAQ — Source: forestavenuebid.com/about/ */}
      <section className="section-padding bg-[var(--bg)]" aria-labelledby="faq-heading">
        <div className="container-narrow">
          <SectionHeading
            eyebrow="BID 101"
            title="What is a BID?"
          />
          <div className="mt-10">
            <AccessibleAccordion items={bidFaqs} id="bid-faq" />
          </div>
        </div>
      </section>

      {/* CTA — Source: forestavenuebid.com/about/ — "Interested?" section */}
      <section className="section-padding bg-white" aria-labelledby="cta-heading">
        <div className="container-wide max-w-2xl text-center mx-auto">
          <SectionHeading
            eyebrow="Interested?"
            title="Want to get involved?"
            description="Are you a business owner or property owner between Hart Blvd and Broadway and want to get involved in the Forest Ave BID?"
            center
          />
          <div className="mt-8">
            <CTAButton href="/contact">Get in touch</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
