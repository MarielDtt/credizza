import { Actividad, LeadData, Resultado, Sexo } from "./mariaCredizzaChat.types";

export const ACTIVIDADES_DISPONIBLES: readonly Actividad[] = [
  "Jubilado",
  "Pensión por viudez",
  "Docente",
  "Policía",
  "Pensiones",
  "AUH",
  "Empleado público",
  "Empleado GCBA",
  "Empleado provincial de Santa Fe",
  "Empleado provincial Chubut",
  "No estoy seguro / Otro",
] as const;

export const BANCOS_DISPONIBLES: readonly string[] = [
  "Nación",
  "Provincia Bs.As.",
  "Ciudad de Bs.As.",
  "Supervielle",
  "Patagonia",
  "Macro",
  "Galicia",
  "Santander",
  "BBVA",
  "Credicoop",
  "Nuevo Banco Santa Fe",
  "Banco Chubut",
  "Otro banco",
] as const;

export const normalizeDni = (value: string): string => {
  const digits = value.replace(/[.\s-]/g, "").replace(/\D/g, "");
  if (digits.length === 7) return `0${digits}`;
  return digits;
};

export const validateDni = (value: string): { isValid: boolean; normalized: string; error?: string } => {
  const normalized = normalizeDni(value);
  if (!/^\d+$/.test(normalized)) return { isValid: false, normalized, error: "El DNI debe contener solo números." };
  if (normalized.length < 8 || normalized.length > 8) {
    return { isValid: false, normalized, error: "El DNI debe tener 7 u 8 dígitos (se normaliza a 8)." };
  }
  return { isValid: true, normalized };
};

export const generateCuil = (dni: string, sexo: Sexo): string => {
  const normalizedDni = normalizeDni(dni);
  const digits = normalizedDni.padStart(8, "0");
  const base = sexo === "M" ? "20" : "27";
  const factors = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

  const calcDv = (prefix: string): number => {
    const raw = `${prefix}${digits}`.split("").map((item) => Number(item));
    const total = raw.reduce((acc, num, index) => acc + num * factors[index], 0);
    const remainder = total % 11;
    return 11 - remainder;
  };

  let prefix = base;
  let dv = calcDv(prefix);

  if (dv === 11) dv = 0;
  if (dv === 10) {
    prefix = "23";
    dv = sexo === "M" ? 9 : 4;
  }

  return `${prefix}-${digits}-${dv}`;
};

const formatDate = (date: Date): string => {
  const day = `${date.getDate()}`.padStart(2, "0");
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const year = date.getFullYear();
  const hour = `${date.getHours()}`.padStart(2, "0");
  const minute = `${date.getMinutes()}`.padStart(2, "0");
  return `${day}-${month}-${year} ${hour}:${minute}`;
};

export const nowAsDisplayDate = (): string => formatDate(new Date());

export const getSubactivityPrompt = (actividad: Actividad): string => {
  const promptMap: Partial<Record<Actividad, string>> = {
    Jubilado: "Gracias, su jubilación pertenece a:",
    "Pensión por viudez": "Gracias, su pensión pertenece a:",
    Docente: "Gracias, su actividad de docente pertenece a:",
    Policía: "Gracias, su actividad de policía pertenece a:",
    Pensiones: "Gracias, su pensión corresponde a:",
    "Empleado público": "Gracias, su empleo público pertenece a:",
  };
  return promptMap[actividad] ?? "Gracias. Continuamos con su evaluación.";
};

export const evaluateLead = (lead: LeadData): Resultado => {
  // TODO: Reemplazar por evaluación real con BCRA.
  const irregulares = 0;
  const totalSituaciones = 1;
  const hasSituacionUno = true;

  if (!lead.actividad) return "revision_manual";
  if (lead.actividad === "Empleado provincial de Santa Fe" || lead.actividad === "Empleado provincial Chubut" || lead.actividad === "No estoy seguro / Otro") return "revision_manual";
  if (lead.actividad === "Jubilado" || lead.actividad === "Pensión por viudez") return irregulares <= 2 ? "precalifica_haberes_cbu" : "precalifica_haberes";
  if (lead.actividad === "Docente" && lead.subActividad === "Privada") return hasSituacionUno && irregulares === 0 ? "precalifica_cbu" : "rechazado";
  if (lead.actividad === "Docente") return irregulares === 0 ? "precalifica_haberes_cbu" : "precalifica_haberes";
  if (lead.actividad === "Policía") return irregulares === 0 ? "precalifica_haberes_cbu" : "precalifica_haberes";
  if (lead.actividad === "AUH") return hasSituacionUno && irregulares === 0 ? "precalifica_cbu" : "rechazado";
  if (lead.actividad === "Pensiones") {
    if (lead.subActividad === "Otro") return "revision_manual";
    return irregulares <= 2 ? "precalifica_haberes_cbu" : "rechazado";
  }
  if (lead.actividad === "Empleado GCBA") {
    if (totalSituaciones === 0) return "revision_manual";
    return irregulares / totalSituaciones > 0.4 ? "precalifica_haberes" : "precalifica_haberes_cbu";
  }
  if (lead.actividad === "Empleado público" && (lead.subActividad === "Nacional" || lead.subActividad === "Municipal")) {
    return hasSituacionUno && irregulares === 0 ? "precalifica_cbu" : "rechazado";
  }
  if (lead.actividad === "Empleado público" && lead.subActividad === "Provincial") {
    if (totalSituaciones === 0) return "revision_manual";
    return irregulares / totalSituaciones > 0.4 ? "precalifica_haberes" : "precalifica_haberes_cbu";
  }

  return "revision_manual";
};

export const toVisibleResult = (resultado: Resultado): string => {
  const map: Record<Resultado, string> = {
    precalifica_cbu: "Precalifica CBU",
    precalifica_haberes_cbu: "Precalifica Haberes y CBU",
    precalifica_haberes: "Precalifica Haberes",
    revision_manual: "Requiere revisión por operador",
    rechazado: "Rechazado",
  };
  return map[resultado];
};

export const buildWhatsAppMessage = (lead: LeadData): string => {
  const lines = [
    "Hola, me asesoró María de Credizza.",
    "Comparto una precalificación:",
    `* Actividad: ${lead.actividad ?? "No informado"}`,
    ...(lead.subActividad ? [`* Subactividad: ${lead.subActividad}`] : []),
    `* Banco: ${lead.banco ?? "No informado"}`,
    `* DNI: ${lead.dni ?? "No informado"}`,
    `* CUIL: ${lead.cuil ?? "No informado"}`,
    `* Sexo: ${lead.sexo ?? "No informado"}`,
    `* Resultado: ${lead.resultado ? toVisibleResult(lead.resultado) : "No informado"}`,
    `* Fecha: ${lead.fecha}`,
  ];

  return encodeURIComponent(lines.join("\n"));
};

export const saveLeadMock = async (lead: LeadData): Promise<void> => {
  // TODO: Reemplazar por integración real con Google Sheets o backend.
  await new Promise((resolve) => window.setTimeout(resolve, 700));
  console.info("Lead guardado (mock)", lead);
};
