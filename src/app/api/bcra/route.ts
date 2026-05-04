import { NextResponse } from "next/server";

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

type PostBody = {
  cuil?: unknown;
};

type JsonObject = Record<string, unknown>;

const CUIL_REGEX = /^\d{11}$/;

const toNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const normalized = value.replace(",", ".").trim();
    if (normalized.length === 0) return null;
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const getLatestPeriodData = (results: JsonObject): JsonObject[] => {
  const periodos = results.periodos;
  if (!Array.isArray(periodos) || periodos.length === 0) return [];

  const latest = periodos[periodos.length - 1];
  if (!latest || typeof latest !== "object") return [];

  const latestObject = latest as JsonObject;
  const entidades = latestObject.entidades;
  if (!Array.isArray(entidades)) return [];

  return entidades.filter((item): item is JsonObject => typeof item === "object" && item !== null);
};

const mapSituacion = (item: JsonObject): BcraSituacion => {
  const entidad = typeof item.entidad === "string" ? item.entidad : "";
  const situacion = toNumber(item.situacion) ?? 0;
  const monto = toNumber(item.monto) ?? 0;
  const diasAtrasoPago = toNumber(item.diasAtrasoPago ?? item.dias_atraso_pago) ?? 0;

  return { entidad, situacion, monto, diasAtrasoPago };
};

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

export async function POST(request: Request) {
  const body = (await request.json()) as PostBody;
  const cuil = typeof body.cuil === "string" ? body.cuil.trim() : "";

  if (!cuil) {
    return NextResponse.json({ error: "El campo cuil es obligatorio." }, { status: 400 });
  }

  if (!/^\d+$/.test(cuil)) {
    return NextResponse.json({ error: "El campo cuil debe contener solo números." }, { status: 400 });
  }

  if (!CUIL_REGEX.test(cuil)) {
    return NextResponse.json({ error: "El campo cuil debe tener exactamente 11 dígitos." }, { status: 400 });
  }

  const bcraResponse = await fetch(`https://api.bcra.gob.ar/CentralDeDeudores/v1.0/Deudas/${cuil}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (bcraResponse.status === 404) {
    return NextResponse.json(buildEmptyResponse(cuil));
  }

  if (!bcraResponse.ok) {
    return NextResponse.json({ error: "No se pudo consultar el servicio del BCRA." }, { status: 502 });
  }

  const bcraPayload = (await bcraResponse.json()) as { results?: unknown };
  const results = (bcraPayload.results ?? {}) as JsonObject;
  const situaciones = getLatestPeriodData(results).map(mapSituacion);

  const cantidadSituacionesTotal = situaciones.length;
  const cantidadIrregulares = situaciones.filter((item) => item.situacion >= 2).length;
  const mayorSituacion =
    situaciones.length > 0 ? situaciones.reduce((max, item) => (item.situacion > max ? item.situacion : max), situaciones[0].situacion) : null;

  const response: BcraNormalizedResponse = {
    success: true,
    cuil,
    nombreApellido: typeof results.denominacion === "string" ? results.denominacion : "",
    situaciones,
    tieneSituacion1: situaciones.some((item) => item.situacion === 1),
    cantidadSituacionesTotal,
    cantidadIrregulares,
    mayorSituacion,
  };

  return NextResponse.json(response);
}
