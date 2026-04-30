"use client";

import { FormEvent, useMemo, useState } from "react";
import { Actividad, ChatStep, LeadData, Sexo, SubActividad } from "./mariaCredizzaChat.types";
import {
  ACTIVIDADES_DISPONIBLES,
  BANCOS_DISPONIBLES,
  buildWhatsAppMessage,
  evaluateLead,
  generateCuil,
  getSubactivityPrompt,
  normalizeDni,
  nowAsDisplayDate,
  saveLeadMock,
  toVisibleResult,
  validateDni,
  mockBcraData,
} from "./mariaCredizzaChat.utils";

type ChatMessage = { from: "bot" | "user"; text: string };

const ACTIVIDAD_SUBOPCIONES: Partial<Record<Actividad, readonly SubActividad[]>> = {
  Jubilado: ["ANSES", "IPS Bs.As.", "Provincial Santa Fe", "Provincial Chubut", "Otro"],
  "Pensión por viudez": ["ANSES", "IPS Bs.As.", "Provincial Santa Fe", "Provincial Chubut", "Otro"],
  Docente: ["Pública", "Privada"],
  Policía: ["Provincia Bs.As.", "CABA", "Provincial Santa Fe", "Provincial Chubut", "Otro"],
  Pensiones: ["PUAM", "PNC", "MADRES", "Otro"],
  "Empleado público": ["Nacional", "Provincial", "Municipal"],
};

const SUBOPCIONES_NIVEL_2: Partial<Record<SubActividad, readonly SubActividad[]>> = {
  Pública: ["Provincia Bs.As.", "CABA", "Provincial Santa Fe", "Provincial Chubut", "Otro"],
  Provincial: ["Provincia Bs.As.", "CABA", "Provincial Santa Fe", "Provincial Chubut", "Otro"],
};

const suggestedBankForSub = (value: SubActividad | null, actividad: Actividad | null): string | null => {
  if (actividad === "Empleado GCBA") return "Ciudad de Bs.As.";
  if (actividad === "Empleado provincial de Santa Fe") return "Nuevo Banco Santa Fe";
  if (actividad === "Empleado provincial Chubut") return "Banco Chubut";

  const map: Partial<Record<SubActividad, string>> = {
    "IPS Bs.As.": "Provincia Bs.As.",
    "Provincia Bs.As.": "Provincia Bs.As.",
    CABA: "Ciudad de Bs.As.",
    "Provincial Santa Fe": "Nuevo Banco Santa Fe",
    "Provincial Chubut": "Banco Chubut",
    Nacional: "Nación",
  };
  return value ? map[value] ?? null : null;
};

