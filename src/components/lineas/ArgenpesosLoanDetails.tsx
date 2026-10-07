import Link from "next/link";

export default function ArgenpesosLoanDetails() {
  return (
    <div className="mt-6 space-y-6 border-t border-texto-principal/20 pt-6 text-sm leading-relaxed text-texto-principal">
      <section className="space-y-4">
        <p className="font-semibold">Una opción de préstamo por CBU</p>
        <p>Trabajamos con distintas entidades. Estas condiciones corresponden a una de las opciones y no representan todas las líneas disponibles en Credizza.</p>
        <h3 className="text-lg font-bold">Consultá por un préstamo de $300.000</h3>
        <p>Préstamos personales con cuotas fijas en pesos. Montos generales informados: <strong>mínimo $30.000 y máximo $3.000.000</strong>. Plazos: <strong>6 a 15 meses</strong>.</p>
        <p>La disponibilidad para tu tipo de beneficio, el otorgamiento y las condiciones finales están sujetos a verificación del departamento de análisis de riesgo crediticio de la entidad. No se garantiza la aprobación ni el monto máximo.</p>
        <p className="text-xs leading-relaxed text-texto-secundario">Entidad otorgante: Argenpesos.</p>
      </section>
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Cuotas e importe total del ejemplo</h3>
        <p>Ejemplo de financiación para un capital de $300.000.</p>
        <div className="overflow-x-auto rounded-lg border border-texto-principal/20">
          <table className="w-full text-left text-xs sm:text-sm">
            <caption className="sr-only">Ejemplo de préstamo de trescientos mil pesos</caption>
            <thead className="bg-background-seccion">
              <tr><th scope="col" className="p-3">Plazo</th><th scope="col" className="p-3">Cuota mensual</th><th scope="col" className="p-3">Total a devolver</th><th scope="col" className="p-3">Costo sobre el capital</th></tr>
            </thead>
            <tbody>
              <tr className="border-t border-texto-principal/10"><th scope="row" className="whitespace-nowrap p-3">12 cuotas</th><td className="whitespace-nowrap p-3">$72.001</td><td className="whitespace-nowrap p-3">$864.012</td><td className="whitespace-nowrap p-3">$564.012</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm">Ejemplo proporcionado por Credizza. El total se calcula multiplicando las 12 cuotas por $72.001. El costo sobre el capital es la diferencia entre ese total y $300.000; no es una tasa anual ni el CFT. Las condiciones específicas deben confirmarse con la entidad antes de contratar.</p>
      </section>
      <section className="space-y-3 rounded-lg border border-texto-principal/20 bg-background-seccion p-5">
        <h3 className="text-base font-semibold">Tasas generales informadas</h3>
        <p>Estos rangos son generales y <strong>no identifican las tasas específicas del ejemplo anterior.</strong></p>
        <p className="text-base font-bold">TEA máxima general: 2.605,41%</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>TNA: mínima 215,54% · máxima 378,81%.</li>
          <li>TEA: mínima 627,49% · máxima 2.605,41%.</li>
          <li>Costo Financiero Total Nominal Anual (CFTNA): mínimo 260,81% · máximo 458,36%.</li>
        </ul>
        <p>La TNA varía según el perfil crediticio del solicitante. Consultá las tasas, los cargos y las condiciones específicas antes de aceptar la propuesta.</p>
      </section>
      <p className="text-small text-texto-secundario">Credizza brinda orientación y acompañamiento; no otorga el préstamo. <Link href="/terminos-y-condiciones" className="underline">Términos y condiciones</Link> · <Link href="/politicas-de-privacidad" className="underline">Política de privacidad</Link>.</p>
    </div>
  );
}
