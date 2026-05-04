import { NextResponse } from "next/server";

type BcraRequestBody = { cuil: string };

type BcraSituacion = {
  entidad: string;
  situacion: number;
  monto: number;
  diasAtrasoPago: number;
};

type BcraNormalizedResponse = {
  success: true;
  cuil: string;
  nombreApellido: string;
  situaciones: BcraSituacion[];
  tieneSituacion1: boolean;
  cantidadSituacionesTotal: number;
  cantidadIrregulares: number;
  mayorSituacion: number | null;
};

type RawEntidad = Record<string, unknown>;
type RawPeriodo = Record<string, unknown>;
type RawResult = Record<string, unknown>;

const buildEmptyResponse = (cuil: string): BcraNormalizedResponse => ({
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

const toFiniteNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const getEntidadesArray = (periodo: RawPeriodo): RawEntidad[] => {
  const direct = periodo.entidades;
  if (Array.isArray(direct)) {
    return direct.filter(isRecord);
  }

  const nestedDetails = periodo.detalleEntidades;
  if (Array.isArray(nestedDetails)) {
    return nestedDetails.filter(isRecord);
  }

  return [];
};

const normalize = (cuil: string, rawResponse: unknown): BcraNormalizedResponse => {
  if (!isRecord(rawResponse)) return buildEmptyResponse(cuil);

  const resultsRaw = rawResponse.results;
  const results = Array.isArray(resultsRaw) ? resultsRaw.filter(isRecord) : [];
  const result = (results[0] as RawResult | undefined) ?? null;
  if (!result) return buildEmptyResponse(cuil);

  const nombreApellido = typeof result.denominacion === "string" ? result.denominacion : "";

  const periodosRaw = result.periodos;
  const periodos = Array.isArray(periodosRaw) ? periodosRaw.filter(isRecord) : [];
  const latestPeriodo = [...periodos].sort((a, b) => {
    const aPeriodo = typeof a.periodo === "string" ? a.periodo : "";
    const bPeriodo = typeof b.periodo === "string" ? b.periodo : "";
    return bPeriodo.localeCompare(aPeriodo);
  })[0];

  if (!latestPeriodo) {
    return { ...buildEmptyResponse(cuil), nombreApellido };
  }

  const entidades = getEntidadesArray(latestPeriodo);

  const situaciones: BcraSituacion[] = entidades
    .map((entidad) => {
      const situacion = toFiniteNumber(entidad.situacion);
      const monto = toFiniteNumber(entidad.monto);
      const diasAtrasoPago = toFiniteNumber(entidad.diasAtrasoPago);
      if (situacion === null || monto === null || diasAtrasoPago === null) return null;

      return {
        entidad: typeof entidad.entidad === "string" ? entidad.entidad : "",
        situacion,
        monto,
        diasAtrasoPago,
      };
    })
    .filter((item): item is BcraSituacion => item !== null);

  const cantidadSituacionesTotal = situaciones.length;
  const cantidadIrregulares = situaciones.filter((item) => item.situacion >= 2).length;

  return {
    success: true,
    cuil,
    nombreApellido,
    situaciones,
    tieneSituacion1: situaciones.some((item) => item.situacion === 1),
    cantidadSituacionesTotal,
    cantidadIrregulares,
    mayorSituacion: cantidadSituacionesTotal > 0 ? Math.max(...situaciones.map((item) => item.situacion)) : null,
  };
};

const parseBody = (value: unknown): BcraRequestBody | null => {
  if (!isRecord(value) || typeof value.cuil !== "string") return null;
  return { cuil: value.cuil.trim() };
};

const isValidCuil = (cuil: string): boolean => /^\d{11}$/.test(cuil);

export async function POST(request: Request) {
  try {
    const bodyUnknown: unknown = await request.json();
    const body = parseBody(bodyUnknown);

    if (!body || !isValidCuil(body.cuil)) {
      return NextResponse.json({ error: "CUIL inválido. Debe contener solo números y exactamente 11 dígitos." }, { status: 400 });
    }

    const upstream = await fetch(`https://api.bcra.gob.ar/CentralDeDeudores/v1.0/Deudas/${body.cuil}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (upstream.status === 404) {
      return NextResponse.json(buildEmptyResponse(body.cuil));
    }

    if (!upstream.ok) {
      console.error("BCRA upstream error", {
        status: upstream.status,
        statusText: upstream.statusText,
        cuil: body.cuil,
        body: await upstream.text(),
      });
      return NextResponse.json({ error: "Error consultando BCRA." }, { status: 500 });
    }

    const upstreamJson: unknown = await upstream.json();
    return NextResponse.json(normalize(body.cuil, upstreamJson));
  } catch (error: unknown) {
    console.error("Error interno en /api/bcra", { error });
    return NextResponse.json({ error: "Error interno consultando BCRA." }, { status: 500 });
  }
}
