type GAEventParams = Record<string, string | number | boolean | undefined>;

export function gtag(command: string, eventName: string, params?: GAEventParams): void {
  const gtagFn = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof window !== "undefined" && typeof gtagFn === "function") {
    if (params) gtagFn(command, eventName, params);
    else gtagFn(command, eventName);
  }
}

/**
 * Evento GA4: apertura de chat
 * @param source - ejemplo: "hero", "footer", "not_found"
 */
export function trackChatOpen(source: string): void {
  gtag("event", "chat_open", {
    source,
    channel: "site_chat",
  });
}
