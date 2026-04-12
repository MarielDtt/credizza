'use client';
import Link from "next/link";
import { Button } from "@/components/buttons";

export default function EvitarEstafasPage() {
  return (
    <main className="w-full py-12 font-sans bg-background-default md:py-16">
      <section className="mx-auto flex w-full max-w-[900px] flex-col gap-8 px-4 md:px-6">
        <div className="flex flex-col gap-3">
          <span className="px-3 py-1 rounded-full w-fit bg-background-seccion text-smallMobileBold text-texto-principal">
            Seguridad
          </span>

          <h1 className="text-display text-texto-principal">
            ¿Cómo evitar estafas al solicitar un crédito?
          </h1>

          <p className="text-body text-texto-secundario">
            Antes de iniciar una gestión, es importante verificar que estés
            hablando con canales oficiales y que no compartas información
            sensible con terceros. Estos consejos pueden ayudarte a proteger tus
            datos y evitar fraudes.
          </p>
        </div>

        <article className="flex flex-col gap-6 p-6 shadow-sm rounded-2xl bg-background-secondary md:p-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-heading2 text-texto-principal">
              Recomendaciones importantes
            </h2>

            <ul className="flex flex-col gap-4 text-body text-texto-secundario">
              <li>
                <span className="font-semibold text-texto-principal">
                  No realices pagos por adelantado:
                </span>{" "}
                una gestión seria no debería solicitar dinero previo para
                comenzar el trámite.
              </li>

              <li>
                <span className="font-semibold text-texto-principal">
                  Verificá siempre el canal de contacto:
                </span>{" "}
                asegurate de comunicarte por medios oficiales antes de enviar
                datos personales.
              </li>

              <li>
                <span className="font-semibold text-texto-principal">
                  No compartas claves, códigos ni usuarios bancarios:
                </span>{" "}
                esa información es privada y no debe ser solicitada para una
                consulta inicial.
              </li>

              <li>
                <span className="font-semibold text-texto-principal">
                  Leé con atención la información:
                </span>{" "}
                revisá condiciones, cuotas y datos antes de avanzar con la
                solicitud.
              </li>

              <li>
                <span className="font-semibold text-texto-principal">
                  Ante dudas, consultá antes de seguir:
                </span>{" "}
                si algo te genera desconfianza, frená la gestión y pedí
                asesoramiento.
              </li>
            </ul>
          </div>

          <div className="w-full h-px bg-background-seccion" />

          <div className="flex flex-col gap-3">
            <h3 className="text-heading2 text-texto-principal">
              Recordá
            </h3>

            <p className="text-body text-texto-secundario">
              Tomarte unos minutos para revisar estos puntos puede ayudarte a
              gestionar tu crédito de forma más segura y con mayor tranquilidad.
            </p>
          </div>
        </article>

        <div className="flex flex-col gap-4 p-6 shadow-sm md:flex-row md:items-center md:justify-between rounded-2xl bg-background-secondary">
          <div className="flex flex-col gap-2">
            <h3 className="text-heading2 text-texto-principal">
              ¿Querés recibir asesoramiento?
            </h3>
            <p className="text-body text-texto-secundario">
              Podés contactarnos para conocer tu cupo disponible y resolver tus
              dudas.
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