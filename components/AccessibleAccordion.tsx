"use client";

import { useState } from "react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccessibleAccordionProps {
  items: AccordionItem[];
  id: string;
}

export default function AccessibleAccordion({
  items,
  id,
}: AccessibleAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <dl className="divide-y divide-[var(--border)] border border-[var(--border)] rounded-2xl overflow-hidden">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `${id}-panel-${i}`;
        const triggerId = `${id}-trigger-${i}`;

        return (
          <div key={i} className="bg-white">
            <dt>
              <button
                id={triggerId}
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-headline font-semibold text-[var(--brand-primary)] hover:bg-[var(--bg)] transition-colors"
              >
                <span>{item.question}</span>
                <svg
                  className={`w-5 h-5 flex-shrink-0 text-[var(--muted)] transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </dt>
            <dd
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="px-6 pb-5 text-sm text-[var(--text)] leading-relaxed"
            >
              <p>{item.answer}</p>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
