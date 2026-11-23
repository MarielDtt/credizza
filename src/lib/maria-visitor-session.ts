import 'server-only';
import {createHmac,randomBytes} from 'node:crypto';
const cookieName='credizza_maria_visitor';
export function visitorSession(request:Request,secret:string){
 const cookie=request.headers.get('cookie')?.split(';').map(v=>v.trim()).find(v=>v.startsWith(cookieName+'='))?.slice(cookieName.length+1);
 const valid=typeof cookie==='string'&&/^[a-f0-9]{64}$/.test(cookie);
 const canStart=request.method==='POST'&&['/api/maria-inbox','/api/maria-register'].includes(new URL(request.url).pathname);
 if(!valid&&!canStart)return null;
 const nonce=valid?cookie:randomBytes(32).toString('hex');
 return {ownerKey:createHmac('sha256',secret).update('maria-visitor:'+nonce).digest('hex'),
  setCookie:valid?null:`${cookieName}=${nonce}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${process.env.NODE_ENV==='production'?'; Secure':''}`};
}
