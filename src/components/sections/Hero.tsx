import { FileText, Infinity as InfinityIcon, Sparkles } from "lucide-react";
import { Container } from "../ui/Container";

const highlights = [
  { icon: FileText, label: "Material 100% digital" },
  { icon: Sparkles, label: "Feito para iniciantes" },
  { icon: InfinityIcon, label: "Acesso vitalício" },
];

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-blush to-surface pt-14 pb-14 md:pt-24 md:pb-20">
      <Container narrow className="text-center">
        <h1 className="font-display text-[40px] leading-[1.08] font-bold tracking-[-0.015em] text-balance text-ink min-[390px]:text-[44px] md:text-[60px]">
          Comece no <span className="text-primary">universo dos cílios</span>, mesmo do zero.
        </h1>

        <p className="mx-auto mt-5 max-w-[340px] text-[16px] leading-[1.55] text-ink-soft md:max-w-[440px] md:text-[18px]">
          {/*  : número e palavra nunca quebram em linhas diferentes */}
          {"Manual ilustrado, 30 mapeamentos e 5 bônus para organizar seus estudos."}
        </p>

        <a
          href="#planos"
          className="mt-9 inline-flex min-h-[52px] w-full max-w-[340px] items-center justify-center rounded-button bg-primary px-5 py-3 text-[14px] font-bold tracking-[0.02em] text-white uppercase shadow-soft transition-colors hover:bg-primary-hover md:text-[15px]"
        >
          Quero começar agora
        </a>

        <ul className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2.5">
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
