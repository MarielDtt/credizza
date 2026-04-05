"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../buttons";

const lineas = [
    {
        id: 1,
        title: "Jubilados y Pensionados",
        description:
            "Te acompañamos en cada paso para que accedas a tu préstamo de forma rápida, simple y sin moverte de tu casa.",
        image: "/Jubilado.webp",
        whatsapp:
            "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20jubilados%20y%20pensionados%20Mi%20nombre%20es",
        height: "h-[220px] lg:h-full",
        objectPosition: "center center",
        variantes: [
            {
                key: "anses",
                label: "ANSES",
                requisitos: [
                    "Hasta 82 años al momento de solicitar el crédito",
                    "CBU registrado en ANSES (si realizaste un cambio de CBU, puede demorar hasta 3 meses en impactar)",
                ],
                comoSaberCupo: [
                    "Indicanos tu número de DNI y provincia",
                    "En algunos casos se puede solicitar recibo de haberes",
                ],
            },
            {
                key: "cbu",
                label: "CBU",
                requisitos: [
                    "Hasta 83 años al momento de solicitar el crédito",
                    "Máximo de hasta dos situaciones irregulares en BCRA",
                    "Se evalúa banco pagador",
                ],
                comoSaberCupo: [
                    "Indicanos tu número DNI y banco de cobro",
                    "Te informamos en el momento si contás con preaprobación",
                    "Si estás preaprobado, se solicitará recibo de haberes y movimientos bancarios con la última acreditación"
                ],
            },
        ],
    },
    {
        id: 2,
        title: "Pensiones Graciables",
        description:
            "Si contás con pensión por madre de 7 hijos, PUAM o discapacidad, podés acceder a tu préstamo de forma simple, rápida y sin moverte de tu casa.",
        image: "/Pension.webp",
        whatsapp:
            "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20pensiones%20graciables%20Mi%20nombre%20es",
        height: "h-[220px] lg:h-full",
        objectPosition: "center center",

        requisitos: [
            "Hasta 83 años al momento de solicitar el crédito",
            "Máximo de hasta dos situaciones irregulares en BCRA",
            "Se evalúa banco pagador",
            "Aplica para madre de 7 hijos, PUAM y discapacidad (excepto cognitiva)",
        ],

        comoSaberCupo: [
            "Indicanos tu DNI y banco de cobro",
            "Te informamos en el momento si contás con preaprobación",
            "Si estás preaprobado, se solicitará recibo de haberes y movimientos bancarios con la última acreditación",
        ],
    },
    {
        id: 3,
        title: "Policía Provincia Bs As y CABA",
        description:
            "Financiación para personal policial con gestión simple y rápida.",
        image: "/policia.webp",
        whatsapp:
            "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20policia%20provincia%20bs%20as%20y%20caba%20Mi%20nombre%20es",
        height: "h-[260px] lg:h-full",
        objectPosition: "center 10%",

        requisitos: [
            "Hasta 58 años mujeres y 63 años varones",
            "No debe superar los 30 años de servicio",
        ],

        proceso:
            "La evaluación se realiza primero por descuento de haberes. En caso de no contar con cupo, se verificará la opción por CBU. Si la evaluación es por descuento de haberes, se informará a nombre de quién presentar el certificado.",

        comoSaberCupo: [
            "Indicanos tu DNI",
            "Te informamos en el momento si contás con preaprobación",
            "En algunos casos se puede solicitar recibo de haberes",
        ],
    },
    {
        id: 4,
        title: "Empleados Sector Público",
        description:
            "Si trabajás en un organismo público nacional, provincial podés acceder a un préstamo pensado para vos.",
        image: "/publico.webp",
        whatsapp:
            "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20empleados%20del%20sector%20publico%20Mi%20nombre%20es",
        height: "h-[220px] lg:h-full",
        objectPosition: "center center",

        requisitos: [
            "Hasta 58 años mujeres y 63 años varones",
            "No se toman casos con situaciones irregulares en BCRA",
            "Ser empleado en planta permanente (no se toman contratos"
        ],

        comoSaberCupo: [
            "Indicanos tu DNI y banco de cobro",
            "Te informamos en el momento si contás con preaprobación",
            "En algunos casos se puede solicitar documentación adicional",
        ],
    },
    {
        id: 5,
        title: "Docentes Provincia Bs As",
        description:
            "Créditos pensados para docentes con gestión simple y evaluación personalizada.",
        image: "/docentes.webp",
        whatsapp:
            "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20docentes%20provincia%20bs%20as%20Mi%20nombre%20es",
        height: "h-[260px] lg:h-[320px]",
        objectPosition: "center 10%",

        requisitos: [
            "Hasta 58 años mujeres y 63 años varones",
            "No debe superar los 30 años de servicio",
        ],

        proceso:
            "La evaluación se realiza primero por descuento de haberes. En caso de no contar con cupo, se verificará la opción por CBU.",

        comoSaberCupo: [
            "Indicanos tu DNI",
            "Te informamos en el momento si contás con preaprobación",
            "En algunos casos se puede solicitar recibo de haberes",
        ],
    },

    {
        id: 6,
        title: "Jubilados IPS Provincia Bs As",
        description:
            "Líneas especiales para jubilados del IPS con evaluación rápida y gestión simple.",
        image: "/ips.webp",
        whatsapp:
            "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20jubilados%20ips%20provincia%20bs%20as%20Mi%20nombre%20es",
        height: "h-[220px] lg:h-[320px]",
        objectPosition: "center center",

        requisitos: [
            "Hasta 82 años al momento de solicitar el crédito",
        ],

        proceso:
            "La evaluación se realiza primero por descuento de haberes. En caso de no contar con cupo, se verificará la opción por CBU.",

        comoSaberCupo: [
            "Indicanos tu DNI y provincia",
            "Para evaluar tu cupo es necesario presentar recibo de haberes",
            "Te informamos en el momento si contás con preaprobación",
        ],
    },
    {
        id: 7,
        title: "AUH",
        description:
            "Consultá por líneas disponibles con gestión simple y evaluación personalizada.",
        image: "/auh.webp",
        whatsapp:
            "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20auh%20Mi%20nombre%20es",
        height: "h-[220px] lg:h-[320px]",
        objectPosition: "center center",

        requisitos: [
            "Se evalúa banco pagador",
            "No presentar situaciones irregulares en BCRA ni antecedentes negativos en los últimos 24 meses",
        ],

        proceso:
            "La evaluación se realiza en base al banco de cobro y comportamiento crediticio.",

        comoSaberCupo: [
            "Indicanos tu DNI y banco de cobro",
            "Te informamos en el momento si contás con preaprobación",
            "Si estás preaprobado, se solicitará documentación adicional",
        ],
    },
];