export default function MariaCredizzaChat() {
  const [step, setStep] = useState<ChatStep>("inicio");
  const [messages, setMessages] = useState<ChatMessage[]>([{ from: "bot", text: "Hola 👋 Soy María de Credizza. Vamos a iniciar su evaluación para obtener un crédito. Es rápido y sin compromiso." }]);
  const [lead, setLead] = useState<LeadData>({ actividad: null, subActividad: null, banco: null, dni: null, cuil: null, sexo: null, resultado: null, whatsapp: null, fecha: nowAsDisplayDate() });

  const [actividadInput, setActividadInput] = useState("");
  const [subOptions, setSubOptions] = useState<readonly SubActividad[]>([]);
  const [secondSubOptions, setSecondSubOptions] = useState<readonly SubActividad[]>([]);
  const [bancoInput, setBancoInput] = useState("");
  const [suggestedBank, setSuggestedBank] = useState<string | null>(null);
  const [showFullBankSearch, setShowFullBankSearch] = useState(true);
  const [dniInput, setDniInput] = useState("");
  const [dniError, setDniError] = useState("");
  const [whatsInput, setWhatsInput] = useState("");
  const [whatsError, setWhatsError] = useState("");

  const actividadFiltrada = useMemo(() => ACTIVIDADES_DISPONIBLES.filter((item) => item.toLowerCase().includes(actividadInput.toLowerCase())), [actividadInput]);
  const bancosFiltrados = useMemo(() => BANCOS_DISPONIBLES.filter((item) => item.toLowerCase().includes(bancoInput.toLowerCase())), [bancoInput]);

  const addBot = (text: string): void => setMessages((prev) => [...prev, { from: "bot", text }]);
  const addUser = (text: string): void => setMessages((prev) => [...prev, { from: "user", text }]);

  const goToBankStep = (actividad: Actividad, subActividad: SubActividad | null): void => {
    const suggested = suggestedBankForSub(subActividad, actividad);
    setSuggestedBank(suggested);
    setShowFullBankSearch(!suggested);
    addBot("Indique su banco.");
    setStep("banco");
  };

  const onActividad = (actividad: Actividad): void => {
    addUser(actividad);
    setActividadInput("");
    setLead((prev) => ({ ...prev, actividad, subActividad: null }));

    if (actividad === "Empleado GCBA" || actividad === "Empleado provincial de Santa Fe" || actividad === "Empleado provincial Chubut" || actividad === "No estoy seguro / Otro" || actividad === "AUH") {
      goToBankStep(actividad, null);
      return;
    }

    const initialSub = ACTIVIDAD_SUBOPCIONES[actividad] ?? [];
    setSubOptions(initialSub);
    setSecondSubOptions([]);
    addBot(getSubactivityPrompt(actividad));
    if (actividad === "Jubilado") addBot("¿Por dónde cobra su jubilación?");
    if (actividad === "Pensión por viudez") addBot("¿Por dónde cobra su pensión?");
    if (actividad === "Docente") addBot("¿La institución es pública o privada?");
    if (actividad === "Empleado público") addBot("¿A qué sector pertenece?");
    setStep("subActividad");
  };

  const onSubActivity = (value: SubActividad): void => {
    addUser(value);
    const nextLevel = SUBOPCIONES_NIVEL_2[value];
    if (nextLevel) {
      setLead((prev) => ({ ...prev, subActividad: value }));
      setSecondSubOptions(nextLevel);
      addBot("Indique la jurisdicción.");
      return;
    }

    const effectiveSub = secondSubOptions.length > 0 ? value : value;
    setLead((prev) => ({ ...prev, subActividad: effectiveSub }));
    goToBankStep(lead.actividad ?? "No estoy seguro / Otro", effectiveSub);
  };

  const onBanco = (banco: string): void => {
    addUser(banco);
    setLead((prev) => ({ ...prev, banco }));
    addBot("Ingrese su DNI.");
    setStep("dni");
  };

  const onDni = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const check = validateDni(dniInput);
    if (!check.isValid) {
      setDniError(check.error ?? "DNI inválido.");
      return;
    }
    setDniError("");
    const normalized = normalizeDni(check.normalized);
    addUser(normalized);
    setLead((prev) => ({ ...prev, dni: normalized }));
    addBot("Sexo");
    setStep("sexo");
  };

  const onSexo = async (sexo: Sexo): Promise<void> => {
    addUser(sexo);
    const cuil = lead.dni ? generateCuil(lead.dni, sexo) : null;
    const updatedLead: LeadData = { ...lead, sexo, cuil, fecha: nowAsDisplayDate() };
    addBot("Procesando información...");
    setStep("procesando");

    const resultado = evaluateLead(updatedLead, mockBcraData);
    const finalLead: LeadData = { ...updatedLead, resultado };
    setLead(finalLead);
    addBot(`Resultado: ${toVisibleResult(resultado)}`);
    if (resultado === "precalifica_haberes") {
      addBot("Para continuar con la evaluación por descuento de haberes, será necesario contar con el último recibo de haberes. Un asesor se lo solicitará por WhatsApp.");
    }
    addBot("¿Desea continuar por WhatsApp?");
    setStep("whatsapp");
  };

  const onWhatsappChoice = async (yes: boolean): Promise<void> => {
    addUser(yes ? "Sí" : "No");
    await saveLeadMock(lead);
    if (yes) {
      window.open(`https://wa.me/?text=${buildWhatsAppMessage(lead)}`, "_blank", "noopener,noreferrer");
      addBot("Perfecto. Un asesor le responderá a la brevedad vía WhatsApp.");
      setStep("fin");
      return;
    }
    addBot("Para que un asesor pueda continuar luego con su evaluación, indique su número de WhatsApp.");
    setStep("fin");
  };

  const onManualWhatsapp = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const cleaned = whatsInput.replace(/\D/g, "");
    if (cleaned.length < 8) {
      setWhatsError("Ingrese un número de WhatsApp válido.");
      return;
    }
    setWhatsError("");
    const updated = { ...lead, whatsapp: cleaned };
    setLead(updated);
    await saveLeadMock(updated);
    addUser(cleaned);
    addBot("Gracias por completar la precalificación. Un asesor podrá contactarle a la brevedad.");
    setWhatsInput("");
  };

  return <section className="mx-auto w-full max-w-md rounded-2xl border border-sistema-uno bg-background-secondary p-4 shadow-sm">
    <h2 className="mb-3 text-heading2 text-texto-principal">Asistente María - Credizza</h2>
    <div className="mb-4 flex max-h-[60vh] flex-col gap-2 overflow-y-auto rounded-xl bg-background-default p-3">{messages.map((m, i) => <div key={`${m.from}-${i}`} className={`max-w-[90%] rounded-2xl px-3 py-2 text-small ${m.from === "bot" ? "self-start bg-background-secondary text-texto-principal" : "self-end bg-boton-primario text-texto-botones"}`}>{m.text}</div>)}</div>

    {(step === "inicio" || step === "actividad") && <div className="space-y-2"><input value={actividadInput} onChange={(e) => setActividadInput(e.target.value)} placeholder="Buscar actividad" className="w-full rounded-xl border border-sistema-uno px-3 py-2 text-small" /><div className="max-h-40 overflow-y-auto rounded-xl border border-sistema-uno">{actividadFiltrada.map((act) => <button key={act} type="button" onClick={() => onActividad(act)} className="block w-full border-b border-sistema-uno px-3 py-2 text-left text-small text-texto-principal">{act}</button>)}</div></div>}

    {step === "subActividad" && <div className="grid grid-cols-1 gap-2">{(secondSubOptions.length > 0 ? secondSubOptions : subOptions).map((item) => <button key={item} type="button" onClick={() => onSubActivity(item)} className="rounded-xl border border-sistema-uno px-3 py-2 text-left text-small text-texto-principal">{item}</button>)}</div>}

    {step === "banco" && <div className="space-y-2">{suggestedBank && !showFullBankSearch ? <div className="grid grid-cols-1 gap-2"><button type="button" onClick={() => onBanco(suggestedBank)} className="rounded-xl border border-sistema-uno px-3 py-2 text-left text-small">{suggestedBank}</button><button type="button" onClick={() => setShowFullBankSearch(true)} className="rounded-xl border border-sistema-uno px-3 py-2 text-left text-small">Otro banco</button></div> : <><input value={bancoInput} onChange={(e) => setBancoInput(e.target.value)} placeholder="Buscar banco" className="w-full rounded-xl border border-sistema-uno px-3 py-2 text-small" /><div className="max-h-28 overflow-y-auto rounded-xl border border-sistema-uno">{bancosFiltrados.map((bank) => <button key={bank} type="button" onClick={() => onBanco(bank)} className="block w-full border-b border-sistema-uno px-3 py-2 text-left text-small">{bank}</button>)}</div></>}</div>}

    {step === "dni" && <form onSubmit={onDni} className="space-y-2"><input value={dniInput} onChange={(e) => setDniInput(e.target.value)} placeholder="Ingrese DNI" inputMode="numeric" className="w-full rounded-xl border border-sistema-uno px-3 py-2 text-small" />{dniError && <p className="text-smallMobile text-boton-secundario">{dniError}</p>}<button type="submit" className="w-full rounded-xl bg-boton-primario px-3 py-2 text-button text-texto-botones">Continuar</button></form>}

    {step === "sexo" && <div className="grid grid-cols-2 gap-2">{(["F", "M"] as const).map((sexo) => <button key={sexo} type="button" onClick={() => void onSexo(sexo)} className="rounded-xl bg-boton-primario px-3 py-2 text-button text-texto-botones">{sexo}</button>)}</div>}
    {step === "whatsapp" && <div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => void onWhatsappChoice(true)} className="rounded-xl bg-boton-primario px-3 py-2 text-button text-texto-botones">Sí</button><button type="button" onClick={() => void onWhatsappChoice(false)} className="rounded-xl bg-boton-neutral px-3 py-2 text-button text-texto-botones">No</button></div>}
    {step === "fin" && <form onSubmit={(e) => void onManualWhatsapp(e)} className="space-y-2"><input value={whatsInput} onChange={(e) => setWhatsInput(e.target.value)} placeholder="Número de WhatsApp" className="w-full rounded-xl border border-sistema-uno px-3 py-2 text-small" />{whatsError && <p className="text-smallMobile text-boton-secundario">{whatsError}</p>}<button type="submit" className="w-full rounded-xl bg-boton-primario px-3 py-2 text-button text-texto-botones">Guardar número</button></form>}
  </section>;
}
