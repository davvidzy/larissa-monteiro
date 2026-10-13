import { Clock, FileText, Sparkles } from "lucide-react";
import { Container } from "../ui/Container";

const highlights = [
  { icon: FileText, label: "Material 100% digital" },
  { icon: Sparkles, label: "Feito para iniciantes" },
  { icon: Clock, label: "Acesso após a compra" },
];

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-blush to-surface pt-10 pb-8 md:pt-16 md:pb-12">
      <Container narrow className="text-center">
        <p className="inline-flex rounded-full border border-primary-light bg-surface px-3.5 py-1.5 text-[12px] font-bold tracking-[0.1em] text-primary">
          SEU PRÓXIMO PASSO NA ÁREA DA BELEZA
        </p>

        <h1 className="mt-5 font-display text-[34px] leading-[1.08] font-semibold tracking-[-0.015em] text-balance text-ink md:text-[52px]">
          Seu primeiro passo para <span className="text-primary italic">trabalhar com cílios</span> começa aqui!
        </h1>

        <p className="mx-auto mt-4 max-w-[440px] text-ink-soft md:text-[17px]">
          Conheça os materiais, os mapeamentos e o caminho para começar seus estudos na área de extensão de cílios —
          mesmo sem experiência.
        </p>

        <ul className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2">
          {highlights.map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-soft">
              <Icon aria-hidden="true" className="size-4 text-rose" strokeWidth={1.75} />
              {label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
