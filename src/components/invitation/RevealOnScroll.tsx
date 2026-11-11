"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-up" | "fade";
  delay?: number; // milliseconds
  duration?: number; // milliseconds
  className?: string;
  threshold?: number;
}

export function RevealOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 750,
  className = "",
  threshold = 0.08,
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Bidirectional IntersectionObserver: activates on scroll down AND scroll up
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset visibility when element exits the viewport so it can re-animate when scrolled back
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -25px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const getAnimationStyles = () => {
    // Ultra-smooth spring-like cubic-bezier ease out with GPU acceleration
    const baseTransitions = `transition-all ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu`;

    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return `${baseTransitions} opacity-0 translate-y-10 scale-[0.98]`;
        case "fade-down":
          return `${baseTransitions} opacity-0 -translate-y-10 scale-[0.98]`;
        case "fade-left":
          return `${baseTransitions} opacity-0 translate-x-10 scale-[0.99]`;
        case "fade-right":
          return `${baseTransitions} opacity-0 -translate-x-10 scale-[0.99]`;
        case "scale-up":
          return `${baseTransitions} opacity-0 scale-90 translate-y-6`;
        case "fade":
        default:
          return `${baseTransitions} opacity-0`;
      }
    }

    return `${baseTransitions} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div
      ref={ref}
      style={{
        // Use delay only when entering into view; reset quickly (200ms) with 0 delay when exiting offscreen
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
        transitionDuration: isVisible ? `${duration}ms` : "200ms",
      }}
      className={`${getAnimationStyles()} ${className}`}
    >
      {children}
    </div>
  );
}
