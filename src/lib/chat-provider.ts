export function chatProvider(env=process.env):'maria'|'crisp'{
 if(env.CREDIZZA_CHAT_PROVIDER==='maria')return 'maria';
 if(env.CREDIZZA_CHAT_PROVIDER==='crisp')return 'crisp';
 // Un despliegue sin configurar conserva el servicio anterior.
 return env.NODE_ENV==='development'?'maria':'crisp';
}
