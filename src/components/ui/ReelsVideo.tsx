import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type VideoSource = { src: string; type: string };

type Props = {
  /** Fontes em ordem de preferência. Vazio = placeholder. */
  sources: VideoSource[];
  poster?: string;
  /** Chamado a cada vez que o vídeo começa a tocar. */
  onPlay?: () => void;
  placeholder?: string;
  className?: string;
};

/** 75 → "1:15" */
function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/**
 * Vídeo vertical 9:16 no formato VSL:
 * - começa pausado (com capa) e toca/pausa ao tocar na tela;
 * - mostra o tempo assistido e quanto falta, numa barra que não permite avançar;
 * - bloqueia avanço por menu de contexto, teclas de mídia ou PiP.
 */
export function ReelsVideo({
  sources,
  poster,
  onPlay,
  placeholder = "Vídeo de apresentação do material",
  className = "",
}: Props) {
  const frame = `relative aspect-[9/16] w-[270px] overflow-hidden rounded-card md:w-[300px] ${className}`;

  if (sources.length === 0) {
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

  return <VslPlayer sources={sources} poster={poster} onPlay={onPlay} frame={frame} />;
}

function VslPlayer({
  sources,
  poster,
  onPlay,
  frame,
}: Pick<Props, "sources" | "poster" | "onPlay"> & { frame: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  /** Maior ponto já assistido: impede pular para frente. */
  const watchedRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onTime = () => {
      if (!v.seeking && v.currentTime > watchedRef.current) watchedRef.current = v.currentTime;
      setCurrent(v.currentTime);
    };
    // Qualquer tentativa de avançar (teclas de mídia, menu nativo...) volta ao ponto assistido
    const onSeeking = () => {
      if (v.currentTime > watchedRef.current + 0.5) v.currentTime = watchedRef.current;
    };
    const onMeta = () => setDuration(v.duration);
    const onPlayEvt = () => {
      setPlaying(true);
      setEnded(false);
      onPlay?.();
    };
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      setPlaying(false);
      setEnded(true);
    };

    v.addEventListener("timeupdate", onTime);
    v.addEventListener("seeking", onSeeking);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("play", onPlayEvt);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);
    if (v.readyState >= 1) onMeta();

    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("seeking", onSeeking);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("play", onPlayEvt);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
    };
  }, [onPlay]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (ended) {
      watchedRef.current = 0;
      v.currentTime = 0;
    }
    if (v.paused) void v.play();
    else v.pause();
  };

  const remaining = Math.max(0, duration - current);
  const progress = duration ? (current / duration) * 100 : 0;
  const label = ended ? "Assistir novamente" : playing ? "Pausar vídeo" : "Reproduzir vídeo";

  return (
    <div className={`${frame} bg-ink shadow-card`}>
      <video
        ref={videoRef}
        className="size-full object-cover"
        poster={poster}
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload noplaybackrate noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>

      {/* Área de toque: o vídeo inteiro toca/pausa */}
      <button
        type="button"
        onClick={toggle}
        onContextMenu={(e) => e.preventDefault()}
        aria-label={label}
        className="group absolute inset-0 flex cursor-pointer items-center justify-center focus-visible:outline-offset-[-4px]"
      >
        {!playing && (
          <span className="flex size-[72px] items-center justify-center rounded-full bg-white/95 text-primary shadow-featured transition-transform duration-200 group-hover:scale-105">
            {ended ? (
              <RotateCcw aria-hidden="true" className="size-8" strokeWidth={2} />
            ) : (
              <Play aria-hidden="true" className="ml-1 size-8 fill-primary" strokeWidth={2} />
            )}
          </span>
        )}
      </button>

      {/* Tempo assistido / restante + barra de progresso (somente leitura) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pt-8 pb-3">
        <div className="flex items-center justify-between text-[12px] font-semibold text-white tabular-nums">
          <span className="inline-flex items-center gap-1.5">
            {playing ? (
              <Pause aria-hidden="true" className="size-3.5 fill-white" strokeWidth={0} />
            ) : (
              <Play aria-hidden="true" className="size-3.5 fill-white" strokeWidth={0} />
            )}
            {formatTime(current)}
          </span>
          <span>-{formatTime(remaining)}</span>
        </div>
        <div
          className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/30"
          role="progressbar"
          aria-label="Progresso do vídeo"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(current)}
          aria-valuetext={`${formatTime(current)} de ${formatTime(duration)}`}
        >
          <div className="h-full rounded-full bg-primary-light" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
