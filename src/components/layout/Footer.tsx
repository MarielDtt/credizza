'use client'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SettingsPhoneRoundedIcon from '@mui/icons-material/SettingsPhoneRounded';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {

    return (
        <footer className="mt-8 h-45 bg-texto-secundario">
            <div className='flex items-center justify-end sm:justify-between'>
                <div className='hidden sm:block'>
                    <Link href='/'>
                        <Image
                            src="/Logo-Navbar.webp"
                            alt="logo footer credizza"
                            width={64}
                            height={64}
                            className='p-2'
                        />
                    </Link>
                </div>
                <div className="flex justify-end">
                    <Link href='#navbar'><p className="p-4 text-texto-botones text-bodyBoldMobile sm:hover:text-background-seccion ">Ir al Inicio</p></Link>
                </div>

            </div>

            <div className="w-full h-px bg-background-seccion"></div>
            <div className='flex justify-center p-4 space-x-6 sm:space-x-16'>
                <Link href="https://facebook.com/credizza" aria-label="Facebook Credizza" target="_blank" rel="noopener noreferrer" ><FacebookRoundedIcon fontSize='large' className='text-texto-botones sm:hover:text-background-seccion' /></Link>
                <Link href="mailto:credizza@gmail.com" aria-label="Mail Credizza" target="_blank" rel="noopener noreferrer" ><EmailRoundedIcon fontSize='large' className='text-texto-botones sm:hover:text-background-seccion' /></Link>
                <Link href="tel:+541162108715" aria-label="Telefono Credizza" target="_blank" rel="noopener noreferrer" ><SettingsPhoneRoundedIcon fontSize='large' className='text-texto-botones sm:hover:text-background-seccion' /></Link>
            </div>
            <div className='flex justify-center pb-4 space-x-2'>
                <Link href="/terminos-y-condiciones" className='text-smallMobile text-texto-botones sm:text-small' >Términos y Condiciones</Link>
                <p className='text-smallMobile text-texto-botones sm:text-small'>|</p>
                <Link href="/politicas-de-privacidad" className='text-smallMobile text-texto-botones sm:text-small'>Políticas de Privacidad</Link>
            </div>
            <div className='p-4 space-y-2 text-smallMobile text-sistema-uno lg:text-small'>
                <p className='space-y-2 leading-relaxed'><span className='font-bold'>Credizza</span> no es una entidad financiera ni recibe depósitos. Nuestro trabajo es <span className='font-bold'>acompañar y asesorar</span> a jubilados y pensionados en el proceso de solicitar un crédito con entidades habilitadas.</p>
                <p className='space-y-2 leading-relaxed'>  La aprobación, el monto, el plazo, la <span className='font-bold'>TNA</span> y el <span className='font-bold'>CFT</span> son definidos por la entidad otorgante y siempre se informan previamente, conforme a la normativa del BCRA. Las solicitudes están sujetas a verificación de identidad, historial y capacidad de pago. <span className='font-bold'>Credizza no garantiza la aprobación</span> ni se responsabiliza por las decisiones de terceros.</p>
                <p className='space-y-2 leading-relaxed'>Al contactarnos por WhatsApp aceptás la <span className='font-bold'>Política de Privacidad</span>  y autorizás el uso de tus datos para evaluar tu solicitud.</p>
                <p className='space-y-2 leading-relaxed'>  Derechos Ley 25.326 (ARCO): podés solicitar acceso, rectificación o supresión escribiendo a credizza@gmail.com o WhatsApp +54 11 6210-8715.
                Órgano de control:s= <span className='font-bold'>AAIP</span>  – www.argentina.gob.ar/aaip</p>
                <p className='space-y-2 text-sm italic leading-relaxed'><span className='font-bold '>Última actualización:</span> 28/09/2025 – v1.0</p>
                <p className='space-y-2 font-bold leading-relaxed'>👉 Este servicio es gratuito para el usuario: no cobramos comisiones.</p>         
            </div>

        </footer>
    )
}

export default Footer;


