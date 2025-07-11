// components/ControlledVideoPlayer.tsx
"use client";
import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface ControlledVideoPlayerProps {
  src: string;
  isPlaying: boolean;
  onPlay: () => void;
}

export default function ControlledVideoPlayer({
  src,
  isPlaying,
  onPlay,
}: ControlledVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    } else if (video?.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
  }, [src]);

  useEffect(() => {
    if (!isPlaying && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <video
      ref={videoRef}
      controls
      onPlay={onPlay}
      className="w-full h-full rounded-xl object-cover"
    />
  );
}
