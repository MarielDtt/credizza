"use client";

import { useEffect, useState } from "react";

export default function SafetyNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timeout = window.setTimeout(() => setVisible(false), 3000);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div role="status" aria-live="polite" aria-atomic="true">
      {visible && (
        <div className="fixed left-1/2 top-6 z-[1500] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-xl border border-boton-primario/30 bg-background-secondary p-4 text-sm leading-relaxed text-texto-principal shadow-lg">
          <span aria-hidden="true" className="text-xl text-boton-primario">✓</span>
          <p className="flex-1 font-semibold">Recordá que Credizza nunca te solicita dinero.</p>
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Cerrar aviso"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl hover:bg-background-seccion focus-visible:outline focus-visible:outline-2 focus-visible:outline-boton-primario"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      )}
    </div>
  );
}
