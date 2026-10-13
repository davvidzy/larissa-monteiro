import { Gift, Zap } from "lucide-react";
import { promo } from "../../config/site";
import { useCountdown } from "../../hooks/useCountdown";
import { Container } from "../ui/Container";

/**
 * Barra de largura total com o cronômetro da promoção.
 * Só aparece com `promo.active` e enquanto o prazo não terminou; depois disso
 * mostra a mensagem padrão, sem urgência (o prazo não reinicia ao recarregar).
 */
export function PromoTimer() {
  const countdown = useCountdown({
    enabled: promo.active,
    endsAt: promo.endsAt,
    durationSeconds: promo.durationSeconds,
    storageKey: promo.storageKey,
  });

  if (!countdown || countdown.expired) {
    return (
      <Container className="mb-8">
        <p className="mx-auto flex w-fit max-w-full items-center gap-2.5 rounded-card border border-primary-light bg-surface px-5 py-3.5 text-[14px] font-medium text-ink">
          <Gift aria-hidden="true" className="size-5 shrink-0 text-primary" strokeWidth={1.75} />
          {promo.messages.inactive}
        </p>
      </Container>
    );
  }

  const units = [
    { value: countdown.hours, label: "horas" },
    { value: countdown.minutes, label: "min" },
    { value: countdown.seconds, label: "seg" },
  ];

  return (
    <div className="mb-8 bg-gradient-to-r from-primary to-rose py-5 text-white md:py-6" role="region" aria-label="Promoção relâmpago">
      <Container className="flex flex-col items-center text-center md:flex-row md:justify-center md:gap-10 md:text-left">
        <div>
          <p className="inline-flex items-center gap-1.5 text-[17px] font-bold tracking-[0.08em] md:text-[19px]">
            <Zap aria-hidden="true" className="size-5 fill-champagne text-champagne" strokeWidth={1.75} />
            {promo.messages.title}
          </p>
          <p className="mt-0.5 text-[14px] text-white/90 md:text-[15px]">{promo.messages.subtitle}</p>
        </div>

        <div
          className="mt-3 flex items-start gap-1.5 font-bold tabular-nums md:mt-0"
          role="timer"
          aria-label={`Termina em ${countdown.hours} horas, ${countdown.minutes} minutos e ${countdown.seconds} segundos`}
        >
          {units.map((unit, i) => (
            <div key={unit.label} className="flex items-start gap-1.5">
              {i > 0 && <span className="pt-1 text-[26px] leading-none text-white/80" aria-hidden="true">:</span>}
              <div className="flex flex-col items-center">
                <span className="min-w-[56px] rounded-[10px] bg-white px-2 py-1.5 text-center text-[28px] leading-none text-primary shadow-soft">
                  {unit.value}
                </span>
                <span className="mt-1 text-[12px] font-medium text-white/85">{unit.label}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
