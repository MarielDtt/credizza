"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function SafetyNotice() {
  const [visible, setVisible] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setVisible(false);
      if (event.key === "Tab") {
        event.preventDefault();
        closeButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [visible]);

  useEffect(() => {
    if (!visible || !imageReady) return;
    const timeout = window.setTimeout(() => setVisible(false), 3000);
    return () => window.clearTimeout(timeout);
  }, [visible, imageReady]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[1500] flex items-center justify-center bg-black/35 p-4 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="safety-notice-title"
        className="relative max-h-[90dvh] w-full max-w-sm overflow-y-auto rounded-2xl bg-background-secondary text-texto-principal shadow-2xl"
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-t-2xl">
          <Image
            src="/aviso-seguridad-v1.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 420px) calc(100vw - 32px), 384px"
            className="object-cover"
            onLoad={() => setImageReady(true)}
            onError={() => setImageReady(true)}
          />
          <div className="absolute left-4 top-4 rounded-xl bg-background-secondary/95 p-2 shadow-sm">
            <Image src="/Logo-Navbar.webp" alt="Credizza" width={48} height={48} />
          </div>
        </div>
        <button
          ref={closeButton}
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Cerrar aviso"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background-secondary text-2xl shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-boton-primario"
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="px-6 py-5 text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-boton-primario">Tu seguridad primero</p>
          <h2 id="safety-notice-title" className="text-lg font-semibold leading-relaxed">
            Recordá que Credizza nunca te solicita dinero.
          </h2>
          <p className="mt-4 text-[11px] opacity-70">Este aviso se cierra en 3 segundos.</p>
        </div>
      </section>
    </div>
  );
}
