import Image from "next/image";
import PhoneIcon from "@mui/icons-material/Phone";
import { Button } from "../buttons";
import { Email } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import ContactForm from "../forms/ContactForm";


export default function Contact() {
  return (
    <section className="pt-4 pb-8 bg-background-seccion">
      {/* Título */}
      <p className="pb-4 text-center text-heading2 lg:text-heading1">
        Contactanos
      </p>

      <div className="items-center justify-center hidden w-full h-16 max-w-3xl px-6 mx-auto mb-6 rounded-md lg:block bg-background-default">
        <p className="flex items-center justify-center h-full text-center text-bodyBoldMobile">
          Horarios de atención:
          <span className="ml-1 text-body">
            Lunes a viernes de 08:00 a 20:00 Hs. – Sábados: de 9:00 a 13:00 Hs.
          </span>
        </p>
      </div>

      <div className="flex flex-col items-center justify-center lg:flex-row lg:gap-4">
        {/* Card Telefonos y WhatsApp */}
        <div className="relative mx-auto w-[92%] max-w-[420px] aspect-[320/300] lg:order-2 lg:max-w-[380px]">

          {/* Marco */}
          <Image
            src="/Marcos-Cards.webp"
            alt="Marco tarjeta verde"
            fill
            className="object-cover"
            priority
          />

          {/* Contenido */}
          <div className="relative z-10 px-3 py-8 text-center">
            {/* Ícono */}
            <div className="flex justify-center mb-4 lg:scale-110 lg:mt-4">
              <PhoneIcon sx={{ fontSize: 48 }} />
            </div>

            {/* Título */}
            <h3 className="text-heading2">
              Teléfono y WhatsApp
            </h3>

            {/* Número */}
            <p className="my-4 text-body">
              +54 11 2628-9448
            </p>

            {/* Botón */}
            <div className="flex justify-center mt-10 lg:mt-10">
              <Button
                text="Chatear Ahora"
                ariaLabel="Enviar whatsapp"
                className="bg-boton-primario text-texto-botones text-button lg:hover:bg-hover-primario"
                onClick={() => {
                  setTimeout(() => {
                    window.open(
                      "https://wa.me/54126289448?text=Hola,%20quiero%20a%20contactarme%20para%20obtener%20informacion",
                      "_blank"
                    );
                  }, 120);
                }}
              />
            </div>
          </div>
        </div>

        {/* Card Correo Electronico */}
        <div className="relative mx-auto mt-6 w-[92%] max-w-[420px] aspect-[320/300] lg:mt-0 lg:order-1 lg:max-w-[360px]">

          {/* Marco */}
          <Image
            src="/Marcos-Cards.webp"
            alt="Marco tarjeta verde"
            fill
            className="object-cover"
            priority
          />

          {/* Contenido */}
          <div className="relative z-10 px-3 pt-8 text-center pb-14">
            {/* Ícono */}
            <div className="flex justify-center mb-4">
              <Email sx={{ fontSize: 48 }} />
            </div>

            {/* Título */}
            <h3 className="text-heading2">
              Correo Electrónico
            </h3>

            {/* Correo */}
            <p className="my-4 text-body">
              credizza@gmail.com
            </p>

            {/* Botón */}
            <div className="flex justify-center mt-10">
              <Button
                text="Enviar Correo"
                ariaLabel="Enviar correo"
                className="bg-boton-primario text-texto-botones text-button lg:hover:bg-hover-primario"
                onClick={() => {
                  setTimeout(() => {
                    window.location.href = "mailto:credizza@gmail.com";
                  }, 120);
                }}
              />
            </div>
          </div>
        </div>

        {/* Redes Sociales */}
        <div className="relative mx-auto mt-6 lg:mt-0 lg:mb-0 mb-10 w-[92%] max-w-[420px] aspect-[320/300] lg:order-3 lg:max-w-[360px]">

          {/* Marco */}
          <Image
            src="/Marcos-Cards.webp"
            alt="Marco tarjeta verde"
            fill
            className="object-cover"
            priority
          />

          {/* Contenido */}
          <div className="relative z-10 px-3 pt-8 pb-12 text-center">
            {/* Ícono */}
            <div className="flex justify-center mb-4">
              <FacebookIcon sx={{ fontSize: 48 }} />
            </div>

            {/* Título */}
            <h3 className="text-heading2">
              Facebook
            </h3>

            {/* Usuario */}
            <p className="my-4 text-body">
              www.facebook.com/credizza
            </p>

            {/* Botón */}
            <div className="flex justify-center mt-10">
              <Button
                text="Visitar Perfil"
                ariaLabel="Visitar Perfil"
                className="bg-boton-primario text-texto-botones text-button lg:hover:bg-hover-primario"
                onClick={() => {
                  setTimeout(() => {
                    window.open(
                      "https://www.facebook.com/credizza",
                      "_blank"
                    );
                  }, 120);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-2 lg:w-full lg:mt-8 lg:ml-8">
        <ContactForm />
      </div>
    </section>
  );
}