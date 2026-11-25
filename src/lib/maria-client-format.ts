export function normalizeClientName(value:string){
 if(/^Consulta WEB-/i.test(value.trim()))return value.trim();
 return value.trim().toLocaleLowerCase('es-AR').replace(/(^|[\s'’-])([\p{L}])/gu,(_,separator:string,letter:string)=>separator+letter.toLocaleUpperCase('es-AR'));
}
export function excelActivity(value:string){
 const key=value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 return key==='jubilado anses'?'Jubilado Anses':key==='pensionado anses'?'Pensionado Anses':key==='auh'?'AUH':value;
}
export function auhWithoutCreditHistory(activity:string,bcra:{simulated:boolean;name:string;entities:unknown[]}|null){
 return activity.trim().toUpperCase()==='AUH'&&bcra?.simulated===false&&!bcra.name.trim()&&Array.isArray(bcra.entities)&&bcra.entities.length===0;
}
