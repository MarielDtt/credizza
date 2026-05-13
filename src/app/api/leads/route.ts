import { google } from "googleapis";
import { NextResponse } from "next/server";

type LeadData = {
  fecha: string;
  nombreApellido: string;
  sexo: "F" | "M";
  dni: string;
  cuil: string;
  actividad: string;
  subActividad?: string;
  situacionBcra: string;
  banco: string;
  whatsapp?: string;
  resultado: string;
  bcraEstadoConsulta?: string;
  bcraNombre?: string;
  bcraTieneSituacion1?: string;
  bcraCantidadTotal?: string;
  bcraCantidadIrregulares?: string;
  bcraMayorSituacion?: string;
  bcraDetalle?: string;
};

const requiredFields: Array<keyof Pick<LeadData, "fecha" | "dni" | "cuil" | "actividad" | "banco" | "resultado">> = ["fecha", "dni", "cuil", "actividad", "banco", "resultado"];

const getMissingFields = (lead: LeadData): string[] => requiredFields.filter((field) => !lead[field] || String(lead[field]).trim() === "");

export async function POST(request: Request) {
  try {
    const lead = (await request.json()) as LeadData;
    const missingFields = getMissingFields(lead);
    if (missingFields.length > 0) {
      return NextResponse.json({ error: `Faltan campos obligatorios: ${missingFields.join(", ")}` }, { status: 400 });
    }

    const sheetId = process.env.GOOGLE_SHEET_ID;
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY
      ?.replace(/^"|"$/g, "")
      .replace(/\\n/g, "\n")
      .replace(/\r/g, "");

    if (!sheetId || !clientEmail || !privateKey) {
      return NextResponse.json({ error: "Faltan variables de entorno para Google Sheets." }, { status: 500 });
    }

    const auth = new google.auth.JWT({ email: clientEmail, key: privateKey, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
    const sheets = google.sheets({ version: "v4", auth });

    const row = [
      lead.fecha,
      lead.nombreApellido,
      lead.sexo,
      lead.dni,
      lead.cuil,
      lead.actividad,
      lead.subActividad || "",
      lead.situacionBcra,
      lead.banco,
      lead.whatsapp || "",
      lead.resultado,
      lead.bcraEstadoConsulta || "No disponible",
      lead.bcraNombre || "",
      lead.bcraTieneSituacion1 || "",
      lead.bcraCantidadTotal || "",
      lead.bcraCantidadIrregulares || "",
      lead.bcraMayorSituacion || "",
      lead.bcraDetalle || "",
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "'Leads Credizza - Precalificador Web'!A:R",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
  console.error("Error guardando lead en Google Sheets:", JSON.stringify(error, null, 2));
  return NextResponse.json({ error: "No se pudo guardar el lead." }, { status: 500 });
}
}
