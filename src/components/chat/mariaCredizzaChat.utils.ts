import { Actividad, LeadData, Resultado, SubActividad } from "./mariaCredizzaChat.types";

export const BANCOS_DISPONIBLES: readonly string[] = [
  "Banco Nación",
  "Banco Provincia",
  "Banco Ciudad",
  "Banco Santander",
  "BBVA",
  "Banco Galicia",
  "Banco Macro",
  "Banco Patagonia",
  "Banco Credicoop",
  "ICBC",
  "HSBC",
  "Supervielle",
  "Brubank",
  "Otro banco",
] as const;

export const SUBACTIVIDAD_POR_ACTIVIDAD: Record<Actividad, readonly SubActividad[]> = {
  Jubilado: ["ANSES", "IPS", "Otro"],
  "Pensión por viudez": ["ANSES", "IPS", "Otro"],
  Docente: ["Público", "Privado", "Otro"],
  Policía: ["Fuerza activa", "Retirado"],
  Pensiones: ["ANSES", "IPS", "Otro"],
  AUH: ["ANSES"],
  "Empleado público": ["Público", "Otro"],
  "Empleado GCBA": ["Público"],
  "Empleado provincial de Santa Fe": ["Público"],
  "No estoy seguro / Otro": ["Otro"],
};

export const normalizeDni = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 7) {
    return `0${digits}`;
  }
  return digits;
};

export const validateDni = (value: string): { isValid: boolean; normalized: string; error?: string } => {
  const normalized = normalizeDni(value);
  if (!/^\d+$/.test(normalized)) {
    return { isValid: false, normalized, error: "El DNI debe contener solo números." };
  }
  if (normalized.length !== 8) {
    return { isValid: false, normalized, error: "El DNI debe tener 8 dígitos." };
  }
  return { isValid: true, normalized };
};

export const evaluateLead = (lead: Pick<LeadData, "actividad" | "subActividad" | "banco" | "dni">): Resultado => {
  if (!lead.actividad || !lead.subActividad || !lead.banco || !lead.dni) {
    return "revision_manual";
  }

  if (lead.actividad === "AUH") {
    return "rechazado";
  }

  if (lead.subActividad === "ANSES" || lead.subActividad === "IPS") {
    return lead.banco === "Otro banco" ? "precalifica_haberes" : "precalifica_haberes_cbu";
  }

  if (lead.actividad === "No estoy seguro / Otro" || lead.subActividad === "Otro") {
    return "revision_manual";
  }

  return "precalifica_haberes";
};

export const buildWhatsAppMessage = (lead: LeadData): string => {
  const message = [
    "Hola, soy María de Credizza.",
    "Comparto una precalificación simulada:",
    `- Actividad: ${lead.actividad ?? "No informado"}`,
    `- Subactividad: ${lead.subActividad ?? "No informado"}`,
    `- Banco: ${lead.banco ?? "No informado"}`,
    `- DNI: ${lead.dni ?? "No informado"}`,
    `- Sexo: ${lead.sexo ?? "No informado"}`,
    `- Resultado: ${lead.resultado ?? "No informado"}`,
    `- Fecha: ${lead.fecha}`,
  ].join("\n");

  return encodeURIComponent(message);
};

export const saveLeadMock = async (lead: LeadData): Promise<void> => {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 700);
  });
  console.info("Lead guardado (mock)", lead);
};
