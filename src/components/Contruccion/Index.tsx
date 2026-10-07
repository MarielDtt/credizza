'use client'
import Image from 'next/image';
import { Button } from '../buttons';
import { useRouter } from "next/navigation";

export function Contruccion() {
    const router = useRouter();

    return (
        <div className='w-full p-4 m-auto lg:w-3/4' >
            <p className='my-2 text-center lg:my-4 text-heading2 lg:text-display'>Consultá las opciones de préstamo</p>
            <Image
                src="/Familia-v2.webp"
                alt="Familia consultando opciones de préstamo"
                width={360}
                height={352}
                className="rounded-lg w-[360px] lg:w-[500px] lg:h-auto m-auto"
            />
            <p className='mt-4 text-center lg:text-bodyBoldMobile'>Te acompañamos en tu consulta</p>
            <p className='mb-4 text-center lg:text-bodyBoldMobile'>Consultá por nuestros canales de atención online</p>

            <div className='flex flex-col items-center gap-3 mt-6 lg:flex-row lg:justify-center'>

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