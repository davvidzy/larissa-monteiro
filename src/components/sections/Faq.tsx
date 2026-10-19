import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faq } from "../../config/site";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section tone="blush" labelledBy="faq-title">
      <Container narrow>
        <SectionHeading id="faq-title" title="Perguntas frequentes" />

        <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
          {faq.map((item, index) => {
            const open = openIndex === index;
            const buttonId = `faq-q-${index}`;
            const panelId = `faq-a-${index}`;

            return (
              <div key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-bold text-ink transition-colors hover:text-primary"
                  >
                    {item.question}
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-5 shrink-0 text-primary transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  inert={!open}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-ink-soft">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quem tira a última dúvida aqui não precisa voltar até os planos */}
        <div className="mt-8 text-center">
          <a
            href="#planos"
            className="inline-flex min-h-[52px] w-full max-w-[340px] items-center justify-center rounded-button bg-primary px-5 py-3 text-[14px] font-bold tracking-[0.02em] text-white uppercase shadow-soft transition-colors hover:bg-primary-hover md:text-[15px]"
          >
            Quero começar agora
          </a>
        </div>
      </Container>
    </Section>
  );
}
