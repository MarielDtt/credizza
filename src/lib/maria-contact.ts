const normalize=(text:string)=>text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
function moneyDigits(text:string){return text.replace(/[.,]\d{1,2}\s*(?:pesos|ars)?\s*$/i,'').replace(/\D/g,'').padStart(8,'0');}
export function readContact(text:string,document:string,phone:string){
 const moneyNumbers:string[]=[];
 // Los importes se apartan antes de buscar identificadores o teléfonos.
 const withoutCurrency=text.replace(/(?:\bARS\s*\$?\s*|\$\s*)\d[\d.,]*(?:\s+\d{3})*(?:\s*(?:pesos|ars))?|\b\d[\d.,]*(?:\s+\d{3})*\s+(?:de\s+)?(?:pesos|ars)\b/gi,amount=>{moneyNumbers.push(moneyDigits(amount));return ' ';});
 const activityText=withoutCurrency.replace(/(?<!\d)(?:\d{2,4}[.\s\-–—()]+\d{3,4}[.\s\-–—()]+\d{3,4}|\d{1,2}[.\s\-–—]\d{3}[.\s\-–—]\d{3}|\d{6,})(?!\d)/g,(match,offset:number)=>{
  const digits=match.replace(/\D/g,'');
  const before=normalize(withoutCurrency.slice(Math.max(0,offset-70),offset));
  const explicitIdentifier=/\b(?:dni|documento|doc|celular|telefono|tel)\s*(?:es|nro|numero|n[°º])?\s*[:#.-]?\s*$/.test(before);
  const amountContext=/\b(?:por|monto|importe|necesito|quiero|solicito|prestamo|credito)\s*(?:de|unos?|por|:)?\s*$/.test(before);
  if(!explicitIdentifier&&amountContext){moneyNumbers.push(digits.padStart(8,'0'));return ' ';}
  if(/^\d{7,8}$/.test(digits))document=digits.padStart(8,'0');
  const mobile=digits.replace(/^0(?=\d{10}$)/,'');
  if(/^[1-9]\d{9}$/.test(mobile))phone=mobile;
  return ' ';
 });
 return {document,phone,moneyNumbers,activityText:activityText.replace(/\b(?:dni|documento|celular|telefono|teléfono|nro)\b\s*[:.]?/gi,' ').replace(/^[\s,:;.-]+|[\s,:;.-]+$/g,'').trim()};
}
export function documentWasMoney(document:string,messages:{from:string;text:string}[]){
 if(!/^\d{7,8}$/.test(document||''))return false;
 const value=document.padStart(8,'0');let mistaken=false;
 for(const message of messages){if(message.from!=='visitor')continue;const parsed=readContact(message.text,'','');if(parsed.document===value)return false;if(parsed.moneyNumbers.includes(value))mistaken=true;}
 return mistaken;
}
