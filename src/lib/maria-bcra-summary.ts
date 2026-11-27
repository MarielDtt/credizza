export type BcraEntity={name:string;situation:number};
const key=(s:string)=>s.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Z0-9]/g,'');
export function summarizeMariaBcra(entities:BcraEntity[]){
 if(!Array.isArray(entities)||entities.some(e=>!e||typeof e.name!=='string'||!Number.isInteger(e.situation)||e.situation<1||e.situation>6))return null;
 const unique=new Map<string,number>();
 for(const e of entities){const k=key(e.name);if(!k)return null;unique.set(k,Math.max(unique.get(k)??0,e.situation));}
 const irregular=[...unique].filter(([,s])=>s>1),worst=Math.max(0,...unique.values());
 const ownArgen=irregular.some(([n])=>/ARGENCRED|ARGENPESOS/.test(n));
 return {worst,irregular:irregular.length,ownArgen,label:ownArgen||irregular.length>=3?'Afectado':worst?String(worst):'-'};
}
export function payerInArrears(bank:string,entities:BcraEntity[]){
 const k=key(bank);
 const aliases=k==='BNA'||k==='NACION'||k==='BANCONACION'?['BANCONACION','BANCODELANACIONARGENTINA','BANCONACIONARGENTINA']:
 /PROVINCIA.*(?:BSAS|BUENOSAIRES)/.test(k)?['BANCOPROVINCIABSAS','BANCOPROVINCIABUENOSAIRES','BANCODELAPROVINCIADEBUENOSAIRES']:
 k?['BANCO'+k,k]:[];
 return entities.some(e=>e.situation>1&&aliases.some(alias=>key(e.name)===alias||key(e.name)===alias+'SA'));
}
