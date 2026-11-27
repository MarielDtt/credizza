import {serviceWindow} from '@/lib/maria-hours';
export const dynamic='force-dynamic';
export async function GET(){return Response.json(serviceWindow(new Date()),{headers:{'Cache-Control':'no-store'}});}
