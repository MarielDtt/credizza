"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../buttons";

export default function Hero() {
  const openChat = () => {
    if (window.$crisp) {
      window.$crisp.push(["do", "chat:show"]);
      window.$crisp.push(["do", "chat:open"]);
    }
  };
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-2 lg:items-center lg:px-8">
      <Image src="/Credizza.webp" alt="Familia Credizza" width={851} height={315} className="aspect-[4/3] w-full rounded-lg object-cover object-left" priority />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold lg:text-4xl">Encontrá una opción de préstamo para vos</h1>
        <p className="text-lg">Te acompañamos en la consulta y solicitud. El monto, las cuotas y la aprobación dependen de la evaluación de la entidad otorgante.</p>
        <Button text="Consultar por chat" ariaLabel="Abrir chat de atención" onClick={openChat} className="bg-boton-primario text-texto-botones text-button lg:hover:bg-hover-primario" />
        <p className="text-base"><Link href="/prestamos#jubilados-anses" className="font-semibold underline">Ver ejemplo para jubilados y pensionados ANSES</Link></p>
        <p className="text-sm">Atención online. Credizza brinda orientación y acompañamiento; no otorga los préstamos.</p>
      </div>
    </section>
  );
}
