"use client";

import { useEffect, useRef, useState } from "react";

interface ChatbotAvatarProps {
  emotion?: "neutral" | "excited" | "positive" | "confused" | "frustrated" | "thinking";
  isTyping?: boolean;
  size?: number;
}

export function ChatbotAvatar({
  emotion = "neutral",
  isTyping = false,
  size = 80
}: ChatbotAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideo, setCurrentVideo] = useState("/bg-video-1.mp4");
  const [glowColor, setGlowColor] = useState("rgba(139, 92, 246, 0.5)");

  // Change glow color based on emotion (using the same cool animation video)
  useEffect(() => {
    // Always use the cool chatbot avatar animation
    setCurrentVideo("/chatbot-avatar.mp4");

    // Just change the glow color based on emotion
    switch (emotion) {
      case "excited":
        setGlowColor("rgba(236, 72, 153, 0.8)"); // Pink glow
        break;
      case "positive":
        setGlowColor("rgba(34, 197, 94, 0.6)"); // Green glow
        break;
      case "confused":
        setGlowColor("rgba(251, 191, 36, 0.6)"); // Yellow glow
        break;
      case "frustrated":
        setGlowColor("rgba(239, 68, 68, 0.6)"); // Red glow
        break;
      case "thinking":
        setGlowColor("rgba(59, 130, 246, 0.7)"); // Blue glow
        break;
      default:
        setGlowColor("rgba(139, 92, 246, 0.5)"); // Purple glow
    }
  }, [emotion]);

  // Pulse effect when typing
  const pulseScale = isTyping ? "scale(1.1)" : "scale(1)";

  return (
    <div
      className="relative"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {/* Glowing outer ring */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          filter: "blur(10px)",
          transform: pulseScale,
          transition: "all 0.3s ease",
        }}
      />

      {/* Video container */}
      <div
        className="relative rounded-full overflow-hidden border-2 border-white/20"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transform: pulseScale,
          transition: "all 0.3s ease",
        }}
      >
        <video
          ref={videoRef}
          src={currentVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{
            filter: isTyping ? "brightness(1.2) saturate(1.3)" : "brightness(1) saturate(1)",
            transition: "filter 0.3s ease",
          }}
        />

        {/* Overlay gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

        {/* Thinking indicator */}
        {isTyping && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="flex gap-1">
              <div
                className="w-2 h-2 rounded-full bg-white animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 rounded-full bg-white animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 rounded-full bg-white animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Photonic particles */}
      {isTyping && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-ping"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 200}ms`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Emotion indicator badge
interface EmotionBadgeProps {
  emotion: string;
}

export function EmotionBadge({ emotion }: EmotionBadgeProps) {
  const emotionConfig: Record<string, { emoji: string; label: string; color: string }> = {
    excited: { emoji: "🤩", label: "Excited", color: "bg-pink-500/20 border-pink-500/50 text-pink-300" },
    positive: { emoji: "😊", label: "Happy", color: "bg-green-500/20 border-green-500/50 text-green-300" },
    confused: { emoji: "🤔", label: "Thinking", color: "bg-yellow-500/20 border-yellow-500/50 text-yellow-300" },
    frustrated: { emoji: "😟", label: "Concerned", color: "bg-red-500/20 border-red-500/50 text-red-300" },
    neutral: { emoji: "🤖", label: "Ready", color: "bg-purple-500/20 border-purple-500/50 text-purple-300" },
    thinking: { emoji: "💭", label: "Analyzing", color: "bg-blue-500/20 border-blue-500/50 text-blue-300" },
  };

  const config = emotionConfig[emotion] || emotionConfig.neutral;

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs ${config.color}`}>
      <span>{config.emoji}</span>
      <span>{config.label}</span>
    </div>
  );
}
