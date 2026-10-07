import Link from "next/link";

export default function ArgenpesosLoanDetails() {
  return (
    <div className="space-y-5 pt-3 text-body text-texto-principal">
      <section className="space-y-3">
        <h3 className="text-heading2 font-semibold">Una de las opciones: Argenpesos</h3>
        <p>Trabajamos con distintas entidades. Estas condiciones corresponden a una opción de Argenpesos y no representan todas las líneas disponibles en Credizza.</p>
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
        <h3 className="text-heading2 font-semibold">Ejemplo incluido en la información de la entidad</h3>
        <p>Capital: <strong>$10.000</strong>. Plazo: <strong>12 cuotas de $3.300</strong>. Total a devolver: <strong>$39.600</strong>. Diferencia sobre el capital: <strong>$29.600</strong>.</p>
        <p className="text-small text-texto-secundario">Este ejemplo fue suministrado junto con las condiciones generales y utiliza un monto inferior al mínimo informado de $30.000. No constituye una oferta vigente de $10.000. Las tasas específicas del ejemplo no fueron identificadas en el texto recibido.</p>
      </section>
      <section className="space-y-2 text-small text-texto-secundario">
        <p>Opción informada por Argenpesos. Credizza brinda orientación y acompañamiento; no otorga el préstamo. Información proporcionada a Credizza: 6 de octubre de 2026.</p>
        <p><Link href="/terminos-y-condiciones" className="underline">Términos y condiciones</Link> · <Link href="/politicas-de-privacidad" className="underline">Política de privacidad</Link>.</p>
      </section>
    </div>
  );
}
