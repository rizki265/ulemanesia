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
  duration = 700,
  className = "",
  threshold = 0.15,
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once animated, unobserve to keep it visible
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const getAnimationStyles = () => {
    const baseTransitions = `transition-all ease-out`;

    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return `${baseTransitions} opacity-0 translate-y-8`;
        case "fade-down":
          return `${baseTransitions} opacity-0 -translate-y-8`;
        case "fade-left":
          return `${baseTransitions} opacity-0 translate-x-8`;
        case "fade-right":
          return `${baseTransitions} opacity-0 -translate-x-8`;
        case "scale-up":
          return `${baseTransitions} opacity-0 scale-95 translate-y-4`;
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
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
      className={`${getAnimationStyles()} ${className}`}
    >
      {children}
    </div>
  );
}

