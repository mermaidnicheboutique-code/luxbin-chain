"use client";

import { useState, useEffect } from "react";

interface AnimatedTokenLogoProps {
  /** Type of animated logo */
  type?: "video" | "gif" | "lottie" | "image";
  /** Source URL for the logo */
  src?: string;
  /** Fallback static image */
  fallback?: string;
  /** Size in pixels */
  size?: number;
  /** Additional CSS classes */
  className?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Whether to show glow effect */
  glow?: boolean;
  /** Whether to auto-play video/animation */
  autoPlay?: boolean;
  /** Whether to loop */
  loop?: boolean;
}

export function AnimatedTokenLogo({
  type = "video",
  src = "/token-logo.mp4",
  fallback = "/token-logo-static.png",
  size = 48,
  className = "",
  alt = "LUXBIN Token",
  glow = true,
  autoPlay = true,
  loop = true,
}: AnimatedTokenLogoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const glowClass = glow
    ? "drop-shadow-[0_0_15px_rgba(147,51,234,0.6)] hover:drop-shadow-[0_0_25px_rgba(147,51,234,0.8)] transition-all duration-300"
    : "";

  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  // Video logo
  if (type === "video" && !error) {
    return (
      <div className={`relative overflow-hidden rounded-full ${glowClass} ${className}`} style={containerStyle}>
        <video
          autoPlay={autoPlay}
          loop={loop}
          muted
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setError(true)}
          style={{ display: isLoaded || error ? 'block' : 'none' }}
        >
          <source src={src} type="video/mp4" />
          <source src={src.replace('.mp4', '.webm')} type="video/webm" />
        </video>
        {!isLoaded && !error && (
          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 animate-pulse rounded-full" />
        )}
        {error && fallback && (
          <img src={fallback} alt={alt} className="w-full h-full object-cover" />
        )}
      </div>
    );
  }

  // GIF logo
  if (type === "gif" && !error) {
    return (
      <div className={`relative overflow-hidden rounded-full ${glowClass} ${className}`} style={containerStyle}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
        />
        {!isLoaded && !error && (
          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 animate-pulse rounded-full" />
        )}
      </div>
    );
  }

  // Lottie animation (would need @lottiefiles/react-lottie-player)
  if (type === "lottie" && !error) {
    return (
      <div className={`relative overflow-hidden rounded-full ${glowClass} ${className}`} style={containerStyle}>
        {/* Placeholder for Lottie - install @lottiefiles/react-lottie-player to enable */}
        <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
          LX
        </div>
      </div>
    );
  }

  // Fallback to static image
  return (
    <div className={`relative overflow-hidden rounded-full ${glowClass} ${className}`} style={containerStyle}>
      <img
        src={fallback || src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

/**
 * Preset token logo with LUXBIN branding using background globe videos
 */
export function LuxbinTokenLogo({ size = 48, animated = true, className = "", videoIndex = 2 }: {
  size?: number;
  animated?: boolean;
  className?: string;
  /** Which background video to use (0-5) */
  videoIndex?: number;
}) {
  const videos = [
    "/bg-video-1.mp4",
    "/bg-video-2.mp4",
    "/bg-video-3.mp4", // Globe/particle effects
    "/bg-video-4.mp4",
    "/bg-video-5.mp4",
    "/bg-video-6.mp4"
  ];

  if (animated) {
    return (
      <AnimatedTokenLogo
        type="video"
        src={videos[videoIndex]}
        fallback="/token-logo-static.png"
        size={size}
        className={className}
        alt="LUXBIN Token"
        glow={true}
      />
    );
  }

  // Static version with gradient and LX text
  return (
    <div
      className={`relative overflow-hidden rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 animate-gradient-shift drop-shadow-[0_0_15px_rgba(147,51,234,0.6)] ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <div className="w-full h-full flex items-center justify-center text-white font-bold" style={{ fontSize: `${size * 0.4}px` }}>
        LX
      </div>
    </div>
  );
}

/**
 * Rotating token logo that cycles through all background videos
 */
export function LuxbinTokenLogoRotating({ size = 48, className = "" }: {
  size?: number;
  className?: string;
}) {
  const [currentVideo, setCurrentVideo] = useState(0);

  const videos = [
    "/bg-video-1.mp4",
    "/bg-video-2.mp4",
    "/bg-video-3.mp4",
    "/bg-video-4.mp4",
    "/bg-video-5.mp4",
    "/bg-video-6.mp4"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 8000); // Change video every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-full drop-shadow-[0_0_15px_rgba(147,51,234,0.6)] hover:drop-shadow-[0_0_25px_rgba(147,51,234,0.8)] transition-all duration-300 ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <video
        key={currentVideo}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover scale-150" // Scale up to fill circle better
      >
        <source src={videos[currentVideo]} type="video/mp4" />
      </video>
    </div>
  );
}

/**
 * Token logo with pulsing animation for loading states
 */
export function LuxbinTokenLogoPulsing({ size = 48, className = "" }: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 animate-pulse drop-shadow-[0_0_20px_rgba(147,51,234,0.8)] ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <div className="w-full h-full flex items-center justify-center text-white font-bold animate-spin-slow" style={{ fontSize: `${size * 0.4}px` }}>
        LX
      </div>
    </div>
  );
}
