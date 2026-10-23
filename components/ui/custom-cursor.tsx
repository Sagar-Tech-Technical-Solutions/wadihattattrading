"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // High performance cursor positioning using GSAP quickTo
    const cursorX = gsap.quickTo(cursor, "x", { duration: 0.22, ease: "power3.out" });
    const cursorY = gsap.quickTo(cursor, "y", { duration: 0.22, ease: "power3.out" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });

    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to([cursor, dot], { opacity: 1, duration: 0.25 });
      }

      const { clientX, clientY } = e;
      cursorX(clientX);
      cursorY(clientY);
      dotX(clientX);
      dotY(clientY);

      // Check if hovering clickable elements
      const target = e.target as HTMLElement | null;
      const isClickable = Boolean(
        target?.closest(
          "a, button, [role='button'], input, textarea, select, .cursor-pointer, [data-cursor-hover]",
        ),
      );

      if (isClickable) {
        gsap.to(cursor, {
          scale: 3.2,
          backgroundColor: "rgba(251, 223, 145, 0.2)",
          borderColor: "#fbdf91",
          borderWidth: "1.5px",
          duration: 0.28,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(dot, {
          scale: 0.5,
          opacity: 0.4,
          duration: 0.2,
          overwrite: "auto",
        });
      } else {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "rgba(251, 223, 145, 0.6)",
          borderColor: "rgba(251, 223, 145, 0.9)",
          borderWidth: "1px",
          duration: 0.28,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(dot, {
          scale: 1,
          opacity: 1,
          duration: 0.2,
          overwrite: "auto",
        });
      }
    };

    const handleMouseDown = () => {
      gsap.to(cursor, { scale: 0.8, duration: 0.15 });
    };

    const handleMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
    };

    const handleMouseLeave = () => {
      isVisible = false;
      gsap.to([cursor, dot], { opacity: 0, duration: 0.25 });
    };

    const handleMouseEnter = () => {
      isVisible = true;
      gsap.to([cursor, dot], { opacity: 1, duration: 0.25 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <>
      {/* Outer interactive expanding circle */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[99999] opacity-0 hidden md:block mix-blend-difference"
        style={{
          border: "1px solid rgba(251, 223, 145, 0.9)",
          backgroundColor: "rgba(251, 223, 145, 0.6)",
        }}
      />
      {/* Precision inner micro-dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold pointer-events-none z-[99999] opacity-0 hidden md:block mix-blend-difference"
      />
    </>
  );
}
