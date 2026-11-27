// Reglas confirmadas por Mariel: 22/11/2026. No equivalen a una oferta ni a aprobación.
import {summarizeMariaBcra} from '@/lib/maria-bcra-summary';
const normalize=(text:string)=>text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
export function onlyMonotributista(text:string){
 const s=normalize(text);
 return /\bmonotributista\b/.test(s)&&!/\bno (?:soy|estoy como) monotributista\b|\bmi (?:mama|papa|madre|padre|esposo|esposa|hijo|hija)\b/.test(s)&&!/jubil|pension|\bpnc\b|\bpuam\b|\bauh\b|asignacion|docent|emplead|dependencia|otro ingreso|otra actividad/.test(s);
}
export const MONOTRIBUTO_NO_LINE='Por el momento no contamos con una línea de crédito para monotributistas. Gracias por consultar en Credizza.';
type Bcra={simulated:boolean;name:string;entities:{name:string;situation:number}[]};
export function pncNegative(activity:string,bank:string,bcra:Bcra|null){
 if(!/^(?:pension graciable \(40\)|puam \(46\)|pension de madres \(47\))$/.test(normalize(activity)))return '';
 const key=normalize(bank).replace(/[^a-z]/g,'');
 if(/credicoop/.test(key))return 'Por el momento no contamos con una línea disponible para tu beneficio con cobro en Credicoop. Gracias por consultar en Credizza.';
 if(!key||!bcra||bcra.simulated!==false||!bcra.name||!Array.isArray(bcra.entities)||bcra.entities.some(e=>!Number.isInteger(e.situation)||e.situation<1||e.situation>6))return '';
 const maximum=/patagonia|provinciabsas|provinciabuenosaires|provinciadebuenosaires/.test(key)?3:2;
 return (summarizeMariaBcra(bcra.entities)?.irregular??Infinity)>maximum?'Por el momento, según la precalificación realizada, no tenemos una línea de crédito disponible para tu caso. Gracias por consultar en Credizza.':'';
}
