import {NextResponse} from 'next/server';
// Los accesos antiguos de operadores no se publican ni redirigen desde Credizza.
export function middleware(){return new NextResponse(null,{status:404,headers:{'Cache-Control':'no-store'}});}
export const config={matcher:['/conversaciones/:path*','/maria-bandeja/:path*']};