"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollReveal() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(".section-reveal, .card-hover, .reveal-item", {
        clearProps: "all",
        opacity: 1,
      });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(".section-reveal, .reveal-item", {
        autoAlpha: 0,
        y: 42,
      });

      ScrollTrigger.batch(".section-reveal, .reveal-item", {
        start: "top 84%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: true,
          });
        },
      });

      gsap.utils.toArray<HTMLElement>(".card-hover").forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.to(".hero-copy", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ".site-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
