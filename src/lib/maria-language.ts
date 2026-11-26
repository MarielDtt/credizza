const normalize=(text:string)=>text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const bankNames = [
  "Mercado Pago", "Galicia", "BNA", "Provincia Bs.As", "ICBC", "Citibank", "BBVA", "Bancor",
  "Supervielle", "Ciudad", "Patagonia", "Hipotecario", "San Juan", "Municipal de Rosario",
  "Santander", "Chubut", "Santa Cruz", "Banco de la Pampa", "Corrientes", "Neuquén",
  "Bank of China", "Credicoop", "Tierra del Fuego", "Macro", "Comafi", "Piano",
  "Rioja", "Nuevo Banco del Chaco", "Banco de Formosa", "Santiago del Estero",
  "Nuevo Banco Santa Fe", "Industrial", "Bersa", "Columbia",
];

export const bankKey = (text: string) => normalize(text).replace(/[.,]/g, "").replace(/\s+/g, " ").trim();
const knownBanks = new Map(bankNames.flatMap((bank) => {
  const key = bankKey(bank);
  return [[key, bank], [`banco ${key}`, bank]] as const;
}));
knownBanks.set("mercadopago", "Mercado Pago");
knownBanks.set("banco cordoba", "Bancor");
knownBanks.set("banco de cordoba", "Bancor");
knownBanks.set("nacion", "BNA");
knownBanks.set("banco nacion", "BNA");
knownBanks.set("bapro", "Provincia Bs.As");
knownBanks.set("banco provincia buenos aires", "Provincia Bs.As");
knownBanks.set("banco provincia de buenos aires", "Provincia Bs.As");
knownBanks.set("buenos aires", "Provincia Bs.As");
knownBanks.set("bs as", "Provincia Bs.As");
knownBanks.set("bsas", "Provincia Bs.As");

