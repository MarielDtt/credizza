'use client';
import Link from "next/link";
import { Button } from "@/components/buttons";

const articles = [
  {
    category: "Seguridad",
    title: "¿Cómo evitar estafas al solicitar un crédito?",
    description:
      "Conocé cómo proteger tus datos y evitar fraudes comunes.",
    href: "/tips-consejos/evitar-estafas",
  },
  {
    category: "Consejos",
    title: "¿Cuánto podés pagar por mes?",
    description:
      "Aprendé a elegir una cuota que se adapte a tus ingresos.",
    href: "/tips-consejos/cuanto-puedo-pagar",
  },
  {
    category: "Proceso",
    title: "¿Cómo funciona un crédito online?",
    description:
      "Te explicamos el paso a paso de forma simple.",
    href: "/tips-consejos/como-funciona-credito",
  },
];

export default function TipsYConsejosPage() {
  return (
    <main className="w-full py-12 font-sans bg-background-default md:py-16">
      <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 md:px-6">
        
        {/* HEADER */}
        <div className="flex flex-col gap-3 text-center md:text-left">
          <span className="font-semibold tracking-wider uppercase text-small text-boton-primario">
            Tips y consejos
          </span>

          <h1 className="text-display text-texto-principal">
            Consejos y novedades
          </h1>

          <p className="text-body text-texto-secundario max-w-[680px]">
            Información útil para tomar mejores decisiones antes de solicitar un crédito.
          </p>
        </div>

        {/* CARDS */}
        <div className="px-4 -mx-4 overflow-x-auto md:mx-0 md:overflow-visible md:px-0">
          <div className="flex gap-4 w-max md:grid md:w-full md:grid-cols-3 md:gap-6">
            {articles.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group flex min-h-[240px] w-[280px] flex-col justify-between rounded-2xl bg-background-secondary p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:w-full"
              >
                <div className="flex flex-col gap-4">
                  
                  {/* Categoría */}
                  <span className="px-3 py-1 rounded-full w-fit bg-background-seccion text-smallMobileBold text-texto-principal">
                    {article.category}
                  </span>

                  {/* Contenido */}
                  <div className="flex flex-col gap-3">
                    <h2 className="text-heading2 text-texto-principal">
                      {article.title}
                    </h2>

                    <p className="text-small text-texto-secundario">
                      {article.description}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <span className="mt-6 font-semibold transition-colors text-small text-boton-primario group-hover:text-hover-primario">
                  Leer más →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA FINAL */}
        <div className="flex flex-col items-center justify-between gap-4 p-6 text-center shadow-sm rounded-2xl bg-background-secondary md:flex-row md:text-left">
          <div className="flex flex-col gap-2">
            <h3 className="text-heading1 text-texto-principal">
              ¿Querés conocer tu cupo disponible?
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
      </section>
    </main>
  );
}