import { useEffect, useState } from "react";

type Options = {
  enabled: boolean;
  /** Data fixa de término (ISO). Tem prioridade sobre durationSeconds. */
  endsAt?: string;
  /** Prazo individual a partir da primeira visita. */
  durationSeconds?: number;
  storageKey: string;
};

function readStoredEnd(key: string): number | null {
  try {
    const value = Number(localStorage.getItem(key));
    return Number.isFinite(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
}

function storeEnd(key: string, value: number) {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    /* navegação privada ou armazenamento bloqueado: o prazo vale só nesta sessão */
  }
}

function resolveEnd({ enabled, endsAt, durationSeconds, storageKey }: Options): number | null {
  if (!enabled) return null;

  if (endsAt) {
    const fixed = Date.parse(endsAt);
    return Number.isNaN(fixed) ? null : fixed;
  }

  if (durationSeconds) {
    const stored = readStoredEnd(storageKey);
    if (stored) return stored;
    const end = Date.now() + durationSeconds * 1000;
    storeEnd(storageKey, end);
    return end;
  }

  return null;
}

/**
 * Contador regressivo. Retorna `null` quando não há promoção ativa
 * e `{ expired: true }` quando o prazo terminou (sem reiniciar).
 */
export function useCountdown(options: Options) {
  const [end] = useState(() => resolveEnd(options));
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (end === null || Date.now() >= end) return;
    const id = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (t >= end) window.clearInterval(id);
    }, 1000);
    return () => window.clearInterval(id);
  }, [end]);

  if (end === null) return null;

  const remaining = Math.max(0, Math.floor((end - now) / 1000));
  const pad = (n: number) => String(n).padStart(2, "0");

  return {
    expired: remaining === 0,
    hours: pad(Math.floor(remaining / 3600)),
    minutes: pad(Math.floor((remaining % 3600) / 60)),
    seconds: pad(remaining % 60),
  };
}
