import { NextResponse } from "next/server";

type BcraRequestBody = {
  cuil: string;
};

type BcraEntidadRaw = {
  entidad?: string;
  situacion?: number;
  monto?: number;
  diasAtrasoPago?: number;
};

type BcraPeriodoRaw = {
  periodo?: string;
  entidades?: BcraEntidadRaw[];
};

type BcraResultRaw = {
  denominacion?: string;
  periodos?: BcraPeriodoRaw[];
};

type BcraApiResponseRaw = {
  results?: BcraResultRaw[];
};

type SituacionNormalizada = {
  entidad: string;
  situacion: number;
  monto: number;
  diasAtrasoPago: number;
};

type BcraNormalizedResponse = {
  success: true;
  cuil: string;
  nombreApellido: string;
  situaciones: SituacionNormalizada[];
  tieneSituacion1: boolean;
  cantidadSituacionesTotal: number;
  cantidadIrregulares: number;
  mayorSituacion: number | null;
};

const EMPTY_RESPONSE = (cuil: string): BcraNormalizedResponse => ({
  success: true,
  cuil,
  nombreApellido: "",
  situaciones: [],
  tieneSituacion1: false,
  cantidadSituacionesTotal: 0,
  cantidadIrregulares: 0,
  mayorSituacion: null,
});

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;

const parseBody = (value: unknown): BcraRequestBody | null => {
  if (!isRecord(value)) return null;
  if (typeof value.cuil !== "string") return null;
  return { cuil: value.cuil.trim() };
};

const isValidCuil = (cuil: string): boolean => /^\d{11}$/.test(cuil);

const parseNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const parseBcraResponse = (value: unknown): BcraApiResponseRaw => {
  if (!isRecord(value)) return {};
  const resultsRaw = value.results;
  if (!Array.isArray(resultsRaw)) return {};

  const results: BcraResultRaw[] = resultsRaw
    .filter(isRecord)
    .map((result) => {
      const denominacion = typeof result.denominacion === "string" ? result.denominacion : undefined;
      const periodosRaw = Array.isArray(result.periodos) ? result.periodos : [];
      const periodos: BcraPeriodoRaw[] = periodosRaw
        .filter(isRecord)
        .map((periodo) => {
          const periodoValue = typeof periodo.periodo === "string" ? periodo.periodo : undefined;
          const entidadesRaw = Array.isArray(periodo.entidades) ? periodo.entidades : [];
          const entidades: BcraEntidadRaw[] = entidadesRaw
            .filter(isRecord)
            .map((entidad) => ({
              entidad: typeof entidad.entidad === "string" ? entidad.entidad : undefined,
              situacion: parseNumber(entidad.situacion) ?? undefined,
              monto: parseNumber(entidad.monto) ?? undefined,
              diasAtrasoPago: parseNumber(entidad.diasAtrasoPago) ?? undefined,
            }));

          return { periodo: periodoValue, entidades };
        });

      return { denominacion, periodos };
    });

  return { results };
};

const getLatestPeriodo = (periodos: BcraPeriodoRaw[]): BcraPeriodoRaw | null => {
  if (periodos.length === 0) return null;

  const sorted = [...periodos].sort((a, b) => {
    const aKey = a.periodo ?? "";
    const bKey = b.periodo ?? "";
    return bKey.localeCompare(aKey);
  });

  return sorted[0] ?? null;
};

const normalizeBcra = (cuil: string, raw: BcraApiResponseRaw): BcraNormalizedResponse => {
  const firstResult = raw.results?.[0];
  if (!firstResult) return EMPTY_RESPONSE(cuil);

  const latestPeriodo = getLatestPeriodo(firstResult.periodos ?? []);
  const entidades = latestPeriodo?.entidades ?? [];

  const situaciones: SituacionNormalizada[] = entidades
    .map((entidad): SituacionNormalizada | null => {
      const situacion = entidad.situacion;
      const monto = entidad.monto;
      const diasAtrasoPago = entidad.diasAtrasoPago;

      if (situacion === undefined || monto === undefined || diasAtrasoPago === undefined) return null;

      return {
        entidad: entidad.entidad ?? "",
        situacion,
        monto,
        diasAtrasoPago,
      };
    })
    .filter((item): item is SituacionNormalizada => item !== null);

  const tieneSituacion1 = situaciones.some((item) => item.situacion === 1);
  const cantidadIrregulares = situaciones.filter((item) => item.situacion >= 2).length;
  const mayorSituacion = situaciones.length > 0 ? Math.max(...situaciones.map((item) => item.situacion)) : null;

  return {
    success: true,
    cuil,
    nombreApellido: firstResult.denominacion ?? "",
    situaciones,
    tieneSituacion1,
    cantidadSituacionesTotal: situaciones.length,
    cantidadIrregulares,
    mayorSituacion,
  };
};

export async function POST(request: Request) {
  let cuilForLogs = "";

  try {
    const parsedBody = parseBody(await request.json());
    if (!parsedBody || !isValidCuil(parsedBody.cuil)) {
      return NextResponse.json({ error: "CUIL inválido. Debe contener solo números y 11 dígitos." }, { status: 400 });
    }

    cuilForLogs = parsedBody.cuil;

    const bcraResponse = await fetch(`https://api.bcra.gob.ar/CentralDeDeudores/v1.0/Deudas/${parsedBody.cuil}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (bcraResponse.status === 404) {
      return NextResponse.json(EMPTY_RESPONSE(parsedBody.cuil));
    }

    if (!bcraResponse.ok) {
      const errorBody = await bcraResponse.text();
      console.error("BCRA respondió con error", {
        status: bcraResponse.status,
        statusText: bcraResponse.statusText,
        cuil: parsedBody.cuil,
        body: errorBody,
      });
      return NextResponse.json({ error: "Error consultando BCRA." }, { status: 500 });
    }

    const bcraRaw = parseBcraResponse(await bcraResponse.json());
    const normalized = normalizeBcra(parsedBody.cuil, bcraRaw);

    return NextResponse.json(normalized);
  } catch (error: unknown) {
    console.error("Error interno consultando BCRA", { cuil: cuilForLogs, error });
    return NextResponse.json({ error: "Error interno consultando BCRA." }, { status: 500 });
  }
}
