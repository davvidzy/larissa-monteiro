import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Largura de leitura: mantém 480px mesmo no desktop (textos, vídeo, FAQ). */
  narrow?: boolean;
  className?: string;
};

export function Container({ children, narrow = false, className = "" }: Props) {
  const width = narrow ? "max-w-[480px] md:max-w-[640px]" : "max-w-[480px] md:max-w-[720px] lg:max-w-[1080px]";
  return <div className={`mx-auto w-full px-5 ${width} ${className}`}>{children}</div>;
}
