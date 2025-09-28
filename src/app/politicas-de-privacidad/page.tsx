'use client'
import { Button } from "@/components/buttons/index";
import { useRouter } from "next/navigation";

const Politicas = () => {
    const router = useRouter();

    return (
        <div className="mx-4 text-center sm:max-w-[82ch] sm:text-left sm:mx-auto sm:px-6">
            <div className="">
                <h1 className=" text-heading2">Políticas de Privacidad</h1>
            </div>

            <h2 className="mt-4 text-left text-bodyBoldMobile">1. Protección de tu información</h2>
            <p className="text-justify text-body sm:text-left sm:leading-relaxed">
                En Credizza nos tomamos muy en serio tu privacidad. La información personal que ingreses en el sitio será tratada con absoluta confidencialidad conforme a la Ley 25.326 de Protección de Datos Personales.</p>
            <h2 className="mt-4 text-left text-bodyBoldMobile">2. Qué datos recolectamos</h2>
            <p className="text-justify text-body sm:text-left sm:leading-relaxed">
                Podemos solicitar algunos datos como tu nombre, teléfono o correo electrónico o la información que vos decidas compartir para poder contactarte y brindarte una mejor atención.</p>
            <h2 className="mt-4 text-left text-bodyBoldMobile">3. Uso de la información</h2>
            <p className="text-justify text-body sm:text-left sm:leading-relaxed">
                Utilizamos tus datos únicamente para responder consultas, ofrecer asesoramiento personalizado y, si corresponde, acercar tu solicitud a entidades financieras habilitadas. No compartimos tu información con terceros sin tu consentimiento.</p>
            <h2 className="mt-4 text-left text-bodyBoldMobile">4. Seguridad</h2>
            <p className="text-justify text-body sm:text-left sm:leading-relaxed">
                Aplicamos medidas de seguridad para proteger tus datos, tanto durante la transmisión como una vez recibidos.</p>
            <h2 className="mt-4 text-left text-bodyBoldMobile">5. Tus derechos</h2>
            <p className="text-justify text-body sm:text-left sm:leading-relaxed">
                En cualquier momento podés solicitarnos acceder, corregir o eliminar tus datos personales. Solo tenés que escribirnos por WhatsApp o a través del formulario de contacto.</p>
            <h2 className="mt-4 text-left text-bodyBoldMobile">6. Cambios en esta política</h2>
            <p className="text-justify text-body sm:text-left sm:leading-relaxed">
                Podemos actualizar esta política en el futuro. Te recomendamos revisarla periódicamente para estar al tanto de cualquier cambio.</p>
            <p className="text-justify text-body sm:text-left sm:leading-relaxed">La fecha de última actualización estará siempre indicada al final de este documento.                </p>
            <p className="text-xs italic text-justify text-body sm:text-left sm:leading-relaxed"> Última actualización: 28/09/2025 – v1.0</p>
            <div className="my-8">
                <Button text="Inicio" className="bg-boton-neutral text-texto-botones lg:hover:bg-boton-neutral/90" ariaLabel="Volver al inicio" onClick={() => router.push('/')}></Button>
            </div>

        </div>
    )
}

export default Politicas;
