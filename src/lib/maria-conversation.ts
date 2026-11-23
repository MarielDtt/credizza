const normalized=(text:string)=>text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
export function guardChannelChoice(text:string):'continue'|'callback'|''{
 const value=normalized(text);
 const continues=[...value.matchAll(/\b(?:por aca|por aqui|este chat|por chat|el chat|aca|aqui|continuar|continuamos|continuemos|continua|seguimos|sigamos|seguir|dale|ahora)\b/g)];
 const callbacks=[...value.matchAll(/\b(?:whats\s*app|llamen|contactame|contactenme|contacte[ns]?|manana|lunes)\b/g)];
 const lastContinue=continues.at(-1)?.index??-1,lastCallback=callbacks.at(-1)?.index??-1;
 if(lastContinue>=0||lastCallback>=0)return lastContinue>lastCallback?'continue':'callback';
 // Pedir consultar cupo expresa intención de continuar; no es una nueva elección de canal.
 const availability=/\b(?:ver|consultar|revisar|conocer|saber|evaluar)\s+(?:(?:mi|la|el|si tengo|cuanto tengo)\s+)?(?:disponibilidad|cupo|disponible|ofertas?)\b/.test(value);
 if(availability&&!/\bno\s+(?:(?:quiero|deseo|puedo|vamos a)\s+)?(?:ver|consultar|revisar|conocer|saber|evaluar)\b/.test(value))return 'continue';
 return /^(?:si+|claro|correcto|asi es|exacto)(?:$|[\s,.!])/.test(value.trim())?'continue':'';
}
export function isTrustQuestion(text:string){
 return /\b(?:confiables?|confiar|confiabilidad|son seguros|es seguro|son serios|son reales|estafa|fraude|desconfio)\b/.test(normalized(text));
}
// Información publicada en las preguntas frecuentes y el pie de la web de Credizza.
export const TRUST_REPLY='En Credizza la consulta es gratuita y no te pedimos pagos por adelantado. Te acompañamos en la gestión y, si tenés una oferta, te informamos el monto, las cuotas y las condiciones antes de que decidas. También podés consultar nuestros datos y canales de contacto en esta misma web.';

export function isHealthDetailOnly(text:string){
 const value=normalized(text);
 // Solo reconoce que se compartió un detalle de salud: no deduce un diagnóstico ni un tipo.
 const health=/\b(?:discapacidad|amputad[oa]|me falta (?:una?|la|el) (?:pierna|brazo|mano|pie)|no tengo (?:una?|la|el) (?:pierna|brazo|mano|pie))\b/.test(value)||/^(?:es |la discapacidad es )?(?:fisic[ao]|cognitiv[ao])\b/.test(value.trim());
 const financial=/\b(?:dni|documento|banco|cobro|pension|pnc|jubilad[oa]|puam|auh|anses)\b/.test(value)||/\d(?:[.\s-]?\d){6,}/.test(value);
 return health&&!financial;
}
export const HEALTH_DETAIL_REPLY='Gracias por aclararlo. Para esta consulta no necesitás detallar tu situación de salud. Vamos a revisar las opciones según el beneficio que cobrás y los requisitos de cada línea.';
export function hasCreditContext(text:string){
 return /\b(?:creditos?|prestamos?|precalificar|precalificacion|calificar|puam|pnc|pensio?n(?:ad[oa])?|jubilad[oa]|jubilacion|auh|asignacion|anses|ips|docente|policia|monotributista)\b/.test(normalized(text))||/\d(?:[.\s-]?\d){6,}/.test(text);
}
export function explicitlyRequestsCallback(text:string){
 const value=normalized(text);
 return /\b(?:llamen|contactame|contactenme|contacte[ns]?|manana|lunes)\b/.test(value)||/\b(?:prefiero|mejor|escribanme|escribime)\b.*\bwhats\s*app\b/.test(value);
}