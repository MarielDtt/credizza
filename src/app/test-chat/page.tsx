import MariaCredizzaChat from "@/components/chat/MariaCredizzaChat";

export default function TestChatPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-4">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-2xl font-bold text-[#004E9B]">Prueba de chat de precalificación</h1>
        <MariaCredizzaChat />
      </div>
    </main>
  );
}
