import { Gift } from "lucide-react";
import { bonuses } from "../../config/site";
import { formatPrice } from "../../lib/format";
import { Container } from "../ui/Container";
import { Picture } from "../ui/Picture";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { PromoTimer } from "./PromoTimer";

export function Bonuses() {
  return (
    <Section tone="blush" labelledBy="bonus-title">
      <Container className="lg:max-w-[880px]">
        <SectionHeading
          id="bonus-title"
          title="E ainda tem 5 bônus especiais! 🎁"
          subtitle="Ferramentas extras para ajudar você a organizar sua jornada Lash."
          className="mb-6! md:mb-8!"
        />
      </Container>

      {/* Barra do cronômetro: largura total, entre o título e os cards */}
      <PromoTimer />

      <Container className="lg:max-w-[880px]">
        <ol className="grid gap-3 md:grid-cols-2 md:gap-5">
          {bonuses.items.map((bonus, index) => (
            <li
              key={bonus.title}
              className="flex items-center gap-4 rounded-card border border-line bg-surface p-3.5 shadow-soft md:p-4 md:last:odd:col-span-2 md:last:odd:mx-auto md:last:odd:w-[calc(50%-0.625rem)]"
            >
              <Picture
                image={bonus.image}
                placeholder={`Bônus ${index + 1}`}
                icon={Gift}
                sizes="88px"
                className="aspect-square w-[76px] shrink-0 rounded-[14px] md:w-[88px]"
              />

              <div className="min-w-0">
                <span className="inline-block rounded-full bg-primary-light/60 px-2 py-0.5 text-[12px] leading-tight font-bold tracking-[0.06em] text-primary">
                  INCLUSO NO COMPLETO
                </span>
                <h3 className="mt-1.5 text-[15px] leading-snug font-bold text-ink md:text-[16px]">{bonus.title}</h3>
                <p className="mt-1 flex items-baseline gap-2">
                  {bonuses.showReferencePrices && bonus.referencePrice !== undefined && (
                    <s className="text-[13px] text-ink-soft" aria-label={`De ${formatPrice(bonus.referencePrice)}`}>
                      {formatPrice(bonus.referencePrice)}
                    </s>
                  )}
                  <strong className="text-[15px] font-bold tracking-[0.04em] text-success">GRÁTIS</strong>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
