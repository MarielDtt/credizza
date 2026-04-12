'use client';
import Link from "next/link";
import { Button } from "@/components/buttons";

export default function ComoFuncionaCreditoPage() {
  return (
    <main className="w-full py-12 font-sans bg-background-default md:py-16">
      <section className="mx-auto flex w-full max-w-[900px] flex-col gap-8 px-4 md:px-6">
        
        <div className="flex flex-col gap-3">
          <span className="px-3 py-1 rounded-full w-fit bg-background-seccion text-smallMobileBold text-texto-principal">
            Proceso
          </span>

          <h1 className="text-display text-texto-principal">
            ¿Cómo funciona un crédito online?
          </h1>

          <p className="text-body text-texto-secundario">
            Solicitar un crédito hoy es un proceso simple y rápido. Conocé los pasos
            principales para gestionar tu préstamo de forma online.
          </p>
        </div>

        <article className="flex flex-col gap-6 p-6 shadow-sm rounded-2xl bg-background-secondary md:p-8">
          
          <div className="flex flex-col gap-3">
            <h2 className="text-heading2 text-texto-principal">
              Paso a paso
            </h2>

            <ul className="flex flex-col gap-4 text-body text-texto-secundario">
              <li>
                <span className="font-semibold text-texto-principal">
                  1. Consulta inicial:
                </span>{" "}
                enviás tus datos para conocer si contás con cupo disponible.
              </li>

              <li>
                <span className="font-semibold text-texto-principal">
                  2. Evaluación:
                </span>{" "}
                se analiza tu situación para ofrecerte una propuesta acorde.
              </li>

              <li>
                <span className="font-semibold text-texto-principal">
                  3. Confirmación:
                </span>{" "}
                si estás de acuerdo, se avanza con la gestión.
              </li>

              <li>
                <span className="font-semibold text-texto-principal">
                  4. Firma digital:
                </span>{" "}
                completás el proceso de forma online, sin moverte de tu casa.
              </li>

              <li>
                <span className="font-semibold text-texto-principal">
                  5. Acreditación:
                </span>{" "}
                el dinero se deposita en el día o dentro de las 24 hs.
              </li>
            </ul>
          </div>

          <div className="w-full h-px bg-background-seccion" />

          <div className="flex flex-col gap-3">
            <h3 className="text-heading2 text-texto-principal">
              Importante
            </h3>

            <p className="text-body text-texto-secundario">
              Todo el proceso es online, con firma digital, y sin necesidad de
              trasladarte.
            </p>
          </div>

        </article>

        <div className="flex flex-col gap-4 p-6 shadow-sm rounded-2xl bg-background-secondary md:flex-row md:items-center md:justify-between">
          
          <div className="flex flex-col gap-2">
            <h3 className="text-heading2 text-texto-principal">
              ¿Querés iniciar tu solicitud?
            </h3>
            <p className="text-body text-texto-secundario">
              Contactanos y te asesoramos de forma simple y rápida.
            </p>
          </div>

          <Link href="/contacto">
            <Button
              text="Consultar ahora"
              className="bg-boton-primario text-texto-botones hover:bg-hover-primario"
            />
          </Link>

        </div>

        <Link
          href="/tips-consejos"
          className="font-semibold text-small text-boton-primario hover:text-hover-primario"
        >
          ← Volver a tips y consejos
        </Link>

      </section>
    </main>
  );
}