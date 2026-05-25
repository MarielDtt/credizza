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
  "Galicia",
  "Nación",
  "Provincia Bs.As.",
  "ICBC",
  "Citibank",
  "BBVA",
  "Córdoba",
  "Supervielle",
  "Ciudad de Bs.As.",
  "Patagonia",
  "Hipotecario",
  "San Juan",
  "Santander",
  "HSBC",
  "Credicoop",
  "Itaú",
  "Macro",
  "Nuevo Santa Fe",
  "Chubut",
  "Santa Cruz",
  "La Pampa",
  "Corrientes",
  "Neuquén",
  "Valores",
  "Comafi",
  "BICE",
  "Chaco",
  "Formosa",
  "CMF",
  "Santiago del Estero",
  "Industrial",
  "Entre Ríos",
  "Municipal Rosario",
  "Bank of China",
  "Brubank",
  "Bibank",
  "Open Bank",
  "JPMorgan",
  "Roela",
  "Mariva",
  "BNP Paribas",
  "Tierra del Fuego",
  "BROU",
  "Sáenz",
  "Meridian",
  "Piano",
  "Julio",
  "Rioja",
  "Del Sol",
  "VOII",
  "Cetelem",
  "Servicios Financieros",
  "Servicios y Transacciones",
  "RCI",
  "BACS",
  "Masventas",
  "Wilobank",
  "Columbia",
  "Bica",
  "Coinag",
  "Comercio",
  "Súcredito",
  "Dino",
  "Compañía Financiera Argentina",
  "Volkswagen Financial",
  "IUDU",
  "FCA",
  "GPAT",
  "Mercedes-Benz Financiera",
  "Rombo",
  "John Deere Credit",
  "PSA Finance",
  "Toyota Financiera",
  "Naranja Digital",
  "Montemar",
  "Reba",
  "Crédito Regional",
  "Otro banco",
] as const;

export const buildLeadData = (partial: Partial<LeadData>): LeadData => ({
  fecha: partial.fecha ?? nowAsDisplayDate(),
  nombreApellido: partial.nombreApellido ?? "",
  sexo: partial.sexo ?? "",
  dni: partial.dni ?? "",
  cuil: partial.cuil ?? "",
  actividad: partial.actividad ?? "",
  subActividad: partial.subActividad ?? "",
  situacionBcra: partial.situacionBcra ?? "Pendiente BCRA",
  banco: partial.banco ?? "",
  whatsapp: partial.whatsapp ?? "",
  resultado: partial.resultado ?? "",
});

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

export type BcraMockData = {
  totalSituaciones: number;
  irregulares: number;
  tieneSituacion1: boolean;
};

export const mockBcraData: BcraMockData = {
  totalSituaciones: 1,
  irregulares: 0,
  tieneSituacion1: true,
};

export const evaluateLead = (lead: LeadData, bcraData: BcraMockData): Resultado => {
  const { irregulares, totalSituaciones, tieneSituacion1 } = bcraData;

  if (!lead.actividad) return "revision_manual";
  if (lead.actividad === "Empleado provincial de Santa Fe" || lead.actividad === "Empleado provincial Chubut" || lead.actividad === "No estoy seguro / Otro") return "revision_manual";
  if (lead.actividad === "Jubilado" || lead.actividad === "Pensión por viudez") return irregulares <= 2 ? "precalifica_haberes_cbu" : "precalifica_haberes";
  if (lead.actividad === "Docente" && lead.subActividad === "Privada") return tieneSituacion1 && irregulares === 0 ? "precalifica_cbu" : "rechazado";
  if (lead.actividad === "Docente") return irregulares === 0 ? "precalifica_haberes_cbu" : "precalifica_haberes";
  if (lead.actividad === "Policía") return irregulares === 0 ? "precalifica_haberes_cbu" : "precalifica_haberes";
  if (lead.actividad === "AUH") return tieneSituacion1 && irregulares === 0 ? "precalifica_cbu" : "rechazado";
  if (lead.actividad === "Pensiones") {
    if (lead.subActividad === "Otro") return "revision_manual";
    return irregulares <= 2 ? "precalifica_haberes_cbu" : "rechazado";
  }
  if (lead.actividad === "Empleado GCBA") {
    if (totalSituaciones === 0) return "revision_manual";
    return irregulares / totalSituaciones > 0.4 ? "precalifica_haberes" : "precalifica_haberes_cbu";
  }
  if (lead.actividad === "Empleado público" && (lead.subActividad === "Nacional" || lead.subActividad === "Municipal")) {
    return tieneSituacion1 && irregulares === 0 ? "precalifica_cbu" : "rechazado";
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
    `* Situación BCRA: ${lead.situacionBcra || "No informado"}`,
    `* Resultado: ${lead.resultado || "No informado"}`,
    `* Fecha: ${lead.fecha}`,
  ];

  return lines.join("\n");
};

