export type ChatStep =
  | "inicio"
  | "actividad"
  | "subActividad"
  | "banco"
  | "dni"
  | "sexo"
  | "procesando"
  | "resultado"
  | "whatsapp"
  | "fin";

export type Actividad =
  | "Jubilado"
  | "Pensión por viudez"
  | "Docente"
  | "Policía"
  | "Pensiones"
  | "AUH"
  | "Empleado público"
  | "Empleado GCBA"
  | "Empleado provincial de Santa Fe"
  | "No estoy seguro / Otro";

export type SubActividad =
  | "ANSES"
  | "IPS"
  | "Privado"
  | "Público"
  | "Fuerza activa"
  | "Retirado"
  | "Otro";

export type Sexo = "F" | "M";

export type Resultado =
  | "precalifica_haberes_cbu"
  | "precalifica_haberes"
  | "revision_manual"
  | "rechazado";

export type LeadData = {
  actividad: Actividad | null;
  subActividad: SubActividad | null;
  banco: string | null;
  dni: string | null;
  sexo: Sexo | null;
  resultado: Resultado | null;
  whatsapp: string | null;
  fecha: string;
};
