import Link from "next/link";

export default function ArgenpesosLoanDetails() {
  return (
    <div className="space-y-5 pt-3 text-body text-texto-principal">
      <section className="space-y-3">
        <h3 className="text-heading2 font-semibold">Una de las opciones disponibles</h3>
        <p className="text-xs leading-relaxed text-texto-secundario">Entidad otorgante: Argenpesos.</p>
        <p>Trabajamos con distintas entidades. Estas condiciones corresponden a una de las opciones y no representan todas las líneas disponibles en Credizza.</p>
        <p>Préstamos personales con cuotas fijas en pesos. Montos generales informados: <strong>mínimo $30.000 y máximo $3.000.000</strong>. Plazos: <strong>6 a 15 meses</strong>.</p>
        <p>La disponibilidad para tu tipo de beneficio, el otorgamiento y las condiciones finales están sujetos a verificación del departamento de análisis de riesgo crediticio de la entidad. No se garantiza la aprobación ni el monto máximo.</p>
      </section>
      <section className="space-y-3">
        <h3 className="text-heading2 font-semibold">Tasas generales informadas</h3>
        <p className="font-bold">TEA máxima general: 2.605,41%</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>TNA: mínima 215,54% · máxima 378,81%.</li>
          <li>TEA: mínima 627,49% · máxima 2.605,41%.</li>
          <li>Costo Financiero Total Nominal Anual (CFTNA): mínimo 260,81% · máximo 458,36%.</li>
        </ul>
        <p>La TNA varía según el perfil crediticio del solicitante. Consultá las tasas, los cargos y las condiciones específicas antes de aceptar la propuesta.</p>
      </section>
      <section className="space-y-3">
        <h3 className="text-heading2 font-semibold">Ejemplo de financiación</h3>
        <p>Capital: <strong>$300.000</strong>. Plazo: <strong>12 cuotas de $72.001</strong>. Total a devolver: <strong>$864.012</strong>. Diferencia sobre el capital: <strong>$564.012</strong>.</p>
        <p className="text-small text-texto-secundario">Ejemplo proporcionado por Credizza. El total se calcula multiplicando las 12 cuotas por $72.001. La diferencia sobre el capital no es una tasa anual ni el CFT. Las tasas y condiciones específicas deben confirmarse con la entidad antes de contratar.</p>
      </section>
      <section className="space-y-2 text-small text-texto-secundario">
        <p>Credizza brinda orientación y acompañamiento; no otorga el préstamo.</p>
        <p><Link href="/terminos-y-condiciones" className="underline">Términos y condiciones</Link> · <Link href="/politicas-de-privacidad" className="underline">Política de privacidad</Link>.</p>
      </section>
    </div>
  );
}
