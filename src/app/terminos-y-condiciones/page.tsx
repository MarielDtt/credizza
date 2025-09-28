'use client'

import { Button } from "@/components/buttons/index";
import { useRouter } from "next/navigation";


const Terminos = () => {
    const router = useRouter();

    return (
        <div className="mx-4 text-center sm:max-w-[82ch] sm:text-left sm:mx-auto sm:px-6">
            <div className="">
                <h1 className=" text-heading2">Términos y Condiciones</h1>
            </div>

            <h2 className="mt-4 text-left text-bodyBoldMobile">1. Aceptación de los Términos</h2>
            <p className="text-justify text-body sm:text-left sm:leading-relaxed">
                Al acceder y utilizar este sitio web, aceptás los presentes términos y condiciones. Si no estás de acuerdo, te pedimos que no utilices este sitio.</p>
            <h2 className="mt-4 text-left text-bodyBoldMobile">2. Sobre Credizza</h2>
            <p className="text-justify text-body sm:text-left sm:leading-relaxed">
                Credizza no es una entidad financiera ni otorga préstamos. Brindamos un servicio de orientación y acompañamiento a personas jubiladas, pensionadas o en actividad, que buscan información sobre préstamos personales ofrecidos por entidades habilitadas.</p>
            <h2 className="mt-4 text-left text-bodyBoldMobile">3. Uso del Sitio</h2>
            <p className="text-justify text-body sm:text-left sm:leading-relaxed">
                La información publicada en este sitio es orientativa y no constituye una oferta directa ni un compromiso de aprobación crediticia. Te recomendamos siempre consultar con un asesor para una atención personalizada. La información es de carácter general y puede variar según la entidad financiera. Credizza no garantiza la aprobación ni las condiciones finales del crédito.</p>
            La información publicada es de carácter general y puede variar según la entidad financiera. Credizza no garantiza la aprobación ni las condiciones finales del crédito.
            <h2 className="mt-4 text-left text-bodyBoldMobile">4. Protección de Datos</h2>
            <p className="text-justify text-body sm:text-left sm:leading-relaxed">
                Los datos que ingreses serán tratados de manera confidencial conforme a la Ley 25.326 y a nuestra Política de Privacidad. Podés ejercer tus derechos de acceso, rectificación, cancelación u oposición (ARCO) escribiéndonos por WhatsApp o a nuestro correo.</p>
            <h2 className="mt-4 text-left text-bodyBoldMobile">5. Limitación de Responsabilidad</h2>
            <p className="text-justify text-body sm:text-left sm:leading-relaxed">
                Credizza no se hace responsable por decisiones tomadas en base al contenido del sitio, ni por posibles errores u omisiones.</p>
            Credizza no se responsabiliza por demoras, rechazos o decisiones tomadas por entidades financieras externas.
            <h2 className="mt-4 text-left text-bodyBoldMobile">6. Cambios en los Términos</h2>
            <p className="text-justify text-body sm:text-left sm:leading-relaxed">
                Podemos modificar estos términos en cualquier momento. Te sugerimos revisarlos periódicamente para estar al tanto de cualquier cambio.</p>
            <h2 className="mt-4 text-left text-bodyBoldMobile">7. Contacto</h2>
            <p className="text-justify text-body sm:text-left sm:leading-relaxed">
                Si tenés dudas o consultas, escribinos por WhatsApp o mediante el formulario de contacto.</p>

            <div className="my-8">
                <Button text="Inicio" className="bg-boton-neutral text-texto-botones lg:hover:bg-boton-neutral/90" ariaLabel="Volver al inicio" onClick={() => router.push('/')}></Button>
            </div>

        </div>
    )
}

export default Terminos;


