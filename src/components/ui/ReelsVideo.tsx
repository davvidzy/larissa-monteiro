import { Play } from "lucide-react";

type Props = {
  /** URL do vídeo (mp4/webm). Vazio = placeholder. */
  src?: string;
  poster?: string;
  controls?: boolean;
  onPlay?: () => void;
  placeholder?: string;
  className?: string;
};

/** Vídeo vertical 9:16 (formato Reels). */
export function ReelsVideo({
  src,
  poster,
  controls = true,
  onPlay,
  placeholder = "Vídeo de apresentação do material",
  className = "",
}: Props) {
  const frame = `aspect-[9/16] w-[270px] overflow-hidden rounded-card md:w-[300px] ${className}`;

  if (!src) {
    return (
      <div
        className={`${frame} flex flex-col items-center justify-center gap-3 border-2 border-dashed border-primary-light bg-soft-pink p-6 text-center`}
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-surface text-primary shadow-soft">
          <Play aria-hidden="true" className="ml-1 size-7" strokeWidth={1.75} />
        </span>
        <span className="text-[13px] font-medium text-rose">{placeholder}</span>
      </div>
    );
  }

  return (
    <video
      className={`${frame} bg-ink object-cover`}
      src={src}
      poster={poster || undefined}
      controls={controls}
      playsInline
      preload="none"
      onPlay={onPlay}
    />
  );
}
