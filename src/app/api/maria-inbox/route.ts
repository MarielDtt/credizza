import {proxyMaria} from "@/lib/maria-proxy";
export async function GET(request: Request) { return proxyMaria(request, "maria-inbox"); }
export async function POST(request: Request) { return proxyMaria(request, "maria-inbox"); }
export async function PUT(request: Request) { return proxyMaria(request, "maria-inbox"); }
export async function PATCH(request: Request) { return proxyMaria(request, "maria-inbox"); }
