import { brand } from "../../config/site";

type Props = {
  variant?: "horizontal" | "vertical";
  className?: string;
};

/** Logo oficial (SVG em public/img). Dimensões reservadas para evitar layout shift. */
export function Logo({ variant = "horizontal", className = "" }: Props) {
  const isHorizontal = variant === "horizontal";
  return (
    <img
      src={isHorizontal ? brand.logo.horizontal : brand.logo.vertical}
      alt={brand.name}
      width={isHorizontal ? 274 : 320}
      height={isHorizontal ? 60 : 130}
      className={`h-auto ${className}`}
      decoding="async"
    />
  );
}
