import { MessageCircleHeart } from "lucide-react";
import { testimonials } from "../../config/site";
import { Container } from "../ui/Container";
import { Picture } from "../ui/Picture";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";

export function Testimonials() {
  if (!testimonials.enabled || testimonials.items.length === 0) return null;

  return (
    <Section labelledBy="testimonials-title">
      <Container>
        <SectionHeading
          id="testimonials-title"
          title="Veja a experiência de quem já começou"
          subtitle="Em breve, você poderá conhecer avaliações reais de quem utilizou nossos materiais."
        />
      </Container>

      {/* Mobile: carrossel com scroll-snap. Desktop: grade de 3 colunas. */}
      <div className="mx-auto max-w-[1080px] md:px-5">
        <ul
          className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0"
          aria-label="Depoimentos"
        >
          {testimonials.items.map((item) => (
            <li key={item.label} className="w-[85vw] max-w-[340px] shrink-0 snap-start md:w-auto md:max-w-none">
              <Picture
                image={item.image}
                placeholder={item.label}
                icon={MessageCircleHeart}
                sizes="(min-width: 768px) 33vw, 85vw"
                className="aspect-[4/5] w-full rounded-card"
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
