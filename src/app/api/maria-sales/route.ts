import {proxyMaria} from "@/lib/maria-proxy";
export async function POST(request:Request){return proxyMaria(request,"maria-sales");}