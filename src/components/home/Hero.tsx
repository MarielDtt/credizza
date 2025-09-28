'use client'
import { Button } from "@/components/buttons";
import { trackWhatsApp } from "@/utils/ga";
import Image from 'next/image';

export default function Hero() {

    const handleClick = () => {
        trackWhatsApp("hero"); // 👈 evento GA4
        setTimeout(() => {
            window.open(
                "https://wa.me/541162108715?text=Hola%20quiero%20informacion%20para%20solicitar%20un%20prestamo",
                "_blank"
            );
        }, 120); // ⏱ da tiempo a GA4 de mandar el evento
    };

    return (
        <div className="relative grid items-center max-w-6xl gap-8 px-4 mx-auto lg:grid-cols-2">
            <Image
                src="/Familia.webp"
                alt="familia credizza"
                width={360}
                height={352}
                className="rounded-lg w-[360px] lg:w-[500px] lg:h-auto"
            />
            <div className="absolute bottom-[-16px] left-8 lg:static lg:mt-6">
                <div className="hidden lg:block">
                    <h1 className="font-bold text-display">Créditos simples, ágiles y seguros para jubilados y pensionados</h1>
                    <h2 className="mt-4 text-body">Hacelo desde tu casa por WhatsApp. Resolvemos tu consulta en minutos.</h2>
                </div>
                <Button
                    text='Consultar YA'
                    ariaLabel="Consultar por WhatsApp"
                    className="bg-boton-primario text-texto-botones text-button lg:hover:bg-hover-primario "
                    onClick={handleClick}
                />
            </div>

        </div>
    )
}