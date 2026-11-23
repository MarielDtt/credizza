"use client";
import {openCredizzaChat} from '@/lib/open-chat';

import { useState } from "react";
import Image from "next/image";
import { Button } from "../buttons";
import AnsesLoanDetails from "./AnsesLoanDetails";
import ArgenpesosLoanDetails from "./ArgenpesosLoanDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

const lineas = [
    {
        id: 1,
        title: "Jubilados y Pensionados",
        description:
            "Te acompaÃ±amos en cada paso para que accedas a tu prÃ©stamo de forma rÃ¡pida, simple y sin moverte de tu casa.",
        image: "/Jubilado-v2.webp",
        whatsapp:
            "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20jubilados%20y%20pensionados%20Mi%20nombre%20es",
        height: "h-[220px] lg:h-full",
        objectPosition: "center center",
        variantes: [
            {
                key: "anses",
                label: "ANSES",
                requisitos: [
                    "Hasta 82 aÃ±os al momento de solicitar el crÃ©dito",
                    "CBU registrado en ANSES (si realizaste un cambio de CBU, puede demorar hasta 3 meses en impactar)",
                ],
                comoSaberCupo: [
                    "Indicanos tu nÃºmero de DNI y provincia",
                    "En algunos casos se puede solicitar recibo de haberes",
                ],
            },
            {
                key: "cbu",
                label: "CBU",
                requisitos: [
                    "Hasta 83 aÃ±os al momento de solicitar el crÃ©dito",
                    "MÃ¡ximo de hasta dos situaciones irregulares en BCRA",
                    "Se evalÃºa banco pagador",
                ],
                comoSaberCupo: [
                    "Indicanos tu nÃºmero DNI y banco de cobro",
                    "Te informamos en el momento si contÃ¡s con preaprobaciÃ³n",
                    "Si estÃ¡s preaprobado, se solicitarÃ¡ recibo de haberes y movimientos bancarios con la Ãºltima acreditaciÃ³n"
                ],
            },
        ],
    },
    {
        id: 2,
        title: "Pensiones Graciables",
        description:
            "Si contÃ¡s con pensiÃ³n por madre de 7 hijos, PUAM o discapacidad, podÃ©s acceder a tu prÃ©stamo de forma simple, rÃ¡pida y sin moverte de tu casa.",
        image: "/Pension-v2.webp",
        whatsapp:
            "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20pensiones%20graciables%20Mi%20nombre%20es",
        height: "h-[220px] lg:h-full",
        objectPosition: "center center",

        requisitos: [
            "Hasta 83 aÃ±os al momento de solicitar el crÃ©dito",
            "MÃ¡ximo de hasta dos situaciones irregulares en BCRA",
            "Se evalÃºa banco pagador",
            "Aplica para madre de 7 hijos, PUAM y discapacidad (excepto cognitiva)",
        ],

        comoSaberCupo: [
            "Indicanos tu DNI y banco de cobro",
            "Te informamos en el momento si contÃ¡s con preaprobaciÃ³n",
            "Si estÃ¡s preaprobado, se solicitarÃ¡ recibo de haberes y movimientos bancarios con la Ãºltima acreditaciÃ³n",
        ],
    },
    {
        id: 3,
        title: "PolicÃ­a Provincia Bs As y CABA",
        description:
            "FinanciaciÃ³n para personal policial con gestiÃ³n simple y rÃ¡pida.",
        image: "/policia.webp",
        whatsapp:
            "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20policia%20provincia%20bs%20as%20y%20caba%20Mi%20nombre%20es",
        height: "h-[260px] lg:h-full",
        objectPosition: "center 10%",

        requisitos: [
            "Hasta 58 aÃ±os mujeres y 63 aÃ±os varones",
            "No debe superar los 30 aÃ±os de servicio",
        ],

        proceso:
            "La evaluaciÃ³n se realiza primero por descuento de haberes. En caso de no contar con cupo, se verificarÃ¡ la opciÃ³n por CBU. Si la evaluaciÃ³n es por descuento de haberes, se informarÃ¡ a nombre de quiÃ©n presentar el certificado.",

        comoSaberCupo: [
            "Indicanos tu DNI",
            "Te informamos en el momento si contÃ¡s con preaprobaciÃ³n",
            "En algunos casos se puede solicitar recibo de haberes",
        ],
    },
    {
        id: 4,
        title: "Empleados Sector PÃºblico",
        description:
            "Si trabajÃ¡s en un organismo pÃºblico nacional, provincial podÃ©s acceder a un prÃ©stamo pensado para vos.",
        image: "/publico.webp",
        whatsapp:
            "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20empleados%20del%20sector%20publico%20Mi%20nombre%20es",
        height: "h-[220px] lg:h-full",
        objectPosition: "center center",

        requisitos: [
            "Hasta 58 aÃ±os mujeres y 63 aÃ±os varones",
            "No se toman casos con situaciones irregulares en BCRA",
            "Ser empleado en planta permanente (no se toman contratos"
        ],

        comoSaberCupo: [
            "Indicanos tu DNI y banco de cobro",
            "Te informamos en el momento si contÃ¡s con preaprobaciÃ³n",
            "En algunos casos se puede solicitar documentaciÃ³n adicional",
        ],
    },
    {
        id: 5,
        title: "Docentes Provincia Bs As",
        description:
            "CrÃ©ditos pensados para docentes con gestiÃ³n simple y evaluaciÃ³n personalizada.",
        image: "/docentes.webp",
        whatsapp:
            "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20docentes%20provincia%20bs%20as%20Mi%20nombre%20es",
        height: "h-[260px] lg:h-[320px]",
        objectPosition: "center 10%",

        requisitos: [
            "Hasta 58 aÃ±os mujeres y 63 aÃ±os varones",
            "No debe superar los 30 aÃ±os de servicio",
        ],

        proceso:
            "La evaluaciÃ³n se realiza primero por descuento de haberes. En caso de no contar con cupo, se verificarÃ¡ la opciÃ³n por CBU.",

        comoSaberCupo: [
            "Indicanos tu DNI",
            "Te informamos en el momento si contÃ¡s con preaprobaciÃ³n",
            "En algunos casos se puede solicitar recibo de haberes",
        ],
    },

    {
        id: 6,
        title: "Jubilados IPS Provincia Bs As",
        description:
            "LÃ­neas especiales para jubilados del IPS con evaluaciÃ³n rÃ¡pida y gestiÃ³n simple.",
        image: "/ips.webp",
        whatsapp:
            "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20jubilados%20ips%20provincia%20bs%20as%20Mi%20nombre%20es",
        height: "h-[220px] lg:h-[320px]",
        objectPosition: "center center",

        requisitos: [
            "Hasta 82 aÃ±os al momento de solicitar el crÃ©dito",
        ],

        proceso:
            "La evaluaciÃ³n se realiza primero por descuento de haberes. En caso de no contar con cupo, se verificarÃ¡ la opciÃ³n por CBU.",

        comoSaberCupo: [
            "Indicanos tu DNI y provincia",
            "Para evaluar tu cupo es necesario presentar recibo de haberes",
            "Te informamos en el momento si contÃ¡s con preaprobaciÃ³n",
        ],
    },
    {
        id: 7,
        title: "AUH",
        description:
            "ConsultÃ¡ por lÃ­neas disponibles con gestiÃ³n simple y evaluaciÃ³n personalizada.",
        image: "/auh.webp",
        whatsapp:
            "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20auh%20Mi%20nombre%20es",
        height: "h-[220px] lg:h-[320px]",
        objectPosition: "center center",

        requisitos: [
            "Se evalÃºa banco pagador",
            "No presentar situaciones irregulares en BCRA ni antecedentes negativos en los Ãºltimos 24 meses",
        ],

        proceso:
            "La evaluaciÃ³n se realiza en base al banco de cobro y comportamiento crediticio.",

        comoSaberCupo: [
            "Indicanos tu DNI y banco de cobro",
            "Te informamos en el momento si contÃ¡s con preaprobaciÃ³n",
            "Si estÃ¡s preaprobado, se solicitarÃ¡ documentaciÃ³n adicional",
        ],
    },
        {
        id: 8,
        title: "GCBA",
        description:
            "CrÃ©ditos pensados para empleados de Gobierno de la Ciudad AutÃ³noma de Buenos Aires con gestiÃ³n simple y evaluaciÃ³n personalizada.",
        image: "/gcba.webp",
        whatsapp:
            "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20gcba%20Mi%20nombre%20es",
        height: "h-[260px] lg:h-[320px]",
        objectPosition: "center 10%",

        requisitos: [
            "Hasta 58 aÃ±os mujeres y 63 aÃ±os varones",
            "No debe superar los 30 aÃ±os de servicio",
        ],

        proceso:
            "La evaluaciÃ³n se realiza primero por descuento de haberes. En caso de no contar con cupo, se verificarÃ¡ la opciÃ³n por CBU.",

        comoSaberCupo: [
            "Indicanos tu DNI",
            "Te informamos en el momento si contÃ¡s con preaprobaciÃ³n",
            "En algunos casos se puede solicitar recibo de haberes",
        ],
    },
];