type VarianteKey = "anses" | "cbu";

export default function LineasCredito() {
    const [jubiladosTab, setJubiladosTab] = useState<VarianteKey>("anses");

    return (
        <section className="w-full py-8 bg-background-default">
            <div className="max-w-[1200px] mx-auto px-4">
                <h1 className="mt-6 text-center text-heading1 lg:text-display">
                    Prestamos
                </h1>

                <div className="flex flex-col gap-6">

                    {lineas.map((linea) => {
                        const varianteActiva =
                            linea.id === 1
                                ? linea.variantes?.find((item) => item.key === jubiladosTab)
                                : null;

                        return (
                            <div
                                key={linea.id}
                                className="p-4 rounded-lg bg-background-seccion lg:p-6"
                            >
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-6">
                                    {/* Imagen */}
                                    <div className="relative w-full lg:w-[42%]">
                                        <div
                                            className={`relative w-full ${linea.height ?? "h-[220px]"
                                                } rounded-lg overflow-hidden lg:h-[360px]`}
                                        >
                                            <Image
                                                src={linea.image}
                                                alt={linea.title}
                                                fill
                                                className="object-cover"
                                                style={{
                                                    objectPosition: linea.objectPosition ?? "center",
                                                }}
                                            />

                                            {/* Botón mobile */}
                                            <div className="absolute bottom-3 right-3 lg:hidden">
                                                <Button
                                                    className="px-4 py-2 min-w-[200px] bg-boton-primario text-texto-botones whitespace-nowrap"
                                                    text="Solicita tu Prestamo"
                                                    ariaLabel={`Solicita tu Prestamo para ${linea.title}`}
                                                    onClick={() =>
                                                        window.open(
                                                            linea.whatsapp,
                                                            "_blank",
                                                            "noopener,noreferrer"
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contenido */}
                                    <div className="flex flex-col lg:w-[58%] lg:justify-between">
                                        <div>
                                            <h2 className="mt-2 mb-2 text-center text-heading2 text-texto-principal lg:mt-0 lg:text-left">
                                                {linea.title}
                                            </h2>

                                            <p className="text-justify text-body text-texto-principal lg:text-left">
                                                {linea.description}
                                            </p>

                                            {/* Desktop especial Jubilados */}
                                            <div className="hidden mt-5 lg:block">

                                                {/* CASO 1: Tiene variantes (Jubilados) */}
                                                {linea.variantes && (
                                                    <>
                                                        {/* Tabs */}
                                                        <div className="flex gap-2 mb-5">

                                                            {linea.variantes.map((v) => (
                                                                <button
                                                                    key={v.key}
                                                                    onClick={() => setJubiladosTab(v.key as VarianteKey)} className={`px-4 py-2 rounded-md ${jubiladosTab === v.key
                                                                        ? "bg-boton-primario text-texto-botones"
                                                                        : "bg-background-default border"
                                                                        }`}
                                                                >
                                                                    {v.label}
                                                                </button>
                                                            ))}
                                                        </div>

                                                        {/* Requisitos */}
                                                        <div className="mb-5">
                                                            <h3 className="mb-2 text-bodyBoldMobile">
                                                                Requisitos
                                                            </h3>
                                                            <ul className="pl-5 space-y-2 list-disc">
                                                                {varianteActiva?.requisitos.map((item, index) => (
                                                                    <li key={index}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {/* Cupo */}
                                                        <div>
                                                            <h3 className="mb-2 text-bodyBoldMobile">
                                                                Cómo saber tu cupo
                                                            </h3>

                                                            <ul className="pl-5 list-disc">
                                                                <li>{varianteActiva?.comoSaberCupo[0]}</li>
                                                            </ul>

                                                            <p className="mt-2">
                                                                {varianteActiva?.comoSaberCupo[1]}
                                                            </p>

                                                            <p>
                                                                {varianteActiva?.comoSaberCupo[2]}
                                                            </p>
                                                        </div>
                                                    </>
                                                )}

                                                {/* CASO 2: Sin variantes (todas las demás) */}
                                                {!linea.variantes && linea.requisitos && (
                                                    <>
                                                        {/* Requisitos */}
                                                        <div className="mb-5">
                                                            <h3 className="mb-2 text-bodyBoldMobile">
                                                                Requisitos
                                                            </h3>
                                                            <ul className="pl-5 space-y-2 list-disc">
                                                                {linea.requisitos.map((item, index) => (
                                                                    <li key={index}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {/* Proceso */}
                                                        {linea.proceso && (
                                                            <p className="mb-5 text-body text-texto-principal">
                                                                {linea.proceso}
                                                            </p>
                                                        )}

                                                        {/* Cupo */}
                                                        <div>
                                                            <h3 className="mb-2 text-bodyBoldMobile">
                                                                Cómo saber tu cupo
                                                            </h3>

                                                            <ul className="pl-5 list-disc">
                                                                <li>{linea.comoSaberCupo[0]}</li>
                                                            </ul>

                                                            <p className="mt-2">
                                                                {linea.comoSaberCupo[1]}
                                                            </p>

                                                            <p>
                                                                {linea.comoSaberCupo[2]}
                                                            </p>
                                                        </div>
                                                    </>
                                                )}

                                            </div>
                                        </div>

                                        {/* Botón desktop */}
                                        <div className="hidden lg:flex lg:justify-start lg:mt-6">
                                            <Button
                                                className="px-4 py-2 min-w-[220px] bg-boton-primario text-texto-botones whitespace-nowrap"
                                                text="Solicita tu Prestamo"
                                                ariaLabel={`Solicita tu Prestamo para ${linea.title}`}
                                                onClick={() =>
                                                    window.open(
                                                        linea.whatsapp,
                                                        "_blank",
                                                        "noopener,noreferrer"
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}