"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Translate, Check, CaretDown } from "@phosphor-icons/react/dist/ssr";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (opts: object, el: string) => void;
      };
    };
    __gtPatched?: boolean;
    __heroAnimationComplete?: boolean;
  }
}

// languages offered in the manual switcher
const LANGS: { code: string; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

/** current target language from the googtrans cookie ("/en/hi" → "hi") */
function currentGoogTrans(): string {
  const m = document.cookie.match(/googtrans=\/[^/]*\/([^;]+)/);
  return m ? decodeURIComponent(m[1]) : "en";
}

function setGoogTrans(lang: string) {
  const hostname = window.location.hostname;
  const parts = hostname.split(".");
  const domains: string[] = ["", `.${hostname}`];
  if (parts.length > 2) {
    domains.push(`.${parts.slice(-2).join(".")}`);
  }

  domains.forEach((d) => {
    const domainPart = d ? `; domain=${d}` : "";
    document.cookie = `googtrans=/en/${lang}; path=/${domainPart}; max-age=31536000`;
  });
}

/** Guard React against Google Translate replacing text nodes */
function patchDom() {
  if (typeof window === "undefined" || window.__gtPatched) return;
  window.__gtPatched = true;

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    try {
      return originalRemoveChild.call(this, child) as T;
    } catch {
      return child;
    }
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(
    newNode: T,
    referenceNode: Node | null,
  ): T {
    try {
      return originalInsertBefore.call(this, newNode, referenceNode) as T;
    } catch {
      return newNode;
    }
  };
}

function loadWidget() {
  if (document.getElementById("google-translate-script")) return;
  window.googleTranslateElementInit = () => {
    if (!window.google?.translate) return;
    new window.google.translate.TranslateElement(
      { pageLanguage: "en", autoDisplay: false },
      "google_translate_element",
    );
  };
  const s = document.createElement("script");
  s.id = "google-translate-script";
  s.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  s.async = true;
  document.body.appendChild(s);
}

export default function GoogleTranslate() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [isVisible, setIsVisible] = useState(!isHomepage);

  const [lang, setLang] = useState("en");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // On homepage, delay appearance until hero entrance animation completes
  useEffect(() => {
    if (!isHomepage) {
      setIsVisible(true);
      return;
    }

    if (
      typeof window !== "undefined" &&
      (window as any).__heroAnimationComplete
    ) {
      setIsVisible(true);
      return;
    }

    const onComplete = () => {
      setIsVisible(true);
    };

    const onReveal = () => {
      setTimeout(onComplete, 800);
    };

    window.addEventListener("hero-animation-complete", onComplete);
    window.addEventListener("fabric-loader-reveal", onReveal);

    const safetyTimer = setTimeout(onComplete, 4500);

    return () => {
      window.removeEventListener("hero-animation-complete", onComplete);
      window.removeEventListener("fabric-loader-reveal", onReveal);
      clearTimeout(safetyTimer);
    };
  }, [isHomepage]);

  useEffect(() => {
    patchDom();
    let cancelled = false;

    // Force clear the googtrans cookie on every load to ensure it starts in English
    setGoogTrans("en");
    if (!cancelled) setLang("en");

    loadWidget();

    return () => {
      cancelled = true;
    };
  }, []);

  // close the dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const onChange = (code: string) => {
    setLang(code);

    // Find the hidden Google Translate select element and trigger a change
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event("change"));
    }
  };

  const selectValue = LANGS.some((l) => l.code === lang) ? lang : "en";
  const currentLabel =
    LANGS.find((l) => l.code === selectValue)?.label ?? "English";

  return (
    <>
      {/* hidden Google mount point */}
      <div id="google_translate_element" aria-hidden />

      {/* language switcher — Google Translate style */}
      <div
        ref={boxRef}
        translate="no"
        className={`notranslate fixed bottom-4 left-4 z-40 transition-all duration-700 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {open && (
          <div className="absolute bottom-full left-0 mb-2 w-60 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_70px_-22px_rgba(6,42,32,0.55)]">
            <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
              <Translate size={15} weight="fill" className="text-[#4285F4]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft">
                Translate this page
              </span>
            </div>
            <div className="max-h-72 overflow-y-auto py-1.5">
              {LANGS.map((l) => {
                const active = l.code === selectValue;
                return (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      if (l.code !== selectValue) onChange(l.code);
                    }}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-[13.5px] transition-colors hover:bg-paper ${
                      active ? "font-semibold text-brand-deep" : "text-ink"
                    }`}
                  >
                    <span>{l.label}</span>
                    {active && (
                      <Check size={14} weight="bold" className="text-brand" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-1.5 border-t border-line bg-paper px-4 py-2 text-[11px] text-ink-faint">
              <span className="inline-flex gap-0.5" aria-hidden>
                <span className="h-2 w-2 rounded-full bg-[#4285F4]" />
                <span className="h-2 w-2 rounded-full bg-[#EA4335]" />
                <span className="h-2 w-2 rounded-full bg-[#FBBC05]" />
                <span className="h-2 w-2 rounded-full bg-[#34A853]" />
              </span>
              Powered by Google Translate
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Change language"
          aria-expanded={open}
          className="flex items-center gap-2 rounded-full border border-line bg-white/95 py-2 pl-3.5 pr-3 shadow-[0_12px_30px_-14px_rgba(6,42,32,0.45)] backdrop-blur transition-shadow hover:shadow-[0_16px_36px_-14px_rgba(6,42,32,0.5)] cursor-pointer"
        >
          <Translate size={18} weight="fill" className="text-[#4285F4]" />
          <span className="text-[13px] font-semibold text-ink">
            {currentLabel}
          </span>
          <CaretDown
            size={12}
            weight="bold"
            className={`text-ink-faint transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </>
  );
}