export const saveLeadMock = async (lead: LeadData): Promise<void> => {
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      console.error("Error guardando lead en /api/leads", await response.text());
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") {
      console.error("Timeout guardando lead en /api/leads");
      return;
    }

    console.error("Error enviando lead a /api/leads", error);
  }
};

type BcraSituacion = {
  entidad: string;
  situacion: number;
  monto: number;
  diasAtrasoPago: number;
};

type BcraApiResponse = {
  success: boolean;
  cuil: string;
  nombreApellido?: string;
  situaciones?: BcraSituacion[];
  tieneSituacion1?: boolean;
  cantidadSituacionesTotal?: number;
  cantidadIrregulares?: number;
  mayorSituacion?: number | null;
  message?: string;
};

const ACTIVIDADES_FLEXIBLES: readonly Actividad[] = [
  "Jubilado",
  "Pensión por viudez",
  "Pensiones",
];

const ACTIVIDADES_ESTRICTAS: readonly Actividad[] = [
  "Docente",
  "Policía",
  "AUH",
];

const calcularSituacionBcra = (actividad: Actividad, situaciones: BcraSituacion[]): string => {
  const numeros = situaciones
    .map((item) => Number(item.situacion))
    .filter((situacion) => !Number.isNaN(situacion));

  const tieneSituacion1 = numeros.includes(1);
  const irregulares = numeros.filter((situacion) => situacion > 1);
  const mayorSituacion = numeros.length > 0 ? Math.max(...numeros) : null;

  if (ACTIVIDADES_FLEXIBLES.includes(actividad)) {
    if (irregulares.length >= 3) return "Afectado";
    if (irregulares.length >= 1 && mayorSituacion !== null) return String(mayorSituacion);
    if (tieneSituacion1) return "1";
    return "Sin situación";
  }

  if (ACTIVIDADES_ESTRICTAS.includes(actividad)) {
    if (irregulares.length > 0) return "Afectado";
    if (tieneSituacion1) return "1";
    return "No califica";
  }

  if (irregulares.length > 0) return "Afectado";
  if (tieneSituacion1) return "1";
  return "Sin situación";
};

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

const fetchBcraWithRetry = async (
  cuil: string
): Promise<BcraApiResponse> => {
  const maxAttempts = 5;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetch("/api/bcra", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cuil }),
        signal: AbortSignal.timeout(15000),
      });

      // Si BCRA está temporalmente saturado
      if (response.status === 503) {
        if (attempt < maxAttempts) {
          await sleep(500);
          continue;
        }
      }

      const data = (await response.json()) as BcraApiResponse;

      if (response.ok && data.success) {
        return data;
      }
    } catch {
      // Error de red o timeout → reintenta
    }

    if (attempt < maxAttempts) {
      await sleep(500);
    }
  }

  throw new Error("No se pudo consultar BCRA después de varios intentos.");
};
export const enrichLeadWithBcra = async (
  lead: LeadData
): Promise<LeadData> => {
  try {
    const data = await fetchBcraWithRetry(lead.cuil);

    const situaciones = data.situaciones ?? [];

    return buildLeadData({
      ...lead,
      nombreApellido: data.nombreApellido ?? "",
      situacionBcra: lead.actividad
        ? calcularSituacionBcra(lead.actividad, situaciones)
        : "Sin situación",
    });
  } catch {
    return buildLeadData({
      ...lead,
      nombreApellido: "",
      situacionBcra: "BCRA no disponible",
    });
  }
};