import { FileText, Infinity as InfinityIcon, Sparkles } from "lucide-react";
import { Container } from "../ui/Container";

const highlights = [
  { icon: FileText, label: "Material 100% digital" },
  { icon: Sparkles, label: "Feito para iniciantes" },
  { icon: InfinityIcon, label: "Acesso vitalício" },
];

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-blush to-surface pt-10 pb-8 md:pt-16 md:pb-12">
      <Container narrow className="text-center">
        <p className="inline-flex rounded-full border border-primary-light bg-surface px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] text-primary">
          SEU PRÓXIMO PASSO NA ÁREA DA BELEZA
        </p>

        <h1 className="mt-4 font-display text-[34px] leading-[1.05] font-bold tracking-[-0.02em] text-balance text-ink min-[360px]:text-[36px] md:text-[54px]">
          Quer começar no <span className="text-primary italic">universo dos cílios</span>, mas não sabe por onde dar o
          primeiro passo?
        </h1>

        <p className="mx-auto mt-4 max-w-[440px] text-ink-soft md:text-[17px]">
          Conheça o <strong className="font-bold text-ink">Kit Lash do Zero Completo</strong>: um guia para iniciantes com
          30 mapeamentos ilustrativos e 5 bônus para organizar seus estudos.
        </p>

        <a
          href="#planos"
          className="mt-6 inline-flex min-h-[52px] w-full max-w-[340px] items-center justify-center rounded-button bg-primary px-5 py-3 text-[14px] font-bold tracking-[0.02em] text-white uppercase shadow-soft transition-colors hover:bg-primary-hover md:text-[15px]"
        >
          Quero começar agora
        </a>

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
