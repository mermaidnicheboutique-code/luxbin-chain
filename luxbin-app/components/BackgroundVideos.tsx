"use client";

import { useState, useEffect, useRef } from "react";

export function BackgroundVideos() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const videos = [
    "/bg-video-1.mp4",
    "/bg-video-2.mp4",
    "/bg-video-3.mp4",
    "/bg-video-4.mp4",
    "/bg-video-5.mp4",
    "/bg-video-6.mp4"
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force play on mount and video change
    const playVideo = () => {
      video.play().catch(err => {
        console.log("Autoplay prevented, will retry on interaction:", err);
        // Retry on any user interaction
        const retry = () => {
          video.play().catch(() => {});
          document.removeEventListener('click', retry);
          document.removeEventListener('touchstart', retry);
          document.removeEventListener('keydown', retry);
        };
        document.addEventListener('click', retry, { once: true });
        document.addEventListener('touchstart', retry, { once: true });
        document.addEventListener('keydown', retry, { once: true });
      });
    };

    // Try to play immediately
    playVideo();

    // Also try on visibility change (when user comes back to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        playVideo();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentVideo]);

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <video
        ref={videoRef}
        key={currentVideo}
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ opacity: 0.3 }}
        muted
        playsInline
        autoPlay
        loop={false}
        onEnded={handleVideoEnd}
      >
        <source src={videos[currentVideo]} type="video/mp4" />
      </video>
    </div>
  );
}
