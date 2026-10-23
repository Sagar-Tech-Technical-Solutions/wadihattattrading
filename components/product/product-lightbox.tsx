"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface ProductLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  variantName?: string;
  allImages: string[];
  initialIndex?: number;
}

export default function ProductLightbox({
  isOpen,
  onClose,
  productName,
  allImages,
  initialIndex = 0,
}: ProductLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1); // 1 = fit, up to 3.5x
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;

  // Reset zoom & pan when image changes or lightbox opens
  const resetZoomAndPan = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
  }, []);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    resetZoomAndPan();
  }, [initialIndex, isOpen, resetZoomAndPan]);

  // Adjust zoom with bounds [1, 3.5]
  const updateZoom = useCallback((newZoom: number) => {
    const clamped = Math.max(1, Math.min(3.5, Number(newZoom.toFixed(2))));
    setZoom(clamped);
    if (clamped === 1) {
      setPan({ x: 0, y: 0 });
    } else {
      const maxPanX = 450 * (clamped - 1);
      const maxPanY = 400 * (clamped - 1);
      setPan((prev) => ({
        x: Math.max(-maxPanX, Math.min(maxPanX, prev.x)),
        y: Math.max(-maxPanY, Math.min(maxPanY, prev.y)),
      }));
    }
  }, []);

  const updateZoomRef = useRef(updateZoom);
  updateZoomRef.current = updateZoom;

  // Complete background scroll lock + non-passive wheel interceptor
  useEffect(() => {
    if (isOpen) {
      // 1. Freeze Lenis smooth scroll
      const lenis = (window as any).lenis;
      lenis?.stop();
      document.documentElement.classList.add("lenis-stopped");

      // 2. Lock body and html scrolling
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      // 3. Intercept all wheel events non-passively to zoom fabric without scrolling the page
      const handleWindowWheel = (e: WheelEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const delta = e.deltaY < 0 ? 0.3 : -0.3;
        updateZoomRef.current(zoomRef.current + delta);
      };

      const handleWindowTouch = (e: TouchEvent) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      };

      window.addEventListener("wheel", handleWindowWheel, { passive: false });
      window.addEventListener("touchmove", handleWindowTouch, { passive: false });

      // 4. Keyboard shortcuts
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowLeft") {
          resetZoomAndPan();
          setCurrentIndex((prev) =>
            prev > 0 ? prev - 1 : allImages.length - 1,
          );
        }
        if (e.key === "ArrowRight") {
          resetZoomAndPan();
          setCurrentIndex((prev) =>
            prev < allImages.length - 1 ? prev + 1 : 0,
          );
        }
        if (e.key === "+" || e.key === "=") {
          updateZoomRef.current(zoomRef.current + 0.5);
        }
        if (e.key === "-" || e.key === "_") {
          updateZoomRef.current(zoomRef.current - 0.5);
        }
        if (e.key === "0") {
          resetZoomAndPan();
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        lenis?.start();
        document.documentElement.classList.remove("lenis-stopped");
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        window.removeEventListener("wheel", handleWindowWheel);
        window.removeEventListener("touchmove", handleWindowTouch);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, allImages.length, onClose, resetZoomAndPan]);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartRef.current = {
      x: e.clientX - pan.x,
      y: e.clientY - pan.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;

    if (Math.abs(newX - pan.x) > 3 || Math.abs(newY - pan.y) > 3) {
      hasDraggedRef.current = true;
    }

    const maxPanX = 450 * (zoom - 1);
    const maxPanY = 400 * (zoom - 1);
    setPan({
      x: Math.max(-maxPanX, Math.min(maxPanX, newX)),
      y: Math.max(-maxPanY, Math.min(maxPanY, newY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Drag Handlers (Mobile & Tablet)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom <= 1 || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartRef.current = {
      x: touch.clientX - pan.x,
      y: touch.clientY - pan.y,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || zoom <= 1 || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const newX = touch.clientX - dragStartRef.current.x;
    const newY = touch.clientY - dragStartRef.current.y;

    hasDraggedRef.current = true;
    const maxPanX = 450 * (zoom - 1);
    const maxPanY = 400 * (zoom - 1);
    setPan({
      x: Math.max(-maxPanX, Math.min(maxPanX, newX)),
      y: Math.max(-maxPanY, Math.min(maxPanY, newY)),
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Double click to toggle between 1x and 2.5x zoom
  const handleDoubleClick = () => {
    if (zoom > 1) {
      resetZoomAndPan();
    } else {
      updateZoom(2.5);
    }
  };

  // Single click toggle on canvas (only if user did NOT drag)
  const handleCanvasClick = () => {
    if (hasDraggedRef.current) return;
    if (zoom === 1) {
      updateZoom(2.2);
    } else {
      resetZoomAndPan();
    }
  };

  if (!isOpen || allImages.length === 0) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md select-none animate-in fade-in duration-200 overflow-hidden overscroll-none touch-none"
      onClick={onClose}
    >
      {/* FULL-HEIGHT IMAGE CANVAS (Spans 100% of the screen) */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onDoubleClick={handleDoubleClick}
          onClick={handleCanvasClick}
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
            transition: isDragging
              ? "none"
              : "transform 0.25s cubic-bezier(0.2, 0, 0, 1)",
          }}
          className={`relative w-full h-full select-none ${
            zoom > 1
              ? isDragging
                ? "cursor-grabbing"
                : "cursor-grab"
              : "cursor-zoom-in"
          }`}
        >
          <Image
            src={allImages[currentIndex]}
            alt={`${productName} view ${currentIndex + 1}`}
            fill
            sizes="100vw"
            className="object-contain pointer-events-none p-2 sm:p-4"
            priority
            draggable={false}
          />
        </div>
      </div>

      {/* FLOATING TOP HEADER CONTROLS */}
      <div
        className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 z-30 pointer-events-none flex items-center justify-between gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Title Pill */}
        <div className="pointer-events-auto bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-lg max-w-[50vw] sm:max-w-md truncate">
          <h4 className="font-display text-xs sm:text-sm text-white font-normal truncate">
            {productName}
          </h4>
        </div>

        {/* Floating Zoom & Close HUD */}
        <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/15 shadow-lg">
          {/* Zoom Out Button */}
          <button
            type="button"
            onClick={() => updateZoom(zoom - 0.5)}
            disabled={zoom <= 1}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
            aria-label="Zoom Out"
            title="Zoom Out (-)"
          >
            −
          </button>

          {/* Zoom Level Readout / Reset */}
          <button
            type="button"
            onClick={() => (zoom > 1 ? resetZoomAndPan() : updateZoom(2.5))}
            className="px-2.5 py-1 rounded-full text-xs font-mono text-white/90 hover:text-white transition-colors cursor-pointer"
            title="Click to toggle 1x / 2.5x"
          >
            {Math.round(zoom * 100)}%
          </button>

          {/* Zoom In Button */}
          <button
            type="button"
            onClick={() => updateZoom(zoom + 0.5)}
            disabled={zoom >= 3.5}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
            aria-label="Zoom In"
            title="Zoom In (+)"
          >
            +
          </button>

          <div className="w-px h-4 bg-white/20 mx-1" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-xs font-semibold transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            ✕
          </button>
        </div>
      </div>

      {/* FLOATING NAVIGATION ARROWS */}
      {allImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              resetZoomAndPan();
              setCurrentIndex((prev) =>
                prev > 0 ? prev - 1 : allImages.length - 1,
              );
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xl"
            aria-label="Previous image"
          >
            ←
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              resetZoomAndPan();
              setCurrentIndex((prev) =>
                prev < allImages.length - 1 ? prev + 1 : 0,
              );
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xl"
            aria-label="Next image"
          >
            →
          </button>
        </>
      )}

      {/* FLOATING BOTTOM CONTROLS (Thumbnails & Hint) */}
      <div
        className="absolute bottom-4 sm:bottom-6 inset-x-0 z-30 pointer-events-none flex flex-col items-center gap-2.5 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag & Zoom Hint Overlay */}
        <div className="pointer-events-none bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[11px] font-mono text-white/80 shadow-lg hidden sm:flex items-center gap-2">
          {zoom > 1 ? (
            <>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                />
              </svg>
              <span>
                Click &amp; drag to inspect weave • Double-click to reset
              </span>
            </>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
              <span>Click to zoom up to 350% • Scroll wheel to adjust</span>
            </>
          )}
        </div>

        {/* Floating Thumbnails Glass Strip */}
        {allImages.length > 1 && (
          <div className="pointer-events-auto bg-black/60 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/15 flex items-center justify-center gap-2 shadow-2xl max-w-full overflow-x-auto">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setCurrentIndex(idx);
                  resetZoomAndPan();
                }}
                className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                  currentIndex === idx
                    ? "border-[#ddaf4d] scale-105 ring-2 ring-[#ddaf4d]/50"
                    : "border-white/20 opacity-50 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
