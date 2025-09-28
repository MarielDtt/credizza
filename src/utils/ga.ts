// utils/ga.ts
export function trackWhatsApp(place: string) {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;

    if (typeof gtag === "function") {
        gtag("event", "click_whatsapp", {
            place,
            page_location: window.location.href,
        });
    }
}
