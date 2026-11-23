import 'server-only';
import {createHmac, randomUUID} from 'node:crypto';

export function mariaClientKey(request:Request, secret:string) {
  // Vercel sobrescribe esta cabecera; no confiar en x-forwarded-for del visitante.
  const address=process.env.VERCEL ? request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() : undefined;
  return createHmac('sha256',secret).update(address || 'local-or-unknown').digest('hex');
}
export function validMariaTarget(value:string, development:boolean) {
  try {
    const url=new URL(value);
    if(url.username || url.password || url.search || url.hash || url.pathname!=='/')return false;
    return url.origin==='https://chat.medigital.com.ar' || development && url.origin==='https://gestion.medigital.com.ar' || development &&
      ['http://localhost:3002','http://127.0.0.1:3002'].includes(url.origin);
  } catch {return false;}
}
export function mariaLog(route:string, event:string, status:number, requestId:string, durationMs:number) {
  // Nunca incluir errores del proveedor, cuerpos, querystrings, nombres, DNI o claves.
  console.warn(JSON.stringify({service:'maria',route,event,status,requestId,durationMs}));
}
export function withMariaErrors(route:string, handler:(request:Request)=>Promise<Response>) {
  return async function(request:Request) {
    const requestId=randomUUID(), started=Date.now();
    let response:Response;
    try {response=await handler(request);} catch {
      response=Response.json({error:'No pudimos completar la solicitud. Intentá nuevamente.'},{status:503});
    }
    if(response.status>=400) mariaLog(route,response.status===429?'rate_limited':response.status>=500?'service_error':'request_rejected',response.status,requestId,Date.now()-started);
    response.headers.set('x-request-id',requestId);
    response.headers.set('Cache-Control','no-store');
    return response;
  };
}
