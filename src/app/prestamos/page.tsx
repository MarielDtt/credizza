import type { Metadata } from "next";
import LineasCredito from "@/components/lineas/LineasCredito";

export const metadata: Metadata = {
    title: "Préstamos y condiciones | Credizza",
    description: "Consultá las líneas disponibles y el ejemplo para jubilados y pensionados ANSES: cuotas, total a devolver y condiciones.",
    alternates: { canonical: "https://credizza.com.ar/prestamos" },
    openGraph: { title: "Préstamos y condiciones | Credizza", description: "Líneas disponibles, requisitos, cuotas y condiciones.", url: "https://credizza.com.ar/prestamos" },
};

export default function Prestamos() {
    return <main><LineasCredito /></main>;
}
