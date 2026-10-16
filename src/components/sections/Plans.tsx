import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { plans, type Plan } from "../../config/site";
import { track } from "../../lib/analytics";
import { goToCheckout } from "../../lib/checkout";
import { formatPrice } from "../../lib/format";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { UpgradeModal } from "./UpgradeModal";

function PlanCard({ plan, onSelect }: { plan: Plan; onSelect: () => void }) {
  const [reais, centavos] = formatPrice(plan.price).replace(/R\$\s/, "").split(",");
  const inst = plan.installments;
  const instTotal = inst ? Math.round(inst.count * inst.value * 100) / 100 : 0;

  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={`relative flex flex-col rounded-card bg-surface p-6 ${
        plan.featured ? "border-2 border-primary shadow-featured" : "border border-line shadow-soft"
      }`}
    >
      {plan.featured ? (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3.5 py-1 text-[12px] font-bold tracking-[0.08em] whitespace-nowrap text-white uppercase">
          {plan.tag}
        </span>
      ) : (
        <span className="self-start rounded-full bg-blush px-3 py-1 text-[12px] font-bold text-rose">{plan.tag}</span>
      )}

      <h3
        id={`plan-${plan.id}`}
        className={`font-display leading-tight font-semibold text-ink ${plan.featured ? "mt-2 text-[26px]" : "mt-3 text-[22px]"}`}
      >
        {plan.name}
      </h3>

      <p className="mt-3 flex items-start text-ink" aria-label={formatPrice(plan.price)}>
        <span className="mt-1.5 mr-1 text-[15px] font-bold">R$</span>
        <span className={`leading-none font-bold tracking-[-0.03em] ${plan.featured ? "text-[48px] text-primary" : "text-[38px]"}`}>
          {reais}
        </span>
        <span className="mt-1.5 text-[17px] font-bold">,{centavos}</span>
      </p>

      {inst ? (
        <>
          {/* No lugar de "Pagamento único". CDC art. 52: informar o total parcelado com juros. */}
          <p className="mt-1.5 text-[15px] text-ink-soft">
            ou <strong className="text-[17px] font-bold text-primary">{inst.count}x de {formatPrice(inst.value)}</strong>
          </p>
          <p className="mt-0.5 text-[12px] text-ink-soft">
            Parcelado no cartão com juros: total de {formatPrice(instTotal)}.
          </p>
        </>
      ) : (
        <p className="mt-1 text-[13px] text-ink-soft">Pagamento único</p>
      )}

      {plan.quote && (
        <p className="mt-4 border-l-2 border-champagne pl-3 font-display text-[18px] leading-snug text-ink italic">
          “{plan.quote}”
        </p>
      )}

      <ul className="mt-5 mb-6 space-y-2.5">
        {plan.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[15px] text-ink">
            <Check aria-hidden="true" className="mt-0.5 size-[18px] shrink-0 text-success" strokeWidth={2.25} />
            {item}
          </li>
        ))}
      </ul>

      {plan.bonuses && plan.bonuses.length > 0 && (
        <div className="-mx-2 mb-6 rounded-[14px] border border-primary-light bg-blush px-4 py-5">
          <p className="text-[13px] font-bold tracking-[0.06em] text-primary">
            🎁 VOCÊ TAMBÉM RECEBE {plan.bonuses.length} BÔNUS:
          </p>
          <ol className="mt-3 space-y-3">
            {plan.bonuses.map((bonus, i) => (
              <li key={bonus.title} className="flex items-start gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[12px] font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-[14px] leading-snug text-ink-soft">
                  <strong className="font-bold text-ink">{bonus.title}:</strong> {bonus.description}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-4 flex items-start gap-2 border-t border-primary-light pt-3 text-[13px] font-medium text-ink">
            <Check aria-hidden="true" className="mt-px size-4 shrink-0 text-success" strokeWidth={2.5} />
            <span>
              Todos incluídos nos <strong className="font-bold">{formatPrice(plan.price)}</strong>, sem cobrança
              adicional.
            </span>
          </p>
        </div>
      )}

      <Button variant={plan.featured ? "primary" : "outline"} fullWidth className="mt-auto" onClick={onSelect}>
        {plan.cta}
      </Button>
    </article>
  );
}

export function Plans() {
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // view_plans: uma vez, quando a seção aparece na tela
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track("view_plans");
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const start = plans.find((p) => p.id === "start")!;
  const complete = plans.find((p) => p.id === "complete")!;

  const handleSelect = (plan: Plan) => {
    if (plan.id === "start") {
      track("select_start", { value: plan.price, currency: "BRL" });
      setUpgradeOpen(true);
      track("upgrade_popup_open");
    } else {
      track("select_complete", { value: plan.price, currency: "BRL" });
      goToCheckout("complete", plan.price);
    }
  };

  return (
    <Section id="planos" labelledBy="plans-title" ref={sectionRef}>
      <Container className="lg:max-w-[880px]">
        <SectionHeading
          id="plans-title"
          title="Escolha como você quer começar"
          subtitle="Do básico ao completo, escolha o material ideal para o seu momento."
        />

        <div className="grid gap-8 md:grid-cols-2 md:items-stretch md:gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onSelect={() => handleSelect(plan)} />
          ))}
        </div>
      </Container>

      <UpgradeModal
        open={upgradeOpen}
        start={start}
        complete={complete}
        onClose={() => setUpgradeOpen(false)}
      />
    </Section>
  );
}
