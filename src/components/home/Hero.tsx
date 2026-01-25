import Image from "next/image";
import { Button } from "../buttons";

declare global {
  interface Window {
    $crisp?: Array<[string, string, unknown?]>;
    CRISP_WEBSITE_ID?: string;
  }
}
const handleWhatsApp = () => {
  const phone = "5491126289448"; // formato recomendado: 54 + 9 + código de área + número (sin 0 ni 15)
  const message = "Hola, quiero consultar por un préstamo."; // opcional
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
};

const handleClick = () => {
  if (window.$crisp) {
    window.$crisp.push(["do", "chat:open"]);
  }
};

export default function Hero() {
  return (
    <section className="relative w-full h-[380px] lg:h-[480px] lg:bg-background-seccion">

      {/* IMAGEN DESKTOP FULL WIDTH */}
      <Image
        src="/Credizza.webp"
        alt="familia credizza prestamos"
        fill
        className="hidden object-cover ml-4 rounded-lg lg:block"
        priority
      />

      {/* TEXTO DESKTOP (SOBRE LA IMAGEN) */}
      <div className="absolute inset-y-0 right-0 z-10 items-center hidden w-1/2 lg:flex">
        <div className="pr-12 pl-36">
          <div className="max-w-xl">
            <h1 className="font-bold text-display">
              Accedé a tu préstamo en minutos
            </h1>

            <ul className="mt-4">
              <li className="ml-2 text-heading2">• Cuotas fijas en pesos</li>
              <li className="mt-2 ml-2 text-heading2">• Con o sin Veraz</li>
              <li className="mt-2 ml-2 text-heading2">• Solo con DNI</li>
            </ul>

            <Button
              text="Iniciar Consulta"
              ariaLabel="Abrir WhatsApp"
              onClick={handleWhatsApp}
              className="mt-4 bg-boton-primario text-texto-botones text-button lg:hover:bg-hover-primario"
            />
          </div>
        </div>
      </div>

      {/* BLOQUE MOBILE */}
      <div className="relative flex justify-center h-full px-4 pt-4 lg:hidden">
        <div className="relative w-[360px]">
          <Image
            src="/Familia.webp"
            alt="familia credizza"
            width={360}
            height={352}
            className="rounded-lg w-[360px]"
            priority
          />

          <div className="absolute bottom-[-8px] left-8">
            <Button
              text="Consultar YA"
              ariaLabel="Abrir chat de atención"
              className="bg-boton-primario text-texto-botones text-button"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>

    </section>
  );
}
