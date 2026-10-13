import { Check, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { upgrade, type Plan } from "../../config/site";
import { track } from "../../lib/analytics";
import { goToCheckout } from "../../lib/checkout";
import { formatPrice, priceDiff } from "../../lib/format";
import { Button } from "../ui/Button";

type Props = {
  open: boolean;
  start: Plan;
  complete: Plan;
  onClose: () => void;
};

/**
 * Popup de upgrade exibido somente após clicar no plano Start.
 * Usa <dialog> nativo: foco preso no modal, fundo inerte e Esc para fechar.
 */
export function UpgradeModal({ open, start, complete, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      const previouslyFocused = document.activeElement as HTMLElement | null;
      dialog.showModal();
      primaryRef.current?.focus();
      document.documentElement.style.overflow = "hidden";

      return () => {
        document.documentElement.style.overflow = "";
        if (dialog.open) dialog.close();
        previouslyFocused?.focus();
      };
    }
  }, [open]);

  // O valor do upgrade substitui o Start: a diferença é upgrade - start.
  const extra = priceDiff(upgrade.price, start.price);
  const savings = priceDiff(complete.price, upgrade.price);

  const accept = () => {
    track("upgrade_accept", { value: upgrade.price, currency: "BRL" });
    goToCheckout("upgrade", upgrade.price);
  };

  const decline = () => {
    track("upgrade_decline", { value: start.price, currency: "BRL" });
    goToCheckout("start", start.price);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="upgrade-title"
      aria-describedby="upgrade-desc"
      className="upgrade-dialog m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[420px] overflow-y-auto overscroll-contain rounded-[24px] bg-surface p-0 text-ink shadow-featured"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        // Clique fora do conteúdo (no backdrop) fecha
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative px-6 pt-10 pb-6 text-center">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-blush hover:text-ink"
        >
          <X aria-hidden="true" className="size-5" />
        </button>

        <h2 id="upgrade-title" className="font-display text-[27px] leading-[1.12] font-semibold text-balance">
          Espere! Leve o Kit Completo com desconto 💖
        </h2>

        <p id="upgrade-desc" className="mt-3 text-ink-soft">
          Por apenas <strong className="text-ink">{formatPrice(extra)} a mais</strong>, você pode levar o manual
          completo, 30 mapeamentos e os 5 bônus.
        </p>

        <div className="mt-5 rounded-card bg-blush px-4 py-4">
          <p className="text-[13px] text-ink-soft">
            Preço normal do Completo: <s>{formatPrice(complete.price)}</s>
          </p>
          <p className="mt-1 text-[36px] leading-none font-bold tracking-[-0.03em] text-primary">
            {formatPrice(upgrade.price)}
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-[13px] font-bold text-success">
            <Check aria-hidden="true" className="size-4" strokeWidth={2.5} />
            Você economiza {formatPrice(savings)}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <Button ref={primaryRef} fullWidth onClick={accept}>
            Sim! Quero o completo por {formatPrice(upgrade.price)}
          </Button>
          <Button variant="ghost" size="md" fullWidth className="font-medium" onClick={decline}>
            Não, continuar com o Start por {formatPrice(start.price)}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
