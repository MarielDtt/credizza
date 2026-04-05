"use client";

import { Button } from "@/components/buttons";
import Image from "next/image";
import { useRouter } from "next/navigation";

const colaboradores = [
  {
    name: "PriCoop",
    src: "/pricoop.webp",
    alt: "Logo de PriCoop",
    width: 180,
    height: 90,
  },
  {
    name: "Cardinal",
    src: "/cardinal.webp",
    alt: "Logo de Cardinal",
    width: 160,
    height: 90,
  },
  {
    name: "Coordinar",
    src: "/coordinar.webp",
    alt: "Logo de Coordinar",
    width: 180,
    height: 90,
  },
  {
    name: "Argenpesos",
    src: "/argenpesos.webp",
    alt: "Logo de Argenpesos",
    width: 190,
    height: 90,
  },
  {
    name: "Red Mutual",
    src: "/RedMutual.webp",
    alt: "Logo de Red Mutual",
    width: 180,
    height: 90,
  },
  {
    name: "Crediamerica",
    src: "/CR-1.webp",
    alt: "Logo de Credito Regional",
    width: 190,
    height: 90,
  },
];

const Colaboradores = () => {
  const router = useRouter();

  const handleButtonHome = () => {
    router.push("/");
  };

  return (
    <section className="w-full px-4 py-10 bg-background-default lg:px-6 lg:py-16">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center">
        
        <h1 className="text-center text-heading1 text-text-primary lg:text-display">
          Colaboradores
        </h1>

        <p className="mt-6 max-w-[320px] text-justify text-sm leading-7 text-text-primary lg:max-w-[760px] lg:text-body">
          A través de convenios con diversas entidades, hoy podemos ofrecer
          préstamos a empleados de organismos públicos, empresas privadas,
          jubilados y pensionados. Seguimos sumando aliados para que cada vez
          más personas puedan acceder a una solución clara, rápida y confiable.
        </p>

        <div className="grid w-full grid-cols-2 mt-12 gap-x-4 gap-y-10 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-14">
          {colaboradores.map((colaborador) => (
            <div
              key={colaborador.name}
              className="flex h-[80px] w-full items-center justify-center"
            >
              <Image
                src={colaborador.src}
                alt={colaborador.alt}
                width={colaborador.width}
                height={colaborador.height}
                className="max-h-[50px] w-auto object-contain sm:max-h-[60px] lg:max-h-[70px]"
              />
            </div>
          ))}
        </div>

        <div className="mt-12 lg:mt-16">
          <Button
            text="Home"
            className="px-6 py-2 bg-boton-neutral text-texto-botones"
            onClick={handleButtonHome}
          />
        </div>
      </div>
    </section>
  );
};

export default Colaboradores;