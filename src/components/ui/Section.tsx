import type { ReactNode, Ref } from "react";

type Props = {
  children: ReactNode;
  id?: string;
  tone?: "white" | "blush";
  labelledBy?: string;
  className?: string;
  ref?: Ref<HTMLElement>;
};

export function Section({ children, id, tone = "white", labelledBy, className = "", ref }: Props) {
  const bg = tone === "blush" ? "bg-blush" : "bg-surface";
  return (
    <section ref={ref} id={id} aria-labelledby={labelledBy} className={`py-12 md:py-20 ${bg} ${className}`}>
      {children}
    </section>
  );
}
