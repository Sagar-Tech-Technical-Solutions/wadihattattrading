"use client";

import { useEffect, useRef, useState } from "react";
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
  }
}

const LANGS: { code: string; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "ar", label: "العربية", short: "AR" },
];

/** Read current target language from googtrans cookie */
function currentGoogTrans(): string {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(/googtrans=\/[^/]*\/([^;]+)/);
  return m ? decodeURIComponent(m[1]) : "en";
}

function setGoogTrans(lang: string) {
  if (typeof window === "undefined") return;
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
  if (typeof window === "undefined") return;
  if (document.getElementById("google-translate-script")) return;

  // Ensure hidden mount point exists in DOM
  if (!document.getElementById("google_translate_element")) {
    const el = document.createElement("div");
    el.id = "google_translate_element";
    el.setAttribute("aria-hidden", "true");
    document.body.appendChild(el);
  }

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

interface GoogleTranslateProps {
  isWhite?: boolean;
  compact?: boolean;
  inDrawer?: boolean;
}

export default function GoogleTranslate({
  isWhite = false,
  compact = false,
  inDrawer = false,
}: GoogleTranslateProps) {
  const [lang, setLang] = useState("en");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    patchDom();
    loadWidget();
    const active = currentGoogTrans();
    if (active && (active === "en" || active === "ar")) {
      setLang(active);
    }
  }, []);

  // Close dropdown on outside click
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
    setGoogTrans(code);

    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  };

  const currentOption = LANGS.find((l) => l.code === lang) || LANGS[0];

  // Render full width buttons inside mobile drawer
  if (inDrawer) {
    return (
      <div translate="no" className="notranslate space-y-2">
        <p className="font-mono uppercase tracking-wider text-[11px] text-neutral-500">
          Language / اللغة
        </p>
        <div className="grid grid-cols-2 gap-2">
          {LANGS.map((item) => {
            const active = item.code === lang;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => onChange(item.code)}
                className={`py-2 px-3 text-xs rounded-lg border text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  active
                    ? "border-neutral-900 bg-neutral-900 text-white font-medium"
                    : "border-neutral-200 text-neutral-700 hover:border-neutral-400 bg-neutral-50"
                }`}
              >
                <span>{item.label}</span>
                {active && <Check size={12} weight="bold" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={boxRef}
      translate="no"
      className="notranslate relative inline-flex items-center"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Change language"
        aria-expanded={open}
        className={`text-[11px] uppercase tracking-[0.14em] font-medium py-1 px-1 flex items-center gap-1.5 cursor-pointer select-none transition-colors duration-200 ${
          isWhite
            ? "text-neutral-800 hover:text-dark-gold"
            : "text-white/90 hover:text-gold"
        }`}
      >
        <Translate
          size={14}
          weight="regular"
          className={isWhite ? "text-neutral-600" : "text-white/80"}
        />
        <span>{compact ? currentOption.short : currentOption.label}</span>
        <CaretDown
          size={10}
          weight="bold"
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          } ${isWhite ? "text-neutral-500" : "text-white/70"}`}
        />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl py-1.5 z-50 text-neutral-900 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center gap-2 border-b border-neutral-100 px-3.5 py-2">
            <Translate size={14} weight="fill" className="text-[#4285F4]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-500">
              Translate Website
            </span>
          </div>
          <div className="py-1">
            {LANGS.map((l) => {
              const active = l.code === lang;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    if (l.code !== lang) onChange(l.code);
                  }}
                  className={`flex w-full items-center justify-between px-3.5 py-2 text-left text-xs transition-colors hover:bg-neutral-50 cursor-pointer ${
                    active
                      ? "font-semibold text-neutral-950 bg-neutral-50/80"
                      : "text-neutral-700"
                  }`}
                >
                  <span>{l.label}</span>
                  {active && (
                    <Check
                      size={13}
                      weight="bold"
                      className="text-neutral-900"
                    />
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-1.5 border-t border-neutral-100 bg-neutral-50 px-3.5 py-1.5 text-[10px] text-neutral-400">
            <span className="inline-flex gap-0.5" aria-hidden>
              <span className="h-1.5 w-1.5 rounded-full bg-[#4285F4]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#EA4335]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#FBBC05]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#34A853]" />
            </span>
            <span>Google Translate</span>
          </div>
        </div>
      )}
    </div>
  );
}
