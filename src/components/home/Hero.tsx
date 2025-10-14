'use client';
import { Button } from "@/components/buttons";
import { trackChatOpen } from "@/utils/ga";
import Image from "next/image";


declare global {
  interface Window {
    $crisp?: Array<[string, string, unknown?]>;
    CRISP_WEBSITE_ID?: string;
  }
}

export default function Hero() {
  const handleClick = (): void => {
    // Evento GA4
    trackChatOpen("hero");

    // Abrir chat (Crisp)
    if (typeof window !== "undefined" && Array.isArray(window.$crisp)) {
      window.$crisp.push(["do", "chat:open"]);
      window.$crisp.push(["do", "message:show", ["text", "¡Hola! ¿En qué puedo ayudarte?"]]);
    }
  };

  return (
    <div className="relative grid items-center max-w-6xl gap-8 px-4 mx-auto lg:grid-cols-2">
      <Image
        src="/Familia.webp"
        alt="familia credizza"
        width={360}
        height={352}
        className="rounded-lg w-[360px] lg:w-[500px] lg:h-auto"
        priority
      />

      <div className="absolute bottom-[-16px] left-8 lg:static lg:mt-6">
        <div className="hidden lg:block">
          <h1 className="font-bold text-display">
            Créditos simples, ágiles y seguros para jubilados y pensionados
          </h1>
          <h2 className="mt-4 text-body">
            Hacelo desde tu casa por el chat de la web. Resolvemos tu consulta en minutos.
          </h2>
        </div>

        {/* <Button
          text="Chateá con nosotros"
          ariaLabel="Abrir chat de atención"
          className="bg-boton-primario text-texto-botones text-button lg:hover:bg-hover-primario"
          onClick={handleClick}
        />

        <p className="mt-2 text-xs text-texto-secundario">
          WhatsApp deshabilitado. Escribinos por el chat de la web 💬
        </p> */}
      </div>
    </div>
  );
}
