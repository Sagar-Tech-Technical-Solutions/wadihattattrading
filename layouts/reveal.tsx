"use client";

import React, { useEffect, useRef, type ReactNode } from "react";

export type RevealVariant = "up" | "down" | "left" | "right" | "fade" | "scale";

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  variant?: RevealVariant;
  className?: string;
  as?: React.ElementType;
}

export function Reveal({
  children,
  delay = 0,
  duration,
  variant = "up",
  className = "",
  as: Component = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if element is already within viewport on initial mount
    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (inViewport) {
      const timer = setTimeout(() => {
        el.classList.add("is-visible");
      }, Math.min(delay, 250));
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const style: React.CSSProperties = {
    "--reveal-delay": `${delay}ms`,
    ...(duration ? { "--reveal-duration": `${duration}ms` } : {}),
  } as React.CSSProperties;

  return (
    <Component
      ref={ref}
      className={`reveal ${className}`}
      data-reveal-variant={variant}
      style={style}
    >
      {children}
    </Component>
  );
}

export function RevealGroup({
  children,
  baseDelay = 0,
  stagger = 90,
  variant = "up",
  className = "",
}: {
  children: ReactNode;
  baseDelay?: number;
  stagger?: number;
  variant?: RevealVariant;
  className?: string;
}) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return child;
        return (
          <Reveal delay={baseDelay + idx * stagger} variant={variant}>
            {child}
          </Reveal>
        );
      })}
    </div>
  );
}
