import { brand } from "../../config/site";
import { Container } from "../ui/Container";
import { Logo } from "../ui/Logo";

const links = [
  { label: "Política de Privacidade", href: brand.links.privacy },
  { label: "Termos de Uso", href: brand.links.terms },
  { label: "Contato", href: brand.links.contact },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface py-10">
      <Container className="flex flex-col items-center text-center">
        <Logo className="w-[150px]" />
        <p className="mt-3 font-display text-[19px] text-ink-soft italic">{brand.tagline}</p>

        <nav aria-label="Links institucionais" className="mt-6">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-[13px] font-medium text-ink-soft underline-offset-4 hover:text-primary hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-4 text-[13px] text-ink-soft">
          © {new Date().getFullYear()} {brand.name}. Todos os direitos reservados.
        </p>
        <p className="mt-1 max-w-[360px] text-[12px] text-ink-soft">
          {brand.presenter.name} é a apresentadora virtual da {brand.name}.
        </p>
      </Container>
    </footer>
  );
}