type VarianteKey = "anses" | "cbu";

export default function LineasCredito() {
    const [jubiladosTab, setJubiladosTab] = useState<VarianteKey>("anses");

    const openChat = () => {
        openCredizzaChat();
    };

    return (
        <section className="w-full py-8 bg-background-default">
            <div className="max-w-[1200px] mx-auto px-4">
                <h1 className="mt-6 text-center text-heading1 lg:text-display">
                    PrÃ©stamos
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
                                id={linea.id === 1 ? "jubilados-anses" : undefined}
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

                                            {/* BotÃ³n mobile */}
                                            <div className="absolute bottom-3 right-3 lg:hidden">
                                                <Button
                                                    className="px-4 py-2 min-w-[200px] bg-boton-primario text-texto-botones whitespace-nowrap"
                                                    text="Consultar por chat"
                                                    ariaLabel={`Abrir chat para consultar por ${linea.title}`}
                                                    onClick={openChat}
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
                                            <div className="mt-5">

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
                                                                CÃ³mo saber tu cupo
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

                                                {/* CASO 2: Sin variantes (todas las demÃ¡s) */}
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
                                                                CÃ³mo saber tu cupo
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

                                        {/* BotÃ³n desktop */}
                                        <div className="hidden lg:flex lg:justify-start lg:mt-6">
                                            <Button
                                                className="px-4 py-2 min-w-[220px] bg-boton-primario text-texto-botones whitespace-nowrap"
                                                text="Consultar por chat"
                                                ariaLabel={`Abrir chat para consultar por ${linea.title}`}
                                                onClick={openChat}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {((linea.id === 1 && jubiladosTab === "anses") || linea.id === 2 || linea.id === 7) && (
                                    <div className="mt-6 w-full rounded-2xl bg-background-secondary px-4 py-1 lg:px-6">
                                        <div className="space-y-2 border-b border-texto-principal/10 px-4 py-3 text-sm leading-relaxed text-texto-principal">
                                            <p className="font-semibold">Una de las opciones disponibles Â· Sujeta a evaluaciÃ³n crediticia</p>
                                            {linea.id === 1 ? (
                                                <>
                                                    <p>Para jubilados y pensionados beneficiarios de ANSES. El prÃ©stamo lo otorga una entidad privada; no es un prÃ©stamo otorgado por ANSES ni existe afiliaciÃ³n gubernamental.</p>
                                                    <p><strong>Plazos de esta opciÃ³n: 12 a 24 meses.</strong> Ejemplo: $1.000.000 en 24 cuotas de $81.600,02. <strong>Total a devolver: $1.958.400,48</strong>. Sin cuota social ni otros cargos adicionales informados. Primera cuota en diciembre de 2026.</p>
                                                    <p><strong>Tasas mÃ¡ximas generales de la cooperativa:</strong> TEA sin IVA 178,66% Â· TNA sin IVA 106,92% Â· CFTNA con IVA 164,67%. Estos rangos generales no identifican las tasas especÃ­ficas del ejemplo; deben confirmarse antes de contratar.</p>
                                                    <p className="text-xs leading-relaxed text-texto-secundario">Entidad otorgante: Cooperativa de CrÃ©dito, Consumo y Servicios Sociales La Plata Ltda. CUIT 30-69169976-8. Sede de la cooperativa: calle 46 N.Âº 547/9, La Plata. Este domicilio pertenece a la entidad otorgante, no a Credizza.</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p><strong>Plazos: 6 a 15 meses.</strong> Montos generales: $30.000 a $3.000.000. OpciÃ³n de prÃ©stamo por CBU, sujeta a disponibilidad para tu beneficio y evaluaciÃ³n de la entidad.</p>
                                                    <p>Ejemplo: $300.000 en 12 cuotas de $72.001. <strong>Total de las cuotas: $864.012</strong>. La cuota social y otros cargos dependen de la entidad y la lÃ­nea; se informan en la propuesta antes de contratar. El total indicado corresponde a las cuotas del ejemplo y no confirma cargos adicionales.</p>
                                                    <p><strong>Tasas mÃ¡ximas generales:</strong> TEA 2.605,41% Â· TNA 378,81% Â· CFTNA 458,36%. Estos rangos generales no identifican las tasas especÃ­ficas del ejemplo.</p>
                                                    <p className="text-xs leading-relaxed text-texto-secundario">Entidad otorgante: Argenpesos. Credizza brinda orientaciÃ³n y acompaÃ±amiento; no otorga el prÃ©stamo.</p>
                                                </>
                                            )}
                                        </div>
                                        <Accordion
                                            defaultExpanded={false}
                                            disableGutters
                                            elevation={0}
                                            square
                                            sx={{
                                                backgroundColor: "transparent",
                                                borderBottom: "1px solid #E5DDCF",
                                                "&:before": { display: "none" },
                                                "&:last-of-type": { borderBottom: "none" },
                                            }}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                id={`condiciones-header-${linea.id}`}
                                                aria-controls={`condiciones-content-${linea.id}`}
                                                sx={{
                                                    minHeight: 44,
                                                    "&.Mui-expanded": { minHeight: 44 },
                                                    "& .MuiAccordionSummary-content": { margin: "8px 0" },
                                                    "& .MuiAccordionSummary-content.Mui-expanded": { margin: "8px 0" },
                                                }}
                                            >
                                                <span className="text-body text-texto-principal">
                                                    {linea.id === 1 ? "Ver una opciÃ³n de prÃ©stamo ANSES: cuotas y condiciones" : "Ver una opciÃ³n de prÃ©stamo por CBU"}
                                                </span>
                                            </AccordionSummary>
                                            <AccordionDetails id={`condiciones-content-${linea.id}`}>
                                                {linea.id === 1 ? <AnsesLoanDetails /> : <ArgenpesosLoanDetails />}
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}