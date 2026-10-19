import { useEffect, useRef, useState } from "react";
import { testimonials, type Testimonial } from "../../config/site";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-card border border-line bg-surface p-4 shadow-soft">
      <figcaption className="flex items-center gap-3">
        <img
          src={item.avatar}
          alt=""
          width={48}
          height={48}
          loading="lazy"
          decoding="async"
          className="size-12 shrink-0 rounded-full object-cover ring-2 ring-primary-light"
        />
        <div className="min-w-0">
          <p className="truncate text-[15px] leading-tight font-bold text-ink">{item.name}</p>
          <p className="mt-0.5 text-[13px] text-ink-soft">{item.purchased}</p>
        </div>
      </figcaption>

      {/* Print sem alterações; os cantos arredondados escondem os pixels brancos do print do iPhone */}
      <img
        src={item.print.src}
        srcSet={item.print.srcSet}
        sizes="(min-width: 768px) 340px, 85vw"
        width={item.print.width}
        height={item.print.height}
        alt={item.print.alt}
        loading="lazy"
        decoding="async"
        className="mt-4 h-auto w-full rounded-[14px]"
      />
    </figure>
  );
}

export function Testimonials() {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const items = testimonials.items;

  // Dot ativo = card mais próximo do início da área visível
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cards = Array.from(list.children) as HTMLElement[];
        if (cards.length === 0) return;
        const base = cards[0].offsetLeft;
        const atEnd = list.scrollLeft >= list.scrollWidth - list.clientWidth - 4;
        if (atEnd) return setActive(cards.length - 1);
        let nearest = 0;
        cards.forEach((card, i) => {
          const distance = Math.abs(card.offsetLeft - base - list.scrollLeft);
          if (distance < Math.abs(cards[nearest].offsetLeft - base - list.scrollLeft)) nearest = i;
        });
        setActive(nearest);
      });
    };
    list.addEventListener("scroll", update, { passive: true });
    return () => {
      list.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = (index: number) => {
    const list = listRef.current;
    if (!list) return;
    const cards = Array.from(list.children) as HTMLElement[];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: cards[index].offsetLeft - cards[0].offsetLeft, behavior: reduceMotion ? "auto" : "smooth" });
  };

  if (!testimonials.enabled || items.length === 0) return null;

  return (
    <Section labelledBy="testimonials-title">
      <Container>
        <SectionHeading
          id="testimonials-title"
          title="Veja a experiência de quem já começou"
          subtitle="Mensagens reais de clientes que já estão estudando com o Lash do Zero."
        />
      </Container>

      {/* Rolagem horizontal com scroll-snap em todas as telas */}
      <div className="mx-auto max-w-[1080px] md:px-5">
        <ul
          ref={listRef}
          // Focável: quem navega pelo teclado rola o carrossel com as setas
          tabIndex={0}
          className="scrollbar-none flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto overscroll-x-contain scroll-px-5 rounded-card px-5 pb-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:scroll-px-0 md:px-0"
          aria-label="Depoimentos de clientes (role para o lado para ver mais)"
        >
          {items.map((item) => (
            <li key={item.name} className="w-[85vw] max-w-[340px] shrink-0 snap-start">
              <TestimonialCard item={item} />
            </li>
          ))}
        </ul>
      </div>

      {/* Dots: quantos depoimentos existem e em qual você está */}
      <div className="mt-5 flex justify-center gap-1" role="group" aria-label="Navegar pelos depoimentos">
        {items.map((item, i) => (
          <button
            key={item.name}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Depoimento ${i + 1} de ${items.length}: ${item.name}`}
            aria-current={i === active ? "true" : undefined}
            className="flex size-6 items-center justify-center"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-200 ${
                i === active ? "w-5 bg-primary" : "w-2 bg-primary-light"
              }`}
            />
          </button>
        ))}
      </div>
    </Section>
  );
}
