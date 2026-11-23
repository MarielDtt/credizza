'use client';
export function openCredizzaChat(){
 window.dispatchEvent(new Event('credizza-open-chat'));
 if(window.$crisp){
  window.$crisp.push(['do','chat:show']);
  window.$crisp.push(['do','chat:open']);
 }
}
