'use client';
import Link from "next/link";
import { Button } from "@/components/buttons";

export default function CuantoPuedoPagarPage() {
  return (
    <main className="w-full py-12 font-sans bg-background-default md:py-16">
      <section className="mx-auto flex w-full max-w-[900px] flex-col gap-8 px-4 md:px-6">
        <div className="flex flex-col gap-3">
          <span className="px-3 py-1 rounded-full w-fit bg-background-seccion text-smallMobileBold text-texto-principal">
            Consejos
          </span>

          <h1 className="text-display text-texto-principal">
            ¿Cuánto podés pagar por mes?
          </h1>

          <p className="text-body text-texto-secundario">
            Antes de solicitar un crédito, es importante elegir una cuota que se adapte a tus ingresos
            y a tu realidad diaria. Tomarte unos minutos para evaluarlo puede ayudarte a decidir con más tranquilidad.
          </p>
        </div>

        <article className="flex flex-col gap-6 p-6 shadow-sm rounded-2xl bg-background-secondary md:p-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-heading2 text-texto-principal">
              Qué tener en cuenta
            </h2>

            <ul className="flex flex-col gap-4 text-body text-texto-secundario">
              <li>
                <span className="font-semibold text-texto-principal">
                  Revisá tus ingresos mensuales:
                </span>{" "}
                pensá cuánto dinero te queda disponible después de tus gastos habituales.
              </li>

              <li>
                <span className="font-semibold text-texto-principal">
                  Elegí una cuota cómoda:
                </span>{" "}
                la idea es que puedas cumplir con el pago sin afectar tu economía cotidiana.
              </li>

              <li>
                <span className="font-semibold text-texto-principal">
                  Tené en cuenta otros compromisos:
                </span>{" "}
                si ya contás con descuentos o gastos fijos, es importante contemplarlos.
              </li>

              <li>
                <span className="font-semibold text-texto-principal">
                  No te apures:
                </span>{" "}
                comparar opciones y entender bien el valor de la cuota puede ayudarte a tomar una mejor decisión.
              </li>

              <li>
                <span className="font-semibold text-texto-principal">
                  Consultá ante cualquier duda:
                </span>{" "}
                recibir asesoramiento puede ayudarte a encontrar una opción más adecuada para vos.
              </li>
            </ul>
          </div>

          <div className="w-full h-px bg-background-seccion" />

          <div className="flex flex-col gap-3">
            <h3 className="text-heading2 text-texto-principal">
              Recordá
            </h3>

            <p className="text-body text-texto-secundario">
              Un crédito bien elegido es aquel cuya cuota podés pagar con tranquilidad mes a mes.
            </p>
          </div>
        </article>

        <div className="flex flex-col gap-4 p-6 shadow-sm rounded-2xl bg-background-secondary md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-heading2 text-texto-principal">
              ¿Querés recibir asesoramiento?
            </h3>
            <p className="text-body text-texto-secundario">
              Contactanos para conocer tu cupo disponible y evaluar opciones.
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