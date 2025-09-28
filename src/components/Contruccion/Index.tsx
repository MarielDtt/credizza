'use client'
import Image from 'next/image';
import { Button } from '../buttons';
import { useRouter } from "next/navigation";

export function Contruccion() {
    const router = useRouter();

    return (
        <div className='w-full p-4 m-auto lg:w-3/4' >
            <p className='my-2 text-center lg:my-4 text-heading2 lg:text-display'>Sitio en construcción</p>
            <Image
                src="/Construccion.webp"
                alt="pagina en construccion"
                width={360}
                height={352}
                className="rounded-lg w-[360px] lg:w-[500px] lg:h-auto m-auto"
            />
            <p className='mt-4 text-center lg:text-bodyBoldMobile'>Estamos ajustando los últimos detalles</p>
            <p className='mb-4 text-center lg:text-bodyBoldMobile'>Escribinos por WhatsApp y te respondemos en minutos</p>
            
            <div className='flex flex-col items-center gap-3 mt-6 lg:flex-row lg:justify-center'>
                <Button
                    text='Consultar'
                    className=' bg-boton-primario text-texto-botones lg:hover:bg-hover-primario'
                    onClick={() => window.open("https://wa.me/541162108715?text=Hola,%20entre%20a%20una%20pagina%20que%20no%20encontre%20y%20necesito%20ayuda", "_blank")}
                    ariaLabel="Consultar por WhatsApp"
                />

                <Button
                    text='Inicio'
                    className=' bg-boton-neutral text-texto-botones lg:hover:bg-boton-neutral/90'
                    ariaLabel="Volver al inicio"
                    onClick={() => router.push('/')}
                />
            </div>
        </div>
    )
}