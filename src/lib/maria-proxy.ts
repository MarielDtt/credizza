import {visitorSession} from '@/lib/maria-visitor-session';
import {mariaClientKey,validMariaTarget,withMariaErrors} from '@/lib/maria-security';
import 'server-only';
const routes = new Set(['maria-inbox','maria-register','maria-bcra','maria-classify','maria-documents','maria-sales','maria-presence']);
async function proxyMariaRequest(request: Request, route: string) {
  if (!routes.has(route)) return new Response(null,{status:404});
  // El listado y las modificaciones del operador solamente existen en ME Digital.
  const source = new URL(request.url);
  if (request.method === 'PATCH' || request.method === 'GET' && !source.searchParams.get('id')) return new Response(null,{status:403});
  const base = process.env.ME_DIGITAL_CHAT_URL;
  const secret = process.env.MARIA_BRIDGE_SECRET;
  if (!base || !secret || secret.length < 32 || !validMariaTarget(base,process.env.NODE_ENV === 'development')) return Response.json({error:'El servicio de chat todavía no está configurado.'},{status:503});
  const origin=request.headers.get('origin');
  if((origin&&origin!==source.origin)||request.headers.get('sec-fetch-site')==='cross-site')return new Response(null,{status:403});
  const ownershipRoutes=['maria-inbox','maria-register','maria-documents','maria-presence','maria-sales','maria-bcra','maria-classify'];
  const session=ownershipRoutes.includes(route)?visitorSession(request,secret):null;
  if(ownershipRoutes.includes(route)&&!session)return new Response(null,{status:401});
  const target = new URL('/api/'+route,base);
  target.search = source.search;
  const headers = new Headers({'x-maria-bridge':secret,'x-maria-client-key':mariaClientKey(request,secret)});
  if(session)headers.set('x-maria-owner-key',session.ownerKey);
  const contentType = request.headers.get('content-type');
  if (contentType) headers.set('content-type',contentType);
  if (Number(request.headers.get('content-length') ?? 0) > 32*1024*1024) return new Response(null,{status:413});
  const body = ['GET','HEAD'].includes(request.method) ? undefined : await request.arrayBuffer();
  if (body && body.byteLength > 32*1024*1024) return new Response(null,{status:413});
  try {
    const response = await fetch(target,{method:request.method,headers,body,cache:'no-store',redirect:'error',signal:AbortSignal.timeout(120000)});
    return new Response(response.body,{status:response.status,headers:{'Content-Type':response.headers.get('content-type') || 'application/json','Cache-Control':'no-store',...(session?.setCookie?{'Set-Cookie':session.setCookie}:{}),...(response.headers.get('Retry-After')?{'Retry-After':response.headers.get('Retry-After')!}:{})}});
  } catch { return Response.json({error:'No pudimos conectar con María. Intentá nuevamente.'},{status:503}); }
}

export async function proxyMaria(request:Request,route:string) {
 return withMariaErrors(route,(incoming)=>proxyMariaRequest(incoming,route))(request);
}
