import { brand, images } from "../../config/site";
import { Container } from "../ui/Container";
import { Picture } from "../ui/Picture";
import { Section } from "../ui/Section";

export function About() {
  return (
    <Section tone="blush" labelledBy="about-title">
      <Container className="md:max-w-[880px]">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:gap-12 md:text-left">
          <Picture
            image={images.presenter}
            placeholder="Foto da apresentadora"
            sizes="(min-width: 768px) 320px, 240px"
            className="aspect-[3/4] w-[240px] shrink-0 rounded-card shadow-card md:w-[320px]"
          />

          <div>
            <h2
              id="about-title"
              className="font-display text-[29px] leading-[1.12] font-semibold text-ink md:text-[40px]"
            >
              Prazer, sou a Larissa! 💖
            </h2>
            <p className="mt-4 text-[17px] font-bold text-ink">{brand.presenter.name}</p>
            <p className="text-[13px] font-medium text-rose">{brand.presenter.role}</p>
            <p className="mt-4 text-ink-soft md:text-[17px]">
              Estou aqui para apresentar o Lash do Zero: uma coleção de materiais educativos criada para ajudar mulheres
              que desejam dar os primeiros passos no universo da extensão de cílios.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
