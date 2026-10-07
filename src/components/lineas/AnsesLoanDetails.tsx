import Link from "next/link";

const options = [
  { months: 12, payment: "$126.099,99", total: "$1.513.199,88", cost: "$513.199,88" },
  { months: 15, payment: "$107.900,01", total: "$1.618.500,15", cost: "$618.500,15" },
  { months: 18, payment: "$95.999,98", total: "$1.727.999,64", cost: "$727.999,64" },
  { months: 24, payment: "$81.600,02", total: "$1.958.400,48", cost: "$958.400,48" },
];

export default function AnsesLoanDetails() {
  return (
    <div className="mt-6 space-y-6 border-t border-texto-principal/20 pt-6 text-texto-principal">
      <section className="space-y-4">
        <p className="font-semibold">Jubilados y pensionados ANSES · Una de las opciones disponibles</p>
        <p>Trabajamos con distintas entidades. Este ejemplo corresponde a una opción de Cooperativa La Plata; no representa todas las líneas de ANSES disponibles en Credizza.</p>
        <h3 className="text-2xl font-bold">Consultá por un préstamo de $1.000.000</h3>
        <p>Ejemplo de financiación en pesos. Monto neto a recibir en tu cuenta: <strong>$1.000.000</strong>. Plazos de esta línea: <strong>12 a 24 meses</strong>.</p>
        <p><strong>Primera cuota en diciembre de 2026.</strong> Las condiciones deben confirmarse al consultar y antes de contratar. Otorgamiento sujeto a evaluación crediticia.</p>
        <p className="text-sm">Credizza te orienta y acompaña en la solicitud. El préstamo lo otorga la Cooperativa de Crédito, Consumo y Servicios Sociales La Plata Ltda.</p>
      </section>
      <section className="space-y-3">
        <h3 className="text-2xl font-semibold">Cuotas e importe total del ejemplo</h3>
        <p>Sin cuota social ni otros cargos adicionales informados para este ejemplo. Sistema de amortización francés; cuotas mensuales, iguales y consecutivas.</p>
        <div className="overflow-x-auto rounded-lg border border-texto-principal/20">
          <table className="w-full text-left text-sm sm:text-base">
            <caption className="sr-only">Opciones para recibir un millón de pesos</caption>
            <thead className="bg-background-seccion"><tr><th scope="col" className="p-3">Plazo</th><th scope="col" className="p-3">Cuota mensual</th><th scope="col" className="p-3">Total a devolver</th><th scope="col" className="p-3">Costo sobre el capital</th></tr></thead>
            <tbody>{options.map(option => <tr key={option.months} className="border-t border-texto-principal/10"><th scope="row" className="whitespace-nowrap p-3">{option.months} cuotas</th><td className="whitespace-nowrap p-3">{option.payment}</td><td className="whitespace-nowrap p-3">{option.total}</td><td className="whitespace-nowrap p-3">{option.cost}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="text-sm">Total calculado como cantidad de cuotas × cuota mensual. El costo sobre el capital es la diferencia entre ese total y $1.000.000; no es una tasa anual ni el CFT.</p>
      </section>
      <section className="space-y-3 rounded-lg border border-texto-principal/20 bg-background-seccion p-5">
        <h3 className="text-2xl font-semibold">Tasas generales publicadas por la cooperativa</h3>
        <p>Estos rangos corresponden al conjunto de líneas de la cooperativa. <strong>No identifican las tasas específicas del ejemplo anterior.</strong></p>
        <p className="text-xl font-bold">TEA máxima general sin IVA: 178,66%</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>TNA sin IVA: mínima 48,01% · máxima 106,92%.</li>
          <li>TEA sin IVA: mínima 60,14% · máxima 178,66%.</li>
          <li>CFT nominal anual con IVA (CFTNA): mínimo 39,03% · máximo 164,67%.</li>
        </ul>
        <p>La TNA, la TEA y el CFT aplicables varían según la línea y el plazo. La entidad los informa al ingresar la solicitud y antes del otorgamiento. Pedí las tasas y condiciones específicas por escrito antes de aceptar.</p>
        <p className="text-sm">Plazos generales de la cooperativa: 3 a 24 meses. El ejemplo de esta página corresponde a la línea de 12 a 24 cuotas. Información suministrada por Credizza a partir del texto de la cooperativa; actualización: 6 de octubre de 2026.</p>
      </section>
      <section className="space-y-3 text-sm leading-relaxed">
        <h3 className="text-lg font-semibold">Entidad otorgante y atención</h3>
        <p>Cooperativa de Crédito, Consumo y Servicios Sociales La Plata Ltda. CUIT 30-69169976-8. Matrícula INAES 19.901. Teléfono: <a className="underline" href="tel:08106660984">0810-666-0984</a>. Sede social de la cooperativa: calle 46 N.º 547/9, La Plata.</p>
        <p>Credizza atiende online y no cuenta con un local de atención al público. La sede indicada pertenece a la cooperativa. Contacto Credizza: <a className="underline" href="mailto:credizza@gmail.com">credizza@gmail.com</a>.</p>
        <p>No se garantiza la aprobación. Consultá las condiciones definitivas antes de contratar. <Link href="/terminos-y-condiciones" className="underline">Términos y condiciones</Link> · <Link href="/politicas-de-privacidad" className="underline">Política de privacidad</Link>.</p>
      </section>
    </div>
  );
}
