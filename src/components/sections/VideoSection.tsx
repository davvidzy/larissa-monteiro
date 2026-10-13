import { useRef } from "react";
import { video } from "../../config/site";
import { track } from "../../lib/analytics";
import { Container } from "../ui/Container";
import { ReelsVideo } from "../ui/ReelsVideo";

export function VideoSection() {
  const tracked = useRef(false);

  const handlePlay = () => {
    if (tracked.current) return;
    tracked.current = true;
    track("video_play");
  };

  return (
    <section aria-label="Vídeo de apresentação do material" className="pb-12 md:pb-20">
      <Container narrow className="flex flex-col items-center text-center">
        <ReelsVideo src={video.src} poster={video.poster} onPlay={handlePlay} />
        <p className="mt-4 max-w-[300px] text-[13px] text-ink-soft md:text-[15px]">{video.caption}</p>
      </Container>
    </section>
  );
}
