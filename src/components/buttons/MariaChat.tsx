"use client";
import {onlyMonotributista,MONOTRIBUTO_NO_LINE,pncNegative} from '@/lib/maria-automatic-decisions';
import {serviceWindow,documentationFollowUp,operatorReferral as buildOperatorReferral} from '@/lib/maria-hours';
// @refresh reset

import {PRIVACY_VERSION,DATA_USE_TEXT,WHATSAPP_TEXT,DOCUMENT_TEXT,whatsAppWithdrawal} from "@/lib/maria-privacy";

import Image from "next/image";
import {MARIA_INTERACTION_GUIDE_VERSION} from '@/lib/maria-interaction-guide';
import {readIntroduction,bankKey,identifyBank,readMentionedBank,mentionedBanks,readConfirmation,offerDecision,afterDocumentsIntent} from '@/lib/maria-language';
import {readContact,documentWasMoney} from "@/lib/maria-contact";
import {guardChannelChoice,isTrustQuestion,TRUST_REPLY,isHealthDetailOnly,HEALTH_DETAIL_REPLY,hasCreditContext,explicitlyRequestsCallback} from "@/lib/maria-conversation";
import AttachFileOutlined from "@mui/icons-material/AttachFileOutlined";
import { Button } from "./index";
import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";

const TEST_CHAT=process.env.NODE_ENV==='development'||process.env.NEXT_PUBLIC_MARIA_ENVIRONMENT==='preview';
const questions = [
  "",
  "¿Me indica su DNI, por favor?",
  "Para seguir, ¿qué sexo figura en tu documento? Escribí F o M.",
  "¿Me confirmás tu nombre completo?",
  "¿En qué banco cobrás?",
  "Ya casi terminamos. ¿Me dejás tu celular con código de área, sin 0 ni 15?",
];

