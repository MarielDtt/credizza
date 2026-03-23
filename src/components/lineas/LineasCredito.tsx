"use client";

import Image from "next/image";
import { Button } from "../buttons";




const lineas = [
    {
        id: 1,
        title: "Jubilados y Pensionados",
        description:
            "Te acompañamos en cada paso para que accedas a tu préstamo de forma rápida, simple y sin moverte de tu casa.",
        image: "/Jubilado.webp",
        WhatsApp: "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20jubilados%20y%20pensionados%20Mi%20nombre%20es"
    },
    {
        id: 2,
        title: "Pensiones Graciables",
        description:
            "Si tenés una pensión por discapacidad o por ser madre de 7 hijos, podés acceder a tu préstamo de forma simple, rápida y sin moverte de tu casa.",
        image: "/Pension.webp",
        WhatsApp: "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20pensiones%20graciables%20Mi%20nombre%20es"
    },
    {
        id: 3,
        title: "Policía Provincia Bs As y CABA",
        description:
            "Financiación para personal policial con gestión simple y rápida.",
        image: "/policia.webp",
        height: "h-[260px]",
        objectPosition: "center 10%",
        whatsApp: "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20pensiones%20graciables%20Mi%20nombre%20es"
    },
    {
        id: 4,
        title: "Empleados Sector Público",
        description:
            "Si trabajás en un organismo público nacional, provincial podés acceder a un préstamo pensado para vos.",
        image: "/publico.webp",
        whatsApp: "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20empleados%20del%20sector%20publico%20Mi%20nombre%20es"
    },
    {
        id: 5,
        title: "Docentes Provincia Bs As y CABA",
        description:
            "Créditos pensados para docentes con cuotas claras y acreditación directa en tu cuenta.",
        image: "/docentes.webp",
        height: "h-[260px]",
        objectPosition: "center 10%",
        whatsApp: "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20docentes%20provincia%20bs%20as%20y%20caba%20Mi%20nombre%20es"
    },
    {
        id: 6,
        title: "Jubilados IPS Provincia Bs As",
        description:
            "Líneas especiales para jubilados del IPS con evaluación rápida.",
        image: "/ips.webp",
        whatsApp: "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20jubilados%20ips%20provincia%20bs%20as%20Mi%20nombre%20es"
    },
    {
        id: 7,
        title: "AUH",
        description:
            "Líneas especiales para jubilados del IPS con evaluación rápida.",
        image: "/auh.webp",
        whatsApp: "https://wa.me/5491166669143?text=Hola%20quiero%20consultar%20por%20un%20prestamo%20para%20auh%20Mi%20nombre%20es"
    },
];

export default function LineasCredito() {
    return (
        <section className="w-full py-8 bg-background-default">

            <div className="max-w-[1200px] mx-auto px-4">

                {/* titulo */}
                <h1 className="mb-6 text-center text-heading1 text-texto-principal">
                    Prestamos
                </h1>

                {/* cards */}
                <div className="flex flex-col gap-6">

                    {lineas.map((linea) => (

                        <div
                            key={linea.id}
                            className="p-4 rounded-lg bg-background-seccion"
                        >

                            {/* imagen */}
                            <div className={`relative w-full ${linea.height ?? "h-[220px]"} rounded-lg overflow-hidden`}>

                                <Image
                                    src={linea.image}
                                    alt={linea.title}
                                    fill
                                    className="object-cover"
                                    style={{ objectPosition: linea.objectPosition ?? "center" }}
                                />

                                {/* boton sobre imagen */}
                                <div className="absolute bottom-3 right-3">
                                    <Button
                                        className="px-4 py-2 min-w-[200px] bg-boton-primario text-texto-botones whitespace-nowrap"
                                        text="Solicita tu Prestamo"
                                        ariaLabel={`Solicita tu Prestamo para ${linea.title}`}
                                        onClick={() => window.open(linea.whatsApp, "_blank")}
                                    />
                                </div>

                            </div>

                            {/* titulo */}
                            <h2 className="mt-6 mb-2 text-center text-heading2 text-texto-principal">
                                {linea.title}
                            </h2>

                            {/* descripcion */}
                            <p className="text-justify text-body text-texto-principal">
                                {linea.description}
                            </p>

                        </div>

                    ))}

                </div>
            </div>
        </section>
    );
}