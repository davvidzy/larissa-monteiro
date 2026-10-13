import { features } from "../../config/site";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";

export function WhatsInside() {
  return (
    <Section labelledBy="inside-title">
      <Container className="lg:max-w-[880px]">
        <SectionHeading
          id="inside-title"
          title="Muito mais que uma apostila!"
          subtitle="Estude o material completo e utilize ferramentas práticas diretamente no Portal Bellash Academy, pelo celular ou computador."
        />

        <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex gap-4 rounded-card border border-line bg-surface p-5 shadow-soft">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-soft-pink text-primary">
                <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="text-[17px] leading-snug font-bold text-ink md:text-[19px]">{title}</h3>
                <p className="mt-1 line-clamp-3 text-[14px] text-ink-soft md:text-[15px]">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
