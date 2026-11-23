export const gestionColors: Record<string, string> = {
  "Pendiente de Carga Operador": "#F4B084",
  "Necesita Operador": "#F4B084",
  "Contacto pendiente": "#00B0F0",
  "CBU - BCRA pendiente": "#F4B084",
  "Pendiente Documentación": "#FFC000",
  "Pendiente RTA Entidad": "#FF66CC",
  "Sin Respuesta Cliente": "#00B0F0",
  "Oferta Disponible": "#B4A7D6",
  "Sin Cupo ANSES": "#FF0000",
  "Sin Cupo": "#FF0000",
  "No Califica": "#FF0000",
  "Liquidado": "#92D050",
  "Sin CBU Registrado": "",
};

export const visibleStatus = (status: string) => ({
  "Pendiente de documentación": "Pendiente Documentación",
  "Pendiente de oferta": "Pendiente RTA Entidad",
}[status] ?? status);
