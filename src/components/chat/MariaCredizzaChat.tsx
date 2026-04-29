"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  BANCOS_DISPONIBLES,
  buildWhatsAppMessage,
  evaluateLead,
  saveLeadMock,
  SUBACTIVIDAD_POR_ACTIVIDAD,
  validateDni,
} from "./mariaCredizzaChat.utils";
import { Actividad, ChatStep, LeadData, Resultado, Sexo, SubActividad } from "./mariaCredizzaChat.types";

type ChatMessage = { from: "bot" | "user"; text: string };

const ACTIVIDADES: readonly Actividad[] = [
  "Jubilado",
  "Pensión por viudez",
  "Docente",
  "Policía",
  "Pensiones",
  "AUH",
  "Empleado público",
  "Empleado GCBA",
  "Empleado provincial de Santa Fe",
  "No estoy seguro / Otro",
] as const;

const RESULTADO_MENSAJE: Record<Resultado, string> = {
  precalifica_haberes_cbu: "Resultado: usted precalifica para una línea con acreditación por CBU.",
  precalifica_haberes: "Resultado: usted precalifica para una línea de haberes.",
  revision_manual: "Resultado: su caso requiere revisión manual por un asesor.",
  rechazado: "Resultado: por el momento no es posible precalificar esta solicitud.",
};

export default function MariaCredizzaChat() {
  const [step, setStep] = useState<ChatStep>("inicio");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      from: "bot",
      text: "Hola 👋 Soy María de Credizza. Vamos a iniciar su evaluación para obtener un crédito. Es rápido y sin compromiso.",
    },
  ]);

  const [lead, setLead] = useState<LeadData>({
    actividad: null,
    subActividad: null,
    banco: null,
    dni: null,
    sexo: null,
    resultado: null,
    whatsapp: null,
    fecha: new Date().toISOString(),
  });
  const [dniInput, setDniInput] = useState<string>("");
  const [dniError, setDniError] = useState<string>("");
  const [bancoInput, setBancoInput] = useState<string>("");

  const bancosFiltrados = useMemo(
    () => BANCOS_DISPONIBLES.filter((bank) => bank.toLowerCase().includes(bancoInput.toLowerCase())),
    [bancoInput],
  );

  const subActividades = lead.actividad ? SUBACTIVIDAD_POR_ACTIVIDAD[lead.actividad] : [];

  const addBot = (text: string): void => setMessages((prev) => [...prev, { from: "bot", text }]);
  const addUser = (text: string): void => setMessages((prev) => [...prev, { from: "user", text }]);

  const onActividad = (actividad: Actividad): void => {
    addUser(actividad);
    setLead((prev) => ({ ...prev, actividad, subActividad: null }));
    addBot("Gracias. Ahora indique su subactividad.");
    setStep("subActividad");
  };

  const onSubActividad = (subActividad: SubActividad): void => {
    addUser(subActividad);
    setLead((prev) => ({ ...prev, subActividad }));
    addBot("Indique su banco (puede buscarlo en la lista).");
    setStep("banco");
  };

  const onBanco = (banco: string): void => {
    addUser(banco);
    setLead((prev) => ({ ...prev, banco }));
    setBancoInput("");
    addBot("Ingrese su DNI.");
    setStep("dni");
  };

  const onDniSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const check = validateDni(dniInput);
    if (!check.isValid) {
      setDniError(check.error ?? "DNI inválido.");
      return;
    }

    setDniError("");
    addUser(check.normalized);
    setLead((prev) => ({ ...prev, dni: check.normalized }));
    addBot("Sexo");
    setStep("sexo");
  };

  const onSexo = async (sexo: Sexo): Promise<void> => {
    addUser(sexo);
    const updatedLead: LeadData = { ...lead, sexo, fecha: new Date().toISOString() };
    setLead(updatedLead);
    setStep("procesando");
    addBot("Procesando información...");

    const resultado = evaluateLead(updatedLead);
    const finalLead: LeadData = { ...updatedLead, resultado };
    setLead(finalLead);
    await saveLeadMock(finalLead);

    addBot(RESULTADO_MENSAJE[resultado]);
    setStep("resultado");

    addBot("¿Desea continuar por WhatsApp?");
    setStep("whatsapp");
  };

  const onWhatsApp = (continuar: boolean): void => {
    addUser(continuar ? "Sí" : "No");
    if (continuar) {
      const text = buildWhatsAppMessage(lead);
      const url = `https://wa.me/?text=${text}`;
      window.open(url, "_blank", "noopener,noreferrer");
      addBot("Perfecto. Abrimos WhatsApp con su resumen.");
    } else {
      addBot("Gracias por completar la precalificación.");
    }
    setStep("fin");
  };

  return (
    <section className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-[#004E9B]">Asistente María - Credizza</h2>
      <div className="mb-4 flex max-h-[60vh] flex-col gap-2 overflow-y-auto rounded-xl bg-slate-50 p-3">
        {messages.map((message, index) => (
          <div
            key={`${message.from}-${index}`}
            className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm ${
              message.from === "bot" ? "self-start bg-white text-slate-800" : "self-end bg-[#004E9B] text-white"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      {(step === "inicio" || step === "actividad") && (
        <div className="grid grid-cols-1 gap-2">
          {ACTIVIDADES.map((actividad) => (
            <button
              key={actividad}
              type="button"
              onClick={() => onActividad(actividad)}
              className="rounded-xl border border-[#004E9B] px-3 py-2 text-left text-sm text-[#004E9B]"
            >
              {actividad}
            </button>
          ))}
        </div>
      )}

      {step === "subActividad" && (
        <div className="grid grid-cols-1 gap-2">
          {subActividades.map((subActividad) => (
            <button
              key={subActividad}
              type="button"
              onClick={() => onSubActividad(subActividad)}
              className="rounded-xl border border-[#14A0FF] px-3 py-2 text-left text-sm text-[#004E9B]"
            >
              {subActividad}
            </button>
          ))}
        </div>
      )}

      {step === "banco" && (
        <div className="space-y-2">
          <input
            value={bancoInput}
            onChange={(event) => setBancoInput(event.target.value)}
            placeholder="Buscar banco"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
          <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-200">
            {bancosFiltrados.map((banco) => (
              <button
                key={banco}
                type="button"
                onClick={() => onBanco(banco)}
                className="block w-full border-b border-slate-100 px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                {banco}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "dni" && (
        <form className="space-y-2" onSubmit={onDniSubmit}>
          <input
            value={dniInput}
            onChange={(event) => setDniInput(event.target.value)}
            inputMode="numeric"
            placeholder="Ingrese DNI"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
          {dniError && <p className="text-xs text-red-600">{dniError}</p>}
          <button type="submit" className="w-full rounded-xl bg-[#004E9B] px-3 py-2 text-sm text-white">
            Continuar
          </button>
        </form>
      )}

      {step === "sexo" && (
        <div className="grid grid-cols-2 gap-2">
          {(["F", "M"] as const).map((sexo) => (
            <button
              key={sexo}
              type="button"
              onClick={() => void onSexo(sexo)}
              className="rounded-xl bg-[#14A0FF] px-3 py-2 text-sm text-white"
            >
              {sexo}
            </button>
          ))}
        </div>
      )}

      {step === "whatsapp" && (
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => onWhatsApp(true)} className="rounded-xl bg-green-600 px-3 py-2 text-sm text-white">
            Sí
          </button>
          <button type="button" onClick={() => onWhatsApp(false)} className="rounded-xl bg-slate-600 px-3 py-2 text-sm text-white">
            No
          </button>
        </div>
      )}
    </section>
  );
}
