// Calendario operativo: Argentina, zona Buenos Aires.
// Fuentes verificadas 22/11/2026: argentina.gob.ar/feriados y BCRA C101352.
// Los días turísticos de 2027 deberán actualizarse cuando se publiquen.
const extraClosures=new Set(['2026-03-23','2026-07-10','2026-11-09','2026-11-10','2026-12-07']);
const key=(date:Date)=>date.toISOString().slice(0,10);
function holidays(year:number){
 const days=new Set(['01-01','03-24','04-02','05-01','05-25','06-20','07-09','12-08','12-25'].map(d=>`${year}-${d}`));
 for(const [month,day] of [[6,17],[8,17],[10,12],[11,20]]){const date=new Date(Date.UTC(year,month-1,day)),week=date.getUTCDay();if(week===2||week===3)date.setUTCDate(day-(week-1));else if(week===4||week===5)date.setUTCDate(day+(8-week));days.add(key(date));}
 // Domingo de Pascua gregoriana; Carnaval y Viernes Santo.
 const a=year%19,b=Math.floor(year/100),c=year%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),month=Math.floor((h+l-7*m+114)/31),day=(h+l-7*m+114)%31+1;
 for(const offset of [-48,-47,-2])days.add(key(new Date(Date.UTC(year,month-1,day+offset))));
 return days;
}
export function serviceWindow(date=new Date()){
 const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Argentina/Buenos_Aires',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date);
 const part=(name:string)=>Number(parts.find(p=>p.type===name)?.value);
 const today=new Date(Date.UTC(part('year'),part('month')-1,part('day'))),hour=part('hour'),minute=part('minute');
 const openDay=(day:Date)=>day.getUTCDay()!==0&&!holidays(day.getUTCFullYear()).has(key(day))&&!extraClosures.has(key(day));
 const start=(day:Date)=>day.getUTCDay()===6?10:9;
 const regular=openDay(today)&&hour>=start(today)&&hour<(today.getUTCDay()===6?14:17);
 const supervised=openDay(today)&&hour>=start(today)&&hour<20;
 const nextDay=new Date(today);if(!(openDay(today)&&hour<start(today)))do{nextDay.setUTCDate(nextDay.getUTCDate()+1);}while(!openDay(nextDay));
 const label=new Intl.DateTimeFormat('es-AR',{timeZone:'UTC',weekday:'long',day:'numeric',month:'long'}).format(nextDay);
 const next=key(nextDay)===key(today)?'hoy en horario de atención':nextDay.getTime()-today.getTime()===86400000?'mañana':'el '+label;
 return {regular,supervised,liquidations:regular,greeting:hour>=6&&hour<12?'Buenos días':hour>=12&&hour<20?'Buenas tardes':'Buenas noches',next,nextStart:start(nextDay),hour,minute};
}
export function operatorReferral(date=new Date(),whatsapp=true){
 const window=serviceWindow(date);
 const channel=whatsapp?'Te contactaremos por WhatsApp o podés volver a este chat para ver la respuesta.':'Podés volver a este chat para ver la respuesta.';
 return window.supervised?'Aguardá un momento, por favor. A la brevedad te vamos a responder por este chat.':
  `Dejé tu consulta pendiente para revisión. Un operador la revisará ${window.next}, durante el horario de atención que comienza a las ${window.nextStart} hs. ${channel}`;

}
export function documentationFollowUp(phone:string,date=new Date(),whatsapp=true){
 const window=serviceWindow(date);
 const estimate=window.regular&&window.hour*60+window.minute<=16*60?'en el transcurso de unas 3 horas, aproximadamente':window.supervised?'entre hoy y el próximo día hábil':`${window.next}, en horario de atención`;
 return whatsapp?`Ya recibimos tu documentación. Vamos a consultar las opciones disponibles. Un operador te contactará por WhatsApp${phone?' al '+phone:''} ${estimate}.`:`Ya recibimos tu documentación. Vamos a consultar las opciones disponibles y te responderemos por este chat ${estimate}.`;
}
