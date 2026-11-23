export const PRIVACY_VERSION='2026-11-21.1';
export const DOCUMENT_RETENTION_DAYS=30;
export const DATA_USE_TEXT='Autorizo a Credizza a usar mis datos para gestionar esta consulta, realizar la precalificaciÃ³n y, cuando corresponda, presentar mi solicitud a las entidades que analicen el crÃ©dito. LeÃ­ la PolÃ­tica de privacidad.';
export const WHATSAPP_TEXT='Autorizo que me contacten por WhatsApp para continuar esta consulta. No incluye publicidad.';
export const DOCUMENT_TEXT='Autorizo el uso de estos archivos para evaluar y gestionar mi solicitud. Se conservan mientras la consulta estÃ© abierta y hasta 30 dÃ­as despuÃ©s de su cierre.';
export function whatsAppWithdrawal(text:string){
 const value=text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 if(!/(?:whats\s*app|wasap)/.test(value))return false;
 if(/\bno\s+(?:(?:quiero|deseo|autorizo|acepto)\b.{0,45}|me\s+(?:contact|escrib|mand|env)[\w\s]{0,40})(?:whats\s*app|wasap)/.test(value))return true;
 if(/(?:whats\s*app|wasap)\s*[,;:]?\s*no\b/.test(value)&&!/(?:whats\s*app|wasap)\s*[,;:]?\s*no\s+(?:hay|tengo)\s+problema/.test(value))return true;
 return /\bprefiero\b.{0,25}\bsolo\b.{0,10}\bchat\b/.test(value);
}
export type ClientConsent={version:string;dataUse:boolean;whatsapp:boolean;eventId:string};
export function validClientConsent(value:unknown):value is ClientConsent{
 const v=value as ClientConsent|undefined;
 return Boolean(v&&v.version===PRIVACY_VERSION&&v.dataUse===true&&typeof v.whatsapp==='boolean'&&typeof v.eventId==='string'&&/^[a-f0-9-]{36}$/.test(v.eventId));
}
type StoredClientConsent={acceptedAt?:string;events?:Array<{id:string;[key:string]:unknown}>;[key:string]:unknown};
export function applyClientConsent(previous:StoredClientConsent|undefined,input:unknown,at=new Date().toISOString()){
 if(!validClientConsent(input))return previous;
 if(previous?.events?.some((event)=>event.id===input.eventId))return previous;
 return {version:PRIVACY_VERSION,dataUse:true,whatsapp:input.whatsapp,acceptedAt:previous?.acceptedAt??at,updatedAt:at,dataUseText:DATA_USE_TEXT,whatsappText:WHATSAPP_TEXT,events:[...(previous?.events??[]),{id:input.eventId,at,version:PRIVACY_VERSION,dataUse:true,whatsapp:input.whatsapp}].slice(-100)};
}
export function documentRetentionDeadline(c:{resolved?:boolean;closedAt?:string;updatedAt?:string}):string|null{
 if(!c.resolved)return null;
 const closed=Date.parse(c.closedAt??c.updatedAt??'');
 return Number.isFinite(closed)?new Date(closed+DOCUMENT_RETENTION_DAYS*86400000).toISOString():null;
}
