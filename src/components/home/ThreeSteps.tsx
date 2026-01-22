'use client';

import Image from "next/image";

export default function ThreeSteps() {
    return (
        <section id="pasos" className="w-full max-w-6xl px-4 mx-auto lg:py-8 ">
            <div className="relative  pt-12 pb-8 rounded-lg bg-background-seccion lg:max-w-4xl lg:m-auto">

                {/* Título */}
                <h2
                    className="absolute z-10 inline-block px-4 py-1 font-bold text-center -translate-x-1/2 rounded-lg shadow -top-5 left-1/2 whitespace-nowrap bg-background-secondary text-heading2 lg:hidden"
                >
                    3 Simples Pasos
                </h2>

                <h2
                    className="absolute z-10 hidden px-4 py-1 font-bold text-center -translate-x-1/2 rounded-lg shadow -top-5 left-1/2 whitespace-nowrap bg-background-secondary text-heading1 lg:block"
                >
                    Préstamos Online en 3 simples pasos

                </h2>

                {/* Caja de los 3 pasos */}
                <div className="flex items-center justify-between lg:justify-center  mx-auto px-[16px] ">

                    {/* PASO 1 */}
                    <div className="flex flex-col items-center gap-2 lg:mx-12 lg:scale-125">
                        <Image
                            src="/emoji_objects.svg"
                            alt="Contactanos"
                            width={48}
                            height={48}
                        />
                        <p className="flex items-center gap-2 text-center text-small text-texto-principal lg:text-bodyBoldMobile">
                            <span className="hidden lg:flex items-center justify-center w-5 h-5 rounded-full bg-hover-primario text-white text-[11px] font-bold">
                                1
                            </span>
                            Contactanos
                        </p>
                    </div>
                    <div className="hidden lg:block shrink-0 h-24 bg-hover-primario/30 w-[2px] mx-8"></div>

                    {/* PASO 2 */}
                    <div className="flex flex-col items-center gap-2 lg:mx-12 lg:scale-125">
                        <Image
                            src="/app_registration.svg"
                            alt="Firma Digital"
                            width={48}
                            height={48}
                        />
                        <p className="flex items-center gap-2 text-center text-small text-texto-principal lg:text-bodyBoldMobile lg:whitespace-nowrap">
                            <span className="hidden lg:flex items-center justify-center w-5 h-5 rounded-full bg-hover-primario text-white text-[11px] font-bold">
                                2
                            </span>
                            Firma Digital
                        </p>
                    </div>

                    <div className="hidden lg:block h-24 shrink-0 bg-hover-primario/30 w-[2px] mx-8"></div>


                    {/* PASO 3 */}
                    <div className="flex flex-col items-center gap-2 lg:mx-12 lg:scale-125">
                        <Image
                            src="/currency_exchange.svg"
                            alt="Te Acreditamos"
                            width={48}
                            height={48}
                        />
                        <p className="flex items-center gap-2 text-center text-small text-texto-principal lg:text-bodyBoldMobile lg:whitespace-nowrap">
                            <span className="hidden lg:flex items-center justify-center w-5 h-5 rounded-full bg-hover-primario text-white text-[11px] font-bold">
                                3
                            </span>
                            Te Acreditamos
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
