import { Logo } from "../ui/Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-[480px] items-center justify-between gap-3 px-5 md:max-w-[720px] lg:max-w-[1080px]">
        <a href="#" aria-label="Bellash Academy — voltar ao topo" className="shrink-0">
          <Logo className="w-[135px] md:w-[160px]" />
        </a>
        <a
          href="#planos"
          className="inline-flex min-h-11 items-center justify-center rounded-button bg-primary px-4 text-[13px] font-bold text-white transition-colors hover:bg-primary-hover"
        >
          Comprar agora
        </a>
      </div>
    </header>
  );
}