export function identifyBank(text:unknown){
 if(typeof text!=='string')return '';
 const key=bankKey(text).replace(/^(?:(?:cobro|cobro mis haberes|me depositan|me pagan)\s+)?(?:en|por)\s+/,'').replace(/\s*[¿?]?\s*\b(?:puedo(?: sacar| pedir)?|califico|precalifico)\s*\?*$/,'').replace(/[¿?]+$/,'').trim();
 return knownBanks.get(key)??'';
}
const escapeRE=(s:string)=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
export function mentionedBanks(text:string){
 const value=bankKey(text),found=new Set<string>();
 const direct=identifyBank(text);if(direct&&!['buenos aires','bs as','bsas'].includes(value))found.add(direct);
 const unambiguous=new Set(['mercado pago','mercadopago','nacion','bna','bapro','bancor','galicia','bbva','icbc','santander','piano','macro','credicoop','supervielle','comafi','columbia','patagonia']);
 for(const [alias,bank] of [...knownBanks].sort(([a],[b])=>b.length-a.length)){
  const token=escapeRE(alias);
  const matches=[...value.matchAll(new RegExp(`(^|[^a-z0-9])(${token})(?=$|[^a-z0-9])`,'g'))];
  for(const match of matches){
   const before=value.slice(Math.max(0,match.index!-70),match.index!+match[1].length);
   if(/\bno\s+(?:(?:cobro|me (?:pagan|depositan))\s+(?:mas\s+)?(?:en|por|con)?\s*(?:(?:el )?banco(?: de)?\s*)?|es\s+(?:mi\s+)?(?:banco\s*)?)$/.test(before))continue;
   const explicit=/\b(?:cobro(?: mis haberes)?(?: en| por)?|me (?:depositan|pagan)(?: en| por)?|en el|en|por|banco(?: de cobro)?(?: es)?)\s*$/.test(before);
   if(explicit||unambiguous.has(alias))found.add(bank);
  }
 }
 return [...found];
}
export function readMentionedBank(text:string){const banks=mentionedBanks(text);return banks.length===1?banks[0]:'';}
export function readConfirmation(text:string){
 const reply=normalize(text).trim().replace(/^[¡¿]+/,'').replace(/^no hay (?:ningun )?problema\b/,'de acuerdo');
 if(/\b(?:pero no|no soy|no es mi nombre|no me llamo)\b/.test(reply)||/^no(?:$|[\s,.!])/.test(reply))return 'no';
 if(/^(?:si (?:fuera|pudiera|tuviera|acepto|avanzo)|tal vez|quizas|depende|creo que|no se)\b/.test(reply))return '';
 if(/^(?:si+|claro|correcto|es correcto|asi es|exacto|efectivamente|dale|ok(?:ay)?|de acuerdo|perfecto|(?:si+[, ]+)?soy yo|ese es mi nombre)(?:$|[\s,.!?¿])/.test(reply))return 'si';
 return '';
}
export function offerDecision(text:string){
 const reply=normalize(text).trim();
 const clearDecline=/^(?:no(?: gracias)?|no quiero(?: avanzar)?|no me interesa|no acepto)[.! ]*$/.test(reply);
 const doubtText=reply.replace(/\bno hay (?:ningun )?problema\b/g,'conforme');
 const hasDoubt=/\bno\b/.test(doubtText)||/\b(?:pero|aunque|todavia|aun no|si me|si la|si el|si puedo|si acepto|si avanzo|tal vez|quizas|depende|no entiendo|no se|no estoy|me parece|muy alta|muy caro|no puedo|no me alcanza|cuanto|cuando|como funciona|quiero saber|antes de|cuota (?:me queda |es )?alta)\b/.test(doubtText);
 const clearAcceptance=!hasDoubt&&(readConfirmation(text)==='si'||/\b(?:lo quiero|la quiero|quiero avanzar|quiero esa opcion|quiero contratar|me quedo con|acepto|avancemos|dale|hagamoslo|sigamos)\b/.test(reply));
 return {hasDoubt,clearAcceptance,clearDecline};
}
export function classifyKnownActivity(text:string):{activity:string;bank:string;question?:string}|null{
 const value=normalize(text).trim(),bank=readMentionedBank(text);
 if(/\bmi (?:mama|papa|madre|padre|esposo|esposa|hijo|hija)\b/.test(value)||/\bno (?:soy|cobro|recibo|tengo)\s+(?:(?:una?|la|el)\s+)?(?:jubil|pension|pnc|puam|auh|asignacion)/.test(value))return null;
 const graciable=/\b(?:pension\s+graciable|graciable)\b/.test(value);
 if(graciable&&!/\b(?:40|46|47)\b/.test(value)){
  if(/\b(?:madres?|siete hijos|7 hijos)\b/.test(value))return {activity:'Pensión de Madres (47)',bank};
  if(/\b(?:adult[oa] mayor|vejez|puam)\b/.test(value))return {activity:'PUAM (46)',bank};
  if(/\b(?:discapacidad|invalidez)\b/.test(value))return {activity:'Pensión Graciable (40)',bank};
  return {activity:'ACLARAR',bank,question:'¿Tenés una pensión de madre, por discapacidad o de adulto mayor?'};
 }
 const school=/\b(?:auxiliar(?:es)? (?:de (?:escuela|colegio)|escolar|educativ[oa])|docentes?)\b/.test(value);
 if(school&&!/\bno (?:soy|trabajo (?:de|como)) (?:auxiliar|docente)\b/.test(value)){
  const caba=/\b(?:caba|capital federal|ciudad (?:autonoma )?de buenos aires)\b/.test(value);
  const province=!caba&&(/\b(?:provincia (?:de )?(?:buenos aires|bs as)|provincia bsas|provincia de bsas)\b/.test(value)||/\bprovincia\b/.test(value)&&!/\b(?:cordoba|santa fe|misiones|rio negro|chaco|corrientes|mendoza|tucuman|salta|jujuy|chubut|neuquen|entre rios|formosa|san juan|san luis|santa cruz|la pampa|la rioja|catamarca|tierra del fuego|santiago del estero)\b/.test(value));
  const privateSector=/\bprivad[oa]\b/.test(value)&&!/\bno (?:es |soy |trabajo en (?:el )?)?privad[oa]\b/.test(value);
  const publicSector=/\b(?:estatal|public[oa])\b/.test(value)&&!/\bno (?:es |soy |trabajo en (?:el )?)?(?:estatal|public[oa])\b/.test(value);
  if(privateSector)return {activity:'Privado',bank};
  if(caba&&publicSector)return {activity:'Docente CABA',bank};
  if(province&&publicSector)return {activity:'Docente de Provincia de Buenos Aires',bank:bank||'Provincia Bs.As'};
  // La mención explícita de docente con Banco Provincia ya estaba confirmada.
  if(/\bdocentes?\b/.test(value)&&!caba&&(bank==='Provincia Bs.As'||/\bbanco provincia\b/.test(value)))return {activity:'Docente de Provincia de Buenos Aires',bank:'Provincia Bs.As'};
  return {activity:'ACLARAR',bank,question:caba||province?'¿La escuela es estatal o privada?':publicSector?'¿Trabajás en CABA o en la provincia de Buenos Aires?':'¿Trabajás en CABA o en la provincia de Buenos Aires? ¿La escuela es estatal o privada?'};
 }
 if(/\b(?:puam|pension universal para el adulto mayor)\b|\b(?:beneficio|graciable|pnc)\s*\(?46\b/.test(value))return {activity:'PUAM (46)',bank};
 if(/\b(?:pension (?:de |para )?madres|madres de (?:siete|7) hijos)\b|\b(?:beneficio|graciable|pnc)\s*\(?47\b/.test(value)||/^(?:cobro )?madres$/.test(value))return {activity:'Pensión de Madres (47)',bank};
 if(/\b(?:pnc|pension no contributiva)\b|\b(?:beneficio|graciable)\s*\(?40\b/.test(value))return {activity:'Pensión Graciable (40)',bank};
 if(/\bips\b/.test(value)&&/\b(?:buenos aires|bs as|bsas)\b/.test(value)&&(!/\b(?:trabajo|emplead[oa])\b/.test(value)||/\bjubilad[oa]\b/.test(value)))return {activity:'Jubilado IPS Buenos Aires',bank:'Provincia Bs.As'};
 const teacher=/\bdocentes?\b/.test(value)&&!/\bno (?:soy|trabajo (?:de|como)) (?:docentes?)\b/.test(value);
 const otherProvince=/\b(?:cordoba|misiones|rio negro|neuquen|santa fe|chaco|chubut|formosa|corrientes|entre rios|jujuy|la pampa|la rioja|mendoza|salta|san juan|san luis|santa cruz|santiago del estero|tierra del fuego|tucuman|catamarca)\b/.test(value);
 const provinceBank=/\b(?:banco|bco\.?)\s+provinc(?:i|vi)a\b/.test(value)&&!/\bno (?:cobro|me pagan|me depositan)\b/.test(value);
 if(teacher&&(/\b(?:provincia de buenos aires|provincia de bs as|provincia de bsas)\b/.test(value)||bank==='Provincia Bs.As'||provinceBank&&!otherProvince))return {activity:'Docente de Provincia de Buenos Aires',bank:'Provincia Bs.As'};
 const special=/\b(?:provincia|provincial|ips|caja|policia|docente|municipal|fuerzas|retirad|militar)\b/.test(value);
 if(/\bjubilad[oa]\b/.test(value)&&!special)return {activity:'Jubilado ANSES',bank};
 if(/\bpensionad[oa]\b|\b(?:tengo|cobro|recibo) (?:una |la )?pension\b/.test(value)&&!special)return {activity:'Pensionado ANSES',bank};
 if(/\bauh\b|\b(?:cobro|recibo|tengo) (?:una |la )?asignacion(?: universal por hijo| por hijo)?\b/.test(value))return {activity:'AUH',bank};
 if(/\bmonotributista\b/.test(value))return {activity:'OTROS',bank};
 if(/\b(?:desocupad[oa]|sin trabajo|no tengo trabajo|no trabajo|sin ingresos)\b/.test(value))return {activity:'SIN_EMPLEO',bank};
 if(/\b(?:receta de cocina|receta para cocinar|trigonometria)\b/.test(value))return {activity:'FUERA_DE_TEMA',bank:''};
 if(/^(?:hola|buen dia|buenos dias|buenas(?: tardes| noches)?|gracias|quiero (?:un )?(?:prestamo|credito)|(?:puedo|quiero) (?:sacar|pedir) (?:un )?prestamo)[¿?!. ]*$/.test(value))return {activity:'SIN_DATO',bank:''};
 return null;
}
export function afterDocumentsIntent(text:string){
 const value=normalize(text).trim();
 if(/^(?:muchas gracias|gracias|perfecto|dale|ok|bueno|entendido)[.! ]*$/.test(value))return 'thanks';
 if(/\b(?:cuando|demora|tarda|respuesta|novedad|novedades|recibieron|recibiste|llegaron|ya (?:envie|mande|adjunte)|estan (?:los|mis) archivos)\b/.test(value))return 'status';
 return 'unknown';
}

export function readIntroduction(text:string){
 const match=text.match(/(?:^|[.!?,]\s*|^(?:hola|buenos dias|buen dia|buenas tardes|buenas noches)[, ]+)(?:me llamo|mi nombre es|soy)\s+([\p{L}]+(?:\s+[\p{L}]+){0,5}?)(?=\s+(?:y\b|quiero\b|necesito\b|cobro\b|trabajo\b)|[,.!?]|$)/iu);
 const first=normalize(match?.[1]?.split(/\s+/)[0]??'');
 if(!match||/^(?:jubilad[oa]|pensionad[oa]|docente|policia|emplead[oa]|retirad[oa]|municipal|estatal|beneficiari[oa]|titular|monotributista|autonom[oa]|desocupad[oa]|desemplead[oa]|trabajador[ae]?|comerciante|vendedor[ae]?|cliente|puam|pnc|de|del)$/.test(first))return {name:'',remaining:text};
 const name=match[1].split(/\s+/).map(word=>word.charAt(0).toLocaleUpperCase('es-AR')+word.slice(1).toLocaleLowerCase('es-AR')).join(' ');
 const remaining=text.slice(match.index!+match[0].length).replace(/^[\s,.!?]+/,'').replace(/^y\s+/i,'');
 return {name,remaining};
}
