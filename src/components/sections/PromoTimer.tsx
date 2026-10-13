import { Gift, Timer } from "lucide-react";
import { promo } from "../../config/site";
import { useCountdown } from "../../hooks/useCountdown";

/**
 * Exibe o contador somente quando `promo.active` é true e o prazo não terminou.
 * Fora disso, mostra a mensagem padrão (sem urgência).
 */
export function PromoTimer() {
  const countdown = useCountdown({
    enabled: promo.active,
    endsAt: promo.endsAt,
    durationSeconds: promo.durationSeconds,
    storageKey: promo.storageKey,
  });

  const running = countdown && !countdown.expired;

  if (!running) {
    return (
      <p className="mx-auto mt-8 flex w-fit max-w-full items-center gap-2.5 rounded-card border border-primary-light bg-surface px-5 py-3.5 text-[14px] font-medium text-ink">
        <Gift aria-hidden="true" className="size-5 shrink-0 text-primary" strokeWidth={1.75} />
        {promo.messages.inactive}
      </p>
    );
  }

  const units = [
    { value: countdown.hours, label: "horas" },
    { value: countdown.minutes, label: "min" },
    { value: countdown.seconds, label: "seg" },
  ];

  return (
    <div className="mx-auto mt-8 max-w-[420px] rounded-card border border-primary-light bg-surface px-4 py-4 text-center shadow-soft">
      <p className="flex items-center justify-center gap-2 text-[14px] font-medium text-ink">
        <Timer aria-hidden="true" className="size-5 shrink-0 text-primary" strokeWidth={1.75} />
        {promo.messages.active}
      </p>
      <div
        className="mt-3 flex items-start justify-center gap-2 font-bold tabular-nums"
        role="timer"
        aria-label={`${countdown.hours} horas, ${countdown.minutes} minutos e ${countdown.seconds} segundos`}
      >
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-start gap-2">
            {i > 0 && <span className="pt-1.5 text-[20px] text-primary">:</span>}
            <div className="flex flex-col items-center">
              <span className="min-w-[52px] rounded-[10px] bg-soft-pink px-2 py-1.5 text-[24px] text-primary">
                {unit.value}
              </span>
              <span className="mt-1 text-[12px] font-medium text-ink-soft">{unit.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
