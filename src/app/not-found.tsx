'use client'
import { Button } from '@/components/buttons';
import Image from 'next/image';
import { useRouter } from "next/navigation";



function NotFound() {
    const router = useRouter();
    return (
        <div className="flex w-full px-8 m-auto space-x-10 lg:w-3/4 lg:flex-row ">
            <div className="p-8">
                <p className="text-3xl sm:text-4xl lg:text-5xl text-display text-texto-principal"><span className="whitespace-nowrap">No encontramos</span> la página que buscás</p>
                <p className="pt-4 pl-2 text-body text-texto-secundario">Escribinos por WhatsApp y lo resolvemos en minutos.</p>
                <div className='flex flex-col items-center gap-3 mt-6 lg:flex-row lg:justify-start'>

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
            <div className='hidden mt-8 ml-8 lg:block'>
                <Image
                    src="/Logo2.webp"
                    alt="logo credizza"
                    width={220}
                    height={220}
                />
            </div>
            <div>

            </div>

        </div>
    )
}

export default NotFound;
