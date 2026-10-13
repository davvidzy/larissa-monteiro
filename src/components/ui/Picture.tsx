import type { LucideIcon } from "lucide-react";
import type { ResponsiveImage } from "../../config/site";

type Props = {
  image: ResponsiveImage | null;
  /** Texto do placeholder exibido enquanto não houver imagem real. */
  placeholder: string;
  icon?: LucideIcon;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

/**
 * Imagem responsiva com lazy-load, ou um placeholder neutro quando a imagem
 * ainda não foi fornecida. O contêiner (className) define a proporção.
 */
export function Picture({ image, placeholder, icon: Icon, sizes, className = "", priority = false }: Props) {
  if (!image) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 border border-dashed border-primary-light bg-soft-pink text-center text-rose ${className}`}
        role="img"
        aria-label={placeholder}
      >
        {Icon && <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />}
        <span className="px-2 text-[13px] font-medium">{placeholder}</span>
      </div>
    );
  }

  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`object-cover ${className}`}
    />
  );
}
