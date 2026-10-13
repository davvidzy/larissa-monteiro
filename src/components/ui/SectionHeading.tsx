import type { ReactNode } from "react";

type Props = {
  id: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
};

export function SectionHeading({ id, title, subtitle, className = "" }: Props) {
  return (
    <header className={`mx-auto mb-8 max-w-[560px] text-center md:mb-12 ${className}`}>
      <h2
        id={id}
        className="font-display text-[29px] leading-[1.12] font-semibold tracking-[-0.01em] text-balance text-ink md:text-[40px]"
      >
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-ink-soft md:text-[17px]">{subtitle}</p>}
    </header>
  );
}