const normalize = (text: string) =>
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export default function MariaChat() {
  const [selectedDocuments, setSelectedDocuments] = useState<Record<string, string[]>>({});
  const [uploadBusy, setUploadBusy] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [documentsReady, setDocumentsReady] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    const openChat=()=>openConversation();
    window.addEventListener('credizza-open-chat',openChat);
    return ()=>window.removeEventListener('credizza-open-chat',openChat);
  },[]);

  const [started, setStarted] = useState(false);
  const [contactPhone, setContactPhone] = useState("");
  const [contactConsent, setContactConsent] = useState(true);
  const operatorReferral=()=>buildOperatorReferral(new Date(),contactConsent);
  const [noLineReason,setNoLineReason]=useState("");
  const [privacyConsent,setPrivacyConsent]=useState(true);
  const [consentEvent,setConsentEvent]=useState("");
  const [documentConsent,setDocumentConsent]=useState(false);
  const consentPayload=privacyConsent?{version:PRIVACY_VERSION,dataUse:true,whatsapp:contactConsent,eventId:consentEvent}:undefined;
  const [contactError, setContactError] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [dniAttempts, setDniAttempts] = useState(0);
  const [feedback, setFeedback] = useState("");
  const step = answers.length;
  const [visitorName, setVisitorName] = useState("");
  const [askingName, setAskingName] = useState(false);
  const [earlyDocument, setEarlyDocument] = useState("");
  const [earlyPhone, setEarlyPhone] = useState("");
  const [activityClarification, setActivityClarification] = useState("");
  const [history, setHistory] = useState<{ from: "maria" | "visitor" | "operator"; text: string }[]>([]);
  const conversation = useRef<HTMLDivElement>(null);
  const record = useRef<{ id: string; pending: Promise<unknown> } | null>(null);



  const [offTopicCount, setOffTopicCount] = useState(0);
  const [benefitPending, setBenefitPending] = useState(false);
  const [noIncome, setNoIncome] = useState(false);


  const [bcra, setBcra] = useState<{ simulated: boolean; cuil: string; name: string; entities: { name: string; situation: number }[] } | null>(null);
  const [busy, setBusy] = useState(false);
  const [needsOperator, setNeedsOperator] = useState(false);
  const [guard, setGuard] = useState(() => serviceWindow());
  useEffect(()=>{if(!open)return;const timer=setInterval(()=>setGuard(serviceWindow()),30000);return()=>clearInterval(timer);},[open]);
  const [guardChoice, setGuardChoice] = useState<"" | "continue" | "callback">("");
  const [bcraUnavailable, setBcraUnavailable] = useState(false);
  const [bcraRetry, setBcraRetry] = useState<"" | "checking" | "unavailable" | "returned">("");
  const [gestionStatus, setGestionStatus] = useState("");
  const [cbuConsent, setCbuConsent] = useState<"" | "yes" | "no">("");

  const [gestionMessages, setGestionMessages] = useState<string[]>([]);
  const [acceptedOffer, setAcceptedOffer] = useState("");
  const [supportPhone, setSupportPhone] = useState("");
  const supportNotice = `Ante cualquier consulta, podés escribirnos por este chat${supportPhone ? ` o por WhatsApp al ${supportPhone}` : ""}.`;
  const [signing, setSigning] = useState<{ step: "verify" | "phone" | "birth" | "alternate" | "done"; birth?: string; alternate?: string } | null>(null);
  const coopSignature = /coop(?:erativa)?\s+(?:la plata|l\.?p\.?)/i.test(acceptedOffer);
  const signatureNotice = coopSignature
    ? "La entidad te va a enviar un WhatsApp para la firma digital."
    : "Te vamos a enviar por este chat el enlace para la firma digital.";
  const visibleGestionMessages = gestionMessages.filter((message) => {
    if (!message.startsWith("Enlace de firma de ")) return true;
    if (!acceptedOffer) return false;
    return /red mutual/i.test(acceptedOffer) ? /Enlace de firma de Red Mutual:/i.test(message)
      : /garrahan/i.test(acceptedOffer) && /Enlace de firma de (?:Mutual )?Garrahan:/i.test(message);
  });
  const offers = gestionMessages.filter((message) => message.startsWith("Tenemos una oferta de "));

  const returnedAt = useRef("");
  const [operatorChat, setOperatorChat] = useState<{ from: "maria" | "visitor" | "operator"; text: string }[] | null>(null);
  const [suggestedBank, setSuggestedBank] = useState("");
  const [bankProvincePending, setBankProvincePending] = useState(false);
  const complete = answers.length >= questions.length && Boolean(answers[4] && answers[5]);
  const canReplyToOffer = complete && offers.length > 0 && !acceptedOffer;
  const activity = normalize(answers[0] ?? "");
  const fixedBank = ["jubilado ips buenos aires", "docente de provincia de buenos aires"].includes(activity)
    ? "Provincia Bs.As"
    : "";
  const bank = normalize(answers[4] || fixedBank);
  const confirmedBcra = answers[3] === "si" && Boolean(bcra?.name);
  const negativeReason=noLineReason||(!offers.length?pncNegative(answers[0]??"",answers[4]||fixedBank||suggestedBank,confirmedBcra?bcra:null):"");
  const waitingForOperator=needsOperator&&!negativeReason;
  const ended=offTopicCount>=3||noIncome||Boolean(negativeReason);
  const benefitWithDocuments = /^(?:puam \(46\)|pension graciable \(40\)|pension de madres \(47\))$/.test(activity);
  const pensionByWidowhood = activity === "pensionado anses" && history.some(
    (message) => message.from === "visitor" && /\b(?:viudez|viud[oa]|fallecimiento)\b/.test(normalize(message.text)),
  );
  const callback = guardChoice === "callback";
  const ansesFallback = activity === "jubilado anses" && bcraUnavailable && !callback;
  const waitingForOffer = complete && !callback && ((confirmedBcra && (activity === "jubilado anses" || pensionByWidowhood)) || ansesFallback);
  const noAnsesOffer = gestionStatus === "Sin Cupo ANSES" || gestionStatus === "Sin Cupo";
  const waitingForCbuConsent = complete && ansesFallback && noAnsesOffer && bcraRetry === "unavailable" && !cbuConsent;
  const waitingForDocuments = complete && confirmedBcra && benefitWithDocuments && !negativeReason;
  const status = negativeReason ? "No Califica" : documentsReady && needsOperator ? "Necesita operador" : documentsReady ? "Pendiente de Carga Operador" : complete && callback ? "Contacto pendiente" : cbuConsent === "yes" ? "CBU - BCRA pendiente" : cbuConsent === "no" ? "Sin Cupo ANSES" : needsOperator ? "Necesita operador" : waitingForOffer ? "Pendiente de oferta"
    : waitingForDocuments ? "Pendiente de documentación"
    : ended || complete ? "Para revisión" : "Incompleta";

  useEffect(() => {
    if (!history.length || !privacyConsent) return;
    const entry = record.current ?? { id: crypto.randomUUID(), pending: Promise.resolve() };
    record.current = entry;

    const fields = [
      (!bcra?.simulated && bcra?.name) || visitorName, answers[2] ?? "", answers[1] || earlyDocument, bcra?.cuil ?? "",
      answers[0] ?? "", answers[3] === "si" && bcra?.entities.length ? String(Math.max(...bcra.entities.map((entity) => entity.situation))) : "", answers[4] || fixedBank || suggestedBank, answers[5] || earlyPhone,
      status,
      !contactConsent ? "Solo chat: no autorizó WhatsApp" : complete && callback ? "Pidió contacto por WhatsApp " + guard.next : cbuConsent === "yes" ? "Autorizó contacto por WhatsApp si precalifica por CBU" : cbuConsent === "no" ? "No autorizó contacto por WhatsApp" : acceptedOffer ? ["Oferta aceptada: " + acceptedOffer, signing?.birth && "Nacimiento: " + signing.birth, signing?.alternate && "Tel. alternativo: " + signing.alternate].filter(Boolean).join(" · ").slice(0, 150) : waitingForOffer ? (TEST_CHAT?"Prueba local · oferta por consultar":"Oferta por consultar") : waitingForDocuments ? (TEST_CHAT?"Prueba local · documentación solicitada":"Documentación solicitada")
        : answers[3] === "no" && !bcra?.name
          ? bcra ? "BCRA no devolvió un nombre para el CUIL consultado" : "No se pudo completar la consulta al BCRA"
          : TEST_CHAT ? "Prueba local" : "Consulta Web Credizza",
    ];
    entry.pending = entry.pending.then(() => fetch("/api/maria-register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: entry.id, fields, consent:consentPayload }),
    })).catch(() => undefined);
  }, [history.length, answers, visitorName, earlyDocument, earlyPhone, suggestedBank, status, waitingForOffer, waitingForDocuments, bcra, acceptedOffer, signing, callback, complete, guard.next, cbuConsent, privacyConsent, contactConsent, consentEvent]);

  useLayoutEffect(() => {
    const log = conversation.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [open, history, feedback, busy, operatorChat, gestionMessages]);

  useEffect(() => {
    const id = record.current?.id;
    if (!open || !id) return;
    const controller = new AbortController();
    async function refresh() {
      try {
        const response = await fetch("/api/maria-inbox?id=" + id, { signal: controller.signal });
        if(response.status===403){setAccessDenied(true);return;}
        if (!response.ok) return;
        setAccessDenied(false);
        const data = await response.json();
        if(!data.privacyConsent||data.privacyConsent.version!==PRIVACY_VERSION){setHistory(data.messages);setPrivacyConsent(false);setStarted(false);return;}
        if(data.privacyConsent.events?.some((e:{id:string})=>e.id===consentEvent)&&data.privacyConsent.whatsapp!==contactConsent)setContactConsent(data.privacyConsent.whatsapp);
        setGestionMessages(data.gestionMessages ?? []);
        if(data.documentsReady)setDocumentsReady(true);
        setGestionStatus(data.gestionStatus ?? "");
        setSupportPhone(data.supportPhone ?? "");
        if (data.taken) {
          setOperatorChat(data.messages);
        } else if ((data.returnedAt && data.returnedAt !== returnedAt.current) || operatorChat || (!history.some((message) => message.from === "operator") &&
          data.messages.some((message: { from: string }) => message.from === "operator"))) {
          returnedAt.current = data.returnedAt ?? "";
          setHistory(data.messages);
          setOperatorChat(null);
          setNeedsOperator(false);
          const lastOperator = [...data.messages].reverse().find((message: { from: string; text: string }) => message.from === "operator");
          const operatorQuestion = normalize(lastOperator?.text ?? "");
          const lastOperatorIndex = data.messages.map((message: { from: string }) => message.from).lastIndexOf("operator");
          const awaitingOperatorAnswer = !data.messages.slice(lastOperatorIndex + 1).some((message: { from: string }) => message.from === "visitor");
          if (awaitingOperatorAnswer && !documentsReady && /\b(?:dni|documento)\b/.test(operatorQuestion) && answers.length > 0) {
            setAnswers((previous) => previous.slice(0, 1));
            setEarlyDocument("");
            setBcra(null);
            setBcraUnavailable(false);
            setBcraRetry("");
            setDniAttempts(0);
          }
          setFeedback("");
        }
      } catch { /* La próxima actualización reintenta. */ }
    }
    void refresh();
    const timer = setInterval(refresh, 2000);
    return () => { controller.abort(); clearInterval(timer); };
  }, [open, history.length, Boolean(operatorChat)]);

  async function sendToOperator(event: FormEvent) {
    event.preventDefault();
    if (!input.trim() || !record.current || busy) return;
    const optedOut=whatsAppWithdrawal(input);
    const consentChange=optedOut?{version:PRIVACY_VERSION,dataUse:true,whatsapp:false,eventId:crypto.randomUUID()}:undefined;
    if(consentChange){setContactConsent(false);setConsentEvent(consentChange.eventId);}
    setBusy(true);
    try {
      const response = await fetch("/api/maria-inbox", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: record.current.id, text: input,consent:consentChange }),
      });
      if (!response.ok) throw new Error("No se pudo enviar");
      const data = await response.json();
      setOperatorChat(data.messages);
      setInput("");
      setFeedback("");
    } catch {
      setFeedback("No se pudo enviar el mensaje. Volvé a intentar.");
    } finally { setBusy(false); }
  }

  useEffect(() => {
    if (!privacyConsent || !open || !complete || !ansesFallback || !noAnsesOffer || bcraRetry) return;
    setBcraRetry("checking");
    void (record.current?.pending??Promise.resolve()).then(()=>fetch("/api/maria-bcra", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id:record.current?.id, dni: answers[1], sex: answers[2] }),
    })).then(async (response) => {
      if (!response.ok) throw new Error("BCRA no disponible");
      const result = await response.json();
      if(result.simulated!==false)throw new Error("Se requiere una consulta BCRA real");
      setBcra(result);
      setBcraRetry("returned");
      setNeedsOperator(true);
    }).catch(() => setBcraRetry("unavailable"));
  }, [open, complete, ansesFallback, noAnsesOffer, bcraRetry, answers, privacyConsent]);
  function recordReply(reply: string) {
    setHistory((messages) => [...messages, ...([feedback || prompt].filter(Boolean).map((text) => ({ from: "maria" as const, text }))), { from: "visitor", text: reply }]);
  }

  function askForHelp(reply?: string) {
    if (reply) recordReply(reply);
    setInput("");
    setNeedsOperator(true);
    setFeedback("");
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    let value = input.trim();
    if (!value || busy || ended || waitingForOperator || operatorChat) return;
    if(whatsAppWithdrawal(value)){recordReply(value);setContactConsent(false);setConsentEvent(crypto.randomUUID());setInput("");setFeedback("Entendido. No te contactaremos por WhatsApp; podemos continuar por este chat.");return;}
    const asksTrust = isTrustQuestion(value);
    if (asksTrust && !hasCreditContext(value)) {
      recordReply(value);
      setInput("");
      const nextQuestion = !guard.regular && !guardChoice
        ? "¿Querés que sigamos por este chat o preferís que te contactemos por WhatsApp?"
        : canReplyToOffer ? "¿Avanzamos con la oferta que te mostré?"
        : signing?.step === "birth" ? "¿Me indicás tu fecha de nacimiento?"
        : signing?.step === "alternate" ? "¿Me indicás un teléfono de contacto distinto de tu celular?"
        : signing?.step === "verify" ? `¿Confirmás que tu celular es ${answers[5]}?`
        : signing?.step === "done" ? "¿Te quedó alguna otra consulta?"
        : documentsReady ? "Ya recibimos tu documentación. ¿Te quedó alguna consulta sobre cómo seguimos?" : prompt || "¿A qué te dedicás o qué beneficio cobrás?";
      setFeedback(TRUST_REPLY + "\n\n" + nextQuestion);
      return;
    }
    if(documentsReady&&!canReplyToOffer&&!signing){
      const followup=afterDocumentsIntent(value);
      if(followup==='unknown'){askForHelp(value);return;}
      recordReply(value);setInput("");setFeedback(followup==='thanks'?"De nada. Te avisaremos cuando tengamos novedades por el canal que autorizaste.":documentationFollowUp(answers[5]||earlyPhone||contactPhone,new Date(),contactConsent));return;
    }
    if (isHealthDetailOnly(value)) {
      recordReply(value);
      setInput("");
      const nextQuestion = !guard.regular && !guardChoice
        ? "¿Querés que sigamos por este chat o preferís que te contactemos por WhatsApp?"
        : prompt || "¿Qué actividad o beneficio cobrás?";
      setFeedback(HEALTH_DETAIL_REPLY + "\n\n" + nextQuestion);
      return;
    }
    if (!guard.regular && !guardChoice) {
      const choice = guardChannelChoice(value);
      if (hasCreditContext(value)) {
        // Una consulta concreta ya expresa intención de avanzar: no volver a elegir canal.
        setGuardChoice(choice === "callback" && explicitlyRequestsCallback(value) ? "callback" : "continue");
        if(choice==="callback"&&explicitlyRequestsCallback(value)){setContactConsent(true);setConsentEvent(crypto.randomUUID());}
      } else {
        const wantsCallback = choice === "callback";
        if (!choice) {
          recordReply(value);
          setInput("");
          setFeedback("Podemos seguir por este chat o contactarte por WhatsApp. ¿Qué preferís?");
          return;
        }
        recordReply(value);
        setGuardChoice(wantsCallback ? "callback" : "continue");
        if(wantsCallback){setContactConsent(true);setConsentEvent(crypto.randomUUID());}
        setInput("");
        setFeedback(wantsCallback
          ? `Perfecto, vamos a dejar tu consulta agendada para que te contactemos por WhatsApp ${guard.next}. Para eso, indicame tu actividad o el beneficio que cobrás, el banco donde cobrás y tu DNI. Ya tengo tu celular de contacto. Podés enviarme los datos en un solo mensaje.`
          : "Para empezar, ¿a qué te dedicás o qué beneficio cobrás?");
        return;
      }
    }
    if (waitingForCbuConsent) {
      const reply = readConfirmation(value);
      if (!reply) { setFeedback("¿Nos autorizás a contactarte por WhatsApp si precalificás?"); return; }
      recordReply(value);
      setCbuConsent(reply === "si" ? "yes" : "no");
      if(reply==="si"){setContactConsent(true);setConsentEvent(crypto.randomUUID());}
      setInput("");
      setFeedback(reply === "si" ? "Gracias. Si precalificás por una línea CBU, te contactaremos por WhatsApp." : "Entendido. Gracias por comunicarte con Credizza.");
      return;
    }
    if (signing?.step === "done") {
      const reply = normalize(value);
      let message = "";
      if (/^(?:no|no gracias|ninguna|nada mas|gracias|todo claro)[.! ]*$/.test(reply)) {
        message = "Gracias por comunicarte con Credizza. Si necesitás algo más, podés escribirnos por acá.";
      } else if (/\b(?:otra|otro|tercero|tercera|diferente|distinta|distinto)\b/.test(reply) && /\b(?:cuenta|cbu|alias|banco|deposit\w*|acredit\w*)\b/.test(reply)) {
        message = "No. El préstamo se acredita únicamente en tu cuenta sueldo.";
      } else if (/\b(?:acredita|deposit|cuenta)\w*\b/.test(reply)) {
        message = "Una vez firmada y finalizada la gestión, el préstamo se acreditará únicamente en tu cuenta sueldo.";
      } else if (/\b(?:firma|whatsapp)\b/.test(reply)) {
        message = signatureNotice;
      } else {
        setNeedsOperator(true);
        message = operatorReferral();
      }
      setHistory((items) => [...items, { from: "visitor", text: value }, { from: "maria", text: message }]);
      setInput("");
      return;
    }
    if (signing) {
      const phone = value.replace(/[.\s\-–—()]/g, "").replace(/^0(?=\d{10}$)/, "");
      let next = signing;
      let message = "";
      const dateInReply = value.match(/(?<!\d)(\d{1,2})[./-](\d{1,2})[./-](\d{4})(?!\d)/);
      const day = Number(dateInReply?.[1]), month = Number(dateInReply?.[2]), year = Number(dateInReply?.[3]);
      const parsedDate = new Date(year, month - 1, day);
      const birth = parsedDate.getDate() === day && parsedDate.getMonth() === month - 1 &&
        parsedDate.getFullYear() === year && year >= 1900 && parsedDate < new Date()
        ? `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}` : signing.birth;
      const confirmationText = normalize(value.replace(dateInReply?.[0] ?? "", "")).trim();
      const confirmedPhone = readConfirmation(confirmationText) === "si" ||
        (!/\bno\b/.test(confirmationText) && /\b(?:es mi numero|ese es mi numero|es correcto)\b/.test(confirmationText));
      if (signing.step === "verify" && confirmedPhone) {
        next = { ...signing, step: birth ? "alternate" : "birth", birth };
        message = birth ? "Gracias. ¿Me indicás un teléfono de contacto distinto de tu celular?" : "Gracias. ¿Me indicás tu fecha de nacimiento?";
      } else if (signing.step === "verify" && readConfirmation(value) === "no" && !/\d{7,}/.test(phone)) {
        next = { ...signing, step: "phone", birth };
        message = "¿Cuál es el número correcto donde podés recibir WhatsApp?";
      } else if (signing.step === "phone" || signing.step === "verify") {
        const replacement = phone.match(/(?<!\d)[1-9]\d{9}$/)?.[0];
        if (replacement) {
          setAnswers((previous) => previous.map((item, index) => index === 5 ? replacement : item));
          next = { ...signing, step: "verify", birth };
          message = `Actualicé tu celular a ${replacement}. ¿Es correcto?`;
        } else {
          message = signing.step === "verify" ? `¿El número ${answers[5]} es correcto?` : "Ingresá el celular con código de área, sin 0 ni 15.";
        }
      } else if (signing.step === "birth") {
        const date = value.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/);
        const day = Number(date?.[1]), month = Number(date?.[2]), year = Number(date?.[3]);
        const parsed = new Date(year, month - 1, day);
        if (parsed.getDate() === day && parsed.getMonth() === month - 1 && parsed.getFullYear() === year && year >= 1900 && parsed < new Date()) {
          next = { step: "alternate", birth: `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}` };
          message = "¿Me indicás un teléfono de contacto distinto de tu celular?";
        } else {
          message = "¿Me indicás tu fecha de nacimiento con día, mes y año? Por ejemplo, 15/05/1960.";
        }
      } else if (/^[1-9]\d{9}$/.test(phone) && phone !== answers[5]) {
        next = { ...signing, step: "done", alternate: phone };
        message = `Gracias. Ya tengo los datos para continuar. ${signatureNotice} Una vez firmado y finalizada la gestión, el préstamo se acreditará únicamente en tu cuenta sueldo. ${supportNotice} ¿Tenés alguna otra consulta?`;
      } else {
        message = "Necesito un teléfono distinto del tuyo, con código de área y sin 0 ni 15.";
      }
      setSigning(next);
      setHistory((items) => [...items, { from: "visitor", text: value }, { from: "maria", text: message }]);
      setInput("");
      return;
    }
    if (canReplyToOffer) {
      let salesSelection = "";
      const {clearAcceptance,clearDecline} = offerDecision(value);
      if (!clearAcceptance && !clearDecline) {
        const visitorReply = value;
        flushSync(() => {
          setHistory((previous) => [...previous,
            ...offers.filter((offer) => !previous.some((item) => item.from === "maria" && item.text === offer)).map((text) => ({ from: "maria" as const, text })),
            { from: "visitor", text: visitorReply }]);
          setInput("");
          setFeedback("");
          setBusy(true);
        });
        try {
          const response = await fetch("/api/maria-sales", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: record.current?.id, text: visitorReply }),
          });
          if (!response.ok) throw new Error("No se pudo interpretar la consulta comercial");
          const sales = await response.json();
          if (sales.intent === "aceptar" && offers.includes(sales.offer)) {
            salesSelection = sales.offer;
          } else {
            if (sales.intent === "operador") setNeedsOperator(true);
            const reply = sales.intent === "operador" ? operatorReferral() : sales.reply;
            setHistory((previous) => [...previous, { from: "maria", text: reply }]);
            return;
          }
        } catch {
          setNeedsOperator(true);
          setHistory((previous) => [...previous, { from: "maria", text: operatorReferral() }]);
          return;
        } finally { setBusy(false); }
      }
      const matched = offers.filter((offer) => {
        const line = offer.match(/^Tenemos una oferta de (.+?) por \$/)?.[1] ?? "";
        return line && normalize(value).includes(normalize(line));
      });
      const wantsOffer = Boolean(salesSelection) || clearAcceptance;
      const selected = salesSelection || (wantsOffer && matched.length === 1 ? matched[0] : wantsOffer && offers.length === 1 ? offers[0] : "");
      const accepted = Boolean(selected) && (Boolean(salesSelection) || !clearDecline);
      const ansesSigning = accepted && (activity === "jubilado anses" || pensionByWidowhood) && !/\bcbu\b/i.test(selected) && /anses|red mutual|garrahan|coop.*la plata/i.test(selected);
      const signingInstructions = /coop(?:erativa)?\s+(?:la plata|l\.?p\.?)/i.test(selected)
        ? "La entidad te va a enviar un WhatsApp para la firma digital."
        : "Te vamos a enviar por este chat el enlace para la firma digital.";
      if(ansesSigning&&/coop(?:erativa)?\s+(?:la plata|l\.?p\.?)/i.test(selected)&&!contactConsent){
        recordReply(value);setInput("");setNeedsOperator(true);setFeedback("Para firmar con esta entidad se necesita recibir un WhatsApp. Como no autorizaste ese contacto, un operador continuará por este chat para explicarte las opciones.");return;
      }
      const linkOnlySigning = ansesSigning && /red mutual|garrahan/i.test(selected);
      const message = linkOnlySigning
        ? `Perfecto, confirmaste que querés avanzar con la oferta. Te vamos a enviar por este chat el enlace para la firma digital. Una vez firmado y finalizada la gestión, el préstamo se acreditará únicamente en tu cuenta sueldo. ${supportNotice} ¿Tenés alguna otra consulta?`
        : ansesSigning
        ? `No tenés que presentar documentación. Para seguir, necesito tu fecha de nacimiento y un teléfono de contacto distinto del tuyo, de una persona que haya autorizado que nos lo facilites. ${signingInstructions} ¿Confirmás que tu celular es ${answers[5]}?`
        : accepted ? operatorReferral()
        : clearDecline ? "Entendido. Si más adelante querés retomar la oferta, podés escribirnos por acá."
        : offers.length > 1 ? "¿Con cuál oferta querés avanzar? Escribí el nombre de la línea."
        : "¿Querés avanzar con la oferta que te mostré?";
      setHistory((previous) => [
        ...previous,
        ...offers.filter((offer) => !previous.some((item) => item.from === "maria" && item.text === offer))
          .map((text) => ({ from: "maria" as const, text })),
        ...(!salesSelection ? [{ from: "visitor" as const, text: value }] : []),
        { from: "maria", text: message },
      ]);
      setInput("");
      setFeedback("");
      if (accepted) {
        setAcceptedOffer(selected.match(/^Tenemos una oferta de (.+?) por \$/)?.[1] ?? selected);
        if (linkOnlySigning) setSigning({ step: "done" });
        else if (ansesSigning) setSigning({ step: "verify" });
        else setNeedsOperator(true);
      }
      return;
    }
    if (askingName) {
      const name = readIntroduction(value).name || (/^[\p{L}][\p{L}\x27-]*(?:\s+[\p{L}][\p{L}\x27-]*){0,3}$/u.test(value) ? value : "");
      if (name && !/^(?:si|no|hola|gracias|no se|no quiero|mejor no)$/i.test(normalize(name))) {
        recordReply(value);
        setVisitorName(name);
        setAskingName(false);
        setInput("");
        setFeedback(`Gracias, ${name}. ¿A qué te dedicás o qué beneficio cobrás?`);
        return;
      }
      setAskingName(false);
    }
    let document = earlyDocument;
    let capturedPhone = earlyPhone;
    const capturedBank = readMentionedBank(value) || suggestedBank;
    if (capturedBank !== suggestedBank) setSuggestedBank(capturedBank);
    if (step === 0 && benefitPending) {
      const reply = normalize(value).trim().replace(/[,.!]+/g, " ").replace(/\s+/g, " ").trim();
      const negative = reply.replace(/^no\s+maria\b\s*/, "no ").replace(/\s+pero\s+necesito\b.*$/, "").trim();
      if (/^(?:no(?: nada| ninguno| ninguna| (?:no )?tengo(?: nada| ingresos)?| no cobro nada)?|nada|ninguno|ninguna|no cobro (?:nada|ningun beneficio))$/.test(negative)) {
        recordReply(value);
        setInput("");
        setFeedback("");
        setNoIncome(true);
        return;
      }
      if (/^(?:si|si claro|claro)$/.test(reply)) {
        recordReply(value);
        setInput("");
        setFeedback("¿Qué jubilación, pensión o beneficio cobra?");
        return;
      }
    }
    if (step === 0) {
      const introduction = readIntroduction(value);
      const name = introduction.name || visitorName;
      const activityQuestion = introduction.name
        ? `Hola, ${name}. ¿Qué actividad o beneficio cobrás?`
        : "¿Qué actividad o beneficio cobra?";
      if (introduction.name) setVisitorName(name);
      const contact = readContact(introduction.remaining, earlyDocument, earlyPhone);
      document = contact.document;
      setEarlyDocument(document);
      capturedPhone = contact.phone;
      setEarlyPhone(contact.phone);
      if (!contact.activityText) {
        recordReply(value);
        setInput("");
        setFeedback(activityQuestion);
        return;
      }
      flushSync(() => {
        recordReply(value);
        setInput("");
        setBusy(true);
        setFeedback("");
      });
      try {
        await record.current?.pending;
        const response = await fetch("/api/maria-classify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id:record.current?.id, text: activityClarification ? activityClarification + ". Mi caja o beneficio es " + contact.activityText : contact.activityText }),
        });
        if (!response.ok) throw new Error("No se pudo clasificar");
        const result = await response.json();
        if (result.activity === "SIN_EMPLEO") {
          setBenefitPending(true);
          setFeedback("Todas las líneas con las que trabajamos requieren un ingreso demostrable. Si cobra una jubilación o pensión, podemos analizar su caso aunque esté sin trabajo. ¿Cobra alguno de esos beneficios?");
          return;
        }
        if (result.activity === "FUERA_DE_TEMA") {
          setOffTopicCount(offTopicCount + 1);
          if (offTopicCount === 2) return;
          setFeedback("Por este chat puedo ayudarte a precalificar para un préstamo. Si te interesa, contame a qué te dedicás o qué beneficio cobrás.");
          return;
        }
        if (result.activity === "SIN_DATO") {
          if (!name && /\bprestamos?\b/.test(normalize(contact.activityText))) {
            setAskingName(true);
            setFeedback("Sí, podemos analizar tu caso. ¿Cómo te llamás?");
            return;
          }

          setInput("");
          if (introduction.name || /^(?:hola|buen(?: dia|as(?: tardes| noches)?)|gracias)[.! ]*$/.test(normalize(contact.activityText)) ||
              /\b(?:prestamos?|creditos?)\b/.test(normalize(contact.activityText))) {
            setFeedback(activityQuestion);
          } else {
            askForHelp();
          }
          return;
        }
        const bank = identifyBank(result.bank) || capturedBank;
        if (bank) setSuggestedBank(bank);
        if (result.activity === "ACLARAR" && !activityClarification) {

          setActivityClarification(contact.activityText);
          setInput("");
          return;
        }
        setBenefitPending(false);
        value = result.activity === "ACLARAR" ? "OTROS" : result.activity;
        if(value==="OTROS"&&onlyMonotributista(contact.activityText)){setNoLineReason(MONOTRIBUTO_NO_LINE);setNeedsOperator(false);setAnswers(["OTROS"]);setInput("");setFeedback("");return;}
        setNeedsOperator(value === "OTROS");
        if (value !== "OTROS") {
          const text = value === "PUAM (46)"
            ? "Sí, tenemos líneas para PUAM. Primero vamos a precalificarte para consultar si tenés un monto disponible."
            : "Podemos evaluar tu caso. Tenemos opciones disponibles para tu perfil. Primero hacemos una precalificación.";
          setHistory((messages) => [...messages, { from: "maria", text: asksTrust ? TRUST_REPLY + "\n\n" + text : text }]);
        }
      } catch {
        askForHelp();
        return;
      } finally {
        setBusy(false);
      }
    }
    if (step === 1) {
      const contact = readContact(value, "", earlyPhone);
      const bank = identifyBank(contact.activityText) || readMentionedBank(contact.activityText);
      if (bank) setSuggestedBank(bank);
      if (contact.phone) setEarlyPhone(contact.phone);
      if (!contact.document && bank) {
        recordReply(value);
        setInput("");
        setFeedback("");
        return;
      }
      if (contact.document) value = contact.document;
    }
    if (step === 1) {
      value = value.replace(/[.\s\-–—]/g, "");
      if (!/^\d{7,8}$/.test(value)) {
        const attempts = dniAttempts + 1;
        setDniAttempts(attempts);
        if (attempts >= 3) return askForHelp(input.trim());
        recordReply(input.trim());
        setInput("");
        setFeedback(attempts === 1
          ? "El DNI debe tener 7 u 8 dígitos. ¿Me lo indica nuevamente, por favor?"
          : "Sin el número de documento correcto no podemos continuar. Revisá tu DNI e ingresalo nuevamente, por favor.");
        return;
      }
      setDniAttempts(0);
      value = value.padStart(8, "0");
    }
    if (step === 2) {
      const sex = normalize(value);
      if (/^(?:f|femenino|mujer)$/.test(sex)) value = "F";
      else if (/^(?:m|masculino|hombre)$/.test(sex)) value = "M";
      else return askForHelp(input.trim());
    }
    if (step === 3) {
      const confirmation = readConfirmation(value);
      if (!confirmation) return askForHelp(input.trim());
      value = confirmation;
    }
    if (step === 4) {
      if (/^(?:en el |en |cobro en |el )?(?:banco )?provincia[.!? ]*$/.test(bankKey(value))) {
        recordReply(value);
        setInput("");
        setSuggestedBank("");
        setBankProvincePending(true);
        setFeedback("");
        return;
      }
      const confirmation = readConfirmation(value);
      if (!suggestedBank && confirmation === "si" && !readMentionedBank(value)) {
        recordReply(value);
        setInput("");
        setFeedback("¿Me indicás el nombre del banco donde cobrás?");
        return;
      }
      const confirmed = suggestedBank && confirmation === "si";
      const bank = confirmed ? suggestedBank : identifyBank(value) || readMentionedBank(value);
      if(!bank&&mentionedBanks(value).length>1){recordReply(value);setInput("");setFeedback("Mencionaste más de un banco. ¿En cuál cobrás actualmente?");return;}
      if (!bank) {
        setSuggestedBank("");
        askForHelp(value);
        return;
      }
      setSuggestedBank(bank);
      setBankProvincePending(false);
      value = bank;
    }
    if (step === 5) {
      value = readContact(value,"","").phone || value.replace(/^(?:mi )?(?:celular|tel[eé]fono)(?: es)?\s*[:.]?\s*/i, "").replace(/[.\s\-–—()]/g, "").replace(/^0(?=\d{10}$)/, "");
      if (!/^[1-9]\d{9}$/.test(value)) return askForHelp(input.trim());
    }
    if (step !== 0) recordReply(input.trim());
    if (step === 3 && value === "si" && /\b(?:puedo sacar|puedo pedir|califico|precalifico)\b/.test(normalize(input))) {
      setHistory((messages) => [...messages, { from: "maria", text: "Con los datos que faltan voy a revisar si hay alguna opción para vos." }]);
    }
    const nextAnswers = [...answers, value];
    if (step === 0 && document) nextAnswers.push(document);
    if (step === 4 && capturedPhone) nextAnswers.push(capturedPhone);
    let bcraFailed = bcraUnavailable;
    if (step === 2 && callback) nextAnswers.push("pendiente");
    if (step === 2 && !callback) {
      setInput("");
      setBusy(true);
      setFeedback("");
      try {
        await record.current?.pending;
        const response = await fetch("/api/maria-bcra", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id:record.current?.id, dni: answers[1], sex: value }),
        });
        if (!response.ok) throw new Error("Consulta no disponible");
        const data = await response.json();
        if(data.simulated!==false)throw new Error("Se requiere una consulta BCRA real");
        setBcra(data);
        if (!data.name) nextAnswers.push("no");
      } catch {
        bcraFailed = true;
        setBcraUnavailable(true);
        nextAnswers.push("no");
      } finally {
        setBusy(false);
      }
    }
    const registeredBank = fixedBank || capturedBank;
    if (nextAnswers.length === 4 && registeredBank) {
      nextAnswers.push(registeredBank);
      if (capturedPhone) nextAnswers.push(capturedPhone);
    }
    setNeedsOperator(nextAnswers[0] === "OTROS" || (nextAnswers.length >= questions.length && nextAnswers[3] === "no" && !(nextAnswers[0] === "Jubilado ANSES" && bcraFailed)));
    setAnswers(nextAnswers);
    setFeedback("");
    setInput("");
  }

  let result = operatorReferral();
  if (waitingForDocuments) {
    result = "Para evaluar tu cupo y saber si tenés disponible un nuevo crédito, enviá:\n\n• Último recibo de haberes.\n• Movimientos de cuenta donde se vea la última acreditación de haberes.";
  } else if (waitingForOffer) {
    result = guard.supervised ? "Aguardá un momento. Vamos a revisar si hay una oferta para vos." : operatorReferral();
  } else if (confirmedBcra) {
    if (/jubilad[oa].*cordoba/.test(activity) && /^(bancor|banco cordoba)$/.test(bank)) {
      result = "Líneas posibles: MAITE y B MITRE.";
    } else if (/jubilad[oa].*anses/.test(activity)) {
      result = "Líneas posibles: Coop La Plata ANSES, Red Mutual ANSES y Mutual Garrahan.";
    } else if (/pensionad[oa].*anses/.test(activity)) {
      result = "Línea posible: Mutual Garrahan.";
    }
  }

  const basePrompt = negativeReason ? negativeReason : documentsReady ? "" : !guard.regular && !guardChoice
    ? `${guard.greeting}, soy María, la asistente virtual de Credizza. Ahora te atendemos con nuestro servicio de guardia. Podemos consultar si tenés una oferta disponible e indicarte si necesitás presentar documentación para consultar el monto disponible. Durante la guardia no se realizan liquidaciones de préstamos. ¿Querés continuar ahora o preferís que te contactemos por WhatsApp ${guard.next}?`
    : waitingForCbuConsent
    ? "Por ahora no tenemos una oferta por descuento de haberes. Podemos evaluar opciones por CBU, pero en este momento el sistema del Banco Central no está disponible. ¿Nos autorizás a contactarte por WhatsApp si precalificás?"
    : complete && callback
    ? `Gracias. Ya tengo tus datos para que podamos contactarte por WhatsApp ${guard.next}.`
    : ansesFallback && noAnsesOffer && (!bcraRetry || bcraRetry === "checking")
    ? "No encontramos una oferta por haberes. Aguardá un momento mientras vuelvo a consultar el Banco Central."
    : waitingForOperator
    ? operatorReferral()
    : noIncome
    ? "Gracias por responder. Sin un ingreso demostrable, por el momento no podemos avanzar con la precalificación. Si más adelante cobra un ingreso o beneficio, puede iniciar una nueva consulta."
    : ended
    ? "Gracias por escribirnos. Si más adelante querés precalificar para un préstamo, podés iniciar una nueva consulta. ¡Que tengas un buen día!"
    : step === 0 && activityClarification
    ? "¿Cobrás por ANSES o por una caja provincial? Si es una caja, contame cuál."
    : step === 1
      ? answers[0] === "AUH"
        ? suggestedBank
          ? "¿Me indica su DNI, por favor?"
          : "¿Me indica su banco de cobro y su número de DNI?"
        : "¿Me indica su DNI, por favor?"
    : step === 3 && bcra?.name
      ? `Tu nombre es ${bcra.name}, ¿correcto?`
    : step === 4 && bankProvincePending
      ? "¿De qué provincia es el banco?"
    : step === 4 && suggestedBank
      ? `Entendí que cobrás en ${suggestedBank}. ¿Está bien o cobrás en otro banco?`
      : questions[step] ?? result;
  const showAutomaticPrompt = !documentsReady && !operatorChat && !acceptedOffer && !signing &&
    history[history.length - 1]?.from !== "operator" &&
    (!complete || !gestionMessages.length || (ansesFallback && noAnsesOffer && !cbuConsent));
  const prompt = showAutomaticPrompt ? basePrompt : "";

  useEffect(() => {
    const entry = record.current;
    if (!entry || !history.length || !privacyConsent) return;
    try {
      localStorage.setItem("maria-credizza-draft", JSON.stringify({
        id: entry.id, conversationVersion:MARIA_INTERACTION_GUIDE_VERSION, privacyConsent, privacyVersion:PRIVACY_VERSION, contactConsent, consentEvent, history, answers, feedback, documentsReady, activityClarification, visitorName, askingName,
        earlyDocument, earlyPhone, suggestedBank, bankProvincePending, dniAttempts, offTopicCount, benefitPending, noIncome, noLineReason, bcra, needsOperator, acceptedOffer, signing, guardChoice, bcraUnavailable, cbuConsent,
      }));
    } catch { /* La bandeja sigue disponible si el navegador no guarda el borrador. */ }
    if (operatorChat) return;
    const messages = [
      ...history,
      ...[feedback || prompt].filter(Boolean).map((text) => ({ from: "maria", text })),
    ];
    entry.pending = entry.pending.then(() => fetch("/api/maria-inbox", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: entry.id, status, messages, consent:consentPayload,
        name: (!bcra?.simulated && bcra?.name) || visitorName,
        details: {
          activity: answers[0] ?? "",
          dni: answers[1] || earlyDocument,
          sex: answers[2] ?? "",
          cuil: bcra?.cuil ?? "",
          bank: answers[4] || fixedBank || suggestedBank,
          phone: answers[5] || earlyPhone,
          bcra: confirmedBcra && bcra ? bcra.entities.map((item) => item.situation).join(", ") : "",
        },
      }),
    })).catch(() => undefined);
  }, [history, prompt, feedback, status, answers, activityClarification, visitorName, askingName,
    earlyDocument, earlyPhone, suggestedBank, bankProvincePending, dniAttempts, offTopicCount, benefitPending, noIncome, bcra, needsOperator, acceptedOffer, signing, guardChoice, bcraUnavailable, cbuConsent, confirmedBcra, operatorChat, privacyConsent, contactConsent, consentEvent]);
  useEffect(() => {
    const entry=record.current;
    if(!open||!started||!history.length||!entry)return;
    const session=crypto.randomUUID();let sequence=0,stopped=false;
    const heartbeat=(online:boolean,leaving=false)=>{
      const body=JSON.stringify({id:entry.id,session,sequence:++sequence,online});
      if(leaving&&navigator.sendBeacon?.('/api/maria-presence',new Blob([body],{type:'application/json'})))return;
      void fetch('/api/maria-presence',{method:'POST',headers:{'Content-Type':'application/json'},body,keepalive:leaving}).catch(()=>{});
    };
    const connected=()=>{if(!stopped&&navigator.onLine)heartbeat(true);};
    const disconnected=()=>heartbeat(false,true);
    void entry.pending.then(connected);
    const timer=setInterval(connected,15000);
    window.addEventListener('pagehide',disconnected);
    window.addEventListener('pageshow',connected);
    window.addEventListener('online',connected);
    window.addEventListener('offline',disconnected);
    return ()=>{
      stopped=true;clearInterval(timer);disconnected();
      window.removeEventListener('pagehide',disconnected);
      window.removeEventListener('pageshow',connected);
      window.removeEventListener('online',connected);
      window.removeEventListener('offline',disconnected);
    };
  },[open,started,history.length>0]);


  async function uploadDocuments(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (uploadBusy || !record.current) return;
    if(!documentConsent){setUploadMessage("Aceptá el uso de la documentación antes de enviarla.");return;}
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("id", record.current.id);
    setUploadBusy(true);
    setUploadMessage("");
    try {
      await record.current.pending;
      const files = ["receipt", "movements"].flatMap(kind => data.getAll(kind).filter((item): item is File => item instanceof File && item.size > 0).map(file => ({file,kind,id:crypto.randomUUID()})));
      const prepared = await fetch("/api/maria-documents", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"prepare",id:record.current.id,documentConsent,privacyVersion:PRIVACY_VERSION,files:files.map(({file,kind,id})=>({id,kind,size:file.size,mime:file.type||(/\.pdf$/i.test(file.name)?"application/pdf":/\.webp$/i.test(file.name)?"image/webp":/\.png$/i.test(file.name)?"image/png":"image/jpeg")}))})});
      const reservation=await prepared.json();if(!prepared.ok)throw new Error(reservation.error);
      for(const upload of reservation.uploads){
        const selected=files.find(item=>item.id===upload.id);if(!selected)throw new Error("Archivo no disponible");
        const bytes=new FormData();bytes.append("cacheControl","0");bytes.append("",selected.file);
        const sent=await fetch(upload.url,{method:"PUT",headers:{"x-upsert":"false"},body:bytes});
        if(!sent.ok)throw new Error("No se pudo subir un archivo. Volvé a intentar.");
      }
      const response = await fetch("/api/maria-documents", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"finalize",id:record.current.id})});
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      const message = result.complete
        ? documentationFollowUp(answers[5] || earlyPhone || contactPhone,new Date(),contactConsent)
        : result.message;
      setUploadMessage(message);
      setDocumentsReady(result.complete);
      if(result.complete)setNeedsOperator(false);
      setHistory((previous) => [...previous, { from: "visitor", text: "Adjunté documentación." }, { from: "maria", text: message }]);
      form.reset();
      setSelectedDocuments({});setDocumentConsent(false);
    } catch (error) {
      setUploadMessage(error instanceof Error ? error.message : "No se pudieron subir los archivos.");
    } finally {
      setUploadBusy(false);
    }
  }

  function startConversation(event: FormEvent) {
    event.preventDefault();
    const phone = contactPhone.replace(/[.\s\-–—()]/g, "").replace(/^0(?=\d{10}$)/, "");
    if (!/^[1-9]\d{9}$/.test(phone)) {
      setContactError("Ingresá 10 dígitos, con código de área, sin 0 ni 15.");
      return;
    }
    if (!privacyConsent) {
      setContactError("Necesitamos tu autorización para usar los datos de esta consulta.");
      return;
    }
    setEarlyPhone(phone);
    setConsentEvent(crypto.randomUUID());
    setHistory(previous=>[...previous,{from:"visitor",text:"Celular de contacto: "+phone+". Autorizo el uso de mis datos según la Política de privacidad v"+PRIVACY_VERSION+". "+(contactConsent?"Autorizo el contacto por WhatsApp por esta consulta.":"Prefiero continuar por este chat; no autorizo contacto por WhatsApp.")}]);
    setContactError("");
    setStarted(true);
  }

  function openConversation() {
    if (!record.current) {
      try {
        const raw = localStorage.getItem("maria-credizza-draft");
        if (raw) {
          const draft = JSON.parse(raw);
          if(process.env.NODE_ENV==='development'&&draft.conversationVersion!==MARIA_INTERACTION_GUIDE_VERSION)throw new Error('New local conversation version');
          record.current = { id: draft.id, pending: Promise.resolve() };
          setHistory(draft.history);
          setDocumentsReady(Boolean(draft.documentsReady || draft.history?.some((message: { from: string; text: string }) => message.from === "maria" && /recibí los dos tipos de documentación|ya recibimos tu documentación/i.test(message.text))));
          setAnswers(draft.answers);
          setFeedback(draft.feedback);
          setActivityClarification(draft.activityClarification);
          setVisitorName(draft.visitorName);
          setAskingName(draft.askingName);
          setEarlyDocument(draft.earlyDocument);
          setEarlyPhone(draft.earlyPhone);
          const acceptedPolicy=draft.privacyVersion===PRIVACY_VERSION&&draft.privacyConsent===true;
          setPrivacyConsent(acceptedPolicy);setContactConsent(Boolean(draft.contactConsent));setConsentEvent(draft.consentEvent??"");
          setStarted(acceptedPolicy&&Boolean(draft.earlyPhone || draft.history?.length));
          setSuggestedBank(draft.suggestedBank ?? "");
          setBankProvincePending(Boolean(draft.bankProvincePending));
          setDniAttempts(draft.dniAttempts ?? 0);
          setOffTopicCount(draft.offTopicCount);
          setBenefitPending(draft.benefitPending);
          setNoIncome(draft.noIncome);
          setNoLineReason(draft.noLineReason??"");
          setBcra(draft.bcra);
          setNeedsOperator(Boolean(draft.needsOperator));
          setAcceptedOffer(draft.acceptedOffer ?? "");
          setSigning(draft.signing ?? null);
          setGuardChoice(draft.guardChoice ?? (draft.history?.length ? "continue" : ""));
          setBcraUnavailable(Boolean(draft.bcraUnavailable));
          setCbuConsent(draft.cbuConsent ?? "");
          if(documentWasMoney(draft.answers?.[1]||draft.earlyDocument||'',draft.history||[])){
            setAnswers((draft.answers||[]).slice(0,1));
            setEarlyDocument('');
            setBcra(null);setBcraUnavailable(false);
            setSuggestedBank(draft.answers?.[4]||draft.suggestedBank||'');
            setEarlyPhone(draft.answers?.[5]||draft.earlyPhone||'');
            setFeedback('El importe que querés solicitar no es tu documento. ¿Me indica su DNI, por favor?');
          }
        }
      } catch {
        localStorage.removeItem("maria-credizza-draft");
      }
    }
    setGuard(serviceWindow());
    setOpen(true);
  }

  return (
    <aside className="fixed bottom-4 right-4 z-[2147483647] font-[Poppins,Arial,sans-serif] sm:bottom-6 sm:right-6">
      {open ? (
        <section aria-label="Chat de María Credizza" className="flex h-[min(35rem,calc(100dvh-2rem))] w-[min(25rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-background-seccion bg-white text-texto-principal shadow-2xl">
          <header className="flex items-center gap-3 bg-boton-primario px-4 py-3 text-boton-neutral">
            <Image src="/maria-credizza.png" width={44} height={44} alt="" className="rounded-full" />
            <div className="flex-1">
              <h2 className="text-base font-semibold">María Credizza</h2>
              <p className="text-xs text-boton-neutral">Asistente virtual</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar chat" className="h-10 w-10 rounded-full text-2xl hover:bg-white/15">×</button>
          </header>
          {TEST_CHAT&&<p className="bg-background-seccion px-4 py-2 text-xs text-texto-principal">Prueba local · Usá datos ficticios</p>}
          {!started ? (
            <form onSubmit={startConversation} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto bg-background-secondary p-5">
              <h3 className="text-lg font-semibold">Iniciá tu consulta</h3>
              <p className="text-sm leading-relaxed">Dejanos tu número de celular para acompañarte durante la gestión de tu préstamo.</p>
              <label className="text-sm font-medium">
                Celular
                <input type="tel" autoComplete="tel-national" inputMode="tel" value={contactPhone}
                  onChange={(event) => setContactPhone(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-sistema-uno px-3 py-2 outline-none focus:ring-2 focus:ring-boton-primario"
                  aria-describedby="maria-phone-help" required />
              </label>
              <p id="maria-phone-help" className="-mt-2 text-xs text-texto-secundario">Con código de área, sin 0 ni 15.</p>
              <p className="text-xs leading-relaxed">Usaremos tus datos para analizar tu consulta y, cuando corresponda, presentarla a las entidades que evalúen el crédito. Podés pedir acceso, corrección o eliminación en info@credizza.com.ar. <a href="/politicas-de-privacidad" target="_blank" rel="noopener noreferrer" className="underline">Leer Política de privacidad</a>.</p>
              <label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={privacyConsent} onChange={event=>setPrivacyConsent(event.target.checked)} className="mt-1" required/><span>{DATA_USE_TEXT}</span></label>
              <label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={contactConsent} onChange={event=>setContactConsent(event.target.checked)} className="mt-1"/><span>{WHATSAPP_TEXT} <small>(Opcional; podés seguir por este chat).</small></span></label>
              {contactError && <p role="alert" className="text-sm text-red-700">{contactError}</p>}
              <button type="submit" className="rounded-lg bg-boton-primario px-4 py-3 font-semibold text-boton-neutral">Iniciar chat</button>
            </form>
          ) : (<>
          <div ref={conversation} role="log" aria-label="Conversación" className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto [&>p]:shrink-0 bg-background-secondary p-4 text-sm leading-relaxed">
            {guard.regular && <p className="max-w-[90%] self-start rounded-2xl rounded-tl-sm bg-boton-primario/15 px-4 py-3 shadow-sm whitespace-pre-wrap">Hola, mi nombre es María.<br /><br />
              Para precalificar, necesito que me indique:
              <span className="mt-2 block">• Actividad o beneficio que cobra<br />• DNI<br />• Banco donde cobra<br />• Nro. de celular</span>
              <span className="mt-2 block">Con esos datos verificamos si precalifica y le informamos las opciones disponibles.</span></p>}
            {(operatorChat ?? history).map((message, index) => (
              <p key={index} className={message.from === "visitor"
                ? "max-w-[90%] self-end rounded-2xl rounded-tr-sm bg-background-seccion px-4 py-3 wrap-break-word"
                : message.from === "operator"
                  ? "max-w-[90%] self-start rounded-2xl rounded-tl-sm border border-background-seccion bg-white px-4 py-3"
                  : "max-w-[90%] self-start rounded-2xl rounded-tl-sm bg-boton-primario/15 px-4 py-3 shadow-sm whitespace-pre-wrap"}>{message.from === "operator" && <strong className="block">Operador</strong>}{message.text}</p>
            ))}
            {prompt && !feedback && !busy && !operatorChat && (!complete || !gestionMessages.length || (ansesFallback && noAnsesOffer && !cbuConsent)) && <p className="max-w-[90%] self-start rounded-2xl rounded-tl-sm bg-boton-primario/15 px-4 py-3 shadow-sm whitespace-pre-wrap">{prompt}</p>}

            {!operatorChat && !(ansesFallback && noAnsesOffer) && visibleGestionMessages.filter((text) => !history.some((item) => item.from === "maria" && item.text === text)).map((message) => <p key={message} className="max-w-[90%] self-start whitespace-pre-wrap rounded-2xl bg-boton-primario/15 px-4 py-3">{message}</p>)}
            {feedback && <p role="status" className="self-start rounded-2xl bg-white px-4 py-3 text-texto-principal">{feedback}</p>}
          </div>
          {operatorChat && <p className="px-4 py-2 text-xs">Te está atendiendo un operador de Credizza.</p>}
          {busy && !operatorChat && <p role="status" className="shrink-0 bg-background-seccion px-4 py-2 text-xs text-texto-principal">María está escribiendo…</p>}
          {!accessDenied && !documentsReady && (waitingForDocuments || gestionStatus === "Pendiente Documentación") && !operatorChat && (
            <form onSubmit={uploadDocuments} className="max-h-56 shrink-0 space-y-2 overflow-y-auto border-t border-background-seccion bg-background-secondary p-3 text-sm">
              {([
                ["receipt", "Recibo de haberes"],
                ["movements", "Movimientos de cuenta"],
              ] as const).map(([kind, label]) => (
                <div key={kind}>
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-background-seccion bg-background-default px-3 py-2 transition-colors hover:bg-background-seccion focus-within:ring-2 focus-within:ring-boton-primario">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-boton-primario/15 text-boton-neutral"><AttachFileOutlined fontSize="small" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">{label}</span>
                      <span className="block truncate text-xs text-texto-secundario">
                        {selectedDocuments[kind]?.length ? selectedDocuments[kind].join(", ") : "Adjuntar fotos o PDF"}
                      </span>
                    </span>
                    <input type="file" name={kind} aria-label={label} accept=".pdf,.jpg,.jpeg,.png,.webp" multiple disabled={uploadBusy}
                      className="sr-only" onChange={(event) => setSelectedDocuments((previous) => ({
                        ...previous, [kind]: Array.from(event.target.files ?? []).map((file) => file.name),
                      }))} />
                  </label>
                </div>
              ))}
              <p className="text-xs">Máximo 6 páginas en total entre recibo y movimientos. Enviá solo el recibo y los movimientos solicitados. No envíes claves, PIN, tokens ni historias clínicas.</p>
              <label className="flex items-start gap-2 text-xs"><input type="checkbox" required checked={documentConsent} onChange={event=>setDocumentConsent(event.target.checked)} className="mt-1"/><span>{DOCUMENT_TEXT} <a className="underline" href="/politicas-de-privacidad" target="_blank" rel="noopener noreferrer">Privacidad</a></span></label>
              <button disabled={uploadBusy || !Object.values(selectedDocuments).some((files) => files.length)}
                className="w-full rounded-xl bg-boton-primario px-3 py-2 font-semibold text-boton-neutral transition-colors hover:bg-hover-primario disabled:cursor-default disabled:opacity-50">
                {uploadBusy ? "Subiendo…" : "Enviar documentación"}
              </button>
              {uploadMessage && <p role="status">{uploadMessage}</p>}
            </form>
          )}
          {accessDenied ? (
            <div className="border-t border-background-seccion bg-background-secondary p-4 text-sm"><p>Esta consulta no puede retomarse desde este navegador. Podés iniciar una nueva para continuar.</p><button className="mt-2 font-semibold underline" onClick={()=>{localStorage.removeItem("maria-credizza-draft");window.location.reload();}}>Iniciar nueva consulta</button></div>
          ) : (operatorChat || (!ended && !waitingForOperator && (documentsReady || step < questions.length || canReplyToOffer || waitingForCbuConsent || Boolean(signing)))) ? (
            <form onSubmit={operatorChat ? sendToOperator : submit} className="flex items-center gap-2 border-t border-background-seccion bg-white p-3">
              <input aria-label="Tu mensaje" readOnly={busy} placeholder="Escribí tu mensaje…" value={input} maxLength={300} onChange={(event) => setInput(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-sistema-uno px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-boton-primario" />
              <button disabled={busy || !input.trim()} className="rounded-xl bg-boton-neutral px-3 py-2 text-sm font-semibold text-white disabled:opacity-50">Enviar</button>
            </form>
          ) : documentsReady ? (
            <p className="border-t border-background-seccion px-4 py-3 text-sm text-texto-secundario">Documentación recibida · pendiente de gestión</p>
          ) : waitingForOperator ? null : waitingForOffer ? (
            <p className="border-t border-background-seccion px-4 py-3 text-sm text-texto-secundario">Pendiente de oferta{TEST_CHAT?" · prueba local":""}</p>
          ) : waitingForDocuments ? (
            <p className="border-t border-background-seccion px-4 py-3 text-sm text-texto-secundario">Pendiente de documentación{TEST_CHAT?" · prueba local":""}</p>
          ) : (
            <button onClick={() => { record.current = null; setStarted(false); setDocumentsReady(false); setUploadMessage(""); setContactPhone(""); setContactConsent(true); setPrivacyConsent(true); setConsentEvent(""); setDocumentConsent(false); setContactError(""); setDniAttempts(0); setGestionMessages([]); setAcceptedOffer(""); setSigning(null); localStorage.removeItem("maria-credizza-draft"); setAnswers([]); setHistory([]); setActivityClarification(""); setSuggestedBank(""); setBankProvincePending(false); setEarlyDocument(""); setEarlyPhone(""); setVisitorName(""); setAskingName(false); setOffTopicCount(0); setBenefitPending(false); setNoIncome(false); setNoLineReason(""); setBcra(null); setNeedsOperator(false); setGuardChoice(""); setBcraUnavailable(false); setBcraRetry(""); setGestionStatus(""); setCbuConsent(""); }} className="p-3 text-sm font-semibold text-boton-neutral underline">Nueva consulta</button>
          )}
          </>)}
        </section>
      ) : (
        <Button
          text="Chatear"
          ariaLabel="Abrir el chat de María"
          onClick={openConversation}
          className="!w-24 bg-boton-primario text-boton-neutral shadow-md hover:bg-hover-primario hover:text-texto-botones focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-boton-neutral"
        />
      )}
    </aside>
  );
}
